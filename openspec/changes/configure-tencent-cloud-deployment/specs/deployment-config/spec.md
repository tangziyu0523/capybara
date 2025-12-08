# Spec: Deployment Configuration

## ADDED Requirements

### Requirement: Docker Configuration
The system MUST include Docker configuration files for building the frontend.

#### Scenario: Build Docker Image
- **Given** the `million-cubic-city` directory.
- **When** `docker build -t capybara-frontend .` is run.
- **Then** a valid Docker image is created containing the compiled assets.

#### Scenario: Nginx Routing
- **Given** the container is running.
- **When** a user visits a sub-route (e.g., `/environment`).
- **Then** Nginx returns `index.html` (SPA fallback) instead of 404.

### Requirement: Git Configuration
The workspace MUST be a valid Git repository.

#### Scenario: Ignore Rules
- **Given** the workspace root.
- **When** `git status` is run.
- **Then** `node_modules`, `dist`, `.env`, and OS files (`.DS_Store`) are ignored.
