import type { CreateSurveyInput } from "@/lib/api/schemas";

import { prisma } from "./db";
import { assertRegionExists } from "./regions";

export interface CreatedSurveyDTO {
  id: string;
  regionId: string;
  submittedAt: string;
  awarenessLevel: number;
  hasHeatPlan: boolean;
  accessToShade: boolean;
  accessToDrinkingWater: boolean;
  notes: string | null;
}

/** Create a survey response for an existing region. */
export async function createSurvey(
  input: CreateSurveyInput,
): Promise<CreatedSurveyDTO> {
  await assertRegionExists(input.regionId);

  const survey = await prisma.surveyResponse.create({
    data: {
      regionId: input.regionId,
      awarenessLevel: input.awarenessLevel,
      hasHeatPlan: input.hasHeatPlan,
      accessToShade: input.accessToShade,
      accessToDrinkingWater: input.accessToDrinkingWater,
      notes: input.notes ?? null,
      submittedAt: input.submittedAt ?? new Date(),
    },
  });

  return {
    id: survey.id,
    regionId: survey.regionId,
    submittedAt: survey.submittedAt.toISOString(),
    awarenessLevel: survey.awarenessLevel,
    hasHeatPlan: survey.hasHeatPlan,
    accessToShade: survey.accessToShade,
    accessToDrinkingWater: survey.accessToDrinkingWater,
    notes: survey.notes,
  };
}
