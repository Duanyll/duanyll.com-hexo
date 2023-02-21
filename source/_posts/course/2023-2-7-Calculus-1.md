---
title: 数分速通 - 数列极限
tags: 
- 数学分析
- 微积分
---

# 数列极限

## Stolz 定理

**定理** 设 $\{b_n\}$ 为*严格单增*的*正无穷大量*, 若

$$
\operatorname*{lim}_{n\rightarrow\infty}\frac{a_{n+1}-a_{n}}{b_{n+1}-\ b_{n}}=\alpha
$$

$\alpha$ 可为实数, $+\infty$, $-\infty$ 则

$$
\operatorname*{lim}_{n\rightarrow\infty}\frac{a_{n}}{b_{n}}=\alpha
$$

$\alpha=\infty$ 时可能不成立

> 对应导数的洛必达法则

**简要证明** 先证 $\alpha=0$

1. 已知极限定义 $\forall\epsilon,\exist N_1,\forall n>N_1,\left|\frac{a_{n+1}-a_{n}}{b_{n+1}-b_n}\right|<\epsilon$
2. 展开绝对值, 累加不等式到 $-\epsilon(b_{n+1}-b_{N_1+1})<a_{n+1}-a_{N_1+1}<\epsilon(b_{n+1}-b_{N_1+1})$
3. 同除 $b_{n+1}$, 中间得到 $\frac{a_{n+1}}{b_{n+1}}$
4. 两边的 $0<1-\frac{b_{N_1+1}}{b_{n+1}}<1$, 丢掉; 中间的 $\frac{a_{N_1+1}}{b_{N_1+1}}$ 受已知极限约束可任意小

再证 $\alpha\neq0$, 令 $c_n=a_n-\alpha b_n$

## 实数基本定理

实数的重要性质:

1. 运算的封闭性
2. 有序性
3. 稠密性
4. 完备性: 任意实数都是有理数列的极限

### 单调有界定理

**定理** 单调有界数列必收敛

**简要证明** 将实数视作十进制无限小数, 从高位到低位, 必存在数列中某一项后该十进制数位不再变化, 则小数点后 $m$ 位不变时, 能控制 $|a_n-a|\leq\frac{1}{10^m}<\epsilon$

$$
\gamma\triangleq\lim_{n\to\infty}(1+{\frac{1}{2}}+{\frac{1}{3}}+\cdot\cdot\cdot+{\frac{1}{n}}-\ln n)
$$

**简要证明** 单调性作差可知

$$
(1+\frac{1}{n})^n<e<(1+\frac{1}{n})^{n+1}
$$

$$
\frac{1}{n+1}<\ln\frac{n+1}{n}<\frac{1}{n}
$$

$$
b_n > \ln2+\ln\frac{3}{2}+\cdots+\ln\frac{n+1}{n}-\ln n=\ln\frac{n+1}{n}>0
$$

可得下界, 则 $\gamma$ 极限存在

### 闭区间套定理

**定义** 闭区间列 $\{[a_n,b_n]\}$ 满足

- $[a_{n+1},b_{n+1}]\sub[a_n,b_n]$ 不要求真包含
- $\lim_{n\to\infty}(b_n-a_n)=0$ 区间能不断缩小

则称 $\{[a_n,b_n]\}$ 为一个**闭区间套**

**定理** 若 $\{[a_n,b_n]\}$ 是一个闭区间套, 则*存在唯一*的 $\xi\in\R$ 使得

- $\xi\in[a_n,b_n]$
- $\lim_{n\to\infty}a_n=\lim_{n\to\infty}b_n=\xi$

**简要证明** 由 $[a_{n+1},b_{n+1}]\sub[a_n,b_n]$ 知

$$
a_1\leq a_2\leq\cdots\leq a_n\leq a_{n+1}\leq b_{n+1}\leq b_n\leq\cdots\leq b_2\leq b_1
$$

则 $\{a_n\}$ 单增有上界, $\{b_n\}$ 单减有下界, 两数列极限存在. $\lim_{n\to\infty}a_n=\lim_{n\to\infty}b_n$ 知两数列极限相等, 存在性得证.

