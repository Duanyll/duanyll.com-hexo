---
title: 理论力学速通 - 刚体力学
layout: wiki
wiki: notes-clamacha
order: 503
---

- 刚体: 没有形变的物体
  - 物体中任意两点距离永不改变
  - 计算能力, 动量, 角动量不考虑内力, 一切内力可忽略
- 自由度: 3 平动 + 3 转动
- 刚体上二力平衡: 等大反向共线
  - 滑移矢量: 刚体上的力可沿力线任意滑动
  - 若要把刚体上的力移到任意点, 需要加上新的力偶, 力偶矩等于移动前的力对指定点的力矩
    - 力偶: 一对等大, 反向, 不共线的力, 不影响平动
    - 力偶对以任意点为参考点, 力偶矩均为 $\vec{r_{\textrm{相}}}\times\vec{F}$
- 刚体上的力可以沿任意点简化
  - 主矢: $\sum_{i}{\vec{F}}_{i}$
  - 主矩: $\sum_{i}{\vec{r}}_{i}\times{\vec{F}}_{i}$
- 刚体平衡条件: 主矢主矩均为零
  - 汇交力系: 若所有力过同一点, 则主矩为零, 只用计算主矢
  - 平面力系: 在 $xOy$ 平面上, 则只用求 $F_x,F_y,M_z$
  - 三力平衡: 要么三力共点, 要么平行
    - 以下条件等价
      - 三力能被一力代替
      - 存在一点主矩为零
      - 任意一点主矢垂直于主矩
  - 刚体平衡问题可能是超静定问题 (未知数多于方程数), 此时无唯一解, 刚体模型不适用, 必须考虑物体的形变
- 刚体的运动
  - 平动
  - 定轴转动
  - 定点转动
  - 平面平行运动 (滚动): 任意一点始终在平行于固定平面的平面内转动
  - 一般运动

## 转动的描述

