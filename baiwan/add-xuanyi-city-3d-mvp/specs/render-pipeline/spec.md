## ADDED Requirements

### Requirement: WebGL Renderer Initialization
The system SHALL initialize a WebGLRenderer with antialiasing, high pixel ratio support, and shadow mapping enabled.

#### Scenario: Renderer setup on page load
- **WHEN** the application initializes
- **THEN** a WebGLRenderer is created with `antialias: true`, `powerPreference: 'high-performance'`
- **AND** shadow maps are enabled with PCFSoftShadowMap type
- **AND** tone mapping is set to ACESFilmicToneMapping with exposure 1.0

#### Scenario: Canvas resize handling
- **WHEN** the browser window is resized
- **THEN** the renderer updates its size to match the container
- **AND** the pixel ratio is clamped to max 2.0 for performance

### Requirement: Post-Processing Pipeline
The system SHALL provide a composable post-processing pipeline using EffectComposer with independently toggleable effects.

#### Scenario: SSAO effect rendering
- **WHEN** SSAO is enabled in the effects panel
- **THEN** screen-space ambient occlusion is applied with kernelRadius 16, intensity 1.0
- **AND** natural shadows appear at building intersections and corners

#### Scenario: Bloom effect rendering
- **WHEN** Bloom is enabled in the effects panel
- **THEN** bright objects (threshold > 0.85) produce a soft glow with strength 0.5, radius 0.4
- **AND** the City Consciousness Tower emits visible bloom at night

#### Scenario: FXAA antialiasing
- **WHEN** FXAA is enabled (default on)
- **THEN** edge aliasing is reduced across the scene
- **AND** the effect has minimal performance impact (<2ms per frame)

#### Scenario: Effect toggle independence
- **WHEN** any post-processing effect is toggled off
- **THEN** only that specific effect is disabled
- **AND** other effects continue to render normally
- **AND** no console errors occur

### Requirement: PBR Material Support
The system SHALL use physically-based rendering materials for all scene objects with consistent lighting response.

#### Scenario: Standard material rendering
- **WHEN** buildings are rendered with MeshStandardMaterial
- **THEN** roughness and metalness values affect light interaction realistically
- **AND** environment map reflections are visible on metallic surfaces
