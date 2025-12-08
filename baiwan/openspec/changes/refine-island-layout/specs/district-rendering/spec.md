## MODIFIED Requirements

### Requirement: 3D Terrain Integration
The system SHALL render buildings on a variable-height terrain rather than a flat plane.

#### Scenario: Building vertical positioning
- **WHEN** buildings are generated
- **THEN** their Y position is determined by the underlying terrain height at their (X, Z) coordinate
- **EXCEPT** floating districts (Tidal Lounge) which remain at water level

### Requirement: Island Layout
The system SHALL arrange districts into a cohesive, contiguous island structure.

#### Scenario: Central Hub
- **WHEN** the scene renders
- **THEN** Coral Reef Street is positioned at the center (0,0) and highest point of the island

#### Scenario: Tighter Clustering
- **WHEN** the scene renders
- **THEN** gaps between districts are minimized, creating a unified city silhouette
