## 1. Implementation
- [ ] 1.1 Create `src/utils/SpatialDistribution.js` to handle Poisson Disk Sampling logic.
- [ ] 1.2 Implement `distributeForestEntities(bounds, countConfig)` method in `DistrictBuilder.js`.
- [ ] 1.3 Define tree geometries (Placeholder or simple primitives) if not already present (reuse `createCurvedCabinGeometry` for cabins).
- [ ] 1.4 Integrate the new layout algorithm into `buildDistrict` when `type === 'residential'`.

## 2. Verification
- [ ] 2.1 Run the app and observe the Forest District.
- [ ] 2.2 Verify that cabins do not overlap.
- [ ] 2.3 Verify that trees are placed organically around cabins without clipping.