唯一性, 再设 $\lim_{n\to\infty}a_n=\lim_{n\to\infty}b_n=\xi^\prime$, 则 

$$
\xi-\xi^\prime=\lim_{n\to\infty}(b_n-a_n)=0
$$

> 闭区间套定理的常见应用: 不断二分或三分缩短区间, 保持性质成立, 由定理得极限存在.

### Bolzano-Weierstrass 定理

**定理** $\lim_{n\to\infty}a_n=a$ 的充要条件是 $\{a_n\}$ 的每个子列 $\{a_{n_k}\}$ 都有 $\lim_{k\to\infty}a_{n_k}=a$

**定理** 有界数列必有收敛子列.

**简要证明** 设 $x_n\in[a,b]$, 则可二分构造闭区间套, 选取二分区间中至少一个含有 $\{x_n\}$ 的无穷多项, 那么从每次迭代的区间中选出 $x_{n_k}$, 即可保证 $\{x_{n_k}\}$ 收敛到 $\xi$

**推论** 有界发散数列必存在两个子列收敛到不同的数.

**简要证明** 由 B-W 定理取一子列 $\{a_{n_k}^{(1)}\}$ 收敛到 $a$, 

$$
\lim_{n\to\infty}a_n\neq a\implies\forall\epsilon_0,\forall N,\exist n_N>N, |a_{n_N}^{(2)}-a|\geq\epsilon0
$$

则取 $N=1,2,3,\cdots$, 可构造子列 $\{a_{n_k}^{(2)}\}$ 不收敛到 $a$.

$\{a_{n_k}^{(2)}\}$ 有界 $\implies$ 有收敛子列不收敛到 $a$ (若所有收敛子列都收敛到 $a$, 则 $\{a_{n_k}^{(2)}\}$ 收敛到 $a$)

### Cauchy 收敛原理

> 避免极限与实数的循环定义

**定义** 数列 $\{a_n\}$ 满足 $\forall\epsilon>0,\exist N\in\N,\forall m,n>N,|a_m-a_n|<\epsilon$, 则称为基本数列

**定理** 基本数列 $\iff$ 收敛数列

**简要证明** 易知收敛 $\implies$ 基本数列.

先证有界性. $\epsilon=1,\exist N,\forall n>N, |a_{N+1}-a_n|<1\implies a_{N+1}-1<a_n<a_{N+1}+1$

则存在收敛子列 $\lim_{n\to\infty}a_{n_k}=a$

$$
|a_n-a|\leq|a_n-a_{N_1+1}|+|a_n-a_{N_1+1}-a|<2\epsilon
$$

> Cauchy 收敛常用三角不等式构造

### 确界存在定理

**定义** 上确界: $\beta$ 是非空数集 $S$ 的最小上界.

1. $\beta$ 是 $S$ 的上界, $\forall x\in S, x\leq\beta$
2. $\beta$ 是 $S$ 的最小上界, $\forall\epsilon>0,\beta-\epsilon$ 不是 $S$ 的上界, $\exist x_\epsilon\in S,x_\epsilon>\beta-\epsilon$

**定理** 非空有上界的实数集必有上确界.

**简要证明** 先说明 $\forall\sigma>0,\exist\lambda_\sigma\in\R$, $\lambda_\sigma$ 是 $S$ 的上界, 但是 $\lambda_\sigma-\sigma$ 不是上界

取 $\sigma=\frac{1}{n},n=1,2,3,\cdots$, $\exist\{\lambda_n\}$ 是上界, 同时 $\exist\{x_n\}, x_m>\lambda_m-\frac{1}{m}$

$$
\lambda_n-\lambda_m<(x_n+\frac{1}{n})-\lambda_m=\frac{1}{n}+\underbrace{(x_n-\lambda
_m)}_{\leq0}\leq\frac{1}{n}
$$

进而由 Cauchy 收敛知 $\lim_{n\to\infty}\lambda_n=\lambda$, 然后说明 $\lambda$ 符合 $\sup S$ 的定义:

