from fastapi import APIRouter

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


@router.get("/ping")
def ping():

    return {
        "message": "Auth router works!"
    }