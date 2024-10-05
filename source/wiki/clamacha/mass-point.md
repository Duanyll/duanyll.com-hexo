---
title: 理论力学速通 - 质点力学
layout: wiki
wiki: notes-clamacha
order: 501
---

## 坐标系

### 直角坐标

$$
{\vec{v}}={\frac{\mathrm{d}x}{\mathrm{d}t}}{\hat{i}}+{\frac{\mathrm{d}y}{\mathrm{d}t}}{\hat{j}}+{\frac{\mathrm{d}z}{\mathrm{d}t}}{\hat{k}}
$$

$$
\vec{a}=\frac{\mathrm{d}v_{x}}{\mathrm{d}t}\hat{i}+\frac{\mathrm{d}v_{y}}{\mathrm{d}t}\hat{j}+\frac{\mathrm{d}v_{z}}{\mathrm{d}t}\hat{k}
$$

### 自然坐标

![](https://img.duanyll.com/img/2022-12-13-10-19-43.png)

$$
\begin{cases}
    {\frac{\mathrm{d}\vec{\tau}}{\mathrm{d}t}}={\frac{\mathrm{d}\theta}{\mathrm{d}t}}\hat{n}\\
    {\frac{\mathrm{d}{\vec{n}}}{\mathrm{d}t}}=-{\frac{\mathrm{d}\theta}{\mathrm{d}t}}{\hat{r}}
\end{cases}
$$

$$
\vec{v}=v\hat\tau
$$

$$
\vec{a}={\frac{\mathrm{d}v}{\mathrm{d}t}}{\hat{\mathbf{r}}}+v{\frac{\mathrm{d}\theta}{\mathrm{d}t}}{\hat{\boldsymbol{n}}}={\frac{\mathrm{d}{\boldsymbol{v}}}{\mathrm{d}t}}{\hat{\boldsymbol{r}}}+{\frac{v^{2}}{\rho}}{\hat{\boldsymbol{n}}}
$$

曲率半径:

$$
\rho={\frac{\mathrm{d}s}{\mathrm{d}\theta}}=\frac{\left[1+(y^{\prime})^{2}\right]^{3/2}}{\left[y^{\prime\prime}\right]}
$$

> 自然坐标下
>
> $$
> W=\int_{r_1}^{r_2}F_\tau\d s
> $$
>
> 适合计算摩擦力

### 极坐标

![](https://img.duanyll.com/img/2022-12-13-10-28-31.png)

$$
\begin{cases}
{\frac{\mathrm{d}\hat{r}}{\mathrm{d}t}}={\frac{\mathrm{d}\theta}{\mathrm{d}t}}{\hat{\theta}}\\
{\frac{\mathrm{d}\theta}{\mathrm{d}t}}=-{\frac{\mathrm{d}\theta}{\mathrm{d}t}}{\hat{r}}
\end{cases}
$$

位矢

$$
{\vec{r}}=r{\hat{r}}
$$

速度

$$
{\vec{v}}={\frac{\mathrm{d}{\vec{r}}}{\mathrm{d}t}}={\frac{\mathrm{d}r}{\mathrm{d}t}}{\hat{r}}+r{\frac{\mathrm{d}\theta}{\mathrm{d}t}}{\hat{\boldsymbol{\theta}}}
$$

加速度

$$
{\vec{a}}={\frac{\mathrm{d}{\vec{v}}}{\mathrm{d}t}}=\left[\underbrace{\frac{\mathrm{d}^{2}r}{\mathrm{d}t^{2}}}_{\textrm{径向速度改变}}-\underbrace{r\left({\frac{\mathrm{d}\theta}{\mathrm{d}t}}\right)^{2}}_\textrm{向心加速度}\right]{\hat{r}}+\left[\underbrace{r{\frac{\mathrm{d}^{2}\theta}{\mathrm{d}t^{2}}}}_\textrm{角速度改变}+\underbrace{2{\frac{\mathrm{d}r}{\mathrm{d}t}}{\frac{\mathrm{d}\theta}{\mathrm{d}t}}}_\textrm{科里奥利力}\right]{\hat{\theta}}
$$

### 柱坐标系

![](https://img.duanyll.com/img/2022-12-13-11-18-38.png)

在极坐标的基础上加了一维直角的 z 轴

$$
\begin{cases}
    \dot{\hat{\rho}}={\dot{\theta}}{\hat{\theta}}\\
    \dot{\hat{\theta}}=-{\dot{\theta}}{\hat{\rho}}\\
    \dot{\hat{k}}=0
\end{cases}
$$

$$
{\vec{r}}=\rho{\hat{\rho}}+z{\hat{k}}
$$

$$
\vec{v}=\dot{\rho}\hat{\rho}+\rho\dot{\theta}\hat{\theta}+\dot{z}\hat{k}
$$

$$
\vec{a}=\left(\ddot{\rho}-\rho\dot{\theta}^{2}\right)\hat{\rho}+\left(\rho\ddot{\theta}+2\dot{\rho}\dot{\theta}\right)\hat{\theta}+\dot{z}\hat{k}
$$

### 球坐标系

复杂, 很少使用

![](https://img.duanyll.com/img/2022-12-13-11-26-08.png)

$$
\begin{cases}
    \dot{\hat{r}}=\dot{\theta}\hat{\theta}+\sin\theta\dot{\phi}\hat{\phi}\\
    \dot{\hat\theta}=-\dot{\theta}\hat{r}+\cos\theta\dot{\phi}\hat{\phi}\\
    \dot{\hat{\phi}}=-\dot{\phi}\sin\theta\hat{r}-\dot{\phi}\cos\theta\hat{\theta}
\end{cases}
$$

$$
{\vec{r}}=r{\hat{r}}
$$

$$
\vec{v}=\dot{r}\hat{r}+r\dot{\theta}\hat{\theta}+r\sin{\theta}\dot{\phi}\hat{\phi}
$$

### 三维自然坐标

少见

![](https://img.duanyll.com/img/20230218220023.png)

## 功和能

动能

$$
E_{k}={\frac{1}{2}}m v^{2}
$$

功

$$
W=\int_{r_{1}}^{r_{2}}{\vec{F}}\cdot\mathrm{d}{\vec{r}}
$$

功率

$$
P={\frac{\mathrm{d}W}{\mathrm{d}t}}={\vec{F}}\cdot{\vec{v}}
$$

保守力三种定义

1. 力做的功只与初末位置有关, 与经过的路径无关
2. 延任意闭合路径做功为零 $\oint{\vec{F}}\cdot\mathrm{d}{\vec{r}}\equiv0$
3. 旋度恒为零 $\nabla\times{\vec{F}}\equiv0$

$$
\nabla\times\vec{F}=\left|
    \begin{matrix}
        \hat{i} & \hat{j} & \hat{k} \\
        \frac{\p}{\p x} & \frac{\p}{\p y} & \frac{\p}{\p z} \\
        F_x & F_y & F_z
    \end{matrix}
\right|
$$

保守力做总共等于系统势能减小

$$
\int_{r_{1}}^{r_{2}}{\vec{F}}\cdot\mathrm{d}{\vec{r}}=V_{1}-V_{2}
$$

$$
\mathrm{d}V=-{\vec{F}}\cdot\mathrm{d}{\vec{r}}
$$

力与势能的关系

$$
{\vec{F}}=-\nabla V
$$

动能定理

$$
W={\frac{1}{2}}m v_{2}^{2}-{\frac{1}{2}}m v_{1}^{2}
$$

$$
\vec{F}\cdot\mathrm{d}\vec{r}=\mathrm{d}\left(\frac{1}{2}mv^{2}\right)
$$

> 质点在 $x$ 轴上运动, 所受合力是保守力, 在势能极小点附近的震动的简谐振动
>
> 简谐振动的平均动能等于平均势能

## 角动量

- 质点相对定点的角动量: ${\vec{J}}={\vec{r}}\times m{\vec{v}}$
- 质点相对定点的力矩: ${\vec{M}}={\vec{r}}\times{\vec{F}}$
- 角动量定理: ${\vec{M}}={\frac{\mathrm{d}{\vec{J}}}{\mathrm{d}t}}$
- 角动量守恒定律: $\vec{M}\equiv0\rArr\vec{J}$ 守恒

## 有心力

$$
{\vec{F}}=f(r){\hat{r}}
$$

- 有心力作用下质点必做*平面运动*
- 有心力是保守力, _机械能守恒_
- 有心力力矩为零, _角动量守恒_

极坐标下**运动微分方程**

$$
\begin{cases}
    m\left({\ddot{r}}-{\dot{\theta}}^{2}r\right)=f(r)\\
    m\left(r{\ddot{\theta}}+2{\dot{r}}{\dot{\theta}}\right)=0
\end{cases}
$$

与**守恒方程**等价

$$
\begin{cases}
    \frac{1}{2}m\left(\dot{r}^{2}+r^{2}\dot{\theta}^{2}\right)+V(r)=E\\
    r^{2}m{\dot{\theta}}=J
\end{cases}
$$

解方程得到

$$
{\frac{J}{m r^{2}}}{\frac{\mathrm{d}r}{\mathrm{d}\theta}}={\sqrt{\frac{2E}{m}-{\frac{J^{2}}{m^{2}r^{2}}}-{\frac{2V(r)}{m}}}}
$$

积分可得到极坐标系下运动轨迹 $r=r(\theta)$. 代入万有引力势 $V(r)=-{\frac{G m M}{r}}$ 积分得到

$$
r=\frac{\frac{J^2}{GMm^2}}{1-\sqrt{1+\frac{2EJ^2}{G^2M^2m^3}}\sin(\theta-\theta_0)}
$$

圆锥曲线离心率 $e=\sqrt{1+\frac{2EJ^2}{G^2M^2m^3}}$

**比奈公式**, 令 $u=\frac{1}{r},h=\frac{J}{m}\textrm{(constant)}$

$$
h^{2}u^{2}\left(\frac{\mathrm{d}^{2}u}{\mathrm{d}\theta^{2}}+u\right)=-\frac{f}{m}
$$

可用来解运动轨迹
