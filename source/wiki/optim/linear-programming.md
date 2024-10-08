---
title: 最优化算法速通 - 线性规划
layout: wiki
wiki: notes-optim
order: 105
---

## 标准型

$$
\begin{array}{r l}{\operatorname*{minimize} }&{ {}c^{\textsf{T} }x}\\ {\operatorname{subject\;to} }&{ {}A x\geq b}\\&x\geq0\end{array}
$$

- 约束集：$\mathrm{W}\!=\!\left\{x\!\in\!R^{n}\!:\!A\!x\!=\!b,x\!\geq\!0\right\}$是凸多面体, 多胞形
- 凹函数在凸集上的极值点一定是集合的边界点, 线性规划的极值点一定是多胞形的顶点
- 解的存在性
  - 可行域为空集, 无最优解
  - 可行域为有界闭集, 最优解不唯一
  - 可行域为无界集, 不确定有无最优解

线性规划标准型:

$$
\begin{array}{r l}{\operatorname*{minimize} }&{ {}c^{\textsf{T} }x}\\ {\operatorname{subject\;to} }&{Ax=b}\\&x\geq0\end{array}
$$

其中 $A\in\mathbb{R}^{m\times n},m<n,\operatorname{rank}A=m,b\geq0$

化为标准型:

1. 最大化转化为最小化相反数
2. 不等式约束引入松弛变量化为等式约束 (确保不等式只需大于等于0, 同时反转不等号方向)
   - $x_1\leq7\implies x_1+x_2=7,x_2\geq0$
   - $a_{1}x_{1}+a_{2}x_{2}\leq b,x_{1},x_{2}\geqslant0\implies a_{1}x_{1}+a_{2}x_{2}+x_{3}=b,x_{1},x_{2},x_{3}\leq0$
3. 决策变量属于实数 $x_i\in\mathbb{R}^n$ 时, 对分量进行非负拆分
4. $b_i<0$ 则两侧同乘 -1

$$
\begin{array}{r l}{\operatorname*{minimize} }&{ {}c^{\textsf{T} }x}\\ {\operatorname{subject\;to} }&{ {}A x\geq b}\\&x\geq0\end{array}\iff
\begin{array}{r l}{\operatorname*{minimize} }&{ {}c^{\textsf{T} }x}\\ {\operatorname{subject\;to} }&{Ax-I_my=b}\\&x\geq0\\&y\geq0\end{array}
$$

## 线性规划的解

$$
\begin{array}{r l}{\operatorname*{minimize} }&{ {}c^{\textsf{T} }x}\\ {\operatorname{subject\;to} }&{Ax=b}\\&x\geq0\end{array}
$$

其中 $A\in\mathbb{R}^{m\times n},m<n,\operatorname{rank}A=m,b\geq0$

从 $A$ 中任选 $m$ 个线性无关的列向量记作 $B\in\R^{m\times m}$, 则 $A=[B,D],D\in\R^{m\times(n-m)}$, 则

- 在 $B$ 下的基本解: $x=\left[x_{B}^{\top},0^{\top}\right]^{\top}, x_{B}=B^{-1}D$ 是 $Ax=b$ 的一个解
- 基变量: $x_B$ 中的元素
- 基本列向量: $B$ 中的列向量
- 退化的基本解: $x_B$ 中有变量是 0
- 可行解: 满足约束条件 $Ax=b,\;x>0$
- 基本可行解: $x_B\geq0$
  - 可以通过暴力枚举 $B$ (要保证 $B$ 可逆)的方法求所有基本可行解
  - 最多有 $C_n^m$ 个基本解
- 退化的基本可行解
- 最优可行解: 满足约束条件且使得 $c^\top x$ 取得极小值

线性规划基本定理:

1. 存在可行解 $\implies$ 存在基本可行解
2. 存在最优可行解 $\implies$ 存在最优基本可行解

则可以通过搜索有限数量的基本可行解来求解线性规划问题. 但直接枚举复杂度很高, 需要更好的做法

解的性质:

- 基本可行解 $\iff$ 非零分量对应的列向量组线性无关 $\iff$ 在可行域的顶点处取得
- 最优解一定在可行域的顶点处取得

## 单纯形法

从某个基本可行解变换到另一个基本可行解, 直到找到最优基本可行解.

### 转轴元素

