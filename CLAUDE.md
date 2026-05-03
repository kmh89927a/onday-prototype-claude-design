# Onday — 동네궁합 진단기

## 프로젝트 개요
두 사람의 출퇴근지·예산·선호 시간대를 입력하면 통근시간·안전등급·편의시설을 종합해 살기 좋은 동네를 추천하는 모바일 우선 웹앱.

## Tech Stack
- Next.js 15 App Router + TypeScript (strict)
- Tailwind CSS v3 + shadcn/ui (Pretendard 폰트)
- react-hook-form + Zod (폼 검증)
- Zustand (글로벌 상태) + TanStack Query v5 (서버 상태)
- Supabase Auth (카카오/네이버 OAuth) — MVP는 Mock
- Prisma ORM (SQLite dev / Supabase PostgreSQL prod)
- react-kakao-maps-sdk (MVP는 MapPlaceholder)

## 디렉토리 구조
- `src/app/` — Next.js App Router 라우트
- `src/components/` — UI 컴포넌트 (ui/form/data/card/map/deadline/share/sheet/layout)
- `src/features/` — 도메인별 hooks/actions/utils
- `src/stores/` — Zustand 스토어
- `src/lib/` — DB, auth, types, validators, external API clients
- `src/mocks/` — Mock 데이터 + handlers
- `src/providers/` — React context providers

## 코드 규칙
- PascalCase (컴포넌트), camelCase (함수/변수), kebab-case (파일)
- 한 함수 50줄 이하
- 같은 UI 2번 이상 → 컴포넌트 추출
- TypeScript strict, optional vs required 명확
- key 명시, React.memo (비용 큰 컴포넌트), useCallback (콜백)

