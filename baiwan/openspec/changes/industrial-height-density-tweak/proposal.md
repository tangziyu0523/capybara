# Proposal: Industrial Height Reduction and Density Increase

## Why
The user requests adjustments to the Sun Valley Industrial District:
1. **Height Reduction**: Current towers (~60-90m) are likely too tall compared to the city average. User wants them lowered to the "average height".
2. **Center Gathering**: Further compress the layout towards the center.
3. **Constraints**: Maintain functional zoning and safety/transport gaps.

## What Changes

### 1. Height Calibration
- **Current Average**: 
  - Commercial/Residential (standard): ~30m.
  - Giant Forest: ~36m.
  - Current Sun Valley: ~60-90m.
  - Target Average: Approx **30-40m**.
- **Action**: Reduce the base height scale of Industrial Towers by ~50%.

### 2. Position Optimization (Gathering)
- **Current Layout**: Columns at +/- 14m, +/- 28m, +/- 42m.
- **Target**: "Gather towards center" while keeping 80% min spacing.
- **New Layout**: Compress X coordinates further, but respect the central transport spine (which needs ~20m gap).
  - Central Gap: Keep +/- 12m (24m gap) for transport safety.
  - Inner Columns: Move from +/- 28m to +/- 24m.
  - Outer Columns: Move from +/- 42m to +/- 36m.
- **Density**: This increases visual density by bringing outer layers closer.

## Impact
- **DistrictBuilder.js**: Update `generateSunValleyLayout` geometry scale and X-offsets.
- **Visuals**: Buildings will look more squat/standardized and the cluster will be tighter.
