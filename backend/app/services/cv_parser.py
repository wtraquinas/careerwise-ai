import re


SKILL_KEYWORDS = [
    "Python",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "FastAPI",
    "Streamlit",
    "LangChain",
    "LangGraph",
    "Docker",
    "Git",
    "PostgreSQL",
    "Pandas",
    "NumPy",
    "scikit-learn",
    "TensorFlow",
    "PyTorch",
    "NLP",
    "RAG",
    "OpenAI",
    "REST API",
]


ROLE_KEYWORDS = [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Data Engineer",
    "Application Support Engineer",
    "Software Engineer",
    "Python Developer",
    "Backend Developer",
]


def extract_skills(cv_text: str) -> list[str]:
    found_skills = []

    for skill in SKILL_KEYWORDS:
        if re.search(
            rf"\b{re.escape(skill)}\b",
            cv_text,
            re.IGNORECASE,
        ):
            found_skills.append(skill)

    return sorted(set(found_skills))


def extract_target_roles(cv_text: str) -> list[str]:
    found_roles = []

    for role in ROLE_KEYWORDS:
        if re.search(
            rf"\b{re.escape(role)}\b",
            cv_text,
            re.IGNORECASE,
        ):
            found_roles.append(role)

    return sorted(set(found_roles))


def extract_cv_profile(cv_text: str) -> dict:
    return {
        "skills": extract_skills(cv_text),
        "projects": [],
        "experience": [],
        "education": [],
        "target_roles": extract_target_roles(cv_text),
    }