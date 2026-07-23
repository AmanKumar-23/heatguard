# HeatGuard

**Heat Wave Disaster Management & Early Warning System for India.**

HeatGuard helps district administrators, disaster-management teams, and
researchers **monitor** heat-wave risk, **issue early warnings**, **assess
vulnerable populations**, **track recovery**, and **generate reports** — with an
optional AI forecasting service.

> **Focus states (v1):** Telangana · Andhra Pradesh · Odisha · Rajasthan ·
> Maharashtra · Delhi.

The app is **environment-agnostic**: it runs fully offline on seeded data. The
prediction microservice and server-side PDF export are optional enhancements
that **degrade gracefully** when unavailable.

See [`CLAUDE.md`](./CLAUDE.md) for the full product spec, domain glossary, and
engineering standards — the source of truth for this project.

---

## How each pillar maps to a module

HeatGuard is organised around four pillars, each mapping 1:1 to a core module.

| Pillar | Module | Route | What it does |
| --- | --- | --- | --- |
| **Response** | Real-time monitoring & alerts | `/dashboard`, `/map`, `/alerts` | Live monitoring, GIS hotspot map, and IMD-style early-warning alerts (Normal / Yellow / Orange / Red). |
| **Recovery** | Recovery indicators tracking | `/recovery` | Hospital admissions, workdays lost, crop losses, electricity failures, water scarcity — tracked per district over time. |
| **Future Challenges** | Trend analysis & scenarios | `/analytics` | Historical trends and cross-region comparison for urban heat islands and water stress. |
| **Role of Technology** | GIS & AI intelligence | `/map`, `/vulnerability`, `/reports` | GIS overlays, composite vulnerability index, AI heat & health-risk prediction, and auto-generated reports. |

Supporting modules: **Vulnerability** (`/vulnerability`), **Field Survey**
(`/survey`), and **Reports** (`/reports`, with server-side PDF export).

---

## Architecture

Two independent processes. The web app is the system of record; the ML service
is a stateless, optional consumer of the same seeded database.

```text
                    ┌───────────────────────────────────────────────┐
   Browser  ─────▶  │  Next.js app (App Router, RSC)                 │
   (HTTP)           │                                               │
                    │  src/app/(console)/*   server components ──┐   │
                    │  src/app/api/*         REST (zod-validated)│   │
                    │        │                                   ▼   │
                    │        │            src/server/*  (data access,│
                    │        │            Prisma queries, ML client) │
                    │        ▼                     │                  │
                    │  src/lib/heat/*  pure, unit-tested domain logic │
                    │  (heat index, alert levels, vulnerability, …)   │
                    └───────────────┬───────────────────┬────────────┘
                                    │                   │
                             Prisma │                   │ HTTP (optional,
                                    ▼                   │  1.5s timeout,
                            ┌───────────────┐           │  null on failure)
                            │  SQLite       │◀──────────┼───────────────┐
                            │  prisma/dev.db│  read-only│               │
                            └───────────────┘           ▼               │
                                    ▲          ┌──────────────────────┐ │
                                    └──────────│  ml-service (FastAPI)│ │
                                    reads      │  scikit-learn Ridge  │─┘
                                    history    │  /predict, /health   │
                                               └──────────────────────┘
```

**Principles** (see `CLAUDE.md` §4): feature-based folders, typed end-to-end (no
`any`), server-first data fetching, pure/testable domain logic, and graceful
degradation of every external dependency.

Data flow: server components call `src/server/*` directly; client components use
the typed `src/lib/api-client.ts` against `src/app/api/*`; all heat/risk math is
in pure functions under `src/lib/heat/*`.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, TypeScript strict)
- **Styling:** Tailwind CSS v4 + shadcn/ui (neutral base)
- **Data:** Prisma ORM + SQLite (development)
- **Mapping:** MapLibre GL JS · **Charts:** Recharts
- **PDF export:** headless Chrome via `puppeteer-core` (optional)
- **Prediction service:** FastAPI + scikit-learn (separate, optional)
- **Testing:** Vitest (unit + API integration) · Playwright + axe-core (e2e & a11y)

---

## Prerequisites

- **Node.js** `>= 22.13` (a `.nvmrc` pins the version — run `nvm use`) and **npm** `>= 10`
- **Python** `>= 3.11` (only for the prediction service)
- **Git**. No database server needed — SQLite is file-based and seeded locally.

---

## Setup — web app

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env

# 3. Generate the Prisma client and create + seed the local database
npm run db:generate
npm run db:migrate     # creates prisma/dev.db from the migrations
npm run db:seed        # loads deterministic sample data
```

Run it:

```bash
npm run dev            # dev server at http://localhost:3000
# or a production build:
npm run build
npm run start
```

## Setup — prediction service (optional)

```bash
cd ml-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# trains on startup from ../prisma/dev.db if no model is persisted
uvicorn main:app --port 8000
```

The app auto-detects the service at `ML_SERVICE_URL` (default
`http://localhost:8000`) and hides forecast features when it is offline. See
[`ml-service/README.md`](./ml-service/README.md) for model details.

---

## Environment variables

