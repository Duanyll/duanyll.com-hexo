---
title: Windows TUN 分流旁路由指北
tags:
  - 指北
---

## 为什么要使用（不使用）TUN

![一个典型的分流软件 TUN 配置页面](https://img.duanyll.com/img/981d476d.png)

为什么在 [这篇文章](./2024-6-30-WSL2-Docker-Deep-Learning.md#step-1---访问互联网) 里我不建议所有人都使用 TUN？

1. 开启分流软件的 TUN 模式时，容易与其他 VPN 软件（校园 VPN、游戏加速器、Wireguard 等）内置的 TUN 冲突，不经复杂配置，可能会导致无法上网；
2. 开启 TUN 模式后，用 Proxy SwitchyOmega 切换直连模式会失效；
3. 为了达到与 HTTP Proxy 近似的延迟体验，Fake IP、Sniffing 等机制太脏了，在一些 Corner Case 下会搞出难以排查的问题来；
4. Meta 的 TUN 会吃掉 ICMP 包，导致无法通过 ping 和 traceroute 诊断网络问题。

然而有的情况下，TUN 模式是必须的。

1. 需要代理非 HTTP 的三层流量（SSH、RDP 等），又懒得配置 ProxyCommand、RDP Gateway 等选项；
2. 要用的应用刻意地不从 IE 代理或者环境变量中读取代理设置（如 Cloudflare WARP、某些游戏）。

所以有了这篇文章，旨在帮助大家更好的去做 TUN 需要的 “复杂配置”，以实现一些炫酷的效果。

## 实现全屋设备上网

> 值得一提的是，网上许多在 Windows 上配置全屋上网的教程是**错误的**，所以很多人误以为 Windows 不能完美的实现全屋上网，以至于转向 Openwrt 等方案徒增成本。实际上 Windows 作为旁路由除了费电并不比其他方案差。

### 原理和方案

> 只想看操作步骤可以跳过本节。

首先回忆一下分流软件如何通过 TUN 接管本机的流量：

1. 分流软件读取系统路由表，获得原来的默认网关 IP 地址和出口网卡；
2. 分流软件创建虚拟网卡（TUN），IP 地址为 `198.18.0.1/24`；
3. 分流软件创建新的默认网关路由表条目 `default via 192.168.0.2` 并确保优先级比原来的默认路由高；
4. 之后非 LAN 的流量会通过 TUN 出口，分流软件可以在用户态获得进入 TUN 的 IP 数据包；
5. 对于出口数据包，分流软件在用户态通过指定出口网卡的形式将数据包发送到原来的默认网关所在的网卡，并应用各种代理协议规则。即使是 DIRECT 模式，对内核来说分流软件也总是会发起新的连接，使用不同的端口号，起到类似 SNAT 的效果。

要想实现将 Windows 电脑作为三层透明代理路由，似乎只需要启用 Windows 内核的 IP 路由转发功能，并允许转发来自物理网卡的流量。对于其他设备，设置默认网关为 Windows 电脑物理网卡的 IP 地址（假设为 `192.168.0.2`，假设家用路由器的 IP 地址为 `192.168.0.1`）。然而，再仔细考虑一下这个过程：

1. 另一个设备发送 IP 数据包 `192.168.0.3->1.2.3.4` 到 `192.168.0.2` 的 MAC 地址
2. Windows 内核收到数据包，根据路由规则走默认网关 `198.18.0.2` 将其转发到 TUN 虚拟网卡
3. 分流软件收到数据包，假设根据规则应该使用 `5.6.7.8` 作为代理服务器
4. 分流软件试图创建连接 `192.168.0.2->5.6.7.8`，向物理网卡发送目的地为 `5.6.7.8` 的数据包
5. 然而因为对物理网卡启用了 IP 路由转发功能，对于目的地为 `5.6.7.8` 的数据包，Windows 内核又根据 TUN 的默认路由优先级比物理网卡的默认路由高，将数据包送回 TUN 的网关 `198.18.0.2`
6. 于是分流软件发现接受到了回环数据包，丢弃回环数据包并记录日志。此时，无论是 Windows 电脑本机还是其他设备，都无法访问 LAN 以外的网络。

网上一些错误的教程会建议在 Windows 电脑上针对所有用到的上游代理服务器 IP 地址加入路由表条目

```
5.6.7.8/32 via 192.168.0.1
```

这个做法能允许通过上游代理 `5.6.7.8` 访问外部网络。但是：

- 每次上游代理 IP 地址变更都需要修改路由表条目。对于复杂的、动态更新的分流规则，需要把所有上游代理的 IP 地址都加入路由表条目，维护起来非常麻烦；
- 致命错误：DIRECT 出口仍然不能工作。分流分了个寂寞。

矛盾在于如果想让 TUN 的默认路由优先级高于物理网卡的默认路由，就不能对流量出口的物理网卡（IP Interface）开启 IP 路由转发功能。然而透明代理入口的 IP Interface 又必须开启 IP 路由转发功能才能让 Windows 内核处理来自其他设备的流量。于是一种思路是流量出口和入口不使用同一个 IP Interface。

如果有两张物理网卡，将他们都分别连接到同一个 LAN 中，自然就有两个 IP Interface 了。要在普通家庭网络的硬件设施上配置 VLAN ID 需要支持 VLAN 的交换机和或者可管理的光猫，比较麻烦，对于只使用电脑上一个物理网口的情况可以考虑使用 macvlan 的方式来在一个物理网口上创建多个 IP Interface。在 Windows 上可借助 Hyper-V 的虚拟交换机功能来实现 macvlan。

### 操作步骤

以下命令在具有管理员权限的 PowerShell 中执行。

{% box 注意 color:yellow %}

按照上面分析的方案，我们不能在所有 IP Interface 上都开启 IP 路由转发功能。确保全局 IP 路由转发注册表项没有设置：

```powershell
Get-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters' -Name 'IPEnableRouter'
```

如果已经设置为 `1`，请执行以下命令将其删除：

```powershell
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters' -Name 'IPEnableRouter' -Value 0
```

还需要确保 Routing and Remote Access (RRAS) 服务没有启用。这项服务用于在 Windows Server 上应用由图形界面配置的路由选项，但在 Windows 10/11 上并不需要，启用它会错误地开启所有 IP Interface 的路由转发功能。查看 RRAS 服务状态：

```powershell
Get-Service RemoteAccess | Select-Object -Property Name, StartType, Status
```

如果服务状态为 `Running`，请执行以下命令停止并禁用该服务：

```powershell
Stop-Service RemoteAccess
Set-Service RemoteAccess -StartupType Manual
```

另外，本文所有配置均是在关闭 Windows Defender 防火墙的情况下进行的。已知火绒默认的防火墙配置不会带来麻烦。我个人建议使用火绒安全软件，并使用专门的防火墙硬件（运营商提供的光猫和家用路由器通常自带了防火墙功能，进阶用户可以考虑使用 pfSense、OPNSense 等开源防火墙）来保护 Windows 电脑的网络安全。

{% endbox %}

首先配置 Hyper-V 虚拟交换机和 macvlan。确保启用了 Hyper-V 功能：

![Windows 可选功能](https://img.duanyll.com/img/0c946f37.png)

> 如果你使用 Windows 家庭版，不妨在淘宝上花*两块钱*购买一个激活码，永久激活 Windows 专业版以使用 Hyper-V。

查看当前的物理网卡：

```powershell
Get-NetAdapter | Select-Object Name, ifIndex, MacAddress
```

输出可能是

```
Name                       ifIndex MacAddress
----                       ------- ----------
以太网 4                        29 D8-XX-XX-XX-XX-32
vEthernet (Default Switch)      32 00-XX-XX-XX-XX-F9
Mihomo                          19
WLAN                            14 38-XX-XX-XX-XX-4D
vEthernet (WSL)                 66 00-XX-XX-XX-XX-51
蓝牙网络连接                     8 38-XX-XX-XX-XX-4E
```

假设我们要使用 `以太网 4` 作为出口网卡，创建一个虚拟交换机。

```powershell
New-VMSwitch -Name "vmbr0" -NetAdapterName "以太网 4" -AllowManagementOS $true
```

其中 `-AllowManagementOS $true` 选项在宿主机上自动创建一个虚拟网卡 `vEthernet (vmbr0)` 连接到虚拟交换机，并保持原来物理网卡的 IP 和 mac 地址等属性。接下来再创建一个虚拟网卡 `vEthernet (vmbr0.1)`，连接宿主机和 vmbr0 虚拟交换机作为旁路由的入口网卡。

```powershell
Add-VMNetworkAdapter -SwitchName "vmbr0" -Name "vmbr0.1" -ManagementOS
```

查看现在的网卡列表：

```powershell
Get-NetAdapter | Select-Object Name, ifIndex, MacAddress
```

输出应该是

```
Name                       ifIndex MacAddress
----                       ------- ----------
以太网 4                        29 D8-XX-XX-XX-XX-32
vEthernet (Default Switch)      32 00-XX-XX-XX-XX-E1
vEthernet (vmbr0.1)             23 00-XX-XX-XX-XX-00
Mihomo                          19
WLAN                            14 38-XX-XX-XX-XX-4D
vEthernet (WSL)                 66 00-XX-XX-XX-XX-49
vEthernet (vmbr0)               10 D8-XX-XX-XX-XX-33
蓝牙网络连接                     8 38-XX-XX-XX-XX-4E
```

此时 vmbr0.1 虚拟网卡直接桥接到外部网络，并应该已经通过家用路由器的 DHCP 获得了 IP 地址。但为了配置正确的路由规则，需要将其改为静态 IP 地址并且比 vmbr0 虚拟网卡（LAN 出口）具有更长的子网前缀。假设家用路由器的 LAN 网段为 `192.168.1.0/24`，路由器 IP 地址为 `192.168.1.1`，采用以下的 IP 地址分配方案：

- `192.168.1.1/24` 家用路由器 LAN 口
- `192.168.1.2/25` Windows 电脑 vmbr0 虚拟网卡
- `192.168.1.3-192.168.1.126` 家用路由器 DHCP 地址池。需要登录路由器管理界面进行查看和配置。DHCP 下发的子网前缀长度仍为 `/24`，但实际分配的 IP 地址保持在前 `/25` 的范围内。
- `192.168.1.129/25` Windows 电脑 vmbr0.1 虚拟网卡
- `192.168.1.128/25` 需要科学上网的设备在此网段内手动配置静态 IP 地址并将网关设为 `192.168.1.129`。

{% folding open:true 说明 %}

对于支持忽略 DHCP 并手动配置 IP 的设备（Android、iOS、PlayStation 等），以上方案无需 VLAN 可共享同一个二层广播域。如果有不支持手动配置 IP 的设备（如某些智能家居设备），则可能需要配置 VLAN（本文略），或者使用支持 DHCP Snooping 的交换机来隔离设备（很多家用路由器的 DHCP 不能关闭），手动搭建 DHCP 服务器。Windows 爱好者可以使用 [Technitium DNS Server](https://technitium.com/dns/) 搭建 DNS 和 DHCP 服务器，本文不详述。

{% endfolding %}

接下来将 vmbr0 和 vmbr0.1 都配置为静态 IP 地址，使用之前查看的 `ifIndex`：

```powershell
Set-NetIPInterface -InterfaceIndex 10 -Dhcp Disabled
Set-NetIPInterface -InterfaceIndex 23 -Dhcp Disabled
New-NetIPAddress -InterfaceIndex 10 -IPAddress 192.168.1.2 -PrefixLength 25 -DefaultGateway 192.168.1.1
New-NetIPAddress -InterfaceIndex 23 -IPAddress 192.168.1.129 -PrefixLength 25
```

配置系统 DNS 服务器：

```powershell
Set-DnsClientServerAddress -InterfaceIndex 10 -ServerAddresses 223.5.5.5, 192.168.1.1
```

> 此处选择的 DNS 服务器地址没有太大作用，一般分流软件都会劫持 DNS 请求并应用复杂的 DNS 分流规则。

最后，单独启用 vmbr0.1 的 IP 路由转发功能：

```powershell
Set-NetIPInterface -InterfaceIndex 23 -Forwarding Enabled
```

重启分流软件来使其重新读取路由表，并开启 TUN 模式，勾选允许外部访问。

![TUN 选项](https://img.duanyll.com/img/ee86cdf6.png)

在需要科学上网的设备上，连接同一个 LAN，设置静态 IP 地址为 `192.168.1.130`，子网掩码为 `255.255.255.128`，网关为 `192.168.1.129`，即可实现全局上网。同时 WSL 也能通过此 TUN 模式访问互联网。

{% frame iphone11 img:https://img.duanyll.com/img/d355ce1d.png %}

## 实现 Wireguard 分流

现在 Meta 有了正确的 Wireguard 实现，可以添加 `wireguard` 类型的出站代理并编写分流规则，然而 Meta 的 Wireguard 实现不支持入站连接（如 3389 远程桌面、SSH 等），因此仍然需要使用 [WireGuard for Windows](https://download.wireguard.com/windows-client/) 来实现入站 Wireguard 连接。一般来说，只要 Peer 的 AllowedIPs 不为 `0.0.0.0/0`，无需任何额外设置即可同时启用 Meta 的 TUN 和 Wireguard 的 TUN，因为 Wireguard 的路由表项子网前缀更长。然而如果需要通过 WireGuard Peer 访问简单 AllowedIPs 不能描述的对端（例如想分流整个校园内网、教育网、通过校内跳板机访问图书馆等基于复杂 IP、域名的分流规则），则可以考虑用 Meta 的 TUN 模式给 WireGuard TUN 分流出站流量，WireGuard TUN 直接处理入站流量。

首先需要配置 Wireguard Peer，手动创建优先级低的路由表条目。在 Wireguard 的 GUI 中编辑 Peer 的配置文件，设置以下内容：

```ini
[Interface]
PostUp = netsh int ipv4 add route 0.0.0.0/0 interface="wgvpn" metric=10000 store=active
PreDown = netsh int ipv4 del route 0.0.0.0/0 interface="wgvpn"
Table = off

[Peer]
AllowedIPs = 0.0.0.0/0
```

Wireguard 创建的虚拟网卡名称就是配置文件的名称（此为 `wgvpn`），请相应地修改。在 Meta 的配置文件中创建指定网卡的 `direct` 出站代理：

```yaml
proxies:
  - name: Wireguard-TUN
    type: direct
    ip-version: ipv4
    udp: true
    interface-name: wgvpn
```

则可以按需求编写分流规则，使用 `Wireguard-TUN` 作为出站代理。

{% box 注意 color:yellow %}

如果 WireGuard Peer 的外网 IP 地址位于需要通过 Peer 访问的范围内（如都在校园网、教育网网段），则需要在 Meta 中针对该 Peer 的 IP 地址添加更高优先级的 DIRECT 规则，否则就会形成循环路由，导致无法访问。

```yaml
rules:
  - ...
  - DOMAIN,peer.example.com,DIRECT
  - DOMAIN-SUFFIX,example.com,Wireguard-TUN
  - ...
```

{% endbox %}

## 实现 WSL 入站

在 Windows 10 的 WSL2 中，很难给 WSL2 配置静态的 IP 地址并允许外部访问 WSL2 上的服务，自动端口转发只绑定 Windows 上的 `127.0.0.1` 地址不允许外部访问。手动配置 WSL2 的网络接口（并允许外部路由）总是会被重置。实现从其他机器上访问 WSL2 的服务最简单的方法恐怕是在 WSL2 中配置 WireGuard 连接到自己的 VPN 对端服务器。

{% folding open:true 说明 %}

如果专门上网搜索 `wsl wireguard` 关键词，有不少文章说 WSL2 的内核不支持 WireGuard，需要手动编译内核。实际上最新的 WSL2 内核已经支持 WireGuard 了。只需要确保在使用最新版本的 WSL2。

```powershell
wsl --update
```

{% endfolding %}

只需要使用 apt 安装 WireGuard 前端

```bash
sudo apt install wireguard
```

然后在 WSL2 中创建 WireGuard 配置文件 `/etc/wireguard/wg0.conf`，内容与一般 Linux 上的 WireGuard 配置文件相同。然后在 WSL2 中运行以下命令启动 WireGuard：

```bash
sudo wg-quick up wg0
```

再安装和启用 OpenSSH Server：

```bash
sudo apt install openssh-server
sudo systemctl enable --now ssh
```

然而，WSL2 的虚拟机会在任何 `wsl.exe` 会话结束后短暂时间内自动休眠，导致无法处理入站连接。修改 `~/.wslconfig` 文件只能有限地延长 WSL2 的自动休眠超时。为了让 WSL2 能像真正的 Linux 服务器一样随时接受 SSH 连接，（首先要防止 Windows 进入睡眠状态），一个优雅的解决方案是用 WinSW 把 `wsl.exe` 包装成一个 Windows 服务，确保 WSL2 开机启动并在后台持续运行。

下载 [WinSW 2](https://github.com/winsw/winsw/releases/tag/v2.12.0) 并将下载的 exe 文件重命名为 `wsl-keepalive.exe`（重要），放在你喜欢的工作目录下。然后在同一目录下创建 `wsl-keepalive.xml` 文件，内容如下：

```xml
<service>
    <id>wslkeepalive</id>
    <name>WSL Keep Alive</name>
    <description>This service prevents WSL from automatically shutting down.</description>
    <executable>wsl</executable>
    <log mode="roll"></log>
</service>
```

然后在 PowerShell 中执行以下命令安装服务：

```powershell
.\wsl-keepalive.exe install
```

此时启动服务会失败，需要手动设置此服务以用户权限运行。为了方便输入用户凭据，使用图形界面设置服务：

```powershell
services.msc
```

在服务列表中找到 `WSL Keep Alive` 服务，右键点击选择“属性”，在“登录”选项卡中选择“此账户”，输入当前用户的用户名（微软账户邮箱）和密码。

![Windows 服务属性](https://img.duanyll.com/img/d5fe1703.png)

将服务设置为自动启动并启动服务（通过图形界面或者 PowerShell）。还可以在图形界面中配置自动恢复选项，以便在 WSL2 崩溃时自动重启服务。

```powershell
Set-Service -Name wslkeepalive -StartupType Automatic
Start-Service -Name wslkeepalive
```

现在在其他连接到 WireGuard VPN 的设备上就可以通过 WSL2 的 Wireguard IP 地址访问 WSL2 上的 SSH 服务了。
