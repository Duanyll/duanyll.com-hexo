---
title: Physics Speedrun - Electric Field
layout: wiki
wiki: notes-physics
order: 301
---

## Electric Charge

1. Two types: positive, negative
2. Quantized: $e=1.6\times10^{-19}\un{C}$
3. Conserved.

## Coulomb's Law

$$
\vec{F}=k\frac{Q_1Q_2}{r^2}\hat{r}=\frac{1}{4\pi\varepsilon_0}\frac{Q_1Q_2}{r^2}\hat{r}
$$

$k=9.0\times10^9\un{N\cdot m^2/C^2}$

_Premittivity_ of free space $\varepsilon_0=8.85\times10^{-12}\un{C^2/N\cdot m^2}$

## Electric Field

$$
\vec{E}=\lim_{q\to0}\frac{\vec{F}}{q}
$$

**For a point charge:**

$$
\vec{E}=\frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2}\hat{r}
$$

---

![Uniformly distributed charge along a line](https://cdn.duanyll.com/img/20230213221830.png)

$\lambda$: Charge per unit length

$$
E_x=\frac{\lambda}{4\pi\varepsilon_0a}(\sin\theta_2-\sin\theta_1)
$$

$$
E_y=\frac{\lambda}{4\pi\varepsilon_0a}(\cos\theta_1-\cos\theta_2)
$$

Notice that $\theta_2$ is defined as the outer angle. When it is infinitly long, $\theta_1=0,\theta_2=\pi$,

$$
E_x=0,E_y=\frac{\lambda}{2\pi\varepsilon_0a}
$$

![A plane of charge](https://cdn.duanyll.com/img/20230213222420.png)

$\sigma$: Charge per unit area

$$
E=E_y=\frac{\sigma}{2\varepsilon_0}\label{einfplane}
$$

![For a uniformly charged ring](https://cdn.duanyll.com/img/20230213222932.png)

$Q$: Total charge

$$
\d E=\frac{\d Q}{4\pi\varepsilon_0r^2}
$$

$$
E={\frac{Q\cos\theta}{4\pi\varepsilon_{0}r^{2}}}={\frac{Q\cdot x}{4\pi\varepsilon_{0}(x^{2}+R^{2})^{3/2}}}
$$

![A semi-circle](https://cdn.duanyll.com/img/20230213223336.png)

$\lambda$: Charge per unit length

$$
E_o=\frac{\lambda}{2\pi\varepsilon_0R}
$$

![A uniformly charged disk](https://cdn.duanyll.com/img/20230213223553.png)

$\sigma$: Charge per unit area

$$
\d Q=\sigma2\pi r\d r
$$

$$
\d E={\frac{x \d Q}{4\pi\varepsilon_{0}(x^{2}+r^{2})^{3/2}}}
$$

$$
E=\frac{\sigma}{2\varepsilon_{0}}\left(1-\frac{x}{\sqrt{x^{2}+R^{2}}}\right)
$$

$R\to\infty\implies E=\frac{\sigma}{2\varepsilon_0}$ The infinite plane $(\ref{einfplane})$

![A parallel-plate capacitor](https://cdn.duanyll.com/img/20230213224052.png)

$\sigma$: Charge per unit area

$$
E=\frac{\sigma}{\varepsilon_0}
$$

---

### Electric Dipoles

Combination of two equal charges of opposite charges is called an electric dipole.

**Dipole moment**: $\vec{p}=Q\vec{l}\;(-Q\to+Q)$

![Dipole in external field](https://cdn.duanyll.com/img/20230213224447.png)

1. Total force $\vec{F}=\vec{F_+}+\vec{F_-}=0$
2. Torque on the dipole

$$
\tau=QEl\sin\theta=pE\sin\theta
$$

$$
\vec{\tau}=\vec{p}\times\vec{E}
$$

### Field Lines

![Field lines](https://cdn.duanyll.com/img/20230213224812.png)

1. The field point is in the direction **tangent** to the field line.
2. **Magnitude** of $E\propto$ numbers of lines crossing unit area $\perp$ the lines.
3. _Starts on + charges, ends on - charges._
4. _Never cross. Never closed._

### Electric Flux

$\Phi_E$: Electirc flux through an area $\propto$ numbers of field lines passing that area.

![Uniform field](https://cdn.duanyll.com/img/20230213225307.png)

In uniform field: $\Phi_E=\vec{E}\cdot\vec{S}$

![General cases](https://cdn.duanyll.com/img/20230213225422.png)

General cases: $\Phi_E=\int\vec{E}\cdot\d\vec{S}$

For a closed surface, define **outward as positive**, the net flux: $\Phi_E=\oint\vec{E}\cdot\d\vec{S}$

### Gauss's Law

The Gauss's law:

$$
\oint\vec{E}\cdot\d\vec{S}=\frac{Q_{in}}{\varepsilon_0}
$$

Differential form:

$$
\nabla\cdot\vec{E}=\frac{\rho}{\varepsilon_0}
$$

> Useful when the charge distribution is highly symmetric, may determine the magnitude of electric field by
>
> $$
> E=\frac{Q_{in}}{\varepsilon_0S}
> $$
>
> On a proper Gaussian surface, there must be $\vec{S}\perp\vec{E}$

---

![A spherical shell](https://cdn.duanyll.com/img/20230213230721.png)

Outside the shell: $E={\frac{Q}{4\pi\varepsilon_0r^{2}}}={\frac{\sigma}{\varepsilon_{0}}}$

Inside the shell: $E=0$

> Same for a uniformly charged **conductor** sphere

![A uniformly charged nonconducting sphere](https://cdn.duanyll.com/img/20230213231136.png)

Outside the shell: $E={\frac{Q}{4\pi\varepsilon_0r^{2}}}$

Inside the shell: $E=\frac{\rho r}{3\varepsilon_0},\rho=\frac{3Q}{4\pi R^3}$

![In a hole in a uniformly charged sphere, the electric field is uniform](https://cdn.duanyll.com/img/20230213231339.png)

![Proper Gaussian surface for an infinitly long cylinder](https://cdn.duanyll.com/img/20230213231531.png)

---

**Conductor in external field**

![](https://cdn.duanyll.com/img/20230213231657.png)

When in electorstatic equilibrium:

1. Inside: $E=0$
2. On surface: $\vec{E}\perp\vec{S}$

Charge tends to concentrate on surface with greater curvature.

## Electric Potential

Coulomb force is **conservative**. $\nabla\times\vec{E}=0$.

Potential energy $U$:

$$
U_b-U_a=-W_{ba}=-\int_a^bq\vec{E}\cdot\d\vec{l}
$$

Electric potential: $V=U/q$

Potential difference / voltage:

$$
V_{ab}=V_a-V_b=\frac{U_a-U_b}{q}=\int_a^b\vec{E}\cdot\d\vec{l}
$$

Usually let $V=0$ at infinity: $V_a=\int_a^\infty\vec{E}\cdot\d\vec{l}$

---

![Field created by a point charge](https://cdn.duanyll.com/img/20230214120900.png)

$$
V_a=\int_a^\infty\frac{Q}{4\pi\varepsilon_0r^2}\d r=\frac{Q}{4\pi\varepsilon_0r_a}
$$

![Charged conductor sphere](https://cdn.duanyll.com/img/20230214121247.png)

1. $r>R$: Same as point charge, $V_a=\frac{Q}{4\pi\varepsilon_0r_a}$
2. $r\leq R$: Same potential at any point, $V=\frac{Q}{4\pi\varepsilon_0R}$

![Uniformly charged rod](https://cdn.duanyll.com/img/20230214160240.png)

$$
V_a=\frac{\lambda}{4\pi\varepsilon_0}\ln\frac{d+L}{d}\\
$$

![Uniformly charged ring](https://cdn.duanyll.com/img/20230214160440.png)

$$
V_a=\frac{Q}{4\pi\varepsilon_0r}=\frac{Q}{4\pi\varepsilon_0\sqrt{x^2+R^2}}
$$

---

Determine $\vec{E}$ from $V$:

$$
\vec{E}=-\nabla V=-\frac{\p V}{\p x}\hat{i}-\frac{\p V}{\p y}\hat{j}-\frac{\p V}{\p z}\hat{k}
$$

## Capacitors

Capacitance of capacitor:

$$
Q=CV,C=\frac{Q}{V}
$$

---

![A parallel-plate capacitor](https://cdn.duanyll.com/img/20230213224052.png)

$$
E=\frac{\sigma}{\varepsilon_0}=\frac{Q}{\varepsilon_0S}
$$

$$
V=Ed=\frac{Qd}{\varepsilon_0S}
$$

$$
C=\frac{Q}{V}=\frac{\varepsilon_0S}{d}
$$

![Cylindrical capacitor](https://cdn.duanyll.com/img/20230214161321.png)

$$
E=\frac{\lambda}{2\pi\varepsilon_0r}
$$

$$
V_{12}=\int_{R_1}^{R_2}E\d r=\frac{\lambda}{2\pi\varepsilon_0}\ln\frac{R_1}{R_2}
$$

$$
C=\frac{Q}{V_{12}}=\frac{2\pi\varepsilon_0L}{\ln\frac{R_2}{R_1}}
$$

---

![Capacitors in series](https://cdn.duanyll.com/img/20230214161913.png)

$$
\frac{1}{C}=\frac{1}{C_1}+\frac{1}{C_2}
$$

![Capacitors in parallel](https://cdn.duanyll.com/img/20230214162008.png)

$$
C=C_1+C_2
$$

Electric energy stored:

$$
\d W=V\d q=\frac{q}{C}\d q
$$

$$
W=\int\frac{C}{q}\d q=\frac{Q^2}{2C}
$$

$$
U=\frac{1}{2}\frac{Q^2}{C}=\frac{1}{2}CV^2=\frac{1}{2}QV
$$

Energy per unit volume / Energy density:

$$
U=\frac{1}{2}\varepsilon_0E^2\cdot Sd\implies u=\frac{1}{2}\varepsilon_0E^2
$$

### Dielectrics

![Capacitor compeletely filled by a deilectric](https://cdn.duanyll.com/img/20230214170028.png)

Dielectric: Insulating material in capacitors.

1. Harder to break down: Increase $V$.
2. Less equivlant distance between plates.
3. Increase the capacitance: $C=KC_0,K\geq1$

Dielectric constant $K$: also noted as $\varepsilon_r$, relative permittivity.

The permittivity of material: $\varepsilon=K\varepsilon_0$

$$
E=\frac{\sigma}{\varepsilon}=\frac{Q}{\varepsilon S}=\frac{E_0}{K}
$$

Energy density in a dielectric:

$$
u=\frac{1}{2}\varepsilon E^2
$$
