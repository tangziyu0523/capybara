# Proposal: Sun Valley Scale Standardization and Compact Layout

## Why
The user has requested that the "Sun Valley" (Industrial/Energy) district match the scale of other city buildings (standard size) and adopt a compact, land-maximizing layout.
- **Scale Consistency**: Ensure industrial buildings are not smaller or larger than the standard "volume 2000" metric used elsewhere, but specifically match the *current* (potentially scaled-up) standards of the city.
- **Efficiency**: Move from a "dispersed canyon" layout to a "compact industrial grid" to maximize land use.

## What Changes

### 1. Scale Standardization
- **Volume**: Set target volume to match the recently upscaled Forest District or standard commercial blocks (approx. 8000-10000 units based on recent Forest Gigantism changes, or revert to standard 2000 if "standard" implies the original baseline. *Interpretation: The user said "match other areas", and Forest is now giant. However, usually "standard" refers to the Commercial baseline. Given the "Gigantism" context, we should likely aim for a robust, large industrial scale, e.g., Volume ~5000-8000.*)
- **Dimensions**: Ensure Aspect Ratio is functional (wide factories, tall silos).

### 2. Layout Logic: Compact Grid
- **Pattern**: Replace the "Linear Spine" with a **High-Density Industrial Grid**.
- **Spacing**: Minimal safety distance between units.
- **Zoning**: Interleave Industrial (Factories) and Energy (Solar/Wind) blocks tightly.

## Impact
- **DistrictBuilder.js**: Rewrite `generateSunValleyLayout` to use a grid-packing algorithm instead of linear distribution.
- **Visuals**: A dense, "Blade Runner"-esque industrial zone rather than a sparse solar farm.
