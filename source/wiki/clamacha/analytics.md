---
title: 理论力学速通 - 分析力学
layout: wiki
wiki: notes-clamacha
order: 504
---

## 约束与广义坐标

**约束**: 限制物体的位置或运动的条件. 约束可以

- 限制位置: 物体位置满足函数关系
- 限制速度: 物体速度满足函数关系

| 概念               | 解释                             | 例子                    |
| ------------------ | -------------------------------- | ----------------------- |
| 稳定约束           | 约束方程与时间*无关*             | 物体在地面上            |
| 不稳定约束         | 约束方程与时间*有关*             | 纯滚动                  |
| 可解约束           | 约束方程为*等式*                 |                         |
| 不可解约束         | 约束方程为*不等式*               |                         |
| 几何约束           | 约束方程只含有*坐标*             |                         |
| 运动约束(微分约束) | 约束方程含有坐标的一次导数(速度) | 纯滚动 $v_c-\omega R=0$ |
| 完整约束           | 能通过变换化为等式的几何约束     | 积分等变换              |

**广义坐标**: 描写系统位形所用的*独立*坐标, 如电场极化, 气体体积等均可作为广义坐标. 广义坐标的个数即为系统**自由度数**. 将质点的位移表示为广义坐标的函数

$$
\vec{r_i}=\vec{r_i}(q_1,q_2,\cdots,q_s,t)\quad i=1,2,\cdots N
$$

> 习惯地, $s$ 为系统的自由度数, $\alpha$ 枚举 $s$ 的下标; $N$ 为质点个数, $i$ 枚举 $N$ 的下标. 使用 Einstein 求和约定. 由 $N$ 个质点构成的系统最多有 $3n$ 个自由度.

速度

$$
\dot{\vec{r_i}}=\frac{\p\vec{r_i}}{\p q_\alpha}\dot{q_\alpha}+\frac{\p\vec{r_i}}{\p t}\label{label12}
$$

对于稳定约束, 约束方程与时间无关, 有

$$
\frac{\p\vec{r_i}}{\p\dot{\vec{q_\alpha}}}=\frac{\p\vec{r_i}}{\p\vec{q_\alpha}}\label{label4}
$$

并且

$$
\frac{\d}{\d t}\frac{\p\vec{r_i}}{\p\vec{q_\alpha}}=\frac{\p\vec{r_i}}{\p\vec{q_\alpha}}\label{label5}
$$

## 虚功原理

平衡时, 考虑一个所有约束条件允许的微小位移, 称为**虚位移**.

$$
\delta\vec{r_i}=\frac{\p\vec{r_i}}{\p q_\alpha}\delta q_\alpha\label{label1}
$$

> 对于稳定约束, 实位移一定是虚位移之一. 而对于不稳定约束, 实位移可能不是可能的虚位移.

将力在虚位移中做的功称为**虚功**.

$$
\delta W=\vec{F}\cdot\delta\vec{r}
$$

若在任意虚位移中, 约束力 $\vec{R}$ 的虚功都为零, 则称为**理想约束**.

$$
\delta W=\vec{R}\cdot\delta\vec{r}\equiv0\label{label2}
$$

> 光滑约束一般是理想约束

对于多个物体的受力和多个广义坐标的情况, 总的虚功

$$
\begin{aligned}
    \delta W&=\vec{F_i}\cdot\delta\vec{r_i}\\
            &=\vec{F_i}\cdot(\frac{\p\vec{r_i}}{\p q_\alpha}\delta q_\alpha) &\cdots(\ref{label1})\\
            &=(\vec{F_i}\cdot\frac{\p\vec{r_i}}{\p q_\alpha})\delta q_\alpha
\end{aligned}
$$

则记

$$
Q_\alpha=\vec{F_i}\cdot\frac{\p\vec{r_i}}{\p q_\alpha}\label{label3}
$$

为对应于广义坐标 $q_\alpha$ 的**广义力**, 虚功可写作

$$
\delta W=Q_\alpha\delta q_\alpha
$$

平衡时, 有

$$
\vec{F_i}+\vec{R_i}=0
$$

$$
\sum\vec{F_i}\cdot\delta\vec{r_i}+\sum\vec{R_i}\cdot\delta\vec{r_i}=0
$$

