import type { NextRequest } from "next/server";

import { apiSuccess, handleRoute, parseQuery } from "@/lib/api/http";
import { alertsQuerySchema } from "@/lib/api/schemas";
import { getAlerts } from "@/server/alerts";

/** GET /api/alerts?active=true — heat alerts, optionally only active ones. */
export async function GET(req: NextRequest): Promise<Response> {
  return handleRoute(async () => {
    const { active } = parseQuery(req, alertsQuerySchema);
    return apiSuccess(await getAlerts({ active }));
  });
}
