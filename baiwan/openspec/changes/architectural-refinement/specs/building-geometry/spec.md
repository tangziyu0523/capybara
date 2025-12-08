## MODIFIED Requirements

### Requirement: Tidal District Geometry
The system SHALL render the Tidal Lounge district using simplified, functional geometric forms.

#### Scenario: Functional Forms
- **WHEN** Tidal Lounge buildings are generated
- **THEN** they are rendered as either smooth Ellipsoids or Chamfered Cubes
- **AND** complex fractal/noise deformation is removed
- **AND** they retain the transparent "water drop" material aesthetic

### Requirement: Forest District Scale
The system SHALL ensure Forest Habitat buildings are consistent in scale with the rest of the city.

#### Scenario: Standardized Sizing
- **WHEN** Forest Cabins are generated
- **THEN** their dimensions are derived from the standard building volume (approx 2000 units)
- **AND** they appear comparable in size to Commercial or Industrial buildings (not miniature)

### Requirement: Visual Unification
The system SHALL use a unified color and material palette.

#### Scenario: Color Harmony
- **WHEN** districts are rendered
- **THEN** Forest is Warm Wood (#8B5A2B)
- **AND** Tidal is Cool Glass (#AACCFF)
- **AND** Industrial is Neutral Metal/White (#FFFFFF)
