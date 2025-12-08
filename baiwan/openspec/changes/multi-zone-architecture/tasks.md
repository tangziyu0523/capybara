# Implementation Tasks

## 1. Layout Data Update
- [x] 1.1 Update `buildings.json` to define 3 zones:
    - `d_center` (Core): (0, 0, 0)
    - `d_tidal` (Coastal): (200, 0, 0)
    - `d_forest` (Inland): (-150, 0, 0)
- [x] 1.2 Remove old district definitions that don't fit this model.

## 2. Terrain Sculpting
- [x] 2.1 Update `TerrainManager.js` to create a "Coastal Slope" topology:
    - High West side (Forest).
    - Low East side (Beach/Water).
    - Flat/Terraced Center.

## 3. Architectural Styles
- [x] 3.1 Update `DistrictBuilder.js`: Add `createTidalGeometry()` using spheres/torus/capsules.
- [x] 3.2 Update `DistrictBuilder.js`: Add `createForestGeometry()` using box/cone combinations (cabins).
- [x] 3.3 Update `DistrictBuilder.js`: Implement "Twin Core" logic for the central district.

## 4. Integration
- [x] 4.1 Update `TransportationSystem.js` to link Forest -> Center -> Tidal (Linear/Branching flow).
- [x] 4.2 Update `VegetationSystem.js` to densely populate the Forest zone and sparsely populate the Center.
