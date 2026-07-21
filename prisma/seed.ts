/**
 * Database seed script.
 *
 * Populates the development SQLite database with deterministic sample data so
 * the app runs fully offline. No models are defined yet, so this is currently
 * a no-op placeholder — extend it as the Prisma schema grows.
 *
 * Run with: `npm run db:seed`
 */
async function main(): Promise<void> {
  console.info("[seed] No models defined yet — nothing to seed.");
}

main().catch((error) => {
  console.error("[seed] Failed:", error);
  process.exitCode = 1;
});
