## MODIFIED Requirements

### Requirement: High-Fidelity Materials
The system SHALL render materials with advanced PBR properties.

#### Scenario: Transparent Domes
- **WHEN** Tidal Lounge is rendered
- **THEN** the domes are transparent (Transmission > 0.85)
- **AND** they reflect the environment (Clearcoat)

#### Scenario: Engineered Wood
- **WHEN** Forest Home is rendered
- **THEN** the surface appears matte and organic (Wood/Bamboo color palette)
- **AND** structures are elevated on stilts

### Requirement: Porous Morphology
The system SHALL simulate porous/fractal surfaces for the Coral district.

#### Scenario: Coral Texture
- **WHEN** Tidal buildings are generated
- **THEN** they are composed of multiple smaller spherical units clustered together
- **AND** the surface is not a single smooth primitive
