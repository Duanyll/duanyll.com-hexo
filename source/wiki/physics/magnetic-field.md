---
title: Physics Speedrun - Magnetic Field
layout: wiki
wiki: notes-physics
order: 302
---

![Magnetic Field](https://cdn.duanyll.com/img/20230214174320.png)

Magnetism is the interaction of clectric currents or moving charges. Magnetic field is

1. Created by / interacts on **currents** or **moving charges**
2. **Closed field lines** without beginning or end

## Ampere Force

Magnetic field exerts a force on a current, called Ampere forece. In uniform field:

![Ampere force in uniform field](https://cdn.duanyll.com/img/20230214174809.png)

$$
\vec{F}=I\vec{l}\times\vec{B}\label{label1}
$$

The magnetic field $\vec{B}$ is defind by the formula $(\ref{label1})$. SI Unit for $B$: Tesla 

$$
1\un{T}=1\un{N/A\cdot M}=10^4\un{G}
$$

General case: nonuniform $B$, curved wire:

$$
\d\vec{F}=I\d\vec{l}\times\vec{B}\implies\vec{F}=\int I\d\vec{l}\times\vec{B}
$$

![Curved wire in uniform field](https://cdn.duanyll.com/img/20230214180736.png)

In uniform field, it is equivalant to a stright wire from A to B.

---

![Interaction of currents](https://cdn.duanyll.com/img/20230214181142.png)

Magnetic field freated by current

$$
B=k\frac{I}{r}
$$

---

### Magnetic Dipole

![A rectangular current loop in a uniform field](https://cdn.duanyll.com/img/20230214181352.png)

Total force is zero, but torque on the loop:

$$
\tau=BIS\sin\theta
$$

Magnetic dipole moment:

$$
\vec{\mu}=I\vec{S}
$$

> Direction of $\vec{S}$ is defined by the right-hand rule.

Torque:

$$
\vec{\tau}=\vec{\mu}\times\vec{B}
$$

> Valid for any plane current loop. A small circular current is called a *magnetic dipole*.

For a $N$ loops coil / solenoid: $\vec{\mu}=NI\vec{S}$

---

![An electron in an atom](https://cdn.duanyll.com/img/20230214181912.png)

Orbital angular momentum: $L=mvr$

$$
\mu=\frac{eL}{2m}
$$

![A rotating uniformly charged disk](https://cdn.duanyll.com/img/20230214182210.png)

$$
\mu=\int_0^R\frac{\omega}{2\pi}\sigma\cdot2\pi r\d r\cdot\pi r^2=\frac{1}{4}\pi\omega\sigma R^4
$$

---

### Lorentz Force

Magnetic field exerts a force on a moving charge:

$$
\vec{F}=q\vec{v}\times\vec{B}
$$

Lorentz force does not do work on the charge.

When $\vec{v}\parallel\vec{B}$, $\vec{F}=0$, free motion.

![Uniform circular motion](https://cdn.duanyll.com/img/20230214182813.png)

When $\vec{v}\perp\vec{B}$, the point charge do a uniform circular motion.

$$
\begin{aligned}
    F&=qvB=\frac{mv^2}{R}\\
    R&=\frac{mv}{qB}\\
    T&=\frac{2\pi R}{v}=\frac{2\pi m}{qB}
\end{aligned}
$$

![General case](https://cdn.duanyll.com/img/20230214183326.png)

The charge moves in a helix.

$$
\begin{aligned}
    R&=\frac{mv\sin\theta}{qB}\\
    T&=\frac{2\pi m}{qB}\\
    h&=\frac{2\pi mv\cos\theta}{qB}
\end{aligned}
$$

Lorentz equation: Total force on a charge in electromagnet field

$$
\vec{F}=q(\vec{E}+\vec{v}\times\vec{B})
$$

![The Hall effect](https://cdn.duanyll.com/img/20230214204122.png)

$$
V_H=KI_HB
$$

## Source of Magnetic Field

### Biot-Savart Law

![Infinitesimal current](https://cdn.duanyll.com/img/20230214204624.png)

Magnetic equivalant to Coulumb's law. Magnetic field due to an infinitesimal current:

$$
\d\vec{B}=\frac{\mu_0}{4\pi}\frac{I\d\vec{l}\times\vec{r}}{r^3}
$$

Permeability of free space: $\mu_0=4\pi\times10^{-7}\un{T\cdot m/A}$

Direction: right-hand rule.

Total magnetic field due to a full current:

$$
\vec{B}=\int\frac{\mu_0}{4\pi}\frac{I\d\vec{l}\times\vec{r}}{r^3}
$$

---

![A straight current](https://cdn.duanyll.com/img/20230214205438.png)

$$
B=\frac{\mu_0I}{4\pi a}|\cos\theta_1-\cos\theta_2|
$$

Infinite straight current:

$$
B=\frac{\mu_0I}{2\pi a}
$$

![No magnetic field at A or B. Also no field inside the cylinder when all the current is on the surface.](https://cdn.duanyll.com/img/20230214205800.png)

![Force between parallel wires](https://cdn.duanyll.com/img/20230214210034.png)

$F$ per unit length:

$$
\frac{F}{L}=\frac{\mu_0I_1I_2}{2\pi d}
$$

![Circular current on the axis](https://cdn.duanyll.com/img/20230214210217.png)

$$
B=\frac{\mu_0IR^2}{2(R^2+x^2)^{3/2}}
$$

Magnetic dipole moment: 

$$
\mu=I\cdot\pi R^2
$$

![At the center of circular / arc current](https://cdn.duanyll.com/img/20230214210354.png)

$$
B=\frac{\mu_0I}{2R}\frac{l}{2\pi R}
$$

---

### Gauss's Law for Magnetic Field

Magnetic flux:

$$
\Phi_B=\int\vec{B}\cdot\d\vec{S}
$$

Gauss's law for magnetic field:

$$
\oint\vec{B}\cdot\d\vec{S}=0
$$

$$
\nabla\cdot\vec{B}=0
$$

![Magnetic field lines](https://cdn.duanyll.com/img/20230214211227.png)

Magnetic field lines are closed lines without beginning or end.

### Ampere's Law

Magnetic field is produced by all currents:

$$
\oint\vec{B}\d\vec{l}=\mu_0I_{in}
$$

![The sign of enclosed current: right-hand rule](https://cdn.duanyll.com/img/20230214211543.png)

Magnetic field is not a conservative field:

$$
\nabla\times\vec{B}=\mu_0\vec{j}
$$

> Maxwell equations for *steady* magnetic field and electrostatic field:
>
> $$
> \begin{cases}
>     \nabla\cdot\vec{E}=\rho_E/\varepsilon_0\\
>     \nabla\times\vec{E}=0\\
>     \nabla\cdot\vec{B}=0\\
>     \nabla\times\vec{B}=\mu_0\vec{j}   
> \end{cases}
> $$

---

![Proper integral path for calculating magnetic field of a cylinderical current](https://cdn.duanyll.com/img/20230214212233.png)

$$
B=\begin{cases}
    \frac{\mu_0I}{2\pi r}&r>R\\
    \frac{\mu_0Ir}{2\pi R^2}&r<R
\end{cases}
$$

![Coaxial cable](https://cdn.duanyll.com/img/20230214212515.png)

No magnetic field when $r>R_3$.

![Central part of solenoid](https://cdn.duanyll.com/img/20230214212655.png)

Uniform magnetic field inside: Follow the intergration path.

$$
BL=\mu_0NI\implies B=\mu_0\frac{N}{L}I=\mu_0nI
$$

![Toroid](https://cdn.duanyll.com/img/20230214212905.png)

Nonuniform field inside:

$$
B=\frac{\mu_0NI}{2\pi r}
$$