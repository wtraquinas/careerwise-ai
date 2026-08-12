def career_strategy_agent(state):
    """
    Provide higher-level job search strategy recommendations.
    """

    applications = state.get("applications", [])

    if not applications:

        return {
            "final_answer": (
                "You don't have any applications recorded yet. "
                "Start by identifying target roles and companies, "
                "then build a consistent application pipeline."
            )
        }

    total = len(applications)

    interview_apps = [
        application
        for application in applications
        if (
            application.get("status")
            or ""
        ).lower() == "interview"
    ]

    applied_apps = [
        application
        for application in applications
        if (
            application.get("status")
            or ""
        ).lower() == "applied"
    ]

    recommendations = []

    if interview_apps:

        recommendations.append(
            f"- Prioritize your {len(interview_apps)} "
            "interview-stage application(s)."
        )

    if applied_apps:

        recommendations.append(
            f"- Track and follow up on your "
            f"{len(applied_apps)} submitted application(s)."
        )

    recommendations.append(
        "- Continue building a pipeline of relevant "
        "opportunities rather than relying on only one role."
    )

    recommendations.append(
        "- Review your CV and application materials "
        "based on the types of roles generating interviews."
    )

    answer = (
        f"You currently have {total} tracked application(s).\n\n"
        "### Recommended job search focus\n\n"
        + "\n".join(recommendations)
    )

    return {
        "final_answer": answer
    }