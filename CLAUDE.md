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
- design-input/screens/*.html이 시각적 truth
- 토큰명 design-tokens.md 그대로 유지
- 안전등급 뱃지: letter + label + 색 3중 표기
- 포커스 링 2px brand + 2px offset 모든 인터랙티브 요소
- prefers-reduced-motion 시 모든 애니메이션 0.01ms

## 자료 우선순위 (충돌 시)
1. docs/05_SRS_v1.6.md
2. wiki/concepts/architecture-patterns.md
3. wiki/concepts/tech-stack.md
4. docs/00_PRD_v1.1-rev.4.md
5. tasks/
6. design-input/

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
| 6 | /dev production 가드 + Zustand store 분리(session/favorites/ui) | 진행 중 |  |

## 다음 시작 지점
**Step 6**: 상태 관리 본 작업 — Zustand 3 store 분리
- /dev production 가드 ✓ (`src/middleware.ts` — NODE_ENV=production 시 /dev/* → 404)
- Zustand store 분리 (다음):
  - `session` — 사용자 인증 / 게스트 모드 / 진단 입력 보존
  - `favorites` — 저장한 동네 (CMD-SAVE-001 연계)
  - `ui` — sheet open / filter panel state / 모달 등 UI 상태
- Step 3에서 만든 zustand 1 store가 있을 가능성 → 분리 또는 신규 생성
- TanStack Query와 역할 구분: server state는 TanStack, client state는 Zustand

## Step 12 직전 cleanup 예정 (P2/P3)
- grade 파스텔 6색 → globals.css 토큰화 (현재 3개 파일에 hsl 인라인 중복)
- `key={i}` 9건 → 안정적 식별자로 교체 (DetailSheet commutes/pills/metrics 등)

## 주의사항
- 한글 인코딩: Write 후 반드시 `grep -rn $'\xef\xbf\xbd'` 로 검증
- Prisma 7: `@/generated/prisma/client` 경로 사용 (index.ts 없음)
- shadcn v4: `@base-ui/react` 사용 (Radix 아님), oklch 덮어쓰기 주의
