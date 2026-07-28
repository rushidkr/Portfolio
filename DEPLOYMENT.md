# Deployment Guide — Hosting This for Free

Recommended stack (as of mid-2026):

| Piece | Service | Why |
|---|---|---|
| Database | **Neon** | Serverless Postgres, permanent free tier, scales to zero when idle |
| Backend (Spring Boot) | **Render** | Free web service, deploys straight from a Dockerfile |
| Frontend (React) | **Vercel** or **Netlify** | Permanent free static hosting, auto-deploys on git push |

One important thing to know up front: **don't use Render's own free
PostgreSQL** for this. Render auto-deletes free databases (and all their
data) 30 days after creation. Neon's free tier has no such expiry, which is
why the database and the backend live on two different services below.

You'll also notice the free backend "sleeps" after 15 minutes of no
traffic and takes ~30-60 seconds to wake back up on the next request. For a
portfolio that recruiters check occasionally, that's a fine trade-off for
$0/month — there's an optional step at the end to keep it awake if you'd
rather avoid the cold start.

---

## 1. Push your code to GitHub

Render, Vercel, and Netlify all deploy from a GitHub repo.

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
```

Create a new repo on GitHub, then:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

You can keep `backend/` and `frontend/` in one repo (as they are now) —
Render and Vercel both let you point a deploy at a subdirectory.

---

## 2. Create your free database on Neon

1. Go to **neon.tech** and sign up (GitHub login works, no card required).
2. Create a new project. Neon gives you a connection string immediately,
   something like:
   ```
   postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
   ```
3. From that string, note the four parts you'll need next:
   - Host + database name → for `SPRING_DATASOURCE_URL`
   - Username → `SPRING_DATASOURCE_USERNAME`
   - Password → `SPRING_DATASOURCE_PASSWORD`

   Reformat the URL for Spring's JDBC driver:
   ```
   jdbc:postgresql://<host>/<dbname>?sslmode=require
   ```

Keep this tab open — you'll paste these into Render in the next step.

---

## 3. Deploy the backend to Render

1. Go to **render.com**, sign up, and click **New → Web Service**.
2. Connect your GitHub repo.
3. Set:
   - **Root directory**: `backend`
   - **Environment**: `Docker` (Render will detect the `Dockerfile`)
   - **Instance type**: `Free`
4. Add these environment variables (Render's dashboard has an "Environment"
   tab):

   | Key | Value |
   |---|---|
   | `SPRING_PROFILES_ACTIVE` | `prod` |
   | `SPRING_DATASOURCE_URL` | `jdbc:postgresql://<host>/<dbname>?sslmode=require` |
   | `SPRING_DATASOURCE_USERNAME` | from Neon |
   | `SPRING_DATASOURCE_PASSWORD` | from Neon |
   | `FRONTEND_ORIGINS` | your future Vercel URL, e.g. `https://rushi-portfolio.vercel.app` (you can update this after step 4) |
   | `ADMIN_API_KEY` | any long random string (optional — lets you view contact messages) |

5. Click **Create Web Service**. First build takes a few minutes (it's
   compiling your Java code inside the Dockerfile).
6. Once live, note your backend URL, e.g.
   `https://portfolio-backend-xxxx.onrender.com`.
7. Test it: visit `https://<your-backend>.onrender.com/api/projects` — you
   should see your seeded projects as JSON.

---

## 4. Deploy the frontend to Vercel

1. Go to **vercel.com**, sign up, click **Add New → Project**, import the
   same GitHub repo.
2. Set:
   - **Root directory**: `frontend`
   - **Framework preset**: Vite (should auto-detect)
3. Add an environment variable:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | your Render backend URL from step 3.6, no trailing slash |

4. Click **Deploy**. You'll get a URL like
   `https://rushi-portfolio.vercel.app`.

### Netlify instead of Vercel?

Same idea: root directory `frontend`, build command `npm run build`,
publish directory `dist`, and set `VITE_API_URL` under **Site settings →
Environment variables**.

---

## 5. Connect the two

Go back to Render and update `FRONTEND_ORIGINS` to your real Vercel/Netlify
URL (comma-separate if you have more than one, e.g. a custom domain too).
Render will redeploy automatically when you save an env var change.

Reload your live frontend — the Projects and Skills sections should now be
pulling from your live backend, and the contact form should save messages
into your Neon database.

---

## 6. (Optional) Keep the backend from sleeping

Free services on Render spin down after 15 minutes idle. If you want the
first visitor of the day to not wait ~30-60s for a cold start, set up a free
uptime monitor (e.g. **UptimeRobot**) to ping
`https://<your-backend>.onrender.com/api/projects` every 5 minutes. This is
optional and purely a UX nicety — it doesn't affect whether the site works.

---

## Checking things work end to end

```bash
# Backend health
curl https://<your-backend>.onrender.com/api/projects

# View contact submissions (only if you set ADMIN_API_KEY)
curl -H "X-Admin-Key: <your ADMIN_API_KEY>" https://<your-backend>.onrender.com/api/contact
```

## Total monthly cost

$0, with the trade-offs above (cold starts on the backend, Neon's storage
and compute caps on the free tier). If this ever needs to be always-on for
real users, the cheapest paid step up is a ~$4-7/month Render or Railway
instance — but for a portfolio, free is the right call.
