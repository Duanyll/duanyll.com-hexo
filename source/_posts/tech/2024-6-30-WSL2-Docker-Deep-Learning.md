---
title: 基于 WSL2 和 Docker 的深度学习环境指北
tags: 
  - 炼丹
  - Docker
  - 指北
--- 

为什么要使用 WSL2 和 Docker 来管理深度学习环境？本教程的配置方法旨在日常使用的 Windows 机器上建立 CUDA 加速的深度学习环境，以便进行快速的调试与开发代码，而无需忍受连接到远程服务器的延迟。许多的深度学习库不能在 Windows 上开箱即用（尽管许多库只需少量的代码修改即可兼容 Windows 和 MSVC），或者在 Windows 上难以复现行为，所以需要使用 WSL2。作为虚拟机，WSL2 支持绝大多数的 Linux 内核的特性，相较于其他的虚拟化平台，WSL2 能优雅地与 Windows 宿主机共享同一张 CUDA 显卡。我不喜欢使用 Conda，第一是因为 Resolving Environment 太慢了，第二是 conda 的环境隔离程度实际上并不能满足深度学习的需求。Conda 不能隔离 CUDA 运行库，和其他 apt 管理的 C 库，而 Docker 可以，DevContainers 已包含了一套易用的将 Docker 容器用于开发的方案。

> 根本碰都不要碰 Docker Desktop, Bug 太多了。本教程直接在 WSL2 中安装 Docker，不需要 Docker Desktop。

