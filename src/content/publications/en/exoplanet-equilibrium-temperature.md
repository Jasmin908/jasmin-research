---
title: 'Estimating the Equilibrium Temperature of Exoplanets'
description: 'A worked derivation of the radiative equilibrium temperature of a planet, applied to Earth and to a handful of known exoplanets.'
abstract: 'The equilibrium temperature is the simplest physical estimate of how warm a planet is. This example paper derives it from energy balance, discusses the assumptions behind it – albedo, heat redistribution and the absence of an atmosphere – and shows why it underestimates Earth’s mean surface temperature by roughly 33 K. It is placeholder content that demonstrates equations, citations and the PDF download.'
date: 2026-10-28
lang: en
type: paper
subjects: [astronomy]
tags: [exoplanets, radiation, energy balance]
featured: true
example: true
pdf: /papers/exoplanet-equilibrium-temperature.pdf
references:
  - id: seager2010
    authors: 'Seager, S.'
    year: 2010
    title: 'Exoplanet Atmospheres: Physical Processes'
    source: 'Princeton University Press'
  - id: example2026
    authors: 'Example, A., & Placeholder, B.'
    year: 2026
    title: 'A placeholder reference that shows how journal articles are listed'
    source: 'Journal of Example Studies, 1(1), 1–10'
    url: 'https://example.org/placeholder-reference'
---

Every planet sits in a flow of energy: light arrives from its star, and heat leaves as infrared radiation. When the two balance, the planet settles at a characteristic temperature. Working out that temperature is a classic first exercise in planetary science [@seager2010].

## Energy in, energy out

A star of radius $R_\star$ and effective temperature $T_\star$ emits a total power given by the Stefan–Boltzmann law:

$$
L_\star = 4\pi R_\star^2 \, \sigma T_\star^4
$$

At a distance $a$, this power is spread over a sphere of area $4\pi a^2$. A planet of radius $R_p$ intercepts it with its cross-section $\pi R_p^2$ and reflects a fraction $A$, the **Bond albedo**. The absorbed power is therefore

$$
P_\text{in} = (1 - A)\,\frac{L_\star}{4\pi a^2}\,\pi R_p^2 .
$$

If the planet radiates like a black body from its whole surface at a uniform temperature $T_\text{eq}$, it loses

$$
P_\text{out} = 4\pi R_p^2 \, \sigma T_\text{eq}^4 .
$$

### Solving for the temperature

Setting $P_\text{in} = P_\text{out}$, the planet’s radius cancels and we are left with

$$
T_\text{eq} = T_\star \sqrt{\frac{R_\star}{2a}}\,(1 - A)^{1/4}.
$$

The result depends only on the star, the orbital distance and the albedo – not on the size of the planet.

## A test case: Earth

With $T_\odot \approx 5772\,\text{K}$, $R_\odot \approx 6.96 \times 10^8\,\text{m}$, $a = 1\,\text{AU} \approx 1.496 \times 10^{11}\,\text{m}$ and $A \approx 0.3$:

| Quantity | Value |
| --- | --- |
| $\sqrt{R_\odot / 2a}$ | 0.0482 |
| $(1 - A)^{1/4}$ | 0.915 |
| $T_\text{eq}$ | ≈ 255 K |

Earth’s observed mean surface temperature is about 288 K. The difference of roughly 33 K is the greenhouse effect – something the simple model deliberately leaves out [@example2026].

## What the model ignores

- **Atmospheres.** Greenhouse gases trap outgoing radiation and warm the surface.
- **Heat redistribution.** Tidally locked planets may have a scorching day side and a frozen night side; the factor 4 in the derivation assumes the heat is spread evenly.
- **Internal heat.** Young giant planets still radiate energy left over from their formation.

> The equilibrium temperature is less a prediction than a baseline: a number to compare reality against.

## Conclusion

Despite its simplicity, $T_\text{eq}$ is the first number astronomers compute for a newly discovered planet. It frames the question of habitability and tells us how much an atmosphere must be doing to explain what we observe.
