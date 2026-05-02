import * as React from "react";

import { cn } from "@/lib/utils";

// components-spec §15 SafetyGradeBadge
//   야간 안전 등급(A~D). letter + label + 색 3중 표기 (color 단독 금지)
//   파스텔 — design-tokens §1.7

export type SafetyGrade = "A" | "B" | "C" | "D";

const GRADE_STYLES: Record<SafetyGrade, string> = {
  A: "bg-[hsl(152_76%_90%)] text-[hsl(161_94%_24%)]",
  B: "bg-[hsl(213_97%_87%)] text-[hsl(224_76%_48%)]",
  C: "bg-[hsl(48_96%_89%)] text-[hsl(35_92%_33%)]",
  D: "bg-[hsl(0_93%_94%)] text-[hsl(0_74%_42%)]",
};

const GRADE_LABELS: Record<SafetyGrade, string> = {
  A: "매우 안전",
  B: "안전",
  C: "주의",
  D: "위험",
};

interface SafetyGradeBadgeProps {
  grade: SafetyGrade;
  label?: string;
  className?: string;
}

export function SafetyGradeBadge({
  grade,
  label,
  className,
}: SafetyGradeBadgeProps) {
  const text = label ?? GRADE_LABELS[grade];
  return (
    <span
      role="img"
      aria-label={`야간 안전 등급 ${grade}, ${text}`}
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-sm px-s-2 py-1 text-caption-xs font-extrabold",
        GRADE_STYLES[grade],
        className,
      )}
    >
      <span aria-hidden className="font-black tracking-tight">
        {grade}
      </span>
      <span aria-hidden>·</span>
      <span aria-hidden>{text}</span>
    </span>
  );
}

export { GRADE_LABELS, GRADE_STYLES };
