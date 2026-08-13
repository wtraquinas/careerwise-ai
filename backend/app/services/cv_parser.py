import re


KNOWN_SKILLS = [
    "Python",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "FastAPI",
    "Streamlit",
    "LangChain",
    "LangGraph",
    "Docker",
    "PostgreSQL",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "React",
    "JavaScript",
    "Git",
    "GitHub",
    "AWS",
    "Azure",
    "OpenAI",
    "RAG",
    "NLP",
]


TARGET_ROLES = [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Data Engineer",
    "Application Support Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Python Developer",
]


def extract_profile_data(cv_text: str) -> dict:
    """
    Extract structured profile information from CV text.

    This is a deterministic MVP parser.
    It can later be replaced with an LLM-based extractor.
    """

    text_lower = cv_text.lower()

    skills = []

    for skill in KNOWN_SKILLS:
        if skill.lower() in text_lower:
            skills.append(skill)

    target_roles = []

    for role in TARGET_ROLES:
        if role.lower() in text_lower:
            target_roles.append(role)

    projects = extract_projects(cv_text)

    experience = extract_experience(cv_text)

    education = extract_education(cv_text)

    return {
        "skills": sorted(list(set(skills))),
        "projects": projects,
        "experience": experience,
        "education": education,
        "target_roles": sorted(list(set(target_roles))),
    }


def extract_projects(cv_text: str) -> list[dict]:
    """
    Basic project extraction.

    MVP implementation.
    """

    projects = []

    lines = cv_text.splitlines()

    project_section = False

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if line.lower() in [
            "projects",
            "personal projects",
            "portfolio projects",
        ]:
            project_section = True
            continue

        if project_section and line.lower() in [
            "experience",
            "education",
            "skills",
            "work experience",
        ]:
            project_section = False

        if project_section and len(line) > 3:

            projects.append(
                {
                    "name": line,
                }
            )

    return projects[:10]


def extract_experience(cv_text: str) -> list[dict]:
    """
    Placeholder experience extraction.
    """

    experience = []

    lines = cv_text.splitlines()

    experience_section = False

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if line.lower() in [
            "experience",
            "work experience",
            "professional experience",
        ]:
            experience_section = True
            continue

        if experience_section and line.lower() in [
            "education",
            "skills",
            "projects",
        ]:
            experience_section = False

        if experience_section and len(line) > 5:

            experience.append(
                {
                    "description": line,
                }
            )

    return experience[:20]


def extract_education(cv_text: str) -> list[dict]:
    """
    Basic education extraction.
    """

    education = []

    lines = cv_text.splitlines()

    education_section = False

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if line.lower() == "education":
            education_section = True
            continue

        if education_section and line.lower() in [
            "skills",
            "experience",
            "projects",
        ]:
            education_section = False

        if education_section:

            education.append(
                {
                    "description": line,
                }
            )

    return education[:10]