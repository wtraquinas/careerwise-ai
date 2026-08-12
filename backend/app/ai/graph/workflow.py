from langgraph.graph import StateGraph, START, END

from app.ai.graph.state import CareerWiseState

from app.ai.agents.planner import plan_question

from app.ai.agents.career_crm import (
    career_crm_agent,
)

from app.ai.agents.application_coach import (
    application_coach_agent,
)

from app.ai.agents.interview_coach import (
    interview_coach_agent,
)

from app.ai.agents.career_strategy import (
    career_strategy_agent,
)

from app.shared.database.session import SessionLocal


def crm_node(state: CareerWiseState):
    """
    LangGraph adapter around the database-backed CRM agent.
    """

    db = SessionLocal()

    try:
        return career_crm_agent(
            state,
            db,
        )

    finally:
        db.close()


def route_after_planner(state: CareerWiseState):
    """
    Route the request based on the planner intent.
    """

    intent = state.get(
        "intent",
        "general",
    )

    if intent == "applications":
        return "applications"

    if intent == "interview":
        return "interview"

    if intent == "career_strategy":
        return "career_strategy"

    return "general"


def build_graph():

    graph = StateGraph(CareerWiseState)

    # -------------------------------------------------
    # Nodes
    # -------------------------------------------------

    graph.add_node(
        "planner",
        plan_question,
    )

    graph.add_node(
        "career_crm",
        crm_node,
    )

    graph.add_node(
        "application_coach",
        application_coach_agent,
    )

    graph.add_node(
        "interview_coach",
        interview_coach_agent,
    )

    graph.add_node(
        "career_strategy",
        career_strategy_agent,
    )

    # -------------------------------------------------
    # Start
    # -------------------------------------------------

    graph.add_edge(
        START,
        "planner",
    )

    # -------------------------------------------------
    # Route all questions through CRM first
    # -------------------------------------------------

    graph.add_edge(
        "planner",
        "career_crm",
    )

    # -------------------------------------------------
    # Conditional routing after CRM
    # -------------------------------------------------

    graph.add_conditional_edges(
        "career_crm",
        route_after_planner,
        {
            "applications": "application_coach",
            "interview": "interview_coach",
            "career_strategy": "career_strategy",
            "general": "career_strategy",
        },
    )

    # -------------------------------------------------
    # End points
    # -------------------------------------------------

    graph.add_edge(
        "application_coach",
        END,
    )

    graph.add_edge(
        "interview_coach",
        END,
    )

    graph.add_edge(
        "career_strategy",
        END,
    )

    return graph.compile()