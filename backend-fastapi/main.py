from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import login, documents
from app.db.session import engine
from app.db.base import Base
from app.models.user import User
from app.core import security
from sqlalchemy.orm import Session

# Create tables (for simplicity, in prod use Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Million Cubic City API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(login.router, prefix="/api/v1", tags=["auth"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["documents"])

# Seed Admin
@app.on_event("startup")
def create_admin_user():
    from app.db.session import SessionLocal
    db = SessionLocal()
    user = db.query(User).filter(User.username == "admin").first()
    if not user:
        hashed_password = security.get_password_hash("admin123")
        db_user = User(username="admin", password_hash=hashed_password, role="admin")
        db.add(db_user)
        db.commit()
        print("Admin user created")
    db.close()
