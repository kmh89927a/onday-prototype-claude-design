import type { CandidateArea, Coordinate, DiagnosisFilters, DiagnosisMode } from "@/lib/types";
import { haversineDistance, estimateCommuteMinutes, estimateTransfers } from "@/lib/haversine";
import { MOCK_NEIGHBORHOODS } from "@/mocks/neighborhoods";

function scoreCandiate(
  neighborhood: (typeof MOCK_NEIGHBORHOODS)[number],
  commuteA: number,
  commuteB: number | null,
  filters: DiagnosisFilters,
): number {
  let score = 100;

  // Commute time penalty (biggest factor)
  const avgCommute = commuteB != null ? (commuteA + commuteB) / 2 : commuteA;
  score -= Math.min(40, avgCommute * 0.8);

  // Budget penalty
  if (filters.budget?.max && neighborhood.avgPrice > filters.budget.max) {
    const overBudgetRatio = (neighborhood.avgPrice - filters.budget.max) / filters.budget.max;
    score -= Math.min(20, overBudgetRatio * 40);
  }

  // Safety bonus
  const safetyBonus: Record<string, number> = { A: 10, B: 5, C: 0, D: -10 };
  score += safetyBonus[neighborhood.safetyGrade] ?? 0;

  // Facilities bonus
  const facilityScore =
    (neighborhood.facilities.convenience + neighborhood.facilities.cafes) / 10;
  score += Math.min(10, facilityScore);

  return Math.max(0, Math.min(100, Math.round(score)));
}

interface ComputeResult {
  status: "fulfilled";
  candidate: CandidateArea;
}

interface ComputeError {
  status: "rejected";
  neighborhoodId: string;
  reason: string;
}

type ComputeSettled = ComputeResult | ComputeError;

async function computeOneCandidate(
  neighborhood: (typeof MOCK_NEIGHBORHOODS)[number],
  coordA: Coordinate,
  coordB: Coordinate | null,
  filters: DiagnosisFilters,
  mode: DiagnosisMode,
): Promise<ComputeSettled> {
  // Simulate async API delay (50-200ms)
  await new Promise((r) => setTimeout(r, 50 + Math.random() * 150));

  const distA = haversineDistance(coordA, neighborhood.coordinate);
  const commuteA = estimateCommuteMinutes(distA);
  const transfersA = estimateTransfers(distA);

  let commuteB: number | null = null;
  let transfersB: number | undefined;
  if (coordB) {
    const distB = haversineDistance(coordB, neighborhood.coordinate);
    commuteB = estimateCommuteMinutes(distB);
    transfersB = estimateTransfers(distB);
  }

  // Filter by max commute time
  if (filters.maxCommuteTime) {
    const maxCommute = Math.max(commuteA, commuteB ?? 0);
    if (maxCommute > filters.maxCommuteTime) {
      return {
        status: "rejected",
        neighborhoodId: neighborhood.id,
        reason: `Commute time ${maxCommute}min exceeds max ${filters.maxCommuteTime}min`,
      };
    }
  }

  const score = scoreCandiate(neighborhood, commuteA, commuteB, filters);

  return {
    status: "fulfilled",
    candidate: {
      id: neighborhood.id,
      dong: neighborhood.dong,
      gu: neighborhood.gu,
      coordinate: neighborhood.coordinate,
      commuteA: { time: commuteA, mode: "transit", transfers: transfersA },
      commuteB: coordB
        ? { time: commuteB!, mode: "transit", transfers: transfersB }
        : undefined,
      score,
      safetyGrade: mode === "single" ? neighborhood.safetyGrade : undefined,
      priceRange: {
        min: Math.round(neighborhood.avgPrice * 0.85),
        max: Math.round(neighborhood.avgPrice * 1.15),
      },
      facilities: neighborhood.facilities,
    },
  };
}

/**
 * Mock diagnosis using Promise.allSettled pattern (Vercel timeout avoidance).
 * Computes commute times for all neighborhoods in parallel.
 */
export async function runMockDiagnosis(
  coordA: Coordinate,
  coordB: Coordinate | null,
  filters: DiagnosisFilters,
  mode: DiagnosisMode,
): Promise<CandidateArea[]> {
  const results = await Promise.allSettled(
    MOCK_NEIGHBORHOODS.map((n) => computeOneCandidate(n, coordA, coordB, filters, mode)),
  );

  const candidates: CandidateArea[] = [];
  for (const result of results) {
    if (result.status === "fulfilled" && result.value.status === "fulfilled") {
      candidates.push(result.value.candidate);
    }
    // Rejected items would go to Sentry in production
  }

  return candidates.sort((a, b) => b.score - a.score);
}

/**
 * SRS pattern: splitForPreview — show 1 location free, lock others.
 */
export function splitForPreview(areas: CandidateArea[]) {
  const sorted = [...areas].sort((a, b) => b.score - a.score);
  const [preview, ...locked] = sorted;
  return { preview: preview ?? null, locked };
}
