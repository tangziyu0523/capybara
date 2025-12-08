# Proposal: Architectural Refinement for Forest and Tidal Districts

## Why
To better align with the "nature-tech fusion" vision, we need to refine the scale and geometry of specific districts:
1. **Forest Habitat (林语栖所)**: Current cabins are too small/isolated compared to the rest of the city. We need to standardize their scale while maintaining the organic, sparse layout.
2. **Tidal Lounge (潮汐客厅)**: The current complex "Brain Coral" forms are visually cluttered. We will shift to a cleaner, "Function follows Form" approach using simplified geometric primitives (Ellipsoids, Cubes) that still retain the high-tech/transparent aesthetic.
3. **Overall Aesthetics**: Unify the color palette and improve the blending of architecture with nature.

## What Changes

### 1. Forest Habitat Refinement
- **Scale Standardization**: Adjust cabin geometry generation to match the average volume of other city buildings (approx. 2000 units volume).
- **Layout**: Maintain the recently implemented Poisson Disk sparse layout but ensure the larger cabins still fit comfortably among trees.

### 2. Tidal Lounge Simplification
- **Geometry**: Replace `createOrganicCoralGeometry` with `createTidalGeometricGeometry`.
- **Forms**:
  - **Ellipsoids (Spheres)**: For public gathering/lounge areas.
  - **Cubes/Prisms**: For functional/service nodes.
- **Aesthetics**: Keep the high-transmission glass material but apply it to these cleaner forms.

### 3. Visual Unification
- **Color Palette**: Refine the `buildingTypes` color map to ensure harmony between the warm wood of the Forest and the cool blue of the Tidal district.
- **Landscape**: Enhance the "transition" zones by ensuring vegetation density gradients.

## Impact
- **DistrictBuilder.js**: Significant updates to geometry generation functions.
- **Visuals**: The city will look more cohesive and less "procedurally chaotic" in the Tidal zone.
