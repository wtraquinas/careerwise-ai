def career_strategy_agent(state):
    """
    Provide personalized job search strategy recommendations
    using CRM data and the user's structured CV profile.
    """

    applications = state.get("applications", [])

    profile_data = state.get("profile_data") or {}

    skills = profile_data.get("skills") or []
    projects = profile_data.get("projects") or []
    experience = profile_data.get("experience") or []
    education = profile_data.get("education") or []
    target_roles = profile_data.get("target_roles") or []

    recommendations = []

    # -------------------------------------------------
    # Analyze applications
    # -------------------------------------------------

    total = len(applications)

    interview_apps = [
        application
        for application in applications
        if (
            application.get("status") or ""
        ).lower() == "interview"
    ]

    applied_apps = [
        application
        for application in applications
        if (
            application.get("status") or ""
        ).lower() == "applied"
    ]

    rejected_apps = [
        application
        for application in applications
        if (
            application.get("status") or ""
        ).lower() == "rejected"
    ]

    # -------------------------------------------------
    # Application pipeline recommendations
    # -------------------------------------------------

    if interview_apps:
        recommendations.append(
            f"- Prioritize preparation for your "
            f"{len(interview_apps)} interview-stage "
            f"application(s)."
        )

    if applied_apps:
        recommendations.append(
            f"- Follow up on your "
            f"{len(applied_apps)} active application(s) "
            f"where appropriate."
        )

    if rejected_apps:
        recommendations.append(
            f"- Review your {len(rejected_apps)} rejected "
            f"application(s) to identify patterns in role fit, "
            f"skills, or application strategy."
        )

    if not applications:
        recommendations.append(
            "- Start building a focused application pipeline "
            "instead of applying randomly to unrelated roles."
        )

    # -------------------------------------------------
    # Target roles
    # -------------------------------------------------

    if target_roles:
        roles_text = ", ".join(
            str(role)
            for role in target_roles[:5]
        )

        recommendations.append(
            f"- Focus your job search around your target "
            f"role(s): {roles_text}."
        )

    else:
        recommendations.append(
            "- Define 2–3 clear target roles so you can tailor "
            "your CV, LinkedIn profile, projects, and applications "
            "toward a consistent career direction."
        )

    # -------------------------------------------------
    # Skills
    # -------------------------------------------------

    if skills:
        skills_text = ", ".join(
            str(skill)
            for skill in skills[:8]
        )

        recommendations.append(
            f"- Highlight your strongest relevant skills when "
            f"tailoring applications: {skills_text}."
        )

        recommendations.append(
            "- Compare your current skills with job descriptions "
            "for your target roles and identify the most important "
            "skill gaps to close."
        )

    else:
        recommendations.append(
            "- Add a clear skills section to your CV profile so "
            "CareerWise can better match your experience with "
            "potential roles."
        )

    # -------------------------------------------------
    # Projects
    # -------------------------------------------------

    if projects:

        project_count = len(projects)

        recommendations.append(
            f"- Use your {project_count} project(s) as evidence "
            "of practical experience in your CV and interviews."
        )

        recommendations.append(
            "- Prioritize projects that demonstrate measurable "
            "results, relevant technologies, and real-world "
            "problem solving."
        )

    else:
        recommendations.append(
            "- Consider building or documenting 1–3 strong "
            "portfolio projects that demonstrate the skills "
            "required for your target roles."
        )

    # -------------------------------------------------
    # Experience
    # -------------------------------------------------

    if experience:

        experience_count = len(experience)

        recommendations.append(
            f"- Emphasize your {experience_count} relevant "
            "experience entry/entries when tailoring your CV."
        )

        recommendations.append(
            "- Describe your experience using achievements and "
            "outcomes rather than only listing responsibilities."
        )

    else:
        recommendations.append(
            "- If you have professional or relevant practical "
            "experience, make sure it is clearly represented in "
            "your CV so it can strengthen role recommendations."
        )

    # -------------------------------------------------
    # Education
    # -------------------------------------------------

    if education:

        education_count = len(education)

        recommendations.append(
            f"- Use your {education_count} education entry/entries "
            "to support applications where relevant qualifications "
            "or technical foundations are important."
        )

    # -------------------------------------------------
    # General strategy
    # -------------------------------------------------

    recommendations.append(
        "- Maintain a consistent pipeline of relevant opportunities "
        "rather than depending on a single application."
    )

    recommendations.append(
        "- Tailor your CV and application materials to the specific "
        "requirements of each role instead of using the exact same "
        "version everywhere."
    )

    # -------------------------------------------------
    # Build final answer
    # -------------------------------------------------

    if total == 0:

        intro = (
            "You don't have any applications recorded yet."
        )

    else:

        intro = (
            f"You currently have {total} tracked "
            f"application(s)."
        )

    answer = (
        f"{intro}\n\n"
        "### Personalized job search focus\n\n"
        + "\n".join(recommendations)
    )

    return {
        "final_answer": answer
    }