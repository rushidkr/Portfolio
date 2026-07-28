# Backend — Spring Boot REST API

See the root `README.md` and `DEPLOYMENT.md` for full setup and hosting
instructions.

```bash
mvn spring-boot:run     # http://localhost:8080, in-memory H2, auto-seeded
```

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/projects` | All projects, ordered for display |
| GET | `/api/skills` | Flat list of skills |
| GET | `/api/skills/grouped` | Skills grouped by category |
| POST | `/api/contact` | Submit a contact message (validated, saved to DB) |
| GET | `/api/contact` | List submitted messages (requires `X-Admin-Key` header matching `ADMIN_API_KEY`) |
| GET | `/actuator/health` | Health check |

## Editing your content

Edit the seed data in
`src/main/java/com/rushi/portfolio/config/DataSeeder.java`. It only inserts
rows into an *empty* table, so either edit it before your first run, or
clear the relevant table if you're iterating locally with H2 (in-memory —
restarting the app clears it automatically).

## Switching from H2 to PostgreSQL locally

Set these environment variables and run with the `prod` profile:

```bash
export SPRING_PROFILES_ACTIVE=prod
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/portfolio
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=postgres
mvn spring-boot:run
```
