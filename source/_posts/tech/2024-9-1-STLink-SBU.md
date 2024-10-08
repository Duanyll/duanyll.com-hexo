---
title: Type-C SWD VCP USB 一线通 ST-LINK/V2-1
tags:
  - 电子设计
  - stm32
  - 嘉立创eda
cover: https://img.duanyll.com/img/20240901205441.png
description: >-
  可能是使用最方便的 ST-LINK/V2-1 一线通方案：无需对线，一个 Type-C 接口搞定 SWD
  调试，VCP 虚拟串口和下行 USB，支持正反插，同时引出 ST-LINK/V3 Minie 的 STDC-14
  标准接口，带下游供电短路和倒灌保护。
---

{% link https://oshwhub.com/duanyll/stlink-sbu %}

![省流](https://img.duanyll.com/img/20240902140957.png)

## 摘要

本文提出了一种基于 Type-C 接口调试配件（Debug Accessory）模式的 ST-LINK/V2-1 接
线方案，实现了一次连接同时支持 SWD 调试、VCP 虚拟串口和下行 USB 三种调试功能，而
且支持正反插，便利性较传统的连接方式有显著提升。为了验证方案的可行性，还基于
STM32F103CBT6 和 CH334F 方案设计设计了一款 PCB，验证了方案的可行性。设计的 PCB
除了具备提出的一线通 Type-C 公头，还提供了支持供电的 ST-LINK/V3 Minie 的 STDC-14
小体积标准调试接口，并实现了下行供电的过流和倒灌保护，具备实用价值。最后，本文还
提供了详细的原理图、PCB 设计和 BOM 表，方便读者参考。

## 引言

自行设计单片机最小系统时，调试接口的设计能明显地影响 PCB 的布局和调试的便利性。
常见的基于排针、测试点等的调试接口设计存在以下问题：

- 体积大，占用 PCB 空间
- 需要专用的排线或者探头才能连接到调试接口
- 接口引脚顺序不统一，反复对照引脚定义连接杜邦线费时费力，容易接错
- 调试器提供的 5V 或 3V3 供电没有足够的保护措施，可能导致开发板倒灌电脑 USB 接口
- 调试接口被封闭在开发板内部，需要在外壳上增加额外的开孔

而像 STM32 官方 Discovery 系列开发板采用的将 ST-LINK 集成到开发板上的设计，虽然
改善了连接电脑的便利性，但若需要同时使用 MCU 的 USB 功能，还需要额外的 USB 线连
接到开发板上；另外，板载 ST-LINK 的设计也显著增大了开发板的面积和成本。

本文提出的方案能**复用开发板上的 Type-C 接口，无需任何额外的面积和元器件**，即可
实现一次连接进行 SWD 调试、VCP 虚拟串口，并连接下行 USB。被调试 MCU 侧只需要一个
常见的、廉价的 12/16Pin Type-C 接口，就可以实现同时使用 SWD 调试和 USB 功能，且
支持正反插。如果开发板不需要 USB 功能，则也可以将 USB 数据线复用为 VCP 虚拟串
口，调试器能自动识别 USB 复用为 VCP 的状态。如果开发板使用了 24Pin Type-C 接口，
则可以同时进行 SWD 调试、VCP 虚拟串口和 USB 功能。针对 24Pin 接口，调试器侧的布
线进行了优化，降低了开发板侧的布线扇出难度。

值得注意的是，基于 Type-C 规范定义的调试配件（Debug Accessory）模式，**开发板侧
的 Type-C 调试口也可用作普通的 USB 数据接口**，且开发板可以检测调试接口上连接的
是调试器还是普通的 USB 线缆，从而允许派生出更多的应用场景。

## 相关工作

标准的 JTAG 接口和正版 ST-LINK V2 上巨大的 20Pin 简牛座接口都是通过规范化调试接
口引脚定义来提升接线体验的例子，但是 20Pin 的接口实在是太大了，不适合用在小型开
发板上。ST-Link V3 系列的 STDC-14 调试接口相比于 20Pin 简牛座极大地减小了体积，
然而在开发板侧仍然存在反接的风险，并且价格最低（仍然很高）的 ST-LINK/V3 Minie 不
能提供下行供
电。[极客 STM32 电子开发网的 STLINK](https://item.taobao.com/item.htm?spm=a21n57.1.item.2.1c8b523cSViWIz&priceTId=2147bf9d17252005574896585e4f3d&utparam=%7B%22aplus_abtest%22:%22475785183ac3899d5fd36cfd8e71be5a%22%7D&id=754895571935&ns=1&abbucket=12&skuId=5206391305056)
价格低廉，能直接通过 7Pin 2.54 排针连接到该店设计的开发板，但是双层排针的设计也
存在反接的可能，且开发板上也要为调试接口付出不小的额外面积。

![minoseigenheer 的调试脚位设计](https://img.duanyll.com/img/20240902141043.png)

[minoseigenheer](https://github.com/minoseigenheer) 基于 Type-C 接口的调试配件模
式设计了一种 [SWD over USB-C](https://github.com/minoseigenheer/SWD-over-USB-C)
方案，通过 Type-C 接口实现了 SWD 调试和下行 USB，是本文的灵感来源之一。然而，该
方案未提供 VCP 虚拟串口功能，并且要求开发板具备 24Pin 全针脚的 Type-C 接口，增加
了开发板侧的成本和布线难度。

本方案通过在规范容差范围内调整开发板侧两个 CC 线 Rd 下拉电阻的阻值，实现了从公口
方向检测母口的插入方向（而不是通常的从母口侧检查公口的方向），从而能在调试器一侧
翻转线序，可以利用两个 SBU 针脚进行 SWDIO 和 SWCLK 两线调试。同时，基于对 Rd 下
拉电阻的检测，可以控制模拟开关切换 D+ D- 用作 USB 或 VCP 串口，在 16Pin Type-C
接口上按需提供尽量多的功能。

## 方法

![Rp，Rd 和 Ra](https://img.duanyll.com/img/20240902141448.png)

Type-C 规范要求受电端（Sink）在 CC1 和 CC2 上各接入 5.1kR 的下拉电阻，称为 Rd；
供电端在 CC1 和 CC2 接入一定阻值的上拉电阻或电流源 Rp，以将 CC 线上的电压上拉到
一定值，CC 线上的不同电平指示连接建立初期，受电端允许吸入的最大电流。由于正确的
C-C 连接线只允许连接一侧的 CC 引脚，另一侧 CC 引脚要么开路，要么存在 1kR 的下拉
电阻 Ra 用于开启 VCONN 供电。于是根据两条 CC 线上 Rp，Rd，Ra 的连接状态，可以区
分连接设备的类型和插入方向。

| CC1                | CC2                | 状态                                     |
| ------------------ | ------------------ | ---------------------------------------- |
| Rp Rd 未连接       | Rp Rd 未连接       | 未连接                                   |
| Rp Rd 未连接       | Rp-Rd 0.25V-2.04V  | 使用普通线缆接入设备                     |
| Rp-Rd 0.25V-2.04V  | Rp Rd 未连接       | 使用普通线缆接入设备                     |
| Rp-Ra -0.25V-0.15V | Rp-Rd 0.25V-2.04V  | 使用 E-Marker 线缆接入设备，CC1 是 VCONN |
| Rp-Rd 0.25V-2.04V  | Rp-Ra -0.25V-0.15V | 使用 E-Marker 线缆接入设备，CC2 是 VCONN |
| Rp-Rd 0.25V-2.04V  | Rp-Rd 0.25V-2.04V  | 调试配件模式 (Debug Accessory Mode)      |
| Rp-Ra -0.25V-0.15V | Rp-Ra -0.25V-0.15V | 音频配件模式                             |

Rp-Rd 连接的不同电压还能区分供电能力。于是 Type-C 接口在无需传递 PD 报文的情况下
就能区分多种连接设备的类型和插入方向，为调试配件模式提供了可能。由上表发现由于普
通 Type-C 连接器公口一侧只有一个 CC 引脚，故调试配件模式需要使用特制的公口直接连
接到母口。开发板侧母口通过检测两侧 CC 引脚是否同时具有 vRd-Connect 电压是否存在
调试配件的连接，从而控制 Mux 改变接线。（在只使用 USB 2.0 的情况下，本文的方案不
需要进行检测，可直接连线）。

规范的 Type-C 调试配件模式在不进行插入方向检测的情况下，允许将 2, 3, 6, 7, 8,
10, 11 共 7 个引脚用于传输自定义的调试信号。然而，这要求连接器同时具有 24Pin 的
Type-C 接口，且开发板侧的布线难度较大。简易的 16Pin Type-C 接口只能使用 6, 7, 8
三个引脚，若保留 USB 功能，且不在开发板侧增加额外的元器件，实际上只有 8 号引脚
（SBU 引脚）可用。于是不得不实现插入方向检测，以便在 A8 和 B8 上分别传输 SWDIO
和 SWCLK 信号。

Type-C 插入方向检测和线序翻转通常在母口侧进行，但为了不在母口增加元器件，本文将
插入方向检测和线序翻转放在公口侧进行。Type-C 规范给 Rd 电阻提供了很大的容差范
围，通过**在母口两侧使用略有差别的 Rd 电阻，公口侧使用相同的 Rp 电阻，则可用比较
器比较两条 CC 线上的电压，从而判断母口的插入方向，进而使用模拟开关交换 SWDIO 和
SWCLK 信号的线序，不需要对调试器的固件进行修改。** 开发板侧的两个 SBU 引脚可直连
MCU，不需要额外的元器件。

以上设计可以实现在 16Pin Type-C 口上同时使用 SWD 调试和 USB 功能。对于不支持、不
需要 USB 功能的开发板，是否可以将 USB 数据线复用为 USART 串口呢？可以实现这样的
设计。由于 USB D+ D- 和 USART 的电平比较复杂，所以**通过比较器检测 CC1 的分压电
阻来切换模拟开关，实现 USB 和 VCP 的复用**。对于 24Pin 完整的母口，则在两侧的高
速信号上引出 VCP 和剩余的调试信号。额外信号调试器公头侧做了双面布线，因此开发板
母口侧只需要单面连接，降低了开发板侧的布线难度。

USB 部分内置了小封装 CH334 Hub 实现上位机一线同时连接调试器和开发板。STDC-14 调
试接口利用未定义引脚增加了 5V 供电并受到 TPS2553 芯片保护，防止过流和倒灌，USB
公头旁的红色 LED 指示供电故障。设计的过流保护电流为 1.5A，基本满足多数需求，可自
行调整。（注：正版 ST-LINK/V2-1 固件具有使用 GPIO 引脚控制负载开关的功能，在 USB
握手初期可限制电流到 100mA 以满足 USB 规范。实际上几乎所有的 USB 接口都没有严格
执行 100mA 的限制，所以这个功能在本文的设计中没有实现。）

## 实验和讨论

已验证此调试器可刷入 ST-LINK/V2-1 固件并正常工作，支持正反插。DAPLink 固件可以刷
入并被上位机 PyOCD 识别，暂未测试 SWD 调试功能。已验证短路保护和倒灌保护功能，供
电故障时 LED 亮起。下面是注意事项：

1. **CH334 免晶振功能：** 本设计为了节约 PCB 空间，需要使用 CH334 的内部晶振。尽
   管根据沁恒论坛上的答复 [1](https://www.wch.cn/bbs/thread-117640-1.html)
   [2](https://www.wch.cn/bbs/thread-123784-1.html)，目前最新的 CH334 除了
   CH334S 封装均支持免晶振功能，但是截至 2024 年 9 月立创贴片的 CH334F 不能免晶
   振，无法正常工作。2024 年 8 月
   [这家淘宝店的 CH334F](https://item.taobao.com/item.htm?spm=a1z09.2.0.0.28c92e8d998lE5&id=739658232700&_u=231vkgfvbed8&skuId=5106094177623)
   是可以免晶振的。本设计有 CH334F 和 CH334P 两个版本，建议向卖家确认是否支持免
   晶振功能。
2. **STM32 容量:** 请使用 128kB 容量的 STM32F103CBT6，否则无法刷入 ST-LINK/V2-1
   固件。其余国产替代芯片理论上可行，但未测试。
3. **固件刷入方式：** 本调试器自身的 SWD 调试接口也使用一线通方案引出到上位机
   Type-C 母座上。制作第一个调试器时，可以购买一个 Type-C 公母头测试板，在调试器
   母座侧使用测试板连接电脑，再使用一个普通 ST-LINK 刷入固件。

   1. 接线需要先接通地线，再使用万用表电压档测量测试板上 A5，A8，B5，B8 四个引脚
      的电压，具有 3.3V 电压的引脚是 SWDIO，SWDIO 对角的引脚是 SWCLK。测试板另一
      头可直接连接电脑 USB 接口。接线如下图所示:

      ![使用 Type-C 测试板烧录固件](https://img.duanyll.com/img/1725195123571.jpg)

   2. 下载安装打开
      [STM32CubeProgrammer](https://www.st.com/zh/development-tools/stm32cubeprog.html)。
      点击右上角 Connect 连接调试器，成功连接后左下角显示目标芯片信息。

      ![点击连接](https://img.duanyll.com/img/20240902114419.png)

      ![连接成功](https://img.duanyll.com/img/20240902114450.png)

   3. 烧录广为流传的 `STLinkV2.J28.M18.bin` 版本固件。

      ![](https://img.duanyll.com/img/20240902114810.png)

   4. 注意这个版本的固件不能正常使用，还需进行一次固件升级。点击 Disconnect 断开
      连接，移除测试板和另一个调试器，只连接本调试器。
   5. 调试器插上电脑后，不点击其他按钮，直接点击 Firmware Upgrade 按钮

      ![](https://img.duanyll.com/img/20240902115307.png)

   6. 点击按钮升级固件后即可正常使用。

      ![](https://img.duanyll.com/img/20240301121055.png)

   7. 成功烧录一个调试器后，可以使用这个调试器的公口对插下一个调试器进行烧录，无
      需再次使用测试板。

      ![](https://img.duanyll.com/img/1725195123578.jpg)

4. **DAPLink** 这块板有 USB 重枚举电路，需要使用兼容 ST-LINK/V2-1 的 DAPLink 固
   件，如 [DAP103](https://github.com/devanlai/dap42/releases/tag/v1.31)
5. **板厚和叠层** 0.8 板厚 4 层板，JLC04161H-3313 叠层（可使用 1-4 层沉金免费
   券）
6. **Type-C DRP** 调试器只能做 Source，不能做 Sink。目标开发板侧如果不使用 PD 协
   议芯片，或者 PD 协议芯片需要外置下拉电阻，可直接按本文设计放置 Rd 电阻。若 PD
   芯片内置 Rd 电阻，可能可以通过在一侧 CC 上并联一个下拉电阻来实现方向检测，未
   经验证。

## 结论

灌水灌不下去了。

## 参考文献

推荐阅读：

- [Ruan Xingzhi "DIY：自制 DAPLink"](https://www.ruanx.net/diy-daplink/)
- [Arya Voronova "All About USB-C: Resistors And Emarkers"](https://hackaday.com/2023/01/04/all-about-usb-c-resistors-and-emarkers/)

## 附录

### ST-LINK 指示灯含义

STM32F103CBT6 旁边的两个 LED 灯的含义如下：

- 红色闪烁：已上电，未连接到电脑（大概率是 CH334 不支持免晶振）
- 红色常亮：已连接到电脑，未连接到目标芯片
- 红绿交替闪烁：正在传输数据
- 绿色常亮：上次传输数据成功
- 红绿常亮：上次传输数据失败

Type-C 公口旁边的 LED 灯的含义如下：

- 不亮：供电正常
- 亮：供电异常，可能是过流或倒灌

### BOM

主要元件淘宝参考价格：

- STM32F103CBT6：2.2 元包邮
- CH334F / CH334P：1.5 元邮费 1 元（注意批次）
- XC6206P332MR：2 元 20 个包邮
- S9013: 2 元 100 个包邮
- TPS2553：0.6 元包邮
- RS2227XUTQK10: 0.52 元运费 1 元
- CH443K：0.12 元运费 1 元
- RS8901XF: 0.45 元运费 1 元
- 16Pin Type-C 贴片母座：2.8 元 10 个包邮
- 24Pin Type-C 0.8 夹板公头：0.48 元运费 1.5 元

合计单个调试器主要元件成本不到 10 元。按立创 EDA 导出的 BOM, 立创贴片五个板全贴
元件价格约 140 元。

### 资源

原理图，PCB 和固件均在嘉立创开源广场：

{% link https://oshwhub.com/duanyll/stlink-sbu %}

### 更多图片

{% swiper width:max effect:cards/coverflow %}

![> ](https://img.duanyll.com/img/1725195123586.jpg)

![> ](https://img.duanyll.com/img/1725195123565.jpg)

![> ](https://img.duanyll.com/img/1725195123582.jpg)

{% endswiper %}
