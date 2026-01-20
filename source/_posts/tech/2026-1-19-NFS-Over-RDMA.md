---
title: Mellanox Connect-X 5 网卡 SN2700 交换机 NFS Over RDMA (RoCEv2) 配置指北
tags:
  - 指北
  - infra
---

目前 CX555 网卡和 SN2700 交换机的价格已经能让 100G 以太网走进寻常百姓家。配置 RoCEv2 和 NFS Over RDMA 其实并不复杂，但网上的资料比较零散，而且有些已经过时。本文记录一下我个人的配置经验，供大家参考。

## 环境

- 网卡：所有服务器使用 Mellanox ConnectX-5 EN 网卡（本例中使用 [惠普版 cx555a](./2025-11-26-HPE-cx555a.md)）
- 交换机：Mellanox Spectrum SN2700，运行 NVIDIA Onyx OS `3.10.4006`
- 存储服务器：Proxmox VE 9.1.4，内核 `6.17.4-1-pve`。别用 Truenas SCALE，Truenas SCALE 的 NFS Over RDMA 特性只在付费版本中支持
- 客户端服务器：Ubuntu 22.04 LTS，使用 HWE 内核 `6.8.0-90-generic`。建议从 Ubuntu 22.04 的 GA 内核升级到 HWE 内核，从 5.15 升级到 6.8 补充了相当多的 NFS 相关特性和修复

## 交换机配置

需要在交换机上启用 RoCEv2 相关特性。请参阅官方文档

