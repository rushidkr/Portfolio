# Rushi — Java Full-Stack Developer Portfolio

A portfolio site built with the same stack used across your other projects
(VeriChain, CEMS): a **Spring Boot** REST API backend and a **React (Vite +
Tailwind)** frontend. Projects and skills are served from a real database
through a real API — not hardcoded into the page — and the contact form
writes submissions into that same database.

```
portfolio/
├── backend/     Spring Boot REST API (Java 17, Maven)
├── frontend/    React + Vite + Tailwind CSS
└── DEPLOYMENT.md  Step-by-step free hosting guide
```

## Quick start (local development)

### 1. Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on `http://localhost:8080` using an in-memory H2 database — no setup
required. It auto-seeds your real projects and skills on first run (see
`src/main/java/com/rushi/portfolio/config/DataSeeder.java` — edit this file
to update your content).

Check it's alive: `curl http://localhost:8080/api/projects`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` and talks to the backend at
`http://localhost:8080` by default.

## Before you go live

1. **Edit your real details** in `frontend/src/data/profile.js` (name, email,
   GitHub, LinkedIn, resume link) — this is the only file with placeholder
   contact info.
2. **Edit your real project links** in
   `backend/src/main/java/com/rushi/portfolio/config/DataSeeder.java`
   (GitHub URLs, live demo URLs) — this only seeds data on an *empty*
   database, so do this before your first deploy.
3. Follow **`DEPLOYMENT.md`** to put it online for free.

## Why a real backend for a portfolio?

Because you're applying for backend/full-stack roles — a live, working
Spring Boot API (with validation, a seeded database, CORS config, and a
protected admin endpoint) is itself part of the portfolio. Interviewers can
hit `/api/projects` directly and see real, structured data coming back.
