# Project Context

## Purpose
To create a visually impressive 3D visualization of the "XuanYi City" futuristic design concept for the "100万立方米挑战项目". The visualization must run in browsers, support both desktop (60fps) and mobile (30fps), and serve as a presentation demo without requiring a backend.

## Tech Stack
- **Core Framework:** Three.js (r169+)
- **Build Tool:** Vite 5.x
- **Language:** JavaScript (ES Modules)
- **Shader Language:** GLSL (within Three.js)
- **Post-Processing:** EffectComposer with postprocessing library
- **UI/Debug:** lil-gui, stats.js (implied)
- **Data Format:** JSON for district/building configuration

## Project Conventions

### Code Style
- **Modules:** Native ES Modules (ESM).
- **Formatting:** Standard JavaScript conventions (Prettier/ESLint recommended).
- **Naming:** 
  - PascalCase for classes/components (e.g., `SceneManager`, `DistrictBuilder`).
  - camelCase for instances and functions.
  - UPPER_CASE for constants.

### Architecture Patterns
- **Layered Architecture:**
  - **Application Layer:** Main entry, loop management.
  - **Scene Layer:** Logic for districts, ocean, day/night cycle.
  - **Render Layer:** Post-processing pipeline.
  - **Core Layer:** Scene, camera, asset loading.
- **Entity Management:** Manager classes (e.g., `DistrictsManager`) coordinate specific domains.
- **Event Handling:** `EventBus` for pub/sub messaging between components.
- **Rendering Strategy:** 
  - `InstancedMesh` for efficient building rendering.
  - Data-driven generation from JSON config.
  - Quality presets (minimal to high) for device compatibility.

### Testing Strategy
- **Visual Validation:** Primary method via Debug Panel (lil-gui).
- **Performance Monitoring:** `stats.js` to ensure FPS targets (60fps desktop / 30fps mobile).
- **Device Testing:** Mobile verification required (4G network simulation).

### Git Workflow
- **Spec-Driven Development:** Changes are planned via `openspec` proposals before implementation.
- **Commits:** Clear, descriptive commit messages.

## Domain Context
- **XuanYi City:** A futuristic city concept with distinct districts.
- **Key Features:**
  - Day/Night cycle affecting lighting and mood.
  - Ocean/Water rendering with reflections.
  - Floating buildings (Tidal Lounge).
- **Terminology:**
  - **District:** A logical area of the city containing specific building types.
  - **InstancedMesh:** A rendering technique to draw many identical objects efficiently.

## Important Constraints
- **Platform:** Browser-only (static files).
- **Network:** Must work on 4G mobile networks (optimize asset sizes).
- **Performance:** 
  - Desktop: 60fps.
  - Mobile: 30fps.
  - Strict control over draw calls (InstancedMesh usage).
- **Timeline:** ~12 day development cycle (MVP focus).

## External Dependencies
- **Three.js:** Main 3D engine.
- **Vite:** Dev server and bundler.
- **Node.js:** Development environment runtime.
