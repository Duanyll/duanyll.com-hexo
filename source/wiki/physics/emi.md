---
title: Physics Speedrun - Electromagnetic Induction
layout: wiki
wiki: notes-physics
order: 303
---

## Faraday's Law of Induction

![An induced EMF is produced by a changing magnetic field](https://img.duanyll.com/img/20230215102325.png)

The electromotive force (EMF) induced in a circuit is equal to the changing rate of magnetic flux throught the circuit.

$$
\varepsilon=-\frac{\d\Phi_B}{\d t}
$$

For a $N$-loop coil:

$$
\varepsilon=-N\frac{\d\Phi_B}{\d t}
$$

Induction current: $I=\varepsilon/R$

### Lenz's Law

An induced EMF is always in a direction that opposes the original change in flux that caused it.

> Total induced charge is only determined by $\Delta\Phi_B$ and $R$, regardless the procedure.
>
> $$
> E=\frac{\d\Phi_B}{\d t},I=\frac{E}{R}=\frac{\d\Phi_B}{R\d t}
> $$
>
> $$
> Q=\int I\d t=\frac{\Delta\Phi_B}{R}
> $$

### Motional EMF

![Conductor moves in magentic field](https://img.duanyll.com/img/20230215103413.png)

By Lorentz force:

$$
\vec{F}=q\vec{v}\times\vec{B}=q\vec{E_k}
$$

$\vec{E_k}$ indicates a non-electrostatic field.

Motional EMF:

$$
\varepsilon=\int_-^+(\vec{v}\times\vec{B})\cdot\d\vec{l}
$$

The result can also be derived by Firaday's law.

---

![A straight wire moving perpandicular to a uniform magnetic field](https://img.duanyll.com/img/20230215103813.png)

$$
\begin{aligned}
    \varepsilon&=Blv\\
    F&=BIl=\frac{B^2l^2v}{R}\\
    P&=Fv=I^2R\\
\end{aligned}
$$

![Motion on rails](https://img.duanyll.com/img/20230215104121.png)

Constant $I$:

$$
F=ma=BIl
$$

$$
v=at=\frac{BIl}{m}t
$$

Constant EMF by source:

$$
I=\frac{\varepsilon-Blv}{R}
$$

$$
\frac{\d v}{\d t}=\frac{BIl}{m}\implies\int_0^t\frac{Bl}{mR}\d t=\int_0^v\frac{\d v}{\varepsilon-Blv}
$$

---

### Vortex Electric Field

![Vortex electric field](https://img.duanyll.com/img/20230215105025.png)

In changing magnetic field, forces on static charges is created by vortex electric field. Generalize the definition of $V$:

$$
V_{ab}=\int_a^b\vec{E}\cdot\d\vec{l}
$$

The general form of Faraday's law:

$$
\oint\vec{E_i}\cdot\d\vec{l}=-\int\frac{\p\vec{B}}{\p t}\cdot\d\vec{S}=-\frac{\d\Phi_B}{\d t}
$$

where $\vec{E_i}$ is the induced electric field. Differential form:

$$
\nabla\times\vec{E_i}=-\frac{\p\vec{B}}{\p t}
$$

---

![Induced EMF around uniformly changing cylindrical magnetic field](https://img.duanyll.com/img/20230215105758.png)

---

## Inductor

### Self Inductance

![Self inductance](https://img.duanyll.com/img/20230215112920.png)

Magnetic flux $\Phi_B\propto$ current $I$

Self inductance of the coil $L$, unit: Henry $\un{H}$

A coil with significant $L$ is an inductor. EMF induced in an inductor:

$$
\varepsilon=-N\frac{\d\Phi_B}{\d t}=-L\frac{\d I}{\d t}
$$

1. $L$ shows the electromagnetic inertia of a coil
2. $L$ depends on geometry and ferromagnetics
3. Inductors in AC curcuit have the effect of reactance / impedance

---

![Inductance of a long solenoid](https://img.duanyll.com/img/20230215120151.png)

$$
B=\mu_0nI
$$

$$
N\Phi_B=N\mu_0nIS=\mu_0n^2IV
$$

$$
L=\mu_0n^2V
$$

where $V$ denotes the volume.

![Inductance of coaxial cable](https://img.duanyll.com/img/20230215120444.png)

$$
B=\frac{\mu_0I}{2\pi r}\
$$

$$
\Phi_B=\int\frac{\mu_0I}{2\pi r}\cdot1\cdot\d r=\frac{\mu_0I}{2\pi}\ln\frac{R_2}{R_1}
$$

$$
L=\frac{\Phi_B}{I}=\frac{\mu_0}{2\pi}\ln\frac{R_2}{R_1}
$$

![Inductance of a rectangular toroid](https://img.duanyll.com/img/20230215120757.png)

$$
L=\frac{\mu_0N^2h}{2\pi}\ln\frac{r_2}{r_1}
$$

### Mutual Inductance

![Two coils near each other](https://img.duanyll.com/img/20230215120948.png)

The change of current in coil 1 causes EMF in coil 2. Total flux in coil 2 created by current $I_1$:

$$
N_2\Phi_{21}=M_{21}I_1
$$

$$
\varepsilon_2=-N_2\frac{\d\Phi_{21}}{\d t}=-M_{21}\frac{\d I_1}{\d t}
$$

$M_{21}$ is the **mutual inductance** of coil 2 with respect to coil 1, depending on geometry and ferromagnetics. The change of current in coil 2 also causes EMF in coil 1:

$$
N_1\Phi_{12}=M_{12}I_2,\varepsilon_1=-M_{12}\frac{\d I_2}{\d t}
$$

It can be proved that

$$
M_{12}=M_{21}=M
$$

Mutual inductance $M$, unit: Henry $\un{H}$

---

![To minimize mutal inductance](https://img.duanyll.com/img/20230215122618.png)

![Two ideal coupling coils](https://img.duanyll.com/img/20230215123002.png)

$$
M=\sqrt{L_1L_2}
$$

Generally,

$$
M=k\sqrt{L_1L_2}
$$

Total inductance when connecting 2 and 3 (Same direction):

$$
L=L_1+L_2+2M
$$

---

### Magnetic Energy Storage

$$
P=\varepsilon_LI=L\frac{\d I}{\d t}I\\
\d W=P\d t=LI\d I\implies W=\int LI\d I=\frac{1}{2}LI^2
$$

Energy stored in an inductor:

$$
U=\frac{1}{2}LI^2
$$

![A long solenoid](https://img.duanyll.com/img/20230215120151.png)

$$
U=\frac{1}{2}\mu_0n^2V\cdot I^2=\frac{1}{2}\frac{B^2}{\mu_0}V
$$

Energy per unit volume / Energy density:

$$
u=\frac{1}{2}\frac{B^2}{\mu_0}
$$

### LC Circuit

![A simple LC circuit](https://img.duanyll.com/img/20230215165053.png)

$$
-L\frac{\d I}{\d t}+\frac{Q}{C}=0\implies\frac{\d^2Q}{\d t^2}+\frac{Q}{LC}=0
$$

$$
Q=Q_0\cos(\omega t+\varphi)
$$

In a SHM:

$$
\omega=\sqrt{\frac{1}{LC}}
$$

$$
I=-\frac{\d Q}{\d t}=\omega Q_0\sin(\omega t+\varphi)
$$

## Displacement Current

![the discontinuity of current in a charging capacitor](https://img.duanyll.com/img/20230215165752.png)

Follow the path $S_1$, the Ampere's law shows that the magnet field produced by $I$ should satisfy

$$
\oint_{S_1}\vec{B}\cdot\d\vec{l}=\mu_0I
$$

However, under the pervious defination of steady current model, the _current_ enclosed by $S_2$ equals to zero, indicating that

$$
\oint_{S_2}\vec{B}\cdot\d\vec{l}=0
$$

The result is contradictionary since there is no actual current passing through the capacitor:

$$
\oint_{S_1+S_2}\vec{j}\cdot\d\vec{S}=-I\neq0
$$

An extra term is required in Ampere's law to handle the changing $\vec{E}$. We call normal current in wire the **conduction current**:

$$
I=\frac{\d Q}{\d t}=\frac{\d\sigma}{\d t}S
$$

$$
j=\frac{I}{S}=\frac{\d\sigma}{\d t}=\varepsilon_0\frac{\d E}{\d t}
$$

Electric field between plates:

$$
E=\frac{\sigma}{\varepsilon_0}
$$

We define the **displacement current** to reveal changing $\vec{E}$ between the plates:

$$
\vec{j_D}=\varepsilon_0\frac{\d\vec{E}}{\d t},I_D=\varepsilon_0\frac{\d\Phi_E}{\d t}
$$

**Ampere's law in a general form:**

$$
\oint\vec{B}\cdot\vec{l}=\mu_0(I+I_D)_{in}=\mu_0I_in+\mu_0\varepsilon_0\frac{\d\Phi_E}{\d t}
$$

And continuity of **total current**:

$$
\oint(\vec{j}+\vec{j_D})\cdot\vec{S}=0
$$

## Maxwell's Equation

Electric field:

| Electrostatic Field                                         | Induced (Vortex) Electric Field                       | Total Electric Field                                 |
| ----------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| $\oint\vec{E_s}\cdot\d\vec{S}=\frac{Q_{in}}{\varepsilon_0}$ | $\oint\vec{E_i}\cdot\d\vec{S}=0$                      | $\oint\vec{E}\cdot\d\vec{S}=\frac{Q}{\varepsilon_0}$ |
| $\oint\vec{E_s}\cdot\d\vec{l}=0$                            | $\oint\vec{E_i}\cdot\d\vec{l}=-\frac{\d\Phi_B}{\d t}$ | $\oint\vec{E}\cdot\d\vec{l}=-\frac{\d\Phi_B}{\d t}$  |

Magnetic field:

| Conduction Current                  | Displacement Current                                                 | Total Current                                                               |
| ----------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| $\oint\vec{B}\cdot\d\vec{S}=0$      | $\oint\vec{B}\cdot\d\vec{S}=0$                                       | $\oint\vec{B}\cdot\d\vec{S}=0$                                              |
| $\oint\vec{B}\cdot\d\vec{l}=\mu_0I$ | $\oint\vec{B}\cdot\d\vec{l}=\mu_0\varepsilon_0\frac{\d\Phi_E}{\d t}$ | $\oint\vec{B}\cdot\d\vec{l}=\mu_0I+\mu_0\varepsilon_0\frac{\d\Phi_E}{\d t}$ |

Maxwell's equations:

$$
\begin{cases}
    \oint\vec{E}\cdot\d\vec{S}=\frac{Q}{\varepsilon_0}                        & \textrm{source of }E\\
    \oint\vec{B}\cdot\d\vec{S}=0                                              & \textrm{no magnetic charges}\\
    \oint\vec{E}\cdot\d\vec{l}=-\frac{\d\Phi_B}{\d t}                         & \textrm{changing }B\rarr E\\
    \oint\vec{B}\cdot\d\vec{l}=\mu_0I+\mu_0\varepsilon_0\frac{\d\Phi_E}{\d t} & \textrm{changing }E\rarr B\\
\end{cases}
$$

Maxwell's equations in differential form:

$$
\begin{cases}
    \nabla\cdot\vec{E}=\frac{\rho}{\varepsilon_0}\\
    \nabla\cdot\vec{B}=0\\
    \nabla\times\vec{E}=-\frac{\p\vec{B}}{\p t}\\
    \nabla\times\vec{B}=\mu_0\vec{j}+\mu_0\varepsilon_0\frac{\p\vec{E}}{\p t}
\end{cases}
$$

Maxwell's equations for steady magnetic field and electrostatic field:

$$
\begin{cases}
    \nabla\cdot\vec{E}=\rho_E/\varepsilon_0\\
    \nabla\cdot\vec{B}=0\\
    \nabla\times\vec{E}=0\\
    \nabla\times\vec{B}=\mu_0\vec{j}
\end{cases}
$$

Maxwell's equations with magnetic charges $Q_m$(magnetic monopoles):

$$
\begin{cases}
    \oint\vec{E}\cdot\d\vec{S}=\frac{Q}{\varepsilon_0}                        & \textrm{source of }E\\
    \oint\vec{B}\cdot\d\vec{S}=\mu_0Q_m                                       & \textrm{source of }B\\
    \oint\vec{E}\cdot\d\vec{l}=\mu_0\frac{\d Q_m}{\d t}-\frac{\d\Phi_B}{\d t} & \textrm{changing }B\rarr E\\
    \oint\vec{B}\cdot\d\vec{l}=\mu_0I+\mu_0\varepsilon_0\frac{\d\Phi_E}{\d t} & \textrm{changing }E\rarr B\\
\end{cases}
$$

## Electromagnetic Waves

![Antenna](https://img.duanyll.com/img/20230215175953.png)

Maxwell's equations in free space without charges or conduction currents:

$$
\begin{cases}
    \nabla\cdot\vec{E}=0\\
    \nabla\cdot\vec{B}=0\\
    \nabla\times\vec{E}=-\frac{\p\vec{B}}{\p t}\\
    \nabla\times\vec{B}=\mu_0\varepsilon_0\frac{\p\vec{E}}{\p t}
\end{cases}
$$

### Wave Equations

$$
\nabla\times(\nabla\times\vec{E})=\frac{\p}{\p t}(\nabla\times\vec{B})=-\mu_0\varepsilon_0\frac{\p^2\vec{E}}{\p t^2}
$$

$$
\nabla\times(\nabla\times\vec{E})=\nabla(\nabla\cdot\vec{E})-\nabla^2\vec{E}=-\nabla^2\vec{E}
$$

$$
\implies\nabla^2\vec{E}=\mu_0\varepsilon_0\frac{\p^2\vec{E}}{\p t^2}
$$

3D wave equation of electromagnetic wave:

$$
\nabla^2\vec{E}=\mu_0\varepsilon_0\frac{\p^2\vec{E}}{\p t^2},\nabla^2\vec{B}=\mu_0\varepsilon_0\frac{\p^2\vec{B}}{\p t^2}
$$

1D (plane) wave equation:

$$
\frac{\p^2E}{\p x^2}=\mu_0\varepsilon_0\frac{\p^2E}{\p t^2},\frac{\p^2B}{\p x^2}=\mu_0\varepsilon_0\frac{\p^2B}{\p t^2}
$$

### Properties

Compared with standard wave equation:

$$
\frac{\p^2y}{\p t^2}=v^2\frac{\p^2y}{\p x^2}
$$

The speed of EM wave:

$$
c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}=3.0\times10^8\un{m/s}
$$

![EM ware is transverse wave in phase](https://img.duanyll.com/img/20230215181042.png)

Particular solution of wave equation:

$$
E=E_0\cos\omega(t-\frac{x}{c}),B=B_0\cos\omega(t-\frac{x}{c})
$$

$\vec{E}\perp\vec{B}$, $E$ and $B$ are always in phase:

$$
\frac{E}{B}=c\label{label1}
$$

### Energy

Total enegry stored per unit volume:

$$
u=\frac{1}{2}\varepsilon_0E^2+\frac{1}{2}\frac{B^2}{\mu_0}
$$

With $(\ref{label1})$:

$$
u=\varepsilon_0E^2=\frac{B^2}{\mu_0}
$$

![Energy transport through EM wave](https://img.duanyll.com/img/20230215181654.png)

Energy transports per unit time per unit area:

$$
\d U=u\d V=u\cdot A\cdot c\d t
$$

$$
S=\frac{\d U}{A\d t}=uc=\frac{EB}{\mu_0}
$$

The direction of energy transporting:

$$
\vec{S}=\frac{1}{\mu_0}(\vec{E}\times\vec{B})
$$

Intensity: Time averaged $S$

$$
\bar{S}=\frac{1}{2}\frac{E_0B_0}{\mu_0}
$$

![Energy transporting by EM wave inside the battery and resistor](https://img.duanyll.com/img/20230215182113.png)
