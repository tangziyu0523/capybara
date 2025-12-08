# Spec: Environment UI Layout

## MODIFIED Requirements

### Requirement: Layout Structure
The Environment Design page MUST use a split-pane layout.

#### Scenario: Desktop View
- **Given** the user is on the Environment Design page
- **Then** the screen is divided vertically.
- **And** the Left Panel occupies 40% of the width.
- **And** the Right Panel occupies 60% of the width.
- **And** the Left Panel contains the "Design Description Cards".
- **And** the Right Panel contains the "3D Model Viewer".

#### Scenario: Responsive View
- **Given** the viewport width is below mobile breakpoint (e.g., 768px)
- **Then** the layout stacks vertically.
- **And** the 3D Model Viewer appears at the top (or is toggleable).
- **And** the Cards appear below.

### Requirement: Loading State
The page MUST display a progress indicator during model loading.

#### Scenario: Initial Load
- **Given** the page is opening
- **When** the 3D assets are fetching
- **Then** a progress bar or spinner is visible over the 3D view area.
- **And** it shows the percentage of completion.
