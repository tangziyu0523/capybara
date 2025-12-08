## ADDED Requirements

### Requirement: Organic Spatial Distribution
The system SHALL distribute Forest Habitat entities using a constraint-based organic algorithm (e.g., Poisson Disk Sampling) rather than pure random placement.

#### Scenario: Minimum Separation
- **WHEN** Forest Cabins are placed
- **THEN** no two cabins are closer than 20 meters (center to center)
- **AND** this prevents structural overlap and ensures privacy

#### Scenario: Vegetation Integration
- **WHEN** Trees are placed around Cabins
- **THEN** they respect a "Clearance Zone" of 5-10 meters from the cabin center
- **BUT** are allowed to be closer than other cabins, creating a "nestled" effect

### Requirement: Species-Specific Spacing
The system SHALL enforce different spacing rules for different vegetation types.

#### Scenario: Large Canopy Trees
- **WHEN** Large Trees (Type A) are placed
- **THEN** they maintain a minimum separation of 15 meters from each other
- **AND** this simulates the competition for light and root space

#### Scenario: Understory Vegetation
- **WHEN** Small Trees/Bushes (Type B) are placed
- **THEN** they can be placed densely (min 4 meters separation)
- **AND** can fill gaps between Large Trees and Cabins
