---
title: RL in Diffusion Models
tags:
  - 炼丹
  - 强化学习
# hidden: true
---

## Flow-GRPO

{% link https://arxiv.org/abs/2505.05470 %}

{% link https://github.com/yifan123/flow_grpo %}

1. 载入 DiT 模型和文本编码器，VAE 等，冻结参数。LoRA 微调则载入 LoRA Adapter。
   - Trick: 前 20x8 次更新使用 EMA，$\lambda = 0.9$
2. 载入提示词数据集。数据集只需要包含 T2I 文本提示词。
   - 使用 `DistributedKRepeatSampler` 采样数据集.
   - Sampler 可以无限采样数据，保证多卡中每次拿数据出来，都把数据集中随机选中的提示词重复 $K=24$ 次
   - Batch Size 根据显存大小决定。
3. 外层训练循环
   1. 采样。用 Sampler 取 $48\times K$ 条提示词数据，SDE 采样获得图像。
      - 目的是为了获得轨迹和轨迹上的概率分布，使用 [Langevin Dynamics](./2025-6-21-Flow.md#ode--sde) 采样。
        $$
        \d Z_t = \left(v_t(Z_t) + \frac{tv_t(Z_t)-Z_t}{1-t}\right)\d t + \sqrt{2}\sigma_t\d W_t
        \label{eq:langevin}
        $$
      - 迭代采样, $Z_{t+\Delta t}$ 是与 $Z_t$ 相关的高斯分布采样。使用高斯分布的对数概率密度函数
        $$
        \ln p(x;\mu,\sigma^2) = -\frac{(x-\mu)^2}{2\sigma^2} - \ln(\sqrt{2\pi}\sigma)
        $$
        代入上式，得到
        $$
        \ln p(Z_{t+\Delta t}|Z_t) = -\frac{(Z_{t+\Delta t}-\mu_t(Z_t)))^2}{2\sigma_{t}^2} - \ln(\sqrt{2\pi}\sigma_{t})
        $$
        其中 $\mu_t(Z_t)$ 容易由 $(\ref{eq:langevin})$ 得到.
      - 对采样结果图像异步地调用 Reward 模型计算标量奖励值。
      - 保存每条轨迹每个时间步的 Latent，每个 Latent 对应的标量 Log Probability 和整条轨迹的 Reward。
   2. 对采样的每条轨迹的 Reward，计算 Advantage
      - 在 GRPO 训练中，计算当前 Reward 相比于这次采样结果中同一条提示词（保证有 $K$ 个）所有其他 Reward 的归一化标准差作为 Advantage
      - 去掉所有时间步上 Advantage 都是 0 的轨迹（如果使用了 Time-Dependent 的 Advantage 算法）
   3. 内层训练循环（实际上 Epoch 数只取 1）
      - 把带有 Advantage 的采样轨迹打乱顺序，分成 Batch，多卡环境下每条轨迹只学习一次
      - 启用自动求导，对轨迹上的每一步重新输入到 DiT 模型中，计算 Log Probability
      - 之后的整体做法是把 Advantage 乘上 Log Prob (Importance Sampling) 得到 Policy Gradient Loss
      - 为了计算 KL Loss，使用原来未经微调的 DiT 模型计算 Log Probability 作为 Reference
      - 结合两个 Loss 和 Clipping，使用两步 Gradient Accumulation 更新参数
