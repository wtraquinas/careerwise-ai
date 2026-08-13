def application_coach_agent(state):
    """
    Provide recommendations about job applications.
    """

    applications = state.get("applications", [])

    if not applications:
        return {
            "final_answer": (
                "You don't have any applications recorded yet."
            )
        }

    recommendations = []

    profile_data = state.get("profile_data", {})

    skills = profile_data.get("skills", [])
    projects = profile_data.get("projects", [])
    experience = profile_data.get("experience", [])
    education = profile_data.get("education", [])
    target_roles = profile_data.get("target_roles", [])

    for application in applications:

        company = (
            application.get("company")
            or "Unknown company"
        )

        position = (
            application.get("position")
            or "Unknown position"
        )

        status = (
            application.get("status")
            or "Unknown"
        ).lower()

        if status == "interview":

            recommendations.append(
                f"- {company} — {position}: "
                "prepare for the interview and follow up "
                "if you are waiting for the next step."
            )

        elif status == "applied":

            recommendations.append(
                f"- {company} — {position}: "
                "monitor the application and follow up "
                "if you have not received an update."
            )

        else:

            recommendations.append(
                f"- {company} — {position}: "
                f"current status is {status}."
            )

    answer = (
        "### Application recommendations\n\n"
        + "\n".join(recommendations)
    )

    return {
        "final_answer": answer
    }