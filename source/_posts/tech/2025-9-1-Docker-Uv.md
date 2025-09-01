---
title: Docker 和 uv 炼丹实践指北
tags:
  - 炼丹
  - docker
  - 指北
---

## Abstract

[前作](./2024-6-30-WSL2-Docker-Deep-Learning.md) 详细介绍了如何（在 WSL2 中）中安装 CUDA 和 Docker，并且配置了 GPU 支持的 Docker 镜像。本文将更详细地介绍一种在容器中使用 uv 管理 PyTorch 深度学习环境的实践。

## Introduction

为什么要抛弃 conda，转而使用 Docker 和 uv？

### Why Docker

- 不留死角的环境隔离：Docker 默认隔离所有的用户态要素，声明可以共享的要素；而 conda 打包则是声明需要隔离的依赖——总是会有遗漏的
- 隔离任何包：Docker 可以将整个文件系统打包，包括所有依赖和配置，而 conda 只能隔离 Python 包和一些系统库
- 应急：实在别的更好的迁移环境办法，还可以 `docker commit / save / load` 一条龙（仅供应急使用，并非最佳实践）

### Why uv

- 快：比 pip 快 10 倍，比 conda 快 100 倍（虚指，但真的很快）
- 至少可以当 pip 用：不想学习？使用 `uv pip install`, 至少是一个更快的 pip
- 使用 pip 源：更少 Licensing 限制，更多镜像站。如果一个包只有 conda 源，它大概率有好些年没更新过了
- 是一个真正的包管理器：支持项目文件 `pyproject.toml`，支持自动维护的 Lockfile（有效保障 Python 环境的可复现性）

## Related Works

请优先参考官方文档

