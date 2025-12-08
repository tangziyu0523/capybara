## ADDED Requirements

### Requirement: Admin Login
The system SHALL provide an endpoint for admin authentication.

#### Scenario: Successful Login
- **Given** the admin provides a valid username and password.
- **When** the `POST /api/login` endpoint is called.
- **Then** the system returns a 200 OK with a JWT access token.

#### Scenario: Invalid Credentials
- **Given** the admin provides an invalid username or password.
- **When** the `POST /api/login` endpoint is called.
- **Then** the system returns 401 Unauthorized.

### Requirement: Protected Route Access
The system SHALL secure sensitive endpoints with JWT authentication.

#### Scenario: Valid Token Access
- **Given** a request to a protected endpoint (e.g., document upload).
- **When** the request includes a valid `Authorization: Bearer <token>` header.
- **Then** the request is processed successfully.

#### Scenario: Invalid Token Access
- **Given** a request with an invalid or expired token.
- **When** the request is made to a protected endpoint.
- **Then** the system returns 401 Unauthorized.
