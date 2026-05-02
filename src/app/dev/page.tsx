"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Link as LinkIcon,
  MapPin,
  Maximize2,
  RefreshCw,
  Search,
  Share2,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  index,
  title,
  hint,
  children,
  checks,
}: {
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
          SECTION {index.toString().padStart(2, "0")}
        </p>
        <h2 className="text-h3 text-ink">{title}</h2>
        {hint && <p className="mt-s-1 text-body-sm text-ink-3">{hint}</p>}
      </header>
      <div className="space-y-s-3">{children}</div>
      <CheckList items={checks} />
    </section>
  );
}

export default function DevSamplePage() {
  const [clicks, setClicks] = useState(0);
  const [name, setName] = useState("");

  return (
    <main className="min-h-screen bg-bg p-s-5">
      <div className="mx-auto max-w-md space-y-s-7 pb-s-10">
        {/* ───────── 헤더 ───────── */}
        <header className="space-y-s-2">
          <div className="flex items-center gap-s-2">
            <Badge variant="solid">_dev</Badge>
            <Badge variant="ok">Step 4</Badge>
          </div>
          <h1 className="text-h2 text-ink">시각 검증 페이지</h1>
          <p className="text-body-sm text-ink-3">
            shadcn/ui 9개 컴포넌트 + 온데이 디자인 토큰 적용 결과를 한 화면에서
            검토합니다.
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
