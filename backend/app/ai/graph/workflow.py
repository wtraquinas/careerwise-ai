from langgraph.graph import StateGraph, START, END

from app.ai.graph.state import CareerWiseState
from app.ai.agents.planner import plan_question
from app.ai.agents.career_crm import career_crm_agent
from app.ai.agents.career_coach import career_coach_agent

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


def build_graph():

    graph = StateGraph(CareerWiseState)

    graph.add_node(
        "planner",
        plan_question,
    )

    graph.add_node(
        "career_crm",
        crm_node,
    )

    graph.add_node(
        "career_coach",
        career_coach_agent,
    )

    graph.add_edge(
        START,
        "planner",
    )

    graph.add_edge(
        "planner",
        "career_crm",
    )

    graph.add_edge(
        "career_crm",
        "career_coach",
    )

    graph.add_edge(
        "career_coach",
        END,
    )

    return graph.compile()