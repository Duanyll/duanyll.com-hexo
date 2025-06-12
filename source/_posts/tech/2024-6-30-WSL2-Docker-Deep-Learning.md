---
title: 基于 WSL2 和 Docker 的深度学习环境指北
tags:
  - 炼丹
  - docker
  - 指北
---

为什么要使用 WSL2 和 Docker 来管理深度学习环境？本教程的配置方法旨在日常使用的 Windows 机器上建立 CUDA 加速的深度学习环境，以便进行快速的调试与开发代码，而无需忍受连接到远程服务器的延迟。许多的深度学习库不能在 Windows 上开箱即用（尽管许多库只需少量的代码修改即可兼容 Windows 和 MSVC），或者在 Windows 上难以复现行为，所以需要使用 WSL2。作为虚拟机，WSL2 支持绝大多数的 Linux 内核的特性，相较于其他的虚拟化平台，WSL2 能优雅地与 Windows 宿主机共享同一张 CUDA 显卡。我不喜欢使用 Conda，第一是因为 Resolving Environment 太慢了，第二是 conda 的环境隔离程度实际上并不能满足深度学习的需求。Conda 不能隔离 CUDA 运行库，和其他 apt 管理的 C 库，而 Docker 可以，DevContainers 已包含了一套易用的将 Docker 容器用于开发的方案。

> 根本碰都不要碰 Docker Desktop, Bug 太多了。本教程直接在 WSL2 中安装 Docker，不需要 Docker Desktop。

