# Design: XuanYi City 3D Visualization MVP

## Context

This is a greenfield Three.js project to create a 3D visualization of a futuristic city design concept for the "100万立方米挑战项目". The visualization must run in browsers, support both desktop and mobile, and create a visually impressive demo for presentations.

**Stakeholders:**
- Project evaluators/judges (primary audience)
- Design team (for validation)
- Technical community (potential code sharing)

**Constraints:**
- Browser-only (no native app)
- No backend (static files only)
- Must work on 4G mobile networks
- ~12 day development timeline

## Goals / Non-Goals

**Goals:**
- Create visually impressive 3D city visualization
- Support desktop (60fps) and mobile (30fps)
- Enable day/night cycle for dramatic effect
- Provide debug tools for development and demo
- Establish reusable code patterns for future projects

**Non-Goals:**
- VR/AR support
- Real-time collaboration
- Building interiors
- Traffic/pedestrian simulation
- Backend data persistence

## Decisions

### Decision 1: Three.js over Babylon.js

**Choice:** Three.js r169+

**Rationale:**
- Lower learning curve for rapid development
- Richer community resources and examples
- Smaller bundle size
- Greater flexibility for custom shaders (ocean, glow)
- WebGPU support available when needed

**Alternatives considered:**
- Babylon.js: More batteries-included but larger, steeper learning curve
- Raw WebGL: Maximum control but too slow for timeline
- Unity WebGL: Overkill for this scope, larger builds

### Decision 2: Vite over Webpack

**Choice:** Vite 5.x

**Rationale:**
- Near-instant dev server startup
- Fast HMR for shader iteration
- Simple configuration
- Native ES modules

**Alternatives considered:**
- Webpack: More mature ecosystem but slower, more complex config
- Parcel: Good middle ground but less control
- No bundler: Not practical for module management

### Decision 3: Composer-based Post-Processing

**Choice:** EffectComposer with postprocessing library

**Rationale:**
- Easy to add/remove effects
- Individual effect toggles for debugging
- Well-tested implementations
- Acceptable performance overhead for MVP

**Alternatives considered:**
- Custom FBO pipeline: More efficient but more code, harder to maintain
- No post-processing: Significantly worse visual quality

### Decision 4: InstancedMesh for Buildings

**Choice:** THREE.InstancedMesh per building type

**Rationale:**
- Single draw call per building type per district
- Supports 1000+ buildings efficiently
- Built into Three.js, no extra dependencies

**Alternatives considered:**
- Individual meshes: Too many draw calls
- BufferGeometry merging: Less flexible, harder to update
- GPU instancing with custom shader: More complex for MVP

### Decision 5: Data-Driven Building Generation

**Choice:** JSON config file defining districts and buildings

**Rationale:**
- Easy to modify without code changes
- Clear separation of data and rendering
- Supports future procedural generation extensions

**Alternatives considered:**
- Hardcoded building definitions: Faster but inflexible
- External API: Adds complexity, not needed for MVP
- glTF models: Would require 3D modeling work

### Decision 6: Quality Preset System

**Choice:** Four presets (minimal, low, medium, high) auto-detected

**Rationale:**
- Graceful degradation across devices
- Single codebase handles all capabilities
- User can override if needed

**Alternatives considered:**
- Single quality level: Would fail on lower-end devices
- Per-feature detection: More granular but complex to manage

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Application                          │
│  - Initializes all systems                              │
│  - Manages render loop                                  │
│  - Coordinates updates                                  │
├─────────────────────────────────────────────────────────┤
│                    Scene Layer                           │
│  ┌─────────────┬─────────────┬─────────────────────────┐│
│  │ Districts   │ Ocean       │ DayNight               ││
│  │ Manager     │ Manager     │ System                 ││
│  │ - 4 districts│ - Shader   │ - Sun position         ││
│  │ - Buildings │ - Waves     │ - Sky colors           ││
│  │ - Colors    │ - Reflect   │ - Shadows              ││
│  └─────────────┴─────────────┴─────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│                   Render Layer                           │
│  ┌─────────────────────────────────────────────────────┐│
│  │ PostProcessPipeline                                 ││
│  │ - RenderPass → SSAO → Bloom → ToneMap → FXAA       ││
│  └─────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│                    Core Layer                            │
│  ┌─────────────┬─────────────┬─────────────────────────┐│
│  │ Scene       │ Camera      │ Asset                  ││
│  │ Manager     │ Controller  │ Loader                 ││
│  └─────────────┴─────────────┴─────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

## Risks / Trade-offs

### Risk 1: Ocean Shader Performance on Mobile
- **Risk:** Complex fragment shader may be too slow
- **Mitigation:** Prepare simplified shader variant; disable reflections on low quality

### Risk 2: Building Count vs. Draw Calls
- **Risk:** Too many building types could increase draw calls
- **Mitigation:** Limit to 7 building types; batch aggressively per district

### Risk 3: Shadow Map Quality vs. Performance
- **Risk:** Large shadow maps impact mobile performance
- **Mitigation:** Quality presets adjust shadow map size (512-4096)

### Risk 4: Initial Load Time
- **Risk:** Textures and models could exceed load time targets
- **Mitigation:** Compress textures; lazy-load non-critical assets; show loading progress

## File Structure

```
src/
├── core/
│   ├── Application.js      # Main entry, render loop
│   ├── SceneManager.js     # Scene setup
│   ├── CameraController.js # OrbitControls wrapper
│   └── EventBus.js         # Pub/sub messaging
├── render/
│   ├── PostProcessPipeline.js  # Effect composer
│   └── shaders/
│       ├── ocean.vert
│       └── ocean.frag
├── scene/
│   ├── DistrictsManager.js # Coordinates all districts
│   ├── DistrictBuilder.js  # Generates one district
│   ├── OceanManager.js     # Ocean mesh and shader
│   └── DayNightSystem.js   # Lighting cycle
├── ui/
│   ├── DebugPanel.js       # lil-gui controls
│   ├── LoadingScreen.js    # Progress display
│   └── InfoPanel.js        # District info
├── utils/
│   ├── CompatibilityManager.js # Quality detection
│   ├── PerformanceMonitor.js   # Stats tracking
│   └── AssetLoader.js          # Resource loading
├── data/
│   ├── buildings.json      # District/building config
│   └── config.json         # Global settings
└── main.js                 # Entry point
```

## Open Questions

1. **Heightmap source:** PRD mentions Liu Gong Island terrain - do we have a heightmap, or should we generate flat/procedural terrain for MVP?
   - *Recommendation:* Start with flat terrain, add heightmap as P2 enhancement

2. **Environment map:** Should we use a photographic HDR or stylized sky?
   - *Recommendation:* Use a stylized gradient sky shader for consistency with futuristic theme

3. **Floating buildings:** How should Tidal Lounge buildings appear to float?
   - *Recommendation:* Position slightly above water plane with subtle shadow; no physics simulation
