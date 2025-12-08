## ADDED Requirements

### Requirement: Time-Based Sun Position
The system SHALL position the sun/moon based on a normalized time-of-day value (0-1) to create realistic lighting angles.

#### Scenario: Midday sun position
- **WHEN** time is set to 0.5 (noon)
- **THEN** the sun is positioned directly overhead
- **AND** shadows are shortest and point straight down
- **AND** light intensity is at maximum (1.0)

#### Scenario: Dawn sun position
- **WHEN** time is set to 0.25 (dawn)
- **THEN** the sun rises from the horizon
- **AND** shadows are long and cast westward
- **AND** light has warm orange tint

#### Scenario: Dusk sun position
- **WHEN** time is set to 0.75 (dusk)
- **THEN** the sun sets on the horizon
- **AND** shadows are long and cast eastward
- **AND** light has golden-orange tint

#### Scenario: Midnight position
- **WHEN** time is set to 0.0 or 1.0 (midnight)
- **THEN** the sun is below the horizon
- **AND** ambient light is dim (intensity 0.1)
- **AND** moon-like illumination provides minimal directional light

### Requirement: Sky Color Gradient
The system SHALL transition sky/background colors smoothly based on time of day.

#### Scenario: Day sky color
- **WHEN** time is between 0.30 and 0.70 (daytime)
- **THEN** sky color is bright blue (#87ceeb)
- **AND** ambient light is neutral gray (#404040)

#### Scenario: Dawn sky color
- **WHEN** time is between 0.20 and 0.30 (dawn transition)
- **THEN** sky color transitions from night to orange-red (#ff7744)
- **AND** transition is smooth without visible steps

#### Scenario: Dusk sky color
- **WHEN** time is between 0.70 and 0.80 (dusk transition)
- **THEN** sky color transitions from day to orange-gold (#ff6644)
- **AND** transition is smooth without visible steps

#### Scenario: Night sky color
- **WHEN** time is between 0.80 and 0.20 (night)
- **THEN** sky color is deep blue (#0a0a20)
- **AND** stars or dark atmosphere is suggested

### Requirement: Multi-Light System
The system SHALL use multiple light types for realistic scene illumination.

#### Scenario: Directional sun light
- **WHEN** the scene is rendered
- **THEN** a DirectionalLight represents the sun
- **AND** it casts shadows with 2048×2048 shadow map
- **AND** shadow camera covers the city bounds

#### Scenario: Ambient fill light
- **WHEN** the scene is rendered
- **THEN** an AmbientLight provides base illumination
- **AND** intensity adjusts with time of day (brighter at noon, dimmer at night)

#### Scenario: Hemisphere sky-ground light
- **WHEN** the scene is rendered
- **THEN** a HemisphereLight adds sky-to-ground color gradient
- **AND** sky color matches current time of day
- **AND** ground color is earthy brown (#8b4513)

### Requirement: Time Control Interface
The system SHALL provide UI controls to adjust the time of day.

#### Scenario: Time slider control
- **WHEN** the user moves the time slider
- **THEN** time of day updates in real-time
- **AND** lighting, shadows, and sky color update smoothly

#### Scenario: Auto-cycle mode
- **WHEN** auto-cycle is enabled
- **THEN** time advances automatically at configurable speed
- **AND** day/night cycle loops continuously
- **AND** user can pause/resume the cycle

### Requirement: Shadow Quality
The system SHALL render dynamic shadows that follow the sun position.

#### Scenario: Shadow direction changes
- **WHEN** time of day changes
- **THEN** shadow direction matches the sun position
- **AND** shadows lengthen at dawn/dusk
- **AND** shadows shorten at midday
