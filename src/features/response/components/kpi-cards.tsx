import { Flame, MapPin, TriangleAlert, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { OverviewKpis } from "@/features/response/kpis";
import { formatNumber } from "@/lib/format";

/** The four Response KPI cards, derived from {@link OverviewKpis}. */
export function KpiCards({ kpis }: { kpis: OverviewKpis }) {
  const items = [
    {
      label: "Regions monitored",
      value: formatNumber(kpis.regionsMonitored),
      sub: "across 6 focus states",
      icon: MapPin,
    },
    {
      label: "Active alerts",
      value: formatNumber(kpis.activeAlerts),
      sub: "regions under warning",
      icon: TriangleAlert,
    },
    {
      label: "Highest heat index",
      value: kpis.highestHeatIndex ? `${kpis.highestHeatIndex.value.toFixed(1)}°C` : "—",
      sub: kpis.highestHeatIndex ? kpis.highestHeatIndex.regionName : "no readings",
      icon: Flame,
    },
    {
      label: "Population under Orange/Red",
      value: formatNumber(kpis.populationUnderElevatedAlert),
      sub: "people in elevated-alert areas",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <Icon className="size-4 text-muted-foreground" aria-hidden />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight tabular-nums">
              {item.value}
            </p>
            <p className="mt-1 truncate text-xs text-muted-foreground">{item.sub}</p>
          </Card>
        );
      })}
    </div>
  );
}
