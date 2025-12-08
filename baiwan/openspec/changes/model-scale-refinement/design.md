# Design: Scale Calibration and Optimization

## 1. Scale Benchmarking
- **Standard Commercial**: 
  - Width: ~15-20m (mapped to `width=0.8` in code units * volume factor)
  - Height: ~30-50m
- **Current Forest Cabin**:
  - Width: ~2m (mapped to `width=0.1` code units)
- **Target Forest Cabin**:
  - Width: ~10-12m (Increase base radius `legR`, `bodyR` by factor of ~5x)
  - Height: ~10-12m (Match 2-3 story feel)

## 2. Tidal Optimization Strategy
- **Count Reduction**:
  - Current: Random fill based on volume.
  - New: Reduce `proceduralBuildings` loop count limit or increase `avgBuildingVolume` to generate fewer, larger structures.
- **Landmark Spec**:
  - Geometry: Ellipsoid
  - Dimensions: Long Axis 15m, Short Axis 8m.
  - Position: Center of Tidal District (200, 10, 0).

## 3. Implementation Details
- **DistrictBuilder.js**:
  - `createCurvedCabinGeometry`: Update hardcoded dimensions.
  - `buildDistrict`: Add logic to inject the explicit Landmark in Tidal zone.
  - `buildDistrict`: Tweak density parameters for `public` (Tidal) type.

## 4. Collision & Interaction
- Since we use `InstancedMesh`, collision is usually raycast-based against the bounding sphere.
- **Action**: Call `geometry.computeBoundingSphere()` explicitly after scaling to ensure Raycaster works for "climbing/interaction" simulation.
