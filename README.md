# CareerWise AI 🚀

> **An AI-powered Career Operating System that combines a Career CRM, personalized career intelligence, and a LangGraph-based multi-agent architecture.**

CareerWise AI helps users manage their job search while using AI to generate personalized career recommendations.

Instead of treating AI as a simple chatbot, CareerWise combines structured career data, CV information, user profiles, and specialized AI agents to provide more relevant recommendations about:

* Job search strategy
* Career planning
* Applications
* Interview preparation
* Skills
* Experience
* Education
* Portfolio projects
* Target roles
* Personalized cover letters

The project is being developed as a portfolio-ready AI Engineering application focused on practical AI integration, agentic workflows, modern full-stack architecture, and cloud-first development.

<br>

<center>
  <table>
    <td><img src="./images/CW Dashboard 20260814.jpg"></img></td>
    <td><img src="./images/CW Career Profile Settings 20260814.jpg"></img></td>
  </table>
</center>

---

# 🌐 Live Demo

| Service          | URL                                             |
| ---------------- | ----------------------------------------------- |
| Frontend         | https://careerwise-ai.vercel.app                |
| Backend API      | https://careerwise-api-8x1i.onrender.com        |
| API Health Check | https://careerwise-api-8x1i.onrender.com/health |


<br>

<center>
  <table>
    <td><img src="./images/CW Applications 20260814.jpg"></img></td>
    <td><img src="./images/CW Career Coach 20260814.jpg"></img></td>
  </table>
</center>

---

# ✨ Current Project Status

🚧 **Active MVP Development**

CareerWise AI has evolved from a basic Career CRM into a personalized AI-powered career assistant.

The current implementation includes:

## Career Management

* User authentication
* JWT-based authentication
* User-specific data
* Career dashboard
* Company management
* Job application management
* Recruiter management
* Task management

## Application Management

Users can:

* Create applications
* Edit applications
* Delete applications
* Search and filter applications
* Associate applications with companies
* Track application status
* Store salary information
* Store application dates
* Store job URLs
* Store notes

Current application statuses include:

* Applied
* Interview
* Assessment
* Offer
* Accepted
* Rejected

## Career Profile

Users can upload a CV and maintain a structured career profile.

The profile can contain:

* Skills
* Projects
* Professional experience
* Education
* Target roles

CareerWise persists this information and makes it available to AI features.

This allows recommendations to use actual information from the user's career profile instead of relying only on generic career advice.

<br>

---

# 🤖 AI Features

CareerWise currently includes multiple AI capabilities.

## AI Career Coach

Users can ask career-related questions such as:

> What should I focus on in my job search?

> Which applications should I follow up on?

> How should I prepare for an interview?

> What career strategy should I follow?

The AI Career Coach uses the user's CareerWise data to generate context-aware recommendations.

<br>

---

## 🧠 LangGraph Multi-Agent Architecture

One of the core AI Engineering components of CareerWise is its **LangGraph-based agent architecture**.

Instead of sending every question directly to a single LLM prompt, CareerWise uses a workflow that routes questions to specialized agents.

Conceptually:

```text
                    User Question
                          │
                          ▼
                  LangGraph Workflow
                          │
                          ▼
                   Intent Router
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
   Career Strategy   Application Coach   Interview Coach
          │               │                │
          └───────────────┼────────────────┘
                          │
                          ▼
                    Shared State
                          │
                          ▼
                 Personalized Answer
```

The workflow uses shared state containing relevant career information, including:

* User ID
* User question
* Detected intent
* Applications
* Career profile
* Skills
* Projects
* Experience
* Education
* Target roles

This architecture allows different agents to specialize in different career tasks.

---

## 🎯 Career Strategy Agent

The Career Strategy Agent provides personalized job search recommendations.

It can use information such as:

* Current applications
* Skills
* Projects
* Professional experience
* Education
* Target roles

For example, instead of simply recommending:

> "Improve your skills and apply for jobs."

CareerWise can generate more personalized guidance such as:

> Focus your applications on roles aligned with your existing experience in application support, SQL, REST APIs, cloud infrastructure, and Python.

The agent can also identify areas such as:

* Application pipeline gaps
* Career direction
* Target role definition
* Portfolio opportunities
* Skill gaps
* CV tailoring