| Variable | Used by | Default | Purpose |
| --- | --- | --- | --- |
| `DATABASE_URL` | web | `file:./dev.db` | Prisma SQLite datasource. Relative `file:` paths resolve under `prisma/`. |
| `ML_SERVICE_URL` | web | `http://localhost:8000` | Base URL of the prediction service. Unset/offline → forecasts degrade gracefully. |
| `NEXT_PUBLIC_SITE_URL` | web | `http://localhost:3000` | Canonical site URL (used for metadata / absolute URLs). |
| `PUPPETEER_EXECUTABLE_PATH` / `CHROME_PATH` | web | _(auto-detected)_ | Chrome/Chromium path for server-side PDF export. If none is found, the report offers a browser print fallback. |
| `HEATGUARD_DB` | ml-service | `../prisma/dev.db` | Path to the app's SQLite database to train from. |

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Lint with ESLint (Next.js + Prettier rules). |
| `npm run format` | Format the codebase with Prettier. |
| `npm run test` | Run unit + API integration tests (Vitest). |
| `npm run test:e2e` | Run the Playwright smoke + accessibility test. |
| `npm run db:generate` | Generate the Prisma client. |
| `npm run db:migrate` | Create/apply a development migration. |
| `npm run db:seed` | Seed the development database. |
| `npm run db:studio` | Open Prisma Studio. |

---

## Testing

- **Unit** (`tests/lib/**`, `tests/features/**`) — every pure domain utility
  (heat index, alert levels, vulnerability, status code, at-risk, survey/report
  helpers, enums, and API schemas) has focused Vitest coverage.
- **API integration** (`tests/integration/api/**`) — exercises the real route
  handlers, the JSON envelope, zod validation, and error mapping (200/201/400/404)
  with the data layer mocked, so they are fast and DB-free.
- **End-to-end + accessibility** (`tests/e2e/smoke.spec.ts`) — Playwright walks
  Overview → Map → Analytics → Alerts → Reports via real navigation and runs an
  **axe-core** scan on each page, failing on any `serious`/`critical` violation
  (a proxy for a Lighthouse accessibility score of 95+).

```bash
npm run test                          # unit + integration
npm run build && npm run test:e2e     # e2e (builds first; uses your system Chrome)
```

> The e2e test uses your installed Google Chrome (`channel: "chrome"`) — no
> Playwright browser download required. Run `npm run db:seed` once on a fresh
> checkout so the pages have data.

---

## Run the full stack with Docker

Bring up the web app and the prediction service together, sharing a seeded
SQLite database on a named volume:

```bash
docker compose up --build
```

- Web app → <http://localhost:3000>
- Prediction service → <http://localhost:8000/health>

The `web` container seeds the shared database on first boot; `ml-service` waits
until it is healthy, then trains its models from that data. State persists in
the `heatguard-data` volume (`docker compose down -v` to reset).

> Server-side PDF export needs a Chrome binary, which is not installed in the
> slim web image — inside Docker the Reports page falls back to browser printing.
> Run the app on the host if you need in-container PDF generation.

---

## Deployment

HeatGuard is designed to split cleanly: **web app on Vercel**, **prediction
service on any container host**.

### Web app → Vercel

1. Import the repository into Vercel (framework preset: **Next.js**).
2. Set environment variables in the Vercel project:
   - `DATABASE_URL` — for a serverless deployment, point at a hosted database
     (e.g. Postgres/Turso) and update `prisma/schema.prisma`'s `provider`
     accordingly; SQLite file storage is for local/dev only.
   - `ML_SERVICE_URL` — the public URL of your deployed prediction service
     (below). Leave unset to ship without forecasts.
   - `NEXT_PUBLIC_SITE_URL` — your production URL.
3. Deploy. `postinstall` runs `prisma generate`; run migrations/seed as part of
   your database setup.

### Prediction service → container host

Build and run the `ml-service` image anywhere that runs containers (Fly.io,
Render, Railway, AWS ECS, Cloud Run, a VM, …):

```bash
docker build -t heatguard-ml ./ml-service
docker run -p 8000:8000 -e HEATGUARD_DB=/data/dev.db -v /path/to/data:/data heatguard-ml
```

The service needs read access to the app's database (mount it, or point
`HEATGUARD_DB` at a copy) to train. Expose it over HTTPS.

### Point the app at the deployed service

Set `ML_SERVICE_URL` on the web app to the service's public URL, e.g.:

```bash
ML_SERVICE_URL="https://heatguard-ml.example.com"
```

Every ML call has a short timeout and returns `null` on failure, so a
misconfigured or down service never breaks the app — forecast features simply
hide until it responds.

---

## Project structure

```text
.
├── prisma/                 # Prisma schema, migrations, deterministic seed
├── ml-service/             # FastAPI + scikit-learn prediction service
├── docker/                 # Container entrypoints
├── src/
│   ├── app/                # App Router: (console) routes, /report/print, api/*
│   ├── components/         # Reusable UI primitives (+ ui/ shadcn)
│   ├── features/           # Domain features (response, map, analytics, …)
│   ├── lib/                # Shared + pure domain logic (lib/heat, lib/report, …)
│   ├── server/             # Server-only data access (Prisma, ML client)
│   └── generated/          # Generated Prisma client (git-ignored)
├── tests/                  # Vitest (lib, integration) + Playwright (e2e)
├── Dockerfile              # Web app image
├── docker-compose.yml      # Full stack: web + ml-service
├── CONTRIBUTING.md · LICENSE · CLAUDE.md
```

### Conventions

- **Server components** for data fetching; client components only where
  interactivity is required.
- **Strict TypeScript**, ESLint + Prettier enforced in CI.
- **Accessibility** to WCAG AA (automated via axe in the e2e test); layouts
  responsive down to 360px.
- Write or update **tests** for any logic you add, especially domain math.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the contribution workflow. Licensed
under the [MIT License](./LICENSE).
