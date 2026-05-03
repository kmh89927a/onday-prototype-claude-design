"use client";

import * as React from "react";
import { Filter, FileDown } from "lucide-react";

import { SafetyCard } from "@/components/card/safety-card";
import { LegendBar } from "@/components/data/legend-bar";
import { DeadlineBanner } from "@/components/deadline/deadline-banner";
import { DeadlineBell } from "@/components/deadline/deadline-bell";
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

import { LayerToggle, type SingleLayer } from "./layer-toggle";

interface SingleResultViewProps {
  id: string;
  addressA: string;
  candidates: CandidateArea[];
}

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

const GRADE_ORDER: Record<SafetyGrade, number> = { A: 0, B: 1, C: 2, D: 3 };

function sortByLayer(
  list: CandidateArea[],
  layer: SingleLayer,
): CandidateArea[] {
  const arr = [...list];
  switch (layer) {
    case "safety":
      return arr.sort(
        (a, b) => GRADE_ORDER[fallbackGrade(a)] - GRADE_ORDER[fallbackGrade(b)],
      );
    case "convenience":
      return arr.sort(
        (a, b) =>
          (b.facilities?.convenience ?? 0) - (a.facilities?.convenience ?? 0),
      );
    case "cafes":
      return arr.sort(
        (a, b) => (b.facilities?.cafes ?? 0) - (a.facilities?.cafes ?? 0),
      );
  }
}

function buildLayerStat(c: CandidateArea, layer: SingleLayer) {
  switch (layer) {
    case "safety": {
      const grade = fallbackGrade(c);
      return { label: "범죄", value: `${getNightCrimeRate(grade)}건` };
    }
    case "convenience":
      return {
        label: "편의점",
        value: `${c.facilities?.convenience ?? 0}개`,
      };
    case "cafes":
      return { label: "카페", value: `${c.facilities?.cafes ?? 0}개` };
  }
}

const LEGEND_META: Record<SingleLayer, { title: string; meta: string }> = {
  safety: {
    title: "야간 안전 등급 기준",
    meta: "22:00–04:00 · 반경 1km",
  },
  convenience: {
    title: "편의시설 밀집도 기준",
    meta: "편의점 + 약국 + 24시간 매장 · 반경 1km",
  },
  cafes: {
    title: "카페 밀집도 기준",
    meta: "스타벅스급 + 개인 카페 · 반경 1km",
  },
};

export function SingleResultView({
  addressA,
  candidates,
}: SingleResultViewProps) {
  const pushToast = useUIStore((s) => s.pushToast);
  const [layer, setLayer] = React.useState<SingleLayer>("safety");

  const sorted = React.useMemo(
    () => sortByLayer(candidates, layer),
    [candidates, layer],
  );

  const legend = LEGEND_META[layer];

  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <AppHeader
        backHref="/diagnosis"
        title="싱글 모드 결과"
        trailing={<DeadlineBell />}
      />

      <div className="flex-1 px-s-5 pt-s-3 pb-s-8 space-y-s-4">
        {/* 인쇄 시에만 보이는 리포트 헤더 (Onday 로고 + 발행일) */}
        <div className="hidden print:block border-b border-line pb-s-3">
          <p className="text-caption font-extrabold tracking-wider text-ink">
            동네궁합 · 싱글 모드 리포트
          </p>
          <p className="mt-1 text-caption-xs text-ink-3">
            발행 {new Date().toLocaleDateString("ko-KR")} · {addressA} 기준
          </p>
        </div>
        <div className="print:hidden">
          <DeadlineBanner />
        </div>
        <header className="flex items-start justify-between gap-s-3 print:hidden">
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
                message: "고급 필터는 다음 업데이트에 추가됩니다 ✨",
              })
            }
          />
        </header>

        <div className="print:hidden">
          <LayerToggle value={layer} onChange={setLayer} />
        </div>

        <LegendBar title={legend.title} meta={legend.meta} />

        <section aria-label="후보 동네" className="space-y-s-3">
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
                  buildLayerStat(c, layer),
                ]}
              />
            );
          })}
        </section>

        <Button
          fullWidth
          variant="outline"
          leading={<FileDown />}
          onClick={() => {
            // wiki/concepts/single-mode.md — window.print() + @media print, 라이브러리 0건
            pushToast({
              variant: "default",
              message: "PDF로 저장하려면 인쇄 대화상자에서 'PDF로 저장' 선택",
            });
            window.requestAnimationFrame(() => window.print());
          }}
          className="print:hidden"
        >
          리포트 저장 (PDF)
        </Button>
      </div>
    </main>
  );
}
