---
title: 时间序列分析作业 2
tags:
  - 时间序列
author: duanyll
---

## Problem 1

![](https://cdn.duanyll.com/img/20231220195434.png)

生成数据

```mathematica
model = ARMAProcess[{0.1, 0.12}, {-0.6, 0.7}, 1];
SeedRandom[42];
n = 1000;
data = RandomFunction[model, {1001, n + 1000}];
ListPlot[data, Filling -> Axis]
```

![](https://cdn.duanyll.com/img/20231220204433.png)

用不同阶数 ARMA 模型进行拟合并计算 AIC, BIC

```mathematica
results =
  Table[Module[{tsm},
    tsm = TimeSeriesModelFit[data, {"ARMA", {p, q}}]; {tsm["AIC"],
     tsm["BIC"]}], {p, 1, 10}, {q, 1, 10}];
aic = results[[All, All, 1]];
bic = results[[All, All, 2]];
ListPlot3D[aic, AxesLabel -> {p, q, "AIC"}]
ListPlot3D[bic, AxesLabel -> {p, q, "BIC"}]
```

![AIC](https://cdn.duanyll.com/img/20231220204536.png)

![BIC](https://cdn.duanyll.com/img/20231220204549.png)

求最小阶数

```
Position[aic, Min[aic]]
Position[bic, Min[bic]]
```

均为 `ARMA(2,2)` 模型最合适.

重复以上过程 100 次, 并求阶数平均值标准差

```mathematica
result100 = ParallelTable[Module[{data, results, aic, bic},
    data = RandomFunction[model, {1001, n + 1000}];
    results =
     Table[Module[{tsm},
       tsm = TimeSeriesModelFit[data, {"ARMA", {p, q}}]; {tsm["AIC"],
        tsm["BIC"]}], {p, 1, 10}, {q, 1, 10}];
    aic = results[[All, All, 1]];
    bic = results[[All, All, 2]];
    Flatten[{Position[aic, Min[aic]], Position[bic, Min[bic]]}]
    ], 100];
TableForm[
 Map[{N[Mean[#]], N[StandardDeviation[#]]} &, Transpose[result100]],
 TableHeadings -> {{"AIC p", "AIC q", "BIC p", "BIC q"}, {"Mean",
    "StdDev"}}]
```

$$
\begin{array}{c|c|c}
  & \text{Mean} & \text{StdDev} \\
\hline
 \text{AIC p} & 1.83 & 0.427702 \\
 \text{AIC q} & 2.71 & 1.68352 \\
 \text{BIC p} & 1.8 & 0.426401 \\
 \text{BIC q} & 2.04 & 0.281411 \\
\end{array}
$$

## Problem 2

![](https://cdn.duanyll.com/img/20231220205912.png)

使用上一题的代码生成数据, 进行正态白噪声检验

```mathematica
datanormal = Normal[data][[1, All, 2]];
g3 = Sqrt[n/6] Skewness[datanormal]
g4 = Sqrt[n/24] Kurtosis[datanormal] - 3
```

得到 $G_3=1.01609,G_4=15.1844$, 否定序列是正态白噪声的假设.

使用逆序检验法检验平稳性

```mathematica
m = 20;
xi = Mean[Partition[datanormal, m]];
k = Length[xi];
a = Sum[If[i < j && xi[[i]] < xi[[j]], 1, 0], {i, 1, k - 1}, {j,
    i + 1, k}];
z = (a - 1/4 k (k - 1))/Sqrt[(2 k^3 + 3 k^2 - 5 k)/72]
```

得到 $|Z|=0.519109<0.196$, 在给定显著性水平 $α=0.05$ 时认为序列无明显的趋势.

使用游程检验法检验平稳性

```mathematica
mean = Mean[datanormal];
n1 = Count[datanormal, _?(# > mean &)];
n2 = Count[datanormal, _?(# < mean &)];
r = Length[Split[Map[# > mean &, datanormal]]];
er = N[(2 n1 n2)/(n1 + n2) + 1]
dr = N[(2 n1 n2 (2 n1 n2 - 1))/(n^2 (n - 1))]
z = (r - er)/Sqrt[dr]
```

计算得到 $Z=11.0376$, 发现序列的游程过多了, 导致未通过游程检验方法

进行序列零均值检验. 取 $N=100$

```mathematica
\[Gamma] = CovarianceFunction[data, {n - 1}]
varx = Sum[\[Gamma][Abs[i]], {i, -100, 100}]/101;
mean
Sqrt[varx]
```

得到 $\bar{X}=-0.0331765,\sqrt{\mathrm{Var}[\bar{x}]}=0.104142$, 则认为均值显著零

模型的识别与参数估计, 绘制自相关图

```mathematica
gamma = CovarianceFunction[data, {10}];
Normal[gamma]
ListPlot[{gamma, CovarianceFunction[model, {10}]}, Filling -> Axis,
 PlotLegends -> {"模拟数据", "理论"}]
```

![](https://cdn.duanyll.com/img/20231220215903.png)

绘制偏相关图

```mathematica
phi = PartialCorrelationFunction[data, {10}];
Normal[phi]
ListPlot[{phi, PartialCorrelationFunction[model, {10}]},
 Filling -> Axis, PlotLegends -> {"模拟数据", "理论"}]
```

![](https://cdn.duanyll.com/img/20231220220007.png)

发现自相关函数在 2 步截尾, 偏相关函数拖尾, 有可能认为是 $\mathrm{MA}(2)$ 模型, 但还是认为是 ARMA 模型, 然后按照第一题的方法来定阶比较稳妥.

## Problem 3

![](https://cdn.duanyll.com/img/20231220220512.png)

```mathematica
model = SARIMAProcess[{0.1, 0.12},
   1, {-0.6}, {10, {0.7, -0.1}, 1, {0.8}}, 1];
SeedRandom[42];
n = 1000;
data = RandomFunction[model, {1001, n + 1000}];
ListPlot[data, Filling -> Axis]
```

![](https://cdn.duanyll.com/img/20231220221549.png)

进行模型识别，绘制一阶差分的自相关图

```mathematica
gamma = CovarianceFunction[Differences[data], {20}];
Normal[gamma]
ListPlot[gamma, Filling -> Axis]
```

![](https://cdn.duanyll.com/img/20231220222317.png)

注意到数据有明显的季节性，且均值随时间明显地变化，则使用 SARIMA 模型是合适的，$S=10$

使用 `TimeSeriesModelFit` 估计参数

```
tsm = TimeSeriesModelFit[data, {"SARIMA", {{2, 1, 1}, {2, 1, 1}, 10}}]
tsm["ParameterTable"]
```

$$
\begin{array}{l|llll}
 \text{} & \text{Estimate} & \text{Standard Error} &
   \text{t-Statistic} & \text{P-Value} \\
\hline
 \mathit{a}_1 & -0.209855 & 1.36493 & -0.153747 & 0.43892 \\
 \mathit{a}_2 & 0.00084614 & 0.750851 & 0.00112691 & 0.499551 \\
 \mathit{b}_1 & -0.343927 & 1.36456 & -0.252042 & 0.40053 \\
 \alpha _1 & 0.77744 & 0.0409718 & 18.975 &
   \text{4.079851380155306$\grave{ }$*${}^{\wedge}$-69} \\
 \alpha _2 & -0.171098 & 0.039956 & -4.28217 & 0.0000101453 \\
 \beta _1 & 0.719461 & 0.0306666 & 23.4607 &
   \text{1.2654087506591414$\grave{ }$*${}^{\wedge}$-97} \\
\end{array}
$$

与理论模型差距明显.

## Problem 4

![](https://cdn.duanyll.com/img/20231220225931.png)

![](https://cdn.duanyll.com/img/20231220225941.png)

```mathematica
data = TimeSeries[{184.61, 205.76, 229.31, 242.32, 275.23, 311,
   358.06, 421.15, 458.23, 530.86, 659.69, 744.98, 890.95, 1016.31,
   1177.27, 1486.08, 2001.41, 2443.21, 2871.65, 3241.47, 3474.09,
   3649.12, 3928.2, 4293.49, 4725.01, 5333.09, 6379.63, 7385.1,
   8690.24, 10562.39, 12601.23, 14151.28, 17185.48, 21026.68, 23872.8,
    26260.77, 28536.7, 30103.1, 32680.5, 36980.2}, {1978}]
ListLinePlot[data]
```

![](https://cdn.duanyll.com/img/20231220223311.png)

从图像上认为数据存在类似于指数增长的确定性趋势，考虑

$$
Y_t=a+be^{ct}+X_t
$$

```mathematica
fit = FindFit[data, a + b E^(c (t - 1978)), {a, b, c}, t]
```

拟合得到

```mathematica
{a -> -688.723, b -> 382.643, c -> 0.118877}
```

看看残差

```mathematica
res = data - Table[(a + b E^(c t)) /. fit, {t, Length[data]}];
ListPlot[res, Filling -> Axis]
```

![](https://cdn.duanyll.com/img/20231220224545.png)

并不算是平稳，但本来数据量就不多，将就吧

```mathematica
tsm = TimeSeriesModelFit[TimeSeries[res]]
tsm["BestFit"]
```

Mathematica 建议使用 SARIMA 来建模残量序列，残量序列确实具有一定的季节性

```mathematica
SARIMAProcess[-4159.83, {2.75393, -5.90893}, 1, {-0.843746, \
-0.115202}, {12, {}, 3, {}}, 348735., {}]
```

但是由于数据量过少，难以估计许多参数. 使用更为简单的 ARMA 模型

```mathematica
tsm = TimeSeriesModelFit[TimeSeries[res], "ARMA"]
tsm["BestFit"]
```

```mathematica
ARMAProcess[-4.20369*10^-14, {1.36553, -0.673662}, {0.414017}, \
113312.]
```
