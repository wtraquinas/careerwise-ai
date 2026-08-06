from sqlalchemy import text
from app.shared.database.session import SessionLocal

@app.get("/api/v1/health")
def health():
    db = SessionLocal()

    try:
        db.execute(text("SELECT 1"))

        return {
            "success": True,
            "status": "healthy",
            "database": "connected",
            "version": "1.0.0"
        }

    finally:
        db.close()