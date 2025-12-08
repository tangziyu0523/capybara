# Design: Calibrated Industrial Grid

## 1. Height Analysis & Adjustment
- **Formula**: `FinalHeight = BaseGeoHeight * BaseScale * ScaleY`
- **Current**: `(15~20) * 3.0 * (1.0~1.5)` = 45m ~ 90m.
- **Target**: Average ~35m.
- **New Factor**: Reduce `BaseScale` from 3.0 to **1.8**.
  - New Height: `(15~20) * 1.8 * (1.0~1.5)` = 27m ~ 54m. Average ~40m.
  - This matches the "Giant Forest" (~36m) and standard Commercial (~30m).

## 2. Layout Compression
We need to squeeze the grid while keeping the center clear.

| Column | Old X | New X | Shift |
|:---:|:---:|:---:|:---:|
| **Inner L/R** (2,3) | +/- 14m | +/- **12m** | -2m (Gap 24m) |
| **Mid L/R** (1,4) | +/- 28m | +/- **22m** | -6m |
| **Outer L/R** (0,5)| +/- 42m | +/- **32m** | -10m |

- **Spacing Check**:
  - Center Gap: 24m. (Safe for 4m tube).
  - Inner-Mid Gap: 10m. Building Width ~7m (scaled down). Gap 3m. (Tight but >80% of original).
  - Mid-Outer Gap: 10m.
- **Density**: 15-20% increase in spatial density (buildings per area).

## 3. Implementation
- Modify `DistrictBuilder.js` `generateSunValleyLayout`.
- Update `baseScale` variable.
- Update `colX` array.
