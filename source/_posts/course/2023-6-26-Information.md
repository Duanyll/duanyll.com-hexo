---
title: 信息论速通
tags:
  - 信息论
---

## 计算

1. 信源熵
   1. 离散信源熵的性质
      1. 熵非负
      2. 熵对信源概率 $P(x_1\cdots x_n)$ 严格上凸. $\forall P_1,P_2$ 是概率测度
         $$
         H|_{P=\alpha P_1+(1-\alpha)P_2}>\alpha H|_{P=P_1}+(1-\alpha)H|_{P=P_2}
         $$
         <!-- 证明 -->
      3. 最大熵定理: 达到最大熵 $n\log N$ 时信源概率平均分布
         <!-- 证明 -->
   2. 连续信源差熵性质
      1. 不一定非负
      2. 仍满足严格上凸
      3. 最大熵定理: 限定均值为 $0$, 方差 (平均功率) 为 $P_1$, 最大差熵为
         $$
         \frac{n}{2}\log(2\pi eP_1)
         $$
         信源概率密度为正态分布
         $$
         p(x_1)=\frac{1}{\sqrt{2\pi P_1}}e^{-\frac{x^2_1}{2P_1}}
         $$
      <!-- 证明 -->
1. 无失真压缩编码
   1. 异前置码的克拉夫特不等式: 二元异前置码的码长 $l_k$ 满足
      $$
      \sum_{k=1}^{2^n}2^{-l_k}\leq 1
      $$
      表明具有渐进最优性
      <!-- 证明 -->
   2. 费诺码: 按概率从大到小排序, 尽量二分
   3. 霍夫曼码: 从小到大排序, 每次把最小的捏起来
2. 平均互信息
   1. 互信息量
      $$
      I(a;b)=I(a)-I(a|b)
      $$
   2. 噪声熵
      $$
      H(Y|X)=E(-\log P(Y|X))
      $$
   3. 损失熵
      $$
      H(X|Y)=E(-\log P(X|Y))
      $$
   4. 平均互信息
      $$
      \begin{aligned}
         I(X;Y)&=H(Y)-H(Y|X)\\
         &=H(X)-H(X|Y)\\
         &=H(X)+H(Y)-H(XY)
      \end{aligned}
      $$
      <!-- 证明 (Bayes) -->
   5. 离散平均互信息性质
      1. 对称
      2. 非负
      3. 对信源概率严格上凸
      4. 对信道转移概率严格下凸
   6. 连续平均互信息性质
      1. 对称
      2. 对信源概率严格上凸
      3. 对信道转移概率严格下凸
      4. 极值不一定存在
   7. 信道容量: 改变信源概率能取得的最大平均互信息
      1. $n$ 次拓展对称信道 (每一行都是 $q_1\cdots q_j$ 的排列)
         $$
         C_1=\log M+\sum_{j=1}^n q_j\log q_j
         $$
      2. $n$ 次拓展高斯信道: 加性高斯噪声, 平均功率 $N$
         $$
         C_1=\frac{1}{2}\log(1+\frac{P_1}{N_1})
         $$
      3. 采样定理: 不失真传输一条消息（$n$ 个符号）的最小时间, 带宽 $W$
         $$
         T=\frac{n}{2W}
         $$
      4. 香农公式: 单位时间的信道容量. $N_0$ 单边功率谱密度
         $$
         C_t=W\log(1+\frac{P}{N})=W\log(1+\frac{P}{WN_0})
         $$
         $$
         \lim_{W\to\infty}C_t=\frac{P}{N_0}\log e
         $$
3. 纠错编码
   1. 线性分组码
   2. 汉明码
4. 率失真函数
   1. 平均失真度: 失真度的数学期望
   2. 保真度准则: 平均失真度不大于允许失真
   3. 试验信道: 满足保真度准则的数据处理信道
   4. 率失真函数: 满足保真度准则, 改变试验信道, 能取得的最小平均互信息
   5. $n$ 次扩展等概率信源
      $$
      R(D_1)=\log N-D_1\log(N-1)-H(D_1)
      $$
      转移概率
      $$
      \begin{aligned}
         a&=1-D_1\\
         b&=\frac{D_1}{N-1}\\
         P(\hat{X}|X)=P(X|\hat{X})&=\begin{bmatrix}
            a & b & \cdots & b \\
            b & a & \cdots & b \\
            \vdots & \vdots & \ddots & \vdots \\
            b & b & \cdots & a
         \end{bmatrix}
      \end{aligned}
      $$
   6. $n$ 次扩展二元信源 $P(X)=(p,1-p)$
      $$
      R(D_1)=H(X)-H(D_1)
      $$
      $$
      P(X|\hat{X})=\begin{bmatrix}
         1-D_1 & D_1\\
         D_1 & 1-D_1
      \end{bmatrix}
      $$
      $$
      \begin{aligned}
         a&=\frac{(1-D_1)(p-D_1)}{p(1-2D_1)}\\
         b&=\frac{D_1(1-p-D_1)}{p(1-2D_1)}\\
         P(\hat{X}|X)&=\begin{bmatrix}
            a & b \\
            b & a
         \end{bmatrix}
      \end{aligned}
      $$
   7. $n$ 次扩展高斯信源: 取平方误差度.
      $$
      R(D_1)=\frac{1}{2}\log\frac{P_1}{D_1}
      $$
      $$
      p_{D_1}(x_1|\hat{x_1})=p_{D_1}(z_1)=\frac{1}{\sqrt{2\pi D_1}}e^{-\frac{z_1^2}{2D_1}}
      $$
      $$
      h(X_1|\hat{X_1})=\frac{1}{2}\log(2\pi e D_1)
      $$

![G711 Law A](https://cdn.duanyll.com/img/20230627123451.png)

## 证明

1. 熵对信源概率严格上凸
2. 马尔科夫信源 $H(X_1\cdots X_n)\leq nH(X_1)$
3. 高斯信源熵最大
4. 香农第一定理
   1. 渐进均分性 (弱大数定理): 典型序列的码率接近熵率
   2. 典型序列的概率足够大
   3. 典型序列的数量足够多
   4. 译码错误概率足够低
5. 克拉夫特不等式证明异前置码渐进最优
6. 互信息量对称 (贝叶斯公式)
7. 香农第二定理