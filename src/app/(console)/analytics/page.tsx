import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";

import { ModulePlaceholder } from "@/features/console/module-placeholder";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <ModulePlaceholder
      title="Trend Analytics"
      description="Long-term trends and scenario modelling for urban heat islands and water stress."
      icon={BarChart3}
    />
  );
}
