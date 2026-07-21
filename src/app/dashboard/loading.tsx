const CARD_KEYS = ["a", "b", "c", "d"] as const;

/** Suspense skeleton for the Response dashboard. */
export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <div className="h-5 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-8 w-56 animate-pulse rounded bg-muted" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARD_KEYS.map((key) => (
          <div
            key={key}
            className="h-28 animate-pulse rounded-xl border border-border bg-muted/40"
          />
        ))}
      </div>

      <div className="mt-8 h-80 animate-pulse rounded-xl border border-border bg-muted/40" />
    </main>
  );
}
