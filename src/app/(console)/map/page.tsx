import type { Metadata } from "next";
import { Map } from "lucide-react";

import { ModulePlaceholder } from "@/features/console/module-placeholder";

export const metadata: Metadata = { title: "Map" };

export default function MapPage() {
  return (
    <ModulePlaceholder
      title="GIS Hotspot Map"
      description="Remote-sensing-style overlays and heat-hotspot mapping across districts."
      icon={Map}
    />
  );
}
