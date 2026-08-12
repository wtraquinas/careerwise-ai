def career_coach_agent(state):
    """
    Generate a basic career recommendation from the
    structured CareerWise data.

    This will be replaced by an LLM-powered agent.
    """

    applications = state.get("applications", [])

    if not applications:
        answer = (
            "You don't have any applications recorded yet. "
            "Start by adding your current job applications."
        )

    else:
        total = len(applications)

        statuses = {}

        for application in applications:
            status = application.get("status") or "Unknown"

            statuses[status] = statuses.get(status, 0) + 1

        status_summary = ", ".join(
            f"{status}: {count}"
            for status, count in statuses.items()
        )

        answer = (
            f"You currently have {total} application(s). "
            f"Status breakdown: {status_summary}."
        )

    return {
        "final_answer": answer
    }