---

## 📋 Application Coach

The Application Coach analyzes the user's current applications and provides recommendations based on their status.

Examples include:

* Applications that may require follow-up
* Applications currently in interview stages
* Opportunities requiring attention
* Recommendations based on application status

---

## 🎤 Interview Coach

The Interview Coach focuses on applications currently in the interview stage.

It can recommend:

* Company research
* Role preparation
* STAR method examples
* Technical preparation
* Functional preparation
* Questions to ask interviewers

---

# ✨ AI Application Analysis

Each application can be analyzed individually using CareerWise AI.

The analysis currently returns structured information including:

* Priority
* Summary
* Reason
* Recommended next steps
* Interview preparation
* Follow-up recommendations

The backend uses OpenAI to generate structured JSON responses.

Example response structure:

```json
{
  "summary": "Short assessment of the application",
  "priority": "high",
  "reason": "Why this application deserves attention",
  "next_steps": [
    "Recommended action 1",
    "Recommended action 2"
  ],
  "interview_preparation": [
    "Preparation item 1"
  ],
  "follow_up": "Recommended follow-up action"
}
```

The frontend displays the analysis in a dedicated AI dialog.

---

# ✉️ AI Cover Letter Generation

CareerWise can generate personalized cover letters for individual applications.

The cover letter generation process combines:

```text
Application
    +
Company
    +
Career Profile
    +
CV Content
    ↓
Personalized Cover Letter
```

The AI can use information from the user's:

* CV
* Skills
* Experience
* Projects
* Education
* Target roles

This produces a significantly more personalized result than a generic cover letter template.

---

# 🏗️ System Architecture

CareerWise follows a modular full-stack architecture.

```text
                        ┌─────────────────────┐
                        │   React Frontend    │
                        │ React + Vite + MUI  │
                        └──────────┬──────────┘
                                   │
                            HTTP / Axios
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │   FastAPI Backend   │
                        └──────────┬──────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
       REST API Layer        AI Services         LangGraph Workflow
              │                    │                    │
              ▼                    ▼                    ▼
         SQLAlchemy            OpenAI API       Specialized Agents
              │                                     │
              └──────────────────┬──────────────────┘
                                 │
                                 ▼
                          PostgreSQL
                           / Supabase
```

---

# 🧩 LangGraph Architecture

The LangGraph workflow provides orchestration for the agent-based AI features.

A simplified flow:

```text
                    ┌─────────────────┐
                    │   User Request  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Intent Detection│
                    └────────┬────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
      Career Strategy   Application Coach  Interview Coach
             │               │                │
             └───────────────┼────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Shared AI State │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Final Answer   │
                    └─────────────────┘
```

The shared state allows agents to access relevant context without each component independently rebuilding the same information.

This provides a foundation for adding additional agents in the future.

Potential future agents include:

* Resume Agent
* Job Match Agent
* Skills Gap Agent
* Career Planner
* Evaluation Agent

---

# 🛠️ Technology Stack

## Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn
* Alembic

## Frontend

* React
* Vite
* Material UI
* TanStack React Query
* Axios
* React Markdown

## Database

* PostgreSQL
* Supabase
* SQLAlchemy ORM

## AI

* OpenAI API
* GPT-5-mini
* LangGraph
* Specialized AI agents
* Structured AI responses
* Shared agent state
* Personalized CV and career profile context

## Development

* GitHub
* GitHub Codespaces
* Dev Containers
* Vercel
* Render

---

# 📁 Project Structure

