# Million Cubic City - FastAPI Backend

A modern, high-performance backend for the Million Cubic City project, built with FastAPI and PostgreSQL.

## Features
- **JWT Authentication**: Secure login and protected routes.
- **Document Management**: Upload and manage files (PDF, DOCX, PPTX).
- **Admin System**: Pre-seeded admin user.

## Prerequisites
- Python 3.9+
- PostgreSQL (running on localhost:5432)

## Setup

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   - Create a `.env` file based on the template.
   - Ensure PostgreSQL is running and the database `million_cubic_city` exists.

3. **Run the Server**
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`.

4. **API Documentation**
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## Testing
Run tests with pytest:
```bash
pytest
```
