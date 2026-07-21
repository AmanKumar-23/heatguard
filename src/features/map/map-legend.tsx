import { HEATMAP_GRADIENT, LEGEND_ITEMS } from "./heat-colors";

/** Legend mapping the colour scale to heat-index ranges / alert levels, plus the
 *  heatmap intensity gradient. */
export function MapLegend() {
  const gradientCss = `linear-gradient(to right, ${HEATMAP_GRADIENT.map(
    ([stop, color]) => `${color} ${Math.round(stop * 100)}%`,
  ).join(", ")})`;

  return (
    <div className="w-48 rounded-lg border border-border bg-background/90 p-3 shadow-md backdrop-blur">
      <p className="mb-2 text-xs font-semibold text-muted-foreground">
        Heat index &amp; alert level
      </p>
      <ul className="flex flex-col gap-1">
        {LEGEND_ITEMS.map((item) => (
          <li key={item.level} className="flex items-center gap-2 text-xs">
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden
            />
            <span className="font-medium">{item.label}</span>
            <span className="ml-auto tabular-nums text-muted-foreground">
              {item.range}
            </span>
          </li>
        ))}
      </ul>

      <p className="mb-1 mt-3 text-xs font-semibold text-muted-foreground">
        Hotspot intensity
      </p>
      <div
        className="h-2 w-full rounded-full"
        style={{ background: gradientCss }}
        aria-hidden
      />
      <div className="mt-0.5 flex justify-between text-[10px] text-muted-foreground">
        <span>low</span>
        <span>high</span>
      </div>
    </div>
  );
}
