# Design: Giant Forest Scaling

## 1. Geometric Scaling
We apply a 3x multiplier to the *current* scaled-up values.

| Element | Previous (Approx) | New Target (Approx) | Code Value (Radius/Height) |
|:---:|:---:|:---:|:---:|
| **Cabin Leg Height** | 2.0 | **6.0** | `legH` |
| **Cabin Body Radius** | 3.0 | **9.0** | `bodyR` |
| **Cabin Body Height** | 4.0 | **12.0** | `bodyH` |
| **Tree Height** | 8-12m | **24-36m** | `trunkH` |
| **Tree Radius** | 4-6m | **12-18m** | `foliageR` |

## 2. Layout Distribution
With objects ~20m wide, spacing must increase drastically.
- **Cabin Spacing**: 40m -> **120m**
- **Tree Spacing**: 25m -> **80m**
- **Count**: 15 -> **5-8** (Very sparse monumental structures)

## 3. Landmark Removal
- Simply delete the code block injecting `tidal_landmark`.
- Remove the `createLandmarkGeometry` method.
