"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronLeft,
  Heart,
  Link as LinkIcon,
  MapPin,
  Maximize2,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Share2,
  User,
  X,
} from "lucide-react";

import { CommuteChip } from "@/components/data/commute-chip";
import { DataSourceBadge } from "@/components/data/data-source-badge";
import { LegendBar } from "@/components/data/legend-bar";
import { SafetyBar } from "@/components/data/safety-bar";
import { SafetyGradeBadge } from "@/components/data/safety-grade-badge";
import { Stat } from "@/components/data/stat";
import {
  AddressInput,
  type AddressSuggestion,
} from "@/components/form/address-input";
import { FilterChip } from "@/components/form/filter-chip";
import { ModeSelector, type ModeKey } from "@/components/form/mode-selector";
import { TimeTabs } from "@/components/form/time-tabs";
import { PhoneFrame } from "@/components/layout/phone-frame";
import { StickyCTABar } from "@/components/layout/sticky-cta-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { OAuthButton } from "@/components/ui/oauth-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="rounded-md border border-line-2 bg-surface-soft px-s-3 py-s-2 text-caption text-ink-2">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-s-1 leading-relaxed">
          <span aria-hidden className="text-success">
            ✓
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  prefix = "B",
  index,
  title,
  hint,
  children,
  checks,
}: {
  prefix?: string;
  index: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
  checks: string[];
}) {
  return (
    <section className="space-y-s-3">
      <header>
        <p className="text-caption-xs font-bold tracking-wide text-ink-3">
          {prefix} {index.toString().padStart(2, "0")}
        </p>
        <h2 className="text-h3 text-ink">{title}</h2>
        {hint && <p className="mt-s-1 text-body-sm text-ink-3">{hint}</p>}
      </header>
      <div className="space-y-s-3">{children}</div>
      <CheckList items={checks} />
    </section>
  );
}

function GroupHeading({
  badge,
  title,
  hint,
  tone = "primary",
}: {
  badge: string;
  title: string;
  hint?: string;
  tone?: "primary" | "muted";
}) {
  return (
    <div className="space-y-s-1 border-y border-line-2 py-s-3">
      <p
        className={cn(
          "text-caption-xs font-bold tracking-widest",
          tone === "primary" ? "text-primary" : "text-ink-3",
        )}
      >
        {badge}
      </p>
      <h2 className="text-h3 text-ink">{title}</h2>
      {hint && <p className="text-body-sm text-ink-3">{hint}</p>}
    </div>
  );
}

const SUGGESTIONS_DEMO: AddressSuggestion[] = [
  { id: "1", title: "판교역", sub: "경기 성남시 분당구", kind: "지하철역" },
  {
    id: "2",
    title: "판교테크노밸리",
    sub: "경기 성남시 분당구 삼평동",
    kind: "지역",
  },
  {
    id: "3",
    title: "판교 N사옥",
    sub: "경기 성남시 분당구 정자일로 95",
    kind: "회사",
  },
];

type TimeBucket = "07" | "08" | "09" | "10";
const TIME_OPTIONS: { value: TimeBucket; label: string }[] = [
  { value: "07", label: "07시" },
  { value: "08", label: "08시" },
  { value: "09", label: "09시" },
  { value: "10", label: "10시" },
];

