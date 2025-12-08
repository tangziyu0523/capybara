# Design: High-Fidelity Eco-Industrial City

## 1. Four-Zone Organic Layout
The city is organized into 4 quadrants/arms (Coral Growth pattern):
- **Center**: Core Hub (High-rise).
- **East**: Tidal Lounge (Coastal, Organic).
- **West**: Forest Home (Inland, Modular Cabin).
- **South**: Sun Valley (Industrial, Solar).

## 2. Visual Upgrade Strategy
- **PBR Workflow**: Use `THREE.MeshPhysicalMaterial`.
    - **Metalness/Roughness**: Differentiate glass, steel, wood, and concrete.
    - **Environment Map**: Use a generated PMREM environment (CubeCamera or Equirectangular) to provide realistic reflections.
- **Geometry**: Increase segment count for smooth curves (Tidal) and add bevels/details to industrial blocks.

## 3. Zone Specifics
- **Sun Valley (Industrial)**:
    - **Style**: Bauhaus/Industrial. Functional, modular, exposed structures.
    - **Layout**: Grid-based efficiency, connected to transport.
- **Forest Home (Residential)**:
    - **Corridor**: Positioned to allow a line-of-sight to the Tidal Lounge.
    - **Landscape**: 15m wide vegetation belt separating it from other zones.

## 4. Performance
- **Instancing**: Continue using `InstancedMesh` for all buildings and trees.
- **Lighting**: Use a single directional light for shadows + Hemisphere light + Environment map for fill. Avoid too many point lights.
