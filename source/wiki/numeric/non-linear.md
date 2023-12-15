---
title: 数值分析速通 - 非线性问题
layout: wiki
wiki: notes-numeric
order: 602
---

## 插值

插值问题的数学定义: $f(x)$ 为区间 $[a,b]$ 上的函数, $\{x_i\}_{i=0}^n$ 为 $[a,b]$ 上 $n+1$ 个互不相同的点 (插值结点),

$$
\Phi=\operatorname{span}\{\phi_0(x),\phi_1(x),\cdots,\phi(x)\}
$$

求 $g(x)\in\Phi$ 满足 $g(x_i)=f(x_i)$, $\phi_0(x),\phi_1(x),\cdots,\phi(x)$ 称为基函数. 不同插值方法的区别在于基函数的选取方式和插值结点的选取方式.

![给定基函数和插值结点, 可解线性方程组得到系数](https://cdn.duanyll.com/img/20230618160637.png)

### 基本多项式插值

很显然, 选取相同的插值结点, 多项式插值的 $g(x)$ 的符号结果都是相同的, 但不同的算法的数值精度和计算复杂度有差异.

#### 多项式插值

$$
\Phi=P_n(x)=\operatorname{span}\{1,x,\cdots,x^n\}
$$

![系数矩阵](https://cdn.duanyll.com/img/20230618161024.png)

形式简单, 但是系数矩阵条件数大

#### Lagrange 插值

构造一组多项式基函数 $\{l_i(x)\}$, 使得 $M$ 成为对角阵, 便于求解. 条件:

$$
l_i(x_j)=\begin{cases}
  0 & i\neq j\\
  1 & i=j
\end{cases}
$$

容易得到

$$
l_i(x)=\frac{(x-x_0)\cdots(x-x_{i-1})(x-x_{i+1})\cdots(x-x_n)}{(x_i-x_0)\cdots(x_i-x_{i-1})(x_i-x_{i+1})\cdots(x_i-x_n)}
$$

满足条件, $g(x)$ 可以简单取

$$
g(x)=\sum_{i=0}^n f(x_i)l_i(x)
$$

Lagrange 插值不用求解 $M$, 但此形式仍然计算复杂度较高.

#### Newton 插值

希望能够增量计算新的插值节点, 而不改变之前插值结点的系数, 方便计算. 选取基函数

$$
N_i(x)=(x-x_0)(x-x_1)\cdots(x-x_{i-1})
$$

![系数矩阵是下三角阵, 可直接回代求解](https://cdn.duanyll.com/img/20230618162709.png)

规定记号

$$
a_n\triangleq f[x_0,x_1,\cdots,x_n]
$$

为 $n$ 阶 Newton 差商, 则回代求解过程可如下表示

$$
f[x_0,x_1,\cdots,x_{n-1},x_n]=\frac{f[x_0,\cdots,x_{n-1}]-f[x_1,\cdots,x_n]}{x_n-x_0}
$$

![差商计算过程](https://cdn.duanyll.com/img/20230618163630.png)

![可以滚动数组优化内存](https://cdn.duanyll.com/img/20230618163815.png)

得到系数 $a_i$ 后, $g(x)$ 的计算可以使用秦九韶算法节约复杂度.

### Chebyshev 插值

#### Motivation

**多项式插值误差定理**: $f\in C^{n+1}[a,b]$, $P_n(x)$ 是 $[a,b]$ 上不超过 $n$ 次的插值多项式, 则 $\forall x\in[a,b]$

$$
\begin{aligned}
  f(x)-P_n(x)&=f[x_0,\cdots,x_n,x]\prod_{i=0}^n(x-x_i)\\
  &=\frac{1}{(n+1)!}f^{(n+1)}(c)\prod_{i=0}^n(x-x_i)
\end{aligned}
\label{interplError}
$$

其中 $c\in(a,b)$

> 这个形式显然是 Taylor 展开的 Lagrange 余项

![Runge 现象, 在区间的两端剧烈震荡](https://cdn.duanyll.com/img/20230618165919.png)

进行高次多项式插值的弊端, 高阶导数 $f^{(n+1)}(c)$ 可能巨大. 为了避免区间端点处的震荡, 可以向外拓展插值结点; 也可以通过合理选取插值结点, 尽量减小 $\prod_{i=0}^n(x-x_i)$ 项. Chebyshev 多项式给出的插值结点能最小化这一部分的误差.

#### 性质

第一类 $n$ 阶 Chebyshev 多项式:

$$
T_n(x)=\cos(n\arccos(x))
$$

![Chebyshev 多项式的性质](https://cdn.duanyll.com/img/20230618170438.png)

![Chebyshev 多项式的图像](https://cdn.duanyll.com/img/20230618170511.png)

![Chebyshev 多项式的零点均匀地分布在圆周上](https://cdn.duanyll.com/img/20230618170553.png)

$$
x_k=\cos\frac{(2k+1)\pi}{2n},k=0,1,\cdots n-1
$$


#### 证明

![Chebyshev 多项式是区间上值域最小的首一多项式](https://cdn.duanyll.com/img/20230618171446.png)

{% folding open:true 说明 %}

![](https://cdn.duanyll.com/img/20230618171659.png)

反证: 设首一多项式 $\tilde{P}(x)$ 比 $2^{1-n}T_n(x)$ 小, 则

$$
q(x)=\tilde{P}(x)-2^{1-n}T_n(x)
$$

是 $n-1$ 次多项式且有 $n$ 个零点, 则恒为零, $\tilde{P}(x)=2^{1-n}T_n(x)$

{% endfolding %}

在标准区间 $[-1,1]$ 上选取 Chebyshev 多项式的根作为插值结点, 误差满足

$$
\begin{aligned}
  |f(x)-P_n(x)|&=\frac{1}{(n+1)!}\left|f^{(n+1)}(c)\prod_{i=0}^n(x-x_i)\right|\\
  &=\frac{1}{(n+1)!}\left|f^{(n+1)}(c)\frac{T_{n+1}(x)}{2^n}\right|\\
  &\leq\frac{1}{2^n(n+1)!}\left|f^{(n+1)}(c)\right|
\end{aligned}
$$

把标准区间变换到任意区间 $[a,b]$

$$
x_i=\frac{b-a}{2}\cos\frac{(2k+1)\pi}{2(n+1)}+\frac{b+a}{2},k=0,1,\cdots n
$$

误差满足

$$
|f(x)-P_n(x)|\leq\frac{\left(\frac{b-a}{2}\right)^{n+1}}{2^n(n+1)!}\left|f^{(n+1)}(c)\right|
$$

### Hermite 插值

除了插值结点处的函数值, 把一阶导数值等也纳入插值方程. 需要根据选取的方程条件数量确定插值的次数, 防止无解或多解.

Hermite 插值定理：存在唯一的次数至多是 $m$ 的多项式 $P_m (x)$ 满足 $m+1$ 个Hermite 插值条件

只有一个插值结点, 条件是 0 至 $m$ 阶导数值的 Hermite 插值就是 Taylor 展开.

![](https://cdn.duanyll.com/img/20230618174244.png)

![](https://cdn.duanyll.com/img/20230618174347.png)

![](https://cdn.duanyll.com/img/20230618174401.png)

![Hermite 插值的 Newton 差商型构造](https://cdn.duanyll.com/img/20230618174651.png)

直接把已知的 $n$ 次导数值替换掉多出的 $n$ 次差商(红色部分). 亦可以处理对不同插值节点指定了不同阶数的导数的情况, 见[作业题](/source/_posts/course/2023-4-28-Numeric-7.md#problem-3)

![形式上容易理解](https://cdn.duanyll.com/img/20230618175112.png)

### 样条插值

> 高次多项式插值有种种问题, 还是分段用低次多项式近似吧.

节点 $x_0,x_1,\cdots x_n$ 上的 $k$ 次样条满足

1. 在每个子区间 $[x_i,x_{i+1}]$ 上是 $k$ 次多项式
2. 在整个区间 $[x_0,x_n]$ 上 $k-1$ 次连续

零次样条插值即为分段常数函数, 一次样条为分段线性函数, 常用三次样条

![](https://cdn.duanyll.com/img/20230618180940.png)

![也可以用其他方式指定左右边界的二阶导数或一阶导数](https://cdn.duanyll.com/img/20230618180959.png)

![](https://cdn.duanyll.com/img/20230618181110.png)

## 数据拟合与最小二乘

数据拟合也是用基函数线性组合, 但不要求精确过每个点, 要求曲线到给定数据点的距离最小

![](https://cdn.duanyll.com/img/20230618201621.png)

![](https://cdn.duanyll.com/img/20230618201921.png)

求解最后的矩阵就能得到最小二乘拟合系数. 最后的矩阵可以写作

![超定线性方程组最小二乘法](https://cdn.duanyll.com/img/20230618202110.png)

### 法线方程

![最小二乘的几何解释](https://cdn.duanyll.com/img/20230618202341.png)

$$
A^\top Ax=A^\top b
$$

公式被称作法线方程, 是超定方程 $Ax=b$ 的最小二乘解

对于非线性问题的最小二乘拟合, 需要选取合适的基函数, 还可能需要取对数来线性化.

### QR 分解

直接使用法线方程计算最小二乘解数值不稳定. 可利用 QR 分解来求解.

![d 的下面部分与 x 无关, 则上面为 0 时模长最小](https://cdn.duanyll.com/img/20230618203106.png)

只需进行完全 QR 分解, 然后求解 

$$
Rx=Q^\top b
$$

## 数值微分

$$
f'(x)=\lim_{x^*\to x}\frac{f(x^*)-f(x)}{x^*-x}
$$

直接似是而非的去个小量 $h$ 来近似好了

- 前向差商
  $$
  \hat{f}'(x)=\frac{f(x+h)-f(x)}{h}
  $$
- 后向差商
  $$
  \hat{f}'(x)=\frac{f(x)-f(x-h)}{h}
  $$
- 中心差商
  $$
  \hat{f}'(x)=\frac{f(x+h)-f(x-h)}{2h}
  $$
- 二阶中心差商
  $$
  \begin{aligned}
    \hat{f}''(x)&=\frac{f'(x+h/2)-f'(x-h/2)}{h}\\
    &=\frac{f(x+h)-2f(x)+f(x-h)}{h^2}
  \end{aligned}
  $$

用多项式插值的导数近似函数的导数. 两点插值得到的就是前向 / 后向差商, 三点插值得到中心差商

### 误差分析

通过 Taylor 展开的 Lagrange 余项控制误差的范围. 正确的差商公式都是 Taylor 展开式的变形 (确定插值点, 可以通过 Taylor 展开得到唯一正确的差商公式, 以及余项).

![](https://cdn.duanyll.com/img/20230618210556.png)

由于数值计算误差的存在, $h$ 的选取不是越小越好

![](https://cdn.duanyll.com/img/20230618210655.png)

### Richardson 外推

对任何 $F$ 的 $n$ 阶近似 (不仅是数值导数问题)

$$
F=\hat F(h)+Ch^n+O(h^{n+1})
$$

都能再加一项缩减一半步长

$$
\tilde{F}(h)=\frac{2^n\hat{F}(\frac{h}{2})-\hat{F}(h)}{2^n-1}
$$

至少是 $F$ 的 $n+1$ 阶近似.

### 待定系数法

![](https://cdn.duanyll.com/img/20230618211735.png)

给定插值点, 可以通过 Taylor 展开得到唯一正确的差商公式, 以及余项. 插值点数量已知时, 为了让这个方程有唯一解, Taylor 公式展开的阶数是确定的, 余项的阶数也能确定了. 解线性方程组求出系数后再带回展开式, 可能余项的系数为 0, 这时差商公式会具有更高的阶数.

## 数值积分

### Newton-Cotes 积分

用插值函数的积分来近似原函数的积分, 积分节点等距的插值型数值积分称为 Newton-Cotes 积分. 在区间 $[a,b]$ 上积分, 记 $h=b-a$.

数值积分的代数精度, 指可以准确积分的多项式的最高阶数. 给定积分的插值结点, 可以根据插值结点数量确定至少具有的代数精度, 并列线性方程组解出唯一正确的积分系数.

![求至少具有 n 数值精度的系数](https://cdn.duanyll.com/img/20230618223958.png)

从插值误差 $(\ref{interplError})$ 推导积分误差, 使用积分均值定理, $f(x)$ 不变号时存在 $[a,b]$ 中一点 $c$

$$
\int_a^bf(x)g(x)\d x=f(c)\int_a^bg(x)\d x
$$

插值误差

$$
E(x)=\frac{1}{(n+1)!}\left|f^{(n+1)}(c(x))\prod_{i=0}^n(x-x_i)\right|
$$

$$
\int_a^bE(x)\d x=\frac{f^{(n+1)}(c)}{(n+1)!}\int_a^b\prod_{i=0}^n(x-x_i)\d x
$$

一般形式的 Newton-Cotes 积分

$$
\int_a^bf(x)\d x=\sum_{i=0}^nA_if(x_i)
$$

$n$ 为奇数时, Newton-Cotes 具有 $n$ 阶代数精度. $n$ 为偶数时, Newton-Cotes 具有 $n+1$ 阶代数精度.

- 梯形法则: 两点一次插值
  $$
  I(f)=\frac{h}{2}(f(a)+f(b))
  $$
  $$
  E(f)=-\frac{h^3}{12}f''(c)
  $$
- Simpson 法则: 三点二次插值
  $$
  I(f)=\frac{h}{6}\left(f(a)+4f(\frac{a+b}{2})+f(b)\right)
  $$
  $$
  E(f)=-\frac{h^5}{2880}f^{(4)}(c)
  $$
- 中心法则: 使用中点函数值
  $$
  I(f)=hf(\frac{a+b}{2})
  $$
  $$
  E(f)=-\frac{h^3}{24}f''(c)
  $$
- 三点开 Newton-Cotes 积分: 
  $$
  I(f)=\frac{2h}{3}f(\frac{3a+b}{4})-\frac{h}{3}f(\frac{a+b}{2})+\frac{2h}{3}f(\frac{a+3b}{4})
  $$
  $$
  E(f)=\frac{7h^5}{23040}f^{(4)}(c)
  $$

复合 Newton-Cotes 积分, 先把 $[a,b]$ 划分为 $m$ 个等距子区间, 记 $\Delta h=\frac{b-a}{m}$, $x_i=a+i\Delta h$ 再在每个子区间上应用 Newton-Cotes 积分, 避免高次插值的 Runge 现象. 对于子区间断点处的函数值, 计算时可以重复利用节约时间. 复合积分的误差, 将原来的 $h^n$ 项替换为 $(b-a)\Delta h^{n-1}$ 项.

- 复合中心法则
  $$
  I(f)=\Delta h\sum_{i=0}^{m-1}f\left(\frac{x_i+x_{i+1}}{2}\right)
  $$
- 复合梯形法则
  $$
  I(f)=\frac{\Delta h}{2}\left(f(a)+f(b)+2\sum_{i=1}^{m-1}f(x_i)\right)
  $$
- 复合 Simpson 法则
  $$
  I(f)=\frac{\Delta h}{6}\left(f(a)+f(b)+2\sum_{i=1}^{m-1}f(x_i)+4\sum_{i=0}^{m-1}f\left(\frac{x_i+x_{i+1}}{2}\right)\right)
  $$

### Romberg 积分

用 Richardson 外推法提高复合梯形法则的精度.

![](https://cdn.duanyll.com/img/20230618223417.png)

$R_{j1}$ 是 $m=2^{j-1}$ 的复合梯形法则, 可递推计算, 补充新增的插值点. 

![](https://cdn.duanyll.com/img/20230618223647.png)

$R_{j2}$ 实际上是复合 Simpson 法则.

![伪代码](https://cdn.duanyll.com/img/20230618223746.png)

### Gauss 积分

非均匀地选取插值结点, 使积分值具有尽可能高的数值精度. 可通过正交基构造.

![](https://cdn.duanyll.com/img/20230618224440.png)

![](https://cdn.duanyll.com/img/20230618224530.png)

![](https://cdn.duanyll.com/img/20230618224632.png)

找到 $n+1$ 次多项式与 $n$ 次多项式正交, 用他的根做插值结点就能达到 $2n+1$ 阶代数精度.

![](https://cdn.duanyll.com/img/20230618224558.png)

![](https://cdn.duanyll.com/img/20230618224709.png)

Legendre 多项式是合适的构造.

![标准区间上的 Gauss 插值节点](https://cdn.duanyll.com/img/20230618224854.png)

定义映射

$$
t=\frac{2(x-\frac{b+a}{2})}{b-a}
$$

把 $[a,b]$ 映射到标准区间

$$
\int_a^bf(x)\d x=\frac{b-a}{2}\int_{-1}^1f\left(\frac{b-a}{2}t+\frac{b+a}{2}\right)\d t
$$