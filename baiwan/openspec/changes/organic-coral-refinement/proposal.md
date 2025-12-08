# Proposal: Organic Coral Refinement & Nature-Tech Fusion

## Context
The user requests a deep refinement of the "Biomimetic" city model, specifically targeting "Coral Growth" morphology, "Nature-Tech" material fusion, and specific sub-system details (Floating balance, Vertical farms). The current implementation is a rough approximation; this update aims for higher visual fidelity and specific feature inclusion.

## Goal
Refine the 3D model to meet specific "Nature-Tech" standards:
1.  **Tidal Lounge**: High-transparency domes (>=85%), honeycomb floating bases, visible ocean energy devices.
2.  **Forest Home**: Engineered wood (CLT) aesthetics, bamboo integration, 3D curved roofs.
3.  **Sun Valley**: Aeroponic vertical farms (visible internal structure), artistic wind turbines.
4.  **Maglev**: Tracks integrated *into* the building structure, not just near it.

## Scope
- **Modified**: `DistrictBuilder.js` to refine materials (Glass transmission, Wood textures) and geometry (Honeycomb, Turbines).
- **Modified**: `TransportationSystem.js` to tighten the integration of tracks with buildings.
- **Modified**: `SceneManager.js` to ensure lighting supports the "Transparency" and "Subsurface" effects.

## Risks
- **Performance**: Transparent materials with transmission are expensive in WebGL. We will use optimized `MeshPhysicalMaterial` settings.
- **Complexity**: Generating "Fractal/Porous" coral surfaces procedurally is heavy. We will simulate this with texture/normal maps or simplified noise geometry.
