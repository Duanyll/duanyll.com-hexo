---
title: 数分速通 - 定积分
layout: wiki
wiki: notes-calculus
order: 204
---

## Riemann 积分

**定义** Riemann 积分: $f$ 定义在 $[a,b]$ 上, $I\in\R$, 若 $\forall\epsilon>0,\exist\delta>0,\forall[a,b]$ 的分割 $P:a=x_0<x_1<x_2<\cdots<x_n=b,\forall$ 分点 $\xi_i\in[x_{i-1},x_i]\;(i=1,2,\cdots,n)$, 只要 $\lambda=\max\Delta x_i<\delta$, $\Delta x_i=x_i-x_{i-1}$, 就有

$$
\left|\sum_{i=1}^nf(\xi_i)\Delta x_i-I\right|<\epsilon
$$

则 $f$ 在 $[a,b]$ 上可积, 和式

$$
S_n(f)=\sum_{i=1}^nf(\xi_i)\Delta x_i
$$

称为 Riemann 和, 极限值 $I$ 为 $f$ 在 $[a,b]$ 上的定积分

$$
I=\int_a^bf(x)\mathrm{d}x=\lim_{\lambda\to0}\sum_{i=1}^nf(\xi_i)\Delta x_i
$$

> 不是严格的极限过程, 注意分割方式和分点选取都是任意的, 通过控制分割区间的最长长度来趋近无限细分

**定理** $f\in R([a,b])\implies f$ 在 $[a,b]$ 有界

**定义** Darboux 和: $f$ 在 $a,b$ 有界, $\forall[a,b]$ 的分割 $P:a=x_0<x_1<x_2<\cdots<x_n=b$

$$
M_i=\sup_{x_{i-1}\leq x\leq x_i}f(x),m_i=\inf_{x_{i-1}\leq x\leq x_i}f(x)
$$

$\omega_i(f)=M_i-m_i$ 为 $f$ 在 $[x_{i-1},x_i]$ 上的*振幅*, 定义 Darboux 大和和 Darboux 小和:

$$
\bar{S}(f;P)=\sum_{i=1}^n M_i\Delta x_i,\underbar{S}(f;P)=\sum_{i=1}^n m_i\Delta x_i
$$

易知

$$
\bar{S}(f;P)\leq\sum_{i=1}^nf(\xi_i)\Delta x_i\leq\underbar{S}(f;P)
$$

$\bar{S}(f;P)$ 关于 $P$ 有下界 (有界函数最小值 $\times$ 区间长度), 有下确界 $\bar{I}(f)$

$\underbar{S}(f;P)$ 关于 $P$ 有上界 (有界函数最大值 $\times$ 区间长度), 有上确界 $\underbar{I}(f)$;

**引理** Darboux: $f$ 在 $a,b$ 有界,

$$
\lim_{\lambda\to0}\bar{S}(f;P)=\bar{I}(f),\lim_{\lambda\to0}\underbar{S}(f;P)=\underbar{I}(f)
$$

**定理** $f$ 在 $a,b$ 有界, 下列条件等价

1. $f\in R([a,b])$
2. $\bar{I}(f)=\underbar{I}(f)$
3. $\lim_{\lambda\to0}\sum_{i=1}^n \omega_i(f)\Delta x_i=0$

**定理** $f\in C([a,b])\implies f\in R([a,b])$

**定理** $f$ 在闭区间单调 $\implies f\in R([a,b])$

$f\in C([a,b])$(也可推广到 $(-\infty,+\infty)$), 对于有界上凸连续函数 $g$ (如 $\ln x$), 有

$$
\frac{1}{b-a}\int_a^b g(f(x))\mathrm{d}x\leq g\left(\frac{1}{b-a}\int_a^bf(x)\mathrm{d}x\right)
$$

## Newton-Leibniz 公式

**定理** Newton-Leibniz: $f\in R([a,b])$ 在 $(a,b)$ 上有原函数 $F$, 若 $F\in C([a,b])$, 则

