# Implementation Tasks

## 1. Material Upgrade (`DistrictBuilder.js`)
- [ ] 1.1 Update `createOrganicCoralGeometry` material to use `transmission: 0.9`, `roughness: 0.1`.
- [ ] 1.2 Update `createCurvedCabinGeometry` material to use wood colors (Hex `#8B5A2B`).

## 2. Geometry Refinement (`DistrictBuilder.js`)
- [ ] 2.1 Refine `createOrganicCoralGeometry`:
    - Add explicit "Honeycomb" base (Array of 6-7 cylinder hexagons).
    - Add "Porous" spheres (more noise/small spheres).
- [ ] 2.2 Refine `createEcoIndustrialGeometry`:
    - Improve Wind Turbine (Helical Twisted Tube).
    - Improve Vertical Farm (Visible internal shelves).

## 3. Transport Integration (`TransportationSystem.js`)
- [ ] 3.1 Adjust Maglev path control points to thread *through* the Sun Valley towers (e.g., y=20, passing between x=-20 and x=20).

## 4. Lighting (`SceneManager.js`)
- [ ] 4.1 Ensure `environment` is set (done in previous step, but verify) to support transmission.
