## MODIFIED Requirements

### Requirement: Average Height Calibration
The system SHALL calibrate Industrial building heights to the city average.

#### Scenario: Height Reduction
- **WHEN** Sun Valley buildings are generated
- **THEN** their average height is approximately 35-40m
- **AND** they do not exceed the height of major landmarks by significant margin

### Requirement: Centralized Density
The system SHALL compress the industrial layout towards the district center.

#### Scenario: Layout Compression
- **WHEN** grid positions are calculated
- **THEN** columns are shifted inward by 15-20%
- **BUT** a central safety corridor of at least 20m is maintained for transport
