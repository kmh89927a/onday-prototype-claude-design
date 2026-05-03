"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { CandidateCard } from "@/components/card/candidate-card";
import { FilterPanel } from "@/components/form/filter-panel";
import { MapCanvas } from "@/components/map/map-canvas";
import {
  formatBudgetFilter,
  formatCommuteFilter,
  formatPrice,
  markerLabel,
  parseSortKey,
  sortCandidates,
  toChipMode,
} from "@/features/diagnosis/result-utils";
import { latLngToPixel } from "@/lib/coordinate-transform";
import type { CandidateArea, DiagnosisFilters } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui";

import { SortControl } from "./sort-control";

const TIME_OPTIONS: { value: string; label: string }[] = [
  { value: "07:00", label: "07:00" },
  { value: "08:00", label: "08:00" },
  { value: "09:00", label: "09:00" },
  { value: "10:00", label: "10:00" },
];

interface ResultContentProps {
  candidates: CandidateArea[];
  filters: DiagnosisFilters;
}

export function ResultContent({ candidates, filters }: ResultContentProps) {
  const searchParams = useSearchParams();
  const sort = parseSortKey(searchParams.get("sort"));
  const pushToast = useUIStore((s) => s.pushToast);

  const sorted = React.useMemo(
    () => sortCandidates(candidates, sort),
    [candidates, sort],
  );

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const cardRefs = React.useRef<Record<string, HTMLLIElement | null>>({});

  const markers = React.useMemo(
    () =>
      sorted.map((c, i) => ({
        id: c.id,
        label: markerLabel(c.dong),
        position: latLngToPixel(c.coordinate),
        selected: selectedId === c.id,
        rank: i + 1,
      })),
    [sorted, selectedId],
  );

  const handleMarkerClick = (cid: string) => {
    setSelectedId(cid);
    cardRefs.current[cid]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleCardClick = (cid: string) =>
    setSelectedId((prev) => (prev === cid ? null : cid));

  const notifyComingSoon = (label: string) =>
    pushToast({
      variant: "default",
      message: `${label} 변경은 곧 추가됩니다 (Step 12)`,
    });

  return (
    <div className="space-y-s-4">
      <FilterPanel
        time="08:00"
        onTimeChange={() => notifyComingSoon("출근 시간대")}
        timeOptions={TIME_OPTIONS}
        filters={[
          {
            label: "통근시간",
            value: formatCommuteFilter(filters.maxCommuteTime),
            onClick: () => notifyComingSoon("통근시간 필터"),
          },
          {
            label: "예산",
            value: formatBudgetFilter(filters.budget),
            onClick: () => notifyComingSoon("예산 필터"),
          },
        ]}
      />

      <MapCanvas
        markers={markers}
        onMarkerClick={handleMarkerClick}
        height={320}
      />

      <SortControl total={sorted.length} />

      <ul className="space-y-s-3">
        {sorted.map((c, i) => (
          <li
            key={c.id}
            ref={(el) => {
              cardRefs.current[c.id] = el;
            }}
            className={cn(
              "scroll-mt-s-4 rounded-lg transition-shadow",
              selectedId === c.id && "ring-2 ring-primary ring-offset-2",
            )}
          >
            <CandidateCard
              name={`${c.gu} ${c.dong}`}
              score={c.score}
              rank={i + 1}
              best={i === 0}
              commutes={[
                {
                  tag: "A",
                  mode: toChipMode(c.commuteA.mode),
                  minutes: c.commuteA.time,
                },
                ...(c.commuteB
                  ? [
                      {
                        tag: "B" as const,
                        mode: toChipMode(c.commuteB.mode),
                        minutes: c.commuteB.time,
                      },
                    ]
                  : []),
              ]}
              price={formatPrice(c.priceRange)}
              onClick={() => handleCardClick(c.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
