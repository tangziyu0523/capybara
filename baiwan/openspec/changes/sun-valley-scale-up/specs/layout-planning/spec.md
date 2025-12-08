## MODIFIED Requirements

### Requirement: Industrial Scale Consistency
The system SHALL render Sun Valley buildings at a scale consistent with the Giant Forest district.

#### Scenario: Massive Factories
- **WHEN** Sun Valley buildings are generated
- **THEN** their volume is approximately 8000-10000 units
- **AND** heights range from 20m to 40m

### Requirement: Compact Grid Layout
The system SHALL arrange the district in a high-density grid to maximize land use.

#### Scenario: Grid Packing
- **WHEN** buildings are placed
- **THEN** they occupy a regular grid pattern (approx 20m spacing)
- **AND** gaps between buildings are minimized (safety distance only)

#### Scenario: Transport Corridor
- **WHEN** the grid is generated
- **THEN** a central channel (width 20m) is left empty for the transportation spine
