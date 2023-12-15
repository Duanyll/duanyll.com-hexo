---
title: 数分速通 - 级数
layout: wiki
wiki: notes-calculus
order: 205
---

## 数项级数

**定义** 级数收敛: 级数 $\sum_{n=1}^\infty a_n$ 的部分和数列 $\{S_n\}$ 的极限 $\lim_{n\to\infty}S_n=S$ 存在且有限

### 正项级数敛散性判别

**定理** 正项级数收敛 $\iff$ 部分和数列有上界

**定理** 比较判别法: 正项级数 $\sum_{n=1}^\infty a_n$, $\sum_{n=1}^\infty b_n$, 若 $\exist K>0$ 使得 $a_n\leq Kb_n$

1. $\sum_{n=1}^\infty b_n$ 收敛 $\implies\sum_{n=1}^\infty a_n$ 收敛
2. $\sum_{n=1}^\infty a_n$ 发散 $\implies\sum_{n=1}^\infty b_n$ 发散

**定理** 积分判别法: $f$ 在 $[a,\infty)$ 非负, 在 $\forall[a,A]\sub[a,+\infty)$ Riemann 可积, 取单增趋于 $+\infty$ 的数列 $\{x_n\},x_1=a$, 记

$$
a_n=\int_{x_n}^{x_{n+1}}f(x)\d x\,(n=1,2,\cdots)
$$

1. 正项级数 $\sum_{n=1}^\infty a_n$ 与反常积分 $\int_a^{+\infty}f(x)\d x$ 具有相同的敛散性
2. 收敛时, 
   $$
   \sum_{n=1}^\infty a_n=\int_a^{+\infty}f(x)\d x=\sum_{n=1}^\infty\int_{x_n}^{x_{n+1}}f(x)\d x
   $$

**推论** $f$ 单调减少时, 正项级数 $\sum_{n=[a]+1}^\infty f(n)$ 与反常积分 $\int_a^{+\infty}f(x)\d x$ 具有相同的敛散性 (如 $\frac{1}{x}$ 与 $\ln x$)

**定理** Cauchy 判别法: 正项级数 $\sum_{n=1}^\infty a_n$, 记

$$
r=\varlimsup_{n\to\infty}\sqrt[n]{a_n}
$$

1. $r<1\implies$ 收敛
2. $r>1\implies$ 发散

**推论** d'Alembert 判别法: 正项级数 $\sum_{n=1}^\infty a_n$,

$$
\begin{aligned}
    \varlimsup_{n\to\infty}\frac{a_{n+1}}{a_n}<1&\implies\textrm{收敛}\\
    \varliminf_{n\to\infty}\frac{a_{n+1}}{a_n}>1&\implies\textrm{发散}\\
\end{aligned}
$$

**定理** Raabe 判别法: 正项级数 $\sum_{n=1}^\infty a_n$, 记

$$
r=\lim_{n\to\infty}n\left(\frac{a_n}{a_{n+1}}-1\right)
$$

1. $r>1\implies$ 收敛
2. $r<1\implies$ 发散

> 分式和结论与 Cauchy 判别法相反, 一层不够可以多层叠加, 也存在无数层也不能判别的情况

### 一般项级数敛散性判别

**定理** 数项级数收敛的 Cauchy 收敛原理:

$\forall\epsilon>0,\exist N\in\N,\forall m>n>N$ 有

$$
|a_n+a_{n+1}+\cdots+a_m|=\left|\sum_{i=n}^ma_i\right|<\epsilon
$$

**引理** Abel 变换: 两数列 $\{a_n\},\{b_n\}$, 记 $S_n=\sum_{k=1}^na_k$, 则

$$
\sum_{k=1}^pa_kb_k=S_pb_p-\sum_{k=1}^{p-1}S_k(b_{k+1}-b_k)
$$

> 类似分部积分

**引理** Abel: $S_n=\sum_{k=1}^na_k$, $\{b_n\}$ 单调, 若 $\exist M>0$ 使得 $|S_n|\leq M$, 则

$$
\left|\sum_{k=1}^pa_kb_k\right|\leq M(|b_1|+2|b_p)
$$

**定理** Abel 判别法

1. $\sum_{n=1}^\infty a_n$ 收敛
2. $\{b_n\}$ 单调有界

则 $\sum_{n=1}^\infty a_nb_n$ 收敛

**定理** Dirichlet 判别法

1. $\left\{\sum_{k=1}^n a_k\right\}$ 有界
2. $\{b_n\}$ 单调收敛到 $0$

则 $\sum_{n=1}^\infty a_nb_n$ 收敛

> 单调, 有界, 收敛. 交错级数的 Leibniz 判别法是 Dirichlet 判别法的特殊情况

**定理** 绝对收敛 $\implies$ 原数列收敛

### 运算律

