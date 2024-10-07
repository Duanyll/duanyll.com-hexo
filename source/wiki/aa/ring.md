---
title: 抽象代数速通 - 环和域
layout: wiki
wiki: notes-aa
order: 802
references:
  - >-
    [近世代数答案](https://mp.weixin.qq.com/s?__biz=Mzk0NzMyNDg0Mg==&mid=2247484131&idx=6&sn=5549ee6c9158b0831a24ea854a04239e&chksm=c379d026f40e5930cf670d55dd2a525dce38dd6c0c411a6ff9d440e7fd0d46dd6e39d969b93c&scene=27)
---

## 环的基本概念

1. **环**: $R$ 是非空集合, 在 $R$ 上定义了两种二元运算, 加法和乘法满足
   1. $R$ 对加法运算构成交换群
   2. $R$ 对乘法运算满足结合律 $(ab)c=a(bc)$
   3. 乘法对加法满足左右分配率 $a(b+c)=ab+ac,(b+c)a=ba+ca$
2. **幺环**: 若 $\exist 1_R\in R\suchthat\forall a\in R,1_R\cdot a=a\cdot 1_R=a$ 则称 $1_R$ 是 $R$ 的乘法单位元.
   - 若有 $1_R=0_R$, 则必有 $\forall a\in R,a=0_R$. 默认 $1_R\neq 0_R$
   - 具有乘法单位元的环称为幺环
   - 设 $R$ 是一个幺环. 在 $R$ 中乘法可逆的元素构成 $U(R)=\{a\in R|\exist b\in R\suchthat ab=ba=1_R\}$ 则 $U(R)$ 是 $R$ 的一个乘法子群, 称为 $R$ 的*单位群*, _可逆元称为单位_
   - 若乘法具有交换律, 则称为交换环
3. 性质:
   1. $a\cdot 0=0\cdot a=0$
   2. $-(-a)=a$
   3. $a\cdot(-b)=(-a)\cdot b=-ab$
   4. $(-a)(-b)=-ab$
4. **子环**: 环的非空子集 $S$ 对 $R$ 中运算也构成环
5. **子环判别定理** $S$ 是环 $R$ 的非空子集, 则 $S$ 是 $R$ 的子环 $\iff$ $\forall a,b\in S,a-b,ab\in S$
6. **定理** $\Z$ 的子环均形如 $d\Z=\{dz|z\in\Z\},d\in\N$
7. 幺环的子环可能是幺环, 单位元可能不同

> 证明是环
>
> 1. 加法封闭
> 2. 乘法封闭
> 3. 加法结合律
> 4. 加法交换律
> 5. 零元
> 6. 负元
> 7. 乘法结合律
> 8. 乘法左右分配率
> 9. (乘法单位元 $\implies$ 幺环)
> 10. (乘法交换律 $\implies$ 交换环)
>
> 证明子环: 关于减法, 乘法封闭

![](https://img.duanyll.com/img/20231222153500.png)

## 整环, 域和除环

1. **左右零因子** 设 $R$ 是环, 非零元 $a,b$ 满足 $ab=0$, 则 $a$ 是 $R$ 的左零因子, $b$ 是右零因子, 统称为零因子 (只要和任意非零元相乘为零就是零因子)
2. **定理** 无零因子环 $\iff$ 成立消去律 ($ac=bc\implies a=b$)
3. **整环** 无零因子的交换幺环
4. **域** 两种等价的定义
   1. $(F,+,\cdot)$ 构成整环, 且非零元素构成乘法群
   2. $F$ 中定义了加法运算, 乘法运算
      1. $(F,+)$ 是交换群
      2. $F-\{0\}$ 对乘法是交换群
      3. 满足乘法结合律, 分配率
   3. 对于 $\mathbb{Q}[a]$ 的形式证明构成域, 需说明交换幺环, 对乘法封闭, 乘法交换律, 结合律, 幺元, 需要说明对求逆封闭.
5. **域中的除法** $\forall a\in F, 0\neq b\in F$, 规定 $\frac{a}{b}\triangleq ab^{-1}$ 则满足
   1. $\frac{a}{b}=\frac{c}{d}\iff ad=bc$
   2. $\frac{a}{b}+\frac{c}{d}=\frac{ad+bc}{bd}$
   3. $\frac{a}{b}\cdot\frac{c}{d}=\frac{ac}{bd}$
   4. $\frac{a}{b}\div\frac{c}{d}=\frac{ad}{bc}$
6. **除环** $R$ 是幺环且 $R^*$ 构成群, 则称 $R$ 是除环. 交换的除环即为域.
7. 四元数除环是典型的非交换除环.
   $$
   H=\left\{\begin{pmatrix}
      \alpha & \beta\\
      -\conj{\beta} & \conj{\alpha}
   \end{pmatrix}\middle|\alpha,\beta\in\mathbb{C} \right\}
   $$

![有点暴力](https://img.duanyll.com/img/20231222154056.png)

![不用把逆元的形式求出来](https://img.duanyll.com/img/20231222153415.png)

> 证明整环可说明
>
> 1. 是常见域 (整环) 的子环 ($a-b,ab$ 封闭)
> 2. 域 (整环) 中无零因子
> 3. 包含单位元

**定理** 有限整环都是域

![证明有限整环都是域](https://img.duanyll.com/img/20231222160139.png)

![](https://img.duanyll.com/img/20231222160245.png)

## 理想和商环

1. **理想** 环 $R$ 的非空子集 $I$ 满足 $\forall a,b\in I,\forall r\in R$
   1. $a-b\in I$
   2. $ar,ra\in I$
2. **理想的交与和** 设 $I,J$ 是环 $R$ 的理想
   1. $I\cap J$ 是 $R$ 的理想
   2. $I+J=\{a+b|a\in I,b\in J\}$ 是 $R$ 的理想
   3. 环 $R$ 的有限多个理想的交仍为理想
3. 交换幺环 $R$ 中元素生成的理想
   $$
   \langle a\rangle=\{ra|r\in R\},\langle a,b\rangle=\{ra+sb|r,s\in R\}
   $$
   即 $a,b$ 做所有 $R$ - 线性组合
4. **主理想** 由单个元素生成的理想
5. **主理想整环** Principle Ideal Domain 任意理想都是主理想的整环

   1. $\Z$ 是 PID
   2. $m\in\N^*\implies m\Z$ 是 PID
   3. $F$ 是域 $\implies$ $F[x]$ 是 PID

      ![](https://img.duanyll.com/img/20231222171355.png)

6. **商环** $R$ 是环, $I$ 是 $R$ 的主理想, 则对于加法 $I\lhd R$, 在加法商群 $R/I=\{a+I|a\in R\}$ 有加法运算
   $$
   (a+I)+(b+I)\triangleq ab+I
   $$
   同时规定乘法
   $$
   (a+I)(b+I)=ab+i
   $$
   则可证明 $R/I$ 关于以上两种运算构成环, 且 $R/I$ 是加法交换群

## 环同态

1. **环同态** 映射 $\sigma:R_1\to R_2$ 满足
   $$
   \sigma(a+b)=\sigma(a)+\sigma(b),\sigma(ab)=\sigma(a)\cdot\sigma(b)
   $$
   可定义单同态, 满同态, 环同构.
2. **环同态核** $\ker\sigma=\{a\in R_1|\sigma(a)=0_2\}$ 也是加群之间的群同态核.
   1. $\ker\sigma\leq(R_1,+)$
   2. $\ker\sigma$ 是 $R_1$ 的一个理想
3. **性质**
   1. $\sigma(0_1)=0_2$
   2. $\sigma(na)=n\sigma(a)$
   3. $\sigma(a^n)=(\sigma(a))^n$
4. **定理** 幺环 $R_1,R_2$, $\sigma:R_1\to R_2$ 是环同态
   1. $\sigma$ 满射 $\implies\sigma(1_1)=1_2$
   2. $R_2$ 无零因子, $\sigma(e_1)\neq 0\implies \sigma(e_1)=e_2$
   3. 若 $\sigma(1_1)=1_2$ 则 $u$ 是 $R_1$ 中的单位 $\implies$ $\sigma(u)$ 是 $R_2$ 中单位且 $(\phi(u))^{-1}=\phi(u^{-1})$
5. **环同构基本定理** 设 $\sigma:R\to R'$ 是满同态, 则有环同构
   $$
   \tilde{\sigma}:R/\ker\sigma\cong R'
   $$
   - **环的第一同构定理** $\phi:R\to R'$ 的环同态, 有环同构
     $$
     \bar{\phi}:R/\ker\phi\cong\phi(R)
     $$
   - **环的第二同构定理** $S$ 是 $R$ 的子环, $I$ 是 $R$ 的理想, 则 $S\cap I$ 是 S 的理想且有环同构
     $$
     S/(S\cap I)\cong(S+I)/I
     $$
   - **环的第三同构定理** $I$ 和 $J$ 是 $R$ 的理想, $I\subseteq J$, 则 $J/I$ 是 $R/I$ 的理想且有环同构
     $$
     (R/I)\big/(J/I)\cong R/J
     $$
6. **环的扩张定理** 设环 $\bar{S}$ 与 $R$ 无交集. $\bar{\phi}:\bar{S}\to R$ 是单同态, 则存在一个与环 $R$ 同构的环 $S$ 以及环同构 $\phi:S\to R$ 满足 $\bar{S}$ 是 $S$ 的子环且 $\phi/\bar{S}=\bar{\phi}$

## 素理想与极大理想

1. 在整数环 $\Z$ 中, 考虑素数 $p$ 生成的理想 $p\Z$
   $$
   ab\in P\iff p|ab\iff p|a\;\mathrm{or}\;p|b\iff a\in P\;\mathrm{or}\;b\in P
   $$
   在交换环 $R$ 中, 理想 $I$ 满足什么条件使得 $R/I$ 是整环或域
2. **素理想** 设 $P$ 是交换环的真理想, 满足 $ab\in P\iff a\in P$ 或 $b\in P$
3. **定理** 设 $R$ 是交换幺环 ($1_R\neq 0$), $I$ 是 $R$ 的理想, 则 $I$ 是 $R$ 的素理想 $\iff$ $R/I=\{a+I|a\in R\}$ 是整环

   ![](https://img.duanyll.com/img/20231222220312.png)

4. **推论** $\Z_n=\Z/\langle n\rangle$ 是整环 $\iff$ $n$ 是素数或零
5. **极大理想** 设 $M$ 是交换环 $R$ 的一个真理想, 若 $R$ 中不存在真包含于 $M$ 的真理想 $\iff$ $M\subseteq I\subseteq R \impliedby I=M$ 或 $I=R$ 则称 $M$ 是环 $R$ 的一个极大理想

   ![](https://img.duanyll.com/img/20231222221213.png)

6. **定理** 构成有限域的基本方法. 设 $I$ 是交换幺环的一个理想, 则 $I$ 是 $R$ 的极大理想 $\iff$ $R/I$ 是域.

   ![](https://img.duanyll.com/img/20231222222438.png)

7. **推论** 交换幺环的极大理想是素理想

> 证明极大理想的常见套路
>
> 1. 先说明 $I$ 是真理想
> 2. 假设 $\exist J\subsetneqq R,I\subsetneqq J$, 则 $\exist x\in J,x\notin I$
> 3. 由加减法, 乘法的封闭性得到 $1_R\in J\implies J=R$

![](https://img.duanyll.com/img/20231222222413.png)

## 特征

1. **特征** 含乘法幺元的环,
   - 若 $1_R$ 的加法阶为 $+\infty$ 则 $\operatorname{char}R=0$
   - 若 $1_R$ 的加法阶为 $n$ 则 $\operatorname{char}R=n$
2. **定理** 整环 (域) 的特征是零或素数
3. **定理** 交换幺环 $R$, $\operatorname{char}R=0$ 则 $\phi:\Z\to R,n\mapsto n1_R$ 是环的单同态, $\Z$ 可视为 $R$ 的子环
4. **推论** 交换幺环 $R$
   - $\operatorname{char}R=0$ $\implies$ $R$ 有一个子环 $\{n1_R|n\in\Z\}$ 与 $\Z$ 同构
   - $\operatorname{char}R=n>0$ $\implies$ $R$ 有一个子环 $\{n1_R|n\in\Z\}$ 与 $\Z_n$ 同构
5. **定理** $F$ 是域
   - $\operatorname{char}F=0$ $\implies$ $\sigma:\mathbb{Q}\to F,\frac{n}{m}\mapsto n1_F(m1_F)^{-1}$ 是单同态, $\mathbb{Q}$ 可视为 $F$ 的子域
   - $\operatorname{char}F=p$ 是素数 $\implies$ $\sigma:\Z_p\to F,\bar{a}\mapsto\bar{a}1_F$ 是单同态, $\Z_p$ 可视为 $F$ 的子域
6. **素域** 不含真子域的域
   - 素域 $\operatorname{char}F=0\implies F\cong\mathbb{Q}$
   - 素域 $\operatorname{char}F=p\implies F\cong\Z_p$
7. **域的素子域** 由 $1_F$ 在 $F$ 中生成的域
   - $\operatorname{char}F=0\implies \langle 1_F \rangle\cong\mathbb{Q}$
   - $\operatorname{char}F=p\implies \langle 1_F \rangle\cong\Z_p$
8. 若 $F$ 是有限域
   - $\implies\operatorname{char}F$ 为素数 $p$
   - $\implies\Z_p$ 可视为 $F$ 子域
   - $\implies F$ 可视为 $\Z_p$ 上的一个 $n$ 维 $\Z_p$ - 线性空间
   - $\implies F$ 是 $p^n$ 元有限域
   - $\implies F^*=F-\{0\}$ 是 $p^n-1$ 阶循环群

## 多项式环

1. **未定元** 设 $R$ 是有单位元的环, $\bar{R}$ 是 $R$ 的扩环. $x\in\bar{R}$ 满足
   1. $\forall r\in R,xr=rx$
   2. $1x=x$
   3. $\forall 0\neq a_0,a_1,\cdots,a_n\in R$ 有
      $$
      f(x)=a_0+a_1x+1_2x^2+\cdots+a_nx^n\neq 0
      $$
2. **定义** 对任意有单位元的环, 一定存在一个未定元 $x$. 构造集合
   $$
   \bar{S}=\{(a_0,a_1,\cdots,a_n,\cdots)|a_0,\cdots,a_n,\cdots\in R\}
   $$
   规定 $\bar{S}$ 上的加法和乘法
   $$
   \alpha+\beta=(a_0+b_0,\cdots,a_n+b_n,\cdots)
   $$
   $$
   \alpha\cdot\beta=(c_0,\cdots,c_n,\cdots),c_k=\sum_{i+j=k}a_ib_j
   $$
   则 $\bar{S}$ 构成有单位元的环, 单位元为
   $$
   \bar{1}=(1,0,0,0,\cdots)
   $$
   取 $\bar{S}$ 的子环 $S$ 与 $R$ 同构
   $$
   S=\{\bar{r}=(r,0,0,0,\cdots)|r\in R\}
   $$
   未定元
   $$
   \bar{x}=(0,1,0,0,\cdots)
   $$
   满足以上三条定义, 且
   $$
   \bar{x}^n=(\underbrace{0,\cdots,0}_{n\ \mathrm{zeros}},1,0,0,\cdots)
   $$
   由环的扩张定理, 单同态 $\phi:R\to\bar{S},r\mapsto(r,0,0,0,\cdots)$, 知存在 $R$ 的扩环 $\bar{R}$ 中存在未定元
3. **一元多项式** 形如
   $$
   f(x)=a_0+a_1x+a_2x^2+\cdots a_nx^n
   $$
   的表达式, $R[x]$ 构成多项式环

## 整环的商域

使用由整数构造分数类似的方法, 将整环扩充成一个域. 记 $D$ 是整环, $1$ 是单位元.

1. 构造集合 $S$
   $$
   S=\{(a,b)|a,b\in D,b\neq 0\}
   $$
2. 定义 $S$ 上等价关系
   $$
   (a,b)\sim(c,d)\iff ad=bc
   $$
   容易验证反身性, 对称性, 传递性 (整环上成立消去律)
3. 由等价关系得到商集 $F$, $(a,b)$ 所在的等价类
   $$
   \left[\frac{a}{b}\right]=\{(c,d)\in S|(c,d)\sim(a,b)\}
   $$
   划分得到商集
   $$
   F=S/\sim=\left\{\left[\frac{a}{b}\right]\middle|a,b,\in D,n\neq 0\right\}
   $$
   $$
   \left[\frac{a}{b}\right]=\left[\frac{c}{d}\right]\iff ad=bc
   $$
4. 规定代数运算
   $$
   \left[\frac{a}{b}\right]+\left[\frac{c}{d}\right]=\left[\frac{ad+bc}{bd}\right]\\
   \left[\frac{a}{b}\right]\cdot\left[\frac{c}{d}\right]=\left[\frac{ac}{bd}\right]
   $$
   验证运算良定 (与代表元选取无关)
5. 验证 $F$ 对加法和乘法构成域
   1. 验证加法结合律, 乘法结合律
   2. 验证加法交换律, 乘法交换律
   3. 验证乘法对加法分配率
   4. $F$ 的零元 $0_F=\left[\frac{0}{1}\right]$
   5. $F$ 的单位元 $1_F=\left[\frac{1}{1}\right]$
   6. $\forall\left[\frac{a}{b}\right]\in F$ 有负元 $\left[\frac{-a}{b}\right]$
   7. $\forall\left[\frac{a}{b}\right]\neq 0_F$ 有逆元 $\left[\frac{b}{a}\right]$
6. 由 $F$ 构造包含 $D$ 的域, 取映射 $\phi:D\to F,x\mapsto\left[\frac{x}{1}\right]$
   1. $\phi$ 是单射
   2. $\phi$ 是同态映射
   3. 由环的扩张定理知存在 $D$ 的扩环 $Q$ 与 $F$ 同构
   4. $Q$ 中每个元素都可表示为 $ab^{-1},a,b\in D,b\neq 0$ 的形式
   5. 称 $Q$ 为整环 $D$ 的商域

## 惟一分解整环

1. 约定 $D$ 是整环, $F$ 是 $D$ 的商域, $U$ 是 $D$ 的单位群
2. $D$ 上整除的概念和基本性质
   1. $a|b\implies\forall u\in U,au|b$
   2. $a|b,a|c\implies a|bx+cy$
   3. $a|b,b|c\implies a|c$
   4. $a|b$ 且 $b|a$ $\implies$ $\exists u,v\in D\suchthat b=au,a=bv=auv\implies uv=1$
3. **相伴** $a,b\in D$ 且 $a|b,b|a$ 则称 $a,b$ 相伴, 记作 $a\sim b$
   - $a\in D$ 的**平凡因子** 单位和与 $a$ 相伴的因子
   - $a$ 的**真因子** $b|a$ 且 $b$ 不是 $a$ 的平凡因子
     $$
     a\sim b\iff\langle a\rangle=\langle b\rangle\iff \exist u\in U,a=bu
     $$
4. **整环上的不可约元** 非零, 非单位, 无真因子
5. **素元** 非零, 非单位, $p\in D$ 且 $p|ab\implies p|a$ 或 $p|b$
6. **定理** 在整环上, 素元都是不可约元
7. **环上范数** 设整数 $d\neq0,1$ 且无平方因子 $\not\exist p\suchthat p^2|d$, 对于以下整环
   $$
   D=\Z[\sqrt{d}]=\{a+b\sqrt{d}|a,b\in\Z\},d<0
   $$
   规定该整环上的一个函数 $N$ 为环上范数
   $$
   \begin{aligned}
      N:\Z[\sqrt{d}]&\to\N\cup\{0\}\\
      a+b\sqrt{d}&\mapsto |a^2-db^2|,\forall a,b\in\Z
   \end{aligned}
   $$
   满足以下性质
   1. $N(\alpha\beta)=N(\alpha)N(\beta)$
   2. 在 $D$ 中 $\alpha|\beta$ $\implies$ 在 $\Z$ 中 $N(\alpha)|N(\beta)$
   3. $\alpha\in D$ 是单位 $\iff$ $N(\alpha)=1$
8. 设 $a$ 是整环 $D$ 中非零单位元, 则以下条件等价
   - $a$ 不可约 ($a$ 没有真因子)
   - $b|a\implies b\in U$ 或者 $\exist u\in U,b=au$
   - $b|a\implies b\sim 1$ 或者 $b\sim a$
   - $a=bc\implies b\sim 1$ 或者 $c\sim 1$
   - $a=bc\implies b\sim a$ 或者 $c\sim a$
9. **惟一分解整环** 设 $D$ 是整环, $a\in D$ 非零非单位
   1. 存在不可约元 $p_1,\cdots,p_s\in D\suchthat a=p_1p_2\cdots p_s$, 则称 $a$ 有一个不可约分解式
   2. 若 $a$ 的不可约分解式在相伴意义下唯一
   3. 若 $D$ 中任意非零非单位元均有唯一的不可约分解式
      则称 $D$ 是一个惟一分解整环 UFD
10. **定理** $D$ 是 UFD, 则 $p$ 不可约 $\implies$ $p$ 是素元

    ![](https://img.duanyll.com/img/20231224202557.png)

11. **整环中的真因子链** $a_1,a_2,\cdots,a_n,\cdots$, $a_{i-1}$ 是 $a_i$ 的真因子
12. **定理** 在 UFD 中, 任意元的真因子链一定有限终止

> 证明素元, 可借助环上范数是素数.
>
> ![](https://img.duanyll.com/img/20231226101633.png)
>
> 证明不可约元, 考虑其环上范数的可分解性. 环上范数是素数 $\implies$ 不可约元, 环上范数不是素数也可能是不可约元.
>
> ![](https://img.duanyll.com/img/20231226102002.png)
>
> 证明不是素元, 找一个反例
>
> ![](https://img.duanyll.com/img/20231226102044.png)
