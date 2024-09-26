---
title: 复变函数速通 - 级数
layout: wiki
wiki: notes-complex
order: 403
---

## 复级数的收敛性

**定理** 复级数收敛 $\iff$ 实部, 虚部分别收敛.

复常数项级数的收敛性类似实数常数项级数.

复变函数项级数的一致收敛性质类似实数函数项级数. 一致收敛的复变函数项级数具有类似实数的连续性定理和逐项积分定理, 对于逐项求导的情况, 条件更弱.

**定义** 内闭一致收敛: 在区域内任意有界闭集上一致收敛

**定理** 在圆 $|z-a|<R$ 内闭一致收敛 $\iff\forall0<\rho<R$, 在 $|z-a|<\rho$ 一致收敛

**定理**

1. $f_n(z)$ 在 $D$ 内解析
2. 复变函数项级数内闭一致收敛

$\implies$ $f(z)$ 解析且可任意阶逐项求导

幂级数, 只需注意收敛域是圆盘.

## Taylor 级数

**定理** Taylor 级数: $f(z)$ 在区域 $D$ 内解析, $a\in D$, 只要圆盘 $K:|z-a|<R$ 包含于 $D$, 则 $f(z)$ 在 $K$ 内能唯一展开成幂级数

$$
f(z)=\sum_{i=0}^\infty\frac{f^{(n)}(a)}{n!}(z-a)^n=\sum_{i=0}^\infty\frac{1}{2\pi i}\oint_{\Gamma_\rho}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\d\zeta\cdot(z-a)^n
$$

$\Gamma_\rho$ 为任意圆周 $|z-a|=\rho, \rho<R$

> 复变函数 Taylor 展开的要求比实变函数低很多

**定理** $f(z)$ 在区域 $D$ 内解析 $\iff$ 在区域内任一点能展开成 Taylor 级数.

**定理** $f(z)$ 的收敛半径 $0<R<+\infty\implies$ 在 $|z-a|=R$ 上至少有一奇点

> $f(x)$ 在 $a$ 出的收敛半径 $R=|a-b|$, $b$ 是距离 $a$ 最近的奇点

### 孤立零点

**定义** 零点: $f\in A(D)$, $a\in D$, $f(a)=0$

**定义** $m$ 阶零点:

$$
f(a)=f'(a)=\cdots=f^{(m-1)}(a)=0,f^{(m)}(a)\neq0
$$

**定理** $a$ 是不恒为零的解析函数 $m$ 阶零点 $\iff$ 存在 $\phi(z)$ 解析, $\phi(a)\neq 0$

$$
f(z)=(z-a)^m\phi(z)
$$

**定理** 解析函数零点的孤立性: $|z-a|<R$ 内解析函数不恒为零, $a$ 为零点 $\implies$ 存在 $a$ 的邻域, $f(z)$ 在其中只有一个零点.

**推论** $f(z)$ 在 $|z-a|<R$ 内解析

- 数列 $\{z_n\}\to a$, $f(z_n)=0$
- 或在圆盘的子区域, 子弧内恒为零

$\implies f(z)$ 在区域内恒为零

**定理** 唯一性定理:

1. $f_1(z),f_2(z)$ 在区域内解析
2. 存在收敛到 $a$ 的点列 $z_n$, 有 $f_1(z_n)=f_2(z_n)$

$\implies f_1(z)\equiv f_2(z)$

> 只要等号左右解析, 一切在实轴上成立的恒等式, 在 $z$ 平面上也成立

## Lauent 级数

> $f(z)$ 在 $a$ 不解析, 希望将 $f(z)$ 表示为 $z-a$ 的幂级数

双边幂级数: 包含正幂项和负幂项

$$
\sum_{n=-\infty}^{+\infty}=c_n(z-a)^n=\underbrace{\sum_{n=1}^\infty c_{-n}(z-a)^{-n}}_{\textrm{主要部分}}+\underbrace{\sum_{n=0}^\infty c_n(z-a)^n}_{\textrm{解析部分}}
$$

若解析部分具有收敛半径 $R$, 则收敛域 $|z-a|<R$; 主要部分作代换 $\zeta=\frac{1}{z-a}$, 幂级数 $\sum_{n=1}^\infty c_{-n}\zeta^{n}$ 收敛半径为 $R_1$, 则对于 $z$ 的收敛域是 $|z-a|>\frac{1}{R_1}$. 当两收敛域有公共部分时, 双边幂级数在圆环域上收敛, 否则处处发散. 则双边幂级数的收敛域可写作

$$
r<|z-a|<R
$$

