# CareerWise AI 🚀

> **An AI-powered Career Operating System for managing the job search and making better career decisions.**

CareerWise AI combines a **Career CRM** with an **AI Career Coach**. It helps users manage companies and job applications, track their career pipeline, and get personalized recommendations based on the data stored in CareerWise.

The project is being developed as a portfolio-ready AI Engineering application, with a focus on practical AI integration, modern backend/frontend architecture, and a path toward agentic workflows.

---

## 🚀 Live Demo

<br>

<!-- comment -->
<!-- 
<center>
<img src="./images/UN AI Situation Room - Screenshot 20260809.jpg"></img>
</center>
-->

| Service | URL |
|---|---|
| Frontend | https://careerwise-ai.vercel.app/ |
| Backend API | https://careerwise-api-8x1i.onrender.com |
| Health check | https://careerwise-api-8x1i.onrender.com/health |



<br>



---

## ✨ Current Status

🚧 **Active development**

The current MVP includes:

- Career dashboard
- Company management
- Job application management
- Create / edit / delete operations
- Application search and filtering
- Company lookup for applications
- AI Career Coach chat interface
- OpenAI integration
- AI Coach awareness of CareerWise application data
- Markdown-formatted AI responses
- Responsive chat-style UI
- FastAPI backend
- React frontend
- PostgreSQL database
- GitHub Codespaces development environment

The AI Coach is already capable of answering questions using the user's actual CareerWise applications.

For example:

> "Which of my applications should I follow up on first and why?"

The coach can inspect application status, company, position, application date, salary and notes before producing a recommendation.

---

# 🎯 Project Vision

CareerWise AI is designed to become a **personal Career Operating System**, rather than simply another job application tracker.

A typical job search requires users to:

- Track applications
- Research companies
- Follow up with recruiters
- Prepare for interviews
- Improve their CV
- Identify skill gaps
- Plan their career
- Decide which opportunities deserve attention

CareerWise brings these activities together and adds an AI layer that can reason over the user's career data.

---

# 🧩 Core Features

## Career CRM

The CRM provides the foundation for managing a job search.

### Companies

Users can:

- Add companies
- Edit companies
- Delete companies
- Search companies
- Store website, industry and location

### Applications

Users can:

- Add applications
- Edit applications
- Delete applications
- Search applications
- Track application status
- Associate applications with companies
- Store salary information
- Store application dates
- Store job URLs
- Store notes

Application statuses currently include:

- Applied
- Interview
- Assessment
- Offer
- Accepted
- Rejected

---

# 🤖 AI Career Coach

The AI Career Coach is the main AI feature of CareerWise.

Users can ask questions about:

- Their current applications
- Follow-up priorities
- Interview preparation
- Career strategy
- CV improvement
- LinkedIn
- Salary negotiation
- Job searching
- Skills development

### Career-Aware AI

The AI Coach is not limited to generic LLM responses.

Before generating an answer, the backend builds a career context from the user's CareerWise application data.

Conceptually:

```text
User Question
      │
      ▼
React AI Coach
      │
      ▼
FastAPI /api/v1/ai/chat
      │
      ▼
AI Service
      │
      ├── Query Applications
      │
      ├── Query Companies
      │
      └── Build Career Context
              │
              ▼
        OpenAI GPT-5-mini
              │
              ▼
       Career-aware Answer
```

The AI is instructed not to invent career information and to use the stored CareerWise data when answering questions about the user's applications.

---

# 🏗️ Architecture

The current architecture is intentionally simple so that the core product can be developed quickly and expanded incrementally.

```text
                  React Frontend
                       │
                       │ Axios / HTTP
                       ▼
                FastAPI Backend
                       │
          ┌────────────┴────────────┐
          │                         │
       REST API                AI Service
          │                         │
          ▼                         ▼
     SQLAlchemy                 OpenAI API
          │
          ▼
     PostgreSQL
```

The planned architecture expands this into an agentic workflow:

```text
                       React Frontend
                              │
                              ▼
                       FastAPI Backend
                              │
                              ▼
                       AI Orchestrator
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         Career Coach     Job Analysis    Interview Coach
              │               │               │
              └───────────────┼───────────────┘
                              │
                              ▼
                     Shared Career Data
                              │
                              ▼
                         PostgreSQL
```

---

# 🛠️ Technology Stack

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

## Frontend

- React
- Vite
- Material UI
- React Query
- Axios
- React Markdown

## Database

- PostgreSQL
- SQLAlchemy ORM

## AI

- OpenAI API
- GPT-5-mini
- AI-aware career context

## Development

- GitHub
- GitHub Codespaces
- Python virtual environment
- Node.js / npm

## Planned AI Architecture

- LangGraph
- Specialized AI agents
- Shared workflow state
- Evaluation Agent / LLM-as-a-Judge
- RAG / document intelligence

---

# 📁 Project Structure

The repository is organized into separate frontend and backend applications.

```text
careerwise-ai/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── dependencies.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── applications/
│   │   │   ├── companies/
│   │   │   └── ai/
│   │   │
│   │   ├── shared/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# 🔌 API

The backend exposes versioned REST endpoints.

Current examples:

```text
GET    /api/v1/applications
POST   /api/v1/applications
GET    /api/v1/applications/{id}
PUT    /api/v1/applications/{id}
DELETE /api/v1/applications/{id}