- 角位移: 大小为绕轴转过的角度, 方向与转过角度成右手关系
  - $\mathrm{d}{\vec{\theta}}=\mathrm{d}\theta{\hat{n}}$
  - $\mathrm{d}{\vec{r}}=\mathrm{d}{\vec{\theta}}\times{\vec{r}}$ 原点在轴上
  - 不满足平行四边形法则, 不是矢量
  - ![无限小角位移是矢量](https://cdn.duanyll.com/img/20230218220512.png)
- 角速度矢量 ${\vec{\omega}}={\frac{\mathrm{d}\vec{\theta}}{\mathrm{d}t}}$
  - $\vec{v}=\vec{\omega}\times\vec{r}$ 原点在轴上
  - 对所有参考点, 角速度都是相同的
- 角加速度矢量 ${\vec{\beta}}={\frac{\mathrm{d}{\vec{\omega}}}{\mathrm{d}t}}$
  - 对所有参考点, 角加速度都是相同的

### 欧拉角

![](https://cdn.duanyll.com/img/2022-12-13-21-46-30.png)

按顺序, 依次旋转:

1. 进动角 $\varphi$: 绕 $z$ 轴, $x'$ 轴转向 $y$ 轴
2. 章动角 $\theta$: 绕 $y'$ 轴, $z'$ 轴转向 $x$ 轴
3. 自转角 $\psi$: 绕 $z'$ 轴, $y'$ 轴转向 $z$ 轴

<p style="color: blue">动系中</p>

$$
\begin{cases}
    \omega_{x^{\prime}}=\dot{\theta}\sin\psi-\dot{\varphi}\sin\theta\cos\psi\\
    \omega_{y^{\prime}}=\dot{\theta}\cos\psi+\dot{\varphi}\sin\theta\sin\psi\\
    \omega_{z^{\prime}}=\dot{\varphi}\cos\theta+\dot{\psi}
\end{cases}
$$

静系中

$$
\begin{cases}
    \omega_{x}=\dot{\psi}\sin\theta\cos\varphi-\dot{\theta}\sin\varphi\\
    \omega_{y}=\dot{\psi}\sin\theta\sin\varphi+\dot{\theta}\cos\varphi\\
    \omega_{z}=\dot{\psi}\cos\theta+\dot{\varphi}
\end{cases}
$$

## 定点转动

绕质心转动方程

$$
\sum\vec{M}^\prime=\frac{\mathrm{d}\vec{J}^\prime}{\mathrm{d}t}
$$

绕固定轴的转动惯量 (考虑每个点到轴的距离)

$$
I=\sum m_{i}r_{i}^{2}\sin\theta_{i}^{2}=\sum m_{i}\rho_{i}^{2}
$$

![欧拉角](https://cdn.duanyll.com/img/20230223214652.png)

希望能计算绕任意固定轴 (方向角 $(\alpha,\beta,\gamma )$) 的转动惯量

$$
I=\begin{pmatrix}
    \cos\alpha & \cos\beta & \cos\gamma
\end{pmatrix}
\begin{pmatrix}
    I_{xx}  & -I_{xy} & -I_{xz} \\
    -I_{yx} & I_{yy}  & -I_{yz} \\
    -I_{zx} & -I_{zy} & I_{zz}  \\
\end{pmatrix}
\begin{pmatrix}
    \cos\alpha \\
    \cos\beta  \\
    \cos\gamma
\end{pmatrix}
$$

$$
I_{xx}\triangleq\int(y^2+z^2)\mathrm{d}m
$$

$$
I_{xy}\triangleq\int xy\mathrm{d}m
$$

存在一个方向, 可以相似对角化惯量张量

- xOy 平面对称, $I_{xz}=I_{yz}=0$
- 绕 x 轴中心对称 $I_{xy}=I_{xz}=0$

角动量

$$
\begin{pmatrix}
  J_x\\
  J_y\\
  J_z
\end{pmatrix}=\begin{pmatrix}
    I_{xx}  & -I_{xy} & -I_{xz} \\
    -I_{yx} & I_{yy}  & -I_{yz} \\
    -I_{zx} & -I_{zy} & I_{zz}  \\
\end{pmatrix}
\begin{pmatrix}
  \omega_x\\
  \omega_y\\
  \omega_z
\end{pmatrix}
$$

转动动能

$$
E_{k}={\frac{1}{2}}{\vec{\omega}}\cdot{\vec{J}}
$$

静系下定点转动动力学方程

$$
\begin{aligned}
    M_{x}&=\frac{\mathrm{d}}{\mathrm{d}t}\left(I_{x x}\omega_{x}-I_{x y}\omega_{y}-I_{x z}\omega_{z}\right)\\
    {M}_{y}&=\frac{\mathrm{d}}{\mathrm{d}t}\left(-I_{y x}\omega_{x}+I_{y y}\omega_{y}-I_{y z}\omega_{z}\right)\\
    M_{z}&=\frac{\mathrm{d}}{\mathrm{d}t}\left(-I_{x z}\omega_{x}-I_{y z}\omega_{y}+I_{z z}\omega_{z}\right)
\end{aligned}
$$

欧拉动力学方程 (动系中)

$$
\overrightarrow{M}=\frac{\mathrm{d}\overrightarrow{J}}{\mathrm{d}t}+\overrightarrow{\omega}\times\overrightarrow{J}^{\prime}
$$

## 定轴转动

绕 z 轴转动, 角动量定理

$$
\begin{aligned}
    M_{x}&=-\frac{\mathrm{d}}{\mathrm{d}t}(I_{x z}\omega_{z})=-I_{x z}\dot{\omega}_{z}+I_{y z}\omega_{z}^{2}\\
    M_{y}&=-{\frac{\mathrm{d}}{\mathrm{d}t}}\left(I_{y z}\omega_{z}\right)=-I_{y z}\dot{\omega}_{z}-I_{x z}\omega_{z}^{2}\\
    M_{z}&={\frac{\mathrm{d}}{\mathrm{d}t}}\left(I_{z z}\omega_{z}\right)=I_{z z}\omega_{z}
\end{aligned}
$$

$xOy$ 平面物体对于面上任意一点, 惯量张量都具有如下形式

$$
\begin{pmatrix}
  A & C & 0 \\
  C & B & 0 \\
  0 & 0 & A+B
\end{pmatrix}
$$

垂直轴定理: xOy 平面上的平面物体绕 z 轴的转动惯量等于绕 x 和 y 轴的转动惯量之和.

## 平面平行运动

刚体上任意点的速度: 基点的速度与相对基点的转动速度的矢量和

$$
\vec{v}\,=\,\vec{v}_{O}\,+\,\vec{\omega}\times\,\vec{r'}
$$

> 这个公式中, 基点的选取可以是任意的

刚体上任意点加速度: 基点加速度和相对于基点转动加速度的矢量和

$$
\vec{a}\,=\,\vec{a}_{O}\,+\,\frac{\mathrm{d}\vec{\omega}}{\mathrm{d}t}\times\vec{r}^{\prime}\,+\,(\vec{\omega}\cdot\vec{r}^{\prime})\;\vec{\omega}-\omega^{2}\,\vec{r}^{\prime}
$$

转动瞬心: 某一时刻平面上的某一点的速度为零

- 刚体上任选两点，若它们的速度方向不平行，则通过两点作速度的垂线，交点即为转动瞬心
- 如果两点的速度的垂线相互平行，且不重合，则可以认为它们的点在无限远处，即无限远处为瞬心。此时刚体作平动
- 如果两点的速度的垂线重合，且大小相等，方向相同，则无限远为瞬心。此时刚体作平动
- 如果两点的速度的垂线重合，且大小不等，此时作两速度矢量的末端的连线，它与垂线的交点即为瞬心

> 若刚体上三个质点的速度恒相同, 则刚体只能做平动
