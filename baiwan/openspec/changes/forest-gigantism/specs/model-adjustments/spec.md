## MODIFIED Requirements

### Requirement: Monumental Forest Scale
The system SHALL render Forest Habitat elements at a monumental scale.

#### Scenario: Giant Cabins
- **WHEN** Forest Cabins are generated
- **THEN** their dimensions are approximately 3x larger than standard city buildings (approx 30m+ height)
- **AND** they dominate the skyline of the western district

#### Scenario: Giant Trees
- **WHEN** Forest Trees are generated
- **THEN** they match the scale of the Giant Cabins
- **AND** create a "Fantasy Giant Forest" atmosphere

### Requirement: Tidal District Cleanliness
The system SHALL NOT render a central landmark in the Tidal District.

#### Scenario: Landmark Removal
- **WHEN** Tidal District is generated
- **THEN** the center point is clear of any specific landmark geometry
- **AND** the district remains defined by its distributed functional units
