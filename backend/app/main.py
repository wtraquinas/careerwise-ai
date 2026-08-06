from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.shared.database.session import SessionLocal

app = FastAPI(
    title="CareerWise API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.app\.github\.dev",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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