```text
careerwise-ai/
│
├── .devcontainer/
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── ai/
│   │   │   ├── agents/
│   │   │   │   ├── application_coach.py
│   │   │   │   ├── career_coach.py
│   │   │   │   ├── career_crm.py
│   │   │   │   ├── career_strategy.py
│   │   │   │   ├── cover_letter.py
│   │   │   │   ├── interview_coach.py
│   │   │   │   └── planner.py
│   │   │   │
│   │   │   ├── graph/
│   │   │   │   ├── state.py
│   │   │   │   └── workflow.py
│   │   │   │
│   │   │   ├── router.py
│   │   │   └── schemas.py
│   │   │
│   │   ├── api/
│   │   │   ├── ai.py
│   │   │   ├── applications.py
│   │   │   ├── auth.py
│   │   │   ├── companies.py
│   │   │   ├── cover_letter.py
│   │   │   ├── dashboard.py
│   │   │   ├── profile.py
│   │   │   ├── recruiters.py
│   │   │   ├── tasks.py
│   │   │   └── users.py
│   │   │
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   │   ├── ai_service.py
│   │   │   ├── application_service.py
│   │   │   ├── auth_service.py
│   │   │   ├── company_service.py
│   │   │   └── cv_parser.py
│   │   │
│   │   ├── dependencies.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── features/
│   │   │   ├── ai/
│   │   │   ├── applications/
│   │   │   ├── auth/
│   │   │   ├── companies/
│   │   │   ├── recruiters/
│   │   │   ├── settings/
│   │   │   └── tasks/
│   │   │
│   │   └── shared/
│   │       ├── components/
│   │       └── services/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│
├── README.md
└── LICENSE
```

---

# 🔌 API Overview

CareerWise exposes versioned REST APIs.

## Applications

```text
GET    /api/v1/applications
POST   /api/v1/applications
GET    /api/v1/applications/{id}
PUT    /api/v1/applications/{id}
DELETE /api/v1/applications/{id}
```

## Companies

```text
GET    /api/v1/companies
POST   /api/v1/companies
GET    /api/v1/companies/{id}
PUT    /api/v1/companies/{id}
DELETE /api/v1/companies/{id}
```

## Career Profile

```text
GET  /api/v1/profile
PUT  /api/v1/profile
POST /api/v1/profile/cv
```

## LangGraph AI

```text
POST /api/v1/ai/ask
```

This endpoint sends the user request through the LangGraph workflow.

## AI Service

```text
POST /api/v1/ai/chat
POST /api/v1/ai/analyze
POST /api/v1/ai/analyze/{application_id}
```

## Cover Letter Generation

```text
POST /api/v1/ai/cover-letter/{application_id}
```

FastAPI interactive documentation is available locally at:

```text
http://localhost:8000/docs
```

---

# ⚙️ Development Setup

CareerWise is designed around a cloud-first development workflow using GitHub Codespaces, but it can also be run locally.

## 1. Clone the repository

```bash
git clone https://github.com/wtraquinas/careerwise-ai.git
cd careerwise-ai
```

## 2. Backend setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt
```

On Windows:

```bash
.venv\Scripts\activate
```

## 3. Environment variables

Create a `backend/.env` file.

Example:

```env
DATABASE_URL=postgresql://...

SECRET_KEY=your-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

OPENAI_API_KEY=your-openai-api-key
```

Never commit `.env` files or secrets.

## 4. Run database migrations

If Alembic migrations are configured:

```bash
alembic upgrade head
```

## 5. Start the backend

From the `backend/` directory:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API should be available at:

```text
http://localhost:8000
```

## 6. Start the frontend

From the `frontend/` directory:

```bash
npm install

npm run dev
```

The frontend uses an environment variable for the backend API.

Example:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

# 🧪 Example AI Requests

## Career Strategy

```text
What should I focus on in my job search?
```

## Application Advice

```text
Which applications should I follow up on?
```

## Interview Preparation

```text
How should I prepare for my upcoming interview?
```

## Application Analysis

Use the AI analysis action directly from an application.

The AI returns:

* Priority
* Summary
* Reason
* Next steps
* Interview preparation
* Follow-up recommendations

## Cover Letter

Select an application and generate a personalized cover letter based on the application and the user's career information.

---

# 🎯 Design Decisions

## Cloud-First Development

CareerWise is primarily developed using GitHub Codespaces and Dev Containers.

This reduces local environment complexity and keeps the development environment reproducible.

---

## Docker-Last Approach

The project prioritizes product development and AI functionality before introducing additional containerization complexity.

Docker remains a potential production or deployment enhancement.

---

## Modular Architecture

The application separates:

* Frontend
* API layer
* Services
* Database models
* AI services
* LangGraph workflow
* Specialized agents

This makes it easier to extend individual parts of the application.

---

## Data-Aware AI

CareerWise is designed so AI features can use actual user data.

Depending on the feature, this can include:

* Applications
* Companies
* CV content
* Skills
* Projects
* Experience
* Education
* Target roles

The goal is to move beyond generic AI responses toward personalized career recommendations.

---

## Specialized Agents

Different career problems require different reasoning strategies.

The LangGraph architecture provides a foundation for routing requests to specialized agents rather than using one large generic prompt for every task.

---

# 🗺️ Future Improvements

The current MVP provides a strong foundation. The next improvements can build on the existing CRM, AI services, and LangGraph architecture.

## 📄 Job Description Support

Add a job description field to applications.

This would allow CareerWise to compare:

```text
Job Description
        ↕
