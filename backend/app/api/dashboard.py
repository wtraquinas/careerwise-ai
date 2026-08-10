from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.dependencies import get_db

from app.models.company import Company
from app.models.application import Application
from app.models.recruiter import Recruiter
from app.models.task import Task
from app.features.auth.models import User


router = APIRouter(
    prefix="/api/v1/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):

    companies = db.query(func.count(Company.id)).scalar()
    users = db.query(func.count(User.id)).scalar()
    applications = db.query(func.count(Application.id)).scalar()
    recruiters = db.query(func.count(Recruiter.id)).scalar()
    tasks = db.query(func.count(Task.id)).scalar()

    return {
        "companies": companies,
        "users": users,
        "applications": applications,
        "recruiters": recruiters,
        "tasks": tasks,
    }