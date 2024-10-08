---
title: 最优化算法速通 - 预备知识
layout: wiki
wiki: notes-optim
order: 101
---

## 向量

- 线性相关: 存在表出系数
- 线性无关
- 线性组合
- 张成子空间 $\text{span}$
- 子空间的基, 维数 $\dim \mathcal{V}$

## 矩阵

- 保秩运算
  1. 初等变换
  2. 加入列向量组的线性组合列
  3. 乘以可逆矩阵
  4. 转置, 旋转, 镜像
- 矩阵的逆和计算

  - 主逆副反号
    $$
    \left(
    \begin{matrix}
        A & B \\
        C & D
    \end{matrix}
    \right)^{-1} =
    \frac{1}{AD-BC}
    \left(
    \begin{matrix}
        D & -B \\
        -C & A
    \end{matrix}
    \right)
    $$

- 线性方程组的解的存在性 (增广矩阵的秩)
- 方程组的解的表达
  - 特解, 基础解系
  - 特解+零空间平移
  - 广义逆

## 内积与范数

- 内积
  - 非负性
  - 对称性
  - 可加性 (线性性)
  - 齐次性 (线性性)
- 范数
  - 非负性
  - 齐次性
  - 三角不等式
- Cauchy-Schwartz 不等式 $|\langle\alpha,y\rangle|\leq\|\alpha\||y\|$, 当且仅当线性相关时等号成立
- 勾股定理: 对两正交向量, 任何范数都成立
- p-范数
  - $(|x_{1}|^{p}+\cdot\cdot\cdot+|x_{n}|^{p})^{1/p},1\leq p<\infty$
  - $\mathrm{max}\{|x_{1}|,\cdots,|x_{n}|\},p=\infty$
- 向量值函数连续性
- 复空间的内积

### 向量范数

![](https://img.duanyll.com/img/2022-12-03-17-11-03.png)

![](https://img.duanyll.com/img/2022-12-03-17-12-24.png)

### 矩阵范数

- 非负性
- 齐次性
- 三角不等式
- 相容性: $\|A B\|\leqslant\|A\|\ \|B\|$

$$
\|A\|_{1}=\operatorname*{max}_{1\leq j\leq n}\sum_{i=1}^{m}|a_{i j}|,
$$

$$
\|A\|_{\infty}=\operatorname*{max}_{1\leq i\leq m}\sum_{j=1}^{n}|a_{i j}|,
$$

$$
\|A\|_{2}=\left(\lambda_{\mathrm{max} }(A^{T}A)\right)^{1/2}
$$

![](https://img.duanyll.com/img/2022-12-03-17-17-33.png)

#### F-范数

$$
\|A\|_{F}=\left(\sum_{i=1}^{m}\sum_{j=1}^{n}|a_{i j}|^{2}\right)^{1/2}=[\operatorname{tr}(A^{T}A)]^{1/2}
$$

F-范数等价于向量空间上的欧式范数

#### 导出范数

用行空间和列空间的向量范数导出矩阵范数

![](https://img.duanyll.com/img/2022-12-03-17-32-24.png)

$$
\|A\|=\operatorname*{max}_{\|x\|_{(n)}=1}\|A x\|_{(m)}
$$

用A对n维单位向量做线性变换, 得到的最长m维向量的长度

## 线性变换

- 线性变换的定义
  - 齐次性
  - 可加性
- 线性变换的矩阵表示: 对坐标的变换 $y=L(x),y'=Ax'$
- 不同基之间的过渡矩阵: 从 $A$ 到 $A'$ 的过渡矩阵 $A=A'T$
- 线性变换的特征值: 矩阵表示的特征值, 利用相似对角化求
- 正交矩阵 $A^\top A=I$
- 对称矩阵: 实对称矩阵一定可相似对角化

### 正交投影算子

![](https://img.duanyll.com/img/2022-12-03-17-27-04.png)

性质: 对称, 幂等

## 二次型

- 正定
  - 各阶顺序主子式大于零
  - 特征值全大于零
- 半正定
  - 所有主子式非负 (必要条件: 各阶顺序主子式非负)
  - 特征值全非负

### 瑞利不等式

对实对称矩阵 $P$ 有:

$$
\lambda_{\operatorname*{min} }(P)\|x\|^{2}\leqslant x^{\top}P x\leqslant\lambda_{\operatorname*{max} }(P)\|x\|^{2}
$$

二次型的值被最大特征值和最小特征值限制
