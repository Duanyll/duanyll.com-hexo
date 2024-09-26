---
title: 概统速通 - 随机变量的数字特征
layout: wiki
wiki: notes-prob
order: 701
---

## 数字特征

### 期望

**定义** 离散型随机变量的数学期望: 离散型随机变量

$$
P\{\xi=x_i\}=p_i,i=1,2,3\cdots
$$

若 $\sum_{i=1}^{+\infty}|x_i|p_i<+\infty$ 则称

$$
E(\xi)=\sum_{i=1}^{+\infty}x_ip_i
$$

为 $\xi$ 的**数学期望**或**均值**

1. 要求绝对收敛是为了保证数学期望有唯一的数值
2. 数学期望的随机变量所有可能取值对取值概率的加权平均, 是一个数

**定义** 连续型随机变量的数学期望: 连续型随机变量 $\xi$ 概率密度为 $f(x)$, 若 $\int_{-\infty}^{+\infty}|x|f(x)\d x<+\infty$ 则称

$$
E(\xi)=\int_{-\infty}^{+\infty}xf(x)\d x
$$

为 $\xi$ 的**数学期望**或**均值**

> 对于任意随机变量 $\xi$, 都可用分布函数 $F(x)$ 的 Riemann–Stieltjes 积分定义期望 (要求绝对可积)
>
> $$
> E(\xi)=\int_{-\infty}^{+\infty}x\d F(x)
> $$

{% folding open:true 说明 %}

#### Riemann–Stieltjes 积分