User CV
        ↕
Career Profile
```

Potential capabilities:

* Job match scoring
* Matching skills
* Missing skills
* Experience alignment
* Personalized skill-gap analysis
* More accurate cover letters
* Better interview preparation

---

## 🎯 Application Match Score

Generate an AI-assisted match score based on:

* Skills
* Experience
* Education
* Projects
* Target roles
* Job requirements

Example:

```text
Overall Match: 82%

Strong Matches
✓ SQL
✓ REST APIs
✓ Application Support
✓ Cloud Infrastructure

Potential Gaps
• Python automation
• CI/CD
• Testing frameworks
```

---

## 🧠 More LangGraph Agents

Potential agents include:

### Resume Agent

Analyze and improve CV content.

### Job Match Agent

Compare the user's profile against a job description.

### Skills Gap Agent

Identify missing skills and recommend learning priorities.

### Career Planner Agent

Generate structured weekly or monthly career plans.

### Portfolio Agent

Recommend projects based on target roles and missing skills.

---

## 💾 Persist AI Results

Store generated AI content such as:

* Cover letters
* Application analyses
* Interview preparation plans
* Career strategies

This would allow users to revisit previous AI outputs.

---

## 📅 Career Planning

Potential features:

* Weekly career plans
* Recommended tasks
* Follow-up reminders
* Interview preparation schedules
* Application goals

---

## 📊 Career Analytics

Expand the dashboard with:

* Applications by status
* Interview conversion rate
* Application response rate
* Time spent in each pipeline stage
* Weekly application activity
* Target role distribution

---

## 🔍 RAG and Document Intelligence

Future versions could introduce Retrieval-Augmented Generation for career documents.

Possible sources:

* Multiple CV versions
* Job descriptions
* Cover letters
* Interview notes
* Company research
* Career documents

This could provide more advanced document-aware AI workflows.

---

## 🧪 AI Evaluation

A future Evaluation Agent could evaluate AI outputs using:

* LLM-as-a-Judge
* Structured evaluation criteria
* Relevance scoring
* Groundedness checks
* Personalization scoring
* Agent execution traces

This would strengthen the AI Engineering and evaluation aspects of the project.

---

# 🎓 AI Engineering Goals

CareerWise AI is designed to demonstrate practical AI Engineering skills.

The project covers or is intended to cover:

* LLM application development
* Structured data + LLM integration
* Personalized AI systems
* Agentic workflows
* LangGraph orchestration
* Multi-agent architectures
* Prompt engineering
* Structured AI output
* AI evaluation
* LLM-as-a-Judge
* Retrieval-Augmented Generation
* REST API development
* Database-backed AI applications
* Modern React development
* Cloud-first development
* Production deployment

---

# 📌 Current Milestone

CareerWise AI has successfully progressed through several important stages:

```text
Career CRM
    ↓
User Authentication
    ↓
Application & Company Management
    ↓
AI Career Coach
    ↓
CV Upload & Career Profile
    ↓
Personalized Career Strategy
    ↓
LangGraph Multi-Agent Workflow
    ↓
AI Application Analysis
    ↓
Personalized Cover Letter Generation
```

The next major evolution of the project is to add **job descriptions and intelligent profile-to-job matching**, allowing CareerWise to provide deeper insights into how well a user's background matches a specific opportunity.

<br>
---

# 👤 Author

**Antonio Traquinas**

GitHub: https://github.com/wtraquinas

CareerWise AI was developed as a portfolio-focused AI Engineering project.

> **CareerWise AI — turning a job search into a smarter, more personalized career workflow.**

---

## License

This project is licensed under the MIT License.
