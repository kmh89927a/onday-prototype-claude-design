"use client";

import { ArrowRight, Check, MapPin, RefreshCw, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

export default function ComponentSamplePage() {
  return (
    <main className="min-h-screen bg-bg p-s-5">
      <div className="mx-auto max-w-md space-y-s-7">
        <header className="space-y-s-1">
          <h1 className="text-h2 text-ink">Step 4 — 컴포넌트 검증</h1>
          <p className="text-body-sm text-ink-3">
            shadcn/ui base 컴포넌트 + 온데이 디자인 토큰 적용 결과
          </p>
        </header>

        {/* ───────── Buttons ───────── */}
        <section className="space-y-s-3">
          <h2 className="text-h3 text-ink">Buttons</h2>

          <div className="space-y-s-2">
            <Button className="w-full">
              진단 시작 <ArrowRight />
            </Button>
            <Button variant="outline" className="w-full">
              이전 조건 불러오기
            </Button>
            <Button variant="ghost" className="w-full">
              Ghost
            </Button>
            <Button variant="destructive" className="w-full">
              삭제
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-s-2">
            <Button variant="kakao">
              <span className="font-bold">카카오로 시작</span>
            </Button>
            <Button variant="naver">
              <span className="font-bold">네이버로 시작</span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-s-2">
            <Button size="sm">sm</Button>
            <Button size="sm" variant="outline">
              <RefreshCw />
              재로드
            </Button>
            <Button size="single-foot">single-foot</Button>
            <Button disabled>비활성</Button>
          </div>
        </section>

        <Separator />

        {/* ───────── Inputs / Form ───────── */}
        <section className="space-y-s-3">
          <h2 className="text-h3 text-ink">Inputs & Labels</h2>
          <div className="space-y-s-3">
            <div className="space-y-s-2">
              <Label htmlFor="addr-a">내 직장</Label>
              <div className="flex items-center gap-s-2">
                <span className="inline-flex size-6 items-center justify-center rounded-sm bg-primary text-caption-xs font-bold text-primary-foreground">
                  A
                </span>
                <Input
                  id="addr-a"
                  placeholder="주소를 입력하세요"
                  defaultValue="서울 강남구 테헤란로 152"
                />
              </div>
            </div>
            <div className="space-y-s-2">
              <Label htmlFor="addr-b">배우자 직장</Label>
              <div className="flex items-center gap-s-2">
                <span className="inline-flex size-6 items-center justify-center rounded-sm bg-secondary text-caption-xs font-bold text-secondary-foreground">
                  B
                </span>
                <Input id="addr-b" placeholder="판교" />
              </div>
            </div>
            <div className="space-y-s-2">
              <Label htmlFor="addr-c">비활성</Label>
              <Input id="addr-c" disabled defaultValue="입력 비활성 상태" />
            </div>
            <div className="space-y-s-2">
              <Label htmlFor="addr-d">에러</Label>
              <Input id="addr-d" aria-invalid defaultValue="잘못된 주소" />
            </div>
          </div>
        </section>

        <Separator />

        {/* ───────── Cards ───────── */}
        <section className="space-y-s-3">
          <h2 className="text-h3 text-ink">Cards</h2>

          <Card>
            <CardHeader>
              <CardTitle>서울 마포구 공덕동</CardTitle>
              <CardDescription>
                평균 통근 31분 · 평균 매매 9.2억
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-s-2">
              <Badge variant="default">A 25분</Badge>
              <Badge variant="default">B 38분</Badge>
              <Badge variant="ok">
                <Check /> 검증됨
              </Badge>
            </CardContent>
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

          <Card size="sm">
            <CardHeader>
              <CardTitle>sm 사이즈 카드</CardTitle>
            </CardHeader>
            <CardContent className="text-body-sm text-ink-3">
              컴팩트 카드 (mode-card 등에서 사용)
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* ───────── Badges ───────── */}
        <section className="space-y-s-3">
          <h2 className="text-h3 text-ink">Badges</h2>

          <div>
            <p className="mb-s-2 text-caption text-ink-3">상태</p>
            <div className="flex flex-wrap gap-s-2">
              <Badge>default</Badge>
              <Badge variant="solid">solid</Badge>
              <Badge variant="ok">OK · 검증됨</Badge>
              <Badge variant="info">info</Badge>
              <Badge variant="warning">warning</Badge>
              <Badge variant="neutral">neutral</Badge>
              <Badge variant="danger">danger</Badge>
              <Badge variant="outline">outline</Badge>
            </div>
          </div>

          <div>
            <p className="mb-s-2 text-caption text-ink-3">
              안전 등급 (letter + label + 색 3중 표기)
            </p>
            <div className="flex flex-wrap gap-s-2">
              <Badge variant="grade-a">A · 매우 안전</Badge>
              <Badge variant="grade-b">B · 안전</Badge>
              <Badge variant="grade-c">C · 주의</Badge>
              <Badge variant="grade-d">D · 위험</Badge>
            </div>
          </div>
        </section>

        <Separator />

        {/* ───────── Tabs ───────── */}
        <section className="space-y-s-3">
          <h2 className="text-h3 text-ink">Tabs</h2>

          <p className="text-caption text-ink-3">Segmented (default)</p>
          <Tabs defaultValue="weekday">
            <TabsList className="w-full">
              <TabsTrigger value="weekday">평일</TabsTrigger>
              <TabsTrigger value="weekend">주말</TabsTrigger>
              <TabsTrigger value="night">야간</TabsTrigger>
            </TabsList>
            <TabsContent value="weekday" className="pt-s-3">
              <p className="text-body-sm text-ink-2">평일 출퇴근 통근시간</p>
            </TabsContent>
            <TabsContent value="weekend" className="pt-s-3">
              <p className="text-body-sm text-ink-2">주말 이동시간</p>
            </TabsContent>
            <TabsContent value="night" className="pt-s-3">
              <p className="text-body-sm text-ink-2">야간 안전 등급</p>
            </TabsContent>
          </Tabs>

          <p className="text-caption text-ink-3">Line (underline)</p>
          <Tabs defaultValue="all">
            <TabsList variant="line" className="w-full">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="recommend">추천</TabsTrigger>
              <TabsTrigger value="saved">저장</TabsTrigger>
            </TabsList>
          </Tabs>
        </section>

        <Separator />

        {/* ───────── Sheet (bottom) ───────── */}
        <section className="space-y-s-3">
          <h2 className="text-h3 text-ink">Bottom Sheet</h2>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" className="w-full">
                  <MapPin />
                  동네 상세 시트 열기
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
                <Skeleton className="h-32 w-full" />
              </div>
              <SheetFooter>
                <Button>저장하기</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </section>

        <Separator />

        {/* ───────── Dialog ───────── */}
        <section className="space-y-s-3">
          <h2 className="text-h3 text-ink">Dialog</h2>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" className="w-full">
                  <Search />
                  주소 검색 다이얼로그
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>이전 조건 불러오기</DialogTitle>
                <DialogDescription>
                  최근 진단 결과로 설정을 복원할까요?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost">취소</Button>} />
                <DialogClose render={<Button>불러오기</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        <Separator />

        {/* ───────── Skeleton ───────── */}
        <section className="space-y-s-3">
          <h2 className="text-h3 text-ink">Skeleton</h2>
          <div className="space-y-s-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-32 w-full" />
          </div>
        </section>
      </div>
    </main>
  );
}
