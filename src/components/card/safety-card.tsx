import * as React from "react";

import { SafetyBar } from "@/components/data/safety-bar";
import {
  SafetyGradeBadge,
  type SafetyGrade,
} from "@/components/data/safety-grade-badge";
import { Stat } from "@/components/data/stat";
import { cn } from "@/lib/utils";

// components-spec §23 SafetyCard
//   <article> + h3 + sub
//   우상단 SafetyGradeBadge · metric SafetyBar · 하단 Stats grid
//   클릭 시 detail 이동 → hover translateY(-1px)

interface SafetyCardProps {
  name: string;
  sub: string;
  grade: SafetyGrade;
  gradeLabel: string;
  metric: { label: string; value: number; unit?: string };
  barPercent: number;
  stats: { label: string; value: string; sub?: string }[];
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function SafetyCard({
  name,
  sub,
  grade,
  gradeLabel,
  metric,
  barPercent,
  stats,
  href,
  onClick,
  className,
}: SafetyCardProps) {
  const interactive = Boolean(href || onClick);

  const inner = (
    <>
      <header className="flex items-start justify-between gap-s-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-title font-bold text-ink">{name}</h3>
          <p className="mt-0.5 text-caption text-ink-3">{sub}</p>
        </div>
        <SafetyGradeBadge grade={grade} label={gradeLabel} />
      </header>

      <SafetyBar
        label={metric.label}
        value={metric.value}
        unit={metric.unit ?? ""}
        percent={barPercent}
        grade={grade}
      />

      <div className="grid grid-cols-3 gap-s-2">
        {stats.map((s, i) => (
          <Stat key={i} label={s.label} value={s.value} sub={s.sub} />
        ))}
      </div>
    </>
  );

  const baseClass = cn(
    "block w-full space-y-s-3 rounded-lg border border-card-border bg-surface p-s-4 text-left shadow-card",
    interactive &&
      "transition-all hover:-translate-y-px hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
    className,
  );

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {inner}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={baseClass}>
        {inner}
      </button>
    );
  }
  return <article className={baseClass}>{inner}</article>;
}