对于理想约束, 由 $(\ref{label2})$ 知

$$
\sum\vec{F_i}\cdot\delta\vec{r_i}=0
$$

即

$$
\sum Q_\alpha\delta q_\alpha=0
$$

由于广义坐标之间相互独立,

$$
Q_\alpha=0
$$

**虚功原理**: 对理想约束, 平衡时, 广义力必为零.

> 使用虚功原理求解平衡条件
>
> 1. 确定系统的自由度数
> 2. 选取作为广义坐标的变量
> 3. 按定义 $(\ref{label3})$ 写出广义力 $Q_\alpha$
>   - $\vec{F_i}$ 应该是常量或者 $q_\alpha$ 的函数
>   - $\frac{\p\vec{r_i}}{\p q_\alpha}$ 可先写出 $\vec{r_i}$ 与 $q_\alpha$ 的方程, 再隐函数求导
> 4. 设法求解方程组 $Q_\alpha=0$, 解出 $q_\alpha$
>
> 虚功原理只是提供了列出方程的方法, 求解方程仍然需要数学技巧

## Euler-Lagrange 方程

对于不处于平衡状态的体系, 从牛顿第二定律出发可得到 **D'Alembert 原理**:

$$
\vec{F_i}+\vec{R_i}-m_i\ddot{\vec{r_i}}=0
$$

乘以虚位移

$$
\sum\vec{F_i}\cdot\delta\vec{r_i}+\sum\vec{R_i}\cdot\delta\vec{r_i}-\sum m_i\ddot{\vec{r_i}}\cdot\delta\vec{r_i}=0
$$

理想约束下

$$
\sum\vec{F_i}\cdot\delta\vec{r_i}-\sum m_i\ddot{\vec{r_i}}\cdot\delta\vec{r_i}=0\label{label8}
$$

左边可写成广义力的形式

$$
\sum_i\vec{F_i}\cdot\delta\vec{r_i}=\sum_\alpha Q_\alpha\delta q_\alpha\label{label6}
$$

稳定约束下, 右边也表示为广义坐标的形式

$$
\begin{aligned}
    \sum m_i\ddot{\vec{r_i}}\cdot\delta\vec{r_i}&=\sum_i m_i\frac{\d\dot{\vec{r_i}}}{\d t}\cdot\left(\frac{\p\vec{r_i}}{\p q_\alpha}\delta q_\alpha\right)\\
    &=\sum_i m_i\left(\frac{\d}{\d t}\left(\dot{\vec{r_i}}\cdot\frac{\p\vec{r_i}}{\p q_\alpha}\right)-\dot{\vec{r_i}}\cdot\frac{\d}{\d t}\frac{\p \vec{r_i}}{\p q_\alpha}\right)\delta q_\alpha&\textrm{类似分部积分}\\
    &=\sum_i m_i\left(\frac{\d}{\d t}\underbrace{\left(\dot{\vec{r_i}}\cdot\frac{\p\vec{r_i}}{\p \dot{q_\alpha}}\right)}_{(\ref{label4})}-\underbrace{\dot{\vec{r_i}}\cdot\frac{\p \dot{\vec{r_i}}}{\p q_\alpha}}_{(\ref{label5})}\right)\delta q_\alpha
\end{aligned}
$$

质点的动能

$$
T_i=m_i\dot{\vec{r_i}}\cdot\delta\dot{\vec{r_i}}
$$

$$
T=\sum T_i
$$

则有

$$
\sum_i m_i\ddot{\vec{r_i}}\cdot\delta\vec{r_i}=\sum_\alpha\left(\frac{\d}{\d t}\left(\frac{\p T}{\p\dot{\vec{q_\alpha}}}\right)-\frac{\p T}{\p q_\alpha}\right)\delta q_\alpha\label{label7}
$$

$(\ref{label6})$ 和 $(\ref{label7})$ 代入 $(\ref{label8})$ 中

$$
\sum_\alpha Q_\alpha\delta q_\alpha-\sum_\alpha\left(\frac{\d}{\d t}\left(\frac{\p T}{\p\dot{\vec{q_\alpha}}}\right)-\frac{\p T}{\p q_\alpha}\right)\delta q_\alpha=0
$$

