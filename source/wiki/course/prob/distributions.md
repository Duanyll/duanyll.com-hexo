---
title: 概统速通 - 分布
layout: wiki
wiki: notes
order: 704
---

## 0-1 分布

- **背景** 贝努利实验 只有两个基本事件 $P(A)=P,P(\bar{A})=1-p$
- **分布列**
  $$
  \begin{array}{c|cc}
    x_i & 0 & 1 \\
    \hline
    P\{\xi=x_i\} & 1-p & p
  \end{array}
  $$
- **特征函数**
  $$
  \phi(t)=(1-p)e^{jt\cdot 0}+pe^{jt\cdot 1}=(1-p)+pe^{jt}
  $$

## 二项分布

$$
\xi\sim B(n,p)
$$

- **背景** $n$ 次独立重复实验 (将贝努利实验独立重复 $n$ 次) 中事件 $A$ 发生次数
  - 每次实验的条件不变
  - 各次实验的结果互不影响
- **分布列**
  $$
  P(\xi=k)=C_n^kp^k(1-p)^{n-k},k=0,1,\cdots,n
  $$
- **极限分布**
  - [泊松分布](#泊松分布): $n>50,np<5$ 时, 认为 $\lambda\approx np$
  - [正态分布](#正态分布): $np\geq5,np(1-p)\geq5$
- **最大可能值**
  $$
  k_0=\begin{cases}
    (n+1)p,(n+1)p-1&(n+1)p\in\mathbb{Z}\\
    [(n+1)p]&\text{otherwise}
  \end{cases}
  $$
- **数学期望**
  $$
  E(\xi)=np
  $$
- **方差**
  $$
  D(\xi)=np(1-p)
  $$
- **特征函数**
  $$
  \phi(t)=(1-p+pe^{jt})^n
  $$
- **可加性**

## 泊松分布

$$
\xi\sim P(\lambda)
$$

- **背景** 将一长段区间分为 $n$ 段, 求 $n\to\infty$ 时, 区间内事件发生次数
  1. 每一段区间内, 恰好发生一次事件的概率与区间长度称正比
  2. 每一段区间内, 发生两次以上事件是不可能事件
  3. 各段时间内发生事件是独立的
- **分布列**
  $$
  P\{\xi=k\}=\frac{\lambda^k}{k!}e^{-\lambda},k=1,2,\cdots
  $$
- **最大可能值**
  $$
  k_0=\begin{cases}
    \lambda,\lambda+1 & \lambda\in\mathbb{Z}\\
    [\lambda] & \text{otherwise}
  \end{cases}
  $$
- **数学期望**
  $$
  E(\xi)=\lambda
  $$
- **方差**
  $$
  D(\xi)=\lambda
  $$
- **特征函数**
  $$
  \phi(t)=e^{\lambda(e^{jt}-1)}
  $$
- **可加性**

## 超几何分布

- **背景** 分类取球问题 $N$ 个球, $M$ 个红球, $N-M$ 个白球, 不放回地取出 $n$ 个球, 红球个数 $\xi$
- **分布列**
  $$
  P\{\xi=m\}=\frac{C_M^mC_{N-M}^{n-m}}{C_N^n},m=0,1,\cdots,\min(n,M)
  $$

## 几何分布

- **背景** 持续进行独立重复试验, 直到发生一次事件 $A$ 经过的实验次数
- **分布列**
  $$
  P\{\xi=k\}=p(1-p)^{k-1},k=1,2,\cdots
  $$

## 负二项分布

- **背景** 持续进行独立重复试验, 直到总共发生 $r$ 次事件 $A$ 经过的实验次数
- **分布列** 
  $$
  P\{\xi=k\}=C_{k-1}^{r-1}p^r(1-p)^{k-r},k=r,r+1,\cdots
  $$

## 均匀分布

$$
\xi\sim U(a,b)
$$

- **背景** 随机变量 $\xi$ 落在 $(a,b)$ 的子区间的概率与子区间位置无关, 仅与其测度 (即长度) 成正比。
- **概率密度**
  $$
  f(x)=\begin{cases}
    \frac{1}{b-a} & a<x<b\\
    0 & \text{otherwise}
  \end{cases}
  $$
- **数学期望**
  $$
  E(\xi)=\frac{a+b}{2}
  $$
- **方差**
  $$
  D(\xi)=\frac{(b-a)^2}{12}
  $$
- **特征函数** $\xi\sim U(-a,a)$
  $$
  \phi(t)=\operatorname{sinc}(at)=\frac{\sin at}{at}
  $$

## 指数分布

![概率密度](https://cdn.duanyll.com/img/20230624152742.png)

$$
\xi\sim E(\lambda)
$$

- **背景** 灯泡寿命问题 满足无后效性
  $$
  P\{x>t+s|x>s\}=P\{x>t\}
  $$
    - $\lambda$ 的含义为失效率
- **概率密度**
  $$
  f(x)=\begin{cases}
    \lambda e^{-\lambda x} & x>0\\
    0 & \text{otherwise}
  \end{cases}
  $$
- **数学期望**
  $$
  E(\xi)=\lambda^{-1}
  $$
- **方差**
  $$
  D(\xi)=\frac{1}{\sqrt{\lambda}}
  $$
- **特征函数**
  $$
  \phi(t)=\int_{0}^{+\infty}\lambda e^{jtx}e^{-\lambda x}\d x=\frac{\lambda}{\lambda-jt}
  $$

## 正态分布

$$
\xi\sim N(\mu,\sigma^2)
$$

- **背景** *万恶之源*
- **概率密度**
  $$
  \phi(x)=\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}},x\in\R
  $$
  - 标准正态分布 $N(0,1)$
    $$
    \phi(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}},x\in\R
    $$
