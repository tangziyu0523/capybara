# Proposal: Biomimetic Architecture & Integrated Systems Upgrade

## Context
The user requests a significant upgrade to the "Liugong Island" model, moving towards "Biomimetic/Organic" forms and "Nature-Tech Fusion". Key requirements include coral-like growth patterns, curved architectural surfaces, integrated maglev transport, and specific eco-industrial features.

## Goal
Transform the city into a **Biomimetic Eco-System** by:
1.  **Form**: Replacing rigid geometries with fluid, organic, coral-inspired shapes (Torus, Blobs, Curves).
2.  **Material**: Implementing a "Nature-Tech" aesthetic (Engineered Wood, Glass Domes, Exposed Steel).
3.  **Systems**: integrating transportation (Maglev) directly into the building fabric.
4.  **Special Zones**: 
    - **Floating**: Honeycomb platforms, transparent domes.
    - **Industrial**: Vertical farms, wind turbines.

## Scope
- **Modified**: `DistrictBuilder.js` to implement advanced procedural geometry (Curves, Domes, Honeycombs).
- **Modified**: `TransportationSystem.js` to create "Maglev" tracks that weave *through* or *around* building structures.
- **Modified**: `TerrainManager.js` (Minor) to ensure terrain supports the new organic flow.
- **Modified**: `buildings.json` to update metadata for the new "Organic" building types.

## Risks
- **Geometry Complexity**: Generating "Porous/Fractal" geometry in vanilla Three.js without external assets is difficult. We will simulate this using **Instanced geometric primitives (spheres/capsules) clustered together** to form organic blobs (Metaball-like appearance).
- **Performance**: High vertex count from curves. We will keep segment counts optimized.
