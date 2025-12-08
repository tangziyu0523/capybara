# Proposal: Multi-Zone Architectural Complex

## Context
The user requires a specific "Architectural Complex" layout based on provided reference images (Figs 3, 4, 5). This involves a Central Core (using previous models), a coastal "Tidal Lounge" (organic/fluid style), and an inland "Forest Home" (eco-cabin style), arranged on a large island with specific spatial relationships.

## Goal
Create a cohesive multi-zone city layout with:
1.  **Central Zone**: Dual core buildings (from previous iteration) with strong functional connection.
2.  **Tidal Lounge Zone**: Coastal, fluid architecture, organic shapes, waterproof design (Ref Fig 3).
3.  **Forest Home Zone**: Inland, tree-integrated cabins, eco-materials (Ref Fig 4).
4.  **Layout**: Asymmetric placement on a large island; one side coastal, others inland (Ref Fig 5).

## Scope
- **Modified**: `buildings.json` to strictly define the 3 zones and their positions.
- **Modified**: `DistrictBuilder.js` to implement specific architectural styles for "Tidal" (Curved/Organic) and "Forest" (Wooden/Stilted).
- **Modified**: `TerrainManager.js` to support a "Coastal Slope to Inland Forest" topology.
- **Modified**: `TransportationSystem.js` to link these specific zones.

## Risks
- **Style Consistency**: Mixing "Cyber/Tech" center with "Organic/Wood" forest might look disjointed. We will use a unifying color palette or lighting to blend them.
- **Complexity**: Procedural generation of "organic curves" for Tidal Lounge is harder than boxes. We will use `Torus` or `Sphere` segments to approximate fluid shapes.
