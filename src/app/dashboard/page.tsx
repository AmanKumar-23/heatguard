import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  HeartPulse,
  Map,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of HeatGuard's four modules: Response, Recovery, Future Challenges, and the Role of Technology.",
};

/** The four project pillars, each mapping 1:1 to a core module. */
const MODULES = [
  {
    pillar: "Response",
    title: "Real-time monitoring & alerts",
    description:
      "Live monitoring dashboard, telemetry ingestion, and IMD-style early-warning alerts (Normal / Yellow / Orange / Red).",
    icon: Activity,
  },
  {
    pillar: "Recovery",
    title: "Recovery indicators tracking",
    description:
      "Hospital admissions, workdays lost, crop losses, electricity failures, and water scarcity tracked over time per district.",
    icon: HeartPulse,
  },
  {
    pillar: "Future Challenges",
    title: "Trend analysis & scenario view",
    description:
      "Historical trend analysis and scenario modelling for urban heat islands and water stress.",
    icon: TrendingUp,
  },
  {
    pillar: "Role of Technology",
    title: "GIS & AI intelligence",
    description:
      "GIS hotspot mapping, remote-sensing-style overlays, and AI-driven heat & health-risk prediction.",
    icon: Map,
  },
] as const;

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8">
      <div className="flex flex-col gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit -ml-2 text-muted-foreground"
        >
          <Link href="/">
            <ArrowLeft className="size-4" aria-hidden />
            Back to home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          HeatGuard is organised around four modules. Each is delivered in an
          upcoming milestone.
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MODULES.map((module) => {
          const Icon = module.icon;
          return (
            <li
              key={module.pillar}
              className="rounded-xl border border-border bg-card p-5 text-card-foreground"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground"
                  aria-hidden
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {module.pillar}
                  </p>
                  <h2 className="font-semibold">{module.title}</h2>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {module.description}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
