from app.ai.graph.workflow import build_graph


def run_test(
    graph,
    user_id: int,
    question: str,
):

    state = {
        "user_id": user_id,
        "question": question,
    }

    return graph.invoke(state)


def print_result(
    title: str,
    result: dict,
):

    print(f"\n## {title}")

    print("\nQuestion:")
    print(result["question"])

    print("\nIntent:")
    print(result["intent"])

    print("\nFinal answer:")
    print(result["final_answer"])


def main():

    graph = build_graph()

    # -------------------------------------------------
    # Applications
    # -------------------------------------------------

    application_result = run_test(
        graph,
        user_id=7,
        question=(
            "Which applications should I follow up on?"
        ),
    )

    print_result(
        "APPLICATION TEST",
        application_result,
    )

    # -------------------------------------------------
    # Interview
    # -------------------------------------------------

    interview_result = run_test(
        graph,
        user_id=7,
        question=(
            "How should I prepare for my next interview?"
        ),
    )

    print_result(
        "INTERVIEW TEST",
        interview_result,
    )

    # -------------------------------------------------
    # Career Strategy
    # -------------------------------------------------

    strategy_result = run_test(
        graph,
        user_id=7,
        question=(
            "What should I focus on in my job search?"
        ),
    )

    print_result(
        "CAREER STRATEGY TEST",
        strategy_result,
    )

    # -------------------------------------------------
    # Missing user test
    # -------------------------------------------------

    print("\n## MISSING USER TEST")

    try:

        graph.invoke(
            {
                "question": (
                    "Which applications should I follow up on?"
                ),
            }
        )

        print(
            "ERROR: graph accepted a request without user_id"
        )

    except ValueError as error:

        print(
            "PASS:",
            error,
        )


if __name__ == "__main__":
    main()