# Design: Sun Valley Linear Layout

## 1. Spatial Logic
Sun Valley is located in the South (Positive Z axis).
- **Canyon Axis**: Z-axis from Z=50 to Z=250.
- **Valley Floor**: X between -20 and 20.
- **Valley Walls**: X between -60 and -20 (West Wall) and 20 to 60 (East Wall).

## 2. Layout Algorithm
We will use a **Linear Distribution** along the Z-axis.

1. **The Spine (Floor)**:
   - Place "Industrial Hubs" (large) every ~60m along X=0.
   - These are the main connection points for the transport line.

2. **The Terraces (Walls)**:
   - Place "Solar Towers" (tall/thin) along the ridges (X +/- 40).
   - Stagger them relative to the spine to maintain views.

## 3. Transportation Integration
- **Path**: A smooth curve following (0, 10, 0) -> (0, 15, 100) -> (0, 20, 200).
- **Stations**: Integrated into the "Industrial Hubs" on the floor.

## 4. Building Density
- **Previous**: Random fill ~50-80 buildings.
- **New**:
  - Spine: ~4-5 large hubs.
  - Walls: ~10-12 towers per side.
  - Total: ~25-30 buildings (Significant reduction).
