---
title: 数值分析速通 - 线性问题
layout: wiki
wiki: notes-numeric
order: 602
---

## 线性方程组的直接解法

### 高斯消元

![高斯消元](https://cdn.duanyll.com/img/20230617115549.png)

得到左侧上三角阵, 回代求解. 消元复杂度 $O(n^3)$, 回代复杂度 $O(n^2)$

### LU 分解

![](https://cdn.duanyll.com/img/20230617120152.png)

LU 分解不唯一, 可规定对角线上元素为 1

![](https://cdn.duanyll.com/img/20230617120257.png)

![](https://cdn.duanyll.com/img/20230617120343.png)

![伪代码](https://cdn.duanyll.com/img/20230617120510.png)

LU 分解定理: $A^{n\times n}$ 的前 $n$ 个主子式非奇异, 则有 LU 分解 (那不就是可逆吗)

### 误差

算子范数

- $\|A\|_1=\max_j(|a_{1j}|+\cdots|a_{nj}|)$ 最大绝对列和
- $\|A\|_2=\sqrt{\rho(A^\top A)}$, $A^\top A$ 的谱半径 (特征值最大模) 的平方根
- $\|A\|_\infty=\max_i(|a_{i1}|+\cdots|a_{in}|)$ 最大绝对行和

求解 $Ax=b$ 的误差

- 近似解 $x_a$ 的前向误差 $\|x_a-x\|_\infty$
- 后向误差 $\|b-Ax_a\|=\|r\|_\infty$
- 误差放大因子
  $$
  \frac{\|x_a-x\|_\infty/\|x\|_\infty}{\|r\|_\infty/\|b\|_\infty}
  $$
- 条件数: 求解 $Ax=b$ 时对于所有 $b\neq0$ 可能出现的最大误差放大因子
  $$
  \operatorname{cond}(A)=\max_{b\in\R^n,b\neq0}\frac{\|x_a-x\|_\infty/\|x\|_\infty}{\|r\|_\infty/\|b\|_\infty}
  $$

定理: 可逆方阵的条件数为

$$
\operatorname{cond}(A)=\|A\|_\infty\|A^{-1}\|_\infty
$$

前向和后向误差满足

$$
\frac{1}{\operatorname{cond}(A)}\frac{\|r\|_\infty}{\|b\|_\infty}\leq\frac{\|x_a-x\|_\infty}{\|x\|_\infty}\leq\operatorname{cond}(A)\frac{\|r\|_\infty}{\|b\|_\infty}
$$

![淹没现象](https://cdn.duanyll.com/img/20230617143744.png)

![列主消元](https://cdn.duanyll.com/img/20230617143810.png)

### 联系

顺序高斯消元

$$
E_m\cdots E_1 A=U\iff A=E_1^{-1}\cdots E_m^{-1}U
$$

$$
E_1^{-1}\cdots E_m^{-1}=L
$$

顺序高斯消元后, 左侧的上三角阵为 $U$, 右侧从 $I$ 开始变换, 逆为 $L$

列主高斯消元增加 $P$ 矩阵

$$
P_{n-1}\cdots P_1A=LU\implies PA=LU,P=P_{n-1}\cdots P_1
$$

$$
Ax=b\implies PAx=Pb\implies LUx=Pb\implies\begin{cases}
  Ly=Pb\\
  Ux=y
\end{cases}
$$

严格行对角占优矩阵: 对角线元素比这一行其他元素加起来大

$$
|a_{ii}|>\sum_{j=1,j\neq i}^n|a_{ij}|
$$

定理：不选主元Gauss消元法保持矩阵的严格行对角占优性质

推论：行对角占优矩阵非奇异且有 LU 分解

## 线性方程组的迭代法

$$
Ax=b\implies Qx_{k+1}=(Q-A)x_k+b
$$

$Q$ 称为分裂矩阵, 写成不动点迭代形式

$$
x_{k+1}=(I-Q^{-1}A)x_k+Q^{-1}b
$$

迭代矩阵

$$
G=(I-Q^{-1}A)
$$

不同的迭代方法的区别为构造了不同的 $Q$ 和 $G$. $Q^{-1}$ 和 $G$ 应当容易计算.

![](https://cdn.duanyll.com/img/20230617161344.png)

![](https://cdn.duanyll.com/img/20230617161803.png)

![](https://cdn.duanyll.com/img/20230617161857.png)

### Richardson 迭代

$$
Q=I,G=I-A
$$

$$
x_{k+1}=(I-A)x_k+b
$$

$A$ 是单位严格行 / 列对角占优矩阵时收敛 (主对角线全为 1)

### Jacobi 迭代

$$
Q=D,G=-D^{-1}(L+U)
$$

$$
x_{k+1}=-D^{-1}(L+U)x_k+D^{-1}b
$$

![D, L, U 是 A 的部分](https://cdn.duanyll.com/img/20230617160122.png)

$A$ 是严格行对角占优矩阵时收敛

### Gauss-Seidel 迭代

$$
Q=D+L, G=-(D+L)^{-1}U
$$

$$
x_{k+1}=-(D+L)^{-1}Ux_k+(D+L)^{-1}b
$$

$A$ 是严格行对角占优矩阵时收敛

主对角元非零收敛

### SOR 迭代

$$
x_{k+1}=Gx_k+c
$$

添加 "动量" 项

$$
x_{k+1}=\gamma(Gx_k+c)+(1-\gamma)x_k
$$

即

$$
x_{k+1}=G_\gamma x_k+\gamma c,G_\gamma=\gamma G+(1-\gamma)I
$$

Gauss-Seidel 迭代推广到 SOR 迭代形式

$$
x_{k+1}=(1-\omega)x_k+\omega D^{-1}(b-Ux_k-Lx_{k+1})
$$

$$
Q=\frac{1}{\omega}(D+\omega L)
$$

$$
G=(D+\omega L)^{-1}((1-\omega)D-\omega U)
$$

- $\omega < 1$ 欠松弛
- $\omega = 1$ Gauss-Seidel
- $\omega > 1$ 超松弛

需要实验确定收敛最快的 $\omega$

主对角元非零, $0<\omega<2$ 收敛

## 对称正定线性方程组的解法

若 $A$ 是对称正定矩阵，则求解 $Ax=b$ 的 SOR 迭代对于任意初始向量收敛。

### Cholesky 分解

实对称正定矩阵可以分解为 $A=LL^\top$, $L$ 是下三角阵

![](https://cdn.duanyll.com/img/20230617162838.png)

![](https://cdn.duanyll.com/img/20230617163042.png)

![伪代码](https://cdn.duanyll.com/img/20230617163412.png)

### 梯度下降法

$A$ 对称正定, 则求解 $Ax=b$ 等价于 极小化二次型问题

$$
\argmin_{x\in\R^n}q(x)=\frac{1}{2}\left<x,Ax\right>-\left<x,b\right>
$$

其中 $\left<x,y\right> =x^\top y$ 

[梯度下降法](/source/wiki/optim/unconstrained.md#梯度下降法)迭代公式.

### 共轭梯度法

[迭代公式](/source/wiki/optim/unconstrained.md#共轭梯度法)

## 矩阵特征值的数值解法

通过高次多项式求根解特征值是病态问题, 需要更好的方法

### 盖尔圆盘

通过盖尔圆盘可估计特征值的大概范围

**盖尔(Gershgorin)圆盘定理**：方阵 $A$ 的谱（特征值集）包含在下列复平面中 $n$ 个圆盘 $C_i$ 的并中

$$
C_i=\left\{z\in\mathbb{C}:|z-a_{ii}|\leq\sum_{j=1,j\neq i}^n|a_{ij}|\right\}(1\leq i\leq n)
$$

{% folding open:true 说明 %}

$$
Ax=\lambda x
$$

对 $x$ 的每一个分量 $x_i$

$$
\sum_{j=1}^na_{ij}x_j=\lambda x_i
$$

$$
(\lambda-a_{ii})x_i=\sum_{j=1,j\neq i}^na_{ij}x_j
$$

$$
|\lambda-a_{ii}|\leq\sum_{j=1,j\neq i}^na_{ij}\frac{|x_j|}{|x_i|}
$$

{% endfolding %}

圆心是对角线元素, 半径是每一行的和. $A^\top$ 特征值与 $A$ 相同, 对于列也有

$$
D_i=\left\{z\in\mathbb{C}:|z-a_{ii}|\leq\sum_{k=1,k\neq i}^n|a_{ki}|\right\}(1\leq i\leq n)
$$

则特征值位于 $C_i$ 的并交 $D_i$ 的并中

**盖尔(Gershgorin)圆盘第二定理**：设方阵 $A$ 的 $n$ 个盖尔圆盘分成若干个连通区域，若一个连通区域含有 $k$ 个盖尔圆盘，则有且只有 $k$ 个特征值落在这个连通区域内（若两个盖尔圆盘重合，需计重数；又若特征值为重根也需计重数）

- 推论1：严格对角占优矩阵可逆。
- 推论2：方阵的 $n$ 个盖尔圆盘两两互不相交，则相似于对角阵。
- 推论3：实方阵的 $n$ 个盖尔圆盘两两互不相交，则特征值全为实数。

**扰动矩阵特征值圆盘定理**：若 $n$ 阶方阵 $A$ 用相似变换 $P^{−1}AP$ 对角化，而 $B$ 是任意 $n$ 阶方阵，则 $A+B$ 的特征值 $\mu$ 位于下列圆盘之并中：

$$
\{\mu\in\mathbb{C}:|\mu-\lambda_i|\leq\operatorname{cond}_\infty(P)\|B\|_\infty\}
$$

通过条件数估计特征值偏离的范围.

### 幂法

将矩阵反复作用于一个向量, 最终方向会接近于矩阵的一个特征向量. 将向量 $x$ 用特征向量 $v_1,\cdots,v_n$ 作为基表出, 迭代公式

$$
\begin{aligned} 
  x_k=A^kx_0&=A^k(c_1v_1+\cdots+c_nv_n)\\
  &=\lambda_1^k\left(c_1v_1+\left(\frac{\lambda_2}{\lambda_1}\right)^kc_2v_2+\cdots+\left(\frac{\lambda_n}{\lambda_1}\right)^kc_nv_n\right)
\end{aligned}
$$

当 $|\lambda_1|>|\lambda_2|\geq\cdots\geq|\lambda_n|$ 时, 有

$$
\lim_{k\to\infty}x_k=\lim_{k\to\infty}\lambda_1^k\left(c_1v_1+\left(\frac{\lambda_2}{\lambda_1}\right)^kc_2v_2\right)
$$

特征向量

$$
v_1\approx x_k
$$

特征值

$$
\lambda_1\approx r_k=\frac{x_k^{(i)}}{x_{k-1}^{(i)}}
$$

线性收敛率 $S\leq|\lambda_2/\lambda_1|$

若最大特征值是两重, $|\lambda_1|=|\lambda_2|>|\lambda_3|\geq\cdots\geq|\lambda_n|$, $\lambda_1=-\lambda_2$

$$
\lim_{k\to\infty}x_k=\lim_{k\to\infty}\lambda_1^k\left(c_1v_1+(-1)^kc_1v_1+\left(\frac{\lambda_3}{\lambda_1}\right)^kc_3v_3\right)
$$

特征值

$$
x_k\approx\lambda_1^2x_{k-2}\implies \lambda_1^2\approx\frac{x_k^{(i)}}{x_{k-2}^{(i)}}
$$

特征向量

![](https://cdn.duanyll.com/img/20230617232749.png)

通过以上方法求出模长最大的特征向量. 求解其他特征向量

- 模长最小: $x_{k+1}=A^{-1}x_k$
- 离 $\mu$ 最远: $x_{k+1}=(A-\mu I)x_k$
- 离 $\mu$ 最近: $(A-\mu I)x_{k+1}=x_k$

### Rayleigh 商迭代

已知近似特征向量 $x$, 求解超定方程

$$
Ax\approx\lambda x
$$

最小化残差 Rayleigh 商

$$
\lambda=\frac{x^\top Ax}{x^\top x}
$$

![](https://cdn.duanyll.com/img/20230617233820.png)

### QR 分解

把 $A^{m\times n}$ 分解为 $A=QR$, $Q$ 是正交阵, $R$ 是上三角阵

- 消减 QR 分解: $A^{m\times n}=Q^{m\times n}R^{n\times n}$ ($A$ 的列向量不够多, 没有求出完整的正交基)
- 完全 QR 分解: $A^{m\times n}=Q^{m\times m}R^{m\times n}$ (任意补充 $m-n$ 个向量得到完整正交基, $R$ 矩阵多余的部分补零)

#### Gram-Schmit 正交化

对 $A$ 的每个列向量, 依次减去与前面的向量平行的分量并归一化, 得到正交向量组作为 $Q$ 矩阵, 记录系数作为 $R$ 矩阵

![Gram-Schmit 正交化实现消减 QR 分解](https://cdn.duanyll.com/img/20230618110346.png)

![要实现完全 QR 分解, 先任意补充线性无关组](https://cdn.duanyll.com/img/20230618110611.png)

![R 矩阵下方补零](https://cdn.duanyll.com/img/20230618110711.png)

![](https://cdn.duanyll.com/img/20230618112219.png)

两种形式在数学上等价, 但如果因为数值计算的误差导致靠前的向量之间没有完全正交, 改进的方法仍然能尽量保持后面的向量之间的正交性.

时间复杂度: $O(mn^2)$

#### Householder 变换

![Householder 反射子定义](https://cdn.duanyll.com/img/20230618112711.png)

$$
H=I-2\frac{vv^\top}{v^\top v}
$$

则 $Hx$ 是 $x$ 关于超平面 $v^\perp$ 的镜像. 已知向量 $x$ 和 $w$ 满足 $\|x\|_2=\|w\|_2$, 可令 $v=w-x$ 求出 $H$ 使得 $w=Hx$

利用 Householder 变换实现 QR 分解, 方法是通过叠加多个 Householder 反射子得到 $Q$ 矩阵

$$
A=QR\implies Q^\top A=R\implies [Q^\top A_1,Q^\top A_2]=\begin{bmatrix}
  \square & \square \\
  0 & \square
\end{bmatrix}
$$

由 $R$ 矩阵的形式, 每增加 $A$ 中新的向量作为 $x$ 时, 可以容易得到对应的 $w$, 则可以求出 $H$.

![构造第一列的 w 并得到 H1](https://cdn.duanyll.com/img/20230618114309.png)

![后续只处理 Tilde A, 不需要处理 W, H 矩阵之前处理好的部分用 I 填充](https://cdn.duanyll.com/img/20230618115907.png)

$$
H_n\cdots H_1A=R\implies Q=H_1\cdots H_n
$$

![伪代码](https://cdn.duanyll.com/img/20230618120236.png)

Householder 变换直接得到的是完全 QR 分解, 数值稳定性比 GS 正交化好.

#### QR 算法

求出矩阵的所有特征值. 选取一组正交向量同时进行幂迭代，每次迭代都对向量进行正交化，最终可得到所有的特征向量及对应的特征值.

![](https://cdn.duanyll.com/img/20230618121857.png)

![伪代码](https://cdn.duanyll.com/img/20230618122001.png)