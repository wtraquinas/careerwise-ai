from langgraph.graph import StateGraph, START, END

from app.ai.graph.state import CareerWiseState

from app.ai.agents.planner import plan_question
from app.ai.agents.career_crm import career_crm_agent
from app.ai.agents.application_coach import application_coach_agent
from app.ai.agents.interview_coach import interview_coach_agent
from app.ai.agents.career_strategy import career_strategy_agent

from app.ai.graph.nodes.profile import get_user_profile
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

    intent = state.get("intent", "general")

    if intent == "applications":
        return "applications"

    if intent == "interview":
        return "interview"

    if intent == "career_strategy":
        return "career_strategy"

    return "general"


def build_graph():
    """
    Build the CareerWise AI LangGraph workflow.

    Flow:

    START
      ↓
    get_user_profile
      ↓
    planner
      ↓
    career_crm
      ↓
    conditional routing
      ├── application_coach
      ├── interview_coach
      └── career_strategy
    """

    graph = StateGraph(CareerWiseState)

    # -------------------------------------------------
    # Nodes
    # -------------------------------------------------

    graph.add_node(
        "get_user_profile",
        get_user_profile,
    )

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
    # Workflow
    # -------------------------------------------------

    graph.add_edge(
        START,
        "get_user_profile",
    )

    graph.add_edge(
        "get_user_profile",
        "planner",
    )

    graph.add_edge(
        "planner",
        "career_crm",
    )

    # -------------------------------------------------
    # Conditional routing
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