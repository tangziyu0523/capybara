## 1. Implementation
- [ ] 1.1 Update `generateSunValleyLayout`: Reduce `baseScale` from 3.0 to 1.8.
- [ ] 1.2 Update `generateSunValleyLayout`: Compress `colX` coordinates to `[-32, -22, -12, 12, 22, 32]`.
- [ ] 1.3 Verify transport clearance (Gap 24m vs Tube width).

## 2. Verification
- [ ] 2.1 Visual Check: Buildings should be noticeably shorter (not looming towers).
- [ ] 2.2 Visual Check: Cluster should look tighter horizontally.
- [ ] 2.3 Visual Check: Transport tube still fits in the center without clipping.
