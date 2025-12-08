## ADDED Requirements

### Requirement: Building Data Loading
The system SHALL load building configuration from a JSON data file that defines districts, buildings, and their properties.

#### Scenario: JSON data structure parsing
- **WHEN** the application loads
- **THEN** buildings.json is fetched and parsed
- **AND** district data includes id, name, position, totalVolume, color, and buildings array
- **AND** building data includes id, name, type, volume, and optional position/rotation

#### Scenario: Data validation
- **WHEN** building data is loaded
- **THEN** required fields are validated
- **AND** missing optional fields use sensible defaults
- **AND** invalid data logs a warning but does not crash the application

### Requirement: Four District Rendering
The system SHALL render four distinct city districts at their designated positions with correct volume proportions.

#### Scenario: Coral Reef Street district
- **WHEN** the scene is rendered
- **THEN** Coral Reef Street (珊瑚礁街) appears at position [0, 0, 0]
- **AND** buildings are colored #3498db (blue)
- **AND** total volume is approximately 350,000 m³ (35%)

#### Scenario: Sun Valley district
- **WHEN** the scene is rendered
- **THEN** Sun Valley (阳光峡谷) appears at position [-300, 0, 150]
- **AND** buildings are colored #e67e22 (orange)
- **AND** total volume is approximately 300,000 m³ (30%)

#### Scenario: Forest Home district
- **WHEN** the scene is rendered
- **THEN** Forest Home (林语栖所) appears at position [0, 0, -250]
- **AND** buildings are colored #27ae60 (green)
- **AND** total volume is approximately 267,050 m³ (27%)

#### Scenario: Tidal Lounge district
- **WHEN** the scene is rendered
- **THEN** Tidal Lounge (潮汐客厅) appears at position [250, 0, 100]
- **AND** buildings are colored #1abc9c (cyan)
- **AND** floating attribute is true
- **AND** total volume is approximately 246,670 m³ (25%)

### Requirement: Instanced Mesh Rendering
The system SHALL use InstancedMesh for efficient rendering of multiple buildings of the same type.

#### Scenario: Building instance batching
- **WHEN** buildings are generated
- **THEN** buildings of the same type within a district are batched into InstancedMesh
- **AND** each instance has its own transform matrix (position, rotation, scale)
- **AND** 1000+ buildings render with stable frame rate

#### Scenario: Volume to geometry conversion
- **WHEN** a building volume is specified
- **THEN** dimensions are calculated assuming width:depth ratio of 0.8:1.2
- **AND** height is derived from volume / (width × depth)

### Requirement: Building Type Color Coding
The system SHALL color-code buildings by their functional type for visual distinction.

#### Scenario: Type-based coloring
- **WHEN** buildings are rendered
- **THEN** residential buildings are #3498db
- **AND** commercial buildings are #9b59b6
- **AND** industrial buildings are #e74c3c
- **AND** agriculture buildings are #27ae60
- **AND** energy buildings are #f39c12
- **AND** public buildings are #1abc9c
- **AND** landmark buildings are #00ffff

### Requirement: City Consciousness Tower Landmark
The system SHALL render the City Consciousness Tower as a glowing landmark in Coral Reef Street.

#### Scenario: Tower glow effect
- **WHEN** the City Consciousness Tower is rendered
- **THEN** it uses emissive material with glowColor #00ffff
- **AND** glow intensity is 2.0
- **AND** the tower is visually prominent, especially at night
- **AND** Bloom post-processing enhances the glow effect
