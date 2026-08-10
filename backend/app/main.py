from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.auth import router as auth_router
from app.api.companies import router as company_router
from app.shared.database.session import SessionLocal

from app.api.dashboard import router as dashboard_router

from app.api.ai import router as ai_router

from app.api.applications import router as application_router

from app.shared.database.base import Base
from app.shared.database.session import engine

# Import all models so SQLAlchemy registers them
from app.shared.database.models import *

from app.api.recruiters import router as recruiter_router
from app.api.tasks import router as task_router


app = FastAPI(
    title="CareerWise API",
    version="1.0.0"
)

import os

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://careerwise-ai.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.app\.github\.dev",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(company_router)
app.include_router(dashboard_router)
app.include_router(ai_router)
app.include_router(application_router)
app.include_router(recruiter_router)
app.include_router(task_router)

@app.get("/api/v1/health")
def health():
    db = None

    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))

        return {
            "success": True,
            "status": "healthy",
            "database": "connected",
            "version": "1.0.0",
        }

    except Exception as e:
        return {
            "success": False,
            "status": "database_error",
            "error": str(e),
        }

    finally:
        if db:
            db.close()