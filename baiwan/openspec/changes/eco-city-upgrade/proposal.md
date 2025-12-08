# Proposal: Eco-City Systemic Upgrade

## Context
The user requests a systemic upgrade to the "Liugong Island Future Eco-City" model. This includes upgrading visual fidelity (PBR, lighting), re-introducing and standardizing the "Sun Valley" industrial zone, optimizing the residential area (Forest Home), and ensuring high performance (60FPS). The organic "coral growth" network must be preserved.

## Goal
Elevate the city model to a "High-Fidelity Digital Twin" standard by:
1.  **Visuals**: Implementing PBR materials, Environment Maps (IBL), and high-quality shadows.
2.  **Zoning**: Establishing 4 distinct zones (Center, Tidal, Forest, Sun Valley) with specific functional and spatial requirements.
3.  **Connectivity**: Ensuring visual corridors (50-80m) and landscape transition belts.

## Scope
- **Modified**: `buildings.json` to include 4 zones and precise positioning.
- **Modified**: `DistrictBuilder.js` for PBR materials (`MeshPhysicalMaterial`) and detailed industrial/modular geometry.
- **Modified**: `SceneManager.js` / `Environment` to add HDR/Environment lighting.
- **Modified**: `TerrainManager.js` to support the 4-zone layout.
- **Modified**: `VegetationSystem.js` for landscape transitions.

## Risks
- **Performance**: High fidelity (PBR, Shadows) on WebGL can drop FPS. We will use `InstancedMesh` aggressively and optimize shadow map resolution.
- **Asset limitations**: We cannot generate actual 8K textures or Substance assets in this environment. We will simulate this look using procedural noise, roughness maps, and high-quality geometry.
