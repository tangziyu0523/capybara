# Implementation Tasks

## 1. Terrain System
- [x] 1.1 Implement `TerrainManager.js` using Perlin noise or radial gradient heightmap.
- [x] 1.2 Create a `getHeightAt(x, z)` method in `TerrainManager`.
- [x] 1.3 Render the terrain mesh with a basic grid/wireframe material (cyber style).

## 2. Layout & Data Updates
- [x] 2.1 Update `src/data/buildings.json` with tighter coordinates.
- [x] 2.2 Modify `DistrictBuilder.js` to accept a `terrain` reference.
- [x] 2.3 Update building generation to sample terrain height for `y` position.
- [x] 2.4 Adjust `Tidal Lounge` logic to remain at water level (ignore terrain height or clamp to 0).

## 3. Transportation System
- [x] 3.1 Implement `TransportationSystem.js`.
- [x] 3.2 Create `TubeGeometry` paths connecting (0,0,0) to other district centers.
- [x] 3.3 Apply animated shader material (flowing light pulses) to tubes.

## 4. Integration & Polish
- [x] 4.1 Add `TerrainManager` and `TransportationSystem` to `SceneManager`.
- [x] 4.2 Adjust camera initial position to view the island from a better angle.
- [x] 4.3 Tune fog and lighting to blend the new terrain with the ocean.