export default function DevSamplePage() {
  const [clicks, setClicks] = useState(0);
  const [name, setName] = useState("");
  const [addrA] = useState("서울 강남구 테헤란로 152");
  const [addrB, setAddrB] = useState("판교");
  const [mode, setMode] = useState<ModeKey>("couple");
  const [time, setTime] = useState<TimeBucket>("08");
  const [budgetActive, setBudgetActive] = useState(false);

  return (
    <main className="min-h-screen bg-bg p-s-5">
      <div className="mx-auto max-w-md space-y-s-7 pb-s-10">
        {/* ───────── 헤더 ───────── */}
        <header className="space-y-s-2">
          <div className="flex flex-wrap items-center gap-s-2">
            <Badge variant="solid">_dev</Badge>
            <Badge variant="ok">Step 4</Badge>
            <Badge>Step 5 · L1 (5/31)</Badge>
            <Badge>Step 5 · L2 (17/31)</Badge>
          </div>
          <h1 className="text-h2 text-ink">시각 검증 페이지</h1>
          <p className="text-body-sm text-ink-3">
            Step 5 Layer 2 신규 12개 + Layer 1 5개 + Step 4 baseline 9개
            컴포넌트를 한 화면에서 검토합니다.
          </p>
          <div className="rounded-md border border-line-2 bg-surface px-s-3 py-s-2 text-caption text-ink-3">
            상위 검증 포인트 — primary{" "}
            <code className="text-primary">#2563EB</code> · Pretendard ·
            shadow-card · radius 12px · 한글 인코딩 OK
          </div>
          <Link href="/dev/preview">
            <Button size="sm" variant="outline" className="w-full">
              <Maximize2 />
              375 / 393 / 430px 동시 미리보기 (preview)
            </Button>
          </Link>
        </header>

        {/* ═════════ STEP 5 · LAYER 1 (5개 신규) ═════════ */}
        <GroupHeading
          badge="STEP 5 · LAYER 1 — 5/31"
          title="신규 커스텀 컴포넌트"
          hint="components-spec §01/03/04/13/16 정확 적용"
          tone="primary"
        />

        {/* L1-01 PhoneFrame */}
        <Section
          prefix="L1"
          index={1}
          title="PhoneFrame"
          hint="데스크톱 폰 베젤 (375×780) · 모바일 풀스크린 폴백"
          checks={[
            "데스크톱(≥768): 검은 베젤 + 다이내믹 아일랜드 + 홈 인디케이터 + status bar 9:41",
            "데스크톱: 그라디언트 배경(primary-soft → bg)",
            "모바일(<768): 베젤 사라지고 풀스크린 (max-md: hidden)",
            "베젤·island·home indicator는 aria-hidden / 메인은 <main role='main'>",
            "screenBackground: surface | bg | soft 3종",
          ]}
        >
          <p className="text-body-sm text-ink-3">
            데스크톱에서 베젤 미리보기 (모바일에선 단순 wrapping):
          </p>
          <div className="overflow-hidden rounded-2xl border border-line-2">
            <div className="scale-[0.55] origin-top-left h-[450px] w-[180%] -mb-[200px]">
              <PhoneFrame screenLabel="diagnosis" screenBackground="bg">
                <div className="space-y-s-3 p-s-5">
                  <p className="text-caption-xs font-bold tracking-wide text-ink-3">
                    STEP 1 / 2
                  </p>
                  <h3 className="text-h3 text-ink">
                    두 분의 직장 주소를
                    <br />
                    알려주세요
                  </h3>
                  <p className="text-body-sm text-ink-3">
                    입력한 주소는 분석 후 자동 삭제돼요
                  </p>
                  <div className="rounded-lg border border-card-border bg-surface p-s-4 text-body text-ink">
                    내 직장: 서울 강남구 테헤란로 152
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>
          <p className="text-caption text-ink-3">
            ※ 실제 화면에서는 PhoneFrame이 페이지 전체를 감쌉니다. 여기서는 0.55
            스케일 미리보기.
          </p>
        </Section>

        {/* L1-02 IconButton */}
        <Section
          prefix="L1"
          index={2}
          title="IconButton"
          hint="40×40 정사각 · plain / bordered · aria-label 필수"
          checks={[
            "size 40×40 / SVG 20px",
            "plain: bg transparent + hover bg-bg",
            "bordered: surface 흰 + 1px card-border",
            "active 시 translateY(1px) · disabled opacity 0.4",
            "aria-label로 스크린리더 접근 보장",
          ]}
        >
          <div>
            <p className="mb-s-2 text-caption text-ink-3">plain (transparent)</p>
            <div className="flex flex-wrap gap-s-2">
              <IconButton icon={<ChevronLeft />} ariaLabel="이전" />
              <IconButton icon={<X />} ariaLabel="닫기" />
              <IconButton icon={<Menu />} ariaLabel="메뉴" />
              <IconButton icon={<Heart />} ariaLabel="즐겨찾기" />
              <IconButton icon={<Plus />} ariaLabel="추가" disabled />
            </div>
          </div>
          <div>
            <p className="mb-s-2 text-caption text-ink-3">bordered (card-style)</p>
            <div className="flex flex-wrap gap-s-2">
              <IconButton
                variant="bordered"
                icon={<ChevronLeft />}
                ariaLabel="이전"
              />
              <IconButton
                variant="bordered"
                icon={<RefreshCw />}
                ariaLabel="새로고침"
              />
              <IconButton
                variant="bordered"
                icon={<Share2 />}
                ariaLabel="공유"
              />
            </div>
          </div>
        </Section>

        {/* L1-03 Button (ext) */}
        <Section
          prefix="L1"
          index={3}
          title="Button (ext)"
          hint="leading / trailing / loading / fullWidth + size lg(44px single-foot)"
          checks={[
            "leading 슬롯 = 좌측 아이콘, trailing = 우측 아이콘",
            "loading=true: leading이 spinner로 교체 + aria-busy + click 차단",
            "fullWidth=true: 풀 너비 (100%)",
            "size lg = 44px (single-foot 변형)",
            "single-foot variant: lg + card border + shadow (single 페이지 footer)",
          ]}
        >
          <div className="space-y-s-2">
            <Button leading={<ArrowRight />} fullWidth>
              leading 슬롯
            </Button>
            <Button trailing={<ArrowRight />} fullWidth>
              trailing 슬롯
            </Button>
            <Button loading fullWidth>
              로딩 중…
            </Button>
            <Button variant="outline" loading fullWidth>
              outline 로딩
            </Button>
          </div>
          <div>
            <p className="mb-s-2 text-caption text-ink-3">size lg vs single-foot</p>
            <div className="flex flex-wrap gap-s-2">
              <Button size="lg">lg 44px</Button>
              <Button size="lg" variant="outline">
                lg outline
              </Button>
              <Button size="single-foot" leading={<RefreshCw />}>
                single-foot
              </Button>
            </div>
          </div>
        </Section>

        {/* L1-04 Pill / Badge (ext) */}
        <Section
          prefix="L1"
          index={4}
          title="Pill / Badge (ext)"
          hint="size sm(default) / xs · leading slot 정식 지원"
          checks={[
            "size sm: 4/8 padding · 11px-700",
            "size xs: 2/6 padding · 10px-700 (메타 라벨용)",
            "leading prop으로 SVG 좌측 부착 (children 분리)",
            "destructive 별칭 + grade-a~d 그대로 유지",
          ]}
        >
          <div>
            <p className="mb-s-2 text-caption text-ink-3">size sm (default)</p>
            <div className="flex flex-wrap gap-s-2">
              <Badge>BEST</Badge>
              <Badge variant="ok" leading={<Check />}>
                검증됨
              </Badge>
              <Badge variant="warning">매물 N건</Badge>
              <Badge variant="danger">놓치면 위약금</Badge>
            </div>
          </div>
          <div>
            <p className="mb-s-2 text-caption text-ink-3">
              size xs (메타 / 인라인 라벨)
            </p>
            <div className="flex flex-wrap gap-s-2">
              <Badge size="xs" variant="neutral">
                지하철역
              </Badge>
              <Badge size="xs" variant="neutral">
                지역
              </Badge>
              <Badge size="xs" variant="neutral">
                회사
              </Badge>
              <Badge size="xs" variant="default">
                무료 미리보기
              </Badge>
            </div>
          </div>
        </Section>

        {/* L1-05 Stat (Tile) */}
        <Section
          prefix="L1"
          index={5}
          title="Stat (Tile)"
          hint="tile (bg-bg 작은 통계) · metric (가운데+좌측 보더 detail 전용)"
          checks={[
            "tile: bg-bg / radius 8 / padding 6/8 / label 10/600 ink-3 / value 12/800 ink",
            "metric: 가운데 정렬 · 인접 시 좌측 보더(line-2) — 3등분 detail 사용",
            "value는 tabular (표 숫자)",
            "sub prop으로 단위 라벨 (84㎡ 등) 표시",
            "<dl><dt><dd> 시맨틱 태그",
          ]}
        >
          <div>
            <p className="mb-s-2 text-caption text-ink-3">tile — 카드 내부 1/2 분할</p>
            <div className="grid grid-cols-2 gap-s-2 rounded-lg border border-card-border bg-surface p-s-3 shadow-card">
              <Stat label="A 통근" value="25분" />
              <Stat label="B 통근" value="38분" />
            </div>
          </div>

          <div>
            <p className="mb-s-2 text-caption text-ink-3">tile — 3등분</p>
            <div className="grid grid-cols-3 gap-s-2 rounded-lg border border-card-border bg-surface p-s-3 shadow-card">
              <Stat label="평균 통근" value="31분" />
              <Stat label="안전등급" value="B" />
              <Stat label="평균 매가" value="9.2억" />
            </div>
          </div>

          <div>
            <p className="mb-s-2 text-caption text-ink-3">
              metric — detail 페이지 3등분 (좌측 보더 자동)
            </p>
            <div className="flex rounded-lg border border-card-border bg-surface py-s-2 shadow-card">
              <Stat
                variant="metric"
                label="면적"
                value="84"
                sub="㎡"
                className="flex-1"
              />
              <Stat
                variant="metric"
                label="평균가"
                value="9.2"
                sub="억"
                className="flex-1"
              />
              <Stat
                variant="metric"
                label="매물"
                value="32"
                sub="건"
                className="flex-1"
              />
            </div>
          </div>
        </Section>

        {/* ═════════ STEP 5 · LAYER 2 (12개 신규) ═════════ */}
        <GroupHeading
          badge="STEP 5 · LAYER 2 — 12/31"
          title="도메인 형식·표시 컴포넌트"
          hint="OAuth · CTA · 주소 자동완성 · 모드 선택 · 시간 탭 · 필터 · 데이터 출처 · 안전등급 · 통근 · 막대"
          tone="primary"
        />

        {/* L2-01 OAuthButton */}
        <Section
          prefix="L2"
          index={1}
          title="OAuthButton"
          hint="login 전용 — Button(variant=provider) + 라벨 preset"
          checks={[
            "kakao = #FEE500 / #191919 + 라벨 '카카오로 1초 만에 시작'",
            "naver = #03C75A / #FFFFFF + 라벨 '네이버로 시작'",
            "fullWidth · aria-label 자동",
            "loading=true 시 좌측 spinner",
          ]}
        >
          <OAuthButton provider="kakao" />
          <OAuthButton provider="naver" />
          <OAuthButton provider="kakao" loading />
        </Section>

        {/* L2-02 StickyCTABar */}
        <Section
          prefix="L2"
          index={2}
          title="StickyCTABar"
          hint="화면 하단 고정 CTA + hint · safe-area-inset-bottom 처리"
          checks={[
            "sticky bottom + 상단 line-2 보더 (bordered=true)",
            "padding 12 20 24 + iOS 홈인디케이터 inset 추가",
            "메인 CTA + 보조 hint 텍스트 가운데 정렬",
            "<footer role='contentinfo'> 시맨틱",
          ]}
        >
          <p className="text-caption text-ink-3">실제 화면에서는 페이지 하단에 고정. 여기선 인라인 미리보기:</p>
          <div className="rounded-xl border border-line-2 bg-bg p-s-3">
            <StickyCTABar
              cta={
                <Button fullWidth trailing={<ArrowRight />}>
                  진단 시작
                </Button>
              }
              hint="평균 분석 4초 · 후보 6~8개 동네 추천"
            />
          </div>
        </Section>

        {/* L2-03 AddressInput + L2-04 SuggestList */}
        <Section
          prefix="L2"
          index={3}
          title="AddressInput + SuggestList"
          hint="진단 단계 주소 필드 + 자동완성 드롭다운 (combobox)"
          checks={[
            "tag A=primary, B=secondary 색 분리",
            "verified=true 시 우측 그린 체크, 아니면 search 아이콘",
            "focus 시 border-primary + 4px ring",
            "SuggestList: role=listbox + ↑↓Enter Esc 키보드 네비게이션",
            "highlighted 항목 bg-bg + aria-selected",
          ]}
        >
          <AddressInput
            tag="A"
            label="내 직장"
            value={addrA}
            onChange={() => {}}
            verified
          />
          <AddressInput
            tag="B"
            label="배우자 직장"
            value={addrB}
            onChange={setAddrB}
            placeholder="판교"
            suggestions={
              addrB.length > 0
                ? SUGGESTIONS_DEMO.filter((s) =>
                    s.title.includes(addrB) || s.sub.includes(addrB),
                  )
                : []
            }
            onSelect={(s) => setAddrB(s.title)}
          />
          <p className="text-caption text-ink-3">
            ※ 두 번째 필드에서 입력 후 Tab/↑↓ 로 자동완성 동작 확인
          </p>
        </Section>

        {/* L2-05 ModeSelector */}
        <Section
          prefix="L2"
          index={4}
          title="ModeSelector"
          hint="진단 모드 라디오 그룹 — 2칸 카드 그리드"
          checks={[
            "role=radiogroup + role=radio + aria-checked",
            "active: border-primary + bg-primary-soft + 우상단 18px 체크",
            "키보드 ←→ 이동 + Space/Enter 선택",
            "emoji는 aria-hidden / title이 의미 전달",
          ]}
        >
          <ModeSelector value={mode} onChange={setMode} />
          <p className="text-caption text-ink-3">
            현재 모드:{" "}
            <span className="font-bold text-ink">
              {mode === "couple" ? "커플" : mode === "single" ? "싱글" : "룸메이트"}
            </span>
          </p>
        </Section>

        {/* L2-06 TimeTabs */}
        <Section
          prefix="L2"
          index={5}
          title="TimeTabs"
          hint="result 출근시간대 선택 — segmented 4개"
          checks={[
            "container bg-bg + 3px padding + radius 10px",
            "active tab: 흰 배경 + shadow-sm",
            "옵션 ≥5면 가로 스크롤 + scroll-snap",
            "role=tablist 키보드 ←→ 이동",
          ]}
        >
          <TimeTabs
            value={time}
            onChange={setTime}
            options={TIME_OPTIONS}
            ariaLabel="출근 시간대"
          >
            <div className="rounded-md bg-surface-soft p-s-3 text-body-sm text-ink-2">
              <p className="text-caption-xs text-ink-3">선택된 시간대</p>
              <p className="tabular text-h3 text-ink">
                {time}시 출근 — 후보 6개
              </p>
            </div>
          </TimeTabs>
        </Section>

        {/* L2-07 FilterChip */}
        <Section
          prefix="L2"
          index={6}
          title="FilterChip"
          hint="라벨 + 값 필터 칩 · active 시 border-primary"
          checks={[
            "default: 흰 배경 + card-border",
            "active: border-primary + value 색 primary",
            "hover bg-bg, focus ring",
            "aria-label='{label} 필터, 현재값 {value}'",
          ]}
        >
          <div className="flex gap-s-2">
            <FilterChip label="통근시간" value="60분 이내" />
            <FilterChip
              label="예산"
              value={budgetActive ? "8억 이하" : "전체"}
              active={budgetActive}
              onClick={() => setBudgetActive((v) => !v)}
            />
          </div>
          <p className="text-caption text-ink-3">
            예산 칩 클릭 → active 토글 (border 색 변화)
          </p>
        </Section>

        {/* L2-08 DataSourceBadge */}
        <Section
          prefix="L2"
          index={7}
          title="DataSourceBadge"
          hint="share hero 데이터 출처 — kind dot color (official/aggregated/estimate)"
          checks={[
            "official(녹) / aggregated(파) / estimate(노) dot",
            "어두운 hero 위: bg-white/15 + backdrop-blur",
            "라이트 배경: bg-bg + line-2 보더",
            "role='img' + aria-label 종합 (출처+갱신일)",
          ]}
        >
          <p className="mb-s-2 text-caption text-ink-3">on-dark (hero 위)</p>
          <div className="rounded-xl bg-gradient-to-br from-primary-deep to-primary p-s-4">
            <div className="flex flex-wrap gap-s-2">
              <DataSourceBadge
                kind="official"
                source="공공데이터"
                updatedAt="2026.04"
              />
              <DataSourceBadge
                kind="aggregated"
                source="카카오 모빌리티"
                updatedAt="2026.04.01"
              />
              <DataSourceBadge kind="estimate" source="추정치" updatedAt="-" />
            </div>
          </div>
          <p className="mt-s-3 mb-s-2 text-caption text-ink-3">on-light</p>
          <div className="flex flex-wrap gap-s-2">
            <DataSourceBadge
              tone="on-light"
              kind="official"
              source="국토부 실거래가"
              updatedAt="2026.04"
            />
            <DataSourceBadge
              tone="on-light"
              kind="aggregated"
              source="TMAP API"
              updatedAt="2026.04.01"
            />
          </div>
        </Section>

        {/* L2-09 SafetyGradeBadge */}
        <Section
          prefix="L2"
          index={8}
          title="SafetyGradeBadge"
          hint="야간 안전 등급 — letter + label + 색 3중 표기"
          checks={[
            "A 매우 안전(녹) / B 안전(파) / C 주의(노) / D 위험(빨)",
            "letter는 aria-hidden, role='img' + aria-label 종합",
            "label 커스텀 가능 (default 매핑 사용)",
          ]}
        >
          <div className="flex flex-wrap gap-s-2">
            <SafetyGradeBadge grade="A" />
            <SafetyGradeBadge grade="B" />
            <SafetyGradeBadge grade="C" />
            <SafetyGradeBadge grade="D" />
          </div>
        </Section>

        {/* L2-10 CommuteChip */}
        <Section
          prefix="L2"
          index={9}
          title="CommuteChip"
          hint="A/B 통근 시간 칩 · chip(컴팩트) / row(detail)"
          checks={[
            "tag A=primary, B=secondary 사각",
            "mode 4종 아이콘 (지하철/버스/차량/도보)",
            "chip: border line-2 + 컴팩트 / row: card-border + shadow + full width",
            "aria-label='A 직장까지 지하철 18분, 환승 1회'",
          ]}
        >
          <div>
            <p className="mb-s-2 text-caption text-ink-3">chip 변형</p>
            <div className="flex flex-wrap gap-s-2">
              <CommuteChip tag="A" mode="subway" minutes={18} />
              <CommuteChip tag="B" mode="bus" minutes={32} />
              <CommuteChip tag="A" mode="car" minutes={25} />
              <CommuteChip tag="B" mode="walk" minutes={42} />
            </div>
          </div>
          <div className="space-y-s-2">
            <p className="text-caption text-ink-3">row 변형 (detail)</p>
            <CommuteChip
              tag="A"
              mode="subway"
              minutes={18}
              detail="환승 1회"
              variant="row"
            />
            <CommuteChip
              tag="B"
              mode="bus"
              minutes={32}
              detail="환승 2회"
              variant="row"
            />
          </div>
        </Section>

        {/* L2-11 LegendBar */}
        <Section
          prefix="L2"
          index={10}
          title="LegendBar"
          hint="A~D 등급 가이드 4-col flex"
          checks={[
            "4개 등급 chip 균등 분배",
            "각 chip = letter + label + 파스텔 색",
            "title + meta (예: '22:00–04:00 · 반경 1km')",
          ]}
        >
          <LegendBar
            title="야간 안전 등급 기준"
            meta="22:00–04:00 · 반경 1km"
          />
        </Section>

        {/* L2-12 SafetyBar */}
        <Section
          prefix="L2"
          index={11}
          title="SafetyBar"
          hint="값 + 4분위 tick + 등급별 fill 색 + IntersectionObserver 진입 애니메이션"
          checks={[
            "height 6px 고정 + radius xs",
            "fill 색은 grade(A=녹, B=파, C=노, D=빨) 파스텔",
            "4분위 tick (25/50/75) line-2",
            "IntersectionObserver 진입 시 380ms ease-out 채움",
            "role=progressbar + aria-valuenow + aria-label",
          ]}
        >
          <Card>
            <CardHeader>
              <CardTitle>야간 안전 지표 — 마포구 공덕동</CardTitle>
            </CardHeader>
            <CardContent className="space-y-s-3">
              <SafetyBar
                label="야간 범죄율 (10만명당)"
                value={0.84}
                unit="건"
                percent={28}
                grade="A"
              />
              <SafetyBar
                label="가로등 밀도"
                value={42}
                unit="%"
                percent={60}
                grade="B"
              />
              <SafetyBar
                label="유흥업소 비율"
                value={12}
                unit="%"
                percent={75}
                grade="C"
              />
              <SafetyBar
                label="우범 신고 건수"
                value={28}
                unit="건"
                percent={88}
                grade="D"
              />
            </CardContent>
          </Card>
        </Section>

        {/* L2-(추가) 통합 데모: 종합 placeholder */}
        <Section
          prefix="L2"
          index={12}
          title="통합 데모 (single 미리보기)"
          hint="LegendBar + SafetyGradeBadge + SafetyBar + Stat 결합"
          checks={[
            "single 페이지 카드 구조 미리 보기",
            "안전등급 우상단 + 본문 SafetyBar 다수 + 하단 Stat tile",
          ]}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-s-2">
                <div>
                  <CardTitle>마포구 공덕동</CardTitle>
                  <CardDescription>종합 안전 점수 88점</CardDescription>
                </div>
                <SafetyGradeBadge grade="B" />
              </div>
            </CardHeader>
            <CardContent className="space-y-s-3">
              <SafetyBar
                label="야간 범죄율 (10만명당)"
                value={0.84}
                unit="건"
                percent={32}
                grade="A"
              />
              <div className="grid grid-cols-3 gap-s-2 rounded-md bg-bg p-s-2">
                <Stat label="가로등" value="42" sub="%" />
                <Stat label="우범 신고" value="28" sub="건" />
                <Stat label="신뢰도" value="A" />
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* ═════════ STEP 4 · BASELINE (9개 — 이전 검증 완료) ═════════ */}
        <GroupHeading
          badge="STEP 4 · BASELINE — 9 (이전 검증 완료)"
          title="shadcn/ui 베이스 컴포넌트"
          hint="Button / Input / Card / Badge / Tabs / Sheet / Dialog / Separator / Skeleton"
          tone="muted"
        />

        {/* ───────── 1. Button ───────── */}
        <Section
          index={1}
          title="Button"
          hint="6 variants × 3 sizes — onClick 동작 확인"
          checks={[
            "default = primary 색 #2563EB · 글자 흰색",
            "secondary 보라(#7C3AED) · destructive 레드 솔리드",
            "outline = surface 흰 + card-border / ghost = transparent",
            "active 시 translateY(1px) 인터랙션",
            "포커스 링 2px primary + 2px offset",
          ]}
        >
          <div>
            <p className="mb-s-2 text-caption text-ink-3">Variants</p>
            <div className="grid grid-cols-2 gap-s-2">
              <Button onClick={() => setClicks((c) => c + 1)}>default</Button>
              <Button onClick={() => setClicks((c) => c + 1)}>primary</Button>
              <Button
                variant="secondary"
                onClick={() => setClicks((c) => c + 1)}
              >
                secondary
              </Button>
              <Button
                variant="destructive"
                onClick={() => setClicks((c) => c + 1)}
              >
                destructive
              </Button>
              <Button
                variant="outline"
                onClick={() => setClicks((c) => c + 1)}
              >
                outline
              </Button>
              <Button variant="ghost" onClick={() => setClicks((c) => c + 1)}>
                ghost
              </Button>
            </div>
          </div>

          <div>
            <p className="mb-s-2 text-caption text-ink-3">Sizes</p>
            <div className="flex flex-wrap items-end gap-s-2">
              <Button size="sm">sm 36px</Button>
              <Button>default 52px</Button>
              <Button size="lg">lg 60px</Button>
            </div>
          </div>

          <p className="text-caption text-ink-3">
            onClick 카운트:{" "}
            <span className="tabular text-title font-bold text-primary">
              {clicks}
            </span>
          </p>
        </Section>

        <Separator />

        {/* ───────── 2. Input + Label ───────── */}
        <Section
          index={2}
          title="Input + Label"
          hint="56px height · 1.5px border · focus 시 4px ring"
          checks={[
            "Input 56px / radius 12px / 1.5px border",
            "focus 시 border-primary + 4px ring (rgba 0.10)",
            "placeholder 한글 정상 (이름·이메일·검색어)",
            "Label = 12px/700 · 폼 그룹 시각 정렬",
          ]}
        >
          <div className="space-y-s-2">
            <Label htmlFor="dev-name">이름</Label>
            <div className="flex items-center gap-s-2">
              <span className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary">
                <User className="size-4" />
              </span>
              <Input
                id="dev-name"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            {name && (
              <p className="text-caption text-ink-3">
                안녕하세요, <span className="text-ink">{name}</span>님 👋
              </p>
            )}
          </div>

          <div className="space-y-s-2">
            <Label htmlFor="dev-email">이메일</Label>
            <Input
              id="dev-email"
              type="email"
              placeholder="이메일"
              autoComplete="email"
            />
          </div>

          <div className="space-y-s-2">
            <Label htmlFor="dev-search">검색</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-3" />
              <Input
                id="dev-search"
                inputMode="search"
                placeholder="검색어"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-s-2">
            <Label htmlFor="dev-disabled">비활성</Label>
            <Input
              id="dev-disabled"
              disabled
              defaultValue="입력 비활성 상태"
            />
          </div>
        </Section>

        <Separator />

        {/* ───────── 3. Card ───────── */}
        <Section
          index={3}
          title="Card"
          hint="Header + Content + Footer 풀 구조 — 결과 카드 미리보기"
          checks={[
            "border 1px #E5E7EB / radius 12px / shadow-card",
            "기본 배경 흰색 · accent 카드는 primary-soft + primary border",
            "Footer 상단 구분선(line-2) — 시각 분리",
            "내부 통근시간 / 매가 / 안전등급 mock 표시",
          ]}
        >
          <Card>
            <CardHeader>
              <CardTitle>서울 마포구 공덕동</CardTitle>
              <CardDescription>
                평균 통근 31분 · 평균 매매 9.2억
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-s-2">
                <Badge>A 통근 25분</Badge>
                <Badge>B 통근 38분</Badge>
                <Badge variant="ok">
                  <Check /> 검증됨
                </Badge>
                <Badge variant="grade-b">B · 안전</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                상세 보기 <ArrowRight />
              </Button>
            </CardFooter>
          </Card>

          <Card variant="accent">
            <CardHeader>
              <CardTitle>BEST · 동작구 흑석동</CardTitle>
              <CardDescription>최적 점수 92점</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-sm text-ink-2">
                두 사람의 통근 시간이 가장 균형 잡힌 동네입니다.
              </p>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ───────── 4. Badge ───────── */}
        <Section
          index={4}
          title="Badge"
          hint="기본 4 + 안전등급 4 + DataSourceBadge"
          checks={[
            "default = primary-soft / secondary = 보라 솔리드",
            "destructive = danger-soft+text",
            "안전등급 = letter + 라벨 + 파스텔 색 3중 표기",
            "DataSourceBadge = ok 변형 (공공데이터 출처)",
          ]}
        >
          <div>
            <p className="mb-s-2 text-caption text-ink-3">Variants 4종</p>
            <div className="flex flex-wrap gap-s-2">
              <Badge>default</Badge>
              <Badge variant="secondary">secondary</Badge>
              <Badge variant="destructive">destructive</Badge>
              <Badge variant="outline">outline</Badge>
            </div>
          </div>

          <div>
            <p className="mb-s-2 text-caption text-ink-3">
              안전등급 (letter + 라벨 + 색)
            </p>
            <div className="flex flex-wrap gap-s-2">
              <Badge variant="grade-a">A · 매우 안전</Badge>
              <Badge variant="grade-b">B · 안전</Badge>
              <Badge variant="grade-c">C · 보통</Badge>
              <Badge variant="grade-d">D · 주의</Badge>
            </div>
          </div>

          <div>
            <p className="mb-s-2 text-caption text-ink-3">DataSourceBadge</p>
            <div className="flex flex-wrap gap-s-2">
              <Badge variant="ok">
                <Check /> 공공데이터 2024.01
              </Badge>
              <Badge variant="info">출처 · 국토부 실거래가</Badge>
              <Badge variant="neutral">분석 · TMAP API</Badge>
            </div>
          </div>
        </Section>

        <Separator />

        {/* ───────── 5. Tabs ───────── */}
        <Section
          index={5}
          title="Tabs (TimeTabs 미리보기)"
          hint="평일 출근 / 평일 퇴근 / 주말"
          checks={[
            "container = bg(--bg) + 3px padding + 10px radius",
            "active tab = 흰 배경 + shadow-sm + ink 텍스트",
            "비활성 tab = ink-3 텍스트 + transparent",
            "180ms ease 트랜지션",
          ]}
        >
          <Tabs defaultValue="weekday-am">
            <TabsList className="w-full">
              <TabsTrigger value="weekday-am">평일 출근</TabsTrigger>
              <TabsTrigger value="weekday-pm">평일 퇴근</TabsTrigger>
              <TabsTrigger value="weekend">주말</TabsTrigger>
            </TabsList>
            <TabsContent value="weekday-am" className="pt-s-3">
              <div className="space-y-s-2 rounded-md bg-surface-soft p-s-3">
                <p className="text-caption-xs text-ink-3">평일 오전 통근</p>
                <p className="tabular text-h3 text-ink">A 25분 / B 38분</p>
                <p className="text-body-sm text-ink-3">평균 31.5분 · 환승 2회</p>
              </div>
            </TabsContent>
            <TabsContent value="weekday-pm" className="pt-s-3">
              <div className="space-y-s-2 rounded-md bg-surface-soft p-s-3">
                <p className="text-caption-xs text-ink-3">평일 오후 퇴근</p>
                <p className="tabular text-h3 text-ink">A 28분 / B 41분</p>
                <p className="text-body-sm text-ink-3">평균 34.5분 · 환승 2회</p>
              </div>
            </TabsContent>
            <TabsContent value="weekend" className="pt-s-3">
              <div className="space-y-s-2 rounded-md bg-surface-soft p-s-3">
                <p className="text-caption-xs text-ink-3">주말 이동</p>
                <p className="tabular text-h3 text-ink">A 18분 / B 22분</p>
                <p className="text-body-sm text-ink-3">평균 20분 · 환승 1회</p>
              </div>
            </TabsContent>
          </Tabs>
        </Section>

        <Separator />

        {/* ───────── 6. Sheet ───────── */}
        <Section
          index={6}
          title="Sheet (BottomSheet)"
          hint="모바일 우선 — 하단에서 슬라이드 업"
          checks={[
            "side=bottom · top-radius 24px · shadow-sheet",
            "overlay = ink/45 (ink 기반 dim)",
            "280ms cubic-bezier(.32,.72,0,1) 모션",
            "상단 핸들바 + 우상단 floating close 버튼",
          ]}
        >
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" className="w-full">
                  <MapPin />
                  공덕동 상세 시트 열기
                </Button>
              }
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle>마포구 공덕동</SheetTitle>
                <SheetDescription>
                  종합 점수 92점 · 평균 통근 31분
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-s-3 py-s-3">
                <div className="grid grid-cols-2 gap-s-2">
                  <Card size="sm">
                    <CardContent>
                      <p className="text-caption-xs text-ink-3">A 통근</p>
                      <p className="tabular text-title font-bold text-ink">
                        25분
                      </p>
                    </CardContent>
                  </Card>
                  <Card size="sm">
                    <CardContent>
                      <p className="text-caption-xs text-ink-3">B 통근</p>
                      <p className="tabular text-title font-bold text-ink">
                        38분
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex flex-wrap gap-s-2">
                  <Badge variant="grade-b">B · 안전</Badge>
                  <Badge variant="ok">
                    <Check /> 검증됨
                  </Badge>
                  <Badge variant="info">국토부 실거래가</Badge>
                </div>
              </div>
              <SheetFooter>
                <Button>저장하기</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Section>

        <Separator />

        {/* ───────── 7. Dialog ───────── */}
        <Section
          index={7}
          title="Dialog (공유 링크 생성)"
          hint="ESC / 배경 클릭으로 닫기"
          checks={[
            "modal-in 200ms 페이드 + 95% scale",
            "overlay = ink/45 dim",
            "포커스 트랩 + ESC 닫기",
            "닫기 버튼 우상단 ghost icon-sm",
          ]}
        >
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" className="w-full">
                  <Share2 />
                  공유 링크 생성
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>공유 링크 생성</DialogTitle>
                <DialogDescription>
                  진단 결과를 7일간 유효한 링크로 만들어 친구에게 공유합니다.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-s-2">
                <Label htmlFor="dlg-link">생성될 링크</Label>
                <div className="flex items-center gap-s-2 rounded-md bg-surface-soft px-s-3 py-s-2">
                  <LinkIcon className="size-4 text-ink-3" />
                  <code className="flex-1 truncate text-body-sm text-ink">
                    onday.app/r/abc123xyz
                  </code>
                </div>
                <p className="text-caption text-ink-3">
                  유효기간 7일 · 잠긴 카드는 비공개로 표시됩니다.
                </p>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost">취소</Button>} />
                <DialogClose render={<Button>링크 복사</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Separator />

        {/* ───────── 8. Separator ───────── */}
        <Section
          index={8}
          title="Separator"
          hint="가로 / 세로 / 카드 내부"
          checks={[
            "color = line-2 (#EEF1F6)",
            "horizontal = h-px / vertical = w-px",
            "카드 내부 inner divider 통일",
          ]}
        >
          <div className="space-y-s-2">
            <p className="text-caption text-ink-3">가로 (전체 너비)</p>
            <Separator />
          </div>

          <div className="space-y-s-2">
            <p className="text-caption text-ink-3">세로 (높이 24px)</p>
            <div className="flex h-6 items-center gap-s-3 text-body-sm text-ink-2">
              <span>커플</span>
              <Separator orientation="vertical" />
              <span>싱글</span>
              <Separator orientation="vertical" />
              <span>데드라인</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>카드 내부 구분</CardTitle>
            </CardHeader>
            <CardContent className="space-y-s-2">
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-ink-3">A 통근</span>
                <span className="tabular font-bold text-ink">25분</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-ink-3">B 통근</span>
                <span className="tabular font-bold text-ink">38분</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-ink-3">평균 매가</span>
                <span className="tabular font-bold text-ink">9.2억</span>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ───────── 9. Skeleton ───────── */}
        <Section
          index={9}
          title="Skeleton"
          hint="CandidateCard 로딩 모양 + 텍스트 라인"
          checks={[
            "bg = surface-soft · animate-pulse-soft 1.6s",
            "radius = md (8px) — 카드 외형과 자연스럽게 매칭",
            "결과 카드 / 텍스트 라인 두 가지 패턴",
          ]}
        >
          <div className="space-y-s-2">
            <p className="text-caption text-ink-3">텍스트 로딩</p>
            <div className="space-y-s-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          <div className="space-y-s-2">
            <p className="text-caption text-ink-3">CandidateCard 로딩</p>
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="mt-s-1 h-4 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-s-2">
                <div className="flex gap-s-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-24 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          </div>
        </Section>

        <Separator />

        {/* ───────── 푸터 ───────── */}
        <footer className="space-y-s-3 rounded-2xl border border-line-2 bg-surface p-s-4 text-center shadow-card">
          <Calendar className="mx-auto size-6 text-primary" />
          <h2 className="text-h4 text-ink">검증 완료 시 다음 단계</h2>
          <p className="text-body-sm text-ink-3">
            모든 컴포넌트가 의도한 시각 출력을 내고 있다면, 커밋 후 Step 5(31개
            커스텀 컴포넌트)로 진행합니다.
          </p>
          <div className="flex justify-center gap-s-2">
            <Button size="sm" variant="outline">
              <RefreshCw />
              새로고침
            </Button>
            <Button size="sm">
              Step 5 시작 <ArrowRight />
            </Button>
          </div>
        </footer>
      </div>
    </main>
  );
}