## 디자인 보존 규칙
- ../design-input/screens/*.html이 시각적 truth (onday-app/ 외부, claude-design/ 직속)
- 토큰명 ../design-input/design-tokens.md 그대로 유지
- 안전등급 뱃지: letter + label + 색 3중 표기
- 포커스 링 2px brand + 2px offset 모든 인터랙티브 요소
- prefers-reduced-motion 시 모든 애니메이션 0.01ms

## 자료 우선순위 (충돌 시)
모든 경로는 onday-app/ 외부 (`../`) — claude-design/ 직속 또는 그 아래.
1. ../docs/05_SRS_v1.6.md  (정본; tasks/docs/에 사본)
2. ../my-동네궁합진단기-workbase/wiki/concepts/architecture-patterns.md
3. ../my-동네궁합진단기-workbase/wiki/concepts/tech-stack.md
4. ../docs/00_PRD_v1.1-rev.4.md
5. ../tasks/  (UI-XXX.md, CMD-DIAG-*.md, API-*.md 등)
6. ../design-input/  (screens/*.html · components-spec.md · design-tokens.md · interactions-spec.md)

추가 wiki concepts (참고): deadline-mode, single-mode, share-link, two-route-intersection,
persona-domain-flows, domain-dependencies, market-size, known-follow-ups, srs-v1.6-changes,
task-domains-overview. 한국어 통합본은 `../my-동네궁합진단기-workbase/llm-wiki.ko.md`.

## Mock 모드
- `NEXT_PUBLIC_USE_MOCK=true`로 모든 외부 의존성 Mock
- SQLite 로컬 DB (DATABASE_PROVIDER=sqlite)
- Prisma 7 + better-sqlite3 adapter

## 현재 진행 상황

| Step | 내용 | 상태 | 커밋 |
|------|------|------|------|
| 1 | 프로젝트 초기화 + 토큰 통합 계획 | 완료 | `64c6239` |
| 2 | 디자인 토큰 검증 (globals.css + tailwind.config.ts + 샘플 페이지) | 완료 | `4824109` |
| 3 | Mock 인프라 (Prisma, API 4개, Haversine, Zustand, TanStack Query) | 완료 | `7ba116b` |
| 4 | shadcn/ui base 9개 + onday 토큰 + Base UI data-props 호환 + 3폭 검증 페이지 | 완료 | `493e219` |
| 5 | 31개 커스텀 컴포넌트 (5-Layer + primary-pastel 토큰) | 완료 | `d586380` |
| 6 | /dev 가드 + Zustand 3 store 분리(session/favorites/ui) + Toaster 글로벌 | 완료 | `d1c6f0e` `db809fc` |
| 7 | /login 페이지 + OAuth Mock + 게스트 체험 + Logo 컴포넌트 | 완료 | `3b6d701` |
| 8 | /diagnosis 입력 페이지 + TimeRangeToggle + AddressInput 자동완성 + result placeholder | 완료 | `4a3b345` |
| 9 | /diagnosis/result/[id] 결과 페이지 (CandidateCard + MapCanvas + FilterPanel 결합) | 완료 | `a1c4fde` |
| 9.5 | 서울 동네 확장 (12 → 22, 권역 다양성 + 안전 A~D) | 완료 | `d10a686` |
| 10 | DetailSheet 연동 (카드/마커 클릭, Heart persist, TimeSlotSelector) | 완료 | `55761b4` |
| 10.5 | MOCK_NEIGHBORHOODS × 3 필드 (lines/listingsCount/avgArea) | 완료 | `8554b67` |
| 11 | /share/[uuid] + /deadline + /single/[id] 본 작업 + 공유 실 흐름 + a11y fix | 완료 | `3a387d7` |
| 11.5 | /single Layer 토글 (야간안전/편의시설/카페) | 완료 | `0a18916` |
| 11.6 | /single PDF window.print + @media print 보강 | 완료 | `b806b57` |
| 11.7 | /diagnosis single 모드 여가거점 입력 (L1/L2) | 완료 | `e00333d` |
| 11.8 | 여가거점 점수 계산 (mock-calculator + API forward) | 완료 | `3846fee` |
| 11.10 | Deadline 인앱 알림 (DeadlineBell + DeadlineBanner) | 완료 | `94cf1c5` |
| 11.9 | 디자인 큐레이션 (key 안정화 + a11y + print + 색 시스템 통합) | 완료 | `de5b78d` |
| 12 | production 빌드 + Vercel 배포 + 라이브 URL | 다음 |  |

## 다음 시작 지점
**Step 12**: production 빌드 검증 + Vercel 배포 — 사전 점검부터 시작
- `npm run build` 통과 검증 (TypeScript strict + ESLint)
- 환경 변수: `NEXT_PUBLIC_USE_MOCK`, `DATABASE_URL` (SQLite dev → Supabase PostgreSQL prod)
- Vercel 프로젝트 연결 + 라이브 URL 발급
- Lighthouse 점수 (성능/접근성/SEO/Best Practices)
- 모바일 viewport(375px) 실기 검증

## Step 12 cleanup 항목 (계속 추적)
- ✅ ~~grade 파스텔 6색 → 토큰화~~ (step-11.9 완료 — primary-pastel/soft + warning-soft + danger-soft 통합)
- ✅ ~~`key={i}` 9건 → 안정 키~~ (step-11.9 완료 — 자연 키 적용)
- 잔존 `key={i}` (low-risk): `dev/page.tsx` (dev 페이지), `map-placeholder.tsx` (placeholder 자체)
- 잔존 hsl 인라인: `button.tsx` / `mode-selector.tsx` 의 disabled 색 `hsl(220 30% 84%)` — 별도 token 검토

## 주의사항
- 한글 인코딩: Write 후 반드시 `grep -rn $'\xef\xbf\xbd'` 로 검증
- Prisma 7: `@/generated/prisma/client` 경로 사용 (index.ts 없음)
- shadcn v4: `@base-ui/react` 사용 (Radix 아님), oklch 덮어쓰기 주의

## webpack 청크 캐시 손상 패턴 (Step 6, Step 8 재발 확인)
신규 라우트 + middleware/store 동시 추가 시 `.next/` 청크 그래프 stale.
**증상**: `Cannot find module './XXX.js'` 런타임 에러 (`/login`, `/diagnosis` 등)
**해결**: dev 서버 재시작 + 캐시 삭제 (1줄):
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; rm -rf .next && npm run dev
```
**예방**: Step 단위 큰 변경(신규 페이지 + middleware/store) 후 dev 재시작 권장
