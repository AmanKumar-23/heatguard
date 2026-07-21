# HeatGuard — Heat Wave Disaster Management & Early Warning System

> Persistent source of truth for the HeatGuard project. Read this before starting any task.

---

## 1. Product Overview

**HeatGuard** is a production-quality web platform that helps **district administrators,
disaster-management teams, and researchers** respond to and prepare for heat-wave events
across India. It enables users to:

- Monitor real-time heat-wave risk across districts.
- Issue and track early-warning alerts using IMD-style severity levels.
- Assess vulnerable populations via a composite vulnerability index.
- Track post-event recovery through measurable indicators.
- Analyse long-term trends and run forward-looking scenarios.
- Generate shareable reports for decision-makers.

**Focus states (v1):** Telangana, Andhra Pradesh, Odisha, Rajasthan, Maharashtra, Delhi.

---

## 2. Core Modules

The application is organised around the project's **four pillars**. Each pillar maps 1:1 to
a core module.

| Pillar | Module | Scope |
| --- | --- | --- |
| **Response** | Real-time monitoring & alerts | Live monitoring dashboard, telemetry ingestion, early-warning alerts using IMD-style levels (Normal / Yellow / Orange / Red). |
| **Recovery** | Recovery indicators tracking | Hospital admissions, workdays lost, crop losses, electricity failures, water scarcity — tracked over time per district. |
| **Future Challenges** | Trend analysis & scenario view | Historical trend analysis and scenario modelling for urban heat islands and water stress. |
| **Role of Technology** | GIS & AI intelligence | GIS hotspot mapping, remote-sensing-style overlay layers, AI-driven heat & health-risk prediction. |

---

## 3. Tech Stack

**Web application**
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **Data layer:** Prisma ORM + SQLite (development)
- **Mapping:** MapLibre GL JS
- **Charts:** Recharts

**Prediction microservice** (separate process)
- **API:** FastAPI (Python)
- **ML:** scikit-learn

**Testing**
- **Unit / integration:** Vitest
- **End-to-end:** Playwright

---

## 4. Architecture Principles

- **Feature-based folder structure.** Group by domain feature, not by file type.
- **Typed end-to-end.** No `any`. Types flow from the database schema through to the UI.
- **Server-first data fetching.** Use React Server Components for data access; introduce
  Client Components only where interactivity genuinely requires them.
- **Pure, testable domain logic.** All heat-index and risk calculations live in pure utility
  functions with dedicated unit tests — no side effects, no framework coupling.
- **Environment-agnostic.** The app runs fully **offline with seeded data**; external
  services (including the prediction microservice) are optional and degrade gracefully.

---

## 5. Domain Glossary

| Term | Definition |
| --- | --- |
| **Heat index** | Perceived temperature combining air temperature and relative humidity ("feels like"). |
| **Heat-wave alert levels** | IMD-style severity tiers: **Normal**, **Yellow** (watch), **Orange** (warning), **Red** (emergency). |
| **Urban Heat Island (UHI)** | Localised warming where built-up urban areas are significantly hotter than surrounding rural land. |
| **Vulnerability index** | Composite score of a population's susceptibility to heat harm (e.g. age, health, occupation, access to cooling). |
| **Recovery indicator** | A measurable signal of post-event impact and recuperation (hospital admissions, workdays lost, crop losses, electricity failures, water scarcity). |
| **Telemetry reading** | A single timestamped sensor/station observation (e.g. temperature, humidity) for a location. |

---

## 6. Coding Standards

- **Strict TypeScript.** `strict: true`; no `any`; exhaustive handling of union types.
- **Linting & formatting.** ESLint + Prettier enforced; CI fails on violations.
- **Commits.** Meaningful, scoped commit messages describing intent.
- **Accessibility.** Target **WCAG AA** — semantic markup, keyboard navigation, sufficient
  contrast, ARIA where needed.
- **Responsive.** Layouts work down to **360px** width.
- **Documentation.** Every non-trivial function has a doc comment explaining purpose,
  inputs, and outputs.
- **Error handling.** Errors are handled explicitly — no silent failures, no swallowed
  exceptions.

---

## 7. Working Agreement

How to behave on **every** task in this repository:

- **Plan before coding.** For any multi-file change, list the files you will create or
  modify before writing code.
- **Small, reviewable changes.** Prefer focused diffs. Briefly explain key decisions and
  trade-offs.
- **Test what you build.** Write or update tests for any logic you add, especially domain
  calculations.
- **Never leave the build broken.** Every change must leave the project in a compiling,
  passing state.
