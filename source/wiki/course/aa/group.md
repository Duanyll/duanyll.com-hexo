---
title: 抽象代数速通 - 群
layout: wiki
wiki: notes
order: 801
---

## 群

1. 等价关系: 自反性, 对称性, 传递性
2. 由等价关系诱导出等价类, 商集, $S$ 的划分
3. 代数运算: $S\times S\to S$ 的映射
4. 群: 结合律, 单位元, 逆元
   1. 判定: 非空, 良定, 封闭, 结合律, 单位元, 逆元
5. **定理**
   1. 单位元唯一
   2. 逆元唯一
   3. $\forall a\in G, (a^{-1})^{-1}=a$
   4. $\forall a,b\in G, (ab)^{-1}=b^{-1}a^{-1}$
   5. 消去律 $\forall a,b,c\in G, ab=ac\implies b=c, ca=ba\implies b=c$
6. **定理** $\forall a,b\in G$, 方程 $ax=b$ 和 $ya=b$ 有唯一解
7. 方幂, 指数 (倍数) 运算
8. **定理**. 非空集合 $G$ 构成群 $\iff$
   1. 结合律
   2. 左单位元 $\exist e\in G, \forall a\in G, ea=a$
   3. 左逆元 $\forall a\in G, \exist a'\in G, a'a=e$
9.  **定理** 结合律成立, $G$ 构成群 $\iff$ $\forall a,b\in G$, $ax=b,ya=b$ 在 $G$ 中都有解
10. **定理** 具有左右消去律的**有限**半群 (结合律成立) 一定是群

## 子群

1. 子群定义
2. 性质: 单位元, 逆元相同
3. **定理** 子群判定 $H\leq G\iff \forall a,b\in H, ab\in H, a^{-1}\in H$
4. **定理** 子群判定 $H\leq G\iff \forall a,b\in H, ab^{-1}\in H$
5. **定理** 子群的交仍是子群
6. $S$ 在 $G$ 中生成的子群是 $G$ 中含 $S$ 最小的子群
   $$
   \langle S\rangle=\{a_1^{l_1}a_2^{l_2}\cdots a_k^{l_k}|a_i\in S,l_i=\pm 1,k\in\N\}
   $$
   $a_i$ 可以相同
   
## 同构

1. 同构定义: 存在双射保运算 $\phi(ab)=\phi(a)\phi(b)$
2. 证明同构
   1. 构造映射
   2. 证明单射 $\forall x,y\in G,\phi(x)=\phi(y)\implies x=y$
   3. 证明满射 $\forall x'\in G',\exist x\in G\st\phi(x)=x'$
   4. 证明保运算
3. **定理** 同构性质
   1. $\phi(e)=e'$
   2. $\phi(a^{-1})=(\phi(a))^{-1}$
   3. 同构映射可逆, 逆映射也是同构映射
4. **定理** 群同构是等价关系
5. **定理** Cayley. 任意群均同构于某一变换群.

## 循环群

1. 群的阶: 有限群的元素个数
2. 元素的阶: $a^k=e\implies\ord a=k$
3. **定理** 群阶的性质
   1. $\ord a=\ord a^{-1}$
   2. $\ord a=n,a^m=e\implies n|m$
   3. $\ord a=n,\forall m\in\Z, \ord a^m=\frac{n}{(n,m)}$
   4. $\ord a=n,\ord b=m,ab=ba,(n,m)=1\implies\ord ab=mn$
4. **定理** 元素阶是群阶的因子
5. 循环群: $\exist a\in G, G=\langle a\rangle$
6. **定理** 循环群性质
   1. $G=\langle a\rangle\iff G=\langle a^{-1}\rangle$
   2. 有限循环群与 $\Z_n$ 同构
   3. 无限循环群与 $(\Z,+)$ 同构
   4. 循环群的子群是循环群
