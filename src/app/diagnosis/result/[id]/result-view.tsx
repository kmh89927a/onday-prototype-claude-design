"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Share2, AlertCircle } from "lucide-react";

import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDiagnosis } from "@/features/diagnosis/use-diagnosis";
import { useDiagnosisStore } from "@/stores/diagnosis-store";
import { useUIStore } from "@/stores/ui";

import { ResultContent } from "./result-content";

interface ResultViewProps {
  id: string;
}

export function ResultView({ id }: ResultViewProps) {
  const storeId = useDiagnosisStore((s) => s.diagnosisId);
  const storeCandidates = useDiagnosisStore((s) => s.candidates);
  const filters = useDiagnosisStore((s) => s.filters);
  const setResult = useDiagnosisStore((s) => s.setResult);
  const pushToast = useUIStore((s) => s.pushToast);

  const inSync = storeId === id && storeCandidates.length > 0;
  const query = useDiagnosis(inSync ? null : id);

  // 직접 URL 진입 시 store hydrate (한 번만)
  React.useEffect(() => {
    if (!inSync && query.data) {
      setResult(query.data.id, query.data.candidates);
    }
  }, [inSync, query.data, setResult]);

  const candidates = inSync ? storeCandidates : query.data?.candidates ?? [];
  const isLoading = !inSync && query.isLoading;
  const error = !inSync ? query.error : null;
  const showEmpty = !isLoading && !error && candidates.length === 0;

  const headerTitle =
    candidates.length > 0 ? `후보 ${candidates.length}개 동네` : "진단 결과";

  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <AppHeader
        backHref="/diagnosis"
        title={headerTitle}
        trailing={
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              pushToast({
                variant: "default",
                message: "공유 링크는 Step 11 예정",
              })
            }
          >
            <Share2 className="size-3.5" />
            공유
          </Button>
        }
      />

      <div className="flex-1 px-s-5 pb-s-8 pt-s-3">
        {isLoading ? (
          <ResultSkeleton />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : showEmpty ? (
          <EmptyState />
        ) : (
          <ResultContent candidates={candidates} filters={filters} />
        )}
      </div>
    </main>
  );
}

function ResultSkeleton() {
  return (
    <div className="space-y-s-4">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-[320px] w-full" />
      <Skeleton className="h-6 w-32" />
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-[112px] w-full" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-card-border bg-bg p-s-6 text-center">
      <p className="text-body font-bold text-ink">
        조건을 만족하는 동네가 없습니다
      </p>
      <ul className="mt-s-3 space-y-1 text-body-sm text-ink-3">
        <li>· 최대 통근 시간을 늘려보세요</li>
        <li>· 예산 범위를 조정해보세요</li>
      </ul>
      <Link href="/diagnosis" className="mt-s-4 inline-block">
        <Button variant="outline" leading={<ChevronLeft />}>
          진단 다시 입력
        </Button>
      </Link>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-s-3 rounded-lg border border-danger/40 bg-danger/5 p-s-6 text-center"
    >
      <AlertCircle aria-hidden className="size-8 text-danger" />
      <p className="text-body font-bold text-ink">진단 결과를 불러올 수 없습니다</p>
      <p className="text-body-sm text-ink-3">{message}</p>
      <Link href="/diagnosis" className="mt-s-2 inline-block">
        <Button variant="outline" leading={<ChevronLeft />}>
          진단 다시 입력
        </Button>
      </Link>
    </div>
  );
}
