## ADDED Requirements

### Requirement: Procedural Terrain Mesh
The system SHALL generate a 3D terrain mesh to serve as the foundation for the city.

#### Scenario: Island shape
- **WHEN** terrain is generated
- **THEN** it forms a radial hill/island structure
- **AND** height is maximum at center (~50m) and tapers to 0m at radius ~300m

#### Scenario: Visual style
- **WHEN** terrain is rendered
- **THEN** it uses a stylized "cyber" aesthetic (e.g., dark grid or low-poly matte) to match the city theme
