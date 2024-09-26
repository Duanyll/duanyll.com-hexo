---
title: 数分速通 - 函数极限
layout: wiki
wiki: notes-calculus
order: 202
---

## Heine 定理

**定理** $\lim_{x\to x_0}f(x)=A\iff\forall$ 含于 $U^0(x_0,\delta)$ 内, 以 $x_0$ 为极限的数列 $\{x_n\}$, 相应的函数值数列收敛到 $A$

$$
\lim_{n\to\infty}f(x_n)=A
$$

**定理** $\lim_{x\to x_0}f(x)$ 存在 $\iff\forall$ 含于 $U^0(x_0,\delta)$ 内, 以 $x_0$ 为极限的数列 $\{x_n\}$, 相应的函数值数列极限 $\lim_{n\to\infty}f(x_n)$ 存在

> 只需说明函数值数列极限一定存在, 可证明其相等. 可推广到左右极限及其他极限过程

## 函数极限 Cauchy 收敛

**定理** $\lim_{x\to x_0}f(x)$ 存在 $\iff\forall\epsilon>0,\exist\delta>0,\forall x_1,x_2, 0< |x_1-x_0|<\delta,0< |x_2-x_0|<\delta$ 有

$$
|f(x_1)-f(x_2)|<\epsilon
$$

> 不用极限值说明极限存在. 可推广到左右极限及其他极限过程

## 连续函数

**定义** $f$ 在 $x_0$ 某*邻域*内有定义, $\lim_{x\to x_0}=f(x_0)$, 称函数 $f$ 在 $x_0$ 连续.

$\iff\forall\epsilon>0, \exist\delta>0, \forall x:|x-x_0|<\delta,|f(x)-f(x_0)|<\epsilon$

$\iff\forall\{x_n\}$ 收敛于 $x_0$, $\lim_{n\to\infty}f(x_n)=f(x_0)$

**定理** 反函数连续性定理: 设 $y=f(x)$ 在闭区间 $[a,b]$ 上*连续且严格单调增加*, 记 $f(a)=\alpha, f(b)=\beta$, 则它的反函数 $x=f^{-1}(y)$ 在 $[\alpha,\beta]$ 连续且严格单调增加

## 一致连续

**定义** 定义在区间 $\mathcal{I}$ 上的函数 $f$, $\forall\epsilon>0,\exist\delta>0,\forall x_1,x_2\in\mathcal{I},|x_1-x_2|<\delta$ 有

$$
|f(x_1)-f(x_2)|<\epsilon
$$

$$
\begin{aligned}
    \textrm{连续}&\iff{\color{red}{\forall x_0\in\mathcal{I}}},\forall\epsilon>0,\exist\delta>0,\forall x:|x-x_0|<\delta,|f(x)-f(x_0)|\\
    \textrm{一致连续}&\iff\forall\epsilon>0,\exist\delta>0,{\color{red}{\forall x_0\in\mathcal{I}}},\forall x:|x-x_0|<\delta,|f(x)-f(x_0)|\\
\end{aligned}
$$

> $\delta$ 选取与 $x_0$ 无关, 区间内存在统一的度量

$$
\begin{aligned}
    \textrm{Holder 连续}  \iff&|f(x_1)-f(x_2)|\leq M|x_1-x_2|^\alpha,&\alpha>0,M>0\\
    \textrm{Lipschitz连续}\iff&|f(x_1)-f(x_2)|\leq M|x_1-x_2|,&M>0\\
                      \implies&\textrm{一致连续}\implies\textrm{连续}
\end{aligned}
$$

![下凸函数在任意闭区间上 Lipschitz 连续.](https://cdn.duanyll.com/img/20230208175334.png)

证明函数在区间上不一致连续, 利用否定

$$
\exist\epsilon>0,\forall\delta,\exist x'_\delta,x''_\delta, |x'_\delta-x''_\delta|<\delta,|f(x'_\delta)-f(x''_\delta)|{\color{red}{\geq}}\epsilon\label{negdef}
$$

取一个 $\epsilon_0$, 构造与 $\delta$ 有关的 $x',x''$, 代入 $|f(x'_\delta)-f(x''_\delta)|$ 并展开, 使其能大于 $\epsilon_0$

**定理** 一致连续 $\iff\forall\mathcal{I}$ 中数列 $\{x'_n\},\{x''_n\}$, $\lim_{n\to\infty}(x'_n-x''_n)=0$, 有

$$
\lim_{n\to\infty}(f(x'_n)-f(x''_n))=0
$$

> 自变量无限接近时, 函数值也要能无限接近. 作用当然是用来证不一致连续

{% folding open:true 说明 %}

一致连续例题

- 通过定义的直接否定 $(\ref{negdef})$ 证明不一致连续.
- 通过构造函数值极限不同的点列来证明不一致连续, 常见于涉及三角函数证明
- 证明是一致连续, 可通过放缩找到 Lipschitz 连续的系数 $M$
- 在 $[0,+\infty)$ 一致连续 $\implies\exist A,B,|f(x)|\leq Ax+B$
- 利用极限相关证明的常见技巧, $|a-b|\leq|a-c|+|c-b|\leq2\epsilon$

{% endfolding %}

## 闭区间上连续函数的性质

$f\in C([a,b])$

- Weierstrass 有界性: $f$ 在 $[a,b]$ 上有界
- Weierstrass 最值: $f$ 在 $[a,b]$ 上能取到最大值和最小值
- Bolzano-Cauchy 零点: 若 $f(a)f(b)<0$, 则 $\exist\xi\in(a,b),f(\xi)=0$
- Brouwer 不动点: 若 $f([a,b])\sub[a,b]$, 则 $\exist\xi\in[a,b],f(\xi)=\xi$
- Bolzano-Cauchy 中间值: $f$ 能取到介于最小值和最大值之间的任何一个值
- Cantor: $f$ 在 $[a,b]$ 一致连续

$f\in C([a,+\infty)), \lim_{x\to+\infty}f(x)$ 存在 $\implies f$ 在 $[a,+\infty)$ 一致连续

**简要证明** 由 Cauchy 收敛, $\forall\epsilon>0,\exist X>a,\forall x',x''>X,|f(x')-f(x'')|<\epsilon$

$f$ 在 $[a,X+1]$ 一致连续, $\exist\delta\in(0,1),\forall x',x''\in[a,X+1],|f(x')-f(x'')|<\epsilon$

$\implies\forall x',x''\in[a,\infty)$, 要么 $x',x''>X$, 要么 $x',x''\in[a,X+1]\implies|f(x')-f(x'')|<\epsilon$

> Cauchy 收敛的形式很像一致连续. 注意定理的逆命题不成立, 如 $f(x)=\sqrt{x}$
