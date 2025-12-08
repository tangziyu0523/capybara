# Proposal: Forest Cabin Scale Adjustment and Tidal Optimization

## Why
Currently, the "Forest Habitat" (林间小屋) models are disproportionately small compared to the standard city buildings, breaking immersion.
- **Scale Mismatch**: Cabins appear as miniatures rather than functional dwellings.
- **Density Issues**: The Tidal Lounge area is cluttered, reducing the impact of key architectural forms.
- **Landmark Void**: The central area lacks a distinct visual anchor.

## What Changes

### 1. Forest Cabin Rescaling
- **Benchmarking**: Analyze standard `commercial` and `industrial` building dimensions (approx. volume 2000-3000).
- **Adjustment**: Scale Forest Cabins to match this "standard dwelling" size (approx 10-15m height).
- **Tree Coordination**: Synchronize tree scale to ensure they remain imposing relative to the larger cabins.

### 2. Tidal Lounge Optimization
- **Density Reduction**: Reduce the generation count by 25% to de-clutter the area.
- **Central Landmark**: Introduce a large "Ellipsoid Landmark" at the center of the Tidal district.

### 3. Technical Updates
- **Collision Volumes**: Ensure the scaled-up geometry has correct bounding volumes (handled via Three.js `computeBoundingSphere/Box`).
- **LOD**: Ensure simple geometries (Cylinder/Cone) remain performant.

## Impact
- **Visuals**: A more coherent city scale where a "house" looks like a house everywhere.
- **Performance**: Reduced draw calls in Tidal area due to lower density.
- **Navigation**: Better landmarking with the new central ellipsoid.
