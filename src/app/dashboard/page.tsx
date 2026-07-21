import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Inbox } from "lucide-react";

import { DataEmptyState } from "@/components/data-empty-state";
import { Button } from "@/components/ui/button";
import { KpiCards } from "@/features/response/components/kpi-cards";
import { RegionsTable } from "@/features/response/components/regions-table";
import { computeOverviewKpis } from "@/features/response/kpis";
import { getRegionsOverview } from "@/server/regions";

// Near-real-time: render on every request so the dashboard always reflects the
// latest telemetry rather than a value cached at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Response — Live Monitoring",
  description:
    "Real-time heat-wave monitoring: KPIs, current heat index per region, and active early-warning alerts.",
};

export default async function DashboardPage() {
  const regions = await getRegionsOverview();
  const kpis = computeOverviewKpis(regions);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 w-fit text-muted-foreground"
        >
          <Link href="/">
            <ArrowLeft className="size-4" aria-hidden />
            Back to home
          </Link>
        </Button>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Response
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Live Monitoring
          </h1>
          <p className="text-muted-foreground">
            Current heat-wave risk and early-warning alerts across the focus states.
          </p>
        </div>
      </div>

      {regions.length === 0 ? (
        <DataEmptyState
          className="mt-8"
          icon={<Inbox className="size-8" />}
          title="No regions to monitor yet"
          description="The database has no regions. Run `npm run db:seed` to populate regions, readings, and alerts."
        />
      ) : (
        <>
          <section aria-label="Key indicators" className="mt-6">
            <KpiCards kpis={kpis} />
          </section>
          <section aria-labelledby="regions-heading" className="mt-8">
            <h2 id="regions-heading" className="mb-3 text-lg font-semibold">
              Monitored regions
            </h2>
            <RegionsTable regions={regions} />
          </section>
        </>
      )}
    </main>
  );
}
