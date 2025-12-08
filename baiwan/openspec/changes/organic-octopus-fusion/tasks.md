# Implementation Tasks

## 1. Structural Changes
- [ ] 1.1 Update `buildings.json`: Remove `b1_landmark`.
- [ ] 1.2 Update `buildings.json`: Reposition districts into 3-Arm configuration.
    - Core (d1): (0,0,0)
    - Arm 1 (d2): Angle 0 rad (East)
    - Arm 2 (d3): Angle 2pi/3 rad (North-West)
    - Arm 3 (d4): Angle 4pi/3 rad (South-West)

## 2. Terrain Sculpting
- [ ] 2.1 Modify `TerrainManager.js` to generate "Octopus" heightmap.
    - Use polar coordinates (r, theta).
    - Height = BaseHill + `cos(3 * theta)` ridge factor.
- [ ] 2.2 Update Vertex Colors to highlight the ridges vs valleys.

## 3. Fluid Connections
- [ ] 3.1 Update `TransportationSystem.js` to generate paths along the arms.
    - Use `CatmullRomCurve3` with intermediate control points to follow the ridges.
- [ ] 3.2 Ensure tubes merge smoothly into the center.

## 4. Visual Polish
- [ ] 4.1 Adjust `DistrictBuilder` spread/density to ensure the Core fuses with the Arms.
- [ ] 4.2 Verify the "organic flow" look in the preview.
