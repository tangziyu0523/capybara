# Proposal: Sun Valley Canyon Redesign

## Why
The current layout of the "Sun Valley" (industrial zone) is too dense and fails to utilize the unique "canyon" topography. The user requested:
1. **Reduced Density**: Disperse buildings to respect the landscape.
2. **Terrain Integration**: Buildings should follow the canyon contours.
3. **Transport Connection**: A clear spine road connecting to the Core (Coral Reef Street).

## What Changes

### 1. Layout Logic Update
- **Sparse Canyon Placement**: Instead of a random cluster, we will place buildings linearly along the "canyon floor" and "canyon walls".
- **Terracing**: Buildings on the walls will be stepped/terraced.

### 2. Transportation Spine
- **Maglev Path**: Explicitly define a "Canyon Line" that runs along the valley floor (z-axis positive) connecting directly to the center (0,0).

### 3. Visuals
- **Density**: Reduce procedural count by ~50%.
- **Form**: Ensure buildings look "anchored" to the slope (using the existing `createEcoIndustrialGeometry` but positioned carefully).

## Impact
- **DistrictBuilder.js**: New `generateSunValleyLayout` method similar to the Forest one.
- **TransportationSystem.js**: Refine the Sun Valley path to follow the new building spine.
