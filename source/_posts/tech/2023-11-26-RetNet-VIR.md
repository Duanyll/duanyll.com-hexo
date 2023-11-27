---
title: Retention 和 VIR 指北
tags: [ 炼丹 ]
author: duanyll
---

## RetNet

![ICLR 审稿意见 6553](https://cdn.duanyll.com/img/20231127114615.png)

![Transformer 太邪恶了](https://cdn.duanyll.com/img/20231126191632.png)

$$
O=\operatorname{softmax}(QK^\top)V
$$

其中 $QK^\top$ 的开销随着序列长度 $O(n^2)$ 增长, $\operatorname{softmax}$ 的存在使得无法通过调整矩阵乘的顺序节约开销. 有许多工作尝试将 Softmax 换成其他的线性方式, 或者往 Softmax 上加 Mask 来实现线性开销的 Transformer. Retention 提出可以往 $QK^\top$ 上逐元素乘一个三角阵 Mask, 使其可以化为一种等效的单向 RNN 形式, 从而节约计算开销. (但是同时也失去了 SA 的全局注意力, 只能向前看了)

RetNet 的网络结构与 Transformer 相同, 只是把 MHSA 换成了新提出的 Multi-Scale Retention 模块 (MSR). MSR 实现了显存开销不随序列长度增长, 具有更快的推理速度.

![](https://cdn.duanyll.com/img/20231126191649.png)

### Retention 引入

> RetNet 原文的写作和记号令人窒息, 下面的推导改写了记号. 带下标的如 $X_n$ 是向量, $\{X_1,\cdots,X_{N}\}$ 等向量拼成矩阵 $X$

接下来首先定义了循环形式的 Retention, 随后通过一定的简化将其化为并行形式. Retention 同时具有两种等价的形式, 这使得其可以用并行形式训练, 用循环形式推理, 获得诸多好处.

1. 记输入 $N$ 个 $d_\mathrm{model}$ 维向量序列 $\{X_1,\cdots,X_{N}\}$ 构成矩阵 $X\in\R^{N\times d_\mathrm{model}}$. 
2. 首先线性变换 $X_n$ 为 $V_n$
   $$
   V_n=X_n\cdot W_V
   $$
   $W_V$ 是 $d_\mathrm{model}\times d$ 维可学习矩阵, 得到的 $V_n$ 是 $d$ 维向量, $n$ 是下标
3. 考虑一种类似 RNN 的状态向量 $S_n$, 定义 $S_n$ 的状态转移规则为
   $$
   S_n=A\cdot S_{n-1}+K_n^\top\cdot V_n
   \label{sn}
   $$
   其中 $A$ 是某个 $d\times d$ 维矩阵, $K_n$ 是某个 $d$ 维向量, 之后再介绍这两者的具体定义.
4. $s_n$ 再与 $d$ 维向量 $Q_n$ 做内积得到输出 $d$ 维向量
   $$
   S_n=Q_n\cdot S_n
   \label{on}
   $$
   展开 $S_n$ 的定义得到
   $$
   O_n=\sum_{m=1}^nQ_nA^{n-m}K_m^\top\cdot V_m
   \label{onExpanded}
   $$
5. 关于 $Q_n$ 和 $K_n$ 的定义, 我们希望他们是 context-aware 的, 考虑用线性变换将 $X$ 变成 $N\times d$ 维的 $Q$ 和 $K$
   $$
   Q=XW_Q,K=XW_K
   $$ 
   其中 $W_Q,W_K$ 是 $d_\mathrm{model}\times d$ 维可学习矩阵
6. 关于 $A$. 由于 $\ref{onExpanded}$ 需要计算 $A$ 的幂, 希望 $A$ 具有一个能对角化的形式以方便计算. 规定
   $$
   A=\Lambda(\gamma e^{i\theta})\Lambda^{-1}
   $$
   $\gamma$ 是 $d$ 维实向量, $\theta$ 是 $d/2$ 维实向量, $\Lambda$ 是某个可逆矩阵. 实际上是一个旋转位置编码, RetNet 文中并没有解释 $\gamma e^{i\theta}$ 的记号, 这个记号是在 A Length-Extrapolatable Transformer 一文中给出的, 这篇文章用一种玄妙地记号提出了旋转相对位置编码, 这个 "实向量作为指数" 的记号实际上是这个意思: 
   $$
   \begin{aligned}
       e^{im\theta}&\triangleq[\cos m\theta_1+i\sin m\theta_1 \cdots,\cos m\theta_{d/2}+i\sin m\theta_d]&&\in\mathbb{C}^{d/2}\\
       &\triangleq[\cos m\theta_1,\sin m\theta_1,\cdots,\cos m\theta_{d/2},\sin m\theta_{d/2}]&&\in \mathbb{R}^d
   \end{aligned}
   $$
   $\theta$ 取值为
   $$
   \theta_i=\frac{1}{10000^{2i/d}}
   $$
   由 $A$ 的对角化形式容易得到
   $$
   A^n=\Lambda(\gamma e^{i\theta})^n\Lambda^{-1}
   $$
7. 把 $A$ 的对角化形式带入到 $\ref{onExpanded}$ 中.
   $$
   \begin{aligned}
        O_n&=\sum_{m=1}^nQ_n\Lambda(\gamma e^{i\theta})^{n-m}\Lambda^{-1}K_m^\top\cdot V_m
   \end{aligned}
   $$
   鉴于 $Q_n, K_m$ 里面都有可学习参数 $W_Q,W_K$, 所以直接把 $\Lambda$ 融到 $W_Q,W_K$ 里.
   $$
   \begin{aligned}
        O_n&=\sum_{m=1}^nQ_n(\gamma e^{i\theta})^{n-m}K_m^\top\cdot V_m\\
           &=\sum_{m=1}^n\Big(Q_n(\gamma e^{i\theta})^n\Big)\Big(K_m(\gamma e^{i\theta})^m\Big)^\dagger v_m
   \end{aligned}
   $$
   为了简化模型把 $\gamma$ 简化为实标量.
   $$
   O_n=\sum_{m=1}^n\gamma^{n-m}(Q_ne^{in\theta})(K_me^{im\theta})^\dagger V_m
   \label{onParallel}
   $$

公式 $\ref{sn},\ref{on}$ 即为 Retention 的循环形式, 公式 $\ref{onParallel}$ 即为并行形式. 将两种形式完整地整理如下:

### 并行形式

![](https://cdn.duanyll.com/img/20231126205106.png)

$$
\begin{cases}
    Q=(XW_Q)\odot\Theta\\
    K=(XW_K)\odot\conj{\Theta}\\
    V=XW_V
\end{cases}
\label{qkv}
$$

其中 $\odot$ 是逐元素乘法, $\Theta$ 是如下的旋转位置编码 (的一部分) 矩阵 

$$
\Theta_n=e^{in\theta}
$$

而旋转位置编码的另一部分和 "因果关系遮罩" 在 $D\in\R^{N\times N}$ 矩阵里

$$
D_{nm}=\begin{cases}
    \gamma^{n-m}, & n\geq m\\
    0, & n < m
\end{cases}
$$

![D 矩阵](https://cdn.duanyll.com/img/20231127120832.png)

于是就有似曾相识的式子

$$
\operatorname{Retention}X=(QK^\top\odot D)V\label{retentionParallel}
$$

注意到 $D$ 代替了自注意力中的 Softmax.

### 循环形式

![](https://cdn.duanyll.com/img/20231126205143.png)

延用 $\ref{qkv}$ 式的定义, 有

$$
S_n=\gamma S_{n-1}+K_n^\top V_n
$$

$$
\operatorname{Retention}X_n=Q_nS_n
$$

另外还可以考虑部分地将并行形式展开为循环, 来节约在长序列上训练的内存开销.

![](https://cdn.duanyll.com/img/20231126210036.png)

### Multi Scale 多头

注意到 $\gamma$ 标量大小决定了 Retention 在时间维上的记忆强度. 希望搞一堆 $\gamma$ 不同的, 不共享权重的 Retention 模块并在一起来实现不同深度的记忆能力. 取多头的数目为 $h=d_\mathrm{model}/d$, 直接规定第 $i$ 个头的 $\gamma$ 为

$$
\gamma_i=1-2^{-4-i},0<i\leq h
$$

记第 $i$ 个头的输出

$$
\mathrm{head}_i=\operatorname{Retention}X
$$

把所有头的输出拼起来做一个 GroupNorm

$$
Y=\operatorname{GroupNorm}_h(\operatorname{Concat}(\mathrm{head_1,\cdots,head_n}))
$$

最后套上一个 Swish Gate 增强非线性性, 得到输出

$$
\operatorname{MSR}X=(\operatorname{swish}(XW_G)\odot Y)W_O
$$

其中 $W_G,W_O$ 是 $d_\mathrm{model}\times d_\mathrm{model}$ 维的可学习权重.

## VIR

![ICLR 审稿意见 5333](https://cdn.duanyll.com/img/20231127114744.png)

![A + B](https://cdn.duanyll.com/img/20231127114833.png)

没啥好说的，原始 retention 几乎啥都没改直接像 ViT 一样套到视觉上. 审稿人觉得创新性太少了, 缺乏对速度和内存开销的详细分析, 并且测试的图片分辨率太小了 ($224\times224$).

> 也不完全是啥都没改, 只是把原来的 Swish Gate 换成了 GELU, 并没有什么特别的理由

## RMT

![看文章排版估计是投 CVPR 了](https://cdn.duanyll.com/img/20231127120105.png)

显然 Retention 作为一个单向的 RNN 用来处理 ViT 中的图像 Patch 序列并不甚合理. 那怎么办呢?

![惊不惊喜意不意外](https://cdn.duanyll.com/img/20231127120322.png)

1. 把单向 RNN 变成双向的 (那怎么节约内存)
   $$
   D_{nm}=\gamma^{|n-m|}
   $$
   相应地 $\ref{onParallel}$ 式变成
   $$
   O_n=\sum{m=1}^N\gamma^{|n-m|}(Q_ne^{in\theta})(K_me^{im\theta})^\dagger V_m
   $$
   对应的双向 RNN 迭代
   $$
   \begin{aligned}
       S_n&=A\cdot S_{n-1}+K_n^\top\cdot V_n\\
       T_n&=A\cdot S_{n+1}+K_n^\top\cdot V_n\\
       O_n&=Q_n(S_n+T_{n+1})
   \end{aligned}
   $$
2. 把双向 RNN 变成二维的 (现在只有 $D$ 矩阵形式, 写不出 RNN 形式了)
   $$
   D_{nm}=\gamma^{|x_n-x_m|+|y_n-y_m|}
   $$
   ![基于曼哈顿距离的衰减, 这样就写不成 RNN 的形式了](https://cdn.duanyll.com/img/20231127134945.png)
3. 但是这样效果并不好, 那就把 Softmax 放回来...
   
   ![这写的真是实在](https://cdn.duanyll.com/img/20231127135311.png)
   
   把 $\ref{retentionParallel}$ 改写成
   $$
   \operatorname{ReSA}X=(\operatorname{softmax}(QK^\top)\odot D)V
   $$
4. 另外为了涨点, 网络结构里加了个 Depthwise Conv
   ![](https://cdn.duanyll.com/img/20231127135822.png)

所以 RMT 失去了 Retention 能表示成 RNN 的特性, 和之前的那些给 Attention Map 加 Mask 的工作没有什么本质区别了. 

## PoolFormer

![](https://cdn.duanyll.com/img/20231127121126.png)

![](https://cdn.duanyll.com/img/20231127121155.png)

Transformer 不仅 Self-Attention 好, 他的结构也很好, 把 Self-Attention 换成其他什么东西 (想必也包括 Retention) 效果都不错.