---
title: Physics Speedrun - Quantum Theory
layout: wiki
wiki: notes-physics
order: 304
---

## Photon Theory of Light

The light ought to be emitted, transported, and absorbed as tiny particles, or **photons**.

### Blackbody Radiation

All object emit thermal radiation. The total intensity of radiation $\propto T^4$.

![Differnent theories on the spectrum of blackbody radiation](https://cdn.duanyll.com/img/20230215221748.png)

Wien's law predicts the peak wavelength as

$$
\lambda_PT=2.90\times10^{-3}\un{m\cdot K}
$$

Planck's formula compeletely fits the experimental data.

$$
I(\lambda,T)=\frac{2\pi hc^2\lambda^{-5}}{e^\frac{hc}{\lambda kT}-1}
$$

Planck's hypothesis: The energy of any molecular vibration could be only some whole number multiply of $hf$, where the Planck constant

$$
h=6.626\times10^{-34}\un{J\cdot s}
$$

and $f$ is the frequency of oscillation.

Quantum of radiation:

$$
E=n\cdot hf=\frac{hc}{\lambda}
$$

### Photoelectric Effect

![Circuit of photoelectic effect](https://cdn.duanyll.com/img/20230216110827.png)

Photoelectric effect: electron emitted under light.

![Relationships in photoelectic effect](https://cdn.duanyll.com/img/20230216110958.png)

The photocurrent $I$ changes with voltage $V$

1. When $V$ is high, there is saturated photocurrent, related to the intensity of light
2. When $V$ is low, there is a **stopping potential / voltage** $V_0$,
   $$
   E_{k\max}=\frac{1}{2}mv^2=eV_0
   $$
   which is independent of the intensity of light. $V_0$ and $E_{k\max}$ changes over the **frequency** of light.
3. When $f$ is low, there is a **cutoff frequency** $f_0$, under which there will not be any photoelectrons.

An electron is ejected out of the metal atom by an inelastic collition with a _single_ photon. To get out of the atom, the electron need to absorb a constant amount of energy from the photon, and the rest of the photon's energy transforms into the electron's kinetic energy $E_k$. The minimum energy to get out depends on the atom's type, and is called **work function** $W_0$. There is the **photoelectric equation**:

$$
hf=E_{k\max}+W_0
$$

From the equation we know:

1. $E_{k\max}=hf-W_0$ has a linerar relationship
2. $f_0=W_0/h$

### Compton Effect

![Compton's X-ray scattering experiment](https://cdn.duanyll.com/img/20230216112426.png)

Scattering means light propagate in different directions when passing through material. In classical theory, EM waves are forced vibration, so their frequency (wavelength) should remain the same after being scattered. However, contradictionary experimental results have been observed:

![Wavelength changed after scattering](https://cdn.duanyll.com/img/20230216113232.png)

$\Delta\lambda=\lambda-\lambda_0$ depends on the **scattering angle** $\phi$. In the view of photon theory, in Compton scattering, a _single_ photon hits an electroin and knocks it out of the atom, which is an elastic collision procedure. Energy is conserved during the procedure:

$$
\frac{hc}{\lambda_0}+m_0c^2=\frac{hc}{\lambda}+mc^2
$$

![Compton scattering](https://cdn.duanyll.com/img/20230216113708.png)

The photon loses energy, causing $\lambda>\lambda_0$. With the conservation of momentum:

$$
\begin{aligned}
    x:\frac{h}{\lambda_0}&=\frac{h}{\lambda}\cos\phi+mv\cos\theta\\
    y:0&=\frac{h}{\lambda}\sin\phi-mv\sin\theta\\
\end{aligned}
$$

$$
m=\frac{m_0}{\sqrt{1-v^2/c^2}}
$$

we can solve the **Compton shift**:

$$
\Delta\lambda=\lambda-\lambda_0=2\lambda_C\sin^2\frac{\phi}{2}
$$

and the **Compton wavelength**:

$$
\lambda_C=\frac{h}{m_0c}=2.43\times10^{-12}\un{m}
$$

### Wave-Partical Duality

Not only light has the property of wave-partial duality, but all matter does, called **de Borilie wave** or matter-wave. For a partical with momentum $p$, it has a wavelength

$$
\lambda=\frac{h}{p}
$$

## Bohr Model

### Early Models of Atom

1. J.J Thomtons's plum-pudding model
2. Rutherfords's planetary model
3. Bohr model

### The Spectrum of Hydrogen

![The spectrum of hydrogen](https://cdn.duanyll.com/img/20230216115308.png)

Balmer's formula for visible lines:

$$
\frac{1}{\lambda}=R\left(\frac{1}{2^2}-\frac{1}{n^2}\right),n=3,4,\cdots
$$

Rydberg constant:

$$
R=1.097\times10^7\un{m^{-1}}
$$

General formula for other series in UV and IR regions:

$$
\frac{1}{\lambda}=R\left(\frac{1}{k^2}-\frac{1}{n^2}\right),n=k+1,k+2,\cdots
$$

- $k=1:$ Lyman series (ultraviolet)
- $k=2:$ Balmer series (visible)
- $k=3:$ Paschen series (infrared)

### Bohr's Three Postulates

1. Stationary states: All electrons are in stable and discrete energy level
2. Quantum transition: An electron jumps to another energy level by emit or absorb a photon
   $$
   hf=E_n-E_k
   $$
3. Quantum condition for angular momentum: The electron's possible angular momentum is also discrete
   $$
   L=mvr=n\hbar,n=1,2,\cdots
   $$

$$
\hbar=\frac{h}{2\pi}
$$

### Orbital Properties

![Rutherford's model](https://cdn.duanyll.com/img/20230216150758.png)

$$
\frac{e^2}{4\pi\varepsilon_0r^2}=m\frac{v^2}{r},L=mvr=\frac{nh}{2\pi}
$$

The orbital radius of electron is quantized

$$
r_n=n^2\frac{\varepsilon_0h^2}{\pi me^2}=n^2r_1,n=1,2,\cdots
$$

where $r_1$ is called **Bohr radius**:

$$
r_1=\frac{\varepsilon_0h^2}{\pi me^2}=0.529\times10^{-10}\un{m}
$$

Orbital kinetic energy:

$$
E_k=\frac{1}{2}mv^2=\frac{e^2}{8\pi\varepsilon_0r_n}
$$

Electric potential energy:

$$
U=-eV=-\frac{e^2}{4\pi\varepsilon_0r_n}
$$

Total energy:

$$
E_n=E_k+U=-\frac{1}{n^2}\frac{me^4}{8\varepsilon_0^2h^2}=\frac{-13.6\un{eV}}{n^2}
$$

is also quantized.

### Transition and Radiation

- $n=1$: Ground state, $E_1=-13.6\un{eV}$
- $n=2$: First excited state, $E_1=-3.4\un{eV}$
- $n=3$: Second excited state, $E_1=-1.51\un{eV}$

The energy are all negative, called bound state. The binding / ionization energy:

$$
E=13.6\un{eV}
$$

Jumping from upper state $n$ to lower state $k$:

$$
hf=E_n-E_k=hc\cdot R\left(\frac{1}{k^2}-\frac{1}{n^2}\right)
$$

where $R$ is the Rydberg constant:

$$
R=\frac{me^4}{8\varepsilon_0^2h^3c}=1.097\times10^7\un{m^{-1}}
$$

![Energy level digram](https://cdn.duanyll.com/img/20230216152420.png)

> From de Borglie's hypothesis, we may consider the stable orbit for electron as a standing wave. For de Broglie wave:
>
> $$
> \lambda=\frac{h}{mv}
> $$
>
> and for a circular standing wave:
>
> $$
> 2\pi r=n\lambda
> $$
>
> We can get the quantum condition by Bohr:
>
> $$
> L=\frac{nh}{2\pi}
> $$

## Quantum Mechanics

### Wave Function

The wave function $\Psi$ is the _displacement_ of wave. The energy density of EM wave satisfies $u\propto E^2$. In the view of particle theory, the number density of photon should satisfy $\rho_N\propto u\propto E^2$. As discrete particles we can consider the **probability density** of finding photon, and let $p\propto|\Psi|^2$. As a probability distribution, the wave function should satisfy the **normallization condition**:

$$
\int|\Psi|^2\d V=1
$$

Therefore we can treat the de Broglie wave as a probability wave. $|\Psi|^2\d V$ at a certain point represents the probability of finding the particle within volume $\d V$ aboud the given position and time.

![Conherent wave functions](https://cdn.duanyll.com/img/20230216155126.png)

There is interference between **coherent** wave functions.

$$
P_1=|\Psi_1|^2,P_2=|\Psi_2|^2\\
P_{12}=|\Psi_1+\Psi_2|^2\neq P_1+P_2
$$

![De-conherence of wave functions](https://cdn.duanyll.com/img/20230216155332.png)

When **de-conherence** occurs,

$$
P'_{12}=P_1+P_2
$$

### Uncertainty Principle

> Measurement disturbs the state of the particle.

When we observe an electron by a photon, increasing $\lambda$ causes larger $\Delta x$, and decreasing $\lambda$ causes larger $\Delta p$. There is always an uncertainty in position or momentum. The **Heisenberg uncertainty principle** says that,

> The position and the momentum of a particle can not be precisely determined simultaneously.

$$
(\Delta x)(\Delta p)\geq\hbar=\frac{h}{2\pi}
$$

Other forms:

$$
(\Delta E)(\Delta t)\geq\hbar=\frac{h}{2\pi}
$$

$$
(\Delta L_z)(\Delta \phi)\geq\hbar=\frac{h}{2\pi}
$$

The principle indicates that

> Microscopic particles will not stay at rest.

![Diffraction of electron](https://cdn.duanyll.com/img/20230216160329.png)

The central bright fringe satisfies the uncertainty relation

$$
\Delta x\Delta p_x=h
$$

### Schrodinger Equation

The Schrodinger equaiton is an equation to determine the wave function $\Psi$. A **free particle**[^1] with $(E,p)$ moves along $x$ axis. Consider a wave function in general complex value form

[^1]: No interaction with outside, has spatial symmetry

$$
\Psi=Ae^{-\frac{i}{\hbar}(Et-px)}\implies
\begin{cases}
    \frac{\p^2\Psi}{\p x^2}=-\frac{p^2}{\hbar^2}\Psi\\
    \frac{\p\Psi}{\p t}=-\frac{i}{\hbar}E\Psi
\end{cases}
$$

For **nonrelativistic** free particle:

$$
E=\frac{p^2}{2m}
$$

And consider the potentioal energy, we get its Schrodinger equation:

$$
-\frac{\hbar^2}{2m}\frac{\p^2\Psi}{\p x^2}+U\Psi=i\hbar\frac{\p\Psi}{\p t}
$$

3D time-dependent Schrodinger equation:

$$
i\hbar\frac{\p\Psi}{\p t}=\left(-\frac{\hbar^2}{2m}\nabla^2+U\right)\Psi=\hat{H}\Psi
$$

$\hat{H}$ is the Hamilton operator

$$
\hat{H}=-\frac{\hbar^2}{2m}\nabla^2+U
$$

Time-independent Schrodinger equation:

$$
\left(-\frac{\hbar^2}{2m}\nabla^2+U\right)\psi=E\psi
$$

Solve the equation

1. Each solution represents a **stationary** state
2. The system may be in a **superposition** state
3. The wave function of the system should be _continuous, finite and normalized_.

---

![An infinitely deep well potential](https://cdn.duanyll.com/img/20230216162310.png)

$$
U(x)=\begin{cases}
    0&0<x<L\\
    \infty&x\leq0\textrm{ and }x\geq L
\end{cases}
$$

The Schrodinger equation:

$$
-\frac{\hbar^2}{2m}\frac{\p^2\psi}{\p x^2}+U\psi=E\psi
$$

$$
\implies\frac{\d^2\psi}{\d x^2}+k^2\psi=0
$$

where

$$
k^2=\frac{2mE}{\hbar^2}
$$

General solution:

$$
\psi(x)=A\sin kx+B\cos kx
$$

$\psi$ must be continous $\implies\psi(0)=\psi(L)=0\implies$ the energy is quantized:

$$
k=\frac{n\pi}{L}\implies E_n=n^2\frac{h^2}{8mL^2},n=1,2,\cdots
$$

> Notice that the minimum energy is not zero (zero point energy)

The wave function:

$$
\psi_n(x)=\sqrt{\frac{2}{L}}\sin(\frac{n\pi}{L}x)
$$

![Figure of wave function](https://cdn.duanyll.com/img/20230216163156.png)

de Broglie wavelength:

$$
p_n=\sqrt{2mE_n}=\frac{nh}{2L}\implies\lambda_n=\frac{h}{p_n}=\frac{2L}{n}
$$

> ![A finite potential well](https://cdn.duanyll.com/img/20230216163446.png)
>
> The paritcle can get out even if $E<U_0$ (Quantum tunneling)
>
> Tunneling probability
>
> $$
> T\approx e^{-2GL}
> $$
>
> where
>
> $$
> G=\sqrt{\frac{2m(U_0-E)}{\hbar^2}}
> $$

### Atoms

Schrodinger equation for hydrogen atom

$$
-\frac{\hbar^{2}}{2m}\nabla^{2}\psi-\frac{e^{2}}{4\pi\varepsilon_{0}r}\psi=E\psi
$$

Solution can be labeled with **3 quantum numbers**

1. Principle quantum number $n$
   $$
   E_n=\frac{-13.6\un{eV}}{n^2},n=1,2,\cdots
   $$
2. Orbital quantum number $l$
   $$
   L=\sqrt{l(l+1)}\cdot\hbar,l=0,1,\cdots n-1
   $$
   $L$ is the magnitude of orbital angular momentum
3. Magnetic quantum number $m_l$
   $$
   L_z=m_l\hbar,m_l=-l,\cdots,+l
   $$
   Space quantization: $L_z<L$

Except the orbital motion, the electron also has a spin and the spin angular momentum. Every elementary particle has a spin. Spin in a relativistic effect. Spin quantum number can be integers, and such kind of particles are called **boson**, such as photons. It can also be half-integers, called **fermion**, like electrons:

$$
s=\frac{1}{2},S=\sqrt{s(s+1)}\cdot\hbar=\frac{\sqrt{3}}{2}\hbar,m_s=\plusmn\frac{1}{2}
$$

Each electron occupies a state $(n,l,m_l,m_s)$

![Different possile states for an electron with n=2](https://cdn.duanyll.com/img/20230222225555.png)

In a hydrogen atom, the wave function for ground state

$$
\psi_{100}=\frac{1}{\sqrt{\pi r_0^3}}e^{-\frac{r}{r_0}}
$$

which produces a radial probability distribution $|\psi_{100}|^2$

![Radial probability distribution](https://cdn.duanyll.com/img/20230222225950.png)

This tells that there is no orbit for the electron in atom. It's a probabality distribution related to different wave functions, like an **electron cloud**.

The energy of an electron in an atom depends on $n$ and $l$. In complex atoms where atomic number $Z>1$, there are two principles for the configuration of electrons:

1. Lowest energy principle: At the ground state, each electron tends to occupt the lowest energy level. An empirical formula of energy:
   $$
   E\approx n+0.7l
   $$
2. Pauli exclusion principle: No two electrons in an atom can occupy the same quantum state.

![Shell structure of electrons](https://cdn.duanyll.com/img/20230222230611.png)
