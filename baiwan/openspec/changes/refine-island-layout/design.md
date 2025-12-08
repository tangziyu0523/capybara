# Design: Organic Cyber-Island

## Concept
The city is reimagined as a biological cell or a coral reef structure growing out of the ocean. 

- **The Nucleus**: Coral Reef Street. High density, colorful, highest verticality.
- **The Organelles**: Other districts surrounding the nucleus, specialized by function.
- **The Cytoskeleton**: Transportation tubes connecting everything.

## Architecture Changes

### 1. Terrain System (`TerrainManager`)
Instead of a flat plane, we introduce a `TerrainManager` that generates a mesh based on a heightmap or noise function.
- **Shape**: Circular/Oval island, approx radius 400m.
- **Height Profile**: 
  - Center: High (~30-50m) for Coral Reef Street.
  - Edges: Low (0m) meeting the water.
  - Texture: Simple grid or noise-based texture to look like futuristic ground/rock.

### 2. District Layout Update
Positions in `buildings.json` will be updated to be relative to the center but much closer.

| District | Old Pos | New Pos (Approx) | Role |
|----------|---------|------------------|------|
| Coral Reef Street | (0,0,0) | (0,0,0) | Center Hub (Hilltop) |
| Sun Valley | (-300,0,150) | (-150,0,80) | Western Slope |
| Forest Home | (0,0,-250) | (50,0,-150) | Northern Slope |
| Tidal Lounge | (250,0,100) | (180,0,50) | Eastern Coast (Floating) |

### 3. Building Height Adaptation
`DistrictBuilder` needs to accept a `getHeightAt(x, z)` function from `TerrainManager`.
- **Logic**: `building.y = terrain.getHeightAt(building.x, building.z)`
- **Orientation**: Buildings might optionally align with terrain normal, but keeping them vertical is usually better for city skylines.

### 4. Transportation System (`TransportationSystem`)
A new system to render connection curves.
- **Visual**: Glowing tubes or energy streams.
- **Path**: Spline curves starting from Coral Reef Street (Center) to the centroid of each other district.
- **Animation**: Pulses of light traveling along the tubes.

## Visual Reference (Mental Model)
Imagine a mountain rising from the sea. The peak is the dense, colorful city center. The slopes have terraced districts. The water edge has the floating district. Glowing arteries connect the peak to the base.