实际上，得益于 WSL2 的设计，本文所述的 WSL2 部分的方法也适用于典型的 Ubuntu 主机。Windows 部分的教程需要 Windows 11 或 Windows 10 22H2 (19045) 以上的版本。推荐安装 [Windows Terminal](https://aka.ms/terminal) 来让命令行体验更美好。

![安装 Windows Terminal 并取代 conhost](https://cdn.duanyll.com/img/20240630232131.png)

## Step 1 - 访问互联网

本教程假定必须使用 HTTP 代理才能访问任何互联网上的网站（实际上相当契合中国大陆的情况了），并且这个代理服务器位于 Windows 宿主机的 7890 端口上。

![一个典型的 HTTP 代理软件](https://cdn.duanyll.com/img/20240630224805.png)

我们首先让 Windows 上的程序能使用这个代理服务器。通常来说只需要**打开 System Proxy 选项**，这会修改 Windows 的 IE 代理设置，适用于多数的图形化程序。**不建议打开 TUN 模式**，这会让情况变得复杂棘手，建议把 TUN 代理留给 “访问内部资产” 的需求，如 EasyConnect 和 WireGuard，而不是 “访问互联网” 的需求。

仅仅这样设置是不够的。许多从 Linux 世界移植的命令行程序从环境变量读取代理设置，而不是从 Windows 的 IE 代理设置读取。可添加 Windows 环境变量 `http_proxy` 和 `https_proxy`，值均为 `http://127.0.0.1:7890`.

![添加 Windows 环境变量](https://cdn.duanyll.com/img/20240630225813.png)

添加完记得重启打开的 Shell，或者直接重启电脑。

![如果以上步骤是正确的，你应该能直接在 PowerShell 中直接 curl google.com](https://cdn.duanyll.com/img/20240630230038.png)

之后还要用到 Windows 的主机名，最好顺手改成好看的名字，不要用默认的乱码。

![最好把主机名从默认的乱码改成好打的名字](https://cdn.duanyll.com/img/20240630234302.png)

## Step 2 - 安装 Visual Studio 和 CUDA

由于 CUDA 的编译器和调试器都依赖于 MSVC，所以我们直接安装一个完整的 Visual Studio 来减少麻烦。

{% link https://visualstudio.microsoft.com/zh-hans/downloads/ %}

下载 Visual Studio Community 2022，安装时选择 C++ 工作负载。安装过程略，只需要一直点下一步。

![至少选择 C++ 工作负载，别的看喜好选择。](https://cdn.duanyll.com/img/20240630230645.png)

> 如果想要减少麻烦，就不要修改任何东西的默认安装路径。
>
> 如果 C 盘不够大，就换一个足够大的 C 盘。

安装完 Visual Studio 之后，按提示重启电脑。随后下载并安装 CUDA Toolkit。

{% link https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local %}

![直接安装你看到的最新版本，无论你想用的深度学习库要求使用哪个版本的 CUDA](https://cdn.duanyll.com/img/20240630231108.png)

只需要一直点下一步。会覆盖显卡驱动，所以屏幕会闪几下。

正确完成本节后，应该能在 Windows 上运行 `nvidia-smi` 命令，显示显卡的状态。

![能在 Windows 上运行 nvidia-smi](https://cdn.duanyll.com/img/20240630231738.png)

## Step 3 - 安装 WSL2

确保是 Windows 11 或 Windows 10 22H2 (19045) 以上的版本。最新版本的 Windows 应当无需额外设置即可使用 `wsl` 命令，无论是否安装了 WSL。

![可以直接运行 WSL 命令](https://cdn.duanyll.com/img/20240630232545.png)

如果找不到 `wsl` 命令说明需要手动安装 WSL2。参考官方教程：

{% link https://learn.microsoft.com/en-us/windows/wsl/install-manual %}

对于有 `wsl` 命令的用户，直接运行 `wsl --install` 即可。安装中会多次请求 UAC 权限，确保有 [好的网络连接](#step-1---访问互联网)。

![按照提示重启电脑](https://cdn.duanyll.com/img/20240630233136.png)

重启电脑后自动继续安装，或者手动运行 `wsl` 命令。

![设置用户名和密码，按照惯例，输入密码时不会回显](https://cdn.duanyll.com/img/20240630233542.png)

![默认为安装了 Ubuntu 22.04，这是我们需要的](https://cdn.duanyll.com/img/20240630233710.png)

## Step 4 - 在 WSL 中访问互联网

一种方法是让 WSL 使用 Windows 上的代理服务器联网。由于 Hyper-V 的默认网络设置，WSL2 中 Windows 宿主机的 IP 地址会在每次重启时改变（几乎必然改变）。不过在 WSL2 中能解析 Windows 宿主机的主机名，通过主机名访问 Windows 宿主机，在主机名后加 `.local`：

![确保能从 WSL 内 ping 通主机](https://cdn.duanyll.com/img/20240630234523.png)

就可以直接在 `.bashrc` 中设置代理（通常 WSL 的主机名和 Windows 是相同的），直接运行命令追加 `.bashrc` 文件：

```bash
echo 'export http_proxy=http://$(hostname).local:7890' >> ~/.bashrc
echo 'export https_proxy=http://$(hostname).local:7890' >> ~/.bashrc
```

重启 shell 或者直接运行 `source ~/.bashrc`，应该能直接访问互联网。

![确保能直接访问互联网](https://cdn.duanyll.com/img/20240630235033.png)

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

![从这里获得最新版的安装指令，一条一条地粘到 WSL 里运行](https://cdn.duanyll.com/img/20240701000415.png)

![](https://cdn.duanyll.com/img/20240701000749.png)

![](https://cdn.duanyll.com/img/20240701001112.png)

安装完成后应当能在 WSL 中运行 `nvidia-smi` 命令，显示显卡的状态。

![](https://cdn.duanyll.com/img/20240701001148.png)

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

![](https://cdn.duanyll.com/img/20240701093208.png)

配置好 Docker Client 的代理设置后，可以直接在容器中运行 `curl` 命令，访问互联网。

![](https://cdn.duanyll.com/img/20240701095622.png)

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

![PyTorch devel 镜像现在已有 8 个多 G](https://cdn.duanyll.com/img/20240701094634.png)

> `docker pull` 并不能断点续传，最好用一个好的代理。

成功安装 NVIDIA Container Toolkit 后，能在容器内运行 `nvidia-smi` 命令，显示显卡的状态。

```bash
docker run --rm -it --gpus all pytorch/pytorch:2.3.1-cuda12.1-cudnn8-devel nvidia-smi
```

![](https://cdn.duanyll.com/img/20240701094957.png)

## Docker 快速入门

TBD.

## DevContainer 指北

TBD.