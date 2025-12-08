# Implementation Tasks

## 1. Aesthetic & Terrain Overhaul
- [x] 1.1 Update `TerrainManager.js` to implement "Sun Canyon" sculpting (S-curve height subtraction).
- [x] 1.2 Implement vertex coloring for Terrain (Sand at low altitude, Orange in canyon, Green on hills).
- [x] 1.3 Update `DayNightSystem.js` lighting to "Golden Hour" (warmer sun, brighter ambient) to match reference.

## 2. Advanced Building Generation
- [x] 2.1 Create `BuildingFactory.js` (or update `DistrictBuilder`) to generate merged geometries.
    - Create ~3 templates for Residential (Forest Home).
    - Create ~3 templates for Commercial (Coral Reef).
    - Create ~3 templates for Energy/Industrial (Sun Valley).
- [x] 2.2 Implement "Tiered" generation logic (Base + Tower + Roof).
- [x] 2.3 Update `DistrictBuilder.js` to use these new templates with `InstancedMesh`.

## 3. Layout Reorganization
- [x] 3.1 Update `buildings.json` (or `DistrictsManager` logic) to align districts with the new Canyon topology.
    - Sun Valley -> Canyon Floor.
    - Forest Home -> Plateaus.
    - Tidal Lounge -> Canyon Mouth (Water).
- [x] 3.2 Refine `TransportationSystem.js` paths to follow the Canyon flow (winding river of light).

## 4. Polish
- [x] 4.1 Add simple "Vegetation" instanced mesh (Cones/Spheres) scattered on Green biomes.
- [x] 4.2 Verify performance (FPS check) with increased geometry complexity.
