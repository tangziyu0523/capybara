## 1. Implementation
- [ ] 1.1 Create `generateSunValleyLayout` in `DistrictBuilder.js`.
- [ ] 1.2 Implement Linear Spine logic (Z-axis distribution).
- [ ] 1.3 Implement Wall Terrace logic (X-offset distribution).
- [ ] 1.4 Update `buildDistrict` to use this new layout for `industrial`/`energy` types.
- [ ] 1.5 Update `TransportationSystem.js` to align the Sun Valley path with the new spine.

## 2. Verification
- [ ] 2.1 Visual Check: Buildings should form a "V" shape or parallel lines along the South axis.
- [ ] 2.2 Visual Check: The center path should be clear for the Maglev.
- [ ] 2.3 Visual Check: Density should be noticeably lower than before.
