---
title: 使用 Visual Studio Code 进行基于 STM32CubeMX 的嵌入式开发
tags: [嵌入式, vscode, stm32]
---

## 摘要

本文介绍了一种在 Windows x86 上进行 STM32 嵌入式开发的软件环境搭建方法, 通过 STM32CubeMX 配置工程和硬件, 使用 Visual Studio Code 提供编辑代码和调试的前端, 使用 make 作为构建的后端, OpenOCD 作为调试后端. 本方法充分利用了 Visual Studio Code 提供的现代化 C / C++ 开发体验, 使用简便, 配置简明.

## 安装软件

需要下载并安装的软件包括:

- [Visual Studio Code](https://code.visualstudio.com/)
- [STM32CubeMX](https://www.st.com/zh/development-tools/stm32cubemx.html#get-software)
- [STM32CubeIDE](https://www.st.com/zh/development-tools/stm32cubeide.html) 只是希望使用内置的 ARM GCC 工具链
- [OpenOCD](https://github.com/openocd-org/openocd/releases/tag/v0.12.0)

> 请将所有软件安装到**默认目录**, *即使这会占用您珍贵的 C 盘空间*. 这能减少很多不必要的麻烦[^1]. 
> 
> OpenOCD 无需安装只需解压, 建议您解压到**没有中文和空格**的路径中, 这能减少很多不必要的麻烦[^2]. 

[1]: 这条经验也适用于几乎所有的软件.
[2]: 同上.

随后您需要安装一些 Visual Studio Code 的插件, 包括

```
名称: C/C++
ID: ms-vscode.cpptools
说明: C/C++ IntelliSense, debugging, and code browsing.
版本: 1.15.1
发布者: Microsoft
VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools

名称: stm32-for-vscode
ID: bmd.stm32-for-vscode
说明: An extension for: setting up, compiling, uploading and debugging STM32 applications
版本: 3.2.5
发布者: Bureau Moeilijke Dingen
VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=bmd.stm32-for-vscode
```

![在安装这些插件的时候也会安装一些其他的插件](https://cdn.duanyll.com/img/20230405131959.png)

安装完成后, 您需要对 stm32-for-vscode 插件进行配置.

![您需要填写的配置](https://cdn.duanyll.com/img/20230405132157.png)

```json
{
  "stm32-for-vscode.openOCDPath": "D:\\SOFTWARE\\OPENOCD\\BIN\\OPENOCD.EXE",
  "stm32-for-vscode.makePath": "C:\\ST\\STM32CUBEIDE_1.7.0\\STM32CUBEIDE\\PLUGINS\\COM.ST.STM32CUBE.IDE.MCU.EXTERNALTOOLS.MAKE.WIN32_2.0.0.202105311346\\TOOLS\\BIN\\MAKE.EXE",
  "stm32-for-vscode.armToolchainPath": "C:\\ST\\STM32CubeIDE_1.7.0\\STM32CubeIDE\\plugins\\com.st.stm32cube.ide.mcu.externaltools.gnu-tools-for-stm32.9-2020-q2-update.win32_2.0.0.202105311346\\tools\\bin"
}
```

> 这只是一个例子, 请您不要复制这些路径. 您可以使用 [Everything](https://www.voidtools.com/downloads/) 查找您的电脑上这些文件和目录所在的位置.

## 闪灯程序

我们来编写一个简单的 STM32F103 系列闪灯程序, 来演示基本的开发流程. 使用其他 STM32 芯片和开发板进行开发的流程是类似的.

首先, 在开始菜单中启动 STM32CubeMX.

> 如果高分辨率下 STM32CubeMX 显示模糊, 这个选项也许有用
>
> ![](https://cdn.duanyll.com/img/20230405133359.png)
>
> STM32CubeMX 有一些界面显示的 Bug. **不要使用中文输入法**, 否则会花屏.

![按照芯片型号选择工程模版](https://cdn.duanyll.com/img/20230405132909.png)

这时会联网下载一些文件.

![搜索并选择芯片的型号](https://cdn.duanyll.com/img/20230405134102.png)

![点击 Start Project 新建工程](https://cdn.duanyll.com/img/20230405134145.png)

接下来需要对工程进行一些基础配置.

![使能调试接口](https://cdn.duanyll.com/img/20230405134318.png)

使能调试接口非常重要! 不启用就砖了, 需要一些麻烦的操作才能恢复.

![开发板上通常有外部晶振, 需要使能](https://cdn.duanyll.com/img/20230405134519.png)

板载 LED 灯通常在 PC13 脚上, 进行配置

![首先左键点击引脚, 选择 GPIO_Output](https://cdn.duanyll.com/img/20230405134736.png)

![为引脚设置名称方便使用](https://cdn.duanyll.com/img/20230405135037.png)

在时钟树页面可调整各部分的频率.

![暂时使用默认的时钟树配置](https://cdn.duanyll.com/img/20230405134618.png)

配置工程文件

![](https://cdn.duanyll.com/img/20230405135504.png)

![](https://cdn.duanyll.com/img/20230405135624.png)

完成后点击右上角生成工程, 并打开文件夹.

To be continued.