- **数学期望**
  $$
  E(\xi)=\mu
  $$
- **方差**
  $$
  D(\xi)=\sigma^2
  $$
- **线性性**
  $$
  a\xi+b\sim N(a\mu+b,a^2\sigma^2)
  $$
- **可加性** $\xi\sim N(\mu_1,\sigma_1^2),\eta\sim N(\mu_2,\sigma_2^2)$ 相互独立
  $$
  \xi+\eta\sim N(m_1+m_2,\sigma_1^2+\sigma_2^2)
  $$
- 特征函数
  $$
  \phi(t)=e^{j\mu t-\frac{1}{2}\sigma^2t^2}
  $$
  - 标准正态分布
    $$
    \phi(t)=e^{-\frac{1}{2}t^2}
    $$
- $k$ 阶矩
  $$
  E((\xi-\mu)^k)=\begin{cases}
    0 & k=2n+1\\
    1\cdot3\cdot5\cdots(k-1)\sigma^k&k=2n
  \end{cases}
  $$
- **上侧分位数**
  $$
  P\{\xi>u_\alpha(\alpha)\}=\int_{u_\alpha}^{+\infty}f(x)\d x=\alpha,0<\alpha<1
  $$
  $$
  \Phi(u_\alpha)=1-\alpha
  $$
  ![](https://cdn.duanyll.com/img/20230624175944.png)

### 二维正态分布

$$
(\xi,\eta)\sim N(m_1,\sigma_1^2;m_2,\sigma_2^2;r)
$$

- **联合概率密度**
  ![](https://cdn.duanyll.com/img/20230624162055.png)
  - 边缘概率密度服从一维正态分布
  - $\xi$ 和 $\eta$ 相互独立 $\iff$ 不相关 $\iff r=0$
    $$
    \Cov(\xi,\eta)=r\sigma_1\sigma_2,\rho_{\xi\eta}=r
    $$

### 多维正态分布

$$
X\sim N(M,\Sigma)
$$

- **联合概率密度** 协方差矩阵 $\Sigma$ 是实对称正定矩阵, $M$ 是均值向量
  $$
  \phi(X)=\frac{1}{(2\pi)^{\frac{n}{2}}|\Sigma|^\frac{1}{2}}\exp\left(-\frac{1}{2}(X-M)^\top\Sigma^{-1}(X-M)\right)
  $$
  - 多维正态分布的边缘分布仍是正态分布
  - 多维随机变量服从正态分布 $\iff$ 任意线性组合服从正态分布
  - 线性变换
    $$
    Y=CX\sim N(CM,C\Sigma C^{\top})
    $$
  - 所有分量相互独立 $\iff$ 所有分量两两不相关 $\iff$ $\Sigma$ 是对角矩阵
- 特征函数
  $$
  \phi(T)=\exp\left(jM^\top T-\frac{1}{2}T^\top\Sigma T\right)
  $$

## Gamma 分布

![概率密度](https://cdn.duanyll.com/img/20230624152946.png)

$$
\xi\sim\Gamma(\alpha,\beta)
$$

- **概率密度**
  $$
  f(x)=\begin{cases}
    \frac{1}{\beta^{\alpha+1}\Gamma(\alpha+1)}x^{\alpha}e^{-\frac{x}{\beta}}&x>0\\
    0&\text{otherwise}
  \end{cases}
  $$
  $$
  \Gamma(\alpha)=\int_0^{+\infty}x^{\alpha-1}e^{-x}\d x=2\int_0^{+\infty}y^{2\alpha-1}e^{-y^2}\d y
  $$
  Gamma 函数满足
  - $$
    \Gamma(\alpha)=(\alpha-1)\Gamma(\alpha-1)
    $$
  - $$
    \Gamma(\frac{1}{2})=\int_0^{+\infty}x^{-\frac{1}{2}}e^{-x}\d x=2\int_{0}^{+\infty}e^{-x^2}\d x=\sqrt{\pi}
    $$
  - $$
    \Gamma(n)=(n-1)\Gamma(n-1)=\cdots=(n-1)!
    $$
- 数学期望
  $$
  E(\xi)=\frac{\alpha}{\beta}
  $$
- **可加性**

## 对数正态分布

- **概率密度**
  $$
  f(x)=\begin{cases}
    \frac{\lg e}{\sqrt{2\pi}\sigma x}e^{-\frac{1}{2}(\frac{\lg x-\mu}{\sigma})^2} & x>0\\
    0& \text{otherwise}
  \end{cases}
  $$
- **数学期望**
  $$
  E(\xi)=10^{\mu+\frac{\sigma^2}{2}\cdot\ln10}
  $$

## Chi-Square 分布

![概率密度](https://cdn.duanyll.com/img/20230624175527.png)

$$
\chi^2\sim\chi^2(n)
$$ 

- **背景** $n$ 个独立标准正态分布随机变量的和服从 $\chi^2$ 分布
  $$
  \chi^2=\sum_{i=1}^n\xi_i^2\sim\chi^2(n)
  $$
- **概率密度** $n$ 自由度
  $$
  f(x)=\begin{cases}
    \frac{1}{2\Gamma(\frac{n}{2})}(\frac{x}{2})^{\frac{n}{2}-1}e^{-\frac{x}{2}}&x>0\\
    0&\text{otherwise}
  \end{cases}
  $$
- **数学期望**
  $$
  E(\chi^2)=n
  $$
- **方差**
  $$
  D(\chi^2)=2n
  $$
- **可加性** $\eta_1\sim\chi^2(n_1),\eta_2\sim\chi^2(n_2)$
  $$
  \eta_1+\eta_2\sim\chi^2(n_1+n_2)
  $$
- **上侧分位数** 
  $$
  P\{\chi^2>\chi_\alpha^2(n)\}=\int_{\chi^2_\alpha(n)}^{+\infty}f_{\chi^2}(x)\d x=\alpha,0<\alpha<1
  $$
  $n>45$ 时近似认为
  $$
  \chi_\alpha^2(n)\approx n+u_\alpha(\sqrt{2n})
  $$
  ![](https://cdn.duanyll.com/img/20230624180021.png)

## Student-T 分布

![概率密度](https://cdn.duanyll.com/img/20230624180519.png)

$$
T\sim t(n)
$$

- **背景** 独立的标准正态分布变量 $\xi\sim N(0,1)$ 和自由度 $n$ 的 Chi-Square 变量
  $$
  T=\frac{\xi}{\sqrt{\eta/n}}\sim t(n)
  $$
- **概率密度函数**
  $$
  f(x)=\frac{\Gamma(\frac{n+1}{2})}{\sqrt{n\pi}\Gamma(\frac{n}{2})}(1+\frac{x^2}{n})^{-\frac{n+1}{2}},x\in\R
  $$
- **上侧分位数**
  $$
  P\{T>t_\alpha(n)\}=\int_{t_\alpha(n)}^{+\infty}f_T(x)\d x=\alpha,0<\alpha<1
  $$
  $n>30$ 时, 近似认为
  $$
  t_\alpha(n)\approx u_\alpha
  $$
  ![](https://cdn.duanyll.com/img/20230624180742.png)

## F 分布

![概率密度](https://cdn.duanyll.com/img/20230624181727.png)

$$
F\sim F(n_1,n_2)
$$

- **背景** 独立卡方随机变量的比值 $\xi\sim\chi^2(n_1),\eta\sim\chi^2(n_2)$
  $$
  F=\frac{\xi/n_1}{\eta/n_2}\sim F(n_1,n_2)
  $$
- **概率密度函数**
  ![](https://cdn.duanyll.com/img/20230624181803.png)

{% folding open:true 说明 %}

## 抽样分布定理

**定理** 正态总体 $\xi\sim N(a,\sigma^2)$ 的样本 $\xi_1,\cdots,\xi_n$, 样本均值 $\bar{\xi}$, 样本方差 $S^2$

- $\bar{\xi}$ 与 $S^2$ 相互独立
- 样本均值, 总体均值, 总体方差
  $$
  \frac{\bar{\xi}-a}{\sigma/\sqrt{n}}\sim N(0,1)
  $$
- 样本方差, 总体方差
  $$
  \frac{nS^2}{\sigma^2}\sim\chi^2(n-1)
  $$
- 样本均值, 样本方差
  $$
  \frac{\bar{\xi}-a}{S/\sqrt{n-1}}\sim t(n-1)
  $$

**定理** 正态总体 $\xi\sim N(a_1,\sigma_1^2),\eta\sim N(a_2,\sigma_2^2)$. 

- 样本方差之比
  $$
  F=\frac{S_1^{*2}/\sigma_1^2}{S_2^{*2}/\sigma_2^2}\sim F(n_1-1,n_2-1)
  $$
- 样本均值之差和样本方差: 若 $\sigma_1^2=\sigma_2^2$
  $$
  T=\frac{(\bar{\xi}-\bar{\eta})-(a_1-a_2)}{S_w\sqrt{\frac{1}{n_1}+\frac{1}{n_2}}}\sim t(n_1+n_2-2)
  $$
  其中
  $$
  S_w=\sqrt{\frac{n_1S_1^2+n_2S_2^2}{n_1+n_2-2}}
  $$

{% endfolding %}