export default function TokenSamplePage() {
  return (
    <main className="min-h-screen bg-bg p-s-5">
      <div className="mx-auto max-w-md space-y-s-6">
        {/* Header */}
        <h1 className="text-h2 text-ink">디자인 토큰 검증</h1>
        <p className="text-body text-ink-2">Pretendard 한글 폰트 렌더링 확인</p>
        <p className="text-caption text-ink-3">캡션 텍스트 — 가나다라마바사</p>

        {/* Brand Colors */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">Brand Colors</h2>
          <div className="flex gap-s-2">
            <div className="h-12 w-12 rounded-lg bg-primary" title="primary" />
            <div className="h-12 w-12 rounded-lg bg-primary-soft" title="primary-soft" />
            <div className="h-12 w-12 rounded-lg bg-primary-deep" title="primary-deep" />
            <div className="h-12 w-12 rounded-lg bg-secondary" title="secondary" />
          </div>
        </section>

        {/* Status Colors */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">Status Colors</h2>
          <div className="flex gap-s-2">
            <div className="h-12 w-12 rounded-lg bg-success" title="success" />
            <div className="h-12 w-12 rounded-lg bg-info" title="info" />
            <div className="h-12 w-12 rounded-lg bg-warning" title="warning" />
            <div className="h-12 w-12 rounded-lg bg-danger" title="danger" />
          </div>
        </section>

        {/* Safety Grades */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">Safety Grades (3중 표기)</h2>
          <div className="flex gap-s-2">
            <span className="rounded-sm bg-success-soft px-s-2 py-s-1 text-caption font-bold text-success">
              A 매우 안전
            </span>
            <span className="rounded-sm bg-info-soft px-s-2 py-s-1 text-caption font-bold text-info">
              B 안전
            </span>
            <span className="rounded-sm bg-warning-soft px-s-2 py-s-1 text-caption font-bold text-warning">
              C 보통
            </span>
            <span className="rounded-sm bg-danger-soft px-s-2 py-s-1 text-caption font-bold text-danger">
              D 주의
            </span>
          </div>
        </section>

        {/* Card with Shadow */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">Card (shadow-card + radius-lg)</h2>
          <div className="rounded-lg border border-card-border bg-surface p-s-4 shadow-card">
            <h3 className="text-title text-ink">서울 마포구 공덕동</h3>
            <p className="mt-s-1 text-body text-ink-2">통근시간 A: 25분 | B: 38분</p>
            <p className="mt-s-1 text-caption text-ink-3">평균 매매가 9.2억</p>
          </div>
        </section>

        {/* Typography Scale */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">Typography Scale</h2>
          <div className="space-y-s-1 rounded-lg bg-surface p-s-4">
            <p className="text-display-1">display-1 (40px)</p>
            <p className="text-h1">h1 — 두 사람의 출퇴근 (28px)</p>
            <p className="text-h2">h2 — 가장 합리적인 동네는? (24px)</p>
            <p className="text-h3">h3 — 후보 동네 추천 (20px)</p>
            <p className="text-h4">h4 — 세부 정보 (18px)</p>
            <p className="text-title">title — 섹션 제목 (16px/600)</p>
            <p className="text-body">body — 본문 텍스트 14px</p>
            <p className="text-body-sm">body-sm — 보조 텍스트 13px</p>
            <p className="text-caption">caption — 캡션 12px</p>
            <p className="text-caption-xs">caption-xs — 최소 11px</p>
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">Spacing (s-1 ~ s-6)</h2>
          <div className="flex items-end gap-s-1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-primary-soft border border-primary"
                style={{ width: `${n * 8}px`, height: `${n * 8}px` }}
              />
            ))}
          </div>
        </section>

        {/* OAuth Colors (login only) */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">OAuth Buttons (login only)</h2>
          <button className="w-full rounded-2xl bg-oauth-kakao py-3 text-title text-oauth-kakao-ink">
            카카오로 시작하기
          </button>
          <button className="w-full rounded-2xl bg-oauth-naver py-3 text-title text-oauth-naver-ink">
            네이버로 시작하기
          </button>
        </section>

        {/* Tabular Numbers */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">Tabular Numbers</h2>
          <div className="tabular text-body text-ink">
            <p>통근시간: 25분 | 38분 | 42분</p>
            <p>D-Day: 127일 | 089일 | 003일</p>
            <p>매매가: 9.2억 | 7.8억 | 12.5억</p>
          </div>
        </section>

        {/* Animation */}
        <section className="space-y-s-2">
          <h2 className="text-title text-ink">Animation</h2>
          <div className="animate-fade-in rounded-lg bg-primary-soft p-s-4 text-body text-primary">
            fade-in 220ms ease-out
          </div>
        </section>
      </div>
    </main>
  );
}
