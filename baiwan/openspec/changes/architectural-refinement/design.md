# Design: Geometric Simplification and Standardization

## 1. Forest Habitat Scaling
- **Current State**: Cabins are generated with small, hardcoded dimensions (approx 2m height), which is much smaller than the "Volume 2000" standard (which translates to ~12-15m tall buildings).
- **New Logic**:
  - Remove hardcoded small dimensions.
  - Use the `volume` parameter to drive the scale, just like `createCommercialGeometry`.
  - Base Geometry: Cylinder (Pod) + Cone (Roof) but scaled up.

## 2. Tidal Lounge: "Function as Geometry"
We define a mapping between function (implied by variant index) and form.

| Variant Index | Geometry Type | Dimensions (Relative) | Function Metaphor |
|:-------------:|:-------------:|:---------------------:|:------------------|
| 0 | **Ellipsoid** | W: 1.2, H: 0.8, D: 1.2 | "The Pearl" - Lounge |
| 1 | **Cube (Chamfered)** | W: 1.0, H: 1.0, D: 1.0 | "The Hub" - Service |
| 2 | **Ellipsoid (Tall)** | W: 0.8, H: 1.5, D: 0.8 | "The Pod" - Viewing |
| 3 | **Cube (Flat)** | W: 1.5, H: 0.5, D: 1.5 | "The Platform" - Dock |

## 3. Material & Color Palette
To unify the look:
- **Forest**: Warm Wood (`#8B5A2B`) + Dark Green Roofs.
- **Tidal**: Cyan Glass (`#AACCFF`) + White Structural accents.
- **Sun Valley**: White/Metal (`#DDDDDD`) + Green Accents.

This creates a "Warm-Cool-Neutral" balance across the three main zones.
