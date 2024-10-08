---
title: 最优化算法速通 - 凸集和凸函数
layout: wiki
wiki: notes-optim
order: 102
---

## 几何概念

- 线段: $\{\alpha x+(1-\alpha)y:\alpha\in[0,1]\}$
- 超平面:
  - $\{x\in\mathbb{R}^{n}:u^{\top}x=v\}$, $u$ 是法向量, $v$ 是截距
  - $\langle{\boldsymbol{u} },{\boldsymbol{x} }-{\boldsymbol{a} }\rangle=0$, $\boldsymbol{a}$ 是平面上一点
- 半空间
  - 正半空间 $H_{+}=\{x\in\mathbb{R}^{n}:u^{\top}x\geqslant v\}$
  - 负半空间 $H_{-}=\{x\in\mathbb{R}^{n}:u^{\top}x\leqslant v\}$
- 线性簇: 线性方程组的解集 $\{\alpha\in\mathbb{R}^{n}:A x=b\}$

## 凸集

- 定义: 任意两点间的线段 (凸组合) 位于集合内
- 空集, 单点集, 线性簇是凸集
- 半正定矩阵集是凸集
- 保凸运算
  - 数乘, Minkowoski 和(任意两个不同集的向量相加得到新集合), 交集
  - 仿射变换
- 极点: 不能表达成集合内两个点连线段的"内点"
- 邻域, 内点, 开集, 边界, 闭集, 紧集
- 极值原理: 连续函数在紧集上一定能取到闭集

### 多面体

