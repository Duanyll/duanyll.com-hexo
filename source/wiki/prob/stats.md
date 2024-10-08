---
title: 概统速通 - 统计
layout: wiki
wiki: notes-prob
order: 703
---

## 样本

1. 总体是随机变量
2. 样本是一组随机变量 (随机向量)
   - 简单随机样本独立与总体同分布
3. 样本观测值是一组数值
4. 样本统计量是样本的函数, 是随机变量或随机向量 (大写)
   1. 样本 $k$ 阶原点矩 $A_k=\frac{1}{n}\sum_{i=1}^n\xi_i^k$
   2. 样本 $k$ 阶中心矩 $B_k=\frac{1}{n}\sum_{i=1}^n(\xi_i-\bar{\xi})^k$
   3. 样本均值 $\bar{\xi}=A_1$
   4. 样本方差 $S^2=B_2$
      - $S^2=A_2-A_1^2$
   5. 顺序统计量
      1. 最小统计量, 最大统计量
      2. 样本中位数
      3. 样本极差
5. 样本统计值是数或向量 (小写)

### 样本的数字特征

**定义** 从总体 $\xi$ 中抽取 $n$ 个样本, 顺序统计量 $\xi_{(1)},\cdots,\xi_{(n)}$ 的值 $x_{(1)},\cdots,x_{(n)}$ 定义总体的经验分布函数 $F_n^*(x)$