利用广义坐标的独立性得到 **Euler-Lagrange 方程**

$$
\frac{\d}{\d t}\left(\frac{\p T}{\p\dot{\vec{q_\alpha}}}\right)-\frac{\p T}{\p q_\alpha}=Q_\alpha\label{label9}
$$

若主动力都是保守力, 令系统势能 $V$, 则

$$
\begin{aligned}
    Q_\alpha&=\vec{F_i}\cdot\frac{\p\vec{r_i}}{\p q_\alpha}\\
            &=-\nabla V_i\cdot\frac{\p\vec{r_i}}{\p q_\alpha}\\
            &=-\frac{\p V}{\p q_\alpha}
\end{aligned}
$$

并且有

$$
\frac{\p V}{\p\dot{q_\alpha}}=0
$$

替换到 $(\ref{label9})$ 式右侧

$$
\frac{\d}{\d t}\left(\frac{\p T}{\p\dot{\vec{q_\alpha}}}\right)-\frac{\p T}{\p q_\alpha}=-\frac{\p V}{\p q_\alpha}+\frac{\d}{\d t}\frac{\p V}{\p\dot{q_\alpha}}
$$

移项

$$
\frac{\d}{\d t}\left(\frac{\p(T-V)}{\p\dot{\vec{q_\alpha}}}\right)-\frac{\p(T_V)}{\p q_\alpha}=0
$$

令**系统的 Lagrange 函数**

$$
L=T-V\label{label10}
$$

则得到**保守力系下的 Lagrange 方程**

$$
\frac{\d}{\d t}\left(\frac{\p L}{\p\dot{q_\alpha}}\right)-\frac{\p L}{\p q_\alpha}=0\label{label11}
$$

> Lagrange 方程与牛顿第二定律等价. 通过 Lagrange 函数可以导出运动微分方程. 使用 Lagrange 方程求解问题的方法
>
> 1. 确定系统的自由度数.
> 2. 选取广义坐标变量.
> 3. 根据 $(\ref{label10})$ 写出 Lagrange 函数. 应当是关于 $q_\alpha,\dot{q_\alpha},t$ 变量的函数.
> 4. 根据 $(\ref{label11})$ 得到运动微分方程. 求解偏导数时, 认为 $q_\alpha,\dot{q_\alpha},t$ 都是相互独立的变量.
>
> 可能可以通过运动微分方程求解 $q_\alpha$ 关于 $t$ 的函数, 也可以根据方程的形式来分析运动的性质.

### 循环积分

定义**广义速度**为 $\dot{q_\alpha}$, **广义动量**

$$
\dot{p_\alpha}=\frac{\p L}{\p\dot{q_\alpha}}
$$

将 Lagrange 方程中不显含的坐标称为**循环坐标**, Lagrange 方程对循环坐标积分称为**循环积分**. 由循环积分得到**广义动量守恒**:

> 若 Lagrange 函数显含某个广义坐标, 则对于的广义动量守恒.

### 能量积分

对于完整稳定的约束体系, 由 $(\ref{label12})$ 有

$$
\dot{\vec{r_i}}=\frac{\p\vec{r_i}}{\p q_\alpha}\dot{q_\alpha}
$$

则

$$
\begin{aligned}
    T&=\frac{1}{2}m_i\dot{\vec{r_i}}\cdot\dot{\vec{r_i}}\\
     &=\frac{1}{2}m_i\frac{\p\vec{r_i}}{\p q_\alpha}\frac{\p\vec{r_i}}{\p q_\beta}\dot{q_\alpha}\dot{q_\beta}
\end{aligned}
$$

则动能是广义速度的二次齐次函数[^1]满足

$$
2T=\dot{q_\alpha}\frac{\p T}{\p\dot{q_\alpha}}\label{label14}
$$

[^1]: $k$ 次齐次函数 $f(\lambda\vec{r})=\lambda^kf(\vec{r})\implies\nabla f\cdot\vec{r}=kf$

对时间求导

$$
\frac{\d T}{\d t}=\frac{\p T}{\p\dot{q_\alpha}}\ddot{q_\alpha}+\dot{q_\alpha}\frac{\p T}{\p q_\alpha}\label{label13}
$$

