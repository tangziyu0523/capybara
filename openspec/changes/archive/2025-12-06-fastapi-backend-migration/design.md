# Design: FastAPI Backend Architecture

## Overview
The system moves from a monolithic Express.js app to a structured FastAPI application. This change introduces a separation of concerns with distinct routers, Pydantic schemas for validation, and SQLAlchemy for ORM-based database interactions.

## Architecture Components

### 1. Application Structure (`app/`)
- **`main.py`**: Entry point, configures `FastAPI` app, CORS, and includes routers.
- **`core/`**: Configuration (env vars), security (password hashing, JWT generation).
- **`db/`**: Database connection (`session.py`) and base models.
- **`models/`**: SQLAlchemy ORM models (`User`, `Document`).
- **`schemas/`**: Pydantic models for request/response validation.
- **`api/`**: Route handlers (`auth.py`, `documents.py`).
- **`services/`**: Business logic (e.g., file saving, user authentication).

### 2. Database Design (PostgreSQL)

#### Table: `users`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Serial | PK | Unique ID |
| username | Varchar | Unique, Not Null | Admin username |
| password_hash | Varchar | Not Null | Bcrypt hashed password |
| role | Varchar | Default 'admin' | User role |
| created_at | Timestamp | Default Now | Creation time |

#### Table: `documents`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Serial | PK | Unique ID |
| filename | Varchar | Not Null | Original filename |
| file_path | Varchar | Not Null | Storage path on disk |
| file_size | Integer | Not Null | Size in bytes |
| content_type | Varchar | Not Null | MIME type |
| uploaded_by | Integer | FK -> users.id | Uploader ID |
| created_at | Timestamp | Default Now | Upload time |

### 3. File Storage Strategy
- Files will be stored in a local directory (e.g., `uploads/`).
- Filenames will be sanitized or hashed (UUID) to prevent collisions and security issues.
- The database stores the relative path to the file.

### 4. Authentication Flow
1. Client sends `POST /api/login` with `{username, password}`.
2. Server verifies credentials against `users` table.
3. Server returns JWT access token.
4. Client includes `Authorization: Bearer <token>` in subsequent requests.
5. `get_current_user` dependency verifies token on protected routes.

## Deployment & Running
- **Local Development**: `uvicorn app.main:app --reload`
- **Dependencies**: `requirements.txt` (fastapi, uvicorn, sqlalchemy, psycopg2-binary, python-jose, passlib, python-multipart).
- **Environment**: `.env` file for DB credentials and Secret Key.
