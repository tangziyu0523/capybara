# Proposal: Forest Gigantism and Landmark Removal

## Why
The user has requested a dramatic increase in the scale of the "Forest Habitat" elements (Cabins and Trees) by another 3x (on top of the previous 5x, effectively making them huge relative to the original) and the removal of the Tidal Landmark.
- **Visual Impact**: Create a "Giant Forest" aesthetic where nature dominates the architecture.
- **Simplification**: Remove the previously added Tidal Landmark to declutter the central view.

## What Changes

### 1. Forest Scale x3
- **Cabins**: Multiply current dimensions by 3.
  - Height: ~12m -> ~36m
  - Width: ~6m -> ~18m
- **Trees**: Multiply current dimensions by 3.
  - Height: ~10m -> ~30-40m
  - Canopy: Proportional increase.

### 2. Layout Adjustment
- **Density**: Due to the massive size increase, the spacing/spread in `generateForestLayout` must be significantly increased to prevent overlap.
- **Count**: Reduce count further to accommodate the giant models.

### 3. Tidal Landmark Removal
- **Revert**: Remove the `tidal_landmark` injection logic.
- **Cleanup**: Remove `createLandmarkGeometry` and related material logic.

## Impact
- **Visuals**: The Forest District will now feature monumental architecture and vegetation, potentially overshadowing other districts.
- **Performance**: Fewer objects but larger fill rate; likely neutral.
