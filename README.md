# HeatGuard

**Heat Wave Disaster Management & Early Warning System for India.**

HeatGuard helps district administrators, disaster-management teams, and
researchers monitor heat-wave risk, issue early warnings, assess vulnerable
populations, track recovery, and generate reports.

> **Focus states (v1):** Telangana, Andhra Pradesh, Odisha, Rajasthan,
> Maharashtra, Delhi.

See [`CLAUDE.md`](./CLAUDE.md) for the full product spec, domain glossary, and
engineering standards — it is the source of truth for this project.

---

## Modules

HeatGuard is organised around four pillars, each mapping 1:1 to a core module:

| Pillar | Module | Focus |
| --- | --- | --- |
| **Response** | Real-time monitoring & alerts | Monitoring dashboard and IMD-style early-warning alerts (Normal / Yellow / Orange / Red). |
| **Recovery** | Recovery indicators tracking | Hospital admissions, workdays lost, crop losses, electricity failures, water scarcity. |
| **Future Challenges** | Trend analysis & scenario view | Urban heat islands and water-stress trends and scenarios. |
| **Role of Technology** | GIS & AI intelligence | GIS hotspot mapping, remote-sensing-style layers, AI heat & health-risk prediction. |

---

## Tech stack

- **Framework:** Next.js 16 (App Router, TypeScript, strict)
- **Styling:** Tailwind CSS v4 + shadcn/ui (neutral base color)
- **Data:** Prisma ORM + SQLite (development)
- **Mapping:** MapLibre GL JS _(added with the GIS module)_
- **Charts:** Recharts _(added with the analytics modules)_
- **Predictions:** FastAPI + scikit-learn microservice _(separate, optional)_
- **Testing:** Vitest (unit) + Playwright (e2e)

---

## Prerequisites

- **Node.js** `>= 22.13` (or `>= 20.19`) and **npm** `>= 10`
- **Git**
- No database server required — SQLite is file-based and seeded locally.

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env

# 3. Generate the Prisma client and create the local database
npm run db:generate
npm run db:migrate    # creates prisma/dev.db from the schema
npm run db:seed       # loads deterministic sample data (no-op until models exist)
```

The app is **environment-agnostic** and runs fully offline with seeded data;
external services (including the prediction microservice) are optional and
degrade gracefully.

---

## Run

```bash
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

The default route renders the branded HeatGuard landing shell with an
**Enter Dashboard** action.

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Lint with ESLint (Next.js + Prettier rules). |
| `npm run format` | Format the codebase with Prettier. |
| `npm run test` | Run unit tests with Vitest. |
| `npm run db:generate` | Generate the Prisma client. |
| `npm run db:migrate` | Create/apply a development migration. |
| `npm run db:seed` | Seed the development database. |
| `npm run db:studio` | Open Prisma Studio. |

---

## Architecture

Feature-based structure, typed end-to-end (no `any`), server-first data
fetching. All heat-index / risk logic lives in pure, unit-tested utilities.

```text
.
├── prisma/                 # Prisma schema, migrations, seed
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router (routes, layouts)
│   │   └── dashboard/      # Dashboard route
│   ├── components/
│   │   └── ui/             # shadcn/ui primitives (Button, …)
│   ├── features/           # Domain features (response, recovery, …)
│   ├── lib/                # Shared utilities (cn, domain helpers)
│   ├── server/             # Server-only code (db client, data access)
│   └── generated/          # Generated Prisma client (git-ignored)
├── tests/                  # Vitest unit/integration tests
├── CLAUDE.md               # Project source of truth
└── components.json         # shadcn/ui configuration
```

### Conventions

- **Server components** for data fetching; client components only where
  interactivity is required.
- **Strict TypeScript**, ESLint + Prettier enforced.
- **Accessibility** to WCAG AA; layouts responsive down to 360px.
- Write or update **tests** for any logic you add.