{% link https://enterprise-support.nvidia.com/s/article/recommended-network-configuration-examples-for-roce-deployment %}

自从 Onyx OS `3.8.2008` 版本起，交换机自带了 `roce` 命令，可以一键启用 RoCEv2 特性。使用 SSH 或 Console 登陆交换机命令行，执行以下命令：

```
enable
configure terminal
roce
write memory
```

即可自动应用 PFC，ECN，DSCP，DCBX 等相关配置。在交换机和网卡侧都启用 DCBX 特性后，网卡会自动与交换机协商 PFC 和 ETS 配置，无需手动配置。在交换机上运行 `show roce` 命令可以查看自动应用的 RoCEv2 配置模版：

```
RoCE mode      : lossless
LLDP           : enabled
Port trust mode: L3

Application TLV:
  Selector: udp
  Protocol: 4791
  Priority: 3

Port congestion-control:
  Mode    : ecn, absolute
  Min (KB): 150
  Max (KB): 1500

PFC              : enabled
switch-priority 3: enabled

RoCE used TCs:
  ----------------------------------------------
  Switch-Priority   TC     Application   ETS    
  ----------------------------------------------
  3                 3      RoCE          WRR 50%
  6                 6      CNP           Strict 

RoCE buffer pools:
  ----------------------------------------------------------------------------------------------
  Traffic                  Type      Memory   Switch        Memory actual   Usage    Max Usage 
  Pool                               [%]      Priorities                                       
  ----------------------------------------------------------------------------------------------
  lossy-default            lossy     auto     0, 1, 2, 4,   3.6M            0        47.1K     
                                              5, 6, 7                                
  roce-reserved            lossless  auto     3             3.6M            0        1.8M      

Exception list:
N/A
```

如果 Exception list 非空，说明当前交换机上有配置与 RoCEv2 冲突。重启交换机可能会清除这些冲突配置，或者直接恢复交换机出厂设置，然后重新应用 `roce` 命令。

## 驱动安装

> 总的来说，我充分地信任 apt 并倾向于使用发行版自带的内核和驱动，或者通过 apt 在线仓库来安装和更新驱动。我不建议使用各种 `install.sh` 和 `make install` 脚本，这些东西往往会导致系统变得不可维护，在某次 `apt upgrade` 之后爆炸。

下面几乎所有命令都需要 root 权限，请根据需要加上 `sudo`，或直接 `sudo -i` 切换到 root 用户。

### Proxmox VE

Proxmox VE 9.1.4 默认使用一个相当新版本的内核（来自 Ubuntu 25.04，`6.17.4-1-pve`），自带的 `mlx5_core` 和 `mlx5_ib` 已经对 RoCEv2 和 NFS Over RDMA 有很好的支持，安装 DOCA_OFED （原 MLNX_OFED，NVIDIA 收购后更名）反而会导致诡异的问题。如果需要使用 DOCA_OFED 内的 Infiniband 相关的用户态工具，可以先安装 DOCA_OFED 后再卸载 dkms 包：

```bash
export DOCA_URL="https://linux.mellanox.com/public/repo/doca/3.2.0/debian13/x86_64/"
BASE_URL=$([ "${DOCA_PREPUBLISH:-false}" = "true" ] && echo https://doca-repo-prod.nvidia.com/public/repo/doca || echo https://linux.mellanox.com/public/repo/doca)
DOCA_SUFFIX=${DOCA_URL#*public/repo/doca/}; DOCA_URL="$BASE_URL/$DOCA_SUFFIX"
curl $BASE_URL/GPG-KEY-Mellanox.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/GPG-KEY-Mellanox.pub
echo "deb [signed-by=/etc/apt/trusted.gpg.d/GPG-KEY-Mellanox.pub] $DOCA_URL ./" > /etc/apt/sources.list.d/doca.list
sudo apt-get update
sudo apt-get -y install doca-networking
```

卸载多余的 dkms 驱动包

```bash
apt-get -y remove --purge isert-dkms  mlnx-ofed-kernel-dkms iser-dkms knem-dkms srp-dkms
```

其中 `kernel-mft-dkms` 包可以保留，它不与内核自带的驱动冲突，并且我们需要用到 MFT 功能。

另外，在 PVE 上也 **不要** 安装 `mlnx-nfsrdma-dkms` 包，装了会出问题。

> 关于我是怎么发现这个问题的：我配了两台 PVE 服务器做测试，一开始都安装了 `doca-networking`，结果先装的那台服务器装成了 Debian 的内核头文件 `linux-headers-amd64`，而不是 PVE 内核的头文件 `proxmox-default-headers`，导致 dkms 驱动实际上没装上，后面那台服务器装对了头文件。结果第一台服务器能用，第二台服务器有 dmesg 报错
> ```
> infiniband mlx5_0: create_qp:3317:(pid 4751): Create QP type 2 failed
> ```
> 才发现在 PVE 上不需要 doca 的 dkms 驱动，卸载掉就好了。

### Ubuntu 22.04

首先查看内核版本

```bash
uname -r
```

如果还在 5.15 内核上，建议升级到 HWE 内核（6.8 版本），内核从 5.15 升级到 6.8 补充了相当多的 NFS 相关特性和修复

```bash
apt update
apt install --install-recommends linux-generic-hwe-22.04
```

如果需要管理大量服务器，建议创建 udev 规则来统一所有机器上 Mellanox 网卡的设备命名：

```bash
vim /etc/udev/rules.d/70-persistent-net.rules
```

根据网卡 mac 地址添加 udev 规则，例如：

```
SUBSYSTEM=="net", ACTION=="add", ATTRS{address}=="94:40:c9:xx:xx:xx", NAME="mce0"
```

> `mce0` 这个命名大概来自于某些 BSD 系统对 Mellanox 网卡的命名习惯，可以根据个人喜好修改

与 Proxmox VE 不同，在 Ubuntu 22.04 上需要安装完整的 DOCA_OFED 套件：

```bash
export DOCA_URL="https://linux.mellanox.com/public/repo/doca/3.2.0/ubuntu22.04/x86_64/"
BASE_URL=$([ "${DOCA_PREPUBLISH:-false}" = "true" ] && echo https://doca-repo-prod.nvidia.com/public/repo/doca || echo https://linux.mellanox.com/public/repo/doca)
DOCA_SUFFIX=${DOCA_URL#*public/repo/doca/}; DOCA_URL="$BASE_URL/$DOCA_SUFFIX"
curl $BASE_URL/GPG-KEY-Mellanox.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/GPG-KEY-Mellanox.pub
echo "deb [signed-by=/etc/apt/trusted.gpg.d/GPG-KEY-Mellanox.pub] $DOCA_URL ./" > /etc/apt/sources.list.d/doca.list
sudo apt-get update
sudo apt-get -y install doca-networking
```

> DOCA 3.2.1 在 Ubuntu 22.04 上有一些问题，需要同时安装 `gcc-12` 包才能成功编译内核模块。上面用的是 DOCA 3.2.0，暂时没有这个问题。

安装完成后重启服务器，主要目的是应用 udev 规则来统一网卡命名。

## IP 和 QoS 配置

首先启用网卡的硬件 DCBX 特性：

```bash
mst start
mlxconfig -d /dev/mst/mt4119_pciconf0 s LLDP_NB_DCBX_P1=TRUE LLDP_NB_TX_MODE_P1=2 LLDP_NB_RX_MODE_P1=2
```

> 如果网卡设备不是 `/dev/mst/mt4119_pciconf0`，请使用 `mst status` 命令查看正确的设备路径

配置后需要重启服务器才能生效，可以等到后续配完再重启。理论上用下面的命令能免重启重置网卡

```bash
mlxfwreset -d /dev/mst/mt4119_pciconf0 r
```

接下来配置网卡的 IP 地址和 QoS。交换机自带的 RoCEv2 配置模版中不使用 VLAN，我们可以直接在网卡上配置普通的 IP 地址。不同的系统需要用不同的方法持久化配置并触发 QoS 设置脚本

### NetworkManager (Ubuntu Desktop)

Ubuntu 22.04 自带 netplan 和 NetworkManager，建议使用 netplan 编写配置文件。编辑

```bash
vim /etc/netplan/01-network-manager-all.yaml
```

写入

```yaml
network:
  version: 2
  renderer: NetworkManager
  ethernets:
    mce0:
      addresses:
        - 192.168.6.101/24 # 根据实际情况修改 IP 地址
      dhcp4: no
      mtu: 9000
    # 可以添加更多网卡的配置
```

并确保文件权限正确

```bash
chmod 600 /etc/netplan/01-network-manager-all.yaml
```

写入 Post Up 脚本来补充 QoS 设置（Ubuntu 的 NetworkManager 自带一个 shim 脚本来兼容 ifupdown 的脚本）：

```bash
vim /etc/network/if-up.d/mlnx-roce-qos
```

写入以下内容：

```bash
#!/bin/bash

case "$IFACE" in
    mce0)
           echo 106 > /sys/class/infiniband/mlx5_0/tc/1/traffic_class
           cma_roce_tos -d mlx5_0 -t 106
           sysctl -w net.ipv4.tcp_ecn=1
        ;;
esac
```

保存后赋予可执行权限：

```bash
chmod +x /etc/network/if-up.d/mlnx-roce-qos
```

使用下面的命令应用 netplan 配置：

```bash
netplan try
```

出现提示后按回车确认应用配置。

### systemd-networkd (Ubuntu Server)

仍然是编辑 netplan 配置文件

```bash
vim /etc/netplan/99-static-mce0.yaml
```

写入

```yaml
network:
  version: 2
  ethernets:
    mce0:
      addresses:
        - 192.168.6.102/24
      dhcp4: no
      mtu: 9000
```

保存后赋予正确权限

```bash
chmod 600 /etc/netplan/99-static-mce0.yaml
```

写入 systemd-networkd dispather 脚本的 routable 事件来补充 QoS 设置：

```bash
vim /etc/networkd-dispatcher/routable.d/mlnx-roce-qos
```

写入以下内容：

```bash
#!/bin/bash

case "$IFACE" in
    mce0)
           echo 106 > /sys/class/infiniband/mlx5_0/tc/1/traffic_class
           cma_roce_tos -d mlx5_0 -t 106
           sysctl -w net.ipv4.tcp_ecn=1
        ;;
esac
```

保存后赋予可执行权限：

```bash
chmod +x /etc/networkd-dispatcher/routable.d/mlnx-roce-qos
```

使用下面的命令应用 netplan 配置：

```bash
netplan try
```

出现提示后按回车确认应用配置。

### ifupdown (Proxmox VE)

在 Proxmox VE 的 Web 面板中就可以配置静态 IP 地址并把 MTU 设置为 9000（在高级选项中）。不建议直接编辑 `/etc/network/interfaces` 文件，因为 PVE 会在 Web 面板中覆盖这个文件。

写入 if-up 脚本来补充 QoS 设置：

```bash
vim /etc/network/if-up.d/mlnx-roce-qos
```

写入以下内容：

```bash
#!/bin/bash

case "$IFACE" in
    mce0)  # 根据实际情况修改网卡名称
           echo 106 > /sys/class/infiniband/mlx5_0/tc/1/traffic_class
           cma_roce_tos -d mlx5_0 -t 106
           sysctl -w net.ipv4.tcp_ecn=1
        ;;
esac
```

保存后赋予可执行权限：

```bash
chmod +x /etc/network/if-up.d/mlnx-roce-qos
```

应用配置：

```bash
ifdown mce0 && ifup mce0
```

## RoCEv2 测试

到现在重启服务器，理论上 RoCEv2 就能通信了。做一些基本的检查：

```bash
mlnx_qos -i mce0
```

关键是确认 `DCBX Mode` 是 `Firmware Controlled`。刚刚开机后可能还没有接受到具体的 DCBX 配置，可以等几分钟再检查一次，正确的输出应该类似于：

```
DCBX mode: Firmware controlled
Priority trust state: dscp
dscp2prio mapping:
        prio:0 dscp:07,06,05,04,03,02,01,00,
        prio:1 dscp:15,14,13,12,11,10,09,08,
        prio:2 dscp:23,22,21,20,19,18,17,16,
        prio:3 dscp:31,30,29,28,27,26,25,24,
        prio:4 dscp:39,38,37,36,35,34,33,32,
        prio:5 dscp:47,46,45,44,43,42,41,40,
        prio:6 dscp:55,54,53,52,51,50,49,48,
        prio:7 dscp:63,62,61,60,59,58,57,56,
Receive buffer size (bytes): 130944,130944,0,0,0,0,0,0,max_buffer_size=262016
Cable len: 7
PFC configuration:
        priority    0   1   2   3   4   5   6   7
        enabled     0   0   0   1   0   0   0   0   
        buffer      0   0   0   1   0   0   0   0   
tc: 0 ratelimit: unlimited, tsa: ets, bw: 50%
         priority:  0
         priority:  1
         priority:  2
         priority:  4
         priority:  5
         priority:  7
tc: 3 ratelimit: unlimited, tsa: ets, bw: 50%
         priority:  3
tc: 6 ratelimit: unlimited, tsa: vendor
         priority:  6
```

可以看到已经自动设置了 PFC 和 ETS。

下一步查看 `show_gids` 输出，确认 RoCEv2 GID 已经分配：

```bash
show_gids
```

正确的输出能够看到有 IPv4 地址的行：

```
DEV     PORT    INDEX   GID                                     IPv4            VER     DEV
---     ----    -----   ---                                     ------------    ---     ---
mlx5_0  1       0       fe80:0000:0000:0000:9640:c9ff:fe8c:a09c                 v1      mce0
mlx5_0  1       1       fe80:0000:0000:0000:9640:c9ff:fe8c:a09c                 v2      mce0
mlx5_0  1       2       0000:0000:0000:0000:0000:ffff:c0a8:0684 192.168.6.132   v1      mce0
mlx5_0  1       3       0000:0000:0000:0000:0000:ffff:c0a8:0684 192.168.6.132   v2      mce0
mlx5_1  1       0       fe80:0000:0000:0000:9440:c9ff:ff8c:a09d                 v1
n_gids_found=5
```

如果没有看到 IPv4 地址的行，但 `ip a` 能看到网卡有正确的 IP 地址，可能网络管理器和 `rdma-ndd.service` 服务的启动顺序有问题。**`rdma-ndd.service` 应当在网卡 link up 之前启动。**尽管一般情况下网络管理器声明为在 `rdma-ndd.service` 之后启动（`After=network-pre.target`），但 `rdma-ndd.service` 只有在网卡的 infiniband 驱动加载后才会被 udev 规则触发，这就可能导致 `rdma-ndd.service` 在网卡 link up 之后才启动，修起来感觉比较麻烦。如果确认是这个问题，重新 link up 可以解决：

```bash
ip link set dev mce0 down
ip link set dev mce0 up
```

再次运行 `show_gids`，应该就能看到 IPv4 地址的行了。可以考虑把上面的命令写入一个脚本，开机后自动执行。

接下来可以运行 `ib_write_bw` 来测个速。在一边运行

```bash
ib_write_bw --report_gbits
```

在另一边运行（双向传输，测试 5 秒钟，目标 IP 地址根据实际情况修改）：

```bash
ib_write_bw -b -D 5 --report_gbits 192.168.6.106
```

看到这个结果就是接近跑满 100GbE 了（最下面一栏 BW average）：

```
WARNING: BW peak won't be measured in this run.
---------------------------------------------------------------------------------------
                    RDMA_Write Bidirectional BW Test
 Dual-port       : OFF          Device         : mlx5_0
 Number of qps   : 1            Transport type : IB
 Connection type : RC           Using SRQ      : OFF
 PCIe relax order: ON           Lock-free      : OFF
 ibv_wr* API     : ON           Using Enhanced Reorder      : OFF
 TX depth        : 128
 CQ Moderation   : 1
 CQE Poll Batch  : Dynamic
 Mtu             : 4096[B]
 Link type       : Ethernet
 GID index       : 4
 Max inline data : 0[B]
 rdma_cm QPs     : OFF
 Data ex. method : Ethernet
---------------------------------------------------------------------------------------
 local address: LID 0000 QPN 0x008a PSN 0xfffb6d RKey 0x238f86 VAddr 0x007dd5a3cfd000
 GID: 00:00:00:00:00:00:00:00:00:00:255:255:192:168:06:116
 remote address: LID 0000 QPN 0x008a PSN 0xaa095c RKey 0x202129 VAddr 0x0074c6b5900000
 GID: 00:00:00:00:00:00:00:00:00:00:255:255:192:168:06:106
---------------------------------------------------------------------------------------
 #bytes     #iterations    BW peak[Gb/sec]    BW average[Gb/sec]   MsgRate[Mpps]
Conflicting CPU frequency values detected: 1500.000000 != 3300.016000. CPU Frequency is not max.
 65536      560845           0.00               98.02                0.186950
---------------------------------------------------------------------------------------
```

如果差的比较多，检查网卡是否降级到了 PCIE 3.0 x8 链接，这样带宽会被限制在 50Gbps 左右：

```bash
dmesg | grep -i mlx5
```

这个输出就是被 PCIE 卡脖子了：

```
[    8.387515] mlx5_core 0001:43:00.0: firmware version: 16.35.4030
[    8.387840] mlx5_core 0001:43:00.0: 63.008 Gb/s available PCIe bandwidth, limited by 8.0 GT/s PCIe x8 link at 0001:42:01.0 (capable of 126.016 Gb/s with 8.0 GT/s PCIe x16 link)
[    8.856776] mlx5_core 0001:43:00.0: E-Switch: Total vports 18, per vport: max uc(128) max mc(2048)
[    8.866780] mlx5_core 0001:43:00.0: Flow counters bulk query buffer size increased, bulk_query_len(8)
[    8.881967] mlx5_core 0001:43:00.0: Port module event: module 0, Cable plugged
[    8.883192] mlx5_core 0001:43:00.0: mlx5_pcie_event:334:(pid 11): PCIe slot advertised sufficient power (27W).
```

## NFS Over RDMA 配置

如果把以上的 RoCEv2 配置都做好了，NFS Over RDMA 的配置就非常简单了。首先，客户端和服务端都加大 rpc 条目表来提升性能：

```bash
echo "options sunrpc tcp_slot_table_entries=128" >> /etc/modprobe.d/sunrpc.conf
echo "options sunrpc tcp_max_slot_table_entries=128" >> /etc/modprobe.d/sunrpc.conf
sysctl -w sunrpc.tcp_slot_table_entries=128
```

### 服务端

在 Proxmox VE 上安装 NFS 服务器组件：

```bash
apt update
apt install nfs-kernel-server nfs-common
```

实测 Proxmox VE 自带的 NFS 服务器组件已经支持 NFS over RDMA，无需额外安装 `mlnx-nfsrdma-dkms` 包，装了会出问题。

如果使用 ZFS，可直接通过 ZFS 生成 NFS 导出：

```bash
zfs set sharenfs='rw=@192.168.4.0/22,rw=@192.168.123.0/24,async,no_subtree_check,all_squash,anonuid=999,anongid=10000' poolname/dataset
```

简要说明一下这一串参数：

- `rw=@192.168.4.0/22` 允许读写访问的 IP 段，可以添加多个
- `async` 启用异步写入以提升性能
- `no_subtree_check` 禁用子树检查以提升性能
- `all_squash,anonuid=999,anongid=10000` 将所有客户端的用户映射为 `999:10000` 用户，防止不同机器上 uid 和 gid 不一致导致权限问题。你可以根据需要修改为其他 uid 和 gid。简单起见，可以将挂载点给 chown 成这个用户，并 `chown 2755`. 在这个配置下，还可以在 NFS 服务器上用 root 用户创建所有者为 root 的文件，从而实现客户端只能读取但不能修改的效果。

> 也许在 PVE 主机上使用 `100000:100000` 也是个好主意，这是非特权 PCT 容器和 virtiofs 的默认映射用户

如果不使用 ZFS，可以手动编辑 `/etc/exports` 文件来添加 NFS 导出：

```
/mnt/data 192.168.4.0/22(rw,sync,no_subtree_check,all_squash,anonuid=999,anongid=10000) 192.168.123.0/24(rw,sync,no_subtree_check,all_squash,anonuid=999,anongid=10000)
```

修改 `nfs.conf` 来启用 RDMA 支持：

```bash
vim /etc/nfs.conf
```

修改其中的 `[nfsd]` 段，启用 `rdma`：

```ini
[nfsd]
# debug=0
# threads=16
# host=
# port=0
# grace-time=90
# lease-time=90
# udp=n
tcp=y
# vers3=y
# vers4=y
# vers4.0=y
# vers4.1=y
# vers4.2=y
rdma=y
rdma-port=20049
```

20049 是 NFS over RDMA 的默认端口，可以根据需要修改。

重启 NFS 服务：

```bash
systemctl restart nfs-server
```

理论上不需要手动加载任何内核模块，该加载的自己会加载。

### 客户端

需要额外安装 `mlnx-nfsrdma-dkms` 包来启用 NFS over RDMA 支持：

```bash
apt update
apt install mlnx-nfsrdma-dkms nfs-common
```

临时使用 `mount` 命令挂载 NFS over RDMA：

```bash
mkdir -p /mnt/nfs_rdma
mount -t nfs -o rdma,port=20049,vers=4.2,nconnect=16 <server_ip>:/poolname/dataset /mnt/nfs_rdma
```

将 `<server_ip>` 替换为 NFS 服务器的 IP 地址，`/poolname/dataset` 替换为实际的导出路径。执行命令行即可访问挂载点中的文件。

通过 `/etc/fstab` 来持久化挂载配置，并添加更多优化性能的参数：

```bash
vim /etc/fstab
```

添加一行：

```
<server_ip>:/poolname/dataset /mnt/nfs_rdma noauto,rdma,port=20049,vers=4.2,nconnect=16,rsize=1048576,wsize=1048576,hard,proto=rdma,timeo=600,retrans=2,noatime,nodiratime,actimeo=60,x-systemd.automount,x-systemd.idle-timeout=600,x-systemd.mount-timeout=30,_netdev  0  0
```

这里还使用了 systemd 的自动挂载功能（`x-systemd.automount`），避免开机时因为网络未就绪而导致挂载失败的问题。

## 注释

1. 从内核 5.15 起，nfs 客户端支持对同一服务器共享连接，创建 rdma 协议挂载点后，原有的 tcp 协议挂载点会自动升级为 rdma 协议
2. 从内核 5.18 起，内核支持跨挂载点创建 reflink 链接，也支持通过 nfs 创建底层 zfs 的 reflink 链接。但由于 linux 内核仍未解除对跨 superblock reflink 的限制，尽管 zfs 本身支持跨 dataset 的 block clone，linux 上无法跨越 zfs dataset 创建 reflink 链接。参见 [OpenZFS 讨论](https://github.com/openzfs/zfs/issues/15345)
3. RDMA 网络流量不经过 CPU 和内核处理，因此无法被常规的流量监控工具（如 iftop, nload）监控到。
4. Docker 挂载点不能透传 systemd 的自动挂载功能，在上面的例子中，不能使用 `docker run -v /mnt:/data` 来在容器中访问 `/data/nfs_rdma`，但是使用 `docker run -v /mnt/nfs_rdma:/data` 是可以的。