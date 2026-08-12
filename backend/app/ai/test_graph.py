from app.ai.graph.workflow import build_graph
from app.shared.database import models


def main():

    graph = build_graph()

    state = {
        "user_id": 7,
        "question": "Which applications should I follow up on?",
    }

    result = graph.invoke(state)

    print("\n==============================")
    print("LANGGRAPH TEST")
    print("==============================")

    print("Question:")
    print(result["question"])

    print("\nIntent:")
    print(result["intent"])

    print("\nFinal answer:")
    print(result["final_answer"])


if __name__ == "__main__":
    main()