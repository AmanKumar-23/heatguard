import type { Metadata } from "next";
import { TriangleAlert } from "lucide-react";

import { ModulePlaceholder } from "@/features/console/module-placeholder";

export const metadata: Metadata = { title: "Alerts" };

export default function AlertsPage() {
  return (
    <ModulePlaceholder
      title="Early-Warning Alerts"
      description="Issue and track IMD-style heat-wave alerts across regions."
      icon={TriangleAlert}
    />
  );
}
