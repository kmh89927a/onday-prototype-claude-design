"use client";

import * as React from "react";
import { Filter, FileDown } from "lucide-react";

import { SafetyCard } from "@/components/card/safety-card";
import { LegendBar } from "@/components/data/legend-bar";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  getCrimePercent,
  getNightCrimeRate,
  getNightGradeLabel,
  getRadiusSub,
} from "@/features/single/safety-stats";
import type { CandidateArea, SafetyGrade } from "@/lib/types";
import { useUIStore } from "@/stores/ui";

interface SingleResultViewProps {
  id: string;
  addressA: string;
  candidates: CandidateArea[];
}

// safetyGrade가 없는 candidate는 mode='couple' 진단을 single 페이지로 본 경우.
// fallback: 동네 ID 해시로 deterministic A~D 매핑 (실제는 single 모드 진단이어야 함)
function fallbackGrade(c: CandidateArea): SafetyGrade {
  if (c.safetyGrade) return c.safetyGrade;
  const sum = c.id.split("").reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return (["A", "B", "C", "D"] as const)[sum % 4];
}

function priceText(c: CandidateArea): string {
  if (!c.priceRange) return "—";
  const avg = (c.priceRange.min + c.priceRange.max) / 2;
  return `${(avg / 10000).toFixed(1)}억`;
}

export function SingleResultView({
  addressA,
  candidates,
}: SingleResultViewProps) {
  const pushToast = useUIStore((s) => s.pushToast);

  // 야간 안전 우선 정렬 (A → D)
  const sorted = React.useMemo(() => {
    const order: Record<SafetyGrade, number> = { A: 0, B: 1, C: 2, D: 3 };
    return [...candidates].sort(
      (a, b) => order[fallbackGrade(a)] - order[fallbackGrade(b)],
    );
  }, [candidates]);

  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <AppHeader backHref="/diagnosis" title="싱글 모드 결과" />

      <div className="flex-1 px-s-5 pt-s-3 pb-s-8 space-y-s-4">
        <header className="flex items-start justify-between gap-s-3">
          <div>
            <p className="text-caption-xs font-bold tracking-wider text-primary">
              싱글 모드 · {sorted.length}개 후보
            </p>
            <h1 className="mt-s-2 text-h3 font-extrabold leading-tight tracking-[-0.03em] text-ink">
              야간 안전이 기준이에요
            </h1>
            <p className="mt-s-1 text-caption text-ink-3">{addressA} 기준</p>
          </div>
          <IconButton
            variant="bordered"
            icon={<Filter />}
            ariaLabel="필터"
            onClick={() =>
              pushToast({
                variant: "default",
                message: "Layer 토글은 Step 11.5 예정",
              })
            }
          />
        </header>

        <LegendBar
          title="야간 안전 등급 기준"
          meta="22:00–04:00 · 반경 1km"
        />

        <section
          aria-label="후보 동네"
          className="space-y-s-3"
        >
          {sorted.map((c) => {
            const grade = fallbackGrade(c);
            return (
              <SafetyCard
                key={c.id}
                name={`${c.gu} ${c.dong}`}
                sub={getRadiusSub(c.facilities)}
                grade={grade}
                gradeLabel={getNightGradeLabel(grade)}
                metric={{
                  label: "야간 범죄율 (10만명당)",
                  value: getNightCrimeRate(grade),
                  unit: "건",
                }}
                barPercent={getCrimePercent(grade)}
                stats={[
                  { label: "통근", value: `${c.commuteA.time}분` },
                  { label: "시세", value: priceText(c) },
                  {
                    label: "범죄",
                    value: `${getNightCrimeRate(grade)}건`,
                  },
                ]}
              />
            );
          })}
        </section>

        <Button
          fullWidth
          variant="outline"
          leading={<FileDown />}
          onClick={() =>
            pushToast({
              variant: "default",
              message: "PDF 리포트는 Step 11.6 예정",
            })
          }
        >
          리포트 저장 (PDF)
        </Button>
      </div>
    </main>
  );
}