GET    /api/v1/companies
POST   /api/v1/companies
GET    /api/v1/companies/{id}
PUT    /api/v1/companies/{id}
DELETE /api/v1/companies/{id}

POST   /api/v1/ai/chat
```

FastAPI also provides interactive API documentation during development:

```text
http://localhost:8000/docs
```

---

# ⚙️ Development Setup

CareerWise is currently developed primarily through **GitHub Codespaces**.

This keeps the development environment cloud-based and avoids requiring a complex local setup.

## 1. Clone the repository

```bash
git clone <repository-url>
cd careerwise-ai
```

## 2. Backend

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

Create a backend `.env` file with the required configuration.

Example:

```env
DATABASE_URL=postgresql://...
OPENAI_API_KEY=...
```

Do **not** commit `.env` files or API keys to Git.

## 4. Start the backend

From `backend/`:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 5. Start the frontend

From `frontend/`:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

The frontend will normally be available through the Vite development server.

---

# 🧪 Testing the AI Coach

The AI endpoint can be tested directly from the backend.

Example:

```bash
curl -X POST http://localhost:8000/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Which of my applications should I follow up on first and why?"}'
```

Example questions:

```text
What applications do I currently have?

Which of my applications should I follow up on first and why?

Give me a career strategy based on my current applications.

I have an interview for my Machine Learning Engineer application. How should I prepare?

Which applications are currently active?

What should I focus on this week?
```

---

# 🗺️ Roadmap

## Phase 1 — Career CRM

- [x] Project foundation
- [x] FastAPI backend
- [x] React frontend
- [x] PostgreSQL integration
- [x] Company CRUD
- [x] Application CRUD
- [x] Dashboard foundation
- [x] Application search
- [x] Company/application relationship

## Phase 2 — AI Foundation

- [x] OpenAI integration
- [x] AI Coach UI
- [x] Chat interface
- [x] Markdown responses
- [x] Career-aware application context
- [x] Application prioritization through AI
- [ ] Structured AI career analysis
- [ ] AI-generated dashboard insights

## Phase 3 — Intelligent Career Assistant

- [ ] Career analytics
- [ ] Follow-up recommendations
- [ ] Task recommendations
- [ ] Interview preparation based on applications
- [ ] Conversational memory
- [ ] Career history analysis
- [ ] AI-generated weekly career plan

## Phase 4 — Agentic AI

- [ ] LangGraph integration
- [ ] Planner agent
- [ ] Career Coach agent
- [ ] Job Analysis agent
- [ ] Resume agent
- [ ] Interview Coach agent
- [ ] Conditional agent routing
- [ ] Shared workflow state

## Phase 5 — Evaluation & Production

- [ ] Evaluation Agent
- [ ] LLM-as-a-Judge
- [ ] Confidence scoring
- [ ] Agent execution traces
- [ ] Analytics
- [ ] Production deployment
- [ ] Demo dataset
- [ ] Portfolio documentation

---

# 🔮 Future Enhancements

Potential future integrations include:

- Resume upload and analysis
- Job description analysis
- Resume-to-job matching
- Skills-gap analysis
- Interview preparation
- Recruiter management
- Calendar integration
- Email integration
- LinkedIn job import
- Automated follow-up reminders
- Weekly AI career reports
- Multi-user support
- Browser extension
- Recruiter portal

---

# 🎓 AI Engineering Goals

CareerWise AI is intended to demonstrate practical AI Engineering capabilities rather than simply demonstrate an LLM API call.

The project aims to cover:

- LLM application development
- Structured data + LLM integration
- Agentic AI workflows
- LangGraph orchestration
- Retrieval-Augmented Generation
- Prompt engineering
- AI evaluation
- LLM-as-a-Judge
- REST API development
- Database-backed AI applications
- Modern React applications
- Cloud-based development
- Production deployment

---

# 🧠 Design Principles

### Cloud-first development

Development is primarily performed through GitHub Codespaces to minimize local environment complexity.

### AI second, infrastructure first only where necessary

The project prioritizes proving useful AI workflows early rather than spending excessive time building infrastructure before the product is functional.

### Modular architecture

Frontend, API, database, and AI services are kept separated so that individual components can evolve independently.

### Data-aware AI

When the AI is asked questions about the user's career, it should use structured CareerWise data rather than relying solely on general model knowledge.

### Explainable recommendations

Future AI features should provide reasons behind recommendations, particularly for application prioritization and career decisions.

---

# 📌 Project Status

CareerWise AI is currently in active MVP development.

The application has progressed from a basic Career CRM into an AI-aware Career Operating System. The current milestone is the **AI Career Coach**, which can access real application and company data and generate personalized career recommendations.

The next major milestone is to turn those recommendations into **structured AI Career Insights** that can be surfaced directly in the dashboard.

---

## Author
Antonio Traquinas - https://github.com/wtraquinas

Built as an AI Engineering Bootcamp (portfolio) Final Project.

**CareerWise AI — turning a job search into a smarter career workflow.**
