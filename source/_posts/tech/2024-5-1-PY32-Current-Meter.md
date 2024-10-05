---
title: 基于 PY32 和 INA219 的 USB3.0 电流表
tags:
  - 电子设计
  - py32
  - 嘉立创eda
cover: https://img.duanyll.com/img/20240829160316.png
description: 基于 PY32F002A 和 INA219 的 USB3.0 电流表，成本不到 10 元，提供 Type-A 和 Type-C 版本
repo: Duanyll/py32-ina219-usb-meter
---

## 1. 项目简介

PY32F002A 是一款极具性价比的 32 位 MCU, 部分封装仅售 0.3 元起, 适合用于各种低成本的嵌入式应用. 本项目基于 PY32F002A 和 INA219 电流传感器, 实现了一个 USB3.0 电流表, 可以测量 USB3.0 设备的电流, 电压和功率.

## 2. 功能特性

- 量程：3.3V ~ 20V, 0 ~ 5A
- 在屏幕上显示电流，电压和功率
- 可通过串口输出数据
- 提供 Type-A 和 Type-C 两种版本
- 已接通所有 USB3.0 高速信号线，支持高速传输和快充协议（实测能达到 340 MB/s 传输速度并驱动 4k 60Hz 显示器）

## 3. 硬件设计

主要使用的芯片如下：

- PY32F002A: 32 位 MCU, 20KB Flash, 4KB RAM, 24MHz 主频
- INA219: 12 位 ADC, 电流传感器, I2C 接口
- LGS5148: 宽电压输入，可调输出的 Buck 降压芯片
- XC6206: 200mA 低压差稳压器
- SSD1306: 128x32 OLED 显示屏
- Type-A 接口使用沉板封装
- Type-C 接口使用 0.8mm 板厚的夹板封装

{% swiper width:max effect:cards/coverflow %}

![> Type-A 版本原理图](https://img.duanyll.com/img/dd87637249734f70830abc0f47738be7.webp)

![> Type-C 版本原理图](https://img.duanyll.com/img/5e91cd42e5514ca3b46c4b7bc7e314bf.webp)

{% endswiper %}

## 4. 注意事项

1. 考虑到高速信号的阻抗匹配，两种版本均使用四层板。
   1. Type-A 版本使用 1.6mm 板厚，JLC04161H-3313 阻抗
   2. Type-C 版本使用 0.8mm 板厚，JLC04081H-3313 阻抗 (0.8mm 板厚可用沉金免费券)
2. R1 为 INA219 的采样电阻，建议使用 2mΩ 电阻减少压降，也可使用 10mΩ 电阻或者更大的。使用其他阻值需要修改程序中的电流计算公式。
3. 可以买一个 5W 的 USB 电阻负载来校准读数，修改 `main.c` 中 `CURRENT_CALIBRATION` 的值。
4. 立创 EDA 导出的 BOM 是正确的。
5. 串口和 SWD 调试接口已经引出，可以使用兼容 DAPLink 的调试器进行下载和调试。
6. Type-C 版本从母口供电时，示数会包括电流表自身的电流，可自行修改程序减掉这部分电流。

## 5. 实物图片

{% swiper width:max effect:cards/coverflow %}

![> ](https://img.duanyll.com/img/awYfqH1dpJ643vbNNRvqTferAtY7e9I48dW5dbw6.jpeg)

![> Type-A 版本实测，可达到 340MB/s 速度](https://img.duanyll.com/img/cuxbVfwYRXHUKGTbSKphGzy4ZpL5yusviPWQd6RW.png)

![> 背面电路](https://img.duanyll.com/img/SyLlkOayCz4kegrm1zdWc3purpefwUJec9W1kxKV.png)

![> Type-C 版本实测，可到到 340MB/s 数据传输速度并驱动 4k 60Hz 显示器](https://img.duanyll.com/img/BtGcKHHeAabptwQRh9o13LbfsDKzcUuZhogENd3M.png)

{% endswiper %}

## 6. 相关链接

嘉立创开源广场（原理图、PCB、BOM 和 `hex` 固件）

{% link https://oshwhub.com/duanyll/simple-current-meter %}

代码仓库

{% link https://github.com/Duanyll/py32-ina219-usb-meter %}
