import type { ApiFailureBody, ApiSuccessBody } from "@/lib/api/http";
import type { RegionDetail, RegionOverview } from "@/server/regions";

/**
 * Typed client for the HeatGuard API, for **client-side / interactive** use.
 *
 * Server components must call the data functions in `src/server/*` directly
 * rather than fetching their own HTTP endpoints. Requests are sent with
 * `cache: "no-store"` so interactive views always reflect the latest readings.
 *
 * Type-only imports (`RegionOverview`, `RegionDetail`) keep server code —
 * including Prisma — out of the client bundle.
 */

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(path, { cache: "no-store" });

  let body: ApiSuccessBody<T> | ApiFailureBody | null = null;
  try {
    body = (await response.json()) as ApiSuccessBody<T> | ApiFailureBody;
  } catch {
    throw new ApiClientError(response.status, "INVALID_RESPONSE", "The server returned an invalid response.");
  }

  if (!response.ok || body.ok !== true) {
    const error = body.ok === false ? body.error : undefined;
    throw new ApiClientError(
      response.status,
      error?.code ?? "REQUEST_FAILED",
      error?.message ?? "The request failed.",
      error?.details,
    );
  }

  return body.data;
}

/** Fetch the regions overview (list + latest reading + active alert + scores). */
export function fetchRegionsOverview(): Promise<RegionOverview[]> {
  return getJson<RegionOverview[]>("/api/regions");
}

/** Fetch a single region's full detail. */
export function fetchRegionDetail(id: string): Promise<RegionDetail> {
  return getJson<RegionDetail>(`/api/regions/${encodeURIComponent(id)}`);
}