![](https://img.duanyll.com/img/2022-12-06-09-34-14.png)

行的选择: 希望能保证变换后 $b'_k>0$, 保证基本解的可行性. 于是在第 $l$ 列中选择满足以下条件的元素:

$$
{\frac{b_{k} }{a_{k l} } }=\operatorname*{min}_{i=1,\cdots,m}\left\{ {\frac{b_{i} }{a_{i l} } }|a_{i l}>0\right\}
$$

这样能使得 $b'_i$ 尽量大:

$$
b_{i}^{\prime}=b_{i}-\frac{b_{k} }{a_{k l} }a_{i l},\;\;\;i=1,\cdots,m;
$$

### 判断解的最优性

设 $A$ 的前 $m$ 列 $B$ 是基向量, $A=[B,D]$, $x=[x_B,x_D]$, $c^\top=[c_B^\top,c_D^\top]$, 约束条件:

$$
B x_{B}+Dx_{D}=b, x_B\geq0,x_D\geq0
$$

1. 若 $x_D=0$, 则为基本可行解, $x=\left[\frac{x_{B} }{x_{D} }\right]=\left[\begin{array}{c}{ {B^{-1}b} }\\ { {0} }\end{array}\right]$, 目标函数值: $z_{0}=c_{B}^{\top}B^{-1}b$
2. 若 $x_D\neq0$, 则 $x_{B}=B^{-1}b-B^{-1}D x_{D}$. 定义 $r_{D}^{\top}=c_{D}^{\top}-c_{B}^{\top}B^{-1}D$, 则目标函数值 $z=z_{0}+r_{D}^{\top}x_{D}$

则 $r_D\geq0\iff$ 最优解. 若 $r_D$ 中存在负分量, 则将 $x_D$ 中相应的值从 0 变为正数, 目标函数值就能变小, **通过转轴运算更新一次矩阵**

### 单纯形表的矩阵表示

![](https://img.duanyll.com/img/2022-12-06-09-51-44.png)

线性规划的基、基变量、基本可行解、判别式、函数值都在最后一个矩阵中.

将初始单纯形表转化为标准单纯形表, 需要做行初等变换使得基变量所在列的判别式值为 0, 然后进行单纯形表的操作：

1. 若上述矩阵中的判别式全部非负，则此时的基本解就是最优解，最优值的相反数在矩阵的右下角
2. 若上述矩阵中的判别式有负元素，则取最小的负元素所在的列进基，做1次转轴运算, 同时通过行初等变换更新判别式的值

例子:

![](https://img.duanyll.com/img/2022-12-06-09-56-16.png)

![](https://img.duanyll.com/img/2022-12-06-09-56-28.png)

### 确定初始可行基

有些明显的初始可行基可以直接看出来, 有的不行, 穷举 $m$ 个列向量不现实, 需要更好的方法.

#### 两阶段法

![](https://img.duanyll.com/img/2022-12-06-17-00-34.png)

P0 有基本可行解 $\iff$ P1 有最优解且最有函数值为 0

1. (第一阶段) P1 初始时基变量全部位于人工变量中, 基变量的判别式均为 1
2. 通过行初等变换化为标准单纯形表, 使得基变量的判别式为 0
3. 做转轴变换直到求出最优解
   1. 若最优解不为 0 则无解
   2. 若有基变量在人工变量中
      1. 若这一行 $x_{i1}=\cdots=x_{in}=0$, 则直接删除行
      2. 否则任选一个非零 $x_{ij}$ 做转轴变换使得人工变量出基
4. 删除人工变量的列
5. (第二阶段) 根据最小判别数不断做转轴运算求最优解.

![](https://img.duanyll.com/img/2022-12-06-17-06-34.png)

若 $f^*>0$, 则 P0 无解.

![](https://img.duanyll.com/img/2022-12-06-17-07-40.png)

![](https://img.duanyll.com/img/2022-12-06-17-08-20.png)

#### 大 M 方法

![](https://img.duanyll.com/img/2022-12-06-17-16-18.png)

![](https://img.duanyll.com/img/2022-12-06-17-20-08.png)

加入至多 $m$ 个人工变量 $y_i$ 使得能找出一组基, 求解含参 $M$ 线性规划问题, 使用判别数时认为 $M$ 时无穷大, 得到的解就是原问题的解.

## 对偶线性规划

原问题 (P):

$$
\begin{array}{r l}{\operatorname*{minimize} }&{ {}c^{\textsf{T} }x}\\ {\operatorname{subject\;to} }&{Ax=b}\\&x\geq0\end{array}
$$

对偶问题 (D):

$$
\begin{array}{r l}{\operatorname*{maximize} }&{ {}\lambda^{\textsf{T} }b}\\ {\operatorname{subject\;to} }&{\lambda^\top A\leq c}\end{array}
$$

- 弱对偶定理: $x$ 原问题可行解, $\lambda$ 对偶问题可行解, $c^\top x\geq\lambda^\top b$
- 若 $c^\top x_0=\lambda_0^\top b$, 则 $x_0$ 和 $\lambda_0$ 是各自问题的最优解
- 如果 (P) 问题有最优解，那么 (D) 问题也有最优解，并且它们的最优函数值相同

![](https://img.duanyll.com/img/2022-12-06-17-44-35.png)

互补松弛定理: 可行解 $x$ 和 $\lambda$ 是最优解 $\iff$

1. $(c^\top - \lambda^\top A)x=0$
2. $\lambda^\top(Ax-b)=0$
