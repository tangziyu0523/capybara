## MODIFIED Requirements

### Requirement: Complex Building Silhouettes
The system SHALL render buildings with multi-tiered geometry to avoid the "simple box" look.

#### Scenario: Tiered Structure
- **WHEN** a medium/large building is generated
- **THEN** it is composed of at least 2 distinct geometric volumes (e.g., a base and a tower, or stepped setbacks)
- **AND** the width of the upper tiers is smaller than the base (tapering effect)

#### Scenario: Roof Details
- **WHEN** a building is rendered
- **THEN** it has a distinct top/roof structure (e.g., angled slope, flat deck, or spire) rather than a plain flat top

### Requirement: Architectural Variety
The system SHALL use multiple building templates to create visual diversity.

#### Scenario: Template Instancing
- **WHEN** the district is built
- **THEN** it randomly selects from a pool of at least 5 different detailed building geometries per district type
