---
title: 复变函数速通 - 积分
layout: wiki
wiki: notes-complex
order: 402
---

简单闭曲线的方向: 正向对应内部在左侧 (外边界逆时针, 内边界顺时针). 复定积分的定义类似实数域上的 Riemann 定积分, 只是不在区间上, 而是在光滑的有向曲线上划分分点.

![对积分路径的划分](https://img.duanyll.com/img/20230227170206.png)

**定理** 可积的条件: $f(z)$ 连续, $C$ 光滑 $\implies$ 可积

$$
\int_cf(z)\d z=\int_Cu\d x-v\d y+i\int_Cv\d x+u\d y\label{label1}
$$

> 在形式上可以视作 $f(z)=u+iv$ 与 $\d z=\d x+i\d y$ 相乘

分实部, 虚部转化为两个二元实变函数的线积分

$$
\begin{aligned}
    \inf_Cf(z)\d z&=\int_\alpha^\beta\Big(u\big(x(t),y(t)\big)+iv\big(x(t),y(t)\big)\Big)(x'(t)+iy'(t))\d t\\
                  &=\int_\alpha^\beta f(z(t))z'(t)\d t
\end{aligned}
$$

复积分仍具有实积分的线性性, 可加性等性质, 注意**积分估值不等式**

$$
\left|\int_Cf(z)\d z\right|\leq\int_C|f(z)|\cdot|\d z|=\int_C|f(z)|\d s
$$

$$
|\d z|=\sqrt{(\d x)^2+(\d y)^2}=\d s
$$

若 $|f(z)|$ 有上界 $M$: $|f(z)|\leq M$

$$
\left|\int_Cf(z)\d z\right|\leq ML
$$

{% folding open:true 说明 %}

![绕奇点的圆周上的积分](https://img.duanyll.com/img/20230227172458.png)

$$
\begin{aligned}
    \oint_C\frac{1}{(z-z_0)^{n+1}}\d z&=\int_0^{2\pi}\frac{ire^{i\theta}}{r^{n+1}e^{i(n+1)\theta}}\d\theta\\
    &=\frac{i}{r^n}\int_0^{2\pi}e^{-in\theta}\d\theta\\
    &=\begin{cases}
          2\pi i & n=0\\
          0 & n \neq 0
    \end{cases}
    \label{label2}
\end{aligned}
$$

{% endfolding %}

## Cauchy 积分定理

**定理** $f(z)$ 在单连通域 $B$ 内处处解析, 则 $f(z)$ 沿 $B$ 内任意一条封闭曲线 $C$ 的积分为零.

$$
\oint_C f(z)\d z=0
$$

> 若 $f'(z)$ 连续, 则利用 Green 公式和 C-R 方程容易说明. 在不连续时也成立. 另有推论
>
> 1. 若 $C$ 是 $B$ 的边界, 易得只需在闭区域 $\conj{B}=B+C$ 上解析就有结论成立
> 2. 事实上, 只需要在 $B$ 内解析, 在 $\conj{B}=B+C$ 上连续就有结论成立

![闭路变形原理](https://img.duanyll.com/img/20230227173909.png)

**定理** 闭路变形原理: 解析函数沿闭曲线的解纷, 不因闭曲线在区域内连续变形 (不经过不解析点) 而改变.

![复合闭路定理](https://img.duanyll.com/img/20230227174141.png)

**定理** 复合闭路定理: $f(z)$ 在 $D$ 内解析, $C_1,\cdots,C_n$ 各自绕一个奇点

1. 沿外边界积分等于沿内边界积分之和
   $$
   \oint_Cf(z)\d z=\sum_{i=1}^n\oint_{C_i}f(z)\d z
   $$
2. $\Gamma$ 是由 $C$ 正向, $C_1,\cdots,C_n$ 反向组成的复合曲线
   $$
   \oint_\Gamma f(z)\d z=0
   $$

> 可将 $(\ref{label2})$ 的结论推广到绕奇点的任意简单闭曲线上.

### 不定积分

**定理** $f(z)$ 在单连通域 $B$ 内处处解析, 积分 $\int_C f(z)\d z$ 与路径无关

$$
\int_C f(z)\d z=\int_{z_1}^{z_2}f(z)\d z
$$

**定理** 变上限求导: $f(z)$ 在单连通域 $B$ 内处处解析, $F(z)=\int_{z_1}^{z_2}f(\zeta)\d\zeta$ 是 $B$ 内解析函数,

$$
F'(z)=f(z)
$$

**定义** 原函数: $\phi(z)$ 在 $B$ 内导数为 $f(z)$, 称 $\phi(z)$ 是 $f(z)$ 的原函数. $f(z)$ 的任意两个原函数相差一个常数.

有类似实数的 Newton-Lebiniz 公式.

## Cauchy 积分公式

**定理** $f(z)$ 在区域 $D$ 内处处解析, $C$ 为 $D$ 内任意一条正向简单闭曲线且内部完全包含于 $D$ 内, $z_0$ 为 $C$ 内任意点, 则

$$
f(z_0)=\frac{1}{2\pi i}\oint_C\frac{f(z)}{z-z_0}\d z
$$

> 解析函数在区域内的值可用边界上的积分来表示. 公式也提供了计算解析函数积分的方法.

**定理** 解析函数的平均值定理: 解析函数在圆心处的值等于在圆周上的平均值.

$$
f(z_0)=\int_0^{2\pi}f(z_0+e^{i\theta})\d\theta
$$

**定理** 解析函数的无穷可微性: 解析函数的导数仍然是解析函数. 解析函数的 $n$ 阶导数:

$$
f^{(n)}(z_0)=\frac{n!}{2\pi}\oint_C\frac{f(z)}{(z-z_0)^{n+1}}\d z
$$

> 通过高阶导数公式, 利用求导来计算积分

**定理** Morera 定理: $f(z)$ 在单连通区域 $D$ 内连续, 且对于区域内任意周线 $\oint_C f(z)\d z=0\implies f(z)$ 在区域内解析

### Cauchy 不等式

**定理** $f(z)$ 在 $D$ 内解析, 圆周 $|z-a|<R$ 及其内部包含于 $D$, 则

$$
f^{(n)}(z)\leq\frac{n!M(R)}{R^n}
$$

其中

$$
M(R)=\max_{|z-a|<R}|f(z)|
$$

**定义** 整函数: 在整个复平面上都解析的函数

**定理** Liouville 定理: 有界整函数必为常数

利用 Liouville 定理可证明代数学基本定理: $z$ 平面上,

$$
P(z)=a_0+a_1z+\cdots+a_nz^n
$$

必有零点.

## 调和函数

**定义** 调和函数: 二元实变函数在区域内具有二阶偏导数, 满足 Laplace 方程

$$
\frac{\p^2\phi}{\p x^2}+\frac{\p^2\phi}{\p y^2}=0
$$

**定义** 共轭调和函数: $u,v$ 是调和函数,

$$
\frac{\p u}{\p x}=\frac{\p v}{\p y},\frac{\p u}{\p y}=-\frac{\p v}{\p x}
$$

**定理** 解析函数 $z=u+iv$ 的虚部 $v$ 是实部 $u$ 的共轭调和函数

偏积分法:

$$
v(x,y)=\int_{(x_0,y_0)}^{(x,y)}\frac{\p u}{\p x}\d y-\frac{\p u}{\p y}\d x
$$

不定积分法:

$$
U(z)=u_x-iu_y, V(z)=v_x+iv_y
$$

$$
f(z)=\int_{z_0}^{z}U(\zeta)\d\zeta=\int_{z_0}^{z}V(\zeta)\d\zeta
$$