![](https://img.duanyll.com/img/2022-12-03-19-57-30.png)

- 支撑超平面: 经过凸集的边界点, 使凸集完全位于一个半空间内
- 多面体: 可表示为有限个半空间的交集
- 非空有界的多面体: $Ax\leq b, Cx=d$

## 序列与极限

- 矩阵序列 $\{A_k\}$ 收敛于 $A$: $\operatorname*{lim}_{k\to\infty}\|A-A_{k}\|=0$
- 矩阵收敛于零矩阵 $\operatorname*{lim}_{k\to\infty}A^{*}=O \iff |\lambda_{i}\left(A\right)|\ <1\left(\ i=1,\ \cdots,\ n\right)$ 矩阵的谱半径小于 1
- 矩阵的幂级数收敛 $I_{n}+A+A^{2}+\cdots+A^{k}+\cdots = (I_{n}-A)^{-1}\iff \operatorname*{lim}_{x\to A}A^{*}=O$ 矩阵收敛于零矩阵
- 矩阵值函数 $A:\;{\mathbb{R} }^{r}\longrightarrow{\mathbb{R} }^{n\times n}$ 在某点连续且函数值可逆, 则存在邻域使得 $A\left(\xi\right)^{-1}$ 存在且连续

## 可微性

仿射函数: 存在线性函数 $\mathcal{L}:\mathbb{R}^{n}\to\mathbb{R}^{n}$ 和向量 $y$, 使得 ${\mathcal{A} }(x)={\mathcal{L} }(x)+y$

可微性: 理解为对函数仿射逼近 (一阶 Taylor 逼近)

$$
\mathcal{A}(x)=\mathcal{L}(x-x_{0})+\mathcal{f}(x_{0})
$$

$$
\operatorname*{lim}_{x\rightarrow x_{0},x\in\Omega}\frac{\left\|\mathcal{f}(x)-A(x)\right\|}{\left\|x-x_{0}\right\|}=0
$$

- 一元函数时, 退化为一元函数的导数
- 多元函数时, 退化为多元函数的梯度

$$
\nabla f(x)={\left[\begin{array}{l}{ {\frac{\partial f}{\partial x_{1} } }(x)}\\ {\vdots}\\ { {\frac{\partial f}{\partial x_{n} } }(x)}\end{array}\right]}=D f(x)^{\intercal}
$$

- $\nabla f(x)$ 列向量
- $Df(x)$ 行向量

向量值函数 $f\colon\mathbb{R}^{n}\to\mathbb{R}^{m}$ 的导数 (Jacobi 矩阵 $m\times n$):

$$
\left[\frac{\partial f}{\partial x_{1} }(x_{0})\ \cdots\ \frac{\partial f}{\partial x_{n} }(x_{0})\right]=\left[\begin{array}{c c c}{ {\frac{\partial f_{1} }{\partial x_{1} }(x_{0})} }&{ {\cdots} }&{ {\frac{\partial f_{1} }{\partial x_{n} }(x_{0})} }\\ { {\vdots} }& &{ {\vdots} }\\ { {\frac{\partial f_m}{\partial x_{1} }(x_{0})} }&{ {\cdots} }&\frac{\partial f_{m} }{\partial x_{n} }(x_{0})\end{array}\right]
$$

纵轴(第一维)是因变量, 横轴(第二维)是自变量

Hessian 矩阵: 梯度的 Jacobi 矩阵, 二阶导

![](https://img.duanyll.com/img/2022-12-03-20-28-07.png)

链式法则: $h(t)=g(f(t))$

![](https://img.duanyll.com/img/2022-12-03-20-35-13.png)

注意把向量的形状凑对, 求复合函数的 Jacobi, 只需外层 Jacobi 乘内层 Jacobi

$f: m \rarr n, g:n\rarr p, f(g): m \rarr p, (p \times n) (n\times m) \rarr (p\times m)$

方向导数: 单位方向向量点乘梯度 $d^{\top}\nabla f(x)$

## 水平集

- 单值函数在水平 $c$ 上的水平集(等值线): $S=\{x:f(x)=c\}$
  - 等值线不相交
  - 等值线疏密程度刻画函数变化快慢
  - **等值线与梯度垂直**
  - 等值线在极值点附近近似为**椭圆**

![](https://img.duanyll.com/img/2022-12-03-20-49-57.png)

## Taylor 展开

可微函数 $f$ 在 $x_0$ 的切线超平面:

$$
z-z_{0}=D f(x_{0})(x-x_{0})=(x-x_{0})^{\mathsf{T} }\nabla f(x_{0})
$$

- 同阶无穷小 $f({\boldsymbol{x} })=O(g({\boldsymbol{x} }))$: $\frac{\|f(\alpha)\|}{\|g(\alpha)\|}$ 在原点的某邻域内有界
- 高阶无穷小 $f({\boldsymbol{x} })=o\left({\mathcal{g} }({\boldsymbol{x} })\right)$: $\operatorname*{lim}_{x\to0,\kappa\in\Omega}\frac{\|f(\alpha)\|}{\|g(\alpha)\|}=0$

多元数量值函数的二阶 Taylor 展开 (假设二阶可微)

$$
f(x)=f(x_{0})+{\frac{1}{1!} }D f(x_{0})(x-x_{0})+{\frac{1}{2!} }(x-x_{0})^{\mathsf{T} }D^{2}f(x_{0})(x-x_{0})+o(\|x-x_{0}\|^{2})
$$

余项也可以是 $O(\|x-\alpha_{0}\|^{3})$. 更高阶的 Taylor 展开很难写出, 因为导数是高维张量.

中值定理 (类似 Lagrange 中值)

![](https://img.duanyll.com/img/2022-12-03-21-04-26.png)

![](https://img.duanyll.com/img/2022-12-03-21-05-57.png)

## 极小点

- 局部极小点: 去心邻域内 $f(x)\geqslant f(x^{*})$
- 全局极小点: $f(x^*)=\min_{x\in\Omega}f(x), x^*=\arg\min_{x\in\Omega}f(x)$
- 严格局部极小点: 去心邻域内 $f(x)> f(x^{*})$
- 严格全集极小点
- 可行方向 $d$: $\exist \alpha_0>0,\forall\alpha\in[0,\alpha_0],x+\alpha d\in \Omega$

## 最优性条件

$x^*$ 是局部极小点, $d$ 是任意可行方向

- 一阶必要条件: $d^{\mathsf{T} }\nabla f(x^{*})\geq0$
  - 若 $x^*$ 是内点, 则 $\nabla f(x^{*})=0$
- 二阶必要条件: $d^{\top}\nabla f(x^{*})\;=\;0$ 且 $d^{\top}F(x^{*})d\geq0$
  - 若 $x^*$ 是内点, 则 $\nabla f(x^{*})=0$ 且 Hessian 矩阵半正定
- 二阶充分条件: $x^*$ 是内点, 则 $\nabla f(x^{*})=0$ 且 Hessian 矩阵正定