**定理** 收敛级数任意添加括号, 仍然收敛, 和不变

**定理** 加括号后级数收敛, 且每个括号内各项符号相同 $\implies$ 原数列收敛

令

$$
\begin{aligned}
    a^+_n&=\frac{|a_n|+a_n}{2}=
    \begin{cases}
        a_n   &a_n>0\\
        0     &a_n\leq0
    \end{cases}\\
    a^-_n&=\frac{|a_n|-a_n}{2}=
    \begin{cases}
        0     &a_n>0\\
        -a_n  &a_n\leq0
    \end{cases}\\
\end{aligned}
$$

**定理** 

1. $\sum_{n=1}^\infty a_n$ 绝对收敛 $\iff \sum_{n=1}^\infty a^+_n, \sum_{n=1}^\infty a^-_n$ 收敛
2. $\sum_{n=1}^\infty a_n$ 条件收敛 $\implies \sum_{n=1}^\infty a^+_n, \sum_{n=1}^\infty a^-_n$ 发散到 $+\infty$

**定义** 更序级数: 将 $\sum_{n=1}^\infty a_n$ 的项重新排列得到 $\sum_{n=1}^\infty a'_n$

**定理** $\sum_{n=1}^\infty a_n$ 绝对收敛 $\implies\sum_{n=1}^\infty a'_n$ 绝对收敛且 

$$
\sum_{n=1}^\infty a_n=\sum_{n=1}^\infty a'_n
$$

**定理** Riemann: $\sum_{n=1}^\infty a_n$ 条件收敛 $\implies$ $\forall a\in\R, \exists$ 更序级数 $\sum_{n=1}^\infty a'_n$ 收敛到 $a$

**定义** Cauchy 乘积: 

$$
c_n=\sum_{k+l=n+1}a_kb_l=a_1b_n+a_2b_{n-1}+\cdots+a_nb_1
$$

$\sum_{n=1}^\infty c_n$ 为 $\sum_{n=1}^\infty a_n$ 和 $\sum_{n=1}^\infty b_n$ 的 Cauchy 乘积, 记为

$$
\sum_{n=1}^{\infty}c_{n}=\left(\sum_{n=1}^{\infty}a_{n}\right)\left(\sum_{n=1}^{\infty}b_{n}\right)
$$

**定理** Cauchy 定理: $\sum_{n=1}^\infty a_n$ 和 $\sum_{n=1}^\infty b_n$ 绝对收敛到 $A$ 和 $B$, 则 $a_kb_l (k,l=1,2,\cdots)$ 按任意方式相加所得级数绝对收敛到 $AB$

## 函数项级数

### 函数列一致收敛

**定义** 函数列一致收敛: $\{f_n(x)\}$ 与 $f(x)$ 定义在区间 $\mathcal{I}$ 上

$\forall\epsilon>0,\exist N\in\N,\forall n>N,x\in\mathcal{I}$ 有

$$
|f_n(x)-f(x)|<\epsilon\label{label1}
$$

$\{f_n(x)\}$ 在区间 $\mathcal{I}$ 上一致收敛到 $f(x)$

**定理** $\{f_n(x)\}$ 在区间 $\mathcal{I}$ 上一致收敛到 $f(x)\iff$

$$
\lim_{n\to\infty}\underbrace{d(f_n,f)}_\textrm{距离}=\lim_{n\to\infty}\left(\sup_{x\in\mathcal{I}}|f_n(x)-f(x)|\right)=0
$$

> 通过单调性等找到上界, 消除 $y$, 将函数列收敛转化为数列收敛

**定理** 函数列一致收敛的 Cauchy 收敛原理: $\{f_n(x)\}$ 在区间 $\mathcal{I}$ 上一致收敛到 $f(x)\iff$

$\forall\epsilon>0,\exist N\in\N,\forall n',n''>N,x\in\mathcal{I}$ 有 

