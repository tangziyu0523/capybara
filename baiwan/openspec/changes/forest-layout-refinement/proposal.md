# Proposal: Forest Habitat Layout Refinement

## Why
The current distribution of buildings and vegetation in the "Forest Habitat" (林语栖所) district uses a simple random placement with center bias. This results in:
1. **Unrealistic Density**: Buildings may overlap or be too close to trees.
2. **Lack of Ecology**: All trees are treated identically without considering species-specific growth space.
3. **Visual Clutter**: The lack of minimum spacing rules creates a chaotic rather than organic appearance.

To achieve the "Forest Habitat" vision of buildings seamlessly integrated with nature, we need a spatial distribution algorithm that enforces ecological rules.

## What Changes
This proposal introduces a **Poisson Disk Sampling** based layout system specifically for the Forest Habitat district.

1. **Spatial Layout Algorithm**:
   - Implement a distribution algorithm that guarantees a minimum distance ($r$) between entities.
   - Support variable radii for different entity types (Cabins vs. Trees).

2. **Vegetation Rules**:
   - Define spacing rules for different tree species (e.g., Large Canopy vs. Slender).
   - Enforce "Building-Tree" and "Tree-Tree" spacing constraints.

3. **Visual Logic**:
   - Ensure buildings are nestled *among* trees, not just placed randomly near them.

## Impact
- **DistrictBuilder.js**: Will replace the `while` loop random generation for 'residential' type with a new `generateForestLayout` method.
- **New Utility**: A `PoissonDiskSampler` or similar utility class/function may be added (or inlined if simple).
- **Performance**: Generation might take slightly longer (ms) but is negligible for the static city build.
