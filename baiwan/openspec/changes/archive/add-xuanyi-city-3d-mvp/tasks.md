# Implementation Tasks

## 1. Project Setup
- [x] 1.1 Initialize Vite project with vanilla JS template
- [x] 1.2 Install dependencies: three, postprocessing, lil-gui, stats.js
- [x] 1.3 Configure ESLint and Prettier
- [x] 1.4 Create directory structure (`src/core`, `src/render`, `src/scene`, `src/ui`, `src/utils`, `src/data`)
- [x] 1.5 Create basic index.html with canvas container
- [x] 1.6 Create main.js entry point with basic Three.js scene

## 2. Core Infrastructure
- [x] 2.1 Implement Application.js - main orchestrator class
- [x] 2.2 Implement SceneManager.js - scene setup and management
- [x] 2.3 Implement CameraController.js - OrbitControls wrapper with limits
- [x] 2.4 Implement EventBus.js - simple pub/sub for cross-module communication
- [x] 2.5 Implement AssetLoader.js - texture and JSON loading with progress

## 3. Render Pipeline (render-pipeline spec)
- [x] 3.1 Implement WebGLRenderer setup with shadow mapping
- [x] 3.2 Implement EffectComposer with RenderPass
- [x] 3.3 Add SSAOPass with configurable parameters
- [x] 3.4 Add UnrealBloomPass with configurable threshold/strength
- [x] 3.5 Add FXAAPass for antialiasing
- [x] 3.6 Add ACESFilmic tone mapping shader
- [x] 3.7 Implement effect toggle methods

## 4. Ocean Shader (ocean-shader spec)
- [x] 4.1 Create ocean.vert with Gerstner wave displacement
- [x] 4.2 Create ocean.frag with Fresnel reflection
- [x] 4.3 Implement water color depth blending
- [x] 4.4 Add environment map reflection
- [x] 4.5 Add simplified caustic effect
- [x] 4.6 Create OceanManager.js to manage ocean mesh and uniforms
- [x] 4.7 Test ocean at different camera angles and times of day

## 5. District Rendering (district-rendering spec)
- [x] 5.1 Create buildings.json data file with all four districts
- [x] 5.2 Implement DistrictBuilder.js - procedural building generation
- [x] 5.3 Implement volume-to-geometry conversion logic
- [x] 5.4 Implement InstancedMesh batching by building type
- [x] 5.5 Apply building type color coding
- [x] 5.6 Create DistrictsManager.js to coordinate all districts
- [x] 5.7 Implement City Consciousness Tower with emissive glow
- [x] 5.8 Verify district positions and volume proportions match PRD

## 6. Day/Night Lighting (daynight-lighting spec)
- [x] 6.1 Implement DayNightSystem.js class
- [x] 6.2 Add DirectionalLight with shadow mapping for sun
- [x] 6.3 Add AmbientLight with time-based intensity
- [x] 6.4 Add HemisphereLight for sky-ground gradient
- [x] 6.5 Implement time-based sun position calculation
- [x] 6.6 Implement sky color interpolation (dawn/day/dusk/night)
- [x] 6.7 Update scene background color with time
- [x] 6.8 Test shadow direction changes through day cycle

## 7. Performance & Debug UI (performance-debug spec)
- [x] 7.1 Integrate stats.js FPS counter
- [x] 7.2 Implement PerformanceMonitor.js with renderer stats
- [x] 7.3 Create lil-gui panel structure with folders
- [x] 7.4 Add post-processing effect toggles to GUI
- [x] 7.5 Add time control slider and auto-cycle toggle
- [x] 7.6 Add wireframe debug toggle
- [x] 7.7 Implement CompatibilityManager.js with quality presets
- [x] 7.8 Add quality preset selector to GUI

## 8. Integration & Polish
- [x] 8.1 Implement LoadingScreen.js with progress bar
- [x] 8.2 Create InfoPanel.js with district information on hover/click
- [x] 8.3 Add environment cubemap for sky and reflections
- [x] 8.4 Fine-tune bloom threshold for tower glow
- [x] 8.5 Adjust camera initial position for best first impression
- [x] 8.6 Add resize handling for responsive canvas

## 9. Testing & Optimization
- [x] 9.1 Test on Chrome, Firefox, Safari, Edge
- [x] 9.2 Test on mobile devices (iOS Safari, Android Chrome)
- [x] 9.3 Profile and optimize draw calls (<300 target)
- [x] 9.4 Verify 60fps on desktop, 30fps on mobile
- [x] 9.5 Measure and optimize initial load time (<3s target)
- [x] 9.6 Test quality preset auto-detection

## 10. Documentation
- [x] 10.1 Write README.md with setup and run instructions
- [x] 10.2 Document public API in code comments (JSDoc)
- [x] 10.3 Create config.json with all tunable parameters

## Dependencies

- Tasks 3.x depend on 2.x (core infrastructure)
- Tasks 4.x, 5.x, 6.x can be parallelized after 2.x
- Task 7.x depends on 3.x (for post-processing toggles)
- Tasks 8.x depend on 4.x, 5.x, 6.x, 7.x completion
- Tasks 9.x, 10.x are final phase