![](https://img.duanyll.com/img/20230623173400.png)

是具有分布函数性质的实函数

![阶跃值为 1 / n](https://img.duanyll.com/img/20230623173436.png)

> 对于固定的 $x\in\R$, $F_n^*(x)$ 是样本的函数, 是一个统计量

**定理** 格列汶科定理 记

$$
D_n=\sup_{-\infty<x<+\infty}|F(x)-F_n^*(x)|
$$

有

$$
P\{\lim_{n\to\infty}D_n=0\}=1
$$

> *样本矩*可用经验分布函数计算.
>
> 样本矩是随机变量, 总体矩是数值

**定义** 二维总体 $(\xi,\eta)$ 的样本协方差

$$
S_{12}=\frac{1}{n}\sum_{i=1}^n(\xi_i-\bar{\xi})(\eta_i-\bar{\eta})
$$

样本相关系数

$$
R=\frac{S_{12}}{S_1S_2}
$$

**定理** 样本均值的精确分布

$$
\phi_{\bar{\xi}}(t)=\phi^n_\xi(\frac{t}{n})
$$

> 可处理小样问题

**定理** 顺序统计量 $\xi_{(i)}$ 的概率密度

![](https://img.duanyll.com/img/20230623174512.png)

所有顺序统计量 $(\xi_{(1)},\cdots,\xi_{(n)})$ 的联合概率密度

![](https://img.duanyll.com/img/20230623174637.png)

> 排序破坏了样本的独立性

**定理** 极差 $D_n^*=\xi_{(n)}-\xi_{(1)}$ 的概率密度

![](https://img.duanyll.com/img/20230623174806.png)

## 参数估计

**定义** 点估计: 总体 $\xi$ 的分布函数 $F(x;\theta)$ 中参数 $\theta$ 未知, $\theta\in\Omega$, 由样本 $\xi_1,\cdots,\xi_n$ 建立统计量 $T(\xi_1,\cdots,\xi_n)$ 将其统计值

$$
t=T(x_1,\cdots,x_n)
$$

作为 $\theta$ 的估计值, 称

$$
\hat{\theta}=T(\xi_1,\cdots,\xi_n)
$$

为 $\theta$ 的点估计量.

### 矩估计

- 用样本矩替换相应的总体矩
- 用样本矩的函数替换总体矩的同一函数

> 令总体矩等于样本矩

### 极大似然估计

最大可能性准则: 选取参数使得样本观测值出现的可能性最大

1. 构造似然函数 $L(x_1,\cdots,x_n;\theta_1,\cdots,\theta_l)$
   1. 离散型
      $$
      L=\prod_{i=1}^np(x_i;\theta_1,\cdots,\theta_l)
      $$
   2. 连续型
      $$
      L=\prod_{i=1}^nf(x_i;\theta_1,\cdots,\theta_l)
      $$
2. 方便起见, 取对数 $\ln L$
3. 求导
   $$
   \frac{\p\ln L}{\p\theta_i}=0
   $$
4. 解方程得到 $\theta_1,\cdots,\theta_l$ 的极大似然估计值

> 极大似然估计的结果可能与矩估计不同. 关键在于求出使得 $L$ 取最大值的参数, 不一定要取对数和求导

### 估计量的优良性

#### 无偏性

**定义** 无偏估计量

$$
E(\hat{\theta_n})=E(T(\theta_1,\cdots,\theta_n))=\theta
$$

> 没有系统误差

渐进无偏估计量

$$
\lim_{n\to\infty}b_n=\lim_{n\to\infty}(E(\hat{\theta_n})-\theta)=0
$$

1. 样本均值是总体均值 $E(\xi)$ 的无偏估计量
2. 样本方差 $S^2$ 是总体方差 $\sigma^2$ 的有偏估计量
3. 修正样本方差
   $$
   S^{*2}=\frac{1}{n-1}\sum_{i=1}^n(\xi_i-\bar{\xi})^2
   $$
   是总体方差 $\sigma^2$ 的无偏估计量
4. 已知总体均值 $\mu$, $\frac{1}{n}\sum_{i=1}^n(\xi_i-\mu)^2$ 是总体方差 $\sigma^2$ 的无偏估计量

{% folding open:true 说明 %}

样本方差 $S^2$ 是总体方差 $\sigma^2$ 的有偏估计量

$$
\begin{aligned}
    nS^2&=\sum_{i=1}^n(\xi_i-\bar{\xi})^2=\sum_{i=1}^n\xi_i^2-n\bar{\xi}^2\\
    nE(S^2)&=\sum_{i=1}^nE(\xi_i^2)-nE(\bar{\xi}^2)\\
    &=nE(\xi^2)-nE(\bar{\xi^2})\\
    &=n(D(\xi)+E(\xi)^2)-n(D(\bar{\xi})+E(\bar{\xi}))\\
    &=n(\sigma^2+a^2)-n(\frac{\sigma^2}{n}+a^2)\\
    &=(n-1)\sigma^2\\
    E(S^2)&=\frac{n-1}{n}\sigma^2
\end{aligned}
$$

{% endfolding %}

#### 有效性

**定义** 若同一参数的两个无偏估计量

$$
D(T_1)<D(T_2)
$$

称 $T_1$ 比 $T_2$ 更有效

> $\hat{\theta}$ 的取值在 $\theta$ 附近越密集越好

存在*最小方差无偏估计量*, 简称最优无偏估计量

**定理** $\hat{\theta}$ 是 $\theta$ 的无偏估计, $D(\hat{\theta})<\infty$, 是最有无偏估计量 $\iff\forall E(T_0)=0,D(T_0)<\infty$ 的统计量 $T_0$,

$$
E(\hat{\theta}\cdot T_0)=0
$$

> 正态总体样本均值是总体均值的最优无偏估计量, 修正样本方差是总体方差的最优无偏估计量

**定理** 最优无偏估计量在概率为 1 的意义下唯一.

#### 优效性

> 参数估计量的方差的下界

![](https://img.duanyll.com/img/20230623223406.png)

![](https://img.duanyll.com/img/20230623223417.png)

![](https://img.duanyll.com/img/20230623223438.png)

> 正态总体样本均值是总体均值的优效估计量, 修正样本方差是总体方差的渐进优效估计量

希望兼顾无偏性和有效性, 可使用 MSE

$$
E((\hat{\theta}-\theta)^2)
$$

#### 相合性

> 样本数量足够大时, 估计量稳定于真实值

**定义** 弱相合估计量 待估函数 $g(\theta)$ 的估计量 $\forall\epsilon>0$

$$
\lim_{n\to\infty}P\{|T(\xi_1,\cdots,\xi_n)-g(\theta)|<\epsilon\}=1
$$

**定义** 强相合估计量

$$
\lim_{n\to\infty}P\{T(\xi_1,\cdots,\xi_n)=g(\theta)\}=1
$$

### 区间估计

对于 $\theta$ 构造两个估计量 $\hat{\theta_1},\hat{\theta_2}$ 给定估计范围 $[\hat{\theta_1},\hat{\theta_2}]$

1. $P\{\hat{\theta_1}\leq\theta\leq\hat{\theta_2}\}$ 尽量大
2. $\hat{\theta_1}-\hat{\theta_2}$ 尽量小

奈曼-皮尔逊准则: 先确定能接受的可靠程度, 再尽量提高精确度.

**定义** 对未知参数的两个估计量 $T_1\leq T_2$, 若

$$
P\{\hat{\theta_1}\leq\theta\leq\hat{\theta_2}\}=1-\alpha
$$

称 $[T_1,T_2]$ 为 $\theta$ 置信度为 $1-\alpha$ 的区间估计

- 置信水平 $1-\alpha$
- 显著性水平 $\alpha$

> 随机区间 $[T_1,T_2]$ 以 $1-\alpha$ 的概率包含 $\theta$. $1-\alpha$ 反映了区间估计的可靠程度

枢轴变量法:

1. 选取待估参数 $\theta$ 的优良估计量 $\hat{\theta}$
2. 建立枢轴变量, 对选定的估计量构造函数
   $$
   W(\xi_1,\cdots,\xi_n,\hat{\theta},\theta)
   $$
   不包含其他任何参数, 可选用其他优良估计量替代位置参数, 替代参数后 $W$ 将具有不同的分布. 参考 [抽样分布定理](/source/wiki/prob/distributions.md#抽样分布定理).
3. 确定 $W$ 的分布. 通常构造 $W$ 使其具有经典分布
4. 根据 $W$ 的分布, 查上侧分位数使得
   $$
   P\{w_{1-\alpha/2}\leq W\leq w_{1+\alpha/2}\}=1-\alpha
   $$
   成立
5. 改写不等式得到
   $$
   P\{T_1\leq\theta\leq T_2\}=1-\alpha
   $$

## 假设检验

假设检验基本思想: 提出统计假设, 根据小概率事件原理用类似反证法的思想对其进行检验.

![假设检验的基本思路](https://img.duanyll.com/img/20230623233255.png)

![](https://img.duanyll.com/img/20230623233324.png)

参数假设检验

1. 提出待检验假设 $H_0,H_1$
2. 构造检验统计量. 说明, $H_0$ 为真时, 检验统计量服从某种分布. 参考 [抽样分布定理](/source/_posts/course/2023-6-24-Prob-4.md#抽样分布定理).
3. 计算本次抽样检验统计量观测值
4. 看观测值是否落入否定域, 作出判断