1. $\forall x\in S,x\leq\lambda_n\implies x\leq\lambda$
2. 要证 $\forall\epsilon>0,\lambda-\epsilon$ 不是 $S$ 的上界, $\exist x_\epsilon\in S,x_\epsilon>\lambda-\epsilon$ (利用极限找到 $x_\epsilon$)

$\exist N,\forall n>N,\lambda-\lambda_n\leq\frac{1}{2}\epsilon\implies\lambda=\lambda-\lambda_{N+1}+\lambda_{N+1}<\frac{1}{2}\epsilon+\lambda_{N+1}$

而 $\lambda_{N+1}-\frac{1}{n+1}$ 不是上界, $\exist x_N>\lambda_{N+1}-\frac{1}{N+1}$

则 $\lambda<\frac{1}{2}\epsilon+\lambda_{N+1}<x_N+\frac{1}{2}\epsilon<x_N+\epsilon$

### Heine-Borel 有限覆盖定理

**定义** 开覆盖: 设 $S\sub\R$ 非空, 若开区间族 $\{S_\alpha\}$ 满足 

$$
\bigcup_\alpha S_\alpha\supset S
$$

称 $\{S_\alpha\}$ 是 $S$ 的一个开覆盖

易知 $\forall S\in\R$, 开覆盖存在.

**定理** *闭区间* $[a,b]$ 的任意一个开覆盖 $\{S_\alpha\}$ 存在有限子覆盖, 即在 $\{S_\alpha\}$ 中存在有限个开区间 $\{S_{\alpha_k}\}^p_{k=1}$ 满足

$$
\bigcup_{k=1}^pS_{\alpha_k}\supset[a,b]
$$

**简要证明** 反证, 设某个闭区间的开覆盖不存在有限子覆盖, 则可以二分构造不存在有限子覆盖的闭区间套

可用闭区间套定理, 收敛到一个点上一定可以用一个开区间盖住

可用确界存在定理. 闭区间套 $\{[a_n,b_n]\}$ 满足

1. $\{a_n\}$ 单增有上界
2. $\lim_{n\to\infty}(b_n-a_n)=0$
3. $[a_n,b_n]$ 不存在有限子覆盖.

取 $\beta=\sup\{a_n\}$, 则 $a\leq a_n\leq\beta\leq b, \beta\in[a,b]$

则 $\beta$ 一定属于开覆盖中一个开区间, $\exist N, [a_N,b_N]$ 能被这个开区间覆盖, 矛盾.

> 用 H-B 有限覆盖定理把无限个开区间的性质转化为有限个区间的性质.

用 H-B 有限覆盖定理证明单调有界定理. 设 $\{a_n\}$ 单增有上界, 证明 $\{a_n\}$ 收敛.

$\exist M,\forall n,a_n\in[a_1,M]$

反证, 假设 $\{a_n\}$ 发散, 构造 $[a_1,M]$ 的开覆盖 $\{(x-\delta_x,x+\delta_x)|x\in[a_1,M]\}$

$\forall x,\exist\delta_x>0,(x-\delta_x,x+\delta_x)$ 只含有 $\{a_n\}$ 的有限项. 开覆盖存在有限子覆盖, 则可以构造有限子覆盖只含有 $\{a_n\}$ 的有限项, 则 $[a_1,M]$ 只含有 $\{a_n\}$ 的有限项, 矛盾.

## 上下极限

**定义** 极限点：有界数列 $\{a_n\}$ 存在子列 $\{a_{n_k}\}$ 收敛到 $\xi$, 称 $\xi$ 是 $\{a_n\}$ 的极限点

**定理** 记有界数列的所有极限点构成集合 $E$, $H=\sup E,h=\inf E$, 有 $H,h\in E$, 即 $H=\max E, h=\min E$

**简要证明** 要证 $H\in E$, 需要找到子列收敛到 $H$. 利用上确界定义, $\forall\epsilon>0,\exist\xi_\epsilon\in E,\xi_\epsilon>H-\epsilon$, 取 $\epsilon=1,\frac{1}{2},\frac{1}{3},\cdots$ 构造 $E$ 中数列 $\xi_n\to H$, 还需要在 $\xi_i$ 附近找到 $a_i$.

