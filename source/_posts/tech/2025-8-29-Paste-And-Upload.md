---
title: 更好的 VSCode 粘贴上传图床插件
tags:
  - vscode
  - 指北
repo: Duanyll/paste-and-upload
---

![](https://img.duanyll.com/img/c9d59d9e.png)

{% link https://marketplace.visualstudio.com/items?itemName=Duanyll.paste-and-upload %}

## 简介

VSCode 已于今年初正式发布的 1.97 版本中引入了对 `DocumentPaste` 和 `DocumentDrop` API，允许插件原生地修改从剪贴板粘贴和从其他应用中拖拽内容的行为。在此之前的用于上传图床的插件如 [PicGo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo) 等都是通过绑定新的快捷键并调用操作系统的剪贴板 API 实现获取剪贴板中图像的，这个做法存在以下问题：

- 快捷键冲突。如果将自定义的粘贴命令绑定到 `Ctrl+V` 则容易与 VSCode 自带的或者其他插件的粘贴逻辑冲突。
- 远程和 Web 环境问题。有一些图床上传插件在连接到远程工作区时，在后端而非前端调用系统剪贴板 API，导致获取的是远程机器的剪贴板而非用户使用的剪贴板。另外，通过调用系统 API 获得剪贴板在 Web 版 VSCode 如 [code-server](https://github.com/coder/code-server) 中根本不会工作。

为了解决这些问题，我开发了这个插件 [Paste And Upload](https://marketplace.visualstudio.com/items?itemName=Duanyll.paste-and-upload)，它利用 VSCode 新的 API 实现了原生的粘贴上传功能，支持直接粘贴和拖拽图片到编辑器中上传，并且可以在远程和 Web 环境中工作。

## 使用说明

本插件支持将图像上传到 S3 兼容的对象存储服务或 VSCode 工作区。首次使用前，在 VSCode 设置中搜索 `paste-and-upload` 并填入访问 S3 兼容存储服务需要的凭据。推荐使用以下大厂的服务：

- 阿里云 OSS 香港区域 + CloudFlare CDN：免费 5GB 存储空间，无限出站流量，无需海外支付方式
- CloudFlare R2：免费 10GB 存储空间，无限出站流量
- BackBlaze B2：免费 10GB 存储空间，1GB/天出站流量

完成设置后，您可以直接在编辑器中按 `Ctrl+V` 或 `Cmd+V` 粘贴或拖拽图片进行上传。如果有多个插件同时使用新版 API 处理粘贴事件，VSCode 会显示一个下拉框供您选择。

![](https://img.duanyll.com/img/eea79c91.gif)

![](https://img.duanyll.com/img/7335af2f.gif)

对于 GIF 动图的处理已经特别优化，从浏览器中复制 GIF 动图时，插件会优先上传原始的 GIF 文件而非静态的 PNG 截图，可在设置中改变这个行为。

![](https://img.duanyll.com/img/69d04a4c.gif)

插件也支持将图像上传到 VSCode 的工作区，包括本机、远程文件系统，以及 [Overleaf Workshop](https://marketplace.visualstudio.com/items?itemName=iamhyc.overleaf-workshop) 等插件提供的虚拟工作区。这在使用 Overleaf 编写 TeX 文档时非常有用。

可以编辑 `settings.json` 来配置不同语言的粘贴图片行为, 可以自定义粘贴图片的目录和生成链接的目录：

```jsonc
{
  "paste-and-upload.enabled": false,
  // Save as ${workspaceFolder}/figures/image.png
  "paste-and-upload.workspace.path": "figures",
  // Insert \includegraphics{image.png} (If you have \graphicspath{figures})
  "paste-and-upload.workspace.linkBase": "",
  "[markdown]": {
    "paste-and-upload.enabled": true,
    "paste-and-upload.uploadDestination": "s3",
  },
  "[latex]": {
    "paste-and-upload.enabled": true,
    "paste-and-upload.uploadDestination": "workspace",
  },
}
```

## 局限性

以下特性暂未支持，可能会在以后的版本中改进：

- 暂时不支持在纯前端的 VSCode Web 环境（如 [vscode.dev](https://vscode.dev)）中使用。在 [code-server](https://github.com/coder/code-server) 等环境中可以正常使用。
- 撤销粘贴和拖拽操作时，无法同步从 S3 存储中删除已上传的文件。可以按 F1 运行 Undo recent upload 命令，手动选择最近上传的文件进行删除。
