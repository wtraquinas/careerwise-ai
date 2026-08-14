from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.auth import router as auth_router
from app.api.companies import router as company_router
from app.shared.database.session import SessionLocal

from app.api.dashboard import router as dashboard_router

from app.api.applications import router as application_router

from app.shared.database.base import Base
from app.shared.database.session import engine

# Import all models so SQLAlchemy registers them
from app.shared.database.models import *

from app.api.recruiters import router as recruiter_router
from app.api.tasks import router as task_router

from app.api.users import router as user_router

from app.ai.router import router as ai_router

from app.api.profile import router as profile_router

from app.api.ai import router as ai_api_router

from app.api.cover_letter import (
    router as cover_letter_router,
)

from app.api.access_requests import (
    router as access_request_router
)

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

# AI Graph / CareerWise Agent
app.include_router(ai_router)

# AI Service endpoints
app.include_router(ai_api_router)

app.include_router(application_router)
app.include_router(recruiter_router)
app.include_router(task_router)
app.include_router(user_router)
app.include_router(profile_router)

app.include_router(
    cover_letter_router,
)

app.include_router(
    access_request_router
)

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