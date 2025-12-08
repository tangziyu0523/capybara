# Proposal: Organic Octopus-Style Fusion

## Context
The user requires a redesign of the city model to move away from rigid, separate blocks towards an "Octopus-style" organic topology. The goal is to eliminate the central isolated landmark and instead create a fluid, fused structure where a central core seamlessly transitions into three branching modules (arms).

## Goal
Create a dynamic, flowing city structure ("Octopus Topology") by:
1.  **Structural Change**: Removing the central "Tower" and replacing it with a high-density Core zone that merges into branches.
2.  **Terrain & Layout**: Sculpting the terrain into 3 distinct "Arms" or ridges extending from the center, with districts placed along these flow lines.
3.  **Fluid Connectivity**: Designing transportation and building distribution to follow these curves, avoiding right angles and ensuring visual continuity.

## Scope
- **Modified**: `buildings.json` to remove the landmark and reposition districts into a triangular/trilateral configuration.
- **Modified**: `TerrainManager.js` to generate a 3-arm radial terrain (ridges/valleys) instead of the S-Canyon.
- **Modified**: `DistrictBuilder.js` (optional) to allow building spread to follow the terrain direction or just increased overlap for fusion.
- **Modified**: `TransportationSystem.js` to curve naturally along the "arms".

## Risks
- **Building Overlap**: Merging districts might cause buildings to clip into each other. We will manage this by adjusting density or using distinct Y-levels.
- **Visual Clarity**: "Fusion" might make it hard to tell where one district ends and another begins. We will use gradient coloring or biome transitions to maintain distinguishability.
