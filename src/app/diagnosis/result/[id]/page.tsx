import Link from "next/link";
import { ChevronLeft, Construction } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DiagnosisResultPageProps {
  params: Promise<{ id: string }>;
}

export default async function DiagnosisResultPage({
  params,
}: DiagnosisResultPageProps) {
  const { id } = await params;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg p-s-5 text-center">
      <Construction aria-hidden className="size-10 text-primary" />
      <p className="mt-s-3 text-caption-xs font-bold tracking-wider text-primary">
        STEP 9 PLACEHOLDER
      </p>
      <h1 className="mt-s-2 text-h2 font-extrabold tracking-[-0.03em] text-ink">
        진단 결과 페이지
      </h1>
      <p className="mt-s-2 text-body-sm text-ink-3">
        diagnosis ID:{" "}
        <code className="rounded-sm bg-surface px-1 py-0.5 text-ink">{id}</code>
      </p>
      <p className="mt-s-4 max-w-xs text-body-sm text-ink-2">
        Step 9에서 <code>CandidateCard</code> · <code>MapCanvas</code> ·{" "}
        <code>FilterPanel</code> 결합으로 완성됩니다.
      </p>
      <Link href="/diagnosis" className="mt-s-6 block">
        <Button variant="outline" leading={<ChevronLeft />}>
          진단 다시 입력
        </Button>
      </Link>
    </main>
  );
}
