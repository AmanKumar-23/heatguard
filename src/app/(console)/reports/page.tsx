import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { ModulePlaceholder } from "@/features/console/module-placeholder";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  return (
    <ModulePlaceholder
      title="Reports"
      description="Generate shareable heat-wave situation reports for decision-makers."
      icon={FileText}
    />
  );
}
