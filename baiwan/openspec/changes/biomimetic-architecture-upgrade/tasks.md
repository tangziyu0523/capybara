# Implementation Tasks

## 1. Geometry Engine Upgrade (`DistrictBuilder.js`)
- [ ] 1.1 Implement `createOrganicCoralGeometry()`:
    - Use `THREE.SphereGeometry` clusters merged with `BufferGeometryUtils`.
    - Add "Porous" look by varying scale and position noise.
- [ ] 1.2 Implement `createCurvedCabinGeometry()`:
    - Use `THREE.TubeGeometry` or bent `PlaneGeometry` for roofs.
    - Add "Bamboo/Stilt" supports.
- [ ] 1.3 Implement `createEcoIndustrialGeometry()`:
    - Vertical farm towers (Cylinder + Internal Helix).
    - Wind Turbine tops.

## 2. Floating System (`DistrictBuilder.js`)
- [ ] 2.1 Implement "Honeycomb Platform" base for Tidal Lounge.
    - Hexagonal prism instancing.

## 3. Transportation Integration (`TransportationSystem.js`)
- [ ] 3.1 Refine Maglev paths to weave *through* the Central Core and Sun Valley towers.
- [ ] 3.2 Add "Station" nodes at key intersections.

## 4. Material & Polish
- [ ] 4.1 Refine PBR settings for "Wet Glass" (Tidal) and "Matte Wood" (Forest).
- [ ] 4.2 Verify performance (Instance counts).
