## ADDED Requirements

### Requirement: FPS Performance Monitor
The system SHALL display real-time frames-per-second using stats.js.

#### Scenario: FPS display
- **WHEN** the application is running
- **THEN** an FPS counter is visible in the corner
- **AND** the counter updates every frame
- **AND** color indicates performance (green = good, red = poor)

#### Scenario: Frame time display
- **WHEN** the performance panel is expanded
- **THEN** frame time in milliseconds is shown
- **AND** memory usage is displayed if available

### Requirement: Renderer Statistics Display
The system SHALL display WebGL renderer statistics for debugging.

#### Scenario: Draw call count
- **WHEN** the debug panel is open
- **THEN** current draw call count is displayed
- **AND** count updates each frame

#### Scenario: Triangle count
- **WHEN** the debug panel is open
- **THEN** rendered triangle count is displayed
- **AND** helps identify geometry complexity issues

#### Scenario: Texture and program count
- **WHEN** the debug panel is open
- **THEN** active texture count is displayed
- **AND** active shader program count is displayed

### Requirement: Debug Visualization Toggles
The system SHALL provide toggles for debug visualization modes.

#### Scenario: Wireframe mode
- **WHEN** wireframe toggle is enabled
- **THEN** all meshes render in wireframe mode
- **AND** geometry structure is visible
- **AND** toggle can be disabled to return to normal

#### Scenario: Bounding box display
- **WHEN** bounding box toggle is enabled
- **THEN** axis-aligned bounding boxes are shown for objects
- **AND** helps visualize spatial relationships

#### Scenario: LOD level visualization
- **WHEN** LOD debug toggle is enabled
- **THEN** objects are colored by their current LOD level
- **AND** helps verify LOD system is working

### Requirement: Post-Processing Effect Controls
The system SHALL provide individual toggles for each post-processing effect.

#### Scenario: SSAO toggle
- **WHEN** SSAO checkbox is toggled
- **THEN** SSAO pass is enabled/disabled
- **AND** change is immediate without scene reload

#### Scenario: Bloom toggle
- **WHEN** Bloom checkbox is toggled
- **THEN** Bloom pass is enabled/disabled
- **AND** change is immediate without scene reload

#### Scenario: FXAA toggle
- **WHEN** FXAA checkbox is toggled
- **THEN** FXAA pass is enabled/disabled
- **AND** change is immediate without scene reload

### Requirement: GUI Panel Layout
The system SHALL organize controls in a collapsible GUI panel using lil-gui.

#### Scenario: Panel organization
- **WHEN** the GUI is displayed
- **THEN** controls are grouped into folders (Metrics, Debug, Post Processing, Time)
- **AND** folders can be collapsed/expanded
- **AND** panel does not obstruct the main view

#### Scenario: Panel positioning
- **WHEN** the GUI is displayed
- **THEN** it appears in a corner (default top-right)
- **AND** it remains accessible during scene interaction

### Requirement: Quality Preset System
The system SHALL provide quality presets for different device capabilities.

#### Scenario: High quality preset
- **WHEN** high quality is selected or auto-detected on desktop
- **THEN** shadow map size is 4096
- **AND** all post-processing effects are enabled
- **AND** LOD distances are extended

#### Scenario: Medium quality preset
- **WHEN** medium quality is selected
- **THEN** shadow map size is 2048
- **AND** SSAO and Bloom are enabled
- **AND** LOD distances are standard

#### Scenario: Low quality preset
- **WHEN** low quality is selected or auto-detected on mobile
- **THEN** shadow map size is 1024
- **AND** SSAO is disabled
- **AND** LOD distances are reduced for earlier simplification

#### Scenario: Minimal quality preset
- **WHEN** minimal quality is detected (no WebGL2)
- **THEN** shadow map size is 512
- **AND** all post-processing is disabled
- **AND** water reflections are disabled
