# Spec: Internationalization

## MODIFIED Requirements

### Requirement: Full Language Support
The "Environment Design" module MUST support dynamic language switching.

#### Scenario: Switching to Chinese
- **Given** the user is on the Environment Design page.
- **And** the current language is English.
- **When** the user switches language to Chinese.
- **Then** the page title becomes "环境程式设计".
- **And** all card titles and descriptions update to Chinese.
- **And** the "Back" button text becomes "返回".

#### Scenario: Card Detail Localization
- **Given** a specific environment card (e.g., Central District).
- **When** the language is changed.
- **Then** the specific details of that card are displayed in the selected language immediately (< 200ms).
