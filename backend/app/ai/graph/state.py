from typing import TypedDict


class CareerWiseState(TypedDict, total=False):
    """
    Shared state passed between LangGraph nodes.

    user_id is always associated with the authenticated
    CareerWise user whose data is being analyzed.
    """

    user_id: int

    question: str

    intent: str

    applications: list[dict]

    companies: list[dict]

    tasks: list[dict]

    agent_results: list[dict]

    final_answer: str