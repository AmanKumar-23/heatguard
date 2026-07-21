import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";

import { ModulePlaceholder } from "@/features/console/module-placeholder";

export const metadata: Metadata = { title: "Survey" };

export default function SurveyPage() {
  return (
    <ModulePlaceholder
      title="Community Surveys"
      description="Collect and review field survey responses on heat awareness and access."
      icon={ClipboardList}
    />
  );
}
