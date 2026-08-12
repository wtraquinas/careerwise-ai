def plan_question(state):
    """
    Determine the type of career question being asked.

    This is intentionally simple for LangGraph v1.
    We will replace this with an LLM-based planner later.
    """

    question = state["question"].lower()

    if any(
        word in question
        for word in [
            "follow up",
            "follow-up",
            "followup",
            "application",
            "applications",
        ]
    ):
        intent = "applications"

    elif any(
        word in question
        for word in [
            "interview",
            "interviews",
            "prepare",
            "preparation",
        ]
    ):
        intent = "interview"

    elif any(
        word in question
        for word in [
            "career",
            "career advice",
            "what should",
            "recommend",
            "recommendation",
        ]
    ):
        intent = "career_strategy"

    else:
        intent = "general"

    return {
        "intent": intent
    }