由极限点的定义. $\forall\epsilon>0,\exist N,\forall n>N,a_n\in(\xi-\epsilon,\xi+\epsilon)$

$$
\begin{aligned}
    \epsilon_1&=1,\exist n_1,&a_{n_1}\in(\xi_1-\epsilon_1,\xi_1+\epsilon_1)\\
    \epsilon_2&=\frac{1}{2},\exist n_2>n_1,&a_{n_2}\in(\xi_2-\epsilon_2,\xi_2+\epsilon_2)\\
    \epsilon_3&=\frac{1}{3},\exist n_3>n_2,&a_{n_3}\in(\xi_3-\epsilon_3,\xi_3+\epsilon_3)\\
\end{aligned}
$$

可构造子列 $\{a_{n_k}\}$.

$$
|a_{n_k}-H|\leq|a_{n_k}-\xi_n|+|\xi_n-H|\leq\frac{1}{k}+|\xi_n-H|\to0
$$

记 

$$
H=\varlimsup_{n\to\infty}a_n,h=\varliminf_{n\to\infty}b_n
$$

**定理** 有界数列收敛的充要条件

$$
\varlimsup_{n\to\infty}a_n=\varliminf_{n\to\infty}b_n
$$

极限点和上下极限的定义也可以扩充到 $\pm\infty$ 的情况

### 上下极限的运算

对任意有界数列

$$
\varlimsup_{n\to\infty}(-a_n)=-\varliminf_{n\to\infty}a_n,\varliminf_{n\to\infty}(-a_n)=-\varlimsup_{n\to\infty}a_n
$$

对任意非负数列

$$
\varlimsup_{n\to\infty}\frac{1}{a_n}=\frac{1}{\varliminf_{n\to\infty}a_n},\varliminf_{n\to\infty}\frac{1}{a_n}=\frac{1}{\varlimsup_{n\to\infty}a_n}
$$

$$
a_n\leq b_n\implies\varlimsup_{n\to\infty}a_n\leq\varlimsup_{n\to\infty}a_n,\varliminf_{n\to\infty}a_n\leq\varliminf_{n\to\infty}
$$

上下极限的和

$$
\begin{aligned}
    \varlimsup_{n\to\infty}(a_n+b_n)\leq\varlimsup_{n\to\infty}a_n+\varlimsup_{n\to\infty}b_n\\
    \varliminf_{n\to\infty}(a_n+b_n)\geq\varliminf_{n\to\infty}a_n+\varliminf_{n\to\infty}b_n\\
\end{aligned}
$$

其中一数列极限存在则取等 (不定式除外).

非负数列的上下极限的积

$$
\begin{aligned}
    \varlimsup_{n\to\infty}(a_nb_n)\leq\varlimsup_{n\to\infty}a_n\cdot\varlimsup_{n\to\infty}b_n\\
    \varliminf_{n\to\infty}(a_nb_n)\geq\varliminf_{n\to\infty}a_n\cdot\varliminf_{n\to\infty}b_n\\
\end{aligned}
$$

其中一数列极限存在则取等 (不定式除外).

> 拆开上下极限, 范围变大; 合并上下极限, 范围变小. 证明可用

$$
\begin{aligned}
    \varlimsup_{n\to\infty}a_n=H\implies\forall\epsilon>0,\exist N,\forall n>N,a_n<H+\epsilon\\
    \varliminf_{n\to\infty}a_n=H\implies\forall\epsilon>0,\exist N,\forall n>N,a_n>H-\epsilon\\
\end{aligned}
\label{limsupaltdef}
$$

> 利用上下极限证明 ~~(伪证)~~ 极限存在: 肯定上下极限分别存在, 然后用上面的运算得到结果的上下极限大小关系, 发现刚好限制到相等.

::: info

利用上下极限的例题

- 通过最大, 最小极限点的定义求上下极限
- 利用 $(\ref{limsupaltdef})$ 展开上下极限, 比较大小关系
- 证明递推数列上下极限存在
  1. 证明有界
  2. 递推式两端分别取上下极限, 并应用上下极限的运算
  3. 得到关于 $\bar{a}, \underline{a}$ 的方程组, 解方程组得到 $\bar{a}=\underline{a}$
