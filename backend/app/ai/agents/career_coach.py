def career_coach_agent(state):
    """
    Generate actionable career recommendations from
    the structured CareerWise data.

    This is intentionally rule-based for now.
    An LLM-powered coach will be added later.
    """

    applications = state.get("applications", [])

    if not applications:
        return {
            "final_answer": (
                "You don't have any applications recorded yet. "
                "Start by adding your current job applications."
            )
        }

    # -------------------------------------------------
    # Categorize applications
    # -------------------------------------------------

    interview_apps = []
    applied_apps = []
    other_apps = []

    for application in applications:
        status = (application.get("status") or "Unknown").lower()

        if status == "interview":
            interview_apps.append(application)

        elif status == "applied":
            applied_apps.append(application)

        else:
            other_apps.append(application)

    # -------------------------------------------------
    # Build recommendation
    # -------------------------------------------------

    recommendations = []

    # Interview applications have highest priority
    for application in interview_apps:
        company = application.get("company") or "Unknown company"
        position = application.get("position") or "Unknown position"

        recommendations.append(
            f"- {company} — {position} "
            f"(Interview): follow up as a high priority."
        )

    # Applied applications are secondary priority
    for application in applied_apps:
        company = application.get("company") or "Unknown company"
        position = application.get("position") or "Unknown position"

        recommendations.append(
            f"- {company} — {position} "
            f"(Applied): consider following up if you have not "
            f"received an update recently."
        )

    # Anything else
    for application in other_apps:
        company = application.get("company") or "Unknown company"
        position = application.get("position") or "Unknown position"
        status = application.get("status") or "Unknown"

        recommendations.append(
            f"- {company} — {position} "
            f"({status}): review and decide on the next action."
        )

    # -------------------------------------------------
    # Summary
    # -------------------------------------------------

    total = len(applications)

    status_counts = {}

    for application in applications:
        status = application.get("status") or "Unknown"
        status_counts[status] = status_counts.get(status, 0) + 1

    status_summary = ", ".join(
        f"{status}: {count}"
        for status, count in status_counts.items()
    )

    answer = (
        f"You currently have {total} application(s). "
        f"Status breakdown: {status_summary}.\n\n"
        "### Follow-up priorities\n\n"
        + "\n".join(recommendations)
    )

    return {
        "final_answer": answer
    }