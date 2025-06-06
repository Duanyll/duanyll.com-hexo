---
title: 2022 UESTC ICPC Training for Graph
author: duanyll
tags:
  - oi
  - 题解
  - 图论
source: http://acm-uestc-edu-cn-s.vpn.uestc.edu.cn:8118/contest/170/summary
---

{% link http://acm-uestc-edu-cn-s.vpn.uestc.edu.cn:8118/contest/170/summary desc:true %}

## A

[POJ2914 Lutece 2710 Minimum Cut](./2022-4-13-POJ-2914.md)

## C

容易证明只有行号列号之和奇偶性相同的情况下才能到达重点. 并且这种情况下, 能走通的对角线方向都是与奇偶性相关的. 因此直接按照初始方向与能走通的方向是否相同确定权值建图即可.

## E

在题目要求简单路径的情况下, 容易发现如果起点和查询点都在同一个点双联通分量下, 则一定可以构造出一条路径经过点双联通分量中的最小点. 所以利用 Tarjan 算法求出割点, 然后缩点成一棵树的情况, 此时只有一条可行路径, 直接 DFS 可处理出所有点的答案. 缩点方法: 每个点双联通分量除了割点外所有点缩成一点, 然后每个割点与所在的多个点双联通分量连边.

坑点: 如果查询起点, 则结果就是起点的权值, 而不能去查询起点所在的点双. 起点是割点并不影响.

## J

几乎是无向图上 Tarjan 算法模版了.

注意两割点之间连边也算点双的要求其实并不需要特殊处理. 需要处理的是此题并不认为孤立的点算作点双.

## K

LCA 模版, 可以写倍增, 可以写 Tarjan 离线, 甚至可以写树剖, 也可以写 LCT.

要说倍增写法有什么坑点的话, 恐怕就是记得改了 `MAXN` 后, 记得对应修改 `log` 次数, 别没开够.

## I

2-SAT 模版. 将 `u == x  || v == y` 转化成 `u == !x => v == y` 和 `v == !y => u == y`, 每个条件对应一个节点, 连有向边, 判断对于每个值 `x`, `x == 1` 和 `x == 0` 是否在同一个强连通分类中, 如果是则不存在方案.

## J

[洛谷 P4208 Lutece 2726 最小生成树计数模版](./2022-4-22-Luogu-P4208.md)

## K

Dijkstra 模版. 记得开 `int64`, 记得优先队列用 `greater`, 没了.

## Q

将边权的贡献分成两部分, $A_i - d * i$ 和 $A_j + d * j$, $i < j$ 然后发现可以用类似归并排序的过程去贪心连边, 总共要连 $n \log n$ 条边, 再随便跑个生成树就好了.

## R

[洛谷 P4716 Lutece 2733 POJ3164 最小树形图模板](./2022-4-19-Luogu-P4716.md)

## S

二分图匹配模版. 匈牙利算法随便跑跑, $n$ 不大的稠密图用邻接矩阵存图会更方便.

## T

其实可以不管二分图, 直接用网络流来考虑. 假设初始情况是每个点都是一条独立的链, 则问题相当于是问能进行多少次链的合并操作, 沿着 DAG 上的边将链合并起来, 则最小链数就是节点数减合并次数. 于是把每个点拆成入点和出点, 源和入点, 出点和汇连容量为一的边 (每个点的入度和出度最多用一次), 然后 DAG 上的边就把起点的入点和终点的出点连起来即可, 然后求最大流, Dinic 足矣.
