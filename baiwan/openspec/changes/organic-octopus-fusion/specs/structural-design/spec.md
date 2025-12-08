## MODIFIED Requirements

### Requirement: Octopus Topology
The system SHALL arrange the city into a central core with three radiating branches.

#### Scenario: Trilateral Layout
- **WHEN** the scene is generated
- **THEN** the terrain forms 3 distinct ridges or "arms" radiating from the center
- **AND** the districts are positioned along these arms (approx 120 degrees apart)

### Requirement: Landmark Removal
The system SHALL NOT feature a single isolated central landmark.

#### Scenario: Core Density
- **WHEN** the central district (Coral Reef) is generated
- **THEN** it is composed of a dense cluster of buildings
- **AND** no single building is designated as "The Landmark" (removed from data)

### Requirement: Organic Fusion
The system SHALL blend districts together at the core.

#### Scenario: Overlapping Zones
- **WHEN** districts are rendered
- **THEN** the boundaries between the central core and the arms are not sharp lines
- **AND** building clusters appear to flow into each other
