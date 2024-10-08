---
title: 最优化算法速通 - 无约束优化
layout: wiki
wiki: notes-optim
order: 104
---

二次型函数

$$
f(x)={\frac{1}{2} }x^{\top}Q x-b^{\top}x+c
$$

$Q$ 对称正定

## 收敛阶

![](https://img.duanyll.com/img/2022-12-06-23-05-51.png)

收敛阶越高, 收敛率越高, 收敛速度越快.

- 拟线性收敛: $p=1$, $\operatorname*{lim}_{k\rightarrow\infty}\frac{\left\|\alpha^{(k+1)}-\alpha^{*}\right\|}{\left\|\alpha^{(k)}-\alpha^{*}\right\|}=1$
- 线性收敛: $p=1$, $\operatorname*{lim}_{k\rightarrow\infty}\frac{\left\|\alpha^{(k+1)}-\alpha^{*}\right\|}{\left\|\alpha^{(k)}-\alpha^{*}\right\|}<1$
- 超线性收敛: $p>1$
- 二次收敛: $p=2$

![](https://img.duanyll.com/img/2022-12-06-23-09-19.png)

![](https://img.duanyll.com/img/2022-12-06-23-09-37.png)

任意收敛序列的收敛阶大于等于 1.

## 梯度下降法

$$
x^{(k+1)}=x^{(k)}-\alpha_{k}\nabla f(x^{(k)})
$$

记 $g^{(k)}=\nabla f(x^{(k})$

### 最速下降法

$$
\alpha_{k}={\underset{\alpha>0}{\operatorname{argmin} } }f(x^{(k)}-\alpha\nabla f(x^{(k)}))
$$

使用二次型精确步长公式, 则

$$
\alpha_k=\frac{g^{(k)\top}g^{(k)} }{g^{(k)\top}Qg^{(k)} }
$$

![](https://img.duanyll.com/img/2022-12-06-22-57-58.png)

- 精确步长线搜索, 搜索方向与梯度正交
- 能保证单调下降
- 能全局收敛
- 会形成锯齿状震荡轨迹, 效率低
- 最坏情况 ($g^{(k)}$ 是 $Q$ 的一个特征向量时), 收敛阶为 1

### 固定步长法

只需要取 $\alpha_k=\alpha\in\R$,

$$
\alpha^{(k+1)}=\alpha^{(k)}-\alpha g^{(k)}
$$

满足 $0<\alpha<\frac{2}{\lambda_{\mathrm{max} }(Q)}$ 时收敛.

## 牛顿法

类似一维牛顿法, 利用二次型来近似, 需要二阶可导, 可求 Hessian 矩阵.

二阶 Taylor 展开:

$$
f(x)\approx f(x^{(k)})+(x-x^{(k)})^{\top}g^{(k)}+{\frac{1}{2} }(x-x^{(k)})^{\top}F(x^{(k)})(x-x^{(k)})\triangleq q(x)
$$

若 $F(x^{(k)})>0$, 可求 $q$ 的极小点, 得迭代公式

$$
x^{(k+1)}=x^{(k)}-F(x^{(k)})^{-1}g^{(k)}
$$

- 若二次型非正定, 则牛顿法搜索方向不一定是下降方向
- 目标函数是二次型时, 收敛阶为 $\infty$

![](https://img.duanyll.com/img/2022-12-06-23-28-18.png)

需要初始点靠近极小点才有非常好的收敛性.

## 共轭类方法

- 共轭方向: $d^{(0)},d^{(1)},d^{(2)},\cdots d^{(m)}, \forall i\neq j, d^{(i)\top}Qd^{(j)}=0$.
- $Q$ 对称正定, 则共轭向量组线性无关.
- 构造共轭向量组: Gram-Shimidt 正交化, 给定一组线性无关变量 $\{p^{(0)},\ \cdots,\ p^{(n-1)}\}$

$$
d^{(0)}=p^{(0)}
$$

$$
d^{(k+1)}=p^{(k+1)}-\sum_{i=0}^{k}\frac{p^{(k+1)\top}Q d^{(i)} }{d^{(i)\top}Q d^{(i)} }d^{(i)}
$$

### 基本共轭方向算法

给定初始点 $x^{(0)}$ 和一组关于 $Q$ 共轭的方向 $d^{(0)},d^{(1)},d^{(2)},\cdots d^{(n-1)}$, 迭代公式:

$$
g^{(k)}=\nabla f(x^{(k)})=Qx^{(k)}-b
$$

使用二次型精确步长公式:

$$
\alpha_{k}=-\frac{g^{(k)\top}{d}^{(k)} }{d^{(k)\top}Q d^{(k)} }
$$

$$
x^{(k+1)}=x^{(k)}+\alpha_k d^{(k)}
$$

对于二次型, 任意初始点, 基本共轭方向算法能在 $n$ 次迭代内收敛到全局极小点.

共轭方向算法中, $\forall0\leq k\leq n-1,\;0\leq i\leq k$, 有 $g^{(k+1)\top}{d}^{(i)}=0$

扩张子空间定理:

![](https://img.duanyll.com/img/2022-12-07-11-31-23.png)

每迭代一次, 都能在到目前为止的共轭方向张成的子空间中取到最优解.

### 共轭梯度法

不需要预先给定 $Q$ 的一组共轭方向, 能在迭代的过程中利用梯度不断产生共轭方向.

1. $k\larr0$, 给定初始值 $x^{(0)}$
2. $g^{(0)}\larr\nabla f(x^{(0)})$
   1. 若 $g^{(0)}=0$, 停止迭代
   2. $d^{(0)}\larr-g^{(0)}$
3. $\alpha_{k}\larr-\frac{g^{(k)\top}{d}^{(k)} }{ {d}^{(k)\top}Q{d}^{(k)} }$
4. $x^{(k+1)}\larr x^{(k)}+\alpha_k d^{(k)}$
5. $g^{(k+1)}\larr\nabla f(x^{(k+1)})$
   1. 若 $g^{(k+1)}=0$ 停止迭代
6. $\beta_{k}\larr\frac{g^{(k+1)\top}Q d^{(k)} }{d^{(k)\top}Q d^{(k)} }$
7. $d^{(k+1)}\larr-g^{(k+1)}+\beta_{k}d^{(k)}$
8. $k\larr k+1$, 回到第三步

### 非线性共轭梯度法

对于一般的函数, 用 Hessian 矩阵代替 $Q$, 但计算每个迭代点处的 Hessian 矩阵计算量大. 使用其他方法来近似代替 Hessian.

对于 $\alpha_k$, 使用一般的线搜索方法.

$$
\alpha_{k}=\argmin_{\alpha\geq0}f(\alpha^{(k)}+\alpha d^{(k)})
$$

对于 $\beta_k$, 有三种近似的公式.

$$
\beta_{k}=\frac{g^{(k+1)\top}Q d^{(k)} }{d^{(k)\top}Q d^{(k)} }
$$

Hestenes-Stiefel: 用 $(g^{(k+1)}-g^{(k)})/\alpha_{k}$ 替代 $Qd^{(k)}$

$$
\beta_{k}=\frac{g^{(k+1)\top}[g^{(k+1)}-g^{(k)}]}{d^{(k)\top}g^{(k+1)}-d^{(k)\top}g^{(k)} }
$$

Polak-Ribiere: 近似认为 $d^{(k)\top}g^{(k+1)}=0$, 有 ${d^{(k)} }=-g^{(k)}+\beta_{k-1}d^{(k-1)}$

$$
\beta_{k}=\frac{g^{(k+1)\top}[g^{(k+1)}-g^{(k)}]}{g^{(k)\top}g^{(k)} }
$$

Fletcher-Reeves: 近似认为 $g^{(k+1)\top}g^{(k)}=0$

$$
\beta_{k}={\frac{g^{(k+1)\top}g^{(k+1)} }{g^{(k)\top}g^{(k)} } }
$$

## 拟牛顿法

希望避免牛顿法中求 Hessian 矩阵, 同时避免对矩阵求逆. 设法近似 $F(x^{(k)})^{-1}$, 在迭代中更新近似.

迭代公式:

1. 拟牛顿方向: $d^{(k)}=-H_{k}{g^{(k)} }$
2. 步长: $\alpha_{k}=\argmin_{\alpha\geq0}f(\alpha^{(k)}+\alpha d^{(k)})$
3. 更新迭代点: $x^{(k+1)}=x^{(k)}+\alpha_k d^{(k)}$

矩阵 $H_n$ 需要是对称矩阵, 目标函数是二次型函数时要满足 $H_{k+1}\Delta g^{(i)}=\Delta x^{(i)} ,0\leq i\leq k$. 二次型问题中记 Hessian 矩阵为 $Q$, 则能保证拟牛顿方向 $d^{(0)},d^{(1)},d^{(2)},\cdots d^{(k+1)}$ 是 $Q$ 共轭的.

记 $\Delta x^{(k)}=\alpha_{k}d^{(k)}$, $\Delta g^{(k)}=g^{(k+1)}-g^{(k)}$ 拟牛顿方程:

$$
H_{k+1}\Delta g^{(k)}=\Delta x^{(k)}
$$

方程的解不唯一.

### 秩 1 校正

在 $H_k$ 上添加一个秩 1 矩阵得到 $H_{k+1}$, 再求解拟牛顿方程:

$$
H_{k+1}=H_{k}+auu^\top\\
H_{k+1}\Delta g^{(k)}=\Delta x^{(k)}
$$

已知 $H_k,\Delta g^{(k)}, \Delta x^{(k)}$, 可求解 $a_k$ 和 $u$

$$
\begin{aligned}
    u&=\Delta x^{(k)}-H_k\Delta g^{(k)}\\
    a&=\frac{1}{z^{(k)\top}\Delta g^{(k)} }=\frac{1}{(\Delta x^{(k)}-H_k\Delta g^{(k)})^\top \Delta g^{(k)} }
\end{aligned}
$$

得到迭代公式

$$
H_{k+1}=H_{k}+\frac{(\Delta x^{(k)}-H_{k}\Delta g^{(k)})(\Delta x^{(k)}-H_{k}\Delta g^{(k)})^{\top} }{\Delta g^{(k)\top}(\Delta x^{(k)}-H_{k}\Delta g^{(k)})}
$$

初始时 $H_0$ 可以任选对称正定实矩阵.

问题:

1. 即使是二次型问题, $H_{k+1}$ 也可能非正定, $d^{(k+1)}$ 可能不是下降方向.
2. 秩 1 公式的分母接近 0 会导致计算困难.

### DFP 算法 (秩 2 算法)

解方程组

$$
H_{k+1}\Delta g^{(k)}=\Delta x^{(k)}\\
H_{k+1}=H_k+auu^\top+bvv^\top
$$

代入得

$$
au(u^\top\Delta g^{(k)})+bv(v^\top\Delta g^{(k)})=\Delta x^{(k)}-H_k\Delta g^{(k)}
$$

取一组特解

$$
\begin{aligned}
    u&=\Delta x^{(k)}\\
    a&=\frac{1}{u^\top\Delta g^{(k)} }\\
    v&=H_k\Delta g^{(k)}\\
    b&=-\frac{1}{v^\top\Delta g^(k)}
\end{aligned}
$$

得到迭代公式

$$
H_{k+1}=H_{k}+\frac{\Delta x^{(k)}\Delta x^{(k)\top} }{\Delta x^{(k)\top}\Delta g^{(k)} }-\frac{[H_{k}\Delta g^{(k)}][H_{k}\Delta g^{(k)}]^{\top} }{\Delta g^{(k)\top}H_{k}\Delta g^{(k)} }
$$

DFP 公式能保证 $H_k$ 正定则 $H_{k+1}$ 正定, 但 $H_k$ 接近奇异时可能会被卡住.

### BFGS 算法

除了构造 $Q^{-1}$ 的近似矩阵 $H_k$, 也构造 $Q$ 的近似矩阵 $B_k$, 满足:

$$
\Delta g^{(i)}=B_{k+1}\Delta x^{(i)}, 0\leq i\leq k
$$

由对称性, 从 DFP 公式得到

$$
B_{k+1}=B_{k}+\frac{\Delta g^{(k)}\Delta g^{(k)\top} }{\Delta g^{(k)\top}\Delta x^{(k)} }-\frac{B_{k}\Delta x^{(k)}\Delta x^{(k)\top}B_{k} }{\Delta x^{(k)\top}B_k\Delta x^{(k)} }
$$

Sherman-Morrison 公式: 若 $A$ 非奇异, 列向量 $u,v$, $1+v^{\textsf{T} }A^{-1}u\neq0$. 则

$$
(A+u v^{\top})^{-1}=A^{-1}-{\frac{(A^{-1}u)(v^{\top}A^{-1})}{1+v^{\top}A^{-1}u} }
$$

应用两次 Sherman-Morrison 公式简化 $(B_{k+1})^{-1}$ 的计算

$$
H_{k+1}=(B_{k+1})^{-1}=H_{k}+\left(1+\frac{\Delta g^{(k)\top}H_{k}\Delta g^{(k)} }{\Delta g^{(k)\top}\Delta x^{(k)} }\right)\frac{\Delta x^{(k)}\Delta x^{(k)\top} }{\Delta x^{(k)\top}\Delta g^{(k)} }-\frac{H_{k}\Delta g^{(k)}\Delta x^{(k)\top}(H_{k}\Delta g^{(k)}\Delta x^{(k)\top})^{\top} }{\Delta g^{(k)\top}\Delta x^{(k)} }
$$
