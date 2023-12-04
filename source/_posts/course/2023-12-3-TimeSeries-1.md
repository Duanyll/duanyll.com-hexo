---
title: 时间序列分析作业
tags: 
    - 时间序列
author: duanyll
---

## Problem 1

![](https://cdn.duanyll.com/img/20231203201133.png)

$$
(1 - \frac{1}{2}B+\frac{1}{25}B^2)X_t=(1+\frac{1}{4}B)\varepsilon_t
$$

首先计算自协方差函数. 记

$$
\begin{aligned}
    \Phi(B)&=1-\frac{1}{2}B+\frac{1}{25}B^2\\
    \Theta(B)&=1+\frac{1}{4}B
\end{aligned}
$$

比较系数 $\Phi(B)\Psi(B)=\Theta(B)$

$$
(1 - \frac{1}{2}B+\frac{1}{25}B^2)(\psi_0+\psi_1B+\psi_2B^2+\cdots)=1+\frac{1}{4}B
$$

得到

$$
\begin{cases}
    \psi_0=1\\
    \psi_1-\frac{1}{2}\psi_0=\frac{1}{4}
\end{cases}\implies\begin{cases}
    \psi_0=1\\
    \psi_1=\frac{3}{4}
\end{cases}
$$

当 $k\geq 2$ 时, 自协方差函数满足

$$
\gamma(k)-\frac{1}{2}\gamma(k-1)+\frac{1}{25}\gamma(k-2)=0
$$

则 $\Phi(z)=0$ 有两个一重根 $z_1=\frac{1}{10},z_2=\frac{2}{5}$. 通解

$$
\gamma(n)=\frac{2^n}{5^n}\beta_1+\frac{1}{10^n}\beta_2
$$

满足边界条件

$$
\begin{aligned}
    \gamma(0)-\frac{1}{2}\gamma(1)+\frac{1}{25}\gamma(2)&=\sigma_\varepsilon^2(\theta_0\psi_0+\theta_1\psi_1)=\frac{19}{16}\\
    \gamma(1)-\frac{1}{2}\gamma(0)+\frac{1}{25}\gamma(1)&=\sigma_\varepsilon^2\theta_1\psi_0=\frac{1}{4}
\end{aligned}
$$

解得

$$
\gamma(n)=\frac{2^{-n-5} 5^{3-n} \left(4719\ 4^n-2009\right)}{6237}
$$

直接求解 Yule-Walker 方程组

$$
\gamma(0)\phi_{11}=\gamma(1)
$$

$$
\begin{pmatrix}
    \gamma(0) & \gamma(1) \\
    \gamma(1) & \gamma(0)
\end{pmatrix}\begin{pmatrix}
    \phi_{21} \\
    \phi_{22}
\end{pmatrix} = \begin{pmatrix}
    \gamma(1) \\
    \gamma(2)
\end{pmatrix}
$$

$$
\begin{pmatrix}
    \gamma(0) & \gamma(1) & \gamma(2) \\
    \gamma(1) & \gamma(0) & \gamma(1) \\
    \gamma(2) & \gamma(1) & \gamma(0)
\end{pmatrix}\begin{pmatrix}
    \phi_{31} \\
    \phi_{32} \\
    \phi_{33}
\end{pmatrix} = \begin{pmatrix}
    \gamma(1) \\
    \gamma(2) \\
    \gamma(3)
\end{pmatrix}
$$

解得

$$
\begin{aligned}
    \phi_{11}&=\frac{16867}{27100} \\
    \phi_{21}&=\frac{320473}{432818}, &\phi_{22}&=-\frac{41041}{216409}\\
    \phi_{31}&=\frac{5202097}{6941650},&\phi_{32}&=-\frac{41041}{182675},&\phi_{33}=\frac{164164}{3470825}
\end{aligned}
$$

## Problem 2

![](https://cdn.duanyll.com/img/20231203223824.png)

```mathematica
model = ARMAProcess[{0.1, 0.12}, {-0.6, 0.7}, 1];
SeedRandom[42];
data = RandomFunction[model, {1001, 2000}]
ListPlot[data, Filling -> Axis]
```

![动态数据散布图](https://cdn.duanyll.com/img/20231203224235.png)

计算自协方差值

```mathematica
gamma = CovarianceFunction[data, {10}];
Normal[gamma]
ListPlot[{gamma, CovarianceFunction[model, {10}]}, Filling -> Axis, 
 PlotLegends -> {"模拟数据", "理论"}]
```

```mathematica
{{0, 2.04243}, {1, -1.01932}, {2, 0.918475}, {3, -0.0514594}, {4, 
  0.0929306}, {5, -0.0248783}, {6, 0.0382432}, {7, -0.124687}, {8, 
  0.0575548}, {9, -0.129289}, {10, 0.0371609}}
```

![自相关图](https://cdn.duanyll.com/img/20231203225119.png)

计算偏相关系数

```mathematica
phi = PartialCorrelationFunction[data, {10}];
Normal[phi]
ListPlot[{phi, PartialCorrelationFunction[model, {10}]}, 
 Filling -> Axis, PlotLegends -> {"模拟数据", "理论"}]
```

```mathematica
{{1, -0.49907}, {2, 0.267171}, {3, 0.390937}, {4, 
  0.0750153}, {5, -0.228319}, {6, -0.165794}, {7, -0.0293216}, {8, 
  0.095243}, {9, 0.0337099}, {10, -0.0334262}}
```

![偏相关图](https://cdn.duanyll.com/img/20231203225512.png)

## Problem 3

![](https://cdn.duanyll.com/img/20231203225645.png)

```mathematica
model = ARProcess[{1.4833, -0.8483, 0.2350, -0.0317, 0.0017}, 1];
SeedRandom[42];
data = RandomFunction[model, {501, 1000}];
ListPlot[data, Filling -> Axis]
```

![数据散布图](https://cdn.duanyll.com/img/20231203230556.png)

估计自回归系数

```mathematica
eproc = EstimatedProcess[data, 
  ARProcess[{\[Phi]1, \[Phi]2, \[Phi]3, \[Phi]4, \[Phi]5}, \[Sigma]]]
```

```mathematica
ARProcess[{1.45937, -0.847174, 0.238211, 
  0.00292631, -0.0436659}, 1.0762]
```

近似认为 $m>p$ 时,

$$
\hat{\phi}_{mm}\sim N(1,\frac{1}{N})
$$

取出错概率为, 则自回归系数的置信区间为 

```mathematica
Quantile[NormalDistribution[0, Sqrt[1/N]], 1 - \[Alpha]/2]
```

$$
-\sqrt{2} \sqrt{\frac{1}{N}} \text{erfc}^{-1}\left(2 \left(1-\frac{\alpha
   }{2}\right)\right)\text{ if }0\leq \alpha \leq 2
$$

若取 $N=500,\alpha=0.05$, 可得置信区间为

$$
(-0.0876523,0.0876523)
$$

根据此判据认为估计的 AR 模型 $p$ 应取 3. 但原模型中本身 $\phi_4,\phi_5$ 较小, 为了得到更可信而准确的结果, 应加大模拟时长或模拟更多路径的数据.

## Problem 4

![](https://cdn.duanyll.com/img/20231203231430.png)

```mathematica
model = MAProcess[{-0.6, 0.7}, 1];
SeedRandom[42];
data = RandomFunction[model, {1001, 2000}];
ListPlot[data, Filling -> Axis]
```

![数据散布图](https://cdn.duanyll.com/img/20231204132432.png)

### 矩估计

二阶 MA 模型, 认为

$$
\begin{aligned}
    \hat{\gamma}(0)&=\hat{\sigma}_\varepsilon^2(1+\theta_1^2+\theta_2^2)\\
    \hat{\gamma}(1)&=\hat{\sigma}_\varepsilon^2(\theta_1+\theta_1\theta_2)\\
    \hat{\gamma}(2)&=\hat{\sigma}_\varepsilon^2\theta_2
\end{aligned}
$$

数值求解方程组

```mathematica
\[Gamma] = CovarianceFunction[data, {2}];
sys = {
   \[Gamma][0] == \[Sigma]^2 (1 + \[Theta]1^2 + \[Theta]2^2),
   \[Gamma][1] == \[Sigma]^2 (\[Theta]1 + \[Theta]1 \[Theta]2),
   \[Gamma][2] == \[Sigma]^2 \[Theta]2,
   \[Sigma] >= 0
   };
NSolve[sys, {\[Sigma], \[Theta]1, \[Theta]2}, Reals]
```

$$
\{\{\sigma \to 0.976109,\text{$\theta $1}\to -0.676911,\text{$\theta $2}\to 0.834156\},\{\sigma
   \to 0.814228,\text{$\theta $1}\to -0.811492,\text{$\theta $2}\to 1.19882\}\}
$$

得到的两组解都满足弱平稳条件, 其中第一组解更接近理论模型.

### 逆相关函数

首先利用 Y-W 方程估计二阶 AR 模型参数

```mathematica
\[Gamma] = CovarianceFunction[data, {2}];
\[Phi] = 
 LinearSolve[{{\[Gamma][0], \[Gamma][1]}, {\[Gamma][1], \[Gamma][
     0]}}, {\[Gamma][1], \[Gamma][2]}]
\[Sigma]2 = \[Gamma][0] - \[Phi] . {\[Gamma][1], \[Gamma][2]}
```

$$
\hat\phi_1=-0.528892,\hat\phi_2=0.0824057,\hat\sigma_p^2=1.36119
$$

然后计算逆相关函数

```mathematica
\[Gamma]0 = 1/\[Sigma]2 (1 + \[Phi][[1]]^2 + \[Phi][[2]]^2)
\[Gamma]1 = 1/\[Sigma]2 (-\[Phi][[1]] + \[Phi][[1]] \[Phi][[2]])
\[Gamma]2 = -(1/\[Sigma]2) \[Phi][[2]]
```

$$
\hat{\gamma}_y(0)=0.945145,\hat{\gamma}_y(1)=0.356534,\hat{\gamma}_y(2)=-0.0605396
$$

求解 Y-W 方程得二阶 MA 模型参数

```mathematica
\[Theta] = 
 LinearSolve[{{\[Gamma]0, \[Gamma]1}, {\[Gamma]1, \[Gamma]0}}, {\
\[Gamma]1, \[Gamma]2}]
\[Sigma]2 = \[Gamma]0 - \[Theta] . {\[Gamma]1, \[Gamma]2}
```

$$
\hat{\theta}_1=0.467983,\hat{\theta}_2=-0.240589,\sigma_q^2=0.763728
$$

### 极大似然估计

```mathematica
eproc = EstimatedProcess[data, 
  MAProcess[{\[Theta]1, \[Theta]2}, \[Sigma]], 
  ProcessEstimator -> "MaximumLikelihood"]
```

```mathematica
MAProcess[{-0.617286, 0.712392}, 1.06552]
```

置信区间为 

```mathematica
Quantile[NormalDistribution[0, Sqrt[1/N]], 1 - \[Alpha]/2]
```

$$
-\sqrt{2} \sqrt{\frac{1}{N}} \text{erfc}^{-1}\left(2 \left(1-\frac{\alpha
   }{2}\right)\right)\text{ if }0\leq \alpha \leq 2
$$

若取 $N=1000,\alpha=0.05$, 可得置信区间为

$$
(-0.0619795,0.0619795)
$$