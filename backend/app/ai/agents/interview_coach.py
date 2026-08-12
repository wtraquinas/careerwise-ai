def interview_coach_agent(state):
    """
    Provide recommendations for interview preparation.
    """

    applications = state.get("applications", [])

    interview_apps = [
        application
        for application in applications
        if (
            application.get("status")
            or ""
        ).lower() == "interview"
    ]

    if not interview_apps:

        return {
            "final_answer": (
                "You don't currently have any applications "
                "in the interview stage. Focus on strengthening "
                "your applications and preparing your interview "
                "materials."
            )
        }

    recommendations = []

    for application in interview_apps:

        company = (
            application.get("company")
            or "Unknown company"
        )

        position = (
            application.get("position")
            or "Unknown position"
        )

        recommendations.append(
            f"- **{company} — {position}**\n"
            "  - Research the company and role.\n"
            "  - Prepare examples using the STAR method.\n"
            "  - Review the technical and functional skills "
            "required for the position.\n"
            "  - Prepare questions for the interviewer."
        )

    answer = (
        "### Interview preparation priorities\n\n"
        + "\n\n".join(recommendations)
    )

    return {
        "final_answer": answer
    }