Lagrange 方程 $(\ref{label11})$ 两边同乘 $\dot{q_\alpha}$ 并对 $\alpha$ 求和

$$
\begin{aligned}
    \sum_\alpha\left(\dot{q_\alpha}\frac{\d}{\d t}\left(\frac{\p L}{\p\dot{q_\alpha}}\right)-\dot{q_\alpha}\frac{\p L}{\p q_\alpha}\right)&=0&\textrm{拆开 Lagrange 函数}\\
    \sum_\alpha\left(\dot{q_\alpha}\frac{\d}{\d t}\left(\frac{\p T}{\p\dot{q_\alpha}}\right)-\dot{q_\alpha}\frac{\p T}{\p q_\alpha}+\dot{q_\alpha}\frac{\d}{\d t}\left(\frac{\p V}{\p q_\alpha}\right)\right)&=0&\textrm{完整稳定约束}\\
    \sum_\alpha\left(\frac{\d}{\d t}\left(\dot{q_\alpha}\frac{\p T}{\p\dot{q_\alpha}}\right)-\left(\frac{\p T}{\p\dot{q_\alpha}}\ddot{q_\alpha}+\dot{q_\alpha}\frac{\p T}{\p q_\alpha}\right)+\dot{q_\alpha}\frac{\p V}{\p q_\alpha}\right)&=0&(\ref{label14})(\ref{label13})\\
    2\frac{\d T}{\d t}-\frac{\d T}{\d t}+\frac{\d V}{\d t}&=0\\
    \frac{\d(T+V)}{\d t}&=0
\end{aligned}
$$

则知此时 $T+V$ 为常数

> 对于完整稳定约束, 且主动力都是保守力时, Lagrange 通过能量积分给出能量守恒

| Lagrange 函数性质 | 对称性       | 守恒       |
| ----------------- | ------------ | ---------- |
| 不显含时间        | 时间平移对称 | 能量守恒   |
| 不显含线坐标      | 空间平移对称 | 动量守恒   |
| 不显含角坐标      | 空间选择对称 | 角动量守恒 |

## Hamilton 正则方程

希望能获得 Lagrange 方程的一阶形式以方便计算. 通过 Legendre 变换定义 **Hamilton 函数** $H(q_\alpha,p_\alpha,t)$

$$
H=\dot{q_\alpha}p_\alpha-L(q_\alpha,\dot{q_\alpha}(p_\alpha),t)
$$

左侧按多元函数链式法则求微分

$$
\d H=\frac{\p H}{\p q_\alpha}\d q_\alpha+\frac{\p H}{\p p_\alpha}\d p_\alpha+\frac{\p H}{\p t}\d t
$$

右侧求微分

$$
\begin{aligned}
    \d H&=(\dot{q_\alpha}\d p_\alpha+p_\alpha\d\dot{q_\alpha})-(\frac{\p L}{\p q_\alpha}\d q_\alpha+p_\alpha\d\dot{q_\alpha}+\frac{\p L}{\p t}\d t)\\
        &=\dot{q_\alpha}\d p_\alpha-\frac{\p L}{\p q_\alpha}\d q_\alpha-\frac{\p L}{\p t}\d t
\end{aligned}
$$

对照得

$$
\dot{q_\alpha}=\frac{\p H}{\p p_\alpha}, \frac{\p H}{\p q_\alpha}=-\frac{\p L}{\p q_\alpha}
$$

得到与 Lagrange 方程等价的 **Hamilton 正则方程**:

$$
\dot{q_\alpha}=\frac{\p H}{\p p_\alpha},\dot{p_\alpha}=-\frac{\p H}{\p q_\alpha}
$$

- 时间平移对称与能量守恒: 当 $H$ 不显含时间时, $H$ 是系统总能量, 系统能量守恒
- 空间均匀与广义动量守恒: 若 $H$ 不显含某个广义坐标, 则对应的广义动量守恒

> 用 Hamilton 正则方程推导运动微分方程
>
> 1. 确定系统自由度数
> 2. 选择广义坐标
> 3. 写出 Lagrange 函数
> 4. 求广义动量
> 5. 写出 Hamilton 函数
> 6. 求正则方程