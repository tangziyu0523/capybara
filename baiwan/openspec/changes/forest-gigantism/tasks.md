## 1. Implementation
- [x] 1.1 Update `createCurvedCabinGeometry`: Apply 3x scale multiplier to all dimensions.
- [x] 1.2 Update `createTreeGeometry`: Apply 3x scale multiplier to all dimensions.
- [x] 1.3 Update `generateForestLayout`: Increase spacing constraints (3x) and reduce counts.
- [x] 1.4 Remove Landmark: Delete `createLandmarkGeometry` and the `tidal_landmark` injection in `buildDistrict`.

## 2. Verification
- [x] 2.1 Visual Check: Cabins should be massive (comparable to skyscrapers).
- [x] 2.2 Visual Check: Trees should be giant redwoods.
- [x] 2.3 Visual Check: Tidal district center should be empty (no ellipsoid).
