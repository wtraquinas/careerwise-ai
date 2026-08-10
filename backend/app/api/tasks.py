from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.shared.database.session import SessionLocal
from app.models.task import Task

router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["Tasks"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).order_by(Task.id.desc()).all()


@router.get("/{task_id}")
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


@router.post("/")
def create_task(
    task_data: dict,
    db: Session = Depends(get_db),
):
    task = Task(**task_data)

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@router.put("/{task_id}")
def update_task(
    task_id: int,
    task_data: dict,
    db: Session = Depends(get_db),
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    for key, value in task_data.items():
        if hasattr(task, key):
            setattr(task, key, value)

    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    db.delete(task)
    db.commit()

    return {
        "success": True,
        "message": "Task deleted successfully",
    }