- [uv 官方文档](https://docs.astral.sh/uv/getting-started/)
- [Docker compose 参考手册](https://docs.docker.com/reference/compose-file/)
- [devcontainers.json 参考手册](https://containers.dev/implementors/json_reference/)

## Method（配置文件和使用说明）

我们整体的思路是用 Docker 隔离 CUDA Toolkit 和系统 apt 包，以及其他系统级的包，用 uv 维护 Python 的 venv。

### Dockerfile

在开发和调试中，经常需要临时的安装和卸载 Python 包，为了方便起见，减少重构和重启容器，本文的方法选择不把 uv 的 venv 打包进 Docker 镜像中，而是通过挂载的形式将其保留在主机文件系统上。由于 uv 本身具有快速创建和复现环境的能力（真的很快！），不用 Docker 处理 Python 环境其实是更方便且节约硬盘空间的。

因此在 Dockerfile 中我们不需要预先安装 PyTorch 等 Python 包，只需要从 `nvidia/cuda` 镜像继承，并安装一些系统级的包（如 git, vim, wget 等）即可。

```dockerfile
# This file is used to build the development container for the project.
# Use CUDA devel image without CUDNN since PyTorch brings its own CUDNN
ARG CUDA_VERSION=12.9.0
FROM nvidia/cuda:${CUDA_VERSION}-devel-ubuntu22.04

# Install common apt dependencies as root user
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Hong_Kong
ARG UBUNTU_MIRROR=https://mirrors.bfsu.edu.cn/ubuntu/
RUN sed -i "s|http://archive.ubuntu.com/ubuntu/|$UBUNTU_MIRROR|g" /etc/apt/sources.list && \
    sed -i "s|http://security.ubuntu.com/ubuntu/|$UBUNTU_MIRROR|g" /etc/apt/sources.list
RUN apt-get update -y && \
    apt-get -y install --no-install-recommends curl tree wget ca-certificates unzip bzip2 xz-utils zip nano vim-tiny less jq lsb-release apt-transport-https sudo tmux ffmpeg libsm6 libxext6 libxrender-dev libssl3 git gdb rsync aria2 && \
    apt-get -y clean && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
ARG USER_NAME=dev
ARG USER_UID=1000
ARG USER_GID=1000
RUN addgroup --gid ${USER_GID} ${USER_NAME} && \
    adduser --disabled-password --gecos "" --uid ${USER_UID} --gid ${USER_GID} ${USER_NAME} && \
    echo "${USER_NAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USER_NAME}
USER ${USER_NAME}

# Install the uv package manager for the user
ARG PYPI_MIRROR=https://mirrors.aliyun.com/pypi/simple/
ENV PATH="/home/${USER_NAME}/.local/bin:${PATH}"
ENV UV_DEFAULT_INDEX=${PYPI_MIRROR}
ENV UV_LINK_MODE=copy
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# Install starship prompt
RUN curl -sS https://starship.rs/install.sh | sh -s -- --yes && \
    echo 'eval "$(starship init bash)"' >> /home/${USER_NAME}/.bashrc

# Install cmake and ninja globally with uv
RUN uv tool install cmake --no-cache && \
    uv tool install ninja --no-cache

# Configure runtime environments
ARG HUGGINGFACE_MIRROR=https://hf-mirror.com
ENV HF_ENDPOINT=${HUGGINGFACE_MIRROR}
ENV HF_HUB_DISABLE_XET=1

# Optional environment variables
# Allow nvenc capabilities for ffmpeg
ENV NVIDIA_DRIVER_CAPABILITIES=compute,video,utility
# Disable NCCL P2P and IB to avoid issues with consumer-grade GPUs
# ENV NCCL_P2P_DISABLE=1 NCCL_IB_DISABLE=1
# Fine-tune the number of threads for OMP
# ENV OMP_NUM_THREADS=8

# Configure volumes for the user
RUN mkdir -p /home/${USER_NAME}/.cache/huggingface && \
    mkdir -p /home/${USER_NAME}/.cache/uv && \
    mkdir -p /home/${USER_NAME}/.cache/torch/hub && \
    mkdir -p /home/${USER_NAME}/local/share/uv
VOLUME ["/home/${USER_NAME}/.cache/huggingface", "/home/${USER_NAME}/.cache/uv", "/home/${USER_NAME}/.cache/torch/hub", "/home/${USER_NAME}/.local/share/uv"]
```

这个 Dockerfile 相当适合在开发中使用。一些说明：

- 选用 `devel` 系列包含编译器的镜像，因为开发过程中容易遇到一些需要本机编译的包。
- 使用非 root 用户：挂载主机目录时，在容器中使用 root 用户会在主机文件系统中留下 root 权限的文件，导致在主机中使用普通用户权限无法管理。这里将容器内的用户名和 UID/GID 设置为和主机用户相同，避免权限问题。
- 镜像站：推荐在国内使用
  - 北外 Ubuntu 镜像：https://mirrors.bfsu.edu.cn/ubuntu/
  - 阿里云 PyPI 镜像：https://mirrors.aliyun.com/pypi/simple/
  - Huggingface 镜像：https://hf-mirror.com
  - Daocloud Docker 镜像（仅支持官网部分热门包，包括我们使用的 `nvidia/cuda`）：docker.m.daocloud.io
  - 阿里云 PyTorch Wheels 镜像：https://mirrors.aliyun.com/pytorch-wheels/
- 这里 uv 和 starship（shell prompt 工具）都使用官方 GitHub 源安装，因此构建镜像时仍然需要 [访问外部网络](./2024-6-30-WSL2-Docker-Deep-Learning.md#step-6---在-wsl-中安装-docker). 可将客户端代理通过 `ssh -R` 转发到服务器上，设置 `~/.docker/config.json` 的代理选项，无需 root.
- 一些 nvidia 驱动相关的环境变量如果遇到问题可以按需使用

### docker-compose.yml

使用 Docker Compose 来创建 devcontainer，这样无论是否使用 VSCode 的 Remote - Containers 插件，都可以方便地通过 Docker Compose 启动开发容器。

```yaml
services:
  devcontainer:
    image: uv-devcontainer:cu${CUDA_VERSION:-12.9.0}-${USER_NAME:?}
    build:
      context: .devcontainer
      args:
        CUDA_VERSION: "${CUDA_VERSION:?}"
        USER_NAME: "${USER_NAME:?}"
        USER_UID: "${USER_UID:-1000}"
        USER_GID: "${USER_GID:-1000}"

        UBUNTU_MIRROR: "${UBUNTU_MIRROR:-https://mirrors.bfsu.edu.cn/ubuntu/}"
        PYPI_MIRROR: "${PYPI_MIRROR:-https://mirrors.aliyun.com/pypi/simple/}"
        HUGGINGFACE_MIRROR: "${HUGGINGFACE_MIRROR:-https://hf-mirror.com}"

    user: ${USER_NAME}
    cap_add:
      - SYS_PTRACE
    shm_size: ${SHM_SIZE:-32g}
    command: ["tail", "-f", "/dev/null"]
    working_dir: /workspace/${REPO_NAME:?}

    volumes:
      - "/home/${USER_NAME}/.cache/huggingface/:/home/${USER_NAME}/.cache/huggingface/"
      - "/home/${USER_NAME}/.cache/uv/:/home/${USER_NAME}/.cache/uv/"
      - "/home/${USER_NAME}/.cache/torch/hub/:/home/${USER_NAME}/.cache/torch/hub/"
      - "/home/${USER_NAME}/.local/share/uv/:/home/${USER_NAME}/.local/share/uv/"
      - ".:/workspace/${REPO_NAME:?}"

    environment:
      - NVIDIA_VISIBLE_DEVICES=${NVIDIA_VISIBLE_DEVICES:-all}

    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: "all"
              capabilities: [gpu]
```

一些说明：

- `Dockerfile` 放置在 `.devcontainer` 目录内部，而 `docker-compose.yml` 放在工作区目录下。由于我们不需要把工作区中的代码和数据打包进镜像，使用 `.devcontainer` 作为构建上下文可显著提升构建速度，省去负载的 `.dockerignore` 文件。
- 这里除了挂载代码工作区目录，还挂载了用户的缓存目录，以便在不同的容器实例之间共享缓存数据（Huggingface 数据集与权重，uv 包缓存，PyTorch Hub 缓存，uv Python 可执行文件）。在启动容器前需要确保这些目录存在，否则就会被 Docker 在主机目录上以 root 权限创建，影响在主机上使用。
- 许多参数通过 `.env` 文件进行配置，方便在不同机器上使用：

```sh
# Devcontainer 镜像使用的 CUDA 版本。推荐与要安装的 PyTorch 的 CUDA 版本一致。
CUDA_VERSION=12.9.0

# 用户配置
USER_NAME=duanyll
USER_UID=1001
USER_GID=1001

# 项目文件夹名称
REPO_NAME=your-repo-name

# Docker 运行时设置
SHM_SIZE=48g
NVIDIA_VISIBLE_DEVICES=all

# 用于加速下载的镜像源设置
UBUNTU_MIRROR=https://mirrors.bfsu.edu.cn/ubuntu/
PYPI_MIRROR=https://mirrors.aliyun.com/pypi/simple/
HUGGINGFACE_MIRROR=https://hf-mirror.com
```

我写了一个 `setup_env.sh` 脚本，放入工作区目录后运行可自动生成 `.env` 文件。

{% link https://github.com/Duanyll/torch-devcontainer/blob/main/setup_env.sh %}

有了 `docker-compose.yml` 和 `.env` 文件记录启动容器的参数，启动容器的命令就很简洁：

```sh
docker compose up -d
```

如果修改了 `Dockerfile`, 比如增加了 apt 包，则加上 `--build` 参数（重新）启动容器：

```sh
docker compose up -d --build
```

随后可进入容器并执行命令：

```sh
docker compose exec devcontainer bash
```

### devcontainer.json

VSCode 的 Remote - Containers 插件可以帮我们创建容器并将 VSCode 连接到容器内部。我们让 `.devcontainer/devcontainer.json` 引用 Docker Compose 文件即可，不需要把容器的参数重复一遍：

```jsonc
{
  "dockerComposeFile": ["../docker-compose.yml", "./docker-compose.extend.yml"],
  "service": "devcontainer",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-vscode.cmake-tools",
        "ms-vscode.cpptools",
        "GitHub.copilot",
        "ms-vscode.hexeditor",
        "ms-toolsai.jupyter",
        "tamasfe.even-better-toml",
        "charliermarsh.ruff",
      ],
      "settings": {
        "C_Cpp.intelliSenseEngine": "default",
      },
    },
  },
  "workspaceFolder": "/workspace/${localWorkspaceFolderBasename}",
  "shutdownAction": "none",
  "hostRequirements": {
    "gpu": true,
  },
  "updateContentCommand": "uv sync --dev --no-install-project",
}
```

这里还使用了 `./docker-compose.extend.yml`, 它可以是一个空的文件，你可以在里面放一些额外的（本机相关）的配置来覆盖外层 `docker-compose.yml` 的设置，比如挂载额外的目录，或者设置环境变量等。

要启动并进入容器，只需按下 `F1`, 输入并选择 `Remote-Containers: Reopen in Container` 即可。

### pyproject.toml

忘掉 `requirements.txt` 和 `environment.yml` 吧！我们使用 `pyproject.toml` 来声明项目的依赖和配置，结合 uv 它还可以很好地处理需要特殊安装来源的包。我们使用下面的模板来创建一个 `pyproject.toml` 文件

```toml
[project]
name = "torch-devcontainer" # 可以改成项目的名称
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12"  # Python 版本要求
dependencies = []

[tool.uv.sources]
torch = [
  { index = "pytorch", marker = "sys_platform == 'linux' or sys_platform == 'win32'" },
]
torchvision = [
  { index = "pytorch", marker = "sys_platform == 'linux' or sys_platform == 'win32'" },
]
torchaudio = [
  { index = "pytorch", marker = "sys_platform == 'linux' or sys_platform == 'win32'" },
]
xformers = [
  { index = "pytorch", marker = "sys_platform == 'linux' or sys_platform == 'win32'" },
]

[[tool.uv.index]]
url = "https://mirrors.aliyun.com/pypi/simple/"
default = true

[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cu128"
explicit = true
```

关于 python 版本的设置，上面这个 `pyproject.toml` 文件中指定了 `requires-python = ">=3.12"`，这里我们通常指定成项目能够运行的最宽泛要求。自 Python 3.13 起，CPython 引入了 Free-threaded 等重大的改进，因此目前（2025 年 9 月）还有相当一部分包尚未适配，使用 Python 3.12 的兼容性比较好。如果在 `requires-python` 中指定了 `>=3.8`，但系统中存在 Python 3.10（如 ubuntu 22.04 自带的），那么 uv 很可能会直接使用这个 Python 3.10 创建虚拟环境。为了让 uv 使用一致的 Python 版本，可以在 `pyproject.toml` 旁边创建一个 `.python-version` 文件，内容为：

```
3.12
```

则会要求 uv 自动安装使用 Python 3.12 创建虚拟环境。

上面的 `pyproject.toml` 文件中还没有指定项目的依赖项，但已经预先声明了 PyTorch 相关的包的下载来源，因此稍后可直接安装这些包，**未来反复安装卸载这些包时，也能确保使用了相同的安装源**。此处仍然建议尽量使用 PyTorch 官网 Wheel 源，在 url 中设置 cuda 版本（如 `cu128`）。如果实在访问不畅，可以使用阿里云国内镜像源，例如

```toml
[[tool.uv.index]]
name = "pytorch"
url = "https://mirrors.aliyun.com/pytorch-wheels/cu128"
explicit = true
```

但需要注意阿里云镜像更新较慢，可能没有最新的 PyTorch 版本。这里列出的 `torch`, `torchvision`, `torchaudio`, `xformers` 是常见的必须使用分 CUDA 版本的包。

创建好 `pyproject.toml` 后，就可以使用 uv 来安装包了：

```sh
uv add torch torchvision
```

我们最好使用 `uv add` 命令而不是 `pip install` 或者 `uv pip install` 直接安装包。`uv add` 会把我们安装的包记录在 `pyproject.toml` 和 `uv.lock` 文件中，从而确保环境的一致性和可重现性。

如果已经有了 `requirements.txt` 文件，可以直接安装并写入项目文件：

```sh
uv add -r requirements.txt
```

{% box 特殊包的安装方式 %}

uv 支持在 `pyproject.toml` 中声明特殊包的安装方式，以便在其他地方以相同的方式安装。

从 Git 仓库直接安装的包，如 [OpenAI CLIP](https://github.com/openai/CLIP), 在 `tool.uv.sources` 中添加

```toml
[tool.uv.sources]
clip = [
  { git = "https://github.com/openai/CLIP", branch = "main" }
]
```

再运行安装命令

```sh
uv add clip
```

一些带有预编译 torch 和 cuda 二进制的包（如 `flash-attn`, `nunchaku`, `ktransformers`, `vllm` 等等），直接从 PyPI 安装时需要从源码编译，编译往往需要数小时。可前往这些仓库的 GitHub Releases 页面查找是否预编译的 Wheel 包。一般这些包需要匹配的参数包括

- CUDA 版本（大版本如 11，12）
- Python 版本（如 3.8，3.9，3.10，可使用 `.python-version` 文件固定）
- PyTorch 版本（如 2.6，2.7）
- PyTorch C++11 ABI （一般从 PyTorch 官网 Wheel 源下载的 PyTorch 都不使用 C++11 ABI）

找到对应 Wheel 包下载链接后，加入到 `pyproject.toml` 的 `tool.uv.sources` 中，例如

```toml
[tool.uv.sources]
flash-attn = [
  { url = "https://github.com/Dao-AILab/flash-attention/releases/download/v2.8.3/flash_attn-2.8.3+cu12torch2.8cxx11abiFALSE-cp312-cp312-linux_x86_64.whl"
  }
]
```

再运行安装命令

```sh
uv add flash-attn
```

{% endbox %}

### 使用 venv

怎么使用 uv 建立的 Python 虚拟环境？uv 并不建议像传统的 conda 那样在终端中设置环境变量去激活环境，而是通过 `uv` 命令自动管理虚拟环境。uv 会在每次运行时自动激活对应的虚拟环境, 这样可以防止忘了激活环境或者是进入了错误的环境。

原来使用 conda 需要运行

```sh
conda activate your-env-name
python main.py --arg1 --arg2
```

使用 uv 只需要

```sh
uv run main.py --arg1 --arg2
```

uv 会查找项目对应的 `pyproject.toml` 文件，**验证当前虚拟环境中的包是否满足声明**，自动安装缺失的包 **（卸载多余的包）**，在虚拟环境中调用正确的 Python 解释器执行脚本。

`uv run` 也可以用来执行虚拟环境中的命令行工具，比如

```sh
uv run hf cache scan
```

## Experiment（操作流程）

### SOP

> 用上面这一套给新项目 / 现有项目配环境的流程是什么？

1. 配置 Docker 镜像。一般来说本文给出的 `Dockerfile` 和 `docker-compose.yml` 已经足够多数情况下使用。
   1. 在项目根目录下创建 `.devcontainer` 文件夹并将 [这里](#dockerfile) 的 `Dockerfile` 复制到里面
   2. 在项目根目录下创建 `docker-compose.yml` 文件并将 [这里](#docker-composeyml) 的内容复制到里面，一般来说只需要添加额外的挂载点，如数据集等
   3. 根据实际情况创建 `.env` 文件，设置 docker 镜像参数 (匹配容器内外 UID/GID, CUDA 版本等)
   4. 运行 `docker compose build` 构建容器。一台机器上只需要构建一次，不同项目可以复用这个镜像。
2. 把 [这里](#devcontainerjson) 的 `devcontainers.json` 文件复制到 `.devcontainer` 文件夹里面, 一般不用改动
3. (可选) 在 VSCode 中按 F1 搜索并选择 "Remote-Containers: Reopen in Container" 进入开发容器。得益于 uv 良好的 venv 管理，许多简单的，不需要使用 nvcc 编译的项目不需要进入容器也可直接在主机中管理。
4. 创建 `pyproject.toml` 文件，首先把 [这里](#pyprojecttoml) 的起手式复制到 `pyproject.toml` 文件中。
5. 创建 `.python-version` 文件, 写入实际需要的 Python 版本号
6. 检查 `requirements.txt` 和 `README.md` 等文件, 查看项目是否使用了需要特殊方式安装的包, 如果有, 把它们的安装链接加入到 `pyproject.toml` 文件中
7. 运行 `uv venv` 创建一个空的虚拟环境 (这个虚拟环境中默认不包含 pip)
8. 使用 `uv add` 命令添加包, 直接 `uv add -r requirements.txt`
9. 使用 `uv run` 命令运行 Python 代码和工具
10. (可选) 对于别人的项目, 在 GitHub 上创建 Fork, 把以上新增的配置文件 (包括 `uv.lock`) 推送到 Fork 的仓库中以便后续使用

### 项目结构

典型的项目结构:

```
project
├── .devcontainer
│   ├── Dockerfile
│   ├── devcontainer.json
│   └── docker-compose.extend.yml
├── .env
├── .gitignore
├── .python-version
├── .vscode
│   ├── extensions.json
│   ├── launch.json
│   └── settings.json
├── LICENSE
├── README.md
├── docker-compose.yml
├── pyproject.toml
├── setup_env.sh
└── uv.lock
```

## Appendix

### CUDA 版本兼容性

下面介绍不同场景下 CUDA 版本兼容性条件

- **启动 Docker 容器**: 主机 CUDA 小版本取决于 nvidia 驱动, 主机不需要安装 CUDA Toolkit
  - 消费级显卡 (RTX 3090, 4090, 4090): 容器内 CUDA 小版本不能高于主机 CUDA 小版本 (主机上 `nvidia-smi` 输出的 CUDA 版本).
  - 数据中心显卡 (A100, H100): 容器内 CUDA 小版本可以高于主机 CUDA 小版本
  - 因此不建议消费级显卡死守 535, 470 等 "LTS" 版本驱动, 应该尽可能更新驱动版本.
- **运行 PyTorch 和 PyTorch 生态下的预编译 Kernel**: PyTorch 的 Python Wheel 自带了需要的 CUDA Runtime 依赖
  - 只需要主机驱动版本不要差太远, 与主机和容器内安装的 CUDA Toolkit 版本无关
  - 535 驱动 + cuda11.8 docker 镜像 + torch2.7cu128 的组合可以运行
- **编译 PyTorch 生态下的 Kernel**:
  - 容器必须用 `devel` 包含编译器的镜像, 容器 CUDA 版本与 PyTorch CUDA 版本**一致**
  - 自从 PyTorch 2.5 后, 在 CUDA 11.8 上给第三方包编译 Kernel 会非常困难. PyTorch 2.5 以后要求使用 c++17, 但 nvcc 11.8 不支持 c++17. PyTorch 自身使用了复杂的编译规则来实现交叉编译, 但需要自己编译的第三方库几乎都没有做这些考虑.
  - 在 CUDA 11.8 上多卡训练时, PyTorch 依赖的 `nvidia-nccl-cu11` 预编译包是基于 cu110 的, 在 cu118 上并不能正常工作. 需要使用 cu118 下重新编译的 NCCL. 在此提供一个可用的 [预编译 Wheel](https://cdn.duanyll.com/whl/nvidia_nccl_cu11-2.27.6-py3-none-manylinux2014_x86_64.whl), 可以像下面这样在 `pyproject.toml` 中引用:

```toml
[project]
dependencies = [
  "nvidia-nccl-cu11>=2.27.6",
  "torch>=2.7.0"
]

[tool.uv]
override-dependencies = [ "nvidia-nccl-cu11==v2.27.6" ]

[tool.uv.sources]
torch = [
  { index = "pytorch", marker = "sys_platform == 'linux' or sys_platform == 'win32'" },
]
nvidia-nccl-cu11 = { url = "https://cdn.duanyll.com/whl/nvidia_nccl_cu11-2.27.6-py3-none-manylinux2014_x86_64.whl" }

[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cu118"
explicit = true
```

### 使用 Jupyter

在 VSCode 中使用打开 `ipynb` 文件时, 可以直接选择 uv 的虚拟环境中的 Python 解释器作为内核. 建议将 `ipykernel` 包加入到项目依赖中:

```sh
uv add ipykernel
```