参照 [Riemann 积分](/source/wiki/calculus/integral.md#riemann-积分).

**定义** Riemann–Stieltjes 积分: $f(x),g(x)$ 是 $[a,b]$ 上实值函数, 任意对 $[a,b]$ 的分割 $a=x_0<x_1<\cdots<x_n=b$ 及任意分点 $x_k^*\in[x_k,x_{k+1}]$ 记和式

$$
\sigma=\sum_{k=0}^{n-1}f(x_k^*)(g(x_{k+1}-g(x_k)))
$$

若 $\exists I\in\R,\forall\epsilon>0,\exists\delta>0$, 有

$$
\lambda=\max_{0\leq k\leq n-1}(x_{k+1}-x_k)<\delta
$$

且 $|\sigma-I|<\epsilon$, 则称 $I$ 是 $f(x)$ 关于 $g(x)$ 在 $[a,b]$ 上的 R-S 积分, 记为

$$
I=\int_a^bf(x)\d g(x)
$$

广义 R-S 积分

$$
\int_{-\infty}^{+\infty}f(x)\d g(x)\triangleq\lim_{\substack{a\to-\infty\\ b\to+\infty}}\int_a^bf(x)\d g(x)
$$

分部积分公式

$$
\int_a^bf(x)\d g(x)=-\int_a^bg(x)\d f(x)+(f(x)g(x))\bigg|_{a}^{b}
$$

Cauchy-Schwarz 不等式: 若有

$$
\int_{-\infty}^{+\infty}f_i^2(x)\d x<\infty,i=1,2
$$

且 $g(x)$ 单调不减, 则 $\int_{-\infty}^{+\infty}f_1(x)f_2(x)\d g(x)$ 存在且

$$
\left(\int_{-\infty}^{+\infty}f_1(x)f_2(x)\d g(x)\right)^2\leq\int_{-\infty}^{+\infty}f_1^2(x)\d g(x)\cdot\int_{-\infty}^{+\infty}f_2^2(x)\d g(x)
$$

**定理** $f(x)$ 连续有界, $g(x)$ 单调有界 $\implies$ R-S 可积

**定理** 广义 R-S 积分定理:

1. $f(x)$ 连续
2. $\int_a^bf(x)\d g(x)$ 存在

则有

1. $g'(x)$ 存在且 Riemann 可积 $\implies$
   $$
   \int_a^bf(x)\d g(x)=\int_a^bf(x)g'(x)\d x
   $$
2. 存在实数列 $C_k,k=0,\pm1,\cdots$ 且 $\cdots<C_{-1}<C_0<C_1<\cdots$, $g(x)$ 在 $[C_k,C_{k-1})$ 上取常数 $\implies$
   $$
   \int_a^bf(x)\d g(x)=\sum_{k=-\infty}^{+\infty}f(C_k)(g(C_k+0)-g(C_k-0))
   $$

{% endfolding %}

> 离散型随机变量对应广义 R-S 积分情况 2, 连续型随机变量对应广义 R-S 积分情况 1

### 函数的期望

**定理** $F_\xi(x)$ 是 $\xi$ 的分布函数, $g(x)$ 连续, 若绝对可积, 则 $\eta=g(\xi)$ 的数学期望存在且

$$
E(\eta)=E(g(\xi))=\int_{-\infty}^{+\infty}g(x)\d F_\xi(x)
$$

### 方差

**定义**

$$
D(\xi)\triangleq E((\xi-E(\xi))^2)=\int_{-\infty}^{+\infty}(x-E(\xi))^2\d F(x)
$$

为 $\xi$ 的方差 (Deviation / Variance)

$$
\sigma(\xi)=\sqrt{D(\xi)}
$$

为 $\xi$ 的标准差 Standard Deviation 或均方差 Mean Square Error.

**性质**

1. $E(\xi^2)$ 存在 $\implies$ $D(\xi),E(\xi)$ 存在
   $$
   D(\xi)=E(\xi^2)-E^2(\xi)
   $$
   $\implies$
   $$
   \left(\int_{-\infty}^{+\infty}x\d F(x)\right)^2\leq\int_{-\infty}^{+\infty}x^2\d F(x)
   $$
2. $D(\xi)$ 存在 $\implies$
   $$
   D(a\xi+b)=a^2D(\xi),D(b)=0
   $$
3. **Chebyshev 不等式**
   $$
   P\{|\xi-E(\xi)\geq\epsilon\}\leq\frac{D(\xi)}{\epsilon^2}
   $$
   > 粗略地通过方差限制了随机变量偏离均值的程度
   > $\implies$
   $$
   D(\xi)=0\iff P\{\xi=E(\xi)\}=1
   $$

> 方差刻画了随机变量关于数学期望的偏离程度, 随机变量关于数学期望的偏离程度比关于其他任何值的偏离程度小.

{% folding open:true 说明 %}

$\xi$ 的标准化随机变量

$$
\xi^*=\frac{\xi-E(\xi)}{\sqrt{D(\xi)}}
$$

期望为 0, 方差为 1

{% endfolding %}

### 矩

- $k$ 阶原点矩 $\nu_k=E(\xi^k)$
  $$
  \nu_0=1,\nu_1=E(\xi),\nu_2=E(\xi^2)
  $$
- $k$ 阶绝对原点矩 $a_k=E(|\xi|^k)$
- $k$ 阶中心矩 $\mu_k=E((\xi-E(\xi))^k)$
  $$
  \mu_0=1,\mu_1=0,\mu_2=D(\xi)
  $$
- $k$ 阶绝对中心矩 $\beta_k=E(|\xi-E(\xi)|^k)$

$$
\begin{aligned}
  \nu_k&=\sum_{i=0}^kC_k^i\nu_1^i\mu_{k-i}\\
  \mu_k&=\sum_{i=0}^k(-1)^{k-i}C_k^i\nu_1^{k-i}\nu_k
\end{aligned}
$$

### 相关性

**定义** 多维随机变量的函数期望

$$
E(g(\xi_1,\cdots,\xi_n))=\int_{-\infty}^{+\infty}\cdots\int_{-\infty}^{+\infty}g(x_1,\cdots,x_n)\d F(x_1,\cdots,x_n)
$$

**性质** 多维随机变量每一维期望都存在, 则

1. 线性性
   $$
   E(\sum_{i=1}^nc_i\xi_i)=\sum_{i=1}^nc_iE(\xi_i)
   $$
2. $\xi_1,\cdots,\xi_n$ 相互独立 $\implies$
   $$
   E(\prod_{i=1}^n\xi_i)=\prod_{i=1}^nE(\xi_i)
   $$

**性质** 多维随机变量每一维方差都存在, 则

$$
D(\sum_{i=1}^n\xi)=\sum_{i=1}^n D(\xi_i)+2\sum_{\substack{i,j=1\\ i<j}}^nE\big((\xi_i-E(\xi_i))(\xi_j-E(\xi_j))\big)
$$

若 $\xi_1,\cdots,\xi_n$ 相互独立 $\implies$

$$
D(\sum_{i=1}^n\xi_i)=\sum_{i=1}^nD(\xi_i)
$$

**定义** 随机变量 $(\xi,\eta)$ 的协方差 Covariance

$$
\Cov(\xi,\eta)=E\big((\xi-E(\xi)(\eta-E(\eta))\big)
$$

**性质**

1. $$
   D(\xi)=\Cov(\xi,\xi)
   $$
2. $$
   D(\xi\pm\eta)=D(\xi)+D(\eta)\pm2\Cov(\xi,\eta)
   $$
3. $$
   \Cov(\xi,\eta)=\Cov(\eta,\xi)
   $$
4. $$
   \Cov(a\xi,b\eta)=ab\Cov(\xi,\eta)
   $$
5. $$
   \Cov(\xi_1+\xi_2,\eta)=\Cov(\xi_1,\eta)+\Cov(\xi_2,\eta)
   $$
6. $$
   \Cov(\xi,\eta)=E(\xi\eta)-E(\xi)E(\eta)
   $$

**定义** 随机变量 $(\xi,\eta)$ 的相关系数 Correlation Coefficient

$$
\begin{aligned}
   \rho_{\xi\eta}&=\frac{\Cov(\xi,\eta)}{\sqrt{D(\xi)}\sqrt{D(\eta)}}\\
   &=E\left(\frac{\xi-E(\xi)}{\sqrt{D(\xi)}}\cdot\frac{\eta-E(\eta)}{\sqrt{D(\eta)}}\right)\\
   &=\Cov(\xi^*,\eta^*)
\end{aligned}
$$

**性质**

1. $|\rho|\leq1$
2. $|\rho|=1\iff$ _以概率 1 线性相关_
3. 称 $|\rho|=0$ 为*不相关*

> 独立 $\implies$ 不相关

多维随机变量可构造协方差矩阵和相关系数矩阵, 是半正定矩阵.

### 条件期望与方差

**定义** $\xi=x$ 的条件下, 随机变量 $\eta$ 的条件数学期望

$$
E(\eta|x)=E(\eta|\xi=x)\triangleq\int_{-\infty}^{+\infty}y\d F_{\eta|\xi}(y|x)
$$

是 $x$ 的函数.

实际上, $E(\xi),E(\eta)$ 等是常数, 而 $E(\eta|\xi), E(\xi|\eta)$ 是随机变量.

函数的条件数学期望

$$
E(g(\eta)|x)=E(g(\eta)|\xi=x)\triangleq\int_{-\infty}^{+\infty}g(y)\d F_{\eta|\xi}(y|x)
$$

**性质**

1. $\xi,\eta$ 独立 $\iff E(\eta|\xi)=E(\eta)$
2. **全数学期望公式** $E(\eta)=E(E(\eta|\xi))$
   1. 离散型
      $$
      E(\eta)=\sum_{k=1}^\infty E(\eta|\xi=x_k)P(\xi=x_k)
      $$
   2. 连续型
      $$
      E(\eta)=\int_{-\infty}^{+\infty}E(\eta|\xi=x)f_{\xi}(x)\d x
      $$
3. $E(g(\eta)\xi|\eta)=g(\eta)E(\xi|\eta)$
4. $E(g(\eta)\xi)=E(g(\eta)E(\xi|\eta))$
5. $E(c|\eta)=c$
6. $E(g(\eta))=E(E(g(\eta)|\xi))$
7. $E(a\xi+b\eta|\zeta)=aE(\xi|\zeta)+bE(\xi|\zeta)$
8. $E^2(\eta-E(\eta|\xi))\leq E^2(\eta-g(\xi))$

**定义** $\eta=y$ 的条件下 $\xi$ 的条件方差

$$
D(\xi|\eta=y)=E\big((\xi-E(\xi|\eta=y))^2\big|\eta=y\big)
$$

是 $\xi$ 相对条件数学期望 $E(\xi|\eta=y)$ 的偏离程度的衡量指标

## 特征函数

### 一维

**定义** $(\Omega,\mathscr{F},P)$ 上的随机变量 $\xi$

$$
\phi(t)=E(e^{jt\xi})=\int_{-\infty}^{+\infty}e^{jtx}\d F(x),t\in\R
$$

为 $\xi$ 的特征函数

$$
E(e^{jt\xi})=E(\cos t\xi)+jE(\sin t\xi)=\int_{-\infty}^{+\infty}\cos tx\d F(x)+j\int_{-\infty}^{+\infty}\sin tx\d F(x)
$$

**性质**

1. $|\phi(t)|\leq\phi(0)=1$
2. $\phi(t)$ 在 $\R$ 上 [一致连续](/source/wiki/calculus/function-limit.md#一致连续)
3. 非负定: $\forall n\in\N,\forall z_1\cdots z_n\in\mathbb{C},\forall t_r\in\R,r=1,\cdots,n$ 有
   $$
   \sum_{r=1}^n\sum_{s=1}^n\phi(t_r-t_s)z_r\conj{z_s}\geq0
   $$
4. $\conj{\phi(t)}=\phi(-t)$
5. 线性变换
   $$
   \phi_{a\xi+b}(t)=e^{jbt}\phi_\xi(at)
   $$

**定理** 波赫纳-辛钦: $\phi(t)$ 是特征函数 $\iff$ 在 $\R$ 上一致连续, 非负定且 $\phi(0)=1$

**定理** $n$ 阶矩存在 $\implies\phi^{(k)}(t)$ 存在且

$$
E(\xi^k)=j^{-k}\phi^{(k)}(0)
$$

> 用特征函数求矩

**定理** 反演公式: $\forall F(x)$ 的连续点 $x_1<x_2$ 有

$$
F(x_2)-F(x_1)=\lim_{T\to\infty}\frac{1}{2\pi}\int_{-T}^{T}\frac{e^{-jtx_1}-e^{-jtx_2}}{jt}\phi(t)\d t
$$

> 用特征函数求分布函数和概率

**定理** 唯一性定理: 分布函数恒等 $\iff$ 特征函数恒定

**定理** 特征函数在 $\R$ 上绝对可积 $\implies$ 连续型随机变量

$$
\begin{aligned}
   \phi(t)&=\int_{-\infty}^{+\infty}e^{jtx}f(x)\d x\\
   F'(x)=f(x)&=\frac{1}{2\pi}\int_{-\infty}^{+\infty}e^{-jtx}\phi(t)\d t\\
\end{aligned}
$$

**定理** 对于离散型随机变量

$$
\begin{aligned}
   \phi(t)&=\sum_{k=-\infty}^{+\infty}p_ke^{jtk},t\in\R\\
   p_k&=\frac{1}{2\pi}\int_{-\pi}^\pi e^{-jtk}\phi(t)\d t
\end{aligned}
$$

### 多维

**定义** 多维随机变量的特征函数

$$
\begin{aligned}
   \phi(t_1,\cdots,t_n)&=E(e^{j(t_1\xi_1+\cdots+t_n\xi_n)})\\
   &=\int_{-\infty}^{+\infty}\cdots\int_{-\infty}^{+\infty}e^{j(t_1x_1+\cdots+t_nx_n)}\d F(x_1,\cdots,x_n)
\end{aligned}
$$

**性质**

1. $|\phi(t_1,t_2)|\leq\phi(0,0)=1$
2. $\conj{\phi(t_1,t_2)}=\phi(-t_1,-t_2)$
3. $\phi(t_1,t_2)$ 在实平面上一致连续
4. $\phi(t_1,0)=\phi_{\xi_1}(t_1),\phi(0,t_2)=\phi_{\xi_2}(t_2)$
5. $(a_1\xi_1+b_1,a_2\xi_2+b_2)$ 的特征函数为
   $$
   e^{j(t_1b_1+t_2b_2)}\phi(a_1t_1,a_2t_2)
   $$
6. $Z=a\xi_1+b\xi_2+c$ 的特征函数为
   $$
   \phi_Z(t)=e^{jtc}\phi(at,bt)
   $$

**定理** 特征函数求矩

$$
E(\xi_1^{k_1}\xi_2^{k_2})=j^{-k_1-k_2}\left(\frac{\p^{k_1+k_2}\phi(t_1,t_2)}{\p t_1^{k_1}\p t_2^{k_2}}\right)\bigg|_{t_1=t_2=0}
$$

**定理** 反演公式 (要求落在矩形边界上的概率为 0)

![](https://cdn.duanyll.com/img/20230622235024.png)

**定理** $n$ 维随机变量相互独立 $\iff$

$$
\phi(t_1,\cdots,t_n)=\prod_{k=1}^n\phi_{\xi_k}(t_k)
$$

令 $\eta=\sum_{i=1}^n\xi_i$, 则

$$
\phi_\eta(t)=\prod_{i=1}^n\phi_{\xi_i}(t)
$$

若独立同分布, 则

$$
\phi_\eta(t)=\phi^n(t)
$$
