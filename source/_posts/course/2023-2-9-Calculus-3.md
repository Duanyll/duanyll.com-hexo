---
title: 数分速通 - 导数与微分
tags: 
- 数学分析
- 微积分
---

## 一元导函数性质

**定理** 单侧导数极限定理: $f$ 开区间 $(a,b)$ 可导, 在 $a$ *右连续*, *导函数右极限* $f'(a+0)$ 存在 $\implies$ 右导数 $f'_+(a)$ 存在. 左端点的情况类似.

**推论** 开区间可导 $\implies$ 导函数在开区间内不存在间断点

**定理** 导数极限定理: $f$ 在 $x_0$ 某邻域内连续, 去心邻域内可导, $\lim_{x\to x_0}f'(x)$ 存在 $\implies f'(x_0)=\lim_{x\to x_0}f'(x)$

**定理** Darboux 中值: $f$ 在闭区间 $[a,b]$ 可导 $\implies f'$ 能取到 $f'_+(a)$ 和 $f'_(b)$ 之间的每一个值

> 没有要求导函数要连续, 但表明了导函数具有一定程度的连续性

**定义** 一致可微: $f$ 在区间 $\mathcal{I}$ 上可微. $\forall\epsilon>0,\exist\delta>0,\forall h:0<|h|<\delta,\forall x\in\mathcal{I},x+h\in\mathcal{I}$ 有

$$
\left|\frac{f(x+h)-f(x)}{h}-f'(x)\right|<\epsilon
$$

> 类似一致连续, 要求 $\delta$ 对所有 $x$ 有一致的度量. 普通的可微: $\forall x\in\mathcal{I},\forall\epsilon>0,\exist\delta_x>0,\forall h:0<|h|<\delta_x,x+h\in\mathcal{I}$
>
> $$
> \left|\frac{f(x+h)-f(x)}{h}-f'(x)\right|<\epsilon
> $$

**定理** $f$ 闭区间 $[a,b]$ 上可微, 则 $f$ 一致可微 $\iff f'\in C([a,b])$

## 一元 Taylor 公式

带 Peano 型余项的 Taylor 公式, $f$ 在 $x_0$ 处有 ${\color{red}{n}}$ 阶导数

$$
f(x)=\sum_{k=0}^n\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k+o((x-x_0)^n)\;(x\to x_0)
$$

带 Lagrange 型余项的 Taylor 公式, $f\in C^n([a,b])\cap C^{n+1}((a,b))$ 通过 Lagrange 中值构造余项

$$
f(x)=\sum_{k=0}^n\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}\\
x,x_0\in[a,b],\xi=x_0+\theta(x-x_0),\theta\in(0,1)
$$

带积分型余项的 Taylor 公式, $f$ 在 $x_0$ 处有 ${\color{red}{n+1}}$ 阶导数, 精确

$$
f(x)=\sum_{k=0}^n\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k+\frac{1}{n!}\int_{x_0}^x f^{(n+1)}(t)(x-t)^n\mathrm{d}t
$$

## 多元偏导数性质

**定理** Lagrange 中值: 二元函数在*凸区域*上可微, 区域中任意两点 $(x_0,y_0),(x_1,y_1)$ 连线段上存在点 $(\xi,\eta)$ 使得

$$
f(x_1,y_1)-f(x_0,y_0)=f_x(\xi,\eta)(x_1-x_0)+f_y(\xi,\eta)(y_1-y_0)
$$

> 高维情况类似

**定理** 二元函数混合偏导数 $f_{xy},f_{yx}$ 在一点连续 $\implies$ 相等

实际上, 只需要 $f_{xy}$ 连续, $f_y$ 存在 $\implies f_{yx}$ 存在且 $f_{yx}=f_{xy}$

> 高维情况下, 各元求导次数相同的高阶偏导数连续即相等

## 多元 Taylor 公式

$D\sub\R^2$ 为凸区域, $f\in C^{n+1}(D)$, 

$$
f(x,y)=\sum_{k=0}^{n}{\frac{1}{k!}}\left((x-x_{0}){\frac{\partial}{\partial x}}+(y-y_{0}){\frac{\partial}{\partial y}}\right)^{k}f(x_{0},y_{0})+R_{n}(x,y;x_{0},y_{0})
$$

Lagrange 余项: $\exist\theta\in(0,1)$ 使得

$$
R_{n}={\frac{1}{(n+1)!}}\left((x-x_{0}){\frac{\partial}{\partial x}}+(y-y_{0}){\frac{\partial}{\partial y}}\right)^{n+1}f(x_{0}+\theta(x-x_{0}),y_{0}+\theta(y-y_{0}))
$$

积分型余项:

$$
R_{n}={\frac{1}{n!}}\int_{0}^{1}(1-t)^{n}\left((x-x_{0}){\frac{\partial}{\partial x}}+(y-y_{0}){\frac{\partial}{\partial y}}\right)^{n+1}f(x_{0}+t(x-x_{0}),\,y_{0}+t(y-y_{0}))\mathrm{d}t
$$

{% folding open:true 说明 %}

多元 Taylor 公式求高阶偏导数: 用一元的 Taylor 公式整体代换然后展开, 对应系数得到高阶偏导数. 注意保证展开阶数足够.

{% endfolding %}

## 隐函数求导

**定理** 一元隐函数存在定理: 二元函数 $F$ 满足

1. 在 $(x_0,y_0)$ 某邻域内*偏导数* $F_x,F_y$ *存在且连续*
2. $F(x_0,y_0)=0$
3. $F_y(x_0,y_0)\neq0$

则 $\exist\rho>0$, 使得

1. 在 $(x_0,y_0)$ 附近可*唯一确定*定义在 $(x-\rho,x+\rho)$ 上的函数 $y=y(x)$ 满足 $F(x,y(x))=0,y_0=y(x_0)$
2. $y(x)$ 在 $(x-\rho,x+\rho)$ 上具有*连续导数*

$$
y^{\prime}(x)=-\frac{F_{x}\left(x,y(x)\right)}{F_{y}\left(x,y(x)\right)}
$$

**定理** 多元隐函数存在定理: $\mathbf{x}_0\in\R^d$, $d+1$ 元函数 $F$ 满足

1. 在 $(\mathbf{x}_0,y_0)$ 某邻域内*偏导数* $F_{x_i}(\mathbf{x},y)\;(i=1,2,\cdots d),F_y(\mathbf{x},y)$ *存在且连续*
2. $F(\mathbf{x}_0,y_0)=0$
3. $F_y(\mathbf{x}_0,y_0)\neq0$

则 $\exist\rho>0$, 使得

1. 在 $(\mathbf{x}_0,y_0)$ 附近可*唯一确定*定义在 $B(\mathbf{x_0},\rho)$ 上的函数 $y=y(\mathbf{x})$ 满足 $F(\mathbf{x},y(\mathbf{x}))=0,y_0=y(\mathbf{x}_0)$
2. $y(\mathbf{x})$ 在 $B(\mathbf{x_0},\rho)$ 上具有*连续偏导数*

$$
y_{x_i}(\mathbf{x})=-\frac{F_{x_i}\left(\mathbf{x},y(\mathbf{x})\right)}{F_{y}\left(\mathbf{x},y(\mathbf{x})\right)}
$$

> 若 $F(\mathbf{x},y)$ 具有高阶连续偏导数, 则隐函数也具有相应的高阶连续偏导数

![多元向量值隐函数定理](https://cdn.duanyll.com/img/20230209164424.png)

> 二阶, 三阶的情况, 常用算法是 $F=0,G=0$ 对 $x$ 求导得 $F_x=0,G_x=0$, 解得 $u_x,v_x$, 再对 $y$ 求导解 $u_y,v_y$

General cases:

$$
\begin{cases}
    F_1(x_1,x_2,\cdots,x_d,y_1,y_2,\cdots,y_m)=0\\
    F_2(x_1,x_2,\cdots,x_d,y_1,y_2,\cdots,y_m)=0\\
    \cdots\\
    F_m(x_1,x_2,\cdots,x_d,y_1,y_2,\cdots,y_m)=0\\
\end{cases}\\
\mathbf{F}(\mathbf{x},\mathbf{y})=\mathbf{0},\mathbf{F}:\R^{d+m}\to\R^m,\mathbf{x}\in\R^d,\mathbf{y}\in\R^m
$$

1. 存在点 $\mathbf{p}=(a_1,\cdots a_d,b_1,\cdots,b_m)$ 使 $F_1,\cdots F_m$ 一阶偏导数存在且连续
2. $\mathbf{F}(\mathbf{p})=0$
3. $\det\frac{\partial\mathbf{F}}{\partial\mathbf{y}}|_{\mathbf{p}}\neq0$

则可确定隐函数 $\mathbf{y}(\mathbf{x}):\R^d\to\R^m$, 一阶导数 Jacobi 矩阵 ($m\times d$) 满足

$$
\frac{\partial\mathbf{y}}{\partial\mathbf{x}}=-\left(\frac{\partial\mathbf{F}}{\partial\mathbf{y}}\right)^{-1}\frac{\partial\mathbf{F}}{\partial\mathbf{x}}
$$

![逆映射定理](https://cdn.duanyll.com/img/20230209170544.png)