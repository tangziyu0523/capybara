# Design: Organic Eco-City Architecture

## 1. Procedural Building Generation (`DistrictBuilder.js`)
Instead of a single `BoxGeometry`, we will generate buildings by "stacking" primitives to create silhouettes.

### The "Stack" Algorithm
For each building:
1.  **Base**: A large footprint block (Commercial/Industrial) or cylinder (Public).
2.  **Body**: 1-3 smaller blocks stacked on top, slightly offset or inset.
3.  **Roof**: A distinct top shape (slanted, flat with rim, or dome).
4.  **Detail**: 
    - **Facade**: Use a texture atlas or shader to simulate windows/grid lines.
    - **Add-ons**: Random small boxes for balconies or air units.

*Implementation Strategy*: 
Since `InstancedMesh` requires identical geometry, we will create ~5-10 distinct "High Detail" building templates (Geometries) and instance them, rather than purely randomizing every single building (which would require individual Meshes and kill draw calls).

## 2. Organic Layout & Canyon (`TerrainManager.js` + `DistrictsManager.js`)
The city will be organized around a central "S-Curve" valley (The "Sun Canyon").

### Terrain Sculpting
- **Base**: Radial hill (existing).
- **Modifier**: Subtract height along a Sine wave path through the center.
- **Biomes**:
    - **Coastal (Low)**: Sand color, flattened.
    - **Canyon (Center, Low)**: Warm/Orange rock color.
    - **Highlands (Sides, High)**: Green/Grass color.

### District Placement
- **Coral Reef Street**: Spans the Canyon walls (Vertical city).
- **Sun Valley**: Nestled in the Canyon floor (Energy/Solar focus).
- **Forest Home**: On the green Highlands (Residential).
- **Tidal Lounge**: Floating on the water at the Canyon mouth.

## 3. Visual Style
- **Lighting**: Shift to "Golden Hour" (Warm sun, long shadows).
- **Palette**: 
    - Buildings: White, Glass (Blue-ish), Wood (Browns), Greenery (Green).
    - Terrain: Vertex-colored based on height and "Canyon distance".
