---
title: 概统速通 - 大数定理
layout: wiki
wiki: notes-prob
order: 702
---

## 随机变量序列的收敛性

![几种收敛性的关系](https://img.duanyll.com/img/20230623113959.png)

### 分布函数弱收敛

{% folding open:true 说明 %}

希望随机变量序列 $\xi_1,\xi_2,\cdots$ 的分布函数收敛到 $\xi$ 的分布函数. 对于分布

$$
P\{\xi_n=\frac{1}{n}\}=1
$$

有 $F_n(0)\equiv0$, 但是直观认为该分布应收敛到

$$
F(x)=\begin{cases}
    0 & x<0\\
    1 & x\geq0
\end{cases}
$$

而 $\lim_{n\to\infty}F_n(0)=0\neq F(0)$. 则不应将依分布函数收敛定义为逐点收敛. 应当去除不连续点.

{% endfolding %}

**定义** 对于分布函数列 $\{F_n(x)\}$ 如果存在非降函数 $F(x)$ 使得

$$
\lim_{n\to\infty}F_n(x)=F(x)
$$

在 $F(x)$ 的每一个连续点上都成立, 则称 $\{F_n(x)\}$ *弱收敛*于 $F(x)$, 记为 $F_n(x)\xrightarrow{w}F(x)$

> 这样得到的极限函数是有界的非降函数, 但不一定是分布函数.

**定理** 正极限定理: 分布函数列弱收敛于分布函数, 则相应的特征函数列收敛于特征函数, 且在 $t$ 的任意有限区间一致收敛.

$$
F_n(x)\xrightarrow{w}F(x)\implies\{\phi_n(t)\}\to\phi(t)
$$

> 特征函数一致连续, 特征函数收敛即为逐点收敛

**定理** 逆极限定理: 特征函数列收敛于某一函数 $\phi(t)$ 且 $\phi(t)$ 在 $t=0$ 连续, 则分布函数列弱收敛于分布函数, 且 $\phi(t)$ 是 $F(x)$ 的特征函数

$$
\{\phi_n(t)\}\to\phi(t)\xRightarrow{\text{在}t=0\text{连续}}F_n(x)\xrightarrow{w}F(x)
$$

> 求特征函数的极限时, 遇到指数套指数等情形, 使用 Taylor 展开.

### 依分布收敛

用分布函数列收敛来定义随机变量序列收敛.

**定义** 随机变量序列 $\{\xi_n\}$ 的分布函数列 $\{F_n(x)\}$ 弱收敛于 $\xi$ 的分布函数 $F(x)$, 称 $\{\xi_n\}$ _依分布收敛_ 于 $\xi$ (随机变量或常数), 记为

$$
\xi_n\xrightarrow{W}\xi,\mathrm{as}\ n\to\infty
$$

或 $\xi_n\xrightarrow{L}\xi$ 或 $\xi_n\xrightarrow{d}\xi$

### 依概率收敛

仿照数列收敛定义随机变量序列收敛

**定义** 设 $\{\xi_n\}$ 是定义在 $(\Omega,\mathscr{F},P)$ 上的随机变量序列, 若 $\forall\epsilon>0$ 有

$$
\lim_{n\to\infty}P\{|\xi_n(\omega)-\xi(\omega)|\geq\epsilon\}=0
$$

或

$$
\lim_{n\to\infty}P\{|\xi_n(\omega)-\xi(\omega)|<\epsilon\}=1
$$

称 $\{\xi_n\}$ _依概率收敛_ 到 $\xi$, 记为

$$
\lim_{n\to\infty}\xi_n=\xi\;(p)
$$

或

$$
\xi_n\xrightarrow{p}\xi
$$

> $n$ 很大时, $\xi_n$ 与 $\xi$ 出现较大偏差的可能性很小, 有*很大把握*保证 $\xi_n$ 和 $\xi$ 很接近

### 几乎处处收敛

仿照函数列收敛定义随机变量序列收敛. 随机变量是样本空间上的实值函数. 但是要求 $\forall\omega\in\Omega$,

$$
\lim_{n\to\infty}\xi_n(\omega)=\xi(\omega)
$$

条件太强, 考虑弱化.

**定义** 设 $\{\xi_n\}$ 是定义在 $(\Omega,\mathscr{F},P)$ 上的随机变量序列, 若存在随机变量或函数 $\xi$ 使得

$$
P\{\lim_{n\to\infty}\xi_n=\xi\}=1
$$

即

$$
P\{\omega:\lim_{n\to\infty}\xi_n(\omega)=\xi(\omega)\}=1
$$

称随机变量序列 $\{\xi_n\}$ *以概率 1 收敛*于 $\xi$ 或*几乎处处收敛*于 $\xi$, 记为

$$
\xi_n\xrightarrow{a.s.}\xi, \xi_n\xrightarrow{a.e.}\xi
$$

## 大数定律

![弱大数定律的关系](https://img.duanyll.com/img/20230623114314.png)

**定义** 弱大数定律: 设随机变量序列 $\xi_k$ 中每一项的期望 $E(\xi_k)$ 都存在, 若 $\forall\epsilon>0$

$$
\lim_{n\to\infty}\left\{\left|\frac{1}{n}\sum_{k=1}^n\xi_k-E\left(\frac{1}{n}\sum_{k=1}^n\right)\right|<\epsilon\right\}=1
$$

则称其服从弱大数定律.

> $\xi_k$ 前 $n$ 项的算术平均值将紧密的聚集在其期望附近
> 对应的随机变量收敛
>
> $$
> \frac{1}{n}\sum_{k=1}^n\xi_k-E\left(\frac{1}{n}\sum_{k=1}^n\right)\xrightarrow{p}0
> $$
>
> 而不是
>
> $$
> \frac{1}{n}\sum_{k=1}^n\xi_k\xrightarrow{p}E\left(\frac{1}{n}\sum_{k=1}^n\right)
> $$

### 贝努利大数定律

**定理** 设 $f_n(A)$ 是 $n$ 次重复独立试验中事件 $A$ 发生的频率, $P(A)$ 是事件 $A$ 在每次实验中发生的概率, 则 $f_n(A)\xrightarrow{p}P(A)$, 即 $\forall\epsilon>0$

$$
\lim_{n\to\infty}P\{|f_n(A)-P(A)|\}=1
$$

> 此定理以严格的数学形式描述了频率的稳定性: 试验次数 $n$ 很大时, 事件发生的频率将紧密的聚集在其概率附近

**定理** 独立同分布变量序列 $\xi_k$,

$$
P\{\xi_k=1\}=P(A),P\{\xi_k=0\}=1-P(A)
$$

则

$$
\frac{1}{n}\sum_{k=1}^n\xi_k-E\left(\frac{1}{n}\sum_{k=1}^n\right)\xrightarrow{p}0
$$

### 小概率事件原理

概率很小的事件, 在一次试验中几乎是不可能发生的, 从而在实际中可看成不可能事件.

### 独立同分布大数定律

**独立同分布**的随机变量序列, 每一项的**均值和方差存在** (且相等), 则服从弱大数定律.

### 切比雪夫大数定律

**独立**, **期望存在**, **方差一致有界**的随机变量序列服从弱大数定律.

{% folding open:true 说明 %}

$$
\begin{aligned}
    1&\geq P\left\{\left|\frac{1}{n}\sum_{k=1}^n\xi_k-\frac{1}{n}\sum_{k=1}^nE(\xi_k)\right|<\epsilon\right\}\\
    &= P\left\{\left|\frac{1}{n}\sum_{k=1}^n\xi_k-E\left(\frac{1}{n}\sum_{k=1}^n\xi_k\right)\right|<\epsilon\right\}\\
    &\geq 1-\frac{D\left(\frac{1}{n}\sum_{k=1}^n\xi_k\right)}{\epsilon^2}\\
    &=1-\frac{\sum_{k=1}^nD(\xi_k)}{n^2\epsilon^2}\\
\end{aligned}
$$

若 $D(\xi_k)$ 一致有界, 则由夹逼准则知

$$
\lim_{n\to\infty}P\left\{\left|\frac{1}{n}\sum_{k=1}^n\xi_k-\frac{1}{n}\sum_{k=1}^nE(\xi_k)\right|<\epsilon\right\}=1
$$

{% endfolding %}

### 泊松大数定律

**独立**随机变量序列

$$
P\{\xi_n=1\}=p_n, P\{\xi_n=0\}=1-p_n
$$

服从弱大数定律

### 辛钦大数定律

**独立同分布**变量只要**数学期望存在**就服从大数定律.

### 马尔科夫大数定律

随机变量序列只要满足

$$
\lim_{n\to\infty}\frac{1}{n^2}D\left(\sum_{k=1}^n\xi_k\right)=0
$$

就服从大数定律.

### 强大数定律

**定义** 弱大数定律: 设随机变量序列 $\xi_k$ 中每一项的期望 $E(\xi_k)$ 都存在, 若

$$
\frac{1}{n}\sum_{k=1}^n\xi_k-\frac{1}{n}\sum_{k=1}^nE(\xi_k)\xrightarrow{a.s.}0
$$

则称其服从强大数定律.

> 服从强大数定律 $\implies$ 服从弱大数定律

- 博雷尔强大数定律:
  $$
  P\{\xi_n=1\}=p, P\{\xi_n=0\}=1-p
  $$
  服从强大数定律
- 科尔莫哥洛夫判别法: 独立随机变量序列
  $$
  \sum_{k=1}^\infty\frac{D(\xi_k)}{k^2}<\infty
  $$
  服从强大数定律
- 科尔莫哥洛夫定理: 独立同分布随机变量序列满足 $E(|\xi_k|)<\infty$ 服从强大数定律

## 中心极限定理

**定义** 随机变量序列独立且存在有限数学期望和方差

$$
\lim_{n\to\infty}P\left\{\frac{\sum_{k=1}^n\xi_k-E\left(\sum_{i=1}^n\xi_k\right)}{\sqrt{D(\sum_{k=1}^n\xi_k)}}\leq x\right\}=\Phi(x)=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^xe^{-\frac{1}{2}y^2}\d y
$$

> 随机变量序列服从中心极限定理 $\implies$ $\{\xi_k\}$ 前 $n$ 项和的标准化随机变量序列依分布收敛到标准正态分布.
>
> 服从中心极限定理的随机变量序列可进行概率的近似计算
>
> $$
> P\left\{x_1<\frac{\sum_{k=1}^n\xi_k-E\left(\sum_{i=1}^n\xi_k\right)}{\sqrt{D(\sum_{k=1}^n\xi_k)}}\leq x_2\right\}\approx\Phi(x_2)-\Phi(x_1)
> $$
>
> 中心极限定理解释了哪些随机变量可认为是服从正态分布的

![](https://img.duanyll.com/img/20230623155750.png)

**定理** 林德伯格—列维定理 (独立同分布中心极限定理): **独立同分布**随机变量序列 $E(\xi_k)=\mu$, $D(\xi_k)=\sigma^2\neq0$ 服从中心极限定理

$$
\lim_{n\to\infty}P\left\{\frac{\sum_{k=1}^n\xi_k-\mu}{\sqrt{n}\sigma}\leq x\right\}=\Phi(x)
$$

> 多个独立同分布变量之和近似服从正态分布

**定理** 棣莫佛—拉普拉斯定理 随机变量序列

$$
P\{\xi_n=1\}=p, P\{\xi_n=0\}=1-p
$$

服从中心极限定理

> 随机变量序列 $\{\eta_n\}$, $\eta_n\sim B(n,p)$, 则
>
> $$
> \lim_{n\to\infty}P\left\{\frac{\eta_n-np}{\sqrt{np(1-p)}}\leq x\right\}=\Phi(x)
> $$
>
> $n$ 很大的二项分布可近似看成正态分布, 一般要求
>
> $$
> np\geq5,np(1-p)\geq5
> $$

**定理** 林德伯格: 独立随机变量序列满足林德伯格条件, $\forall\epsilon>0$

$$
\lim_{n\to\infty}\frac{1}{B_n^2}\sum_{k=1}^n\int_{\{|x-\mu_k|>\epsilon B_n\}}(x-\mu_k)^2\d F_k(x)=0
$$

其中 $B_n^2=\sum_{k=1}^n\sigma_k^2$, 则服从中心极限定理, 即

$$
\lim_{n\to\infty}P\left\{\sum_{k=1}^n\frac{\xi_k-\mu_k}{B_n}\leq x\right\}=\Phi(x)
$$

> 保证各*随机叠加项*一致的小. 大量*一致的小*的随机变量的近似正态分布.
>
> $$
> \max_{1\leq k\leq n}\left|\frac{\xi_k-\mu_k}{B_n}\right|\xrightarrow{p}0
> $$

**定理** 李雅普洛夫定理: 随机变量序列满足 $\exists\delta>0$

$$
\lim_{n\to\infty}\frac{1}{B_n^{2+\delta}}\sum_{k=1}^nE(|\xi_k-\mu_k|^{2+\delta})=0
$$

服从中心极限定理.
