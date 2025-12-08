# Implementation Tasks

## 1. Zoning & Data
- [x] 1.1 Update `buildings.json` to define 4 zones:
    - Center (0,0,0)
    - Tidal (East, 200, 0, 0)
    - Forest (West, -150, 0, 0)
    - Sun Valley (South, 0, 0, 150)
- [x] 1.2 Adjust positions to ensure visual corridors (e.g., shift Forest slightly North or South if needed).

## 2. Visual Fidelity (PBR)
- [ ] 2.1 Update `SceneManager.js`: Add `THREE.PMREMGenerator` or load a simple HDR environment map for realistic reflections.
- [x] 2.2 Update `DistrictBuilder.js`: Switch materials to `MeshPhysicalMaterial`.
    - Configure roughness/metalness for each building type.
    - Glass: Transmission = 1, Roughness = 0.
    - Metal: Metalness = 1, Roughness = 0.3.
    - Concrete: Metalness = 0, Roughness = 0.9.

## 3. Industrial Zone Implementation
- [x] 3.1 Update `DistrictBuilder.js`: Add `createIndustrialGeometry()` (Advanced).
    - Modular factory units, pipes, tanks.
    - "Standardized production modules" look.

## 4. Landscape & Transition
- [x] 4.1 Update `TerrainManager.js`: Ensure topography supports 4 zones (South arm for Sun Valley).
- [x] 4.2 Update `VegetationSystem.js`: Implement "Transition Belt" logic (high density between district boundaries).

## 5. Transportation
- [x] 5.1 Update `TransportationSystem.js`: Connect Sun Valley to the Center and other zones.
