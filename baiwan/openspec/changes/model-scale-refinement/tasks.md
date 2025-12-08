## 1. Implementation
- [x] 1.1 Benchmark Scale: Review `DistrictBuilder` standard sizing logic.
- [x] 1.2 Update `createCurvedCabinGeometry`: Scale up dimensions by approx 5x.
- [x] 1.3 Update `createTreeGeometry`: Ensure trees are scaled 1.5x-2x relative to new cabins.
- [x] 1.4 Optimize Tidal Density: Reduce procedural count for `public` buildings.
- [x] 1.5 Add Landmark: Inject "Ellipsoid Landmark" in Tidal District generation.

## 2. Verification
- [x] 2.1 Visual Check: Do Cabins look like houses (not doghouses)?
- [x] 2.2 Visual Check: Is Tidal area less cluttered?
- [x] 2.3 Visual Check: Is the Ellipsoid Landmark visible?
- [x] 2.4 Interaction: Verify mouse raycasting (collision) works on new scales.
