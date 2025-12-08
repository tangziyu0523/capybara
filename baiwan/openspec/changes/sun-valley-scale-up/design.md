# Design: Compact Industrial Grid

## 1. Scale Strategy
- **Reference**: Forest Cabins are now Giant (~36m high). Commercial buildings are ~30m high.
- **Target**: Sun Valley buildings should match this "Giant" scale to be consistent.
- **Geometry**: Scale up `createEcoIndustrialGeometry` by factor ~3x (similar to Forest).

## 2. Layout Algorithm: "Tetris" Packing
Instead of a single line, we fill the Canyon Floor (Width ~60m) and Walls (Width ~40m each) with a tight grid.

- **Grid Cell Size**: 20m x 20m (Matches new building footprint).
- **Area**: Z: 50->250 (Length 200m), X: -60->60 (Width 120m).
- **Rows**: 10 rows (Z-axis).
- **Cols**: 6 cols (X-axis).
- **Total Capacity**: ~60 slots.

## 3. Distribution Logic
- **Central Channel**: Keep indices X=[-10, 10] clear for Transport Spine (Maglev).
- **Industrial Blocks**: Fill X=[-60, -20] and X=[20, 60].
- **Density**: High (Fill 80% of available slots).

## 4. Transport
- Retain the central Maglev path but flanked closely by dense buildings.
