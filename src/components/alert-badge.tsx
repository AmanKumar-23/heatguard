import type { HeatAlertLevel } from "@/lib/enums";
import { cn } from "@/lib/utils";

/**
 * Colour-coded heat-alert badge. Identity is carried by a text label as well as
 * colour (a coloured dot), so it is never colour-alone — readable for
 * colour-blind users and in forced-colours mode.
 */
const LEVEL_STYLES: Record<
  HeatAlertLevel,
  { label: string; badge: string; dot: string }
> = {
  NORMAL: {
    label: "Normal",
    badge: "border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  YELLOW: {
    label: "Yellow",
    badge: "border-amber-500/30 bg-amber-400/15 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-400",
  },
  ORANGE: {
    label: "Orange",
    badge: "border-orange-600/30 bg-orange-500/15 text-orange-700 dark:text-orange-300",
    dot: "bg-orange-500",
  },
  RED: {
    label: "Red",
    badge: "border-red-600/40 bg-red-500/15 text-red-700 dark:text-red-300",
    dot: "bg-red-600",
  },
};

export function AlertBadge({
  level,
  className,
}: {
  level: HeatAlertLevel;
  className?: string;
}) {
  const style = LEVEL_STYLES[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        style.badge,
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", style.dot)} aria-hidden />
      {style.label}
    </span>
  );
}