- 用调几算平处理连加连乘 ($n$ 在指数上)
- 通过放缩证明时, 若不能先说明 $\lim$ 的存在性, 可以在处理上界时写 $\varlimsup$, 处理下界写 $\varliminf$
- 类似 $a_{m+n}=a_m+a_n$ 的式子, 通过 $n=km+l$ 处理下标到有限范围 $l$ 内
 
:::

## 压缩映射原理

**定义** 设 $S\subset\R^d,S\neq\varnothing$, 映射 $\mathbf{f}:S\to S$ 满足

$$
\|\mathbf{f}(\mathbf{x})-\mathbf{f}(\mathbf{y})\|\leq \alpha\|\mathbf{x}-\mathbf{y}\|
$$

$\alpha\in(0,1)$ 为常数, 称 $\mathbf{f}$ 是 $S$ 上的一个压缩映射, $\alpha$ 是压缩比.

若 $f$ 在 $[a,b]$ 连续, 在 $(a,b)$ 可导, $\exist\alpha\in(0,1),|f^\prime(x)|\leq\alpha$, 则 $f$ 是 $[a,b]$ 上的压缩映射.

**定义** 设 $S\subset\R^d,S\neq\varnothing$, 映射 $\mathbf{f}:S\to S$, 若 $\xi\in S$ 满足

$$
\mathbf{f}(\xi)=\xi
$$

则 $\xi$ 是 $\mathbf{f}$ 在 $S$ 上的一个不动点

**定理** 设 $f$ 是 $[a,b]$ 上的压缩映射, 则

1. $\forall a_0\in[a,b],a_{n+1}=f(a_n)$, 数列 $\{a_n\}$ 收敛
2. 记 $\xi=\lim_{n\to\infty}a_n$, 则 $\xi$ 是 $f$ 在 $[a,b]$ 上的唯一不动点
3. $\{a_n\}$ 满足估计

$$
\begin{aligned}
    |a_n-\xi|&\leq\frac{\alpha}{1-\alpha}|a_n-a_{n-1}|\\
    |a_n-\xi|&\leq\frac{\alpha^n}{1-\alpha}|a_1-a_0|
\end{aligned}
$$

> 后者为先验估计, 只需要求前两项就可以估计某一项的收敛程度

**简要证明** $|a_{n+1}-a_n|=|f(a_n)-f(a_{n-1})|\leq\alpha|a_n-a_{n-1}|\implies$ Cauchy 数列 $\implies$ 收敛

证 $f(\xi)=\xi$, 由数列极限保序性, $|f(a_n)-f(\xi)|\leq\alpha|a_n-\xi|\implies\lim_{n\to\infty}f(a_n)=f(\xi)$. $a_{n+1}=f(a_n)$ 取极限可知 $f(\xi)=\xi$. 再证唯一性:

$$
|\eta-\xi|=|f(\eta)-f(\xi)|\leq\alpha|\eta-\xi|
$$

估计:

$$
\begin{aligned}
    &\begin{aligned}
        |a_n-\xi|&=|f(a_{n-1})-f(\xi)|\\
                 &\leq|f(a_{n-1})-f(a_n)|+|f(a_n)-f(\xi)|\\
                 &\leq\alpha|a_{n-1}-a_n|+\alpha|a_n-\xi|
    \end{aligned}\\
    &\implies(a_n-\xi)\leq\frac{\alpha}{1-\alpha}|a_{n-1}-a_n|
\end{aligned}
$$

> 在迭代公式中找到压缩映射, 证明极限存在, 不动点存在

对于闭集上的多元向量值压缩映射, 仍然可说明不动点存在且唯一.

::: info

压缩映射例题

- 对于递推数列, 说明迭代函数符合压缩映射的条件, 说明数列收敛
  - 可以枚举数列的前几项来确定压缩映射成立的区间
- 也可证明数列极限的压缩性
  $$
  |a_{n+1}-a_n|\leq\alpha|a_n-a_{n-1}|
  $$
  通过 Cauchy 收敛说明极限存在, 再作差说明唯一性

:::