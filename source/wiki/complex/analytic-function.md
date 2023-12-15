---
title: 复变函数速通 - 解析函数
layout: wiki
wiki: notes-complex
order: 401
---

## 复数

$$
i^2=-1
$$

定义复数 $z=x+iy$, $x=\re(z)$, $y=\im(z)$

$$
z_1\cdot z_2=(x_1x_2-y_1y_2)+i(x_2y_1+x_1y_2)
$$

$$
\frac{z_1}{z_2}=\frac{z_1\conj{z_2}}{z_2\conj{z_2}}=\frac{x_1x_2+y_1y_2}{x_2^2+y_2^2}+i\frac{x_2y_1-x_1y_2}{x_2^2+y_2^2}
$$

共轭 $\conj{z}=x-iy$

$$
\conj{z_1z_2}=\conj{z_1}\cdot\conj{z_2}
$$

$$
\conj{\left(\frac{z_1}{z_2}\right)}=\frac{\conj{z_1}}{\conj{z_2}}
$$

$$
z\cdot\conj{z}=\re(z)^2+\im(z)^2
$$

模长 $|z|=r=\sqrt{x^2+y^2}$

三角不等式

$$
|z_1+z_2|\leq|z_1|+|z_2|
$$

$$
\big||z_1|-|z_2|\big|\leq|z_1-z_2|
$$

辐角 $\Arg z=\theta_1+2k\pi$

> 任何一个非零复数都有无穷个辐角

辐角主值: 在复数的辐角中把满足 $-\pi<\theta_0\leq\pi$ 称为 $\Arg z$ 的主值

$$
\arg z=\begin{cases}
    \arctan\frac{y}{x} & x>0\\
    \frac{\pi}{2} & x=0,y>0\\
    \arctan\frac{y}{x}+\pi & x<0,y>0\\
    \pi & x<0,y=0\\
    \arctan\frac{y}{x}-\pi & x<0,y<0\\
    -\frac{\pi}{2} & x=0,y<0\\
\end{cases}
$$

三角表示法

$$
z=r(\cos\theta+i\sin\theta)
$$

指数表示法

$$
z=re^{i\theta}
$$

> 求用复数方程表示的曲线: 代入 $z=x+iy$, 再通过平方, 取模等方法消除 $i$, 得到关于 $x,y$ 的方程. 最好先从几何意义上解释曲线.

**定理** 两复数相乘, 模长相乘, 辐角相加.

**定理** 两复数相除, 模数相除, 辐角相减.

> 有 
> $$
> \Arg(z_1z_2)=\Arg z_1+\Arg z_2, \Arg(z_1/z_2)=\Arg z_1-\Arg z_2
> $$
> 但不一定有 $\arg(z_1z_2)=\arg z_1+\arg z_2$, $\arg(z_1/z_2)=\arg z_1-\arg z_2$

De Moivre 公式: 模长为 $1$ 时有

