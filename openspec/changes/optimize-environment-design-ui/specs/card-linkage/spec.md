# Spec: Card and Model Linkage

## ADDED Requirements

### Requirement: Card Selection & Camera Flight
Selecting a card MUST trigger a camera transition to the associated model area.

#### Scenario: User clicks a card
- **Given** a list of terrain cards with associated 3D coordinates
- **When** the user clicks a card
- **Then** the card becomes "Active" (highlighted style).
- **And** the 3D camera smoothly transitions to focus on the card's associated coordinates.
- **And** the transition completes within approximately 1 second.
- **And** the final view zooms in (2-3x magnification relative to default).

### Requirement: Visual Feedback
The target area MUST provide visual feedback upon selection.

#### Scenario: Target Blinking
- **When** a card is selected
- **Then** the corresponding area in the 3D model flashes/blinks briefly to draw attention.
