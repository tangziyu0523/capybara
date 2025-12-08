# Proposal: Refine Island Layout

## Context
The current implementation renders districts as scattered, flat clusters on the ocean surface. The user feedback indicates a desire for a more cohesive, 3D "island" structure where districts are tightly connected and vertically integrated, rather than floating independently.

## Goal
Transform the scene into a unified "Organic Cyber-Island" where:
1.  **Terrain**: A central landmass rises from the ocean, providing verticality (hills/valleys).
2.  **Layout**: Districts are repositioned to form a contiguous city.
    *   **Center**: Coral Reef Street (Colorful hub).
    *   **Periphery**: Sun Valley, Forest Home, Tidal Lounge (coastal).
3.  **Connectivity**: A visible transportation system (tubes/paths) links the central hub to the outer districts.

## Scope
- **Added**: Procedural Terrain generation (mesh with height).
- **Modified**: District positions and building generation (clamp to terrain height).
- **Added**: Transportation system rendering (curves/tubes).
- **Removed**: Flat `y=0` assumption for buildings.

## Risks
- **Performance**: Generating terrain and clamping thousands of buildings might increase init time.
- **Visual Clutter**: Denser layout might make individual districts harder to distinguish without clear separation zones.
