---
title: 数值分析速通 - 基础知识
layout: wiki
wiki: notes-numeric
order: 601
---

## 误差

准确值 $x^*$, 近似值 $x$

- 绝对误差 $e(x)=x-x^*$
- 相对误差 $e(x)=(x-x^*)/x^*$
- $$
  e(x\pm y)=e(x)\pm e(y)
  $$ 
  相近的数相减, 相对误差增大
- $$
  e(xy)=ye(x)+x^*e(y)
  $$
- $$
  e(\frac{x}{y})=\frac{ye(x)-xe(y)}{yy^*}
  $$
  小数做除数, 绝对误差增大

数值计算的基本原则

- 避免绝对值小的数做除数
- 防止大数吃小数 (数量级相差大的数相加减)
- 避免相近的数相减
- 减少 Flops

## 非线性求解方程

### 二分法

![二分法伪代码](https://cdn.duanyll.com/img/20230617100739.png)

### 不动点迭代

![不动点迭代伪代码](https://cdn.duanyll.com/img/20230617100816.png)


$$
\lim_{i\to\infty}x_i=r,g(r)=g(\lim_{i\to\infty}x_i)=\lim_{i\to\infty} g(x_i)=\lim_{i\to\infty}x_{i+1}=r
$$

定义, 全局收敛, 局部收敛, [Lipschitz 收敛](/source/wiki/calculus/array-limit.md#压缩映射原理)

推论: $g(x)$ 在 $[a,b]$ 连续, $(a,b)$ 可微, $\forall x\in[a,b],a\leq g(x)\leq b$, $\exist L\in(0,1)$

$$
|g'(x)|\leq L
$$

$\implies g(x)$ 在 $[a,b]$ 上存在唯一不动点

**局部收敛定理**: $|g'(x^*)|<1\implies x_{i+1}=g(x_i)$ 局部收敛

> $|g'(x^*)|$ 越接近零, 则不动点迭代收敛越快. $|g'(x^*)|=0$ 时将具有更高的收敛阶.

### 精度的极限

![精度的极限](https://cdn.duanyll.com/img/20230617103102.png)

- 前向误差: 迭代点值不准确 $|x_n|-r$
- 后向误差: 迭代公式计算不准确 (如存在浮点误差) $f(x_n)$
- 误差放大因子: 相对前向误差 / 相对后向误差
- 条件数: 问题本身所决定的误差放大

原问题:

$$
f(x)=0\implies x=r
$$

有误差的问题

$$
f(x)+\epsilon g(x)=0\implies x=r+\Delta r
$$

{% folding open:true 说明 %}

$$
f(r+\Delta r)+\epsilon g(r+\Delta r)=0
$$

Taylor 展开

$$
f(r)+(\Delta r)f'(r)+\epsilon g(r)+\epsilon(\Delta r)g'(r)+O((\Delta r)^2)
$$

$$
(\Delta r)(f'(r)+\epsilon g'(r))\approx-f(r)-\epsilon g(r)=\epsilon g(r)
$$

{% endfolding %}

得到**根的敏感公式**:

$$
\Delta r\approx\frac{-\epsilon g(r)}{f'(r)+\epsilon g'(r)}\approx-\epsilon\frac{g(r)}{f'(r)}
$$

误差放大因子

$$
\left|\frac{\Delta r/r}{\epsilon g(r)/g(r)}\right|=\left|\frac{g(r)}{rf'(r)}\right|
$$

> 要探讨迭代公式中某一项造成的误差, 就把这一项代入 $g(x)$

### 牛顿迭代法

是一种特殊形式的不动点迭代, 希望提高迭代的[收敛阶](/source/wiki/optim/unconstrained.md#收敛阶), 构造不动点迭代使得

$$
g'(x^*)=0
$$

迭代公式 (切线近似):

$$
x_{i+1}=x_i-\frac{f(x_i)}{f'(x_i)}
$$

**二阶收敛** $f(r)=0,f'(r)\neq0,f''(r)\neq0$, 则牛顿法局部二次收敛, 迭代误差 $e_i=|x_i-r|$ 满足

$$
\lim_{i\to\infty}\frac{e_{i+1}}{e_i^2}=\left|\frac{f''(r)}{2f'(r)}\right|
$$

[更高阶收敛的情形](/source/_posts/course/2023-3-18-Numeric-2.md#problem-2)

**线性收敛** $m$ 重根 $f(r)=f'(r)=\cdots=f^{(m-1)}(r)=0$

$$
\lim_{i\to\infty}\frac{e_{i+1}}{e_i}=\frac{m-1}{m}
$$

**改进为局部二次收敛** $m$ 重根且 $f^{(m+1)}(r)\neq 0$, 使用迭代公式

$$
x_{i+1}=x_i-\frac{mf(x_i)}{f'(x_i)}
$$

局部二次收敛

$$
\lim_{i\to\infty}\frac{e_{i+1}}{e_i^2}=\frac{1}{m(m+1)}\left|\frac{f^{(m+1)}(r)}{f^{(m)}(r)}\right|
$$

![牛顿下山法](https://cdn.duanyll.com/img/20230617111425.png)

推广到非线性方程组

$$
X_{i+1}=X_i-J^{-1}(X_i)F(X_i)
$$