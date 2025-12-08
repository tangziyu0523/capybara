# Change: Add XuanYi City 3D Visualization MVP

## Why

The "100万立方米挑战项目" (1 Million Cubic Meters Challenge) lacks a visual representation to communicate the futuristic city design concept to stakeholders. A high-quality 3D visualization will enable effective demos during pitches, design validation by the team, and establish technical credibility for future projects.

## What Changes

This proposal introduces the complete MVP for the XuanYi City 3D visualization system:

- **render-pipeline**: High-quality WebGL rendering with PBR materials, HDR lighting, and post-processing effects (SSAO, Bloom, FXAA, tone mapping)
- **ocean-shader**: Custom shader for realistic ocean surface with Gerstner waves, Fresnel reflections, and caustics for the Tidal Lounge district
- **district-rendering**: Procedural building generation for four districts using InstancedMesh, color-coded by function type, driven by JSON data
- **daynight-lighting**: Dynamic day/night cycle with sun position, sky color gradients, and shadow transitions
- **performance-debug**: Performance monitoring panel, debug tools (wireframe, LOD visualization), and post-processing effect toggles

## Impact

- **Affected specs**: None (greenfield project)
- **Affected code**: Creates new project structure under `src/`
- **New capabilities**: 5 new capability specs
- **Dependencies**: Three.js r169+, Vite 5.x, postprocessing 6.x, lil-gui 0.19+, stats.js

## Success Criteria

- Desktop: 60fps at 1080p with full effects
- Mobile: 30fps at 720p with reduced effects
- Initial load: <3s on 4G network
- All four districts visible with correct volume proportions
- Smooth day/night transitions
- Ocean waves and reflections render correctly
