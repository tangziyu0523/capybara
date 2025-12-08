## ADDED Requirements

### Requirement: Gerstner Wave Animation
The system SHALL render ocean surface with multi-layered Gerstner wave animation for realistic water movement.

#### Scenario: Wave vertex displacement
- **WHEN** the ocean surface is rendered
- **THEN** vertices are displaced using three overlapping sine waves with different frequencies
- **AND** wave height is configurable (default 2.0 meters)
- **AND** wave frequency is configurable (default 0.05)
- **AND** animation progresses smoothly based on elapsed time

#### Scenario: Wave normal calculation
- **WHEN** waves displace the surface
- **THEN** surface normals are recalculated based on wave derivatives
- **AND** lighting responds correctly to the dynamic surface orientation

### Requirement: Fresnel Reflection Effect
The system SHALL apply Fresnel-based reflection to the ocean surface that varies with viewing angle.

#### Scenario: Viewing angle reflection
- **WHEN** the ocean is viewed at a grazing angle (near horizontal)
- **THEN** reflection intensity increases (more mirror-like)
- **AND** the fresnel power is configurable (default 3.0)

#### Scenario: Direct viewing reflection
- **WHEN** the ocean is viewed from directly above
- **THEN** reflection intensity decreases (more water color visible)
- **AND** the deep water color shows through

### Requirement: Water Color Blending
The system SHALL blend between deep and shallow water colors based on simulated depth.

#### Scenario: Color depth variation
- **WHEN** water is rendered
- **THEN** shallow areas display uShallowColor (default cyan: 0.0, 0.4, 0.6)
- **AND** deep areas display uDeepColor (default dark blue: 0.0, 0.1, 0.3)
- **AND** colors blend smoothly based on water depth

### Requirement: Environment Map Reflection
The system SHALL reflect the environment cubemap on the ocean surface.

#### Scenario: Sky reflection on water
- **WHEN** the ocean surface is rendered
- **THEN** the environment map reflects on the surface based on view direction and surface normal
- **AND** reflection is modulated by Fresnel factor (stronger at grazing angles)

### Requirement: Caustic Effect
The system SHALL render simplified caustic patterns on the ocean surface.

#### Scenario: Animated caustics
- **WHEN** the ocean is rendered
- **THEN** subtle caustic patterns animate across the surface
- **AND** caustic intensity is subtle (approximately 0.1 contribution)
- **AND** caustics add visual interest without overwhelming the scene