$$
(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta
$$

## 复平面上的点集

![关于复平面点集的基本概念](https://cdn.duanyll.com/img/20230225172957.png)

- 邻域: $|z-z_0|<\delta$ 内部的点的集合称为 $z_0$ 的邻域
  - 无穷远点的邻域: $|z|>M>0$
- 去心邻域: $0<|z-z_0|<\delta$
  - 无穷远点的去心邻域: $M<|z|<+\infty$
- 内点: $z_0$ 为 $G$ 中一点, 存在 $z_0$ 的邻域, 邻域内所有点都属于 $G$
- 开集: $G$ 中每一点都是内点
- 区域: 联通的开集
- 边界点: 不属于区域 $D$ 的点 $P$, 在 $P$ 的任意小邻域中总有 $D$ 中的点
- 边界: $D$ 的所有边界点的集合, 记为 $\p D$
  - 边界可能是由几条曲线和*孤立的点*组成
- 闭区域: 区域连同边界
- 有界区域 / 无界区域: 是否可包含在以原点为中心的圆内
- 连续曲线: $z=z(t)=x(t)+iy(t)$, $x(t),y(t)$ 是连续的实变函数
- 光滑曲线: $x'(t),y'(t)$ 连续且 $(x'(t))^2+(y'(t))^2\neq0$
- 简单曲线 / Jordan 曲线: 没有重点的连续曲线
  - 简单曲线自身不相交
  - 任意一条简单闭曲线将复平面唯一分成三个互不相交的点集
    - 内部: 有界区域
    - 外部: 无界区域
    - 边界: 内部和外部的公共边界
- 单连通域: 在区域内任作一条简单闭曲线, 曲线内部总属于区域 (没有洞)
- 多连通域: 不是单连通域的区域
- 简单闭曲线的方向: 正向对应内部在左侧 (外边界逆时针, 内边界顺时针)

## 连续和极限

复变函数不区分函数, 映射, 变换等概念, 一个自变量对应的因变量可能不是唯一的.

**定理** $f(z)=u(x,y)+iv(x,y)$

$$
\lim_{z\to z_0}f(z)=A\iff\lim_{\substack{x\to x_0\\ y\to y_0}}u(x,y)=u_0,\lim_{\substack{x\to x_0\\ y\to y_0}}v(x,y)=v_0
$$

> $z\to z_0$ 的方式是任意的.

许多实数列极限相关的定理对复数列极限仍成立, 如 Bolzano-Weierstrass 聚点定理, 闭集套定理, Heine-Borel 有限覆盖定理等.

**定理** $f(z)=u(x,y)+iv(x,y)$ 连续 $\iff u(x,y)$ 和 $v(x,y)$ 都连续

许多闭区间上连续函数的性质可推广到有界闭集上的连续复变函数, 如 Weierstrass 有界性和最值定理 (模长意义下), Cantor 一致连续性等等.

包括无穷远点在内的复平面称为扩充复平面. 可讨论广义极限和广义连续.

## 解析函数

**定义** 复变函数的导数: $w=f(z)$, 定义域区域 $D$, $z_0+\Delta z$ 不超过定义域范围, 

$$
f'(z_0)=\frac{\d w}{\d z}\bigg|_{z=z_0}=\lim_{\Delta z\to0}\frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}
$$

> $\Delta z\to 0$ 的方式是任意的.

**定义** 在区域内处处可导, 则称 $f(z)$ *在区域内可导*

同实变函数, 可导一定连续, 连续不一定可导. 对于以复数 $z$ 的运算表示的复变函数, 求导规则同实变函数. 对于拆分实部虚部表示的复变函数, 可导性不显然. 

**定理** $w=f(z)$ 在 $z_0$ 可导 $\iff$ 在 $z_0$ 可微

**定义** $f(z)$ 在 $z_0$ 解析: 在 $z_0$ 及其*邻域*内处处可导

**定义** $f(z)$ 在区域 $D$ 内解析 / 解析函数 / 全纯函数 / 正则函数: 在区域 $D$ 内每一点解析

**定义** 奇点: 在 $z_0$ 不解析, 但在 $z_0$ 任意邻域内总有 $f(z)$ 的解析点 

> 函数在区域内解析 $\iff$ 函数在区域内可导
>
> 函数在一点解析 $\implies$ 函数在一点可导

- 解析函数的和差积商 (除去分母为零的点) 解析
- 解析函数的复合函数解析
- 所有多项式在复平面处处解析
- 有理分式函数子在分母不为零的点解析, 分母为零的点是奇点

### Cauchy-Riemann 方程

**定理** $f(z)=u(x,y)+iv(x,y)$ 在一点可微 $\iff$ $u(x,y),v(x,y)$ 在该点可微, 且满足 Cauchy-Riemann 方程

$$
\frac{\p u}{\p x}=\frac{\p v}{\p y},\frac{\p u}{\p y}=-\frac{\p v}{\p x}
$$

此时有导数公式

$$
f'(z)=\frac{\p u}{\p x}+i\frac{\p v}{\p x}=\frac{1}{i}\frac{\p u}{\p y}+\frac{\p v}{\p y}
$$

以及其他根据 C-R 方程导出的代换形式. 另外可结合二元实变函数可微的必要条件和充分条件:

- $z=x+iy$ 可微 $\implies$ $u_x,v_x,u_y,v_y$ *存在*, $u(x,y),v(x,y)$ 满足 C-R 方程
- $z=x+iy$ 可微 $\impliedby$ $u_x,v_x,u_y,v_y$ *连续*, $u(x,y),v(x,y)$ 满足 C-R 方程

由复变函数可微和可导的等价性, 在区域 $D$ 上, $f(z)$ 解析 $\iff$ $u(x,y),v(x,y)$ 在区域内可微, 且满足 C-R 方程. 

> 事实上, 由解析函数的无穷可微性, $z=x+iy$ 可微 $\iff$ $u_x,v_x,u_y,v_y$ *连续*, $u(x,y),v(x,y)$ 满足 C-R 方程

> 极坐标的 C-R 方程
> $$
> u_r=\frac{1}{r}v_\theta,v_r=-\frac{1}{r}u_\theta
> $$

{% folding open:true 说明 %}

$f(z)$ 在区域 $D$ 内解析, 以下条件彼此等价

- $f(z)$ 是常数函数
- $f'(z)=0$
- $|f(z)|$ 是常数函数
- $\conj{f(z)}$ 解析
- $\re(f(z))$ 是常数函数
- $\im(f(z))$ 是常数函数
- $\arg(f(z))$ 是常数函数

{% endfolding %}

## 初等解析函数

### 指数函数

定义满足以下条件的 $f(z)$ 为指数函数

1. $f(z)$ 在复平面内处处解析
2. $f'(z)=f(z)$
3. $\im(z)=0$ 时, 有 $f(z)=e^x,x=\re(z)$

记作

$$
\exp z=e^x(\cos y+i\sin y)\iff\begin{cases}
    |\exp z|=e^x\\
    \Arg(\exp z)=y+2k\pi
\end{cases}
$$

$\exp z$ 也写作 $e^z$, 但没有幂的意义

加法定理

$$
\exp z_1\cdot\exp z_2=\exp(z_1+z_2)
$$

> 可得到 $\exp z$ 的周期性, 周期是 $2k\pi i$
> $$
> e^{z+2k\pi i}=e^z
> $$
> 这是实变函数 $e^x$ 不具有的性质

### 三角函数

$$
e^{iy}=\cos y+i\sin y,e^{-iy}=\cos y-i\sin y
$$

定义

$$
\cos z=\frac{e^{iz}+e^{-iz}}{2},\sin z=\frac{e^{iz}-e^{-iz}}{2i}
$$

正弦, 余弦函数的奇偶性, 周期 ($2k\pi$), 导数, 三角恒等变换公式等同实变函数, 但是*不再具有有界性*. 类似可定义正切, 余切, 正割, 余割等三角函数.

### 双曲函数

$$
\cosh z=\frac{e^z+e^{-z}}{2},\sinh z=\frac{e^z-e^{-z}}{2}
$$

是以 $2\pi i$ 为周期的周期函数, 导数和三角变换公式同实变函数. 有

$$
\cosh iy=\cos y, \sinh iy=i\sin y
$$

$$
\begin{aligned}
    \cos(x+yi)&=\cos x\cosh y-i\sin x\sinh y\\
    \sin(x+yi)&=\sin x\cosh y+i\cos x\sinh y
\end{aligned}
$$

$$
\begin{aligned}
    \cosh(x+yi)&=\cosh x\cos y+i\sinh x\sin y\\
    \sinh(x+yi)&=\sinh x\cos y+i\cosh x\sin y
\end{aligned}
$$

## 初等多值函数

**定义** 单叶函数: $f(z)$ 在区域 $D$ 内有定义, 且对于 $D$ 内任意不同两点 $z_1\neq z_2$ 有 $f(z_1)\neq f(z_2)$. 从区域 $D$ 到 区域 $D$ 的单叶满变换是从 $D$ 到 $G$ 的一一变换.

希望把多值函数的函数值限制到单叶函数, 以便研究, 可以使用

1. 限制辐角法
2. 割破平面法

### 根式函数

**定义** $n$ 次根式函数: $z=w^n$, 记为 $w=\sqrt[n]{z}$, 是幂函数 $z=w^n$ 的反函数.

$$
w=\sqrt[n]{z}=r^{\frac{1}{n}}\left(\cos\frac{\theta+2k\pi}{n}+i\sin\frac{\theta+2k\pi}{n}\right)
$$

> $\sqrt[n]{z}$ 的根是以原点为中心, $r^{\frac{1}{n}}$ 为半径的圆内接正 $n$ 边形的 $n$ 个顶点

根式函数的多值性: $z\neq0$ 时,

$$
w_k=(\sqrt[n]{z})_k=\sqrt[n]{|z|}e^{i\frac{\theta+2k\pi}{n}},k=0,1,\cdots n-1,\theta=\arg z\label{sqrtfunc}
$$

![多值性的成因](https://cdn.duanyll.com/img/20230226160406.png)

终边 $z$ 相同时, $w$ 的旋转角度可以多 $2k\pi$

将 $\sqrt[n]{z}$ 分为单值解析分支后, 可求导数

$$
w_k'=(\sqrt[n]{z})_k'=\frac{1}{n}\frac{(\sqrt[n]{z})_k}{z}
$$

#### 限制辐角法 

将 $w$ 平面分割成 $n$ 个区域

$$
T_k:(\frac{2k\pi}{n}-\frac{\pi}{n})<\psi<(\frac{2k\pi}{n}+\frac{\pi}{n})
$$

![n=3的情形](https://cdn.duanyll.com/img/20230226215837.png)

这样 $w$ 平面上每个角形区域能恰好映射到整个 $z$ 平面上. 区域 $T$ 是单叶性区域 $\iff$ $\forall w_1\in T$, 满足下列条件的 $w_2\notin T$ 对应的角形互不相交且填满 $w$:

$$
|w_1|=|w_2|,\arg w_2=\arg w_1+\frac{2k\pi}{n}
$$

然后可限制只取原函数落在某个特定单叶性区域的值, 即可将原函数转化为单叶函数. 式 $\ref{sqrtfunc}$ 给出了根式函数的单值解析分支. 限制辐角法只能处理 $w$ 平面能被简单按辐角划分的情况.

#### 割破平面法

根式函数出现多值性的原因是 $z$ 的辐角不能唯一确定, 可能相差 $2k\pi$. 考虑在原点到 $\infty$ 任意引一条割线 (或者无界简单曲线). 割破的 $z$ 平面构成一个以割线为边界的区域 $G$, 在 $G$ 内指定一点 $z_0$ 和它的辐角值, 则 $G$ 内任意点 $z$ 的辐角都可以根据 $z_0$ 的辐角*连续变化*而唯一确定. 

考虑变点 $z$ 从 $z_0$ 出发, 沿 $G$ 内任一条过 $z_0$ 的简单闭曲线前进一周, 在 $w$ 平面上的像点也画出一条闭曲线, 则 $\arg z$ 能回到起始值 $\arg z_0$, 式 $\ref{sqrtfunc}$ 给出 $\sqrt[n]{z}$ 的 $n$ 个**单值连续分支函数**.

![z 平面上和 w 平面上闭曲线](https://cdn.duanyll.com/img/20230226222148.png)

**定义** 多值函数的支点: 变点 $z$ 绕这点一整周时, 多值函数从一支变换到另一支. 即变点转回原来的位置时, 函数值和原来的值相异.

> $\sqrt[n]{z}$ 有且仅有支点 $z=0,z=\infty$
>
> 若定义域不包括原点, 则不需要割破平面也能划分单值解析分支.

**定义** 支割线: 用来割破 $z$ 平面从而得到单值解析分支的割线.

> ![支割线具有两岸, 上岸, 下岸, 左岸, 右岸](https://cdn.duanyll.com/img/20230226223531.png)
>
> 对于支割线的不同做法, 得到的分支不同, 各分支的定义域随支割线变化. 每个单值分支在支割线上是不连续的, 在两岸取到不同的值, 可以扩充到单边连续到一岸.

**定义** 主值支: $\sqrt[n]{z}$ 取负实轴为支割线, 其中有一支在正实轴上取正实值

$$
(\sqrt[n]{z})_0=\sqrt[n]{r}e^{\frac{i\theta}{n}},-\pi<\theta<\pi
$$

### 对数函数

**定义** 对数函数是指数函数 $e^w=z$ 的反函数, 记为 $w=\Ln z$

$$
\begin{aligned}
  \Ln z&=\ln|z|+i\Arg z\\
       &=\ln|z|+i(\arg z+2k\pi)&k=0,\pm1,\cdots
\end{aligned}
$$

$\Ln z$ 是 $z$ 的无穷多值函数. 主值支:

$$
\ln z=\ln|z|+i\arg z,-\pi<\arg z\leq\pi
$$

> 负数无实对数, 正实数的复对数也是无穷多值的, $a>0$
> $$
> \Ln a=\ln a+2k\pi i,k=0,\pm1,\cdots
> $$

复对数仍然满足对数函数的基本性质 (集合相等)

$$
\Ln(z_1z_2)=\Ln z_1+\Ln z_2
$$

$$
\Ln\frac{z_1}{z_2}=\Ln z_1-\Ln z_2
$$

![对数函数的单叶性区域是带状](https://cdn.duanyll.com/img/20230226225120.png)

$$
B_k:2k\pi-\pi<\theta<2k\pi+\pi
$$

导数是单值的

$$
\frac{\d}{\d z}(\Ln z)_k=\frac{1}{z}
$$

$\Ln z$ 的支点是 $z=0,z=\infty$

### 一般幂函数, 一般指数函数

**定义** 一般幂函数: $z$ 为复变数, $a$ 为复常数, 定义一般幂函数

$$
w=z^a=e^{a\Ln z}
$$

1. $a$ 为整数. $z^a$ 是单值函数
2. $a$ 为有理数 $q/p$, $z^a$ 能取 $p$ 个不同的值
3. $a$ 为无理数或虚数, $z^a$ 无穷多值

**定义** 一般指数函数: $w=a^z=e^{z\Ln a}$

### 具有有限个支点的函数

$$
w=f(z)=\sqrt[n]{P(z)}
$$

$P$ 是任意的 $N$ 次多项式

$$
P(z)=A(z-a_1)^{\alpha_1}\cdots(z-a_m)^{\alpha_m},\alpha_1+\cdots+\alpha_m=N
$$

1. 可能的支点是 $a_1,a_2,\cdots,a_m$ 和 $\infty$
2. $n$ 不能整除 $\alpha_i\iff a_i$ 是支点
3. $n$ 不能整除 $N\iff\infty$ 是支点
4. $n$ 能整除 $\alpha_1,\alpha_2,\cdots\alpha_m$ 中若干个之和, 则对应的几个可以连接成割线抱成团, 变点在抱团内部简单闭曲线转一整周后函数值不变. 抱团可以不止一个, 不能抱团的点 $a_i$ 和 $\infty$ 连接成割线.

{% folding open:true 说明 %}

由单值解析分支上一点的初值 $f(z_1)$ 计算另一点的终值 $f(z_2)$: 先计算沿曲线不通过支割线到达终点的辐角连续改变量 $\Delta_C\arg f(z)$, 再计算终值

$$
f(z_2)=|f(z_2)|e^{i\Delta_C\arg f(z)}\cdot e^{i\arg f(z_1)}
$$

![还是要看例题才明白](https://cdn.duanyll.com/img/20230226232820.png)

{% endfolding %}

### 反三角函数

$$
\operatorname{Arc\,cos}z=-i\Ln(z+\sqrt{z^2-1})
$$

$$
\operatorname{Arc\,sin}z=-i\Ln(iz+\sqrt{1-z^2})
$$

$$
\operatorname{Arc\,tan}z=-\frac{i}{2}\Ln\frac{1+iz}{1-iz}
$$

$$
\operatorname{Arc\,cosh}z=\Ln(z+\sqrt{z^2-1})
$$

$$
\operatorname{Arc\,sinh}z=\Ln(z+\sqrt{z^2+1})
$$

$$
\operatorname{Arc\,tanh}z=-\frac{1}{2}\Ln\frac{1+z}{1-z}
$$