7. **推论** $\ord a=n,r\in Z, (n,r)=d\implies\langle a^r\rangle=\langle a^d\rangle$
8. **推论** 无限循环群的全部子群, 有限循环群的全部子群
9. $p$ 是素数, $(\Z_p^*,\cdot)$ 关于模 $p$ 乘法构成循环群, 生成元即为原根

## 置换群与对称群

1. 全对称群, 置换群
2. 轮换与轮换表示
3. 置换的乘法, 从右到左结合
4. ![](https://cdn.duanyll.com/img/20231020201557.png)
5. **定理** 不相交轮换的乘积可交换
6. **定理** 任意置换可表示成不相交轮换的乘积
7. **定理** 任意置换可表示成对换的乘积 (不唯一)
   ![](https://cdn.duanyll.com/img/20231020201906.png)
8. **定理** 任意置换写成对换的乘积时, 对换个数的奇偶性是一定的
9. **定理** $n>1$ 阶全对称群 $S_n$ 中, 奇偶置换各占一半

## 子群的陪集

1. 群的子集积记号
2. **定理** 子集积性质 $A,B,C\subseteq G$
   1. 结合律 $A(BC)=(AB)C$
   2. 消去律 $gA=gB\implies A=B, Ag=Bg\implies A=B$
   3. $H\leq G\implies HH=H$
   4. $A,B\leq G,AB\leq G\iff AB=BA$ 利用乘法求逆运算的封闭性证明相互包含
3. 左右陪集: $H\leq G, a\in G$, 左陪集 $aH\triangleq\{ah|h\in H\}$, 右陪集 $Ha\triangleq\{ha|h\in H\}$
4. **定理** 陪集性质 $H\leq G, a,b\in G$
   1. $a\in aH, a\in Ha$
   2. $aH=H\iff a\in H$
   3. $aH\leq G\iff a\in H$
   4. $aH=bH\iff a^{-1}b\in H; Ha=Hb\iff ab^{-1}\in H$
   5. $aH=bH$ 或 $aH\cap bH=\empty$
   6. $|aH|=|H|,|aH|=|bH|=|Ha|$
5. **定理** Lagrange 设 $G$ 是 $n$ 阶有限群, $H\leq G, a\in G$
   1. $|G|=|H|\cdot[G:H]$
   2. $\ord a | G$
   3. $a^n=e$
6. **定理** $\phi:G/H\to H\backslash G,aH\mapsto Ha^{-1}$ 是良定的双射

## 正规子群和商群

1. 正规子群 $H\leq G, \forall a\in G, aH=Ha$
2. 单群: $G\neq \{e\}$ 且 $G$ 不含非平凡正规子群
   1. 素数阶群必为单群
   2. 交换群的子群均为正规子群
   3. $H\lhd G,H\leq K\leq G\implies H\lhd K$
   4. $H\leq G,[H:G]=2\implies H\lhd G$
3. **定理** 正规子群判定定理 $H\lhd G$
   - $\iff\forall a\in G, aHa^{-1}=H$
   - $\iff\forall a\in G, aHa^{-1}\subseteq H$
   - $\iff\forall a\in G, \forall h\in H, aha^{-1}\in H$
4. **定理** $H_1,H_2\lhd G\implies H_1\cap H_2, H_1H_2\lhd G$
   - **引理** $H\lhd G,K\leq G\implies HK\leq G$
5. 商群: $H\lhd G$ 在集合 $G/H=\{gH|g\in G\}$ 上规定乘法运算 $aH\cdot bH\triangleq abH$, 运算良定且构成群, 称为 $G$ 模 $H$ 后的商群
   1. 商群的单位元是 $H$
   2. 商群 $aH$ 的逆元是 $a^{-1}H$
   3. $G$ 是交换群 $\implies$ $G/H$ 是交换群
   4. 商群的阶是群阶的因子
6. 对 $n$ 阶交换群, 素数 $p|n$, 则 $G$ 中必有 $p$ 阶元素