实际上，得益于 WSL2 的设计，本文所述的 WSL2 部分的方法也适用于典型的 Ubuntu 主机。Windows 部分的教程需要 Windows 11 或 Windows 10 22H2 (19045) 以上的版本。推荐安装 [Windows Terminal](https://aka.ms/terminal) 来让命令行体验更美好。

![安装 Windows Terminal 并取代 conhost](https://img.duanyll.com/img/20240630232131.png)

## Step 1 - 访问互联网

本教程假定必须使用 HTTP 代理才能访问任何互联网上的网站（实际上相当契合中国大陆的情况了），并且这个代理服务器位于 Windows 宿主机的 7890 端口上。

![一个典型的 HTTP 代理软件](https://img.duanyll.com/img/20240630224805.png)

我们首先让 Windows 上的程序能使用这个代理服务器。通常来说只需要**打开 System Proxy 选项**，这会修改 Windows 的 IE 代理设置，适用于多数的图形化程序。**不建议打开 TUN 模式**，这会让情况变得复杂棘手，建议把 TUN 代理留给 “访问内部资产” 的需求，如 EasyConnect 和 WireGuard，而不是 “访问互联网” 的需求。[这里](./2025-5-31-Windows-TUN-Router.md) 有关于 TUN 代理的更多讨论和高级用法。

仅仅这样设置是不够的。许多从 Linux 世界移植的命令行程序从环境变量读取代理设置，而不是从 Windows 的 IE 代理设置读取。可添加 Windows 环境变量 `http_proxy` 和 `https_proxy`，值均为 `http://127.0.0.1:7890`.

![添加 Windows 环境变量](https://img.duanyll.com/img/20240630225813.png)

添加完记得重启打开的 Shell，或者直接重启电脑。

![如果以上步骤是正确的，你应该能直接在 PowerShell 中直接 curl google.com](https://img.duanyll.com/img/20240630230038.png)

之后还要用到 Windows 的主机名，最好顺手改成好看的名字，不要用默认的乱码。

![最好把主机名从默认的乱码改成好打的名字](https://img.duanyll.com/img/20240630234302.png)

## Step 2 - 安装 Visual Studio 和 CUDA

由于 CUDA 的编译器和调试器都依赖于 MSVC，所以我们直接安装一个完整的 Visual Studio 来减少麻烦。

{% link https://visualstudio.microsoft.com/zh-hans/downloads/ %}

下载 Visual Studio Community 2022，安装时选择 C++ 工作负载。安装过程略，只需要一直点下一步。

![至少选择 C++ 工作负载，别的看喜好选择。](https://img.duanyll.com/img/20240630230645.png)

> 如果想要减少麻烦，就不要修改任何东西的默认安装路径。
>
> 如果 C 盘不够大，就换一个足够大的 C 盘。

安装完 Visual Studio 之后，按提示重启电脑。随后下载并安装 CUDA Toolkit。

{% link https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local %}

![直接安装你看到的最新版本，无论你想用的深度学习库要求使用哪个版本的 CUDA](https://img.duanyll.com/img/20240630231108.png)

只需要一直点下一步。会覆盖显卡驱动，所以屏幕会闪几下。

正确完成本节后，应该能在 Windows 上运行 `nvidia-smi` 命令，显示显卡的状态。

![能在 Windows 上运行 nvidia-smi](https://img.duanyll.com/img/20240630231738.png)

## Step 3 - 安装 WSL2

确保是 Windows 11 或 Windows 10 22H2 (19045) 以上的版本。最新版本的 Windows 应当无需额外设置即可使用 `wsl` 命令，无论是否安装了 WSL。

![可以直接运行 WSL 命令](https://img.duanyll.com/img/20240630232545.png)

如果找不到 `wsl` 命令说明需要手动安装 WSL2。参考官方教程：

{% link https://learn.microsoft.com/en-us/windows/wsl/install-manual %}

对于有 `wsl` 命令的用户，直接运行 `wsl --install` 即可。安装中会多次请求 UAC 权限，确保有 [好的网络连接](#step-1---访问互联网)。

![按照提示重启电脑](https://img.duanyll.com/img/20240630233136.png)

重启电脑后自动继续安装，或者手动运行 `wsl` 命令。

![设置用户名和密码，按照惯例，输入密码时不会回显](https://img.duanyll.com/img/20240630233542.png)

![默认为安装了 Ubuntu 22.04，这是我们需要的](https://img.duanyll.com/img/20240630233710.png)

## Step 4 - 在 WSL 中访问互联网

一种方法是让 WSL 使用 Windows 上的代理服务器联网。由于 Hyper-V 的默认网络设置，WSL2 中 Windows 宿主机的 IP 地址会在每次重启时改变（几乎必然改变）。不过在 WSL2 中能解析 Windows 宿主机的主机名，通过主机名访问 Windows 宿主机，在主机名后加 `.local`：

![确保能从 WSL 内 ping 通主机](https://img.duanyll.com/img/20240630234523.png)

就可以直接在 `.bashrc` 中设置代理（通常 WSL 的主机名和 Windows 是相同的），直接运行命令追加 `.bashrc` 文件：

```bash
echo 'export http_proxy=http://$(hostname).local:7890' >> ~/.bashrc
echo 'export https_proxy=http://$(hostname).local:7890' >> ~/.bashrc
```

重启 shell 或者直接运行 `source ~/.bashrc`，应该能直接访问互联网。

![确保能直接访问互联网](https://img.duanyll.com/img/20240630235033.png)

apt 不会使用这个代理。我的经验是使用国内镜像站会比使用代理更快，所以修改 `/etc/apt/sources.list` 文件，将默认的源替换为国内源。

```bash
sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
sudo apt update
```

为了使用 Docker 的 apt 源，还需要设置 apt 代理：

```bash
echo "Acquire::http::Proxy \"http://$(hostname).local:7890\";" | sudo tee /etc/apt/apt.conf.d/99proxy
echo "Acquire::https::Proxy \"http://$(hostname).local:7890\";" | sudo tee -a /etc/apt/apt.conf.d/99proxy
sudo apt update
```

## Step 5 - 在 WSL 中安装 CUDA

无论最后需要用什么版本的 CUDA，都在 WSL 中安装最新版的 CUDA Toolkit。

{% link https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local %}

![从这里获得最新版的安装指令，一条一条地粘到 WSL 里运行](https://img.duanyll.com/img/20240701000415.png)

![](https://img.duanyll.com/img/20240701000749.png)

![](https://img.duanyll.com/img/20240701001112.png)

安装完成后应当能在 WSL 中运行 `nvidia-smi` 命令，显示显卡的状态。

![](https://img.duanyll.com/img/20240701001148.png)

## Step 6 - 在 WSL 中安装 Docker

不要使用 Docker Desktop，它有太多的 Bug。我们直接在 WSL 中安装 Docker。

{% link https://docs.docker.com/engine/install/ubuntu/ %}

粘到 WSL 里运行（已加入代理设置）：

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc --proxy http://$(hostname).local:7890
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

随后在 Docker Daemon 的 Systemd 单元文件中配置代理环境变量

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
echo '[Service]' | sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf
echo "Environment=\"HTTP_PROXY=http://$(hostname).local:7890\"" | sudo tee -a /etc/systemd/system/docker.service.d/http-proxy.conf
echo "Environment=\"HTTPS_PROXY=http://$(hostname).local:7890\"" | sudo tee -a /etc/systemd/system/docker.service.d/http-proxy.conf
echo "Environment=\"NO_PROXY=localhost,127.0.0.1\"" | sudo tee -a /etc/systemd/system/docker.service.d/http-proxy.conf
sudo systemctl daemon-reload
sudo systemctl restart docker
```

把当前用户加入 `docker` 组，以免每次用 docker 都要 `sudo`：

```bash
sudo usermod -aG docker $USER
```

> 别用 Rootless Docker, 纯属自找麻烦。

需要重启 shell。创建 Docker Client 的配置文件并设置代理，这样容器中会自动添加代理的环境变量：

```bash
mkdir -p ~/.docker
echo "{\"proxies\":{\"default\":{\"httpProxy\":\"http://$(hostname):7890\",\"httpsProxy\":\"http://$(hostname):7890\",\"noproxy\":\"localhost,127.0.0.1,::1\"}}}" > ~/.docker/config.json
```

> 这里不加 `.local`, 不正确的 noproxy 可能导致 gradio 无法启动。

正确完成本节后，应当能在 WSL 中运行 `docker run hello-world` 命令，显示 Docker 正常工作。

![](https://img.duanyll.com/img/20240701093208.png)

配置好 Docker Client 的代理设置后，可以直接在容器中运行 `curl` 命令，访问互联网。

![](https://img.duanyll.com/img/20240701095622.png)

## Step 7 - 安装 NVIDIA Container Toolkit

在 WSL 中可以直接安装 Ubuntu 版本的 NVIDIA Container Toolkit。

{% link https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian %}

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

下载一个带 CUDA 的 PyTorch 镜像试试：

```bash
docker pull pytorch/pytorch:2.3.1-cuda12.1-cudnn8-devel
```

> 注: 使用 Docker 时，可以使用任意的比系统 CUDA 版本低的 CUDA 镜像。开发时请使用 devel 版本的 PyTorch 镜像，只有 devel 版本才包含编译器，可以编译 C++ 扩展。

![PyTorch devel 镜像现在已有 8 个多 G](https://img.duanyll.com/img/20240701094634.png)

> `docker pull` 并不能断点续传，最好用一个好的代理。

成功安装 NVIDIA Container Toolkit 后，能在容器内运行 `nvidia-smi` 命令，显示显卡的状态。

```bash
docker run --rm -it --gpus all pytorch/pytorch:2.3.1-cuda12.1-cudnn8-devel nvidia-smi
```

![](https://img.duanyll.com/img/20240701094957.png)

## Docker 快速入门

一个 Docker 镜像包含了运行程序所需的完整文件系统和环境变量。Docker 容器是一个特殊的进程，使用 Docker 镜像提供的文件系统和环境变量，并且网络栈和主机一般是隔离的（实际上，几乎所有的用户态要素都被隔离了）。相比于虚拟机，Docker 能快速地启动和停止，而且 Docker 镜像的大小通常比虚拟机的小很多。

需要注意的是，Docker 容器被设计成无状态的，容器内的文件系统和环境变量都是临时的，**任何修改都会在容器停止后丢失**。如果需要向容器内安装新的程序或者修改配置文件，应该重新构建一个新的 Docker 镜像。如果需要保存容器内的数据，应该把数据文件挂载（Mount）到宿主机的文件夹或者 Docker Volume。`Docker Commit` 命令可以把运行中的容器保存为新的 Docker 镜像，但是*不推荐用来制作镜像*，只适合用于调试或者紧急保存数据的需求。

可以方便地从 Docker Hub 上下载包含各类 Linux 发行版和软件的镜像，由于 Docker 提供了充分的隔离，几乎所有镜像都能下载后开箱即用，省去了手动安装各类环境的麻烦。如果需要自定义镜像，可以使用 Dockerfile 来描述镜像的构建过程，然后使用 `docker build` 命令构建镜像。Dockerfile 中的每一条指令都会生成一个新的镜像层，Docker 会尽量复用已有的镜像层，以减少镜像的大小。Dockerfile 通常包括 `FROM`, `RUN`, `COPY`, `CMD` 等指令。

- `FROM` 指定基础镜像
- `RUN` 在镜像中运行 Shell 命令，可以用来安装软件
- `COPY` 复制文件到镜像中。由于 Docker 的设计，要复制的文件必须在构建上下文中，所以通常需要把文件放在 Dockerfile 同一目录下
- `CMD` 指定容器启动时默认运行的命令
- `ENV` 设置环境变量

Docker 镜像的构建过程会被缓存，如果 Dockerfile 的某一步发生了变化，Docker 会重新构建这一步之后的所有步骤。下面是一个常见的 Dockerfile 示例：

```Dockerfile
# 有了 Docker，可以使用任意老版本的 PyTorch 和 CUDA，而不会影响其他的项目
FROM pytorch/pytorch:1.7.1-cuda11.0-cudnn8-devel

# Dockerfile 中 APT 包的安装比较复杂，建议复制下面的格式
# rm /etc/apt/sources.list.d/cuda.list 如果镜像中没有 CUDA，则删掉这一行
# 如果不指定 DEBIAN_FRONTEND=noninteractive TZ=Asia/Shanghai 和 -y 参数，构建镜像会因为 apt 等待用户输入而卡死
RUN rm /etc/apt/sources.list.d/cuda.list \
    && sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list \
    && sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive TZ=Asia/Shanghai apt-get install -y git gdb vim curl wget tmux zip cmake ffmpeg libsm6 libxext6 \
    && rm -rf /var/lib/apt/lists/*

# environment.yml 需要放在 Dockerfile 同一目录下
COPY environment.yml /tmp/environment.yml
RUN conda env create -f /tmp/environment.yml
RUN conda init bash

# 除了 Conda，也可以直接用 pip 安装 Python 包，Docker 已经提供了环境隔离
RUN pip install -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com h5py einops tqdm matplotlib tensorboard torch-tb-profiler ninja scipy
```

可以用 `docker build` 命令构建 Docker 镜像：

```bash
docker build -t my-image-name .
```

`-t` 参数指定镜像的名字，只能包含小写字母和数字，可以用 `/` 分隔，`.` 指定 Dockerfile 所在的目录。构建完成后可以用 `docker images` 命令查看所有的镜像。

要启动 Docker 镜像，可以使用 `docker run` 命令：

```bash
docker run --rm -it --gpus all -v $(pwd):/workspace -p 8080:80 my-image-name bash
```

- `--rm` 容器停止后自动删除，一般不用留着因为数据都清除了
- `-it` 交互式启动，可以使用 Shell。如果需要作为后台进程运行，换成 `-d` 参数
- `--gpus all` 允许容器使用所有的 GPU，不加用不了 CUDA
- `-v $(pwd):/workspace` 把当前目录挂载到容器的 `/workspace` 目录，可以在容器内的 `/workspace` 目录中读写文件，数据会随时同步到宿主机，不会丢失
- `-p 8080:80` 把容器的 80 端口映射到宿主机的 8080 端口，可以通过 `localhost:8080` 访问容器内 `80` 端口的 Web 服务。如果不需要映射端口，可以不加这个参数。
  - 在 WSL2 上，这个命令只负责从容器映射到 WSL2 的网络栈
  - 但通常 WSL2 上的端口能被自动映射到 Windows 上，可以直接在 Windows 上访问 `localhost:8080`
- `my-image-name` 指定要启动的镜像名称
- `bash` 指定容器启动时运行的命令，可不加，默认是 `CMD` 指定的命令

使用 `docker ps` 命令可以查看所有正在运行的容器，使用 `docker stop` 命令可以停止容器（容器会在主进程退出后自动停止）。使用 `docker exec` 命令可以在运行中的容器中运行命令。使用 `docker cp` 命令可以从容器中复制文件到宿主机。具体用法略。

Docker Compose 可以用来管理多个容器，也能方便的把容器的启动参数写到文件里。具体用法略。

## DevContainer 指北

Visual Studio Code 的 DevContainer 功能可以让你在容器中开发代码，能自动启动容器并使用 VS Code 在容器内进行开发调试。DevContainer 会自动挂载当前目录到容器内的 `/workspace` 目录，所以容器内的文件会和宿主机同步，不会丢失。VS Code 还能自动配置端口映射和 X11 显示并兼容 WSLg，`plt.show()` 能在 Windows 上显示图像。

要使用 DevContainer，需要安装 [Visual Studio Code](https://code.visualstudio.com/)、[Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) 和 [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 插件。由于我们没有使用 Docker Desktop，所以需要先让 VSCode 连接到 WSL，才能使用 DevContainer 功能。

首次配置大致需要以下几个步骤：

1. 打开 VS Code，按左下角的 `><` 图标，选择 `Remote-WSL: New Window`
2. 在 Terminal 窗口中 `git clone` 你的项目，或者打开一个已有的项目, 项目目录最好放在 WSL 的文件系统中 (如 `/home/username/project`), 然后 `cd` 到项目目录, 用 `code .` 命令打开项目
3. 添加 DevContainer 配置文件 `.devcontainer/devcontainer.json` 和 `.devcontainer/Dockerfile`. Dockerfile 可以参考上一节的例子，DevContainer 配置文件可以参考下面的例子
4. 按左下角的 `><` 图标，选择 `Remote-Containers: Reopen in Container`，VS Code 会自动构建镜像并启动容器，首次启动可能需要下载镜像和安装软件包，耗时较长。如果构建失败，可以在 VS Code 的 Terminal 窗口中查看构建日志。很多构建失败的原因是网络问题，请确保你已经按照上面的步骤在所有地方都设置好了代理。
5. 在容器中可以使用 VS Code 的所有功能，包括调试、代码补全、代码格式化等。容器内的文件会和宿主机同步，不会丢失。容器内的代码修改会立即反映到宿主机，不需要手动同步文件。

下面是 `.devcontainer/devcontainer.json` 模板，需要按需修改挂载数据集的配置（如果需要）

```jsonc
{
  "build": {
    "dockerfile": "Dockerfile",
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.autopep8",
        "ms-vscode.cmake-tools",
        "ms-vscode.cpptools",
        "GitHub.copilot",
        "ms-vscode.hexeditor",
        // Add more extensions here to use in the container
      ],
    },
  },
  "capAdd": [
    "SYS_PTRACE", // Required to use gdb
  ],
  "runArgs": [
    // Enable host.docker.internal DNS name
    "--add-host=host.docker.internal:host-gateway",
    // Enable CUDA support
    "--gpus",
    "all",
  ],
  "mounts": [
    // UNCOMMENT AND TYPE YOUR ABSOLUTE PATH TO THE DATASETS FOLDER
    // "type=bind,source=/absolute/path/to/datasets,target=/datasets"
  ],
  "shutdownAction": "none",
  "hostRequirements": {
    "gpu": true,
  },
}
```