$$
|f_{n'}(x)-f_{n''}(x)|<\epsilon
$$

**定理** 逐项积分定理: $\{f_n(x)\}$ 在区间 $[a,b]$ 上一致收敛到 $f(x)$, $f_n\in R([a,b])\implies f\in R([a,b])$ 且

$$
\int_{a}^{b}{f(x)}\d x=\int_{a}^{b}\lim_{n\to\infty}{f_{n}(x)}\d x=\lim_{n\to\infty}\int_{a}^{b}{f_{n}(x)}\d x
$$

> 积分和极限可交换顺序
>
> 事实上, 由 Arzela 控制收敛定理, 无需要求一致收敛, 只需满足收敛和一致有界, 结论就能成立

**定理** 连续性定理: $\{f_n(x)\}$ 在区间 $\mathcal{I}$ 上一致收敛到 $f(x)$, $f_n\in C(\mathcal{I})\implies f\in C(\mathcal{I})$, 即 $\forall x_0\in\mathcal{I}$ 有

$$
\lim_{x\to x_{0}}f(x)=\lim_{x\to x_{0}}\lim_{n\to\infty}f_{n}(x)=\lim_{n\to\infty}\lim_{x\to x_{0}}f_{n}(x)=\lim_{n\to\infty}f_{n}(x_{0})=f(x_{0})\label{label2}
$$

**定理** 逐项求导定理: 

1. $f_n\in C^1(\mathcal{I})$
2. $\{f_n(x)\}$ 在区间 $\mathcal{I}$ 上逐点收敛
3. $\{f'_n(x)\}$ 在区间 $\mathcal{I}$ 上一致收敛到 $\sigma(x)$

$\implies f\in C^1(\mathcal{I})$ 且

$$
f'(x)=\left(\lim_{n\to\infty}f_n(x)\right)'=\lim_{n\to\infty}f'_n(x)=\sigma(x)
$$

$\{f_n(x)\}$ 在区间 $[a,b]$ 上一致收敛到 $f(x)$, $f_n\in C([a,b])$, $[a,b]$ 中数列 $\{x_n\}$ 收敛到 $x_0\implies$

$$
\lim_{n\to\infty}f_n(x_n)=f(x_0)
$$

> $$
> |f_n(x_n)-f(x_0)|\leq\underbrace{|f_n(x_n)-f(x_n)|}_\textrm{定义(\ref{label1})}+\underbrace{|f(x_n)-f(x_0)|}_{(\ref{label2})\rArr\textrm{连续}\rArr\textrm{Heine}}
> $$

**定理** Dini 定理: 

1. $f_n\in C([a,b])$
2. $\forall x\in[a,b],\{f_n(x)\}$ *单调*收敛于 $f(x)$
3. $f(x)\in C([a,b])$

$\implies$ $\{f_n(x)\}$ 在区间 $[a,b]$ 上一致收敛到 $f(x)$

### 函数项级数一致收敛

**定义** 函数项级数一致收敛: 函数项级数 $\sum_{n=1}^\infty u_n(x)$ 部分和函数列 $\{S_n(x)\}$ 在 $\mathcal{I}$ 上一致收敛到 $S(x)$, 称函数项级数 $\sum_{n=1}^\infty u_n(x)$ 在 $\mathcal{I}$ 一致收敛到 $S(x)$

**定理** 函数项级数 $\sum_{n=1}^\infty u_n(x)$ 一致收敛 $\implies \{u_n(x)\}$ 一致收敛到 $0$

Cauchy 收敛原理, Weierstrass 判别法, Abel 判别法, Dirichlet 判别法类似含参变量反常积分.

### 和函数分析性质

**定理** 逐项积分定理: $u_n\in R([a,b])$, 函数项级数 $\sum_{n=1}^\infty u_n(x)$ 在 $[a,b]$ 一致收敛到 $S(x)\implies S\in R([a,b])$ 且

$$
\int_{a}^{b}S(x)\d x=\int_{a}^{b}\sum_{n=1}^{\infty}u_{n}(x)\d x=\sum_{n=1}^{\infty}\int_{a}^{b}{u_{n}(x)\d x}
$$

**定理** 连续性定理: $u_n\in C(\mathcal{I})$, 函数项级数 $\sum_{n=1}^\infty u_n(x)$ 在 $\mathcal{I}$ 一致收敛到 $S(x)\implies S\in R(\mathcal{I})$, 即 $\forall x_0\in\mathcal{I}$

$$
\lim_{x\to x_{0}}S(x)=\lim_{x\to x_{0}}\sum_{n=1}^{\infty}u_n(x)=\sum_{n=1}^{\infty}\lim_{x\to x_{0}}u_{n}(x)=S(x_{0})
$$

**定理** 逐项求导定理: 

1. $u_n\in C^1(\mathcal{I})$
2. $\sum_{n=1}^\infty u_n(x)$ 在 $\mathcal{I}$ 逐点收敛 到 $S(x)$
3. $\sum_{n=1}^\infty u'_n(x)$ 在 $\mathcal{I}$ 一致收敛到 $\sigma(x)$

$\implies S\in C^1(\mathcal{I})$ 且

$$
S^{\prime}(x)=\left(\sum_{n=1}^{\infty}u_{n}(x)\right)^{\prime}=\sum_{n=1}^{\infty}u_{n}^{\prime}(x)=\sigma(x)
$$

## 幂级数

### 幂级数和函数性质

**定理** Abel 第一定理

1. $\sum_{n=0}^\infty a_nx^n$ 在 $\xi\neq0$ 处收敛 $\implies|x|<|\xi|$ 时*绝对收敛*
2. $\sum_{n=0}^\infty a_nx^n$ 在 $\eta$ 处发散 $\implies|x|>|\xi|$ 时发散

**定理** Cauchy-Hadamard 公式: 任意幂级数 $\sum_{n=0}^\infty a_nx^n$, 记

$$
A=\varlimsup_{n\to\infty}\sqrt[n]{a_n}
$$

则收敛半径

$$
R=
\begin{cases}
    +\infty      &A=0\\
    \frac{1}{A}  &A\in(0,+\infty)\\
    0            &A=+\infty
\end{cases}
$$

> 更简单的情况也可行,
> $$
> A=\lim_{n\to\infty}\frac{|a_{n+1}|}{|a_n|}\implies R=\frac{1}{A}
> $$

**定理** Abel 第二定理: $\sum_{n=0}^\infty a_nx^n$ 收敛半径为 $R$,

1. 在 $(-R,R)$ 内闭一致收敛[^1]
2. 在 $x=+R$ 收敛 $\implies\forall[a,R]\sub(-R,R]$ 上一致收敛
3. 在 $x=-R$ 收敛 $\implies\forall[-R,b]\sub[-R,R)$ 上一致收敛
4. 在 $x=\pm R$ 收敛 $\implies[-R,R]$ 一致收敛

[^1]: 在开区间内任意闭区间内一致收敛

**定理** 逐项积分定理: $\sum_{n=0}^\infty a_nx^n$ 收敛半径为 $R$, 和函数在 $(-R,R)$ 可积 (若在端点处收敛也成立)

$$
\int_{0}^{x}\sum_{n=0}^{\infty}a_{n}t^{n}\d t=\sum_{n=0}^{\infty}{\frac{a_{n}}{n+1}}x^{n+1}
$$

> 上式右端幂级数收敛半径也为 $R$

**定理** 连续性定理: $\sum_{n=0}^\infty a_nx^n$ 收敛半径为 $R$, 和函数在 $(-R,R)$ 连续 (若在端点处收敛也成立)

**定理** 逐项求导定理: $\sum_{n=0}^\infty a_nx^n$ 收敛半径为 $R$, 和函数在 $(-R,R)$ 可导 (若在端点处收敛也成立)

$$
\left(\sum_{n=0}^{\infty}a_{n}x^{n}\right)^{\prime}=\sum_{n=0}^{\infty}\left(a_{n}x^{n}\right)^{\prime}=\sum_{n=0}^{\infty}na_{n}x^{n-1}
$$

> 上式右端幂级数收敛半径也为 $R$
 
**定理** Tauber 定理

1. $\sum_{n=0}^\infty a_nx^n$ 收敛半径为 $1$
2. $\lim_{x\to1-}\sum_{n=0}^\infty a_nx^n$ 存在
3. $\lim_{n\to\infty}na_n=0$

$$
\implies\sum_{n=0}^{\infty}a_{n}=\lim_{x\rightarrow1^{-}}\sum_{n=0}^{\infty}a_{n}x^{n}
$$

### Taylor 级数

**定理** $f$ 在 $(x_0-R,x_0+R)$ 任意阶可导, $\exist M>0$ 使得 $|f^{(n)}(x)|\leq M^n$, 则

$$
f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n,x\in(x_0-R,x_0+R)
$$

**定理** $f$ 在 $[a,b]$ 任意阶可导, 各阶导数非负, $\forall x,x_0\in(a,b),|x-x_0|<b-x_0$ 有

$$
f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n
$$

**定理** Weierstrass 第一逼近定理: $f\in C([a,b]),\forall\epsilon>0,\exist$ 多项式 $P(x)$ 使得

$$
|P(x)-f(x)|<\epsilon
$$

$$
\begin{aligned}
    e^x&=1+x+\frac{x^2}{2!}+\cdots&&+\frac{x^n}{n!}+\cdots&&R=+\infty\\
    \sin x&=x-\frac{x^3}{3!}+\frac{x^5}{5!}+\cdots&&+(-1)^{m-1}\frac{x^{2m-1}}{(2m-1)!}+\cdots&&R=+\infty\\
    \cos x&=1-\frac{x^2}{2!}+\frac{x^4}{4!}+\cdots&&+(-1)^m\frac{x^{2m}}{2m!}+\cdots&&R=+\infty\\
    \ln(1+x)&=x-\frac{x^2}{2}+\frac{x^3}{3}+\cdots&&+(-1)^{n-1}\frac{x^n}{n}+\cdots&&R=1\\
    \frac{1}{1-x}&=1+x+x^2+\cdots&&+x^n+\cdots&&R=1\\
    \frac{1}{1+x}&=1-x+x^2+\cdots&&+(-1)^nx^n+\cdots&&R=1\\
    (1+x)^\alpha&=1+\alpha x+\frac{\alpha(\alpha-1)}{2!}+\cdots&&+\frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}x^n+\cdots
\end{aligned}
$$