![特殊圆环域](https://cdn.duanyll.com/img/20230228093642.png)

双边幂级数在收敛域内满足

1. 和函数绝对收敛且内闭一致收敛
2. 和函数可逐项求导任意次
3. 和函数可逐项积分

**定理** Lauent 展开: $f(z)$ 在圆环域 $H:r<|z-a|<R$ 内解析 $\implies$ 可唯一展开成双边幂级数

$$
f(z)=\sum_{i=-\infty}^{+\infty}\frac{1}{2\pi i}\oint_{\Gamma_\rho}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\d\zeta\cdot(z-a)^n
$$

$\Gamma_\rho$ 为任意圆周 $|z-a|=\rho, r<\rho<R$

类似 Taylor 级数, 收敛域内外圆周上必有奇点.

> Lauent 展开式的奇点不一定与原函数奇点相同

### 孤立奇点

![奇点的分类](https://cdn.duanyll.com/img/20230228095340.png)

**定义** 孤立奇点: 复变函数在某点不解析, 但存在该点的去心邻域, 函数在此邻域内解析

根据孤立奇点处 Lauent 级数的负幂项数量, 将孤立奇点分为

- 可去奇点
  - $\iff$ Lauent 级数无负幂项
  - $\iff$ $\lim_{z\to a}f(z)=b\neq\infty$
  - $\iff$ $f(z)$ 在 $a$ 的去心邻域内有界
- $m$ 阶极点
  - $\iff$ Lauent 级数中含有 $m$ 项 $(z-a)$ 负幂项, 最高为 $(z-a)^{-m}$
  - $\iff$ 存在 $\lambda(z)$ 在 $a$ 的邻域内解析, $\lambda(a)\neq0$,
    $$
    f(z)=\frac{\lambda(z)}{(z-a)^m}
    $$
  - $\iff$ 存在 $g(z)=\frac{1}{f(z)}$ 以 $a$ 为 $m$ 阶零点
  - $\iff$ $\lim_{z\to a}f(z)=\infty$ (不能判断阶数)
- 本质奇点
  - $\iff$ Lauent 级数有无限多负幂项
  - $\iff$ $\lim_{z\to a}f(z)$ 既不收敛到有限数, 也不发散到无穷
  - $\implies$ 若 $f(z)$ 在 $a$ 充分小邻域内不为零, 则 $a$ 是 $\frac{1}{f(z)}$ 的本质奇点
  - $\implies$ (Picard) $\forall A$ (有限数, 无穷), $\exist\{z_n\}\to a$, $\lim_{n\to\infty}f(z_n)=A$

**定理** Schwarz 引理:

1. $f(z)$ 在单位圆 $|z|<1$ 内解析
2. $f(0)=0$
3. $|f(z)|<1$

$\implies$ 在单位圆 $|z|<1$ 内

1. $|f(z)|<|z|$
2. $|f'(0)|\leq1$, 若至少一点处能取等， 则 $f(z)=e^{i\alpha}z$

### 无穷远点

**定义** 无穷远点是孤立奇点： $f(z)$ 在无穷远点的去心邻域 $N-\{\infty\}:r<|z|<+\infty$ 内解析

> 只需令变换 $z'=\frac{1}{z}$, 然后讨论 $f(z')$ 在 $0<|z'|<\frac{1}{r}$ 的性质

无穷远点作为 $f(z)$ 的奇点的分类

- 可去奇点
  - $\iff$ Lauent 级数无*正*幂项
  - $\iff$ $\lim_{z\to\infty}f(z)=b\neq\infty$
  - $\iff$ $f(z)$ 在 $N-\{\infty\}:r<|z|<+\infty$ 内有界
- $m$ 阶极点
  - $\iff$ Lauent 级数中含有 $m$ 项 $z$ 正幂项, 最高为 $z^m$
  - $\iff$ 存在 $\mu(z)$ 在 $N-\{\infty\}$ 内解析, $\mu(\infty)\neq0$,
    $$
    f(z)=z^m\mu(z)
    $$
  - $\iff$ 存在 $g(z)=\frac{1}{f(z)}$ 以 $\infty$ 为 $m$ 阶零点 ($g(\infty)=0$)
  - $\iff$ $\lim_{z\to\infty}f(z)=\infty$ (不能判断阶数)
- 本质奇点
  - $\iff$ Lauent 级数有无限多正幂项
  - $\iff$ $\lim_{z\to\infty}f(z)$ 既不收敛到有限数, 也不发散到无穷

### 整函数与亚纯函数

**定义** 在整个 $z$ 平面上解析的函数称为整函数

$\implies$ 只有 $z=\infty$ 孤立奇点

**定理** $f(z)$ 是整函数

- $z=\infty$ 是可去奇点 $\iff$ $f(z)=c_0$
- $z=\infty$ 是 $m$ 阶奇点 $\iff$ $f(z)=c_0+c_1z+\cdots+c_mz^m(c_m\neq 0)$
- $z=\infty$ 是本质奇点 $\iff$ 级数中有无穷个 $c_n\neq 0$ (超越整函数)

**定义** 亚纯函数: 在 $z$ 平面上除了极点无其它类型奇点的单值解析函数

**定理** $f(z)$ 为有理函数 $\iff$ 在扩充 $z$ 平面上除极点外无其它类型奇点

则有理函数 $\implies$ 亚纯函数, 非有理的亚纯函数称为**超越亚纯函数**

## 留数

绕 $f(z)$ 的孤立奇点 $a$ 的积分, 应用 Lauent 级数逐项积分

$$
\begin{aligned}
    \oint_\Gamma f(z)\d z&=\underbrace{\cdots+c_{-n}\oint_\Gamma(z-a)^{-n}\d z+\cdots}_{\textrm{高阶导数公式}\rArr0}\\
    &+\underbrace{c_{-1}\oint_\Gamma(z-a)^{-1}\d z}_{2\pi i}\\
    &+\underbrace{c_0\oint_\Gamma\d z+\cdots+c_n\oint_\Gamma(z-a)^n\d z+\cdots}_{\textrm{Cauchy 积分定理}\rArr 0}\\
    &=2\pi ic_{-1}
\end{aligned}
$$

**定义** $f(z)$ 在孤立奇点 $a$ 处的留数

$$
\Res_{z=a}f(z)=c_{-1}=\frac{1}{2\pi i}\oint_\Gamma f(z)\d z
$$

**定理** Cauchy 留数定理: 解析函数绕多个孤立奇点 $a_1,\cdots,a_n$ 的积分

$$
\oint_C f(z)\d z=2\pi i\sum_{k-1}^n\Res_{z=a_k}f(z)
$$

留数的求法:

- 可去奇点: $\Res_{z=a}f(z)=0$
- 本质奇点: 展开成 Lauent 级数求 $c_{-1}$
- $m$ 阶极点
  $$
  f(z)=\frac{\phi(z)}{(z-a)^n}
  $$
  则
  $$
  \Res_{z=a}f(z)=\frac{\phi^{n-1}(a)}{(n-1)!}
  $$
  - 当 $n$ 比 $a$ 的实际阶数高时, 公式仍有效
  - 与高阶导数公式等价
  - 一阶极点 $\phi(z)=(z-a)f(z)$
    $$
    \Res_{z=a}f(z)=\phi(a)
    $$
  - 二阶极点 $\phi(z)=(z-a)^2f(z)$
    $$
    \Res_{z=a}f(z)=\phi'(a)
    $$
  - $\phi(z),\psi(z)$ 在 $a$ 解析, $\phi(a)=0,\psi(a)\neq0,\psi'(a)\neq0$
    $$
    f(z)=\frac{\phi(z)}{\psi(z)}\implies\Res_{z=a}f(z)=\frac{\phi(a)}{\psi'(a)}
    $$

### 无穷远点的留数

**定义** 无穷远点作为孤立奇点的留数

$$
\Res_{z=\infty}f(z)=-c_{-1}=\frac{1}{2\pi i}\oint_{\Gamma^-}f(z)\d z
$$

> 顺时针方向看作绕无穷远点的正向, 无穷远点的留数是在无穷远点的 Lauent 计数 $1/z$ 项系数的相反数

**定理** $f(z)$ 在扩充 $z$ 平面上只有有限个孤立奇点, 则在各点的留数总和为零.

> 通过计算无穷远点的留数计算 $\oint_C f(z)\d z$

**定理** 计算无穷远点留数的公式

$$
\Res_{z=\infty}f(z)=-\Res_{t=0}\left(f(\frac{1}{t})\frac{1}{t^2}\right)
$$

> $$
> \oint_C f(z)\d z=2\pi i\Res_{t=0}\left(f(\frac{1}{t})\frac{1}{t^2}\right)
> $$

### 实积分

$$
\begin{aligned}
  \int_0^{2\pi}R(\cos\theta,\sin\theta)\d\theta&\xlongequal{z=e^{i\theta}}\oint_{|z|=1} R(\frac{z+z^{-1}}{2},\frac{z-z^{-1}}{2i})\frac{\d z}{iz}\\
  &=\oint_{|z|=1}f(z)\d z\\
  &=2\pi i\sum_{k=1}^n\Res_{z=z_k}f(z)
\end{aligned}
$$

$f(z)$ 是有理函数且满足留数定理的条件, 只需求*单位圆周内*各个奇点处的留数.

![围道积分法](https://cdn.duanyll.com/img/20230301093334.png)

$P(z), Q(z)$ 为多项式, $\deg Q-\deg P\geq 2$, 实轴上 $Q(z)\neq 0$,

$$
\int_{-\infty}^{\infty}\frac{P(x)}{Q(x)}\d x=2\pi i\sum_{\im a_k>0}\Res_{z=a_k}\frac{P(z)}{Q(z)}
$$

$P(z), Q(z)$ 为多项式, $\deg Q-\deg P\geq 1$, 实轴上 $Q(z)\neq 0$, $m>0$

$$
\int_{-\infty}^{\infty}\frac{P(x)}{Q(x)}e^{imx}\d x=2\pi i\sum_{\im a_k>0}\Res_{z=a_k}\frac{P(z)}{Q(z)}e^{imz}\label{label1}
$$

利用

$$
e^{imx}=\cos mx+i\sin mx
$$

拆开 $(\ref{label1})$ 的实部虚部, 可得到

$$
\int_{-\infty}^{\infty}\frac{P(x)}{Q(x)}\cos mx\d x=\re\left(2\pi i\sum_{\im a_k>0}\Res_{z=a_k}\frac{P(z)}{Q(z)}e^{imz}\right)
$$

$$
\int_{-\infty}^{\infty}\frac{P(x)}{Q(x)}\sin mx\d x=\im\left(2\pi i\sum_{\im a_k>0}\Res_{z=a_k}\frac{P(z)}{Q(z)}e^{imz}\right)
$$

### 辐角原理

**定义** $f(z)$ 关于曲线 $C$ 的对数留数

$$
\frac{1}{2\pi i}\oint_C\frac{f'(z)}{f(z)}\d z
$$

> $$
> \frac{f'(z)}{f(z)}=\frac{\d}{\d z}\ln f(z)
> $$
>
> $f(z)$ 的零点和奇点都可能是 $\frac{f'(z)}{f(z)}$ 的奇点

**定理**

- $a$ 是 $f(z)$ 的 $n$ 阶零点 $\implies$
  - $\frac{f'(z)}{f(z)}$ 一阶极点
  - $$
    \Res_{z=a}\left(\frac{f'(z)}{f(z)}\right)=n
    $$
- $a$ 是 $f(z)$ 的 $m$ 阶极点 $\implies$
  - $\frac{f'(z)}{f(z)}$ 一阶极点
  - $$
    \Res_{z=a}\left(\frac{f'(z)}{f(z)}\right)=-m
    $$

**定理** $C$ 是一周线, $f(z)$ 满足

1. 在 $C$ 内部亚纯
2. 在 $C$ 上非零解析

$\implies$ 记 $C$ 内零点总阶数 $N(f,C)$, 极点总阶数 $P(f,C)$

$$
\frac{1}{2\pi i}\oint_C\frac{f'(z)}{f(z)}\d z=N(f,C)-P(f,C)
$$

对数留数的几何意义, 展开复对数

$$
\begin{aligned}
  \frac{1}{2\pi i}\oint_C\frac{f'(z)}{f(z)}\d z&=\frac{1}{2\pi i}\oint_C\d\ln f(z)\\
  &=\frac{1}{2\pi i}\oint_C\d\ln|f(z)|+\frac{1}{2\pi}\oint_C\d\arg f(z)
\end{aligned}
$$

而绕周线一周后, $\oint_C\d\ln|f(z)|=0$, 而 $\arg f(z)$ 可能改变 $2\pi$ 的整数倍, 将辐角的连续变化记为 $\Delta_C\arg f(z)$.

**定理** 辐角原理: $C$ 是一周线, $f(z)$ 满足

1. 在 $C$ 内部亚纯
2. 在 $C$ 上非零解析

$\implies$

$$
\frac{1}{2\pi}\Delta_C\arg f(z)=N(f,C)-P(f,C)
$$

> 即 $f(z)$ 在 $C$ 内部的零点阶数与极点阶数之差, 等于当 $z$ 沿 $C$ 的正向绕行一周后 $\arg f(z)$ 的改变量除以 $2\pi$

#### Rouche 定理

**定理** $C$ 是一条周线, $f(z)$ 和 $\phi(z)$ 满足

1. 在 $C$ 内亚纯
2. 在 $C$ 上 $|f(z)|>|\phi(z)|$

$\implies$ $f(z)$ 和 $f(z)+\phi(z)$ 在 $C$ 内有同样多阶数的零点

$$
N(f+\phi,C)=N(f,C)
$$

> 可比较两函数的零点个数

**定理** 区域内单叶解析函数 $\implies f'(z)\neq0$
