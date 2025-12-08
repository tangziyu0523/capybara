## MODIFIED Requirements

### Requirement: Physically Based Rendering
The system SHALL use PBR materials for all city elements.

#### Scenario: Material Realism
- **WHEN** a building is rendered
- **THEN** it reflects the environment based on its material properties (Glass reflects, Wood does not)
- **AND** surfaces have varying roughness

### Requirement: Global Illumination Simulation
The system SHALL simulate global illumination.

#### Scenario: Ambient Light
- **WHEN** the scene is lit
- **THEN** shadows are not pitch black
- **AND** objects receive light from the sky/environment map
