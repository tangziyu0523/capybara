# Implementation Tasks

- [x] **1. Environment Setup**
  - [x] Create `backend-fastapi/` directory structure.
  - [x] Create `requirements.txt` with dependencies.
  - [x] Create `.env` template.
  - [x] Setup Docker Compose for PostgreSQL (optional but recommended for local dev).

- [x] **2. Database Layer**
  - [x] Implement `db/session.py` (SQLAlchemy setup).
  - [x] Implement `db/base.py` (Base model).
  - [x] Implement `models/user.py` (User model).
  - [x] Implement `models/document.py` (Document model).
  - [x] Create Alembic migration script for initial schema.

- [x] **3. Authentication Module**
  - [x] Implement `core/security.py` (Password hashing, Token generation).
  - [x] Implement `schemas/token.py` and `schemas/user.py`.
  - [x] Implement `api/deps.py` (get_current_user dependency).
  - [x] Implement `api/v1/endpoints/login.py` (Login route).

- [x] **4. Document Module**
  - [x] Implement `schemas/document.py`.
  - [x] Implement `services/file_manager.py` (File saving, validation).
  - [x] Implement `api/v1/endpoints/documents.py` (Upload, List endpoints).

- [x] **5. Main Application**
  - [x] Implement `main.py` (App entry, CORS, Routers).
  - [x] Seed initial Admin user logic.

- [x] **6. Testing**
  - [x] Write `tests/test_auth.py`.
  - [x] Write `tests/test_documents.py`.
  - [x] Run tests and ensure coverage.

- [x] **7. Documentation**
  - [x] Verify Swagger UI (`/docs`) functionality.
  - [x] Create `README.md` with run instructions.
