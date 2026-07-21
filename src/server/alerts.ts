import { prisma } from "./db";
import { toAlertDTO, type AlertDTO } from "./serializers";

export interface AlertWithRegionDTO extends AlertDTO {
  region: { id: string; name: string; state: string };
}

/** List heat alerts, optionally filtered to only active ones. */
export async function getAlerts(params: {
  active?: boolean;
}): Promise<AlertWithRegionDTO[]> {
  const rows = await prisma.heatAlert.findMany({
    where: params.active === undefined ? {} : { active: params.active },
    orderBy: { issuedAt: "desc" },
    include: { region: { select: { id: true, name: true, state: true } } },
  });

  return rows.map((row) => ({ ...toAlertDTO(row), region: row.region }));
}
