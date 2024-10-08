---
layout: post
tags:
  - oi
  - 总结
title: GDB常用命令
author: Duanyll
---

先`cd`到程序目录，再`gdb 您的文件名.exe`，记得编译时`-g`，当出现`(gdb)`提示时，输入指令。下面为常用指令列表

<!-- more -->

| 命令        | 简写   | 作用                                  |
| ----------- | ------ | ------------------------------------- |
| `break`     | `b`    | 行号或函数名，设断点                  |
| `list`      | `l`    | 显示附近十行代码                      |
| `run`       | `r`    | 开始运行程序                          |
| `start`     | `st`   | 开始执行并在main函数中断              |
| `display`   | `disp` | +变量名，添加查看变量，每次停下时显示 |
| `watch`     |        | 在变量变化时中断                      |
| `print`     | `p`    | 一次性显示查看变量                    |
| `step`      | `s`    | 单步进入                              |
| `next`      | `n`    | 单步继续                              |
| `continue`  | `c`    | 继续                                  |
| `backtrace` | `bt`   | 查看调用栈                            |
| `frame`     | `f`    | 查看栈帧                              |
| `^c`        |        | 暂停执行 (`SIGINT`)                   |
| `kill`      | `k`    | 停止执行                              |
| `quit`      | `q`    | 退出GDB                               |

注意在学校的电脑上手动用GDB时，分清楚打开的是 _Pascal的GDB还是C++的GDB_ ，否则行号会错乱！