$$
\int_a^bf(x)\d x=F(b)-F(a)
$$

**定理** $f\in R([a,b])$ 在 $x_0$ 处*连续*, 变上限积分

$$
F(x)=\int_a^xf(t)\d t
$$

在 $x_0\in[a,b]$ 处可导, $F'(x_0)=f(x_0)$, 端点处指左右导数. 若 $f\in C([a,b])$, 则

$$
F'(x)=\frac{\d}{\d x}\int_a^xf(t)\d t=f(x)
$$

> $f$ 可积 $\implies F$ 连续, $f$ 连续 $\implies F$ 可导

**推论** $f\in C([a,b])$, $\alpha,\beta$ 在 $[c,d]$ 可导,

$$
F(x)=\int_{\alpha(x)}^{\beta(x)}f(t)\d t
$$

在 $[c,d]$ 可导,

$$
F^{\prime}(x)=f(\beta(x))\beta^{\prime}(x)-f(\alpha(x))\alpha^{\prime}(x)\label{label2}
$$

### Poincare 不等式

**定理** $f\in C^1([a,b])$, $\int_a^b f(x)\d x=0$, (或者简单情形, $f(a)=0$)

$$
\int_a^bf^2(x)\d x\leq\frac{(b-a)^2}{2}\int_a^b(f'(x))^2\d x
$$

> 这个不等式说明了一个函数的行为可以用这个函数的变化率的行为和它的定义域的几何性质来控制。也就是说，已知函数的变化率和定义域的情况下，可以对函数的上界作出估计。- [Wikipedia](https://zh.wikipedia.org/zh-hans/%E5%BA%9E%E5%8A%A0%E8%8E%B1%E4%B8%8D%E7%AD%89%E5%BC%8F)

令 $F(x)=\int_a^xf(t)\d t$, 则 $F(a)=F(b)=0,F'(x)=f(x)$. 分部积分

$$
\begin{aligned}
    \int_a^bf^2(x)\d x&=\int_a^bf(x)\d F(x)\\
                      &=f(x)F(x)\big|_a^b-\int_a^bF(x)\d f(x)\\
                      &=-\int_a^bF(x)f'(x)\d x
\end{aligned}
$$

> Cauchy-Schwarz 不等式积分形式:
>
> $$
> \left|\int_{\R^n} f(x) \overline{g(x)}\d x\right|^2  \leq  \int_{\R^n} |f(x)|^2\d x \int_{\R^n} |g(x)|^2 \d x.
> $$

平方后利用 Cauchy-Schwarz 不等式积分形式

$$
\left(\int_a^bf^2(x)\d x\right)^2=\left(\int_a^bF(x)f'(x)\d x\right)^2\leq\int_a^b(F(x))^2\d x\cdot\int_a^b(f'(x))^2\d x\label{label1}
$$

展开 $(F(x))^2$ 使用 Cauchy-Schwarz 不等式积分形式

$$
(F(x))^2=\left(\int_a^xf(t)\d t\right)^2\leq\int_a^x1^2\d t\cdot\int_a^x(f(t))^2\d t\leq(x-a)\int_a^b(f(t))^2\d t
$$

两侧对 $x$ 积分

$$
\int_a^b(F(x))^2\d x\leq\int_a^b\left((x-a)\int_a^b(f(t))^2\d t\right)\d x=\frac{(b-a)^2}{2}\int_a^b(f(t))^2\d t
$$

代入 $(\ref{label1})$ 得到

$$
\left(\int_a^bf^2(x)\d x\right)^2\leq\frac{(b-a)^2}{2}\int_a^b(f(t))^2\d t\int_a^b(f'(x))^2\d x
$$

即

$$
\int_a^bf^2(x)\d x\leq\frac{(b-a)^2}{2}\int_a^b(f'(x))^2\d x
$$

## 积分中值定理

**定理** 积分第一中值定理: $f,\phi\in R([a,b])$, $\phi$ 在 $[a,b]$ 上不变号, $\exist\eta\in[\inf f(x),\sup f(x)]$ 使得

$$
\int_a^bf(x)\phi(x)\d x=\eta\int_a^b\phi(x)\d x
$$

若 $f$ 具有原函数, 则 $\exist\xi\in(a,b)$ 使得

$$
\int_a^bf(x)\phi(x)\d x=f(\xi)\int_a^b\phi(x)\d x
$$

> 乘积的积分, 可将其中一项用积分区间内某一点代替. 注意 $f$ 在闭区间可积, 但是 $\xi$ 在开区间中

**定理** 积分第二中值定理: $\phi\in R([a,b])$, 

1. 若 $f$ 在 $[a,b]$ 非负递减, 则 $\exist\xi\in[a,b]$
   $$
   \int_a^bf(x)\phi(x)\d x=f(a)\int_a^\xi\phi(x)\d x
   $$
2. 若 $f$ 在 $[a,b]$ 非负递增, 则 $\exist\xi\in[a,b]$
   $$
   \int_a^bf(x)\phi(x)\d x=f(b)\int_\xi^b\phi(x)\d x
   $$

> 单调区间上, 取较大的端点值, 然后缩减掉较小的部分区间

## 反常积分

### 无界区间反常积分

$f$ 在 $[a,\infty)$ 有定义, 在任意有限区间 $[a,A]\sub[a,\infty)$ 上 Riemann 可积

**定义** 反常积分: 定义反常积分

$$
\int_a^{+\infty}f(x)\d x=\lim_{A\to+\infty}\int_a^Af(x)\d x
$$

即 $\forall\epsilon>0,\exist A_0>a,\forall A>A_0$ 有

$$
\left|\int_a^Af(x)\d x-I\right|<\epsilon\iff\left|\int_A^{+\infty}f(x)\d x\right|<\epsilon
$$

类似可定义 $\int_{-\infty}^af(x)\d x$. 规定

$$
\int_{-\infty}^{+\infty}f(x)\d x=\int_{-\infty}^0f(x)\d x+\int_0^{+\infty}f(x)\d x
$$

**定理**  $\int_a^{+\infty}f(x)\d x$ 收敛 $\iff$

$$
F(A)=\int_a^Af(x)\d x
$$

在 $[a,\infty)$ 有界.

> 如果能把 $\int_a^Af(x)\d x$ 积出来就好了, 下面的判别法针对积不出来的情况

**定理** 比较判别法: $\exist K>0$ 使得

$$
0\leq f(x)\leq K\phi(x)
$$

1. $\int_a^{+\infty}\phi(x)\d x$ 收敛 $\implies \int_a^{+\infty}f(x)\d x$ 收敛
2. $\int_a^{+\infty}f(x)\d x$ 发散 $\implies \int_a^{+\infty}\phi(x)\d x$ 发散

> 大的比小的更发散. 常取 $\phi(x)=\frac{1}{x^p}$

**推论** 比较判别法的极限形式: $f,\phi$ 非负,

$$
\lim_{x\to+\infty}\frac{f(x)}{\phi(x)}=l
$$

1. $0\leq l<+\infty$, 则 $\int_a^{+\infty}\phi(x)\d x$ 收敛 $\implies \int_a^{+\infty}f(x)\d x$ 收敛
2. $0<l\leq +\infty$, 则 $\int_a^{+\infty}f(x)\d x$ 发散 $\implies \int_a^{+\infty}\phi(x)\d x$ 发散
3. $0<l<+\infty$, 二者敛散性相同

> 数项级数收敛 $\implies$ 通项趋于零
>
> $\int_a^{+\infty}f(x)\d x$ 收敛 $\not\rArr$ $f(x)\to0$, 甚至不能保证 $\lim_{x\to+\infty}f(x)$ 存在
>
> ![一种函数极限不存在的构造](https://cdn.duanyll.com/img/20230210225714.png)

**定理** 无界区间反常积分的 Cauchy 收敛原理: $\int_a^{+\infty}f(x)\d$ 收敛 $\iff\forall\epsilon>0,\exist A_0>a,\forall A',A''>A_0$ 有

$$
\left|\int_{A'}^{A''}f(x)\d x\right|<\epsilon
$$

> 和其他 Cauchy 收敛原理一样避开了对极限值的讨论

**定理** Abel 判别法:

1. $\int_a^{+\infty}f(x)\d x$ 收敛
2. $\phi$ 在 $[a,+\infty)$ 单调有界

$\implies \int_a^{+\infty}f(x)\phi(x)\d x$ 收敛

**定理** Dirichlet 判别法:

1. $F(A)=\int_a^Af(x)\d x$ 在 $[a,+\infty)$ 有界
2. $\phi$ 在 $[a,+\infty)$ 单调且 $\lim_{x\to+\infty}\phi(x)=0$

$\implies \int_a^{+\infty}f(x)\phi(x)\d x$ 收敛

> 单调, 有界, 收敛

**定义** 绝对收敛: $\int_a^{+\infty}|f(x)|\d x$ 收敛, 若 $\int_a^{+\infty}|f(x)|\d x$ 发散但 $\int_a^{+\infty}f(x)\d x$ 本身收敛, 称为条件收敛.

**定理** 绝对收敛 $\implies$ 本身收敛

### 无界函数的瑕积分

$f$ 在 $(a,b]$ 有定义, $a$ 是 $f$ 唯一瑕点, 在任意 $[a+\eta,b]\sub(a,b]$ 上 Riemann 可积

**定义** 瑕积分: 

$$
\int_a^bf(x)\d x=\lim_{\eta\to0+}\int_{a+\eta}^bf(x)\d x
$$

类似可定义以 $b$ 为瑕点的情况.

**定理** 瑕积分的 Cauchy 收敛: $\int_a^bf(x)\d x$ 收敛 $\iff\forall\epsilon>0,\exist\delta>0,\forall\eta',\eta''\in(0,\delta)$ 有

$$
\left|\int_{a+\eta'}^{a+\eta''}f(x)\d x\right|<\epsilon
$$

瑕积分的比较判别法, Abel 判别法, Dirchlet 判别法, 绝对收敛, 条件收敛类似无界区间反常积分

> 若区间中包含多个瑕点或无穷端点, 需要拆分后应用各自的定理

## 含参变量积分

### 定积分

**定理** 连续性定理: $f\in C([a,b]\times[c,d])$, 则 $\phi(y)=\int_a^bf(x,y)\d x$ 在 $[c,d]$ 连续, 即 $\forall y_0\in[c,d]$

$$
\lim_{y\to y_0}\int_a^bf(x,y)\d x=\int_a^b\lim_{y\to y_0}f(x,y)\d x
$$

> 定积分和极限可交换顺序

**定理** 积分次序交换定理: $f\in C([a,b]\times[c,d])$, 则 $\phi(y)=\int_a^bf(x,y)\d x$ 在 $[c,d]$ Riemann 可积, 且

$$ 
\int_c^d\d y\int_a^bf(x,y)\d x=\int_a^b\d x\int_c^df(x,y)\d y
$$

> 注意交换时各变量对应的积分上下限

积分下求导定理: $f(x,y),f_y(x,y)\in C([a,b]\times[c,d])$, 则 $\phi(y)=\int_a^bf(x,y)\d x$ 在 $[c,d]$ 可导, 且

$$
\frac{\d}{d y}\int_a^bf(x,y)\d x=\int_a^b\frac{\p}{\p y}f(x,y)\d x\label{label3}
$$

> 定积分和偏导可交换顺序

**定理** 变上下限求导定理: $f(x,y),f_y(x,y)\in C([a,b]\times[c,d])$, $\alpha,\beta$ 在 $[c,d]$ 上可导, $F(y)=\int_{\alpha(y)}^{\beta(y)}f(x,y)\d x$, 则

$$
\frac{\d}{\d y}F(y)=f(\beta(y),y)\frac{\d}{\d y}\beta(y)-f(\alpha(y),y)\frac{\d}{\d y}\alpha(y)+\int_{\alpha(y)}^{\beta(y)}\frac{\p}{\p y}f(x,y)\d x
$$

> 是 $(\ref{label2})$ 和 $(\ref{label3})$ 的推广

### 反常积分

#### 定义

设 $\forall y\in\mathcal{I}$, 含参变量反常积分 $\phi(y)=\int_a^{+\infty}f(x,y)\d x$ 收敛

**定义** 含参变量反常积分一致收敛: $\forall\epsilon>0,\exist A_0>a,\forall A>A_0,{\color{red}{y\in\mathcal{I}}}$ 有

$$
\left|\int_a^Af(x,y)\d x-\phi(y)\right|<\epsilon\iff\left|\int_A^{+\infty}f(x,y)\d x\right|<\epsilon
$$

> 一致体现在 $A_0$ 的选取与 $y$ 无关

类似可定义 $\int_{-\infty}^af(x,y)\d x$ 和 $\int_{-\infty}^{+\infty}f(x,y)\d x$ 一致收敛.

设 $\forall y\in\mathcal{I}$, 以 $a$ 为唯一瑕点的瑕积分 $\phi(y)=\int_a^bf(x,y)\d x$ 收敛

**定义** 含参变量瑕积分一致收敛: $\forall\epsilon>0,\exist\delta_0>0,\forall\eta:0<\eta<\delta_0,{\color{red}{y\in\mathcal{I}}}$ 有

$$
\left|\int_{a+\eta}^bf(x,y)\d x-\phi(y)\right|<\epsilon\iff\left|\int_a^{a+\eta}f(x,y)\d x\right|<\epsilon
$$

类似可定义以 $b$ 为瑕点或以 $c\in(a,b)$ 为瑕点的情形.

**定义** 内闭一致收敛: 关于参数 $y$ 在开区间 $(a,b)$ 上内闭一致收敛, 即关于参数 $y$ 在 $(a,b)$ 的任意闭子区间上一致收敛

#### 判别

**定理** 含参变量反常积分一致收敛 Cauchy 收敛原理:

$\forall\epsilon>0,\exist A_0>a,\forall A',A''>A_0,y\in\mathcal{I}$ 有 

$$
\left|\int_{A'}^{A''}f(x,y)\d x\right|<\epsilon
$$

否定: $\exist\epsilon>0, \forall A>a, \exist A',A'',y',$

$$
\left|\int_{A'}^{A''}f(x,y')\d x\right|\geq\epsilon
$$

> $A',A'',y'$ 都可构造为与 $A$ 有关.

**定理** 含参变量瑕积分一致收敛 Cauchy 收敛原理:

$\forall\epsilon>0,\exist\delta_0>0,\forall\eta':0<\eta'<\delta_0,0<\eta''<\delta_0,\forall y\in\mathcal{I}$ 有

$$
\left|\int_{a+\eta'}^{a+\eta''}f(x,y)\d x\right|<\epsilon
$$

**定理** Weierstrass 判别法: $|f(x,y)|\leq F(x)$ 且 $\int_a^{+\infty}F(x)\d x$ 收敛 $\implies\int_a^{+\infty}f(x,y)\d x$ 一致收敛

> 用一个上界把 $y$ 的变化控制住

**定理** Abel 判别法:

1. $\int_a^{+\infty}f(x,y)\d x$ 关于 $y$ 在 $\mathcal{I}$ 上*一致收敛*
2. $\phi(x,y)$ 对于任意固定的 $y\in\mathcal{I}$ 关于 $x$ 在 $[a,+\infty)$ *单调*, 且*一致有界* [^1]

$\implies \int_a^{+\infty}f(x,y)\phi(x,y)\d x$ 关于 $y$ 在 $\mathcal{I}$ 一致收敛

**定理** Dirichlet 判别法:

1. $\int_a^Af(x,y)\d x$ 在 $[a,+\infty)$ *一致有界*
2. $\phi(x,y)$ 对于任意固定的 $y\in\mathcal{I}$ 关于 $x$ 在 $[a,+\infty)$ *单调*且 $\lim_{x\to+\infty}\phi(x,y)=0$ *一致收敛*到零

$\implies \int_a^{+\infty}f(x,y)\phi(x,y)\d x$ 关于 $y$ 在 $\mathcal{I}$ 一致收敛

> 乘积各部分都要求一致收敛, 一致有界.

[^1]: $\exist M>0,\forall x\in[a,\infty),y\in\mathcal{I}$ 有 $|\phi(x,y)|<M$

#### 性质

**定理** 连续性定理: 设 $\forall y\in\mathcal{I}$, 含参变量反常积分 $\phi(y)=\int_a^{+\infty}f(x,y)\d x$ 关于 $y$ 在区间 $\mathcal{I}$ 上一致收敛, 则 $\phi(y)=\int_a^{+\infty}f(x,y)\d x$ 在 $\mathcal{I}$ 上连续, 即

$$
\lim_{y\to y_0}\int_a^{+\infty}f(x,y)\d x=\int_a^{+\infty}\lim_{y\to y_0}f(x,y)\d x
$$

> 证明开区间上连续, 可证明在开区间内的任意闭区间一致收敛

**定理** 积分次序交换定理: $\phi(y)=\int_a^{+\infty}f(x,y)\d x$ 关于 $y$ 在区间 $[c,d]$ 上一致收敛, 则

$$
\int_c^d\d y\int_a^{+\infty}f(x,y)\d x=\int_a^{+\infty}\d x\int_c^df(x,y)\d y
$$

**定理** 积分次序交换定理, 两个积分限均为无穷: $f\in C([a,+\infty)\times[c,+\infty))$

1. $\forall C>c,\int_a^{+\infty}f(x,y)\d x$ 关于 $y$ 在 $[c,C]$ 一致收敛
2. $\forall A>a,\int_c^{+\infty}f(x,y)\d y$ 关于 $x$ 在 $[a,A]$ 一致收敛
3. $\int_c^{+\infty}\d y\int_a^{+\infty}|f(x,y)|\d x$ 或 $\int_a^{+\infty}\d x\int_c^{+\infty}|f(x,y)|\d y$ 存在

则有

$$
\int_c^{+\infty}\d y\int_a^{+\infty}f(x,y)\d x=\int_a^{+\infty}\d x\int_c^{+\infty}f(x,y)\d y
$$

> 将积分内两式相减的情况视为对参变量的定积分, 然后交换积分次序

**定理** 积分下求导定理

1. $f(x,y),f_y(x,y)\in C([a,\infty),\times\mathcal{I})$
2. $\forall y\in\mathcal{I},\int_a^{+\infty}f(x,y)\d x$ 收敛
3. $\int_a^{+\infty}f_y(x,y)\d x$ 关于 $y$ 在 $\mathcal{I}$ 一致收敛到 $\sigma(y)$

则有

$$
\frac{\d}{d y}\int_a^{+\infty}f(x,y)\d x=\int_a^{+\infty}\frac{\p}{\p y}f(x,y)\d x=\sigma(y)
$$

> 用于计算积分值, 先证明满足条件, 然后对偏导数中的积分形式应用分部积分, 构造微分方程

**定理** Dini 定理: 

1. $f\in C([a,\infty)\times[c,d])$ 且 $f$ *不变号*
2. $\phi(y)=\int_a^{+\infty}f(x,y)\d x$ 关于 $y$ 在区间 $[c,d]$ 连续

则有 $\phi(y)=\int_a^{+\infty}f(x,y)\d x$ 关于 $y$ 在区间 $[c,d]$ 一致收敛

> 连续 $+$ 不变号 $\implies$ 一致收敛    