# Spec: Navigation Logic

## MODIFIED Requirements

### Requirement: Smart Back Navigation
The "Back" button MUST return the user to their previous context.

#### Scenario: Return to Section
- **Given** the user navigated to "Environment Design" from the Home page "Environment" section.
- **When** the user clicks "Back".
- **Then** the user is returned to the Home page.
- **And** the view scrolls automatically to the "Environment" section.
- **And** the previous scroll position within that section is restored (if applicable).

#### Scenario: Deep Link Entry
- **Given** the user accessed `/environment/1` directly via URL.
- **When** the user clicks "Back".
- **Then** the user is taken to the Home page "Environment" section (fallback behavior).
