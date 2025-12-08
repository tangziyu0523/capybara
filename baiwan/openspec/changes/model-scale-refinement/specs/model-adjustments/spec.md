## MODIFIED Requirements

### Requirement: Building Scale Consistency
The system SHALL render all "habitable" structures with consistent human-scale proportions.

#### Scenario: Forest Cabin Scale
- **WHEN** Forest Cabins are rendered
- **THEN** their dimensions match the standard grid (approx 10m x 10m footprint)
- **AND** they are comparable in height to the first 3 floors of a commercial building
- **AND** details (windows/doors implied) match human scale (1:1)

### Requirement: Tidal District Layout
The system SHALL optimize the Tidal District for visual clarity.

#### Scenario: Density Reduction
- **WHEN** Tidal District is generated
- **THEN** building count is reduced by 25% compared to previous baseline
- **AND** spacing between structures is increased

#### Scenario: Central Landmark
- **WHEN** Tidal District is generated
- **THEN** a distinct Ellipsoid Landmark (15m x 8m) is placed at the district center
- **AND** it acts as a visual anchor

### Requirement: Model Technical Validity
The system SHALL ensure all scaled models maintain technical validity.

#### Scenario: Collision Data
- **WHEN** models are scaled
- **THEN** their bounding volumes (Spheres/Boxes) are updated to match the new visual mesh
- **AND** raycasting/collision detection is accurate to the visual surface
