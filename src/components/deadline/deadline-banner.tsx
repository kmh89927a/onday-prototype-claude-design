"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Bell, X } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { getActiveStage } from "@/features/deadline/use-active-stage";
import { cn } from "@/lib/utils";
import { useDiagnosisStore } from "@/stores/diagnosis-store";

// 페이지 상단 인앱 알림. 같은 stage에서 닫으면 localStorage로 재표시 차단.
// dismissedKey = `deadline-banner-${stage}-${deadlineDate.slice(0,10)}`
//   → 다음 stage로 넘어가면 새로 표시됨 (자연스러운 알림 흐름)
export function DeadlineBanner() {
  const router = useRouter();
  const deadlineDate = useDiagnosisStore((s) => s.deadlineDate);
  const stageInfo = getActiveStage(deadlineDate);
  const dismissKey = stageInfo
    ? `deadline-banner-${stageInfo.stage}-${deadlineDate?.slice(0, 10)}`
    : null;
  const [dismissed, setDismissed] = React.useState(true);

  React.useEffect(() => {
    if (!dismissKey) {
      setDismissed(false);
      return;
    }
    const v = window.localStorage.getItem(dismissKey);
    setDismissed(v === "1");
  }, [dismissKey]);

  if (!stageInfo || dismissed) return null;

  const handleDismiss: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    if (dismissKey) window.localStorage.setItem(dismissKey, "1");
    setDismissed(true);
  };

  const tone = stageInfo.urgency;
  const cardCls =
    tone === "critical"
      ? "border-danger/40 bg-danger/8"
      : tone === "soon"
        ? "border-warning/50 bg-warning/8"
        : "border-primary/30 bg-primary-soft";
  const iconCls =
    tone === "critical"
      ? "text-danger"
      : tone === "soon"
        ? "text-warning"
        : "text-primary";

  return (
    <section
      role="alert"
      aria-live="polite"
      className={cn(
        "relative flex items-center gap-s-3 rounded-lg border px-s-4 py-s-3",
        cardCls,
      )}
    >
      <button
        type="button"
        onClick={() => router.push("/deadline")}
        className="flex flex-1 items-center gap-s-3 text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <Bell aria-hidden className={cn("size-4 shrink-0", iconCls)} />
        <p className="min-w-0 flex-1 text-body-sm font-bold text-ink">
          <span className="mr-s-2 text-caption-xs font-extrabold tracking-wider opacity-70">
            {stageInfo.stage}
          </span>
          {stageInfo.message}
        </p>
      </button>
      <IconButton
        icon={<X />}
        ariaLabel="알림 배너 닫기"
        onClick={handleDismiss}
        className="size-8"
      />
    </section>
  );
}
