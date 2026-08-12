def plan_question(state):
    """
    Determine the type of career question being asked.

    This is intentionally rule-based for now.
    It will later be replaced or augmented by an LLM planner.
    """

    question = state.get("question", "").lower()

    if not question:
        return {
            "intent": "general"
        }

    if any(
        phrase in question
        for phrase in [
            "follow up",
            "follow-up",
            "followup",
            "application",
            "applications",
        ]
    ):
        return {
            "intent": "applications"
        }

    if any(
        phrase in question
        for phrase in [
            "interview",
            "interviews",
            "prepare",
            "preparation",
        ]
    ):
        return {
            "intent": "interview"
        }

    if any(
        phrase in question
        for phrase in [
            "career",
            "career advice",
            "what should",
            "recommend",
            "recommendation",
            "job search",
        ]
    ):
        return {
            "intent": "career_strategy"
        }

    return {
        "intent": "general"
    }