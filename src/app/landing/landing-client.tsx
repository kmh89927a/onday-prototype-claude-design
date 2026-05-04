"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight, MapPin, Clock, Shield, Users, Zap, ChevronDown, Star,
  Home, TrendingUp, CheckCircle2, BookOpen, CalendarClock, Heart,
  Share2, Save, AlertTriangle, Target, GraduationCap, Bell,
} from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, MotionConfig } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

/* ── Hero ── */
function HeroSection() {
  return (
    <motion.section {...fadeUp} id="hero" className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-s-5 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(221 83% 53% / 0.15) 0%, transparent 70%), linear-gradient(180deg, hsl(var(--bg)) 0%, hsl(var(--primary-soft)) 50%, hsl(var(--bg)) 100%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <span key={`dot-${i}`} className="absolute rounded-full bg-primary/10 animate-pulse-soft" style={{ width: `${12 + i * 8}px`, height: `${12 + i * 8}px`, top: `${15 + i * 14}%`, left: `${10 + ((i * 17) % 80)}%`, animationDelay: `${i * 0.3}s` }} />
        ))}
      </div>

      <div className="mx-auto max-w-xl md:max-w-2xl space-y-s-6">
        <Logo size="lg" className="mx-auto" />

        {/* 핵심 Pain 자극 뱃지 */}
        <div className="mx-auto flex w-fit items-center gap-s-2 rounded-chip border border-warning/30 bg-warning-soft px-s-4 py-1.5">
          <AlertTriangle className="size-3.5 text-warning" />
          <span className="text-caption-xs font-bold text-warning">이사 가구 연 800만 · 입지 실패 25%</span>
        </div>

        <h1 className="text-display-2 font-extrabold leading-[1.15] tracking-[-0.03em] text-ink sm:text-display-1 md:text-5xl lg:text-6xl">
          주말 6시간 발품을,
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            6초 진단으로
          </span>
        </h1>

        <p className="mx-auto max-w-sm text-body-lg md:text-xl lg:text-2xl leading-relaxed text-ink-2">
          복잡한 비교는 AI에게,
          <br />
          <strong className="text-ink">부부는 결정만.</strong>
        </p>

        <p className="mx-auto max-w-sm text-body-sm md:text-base lg:text-lg leading-relaxed text-ink-3">
          남편 직장 + 아내 직장 + 아이 학군,
          <br />
          세 가지를 동시에 만족하는 동네를 찾아드려요.
        </p>

        <div className="flex flex-col items-center gap-s-3 pt-s-2">
          <Link href="/login" className="w-full max-w-xs">
            <Button fullWidth size="lg" trailing={<ArrowRight />}>
              지금 무료로 진단 시작하기
            </Button>
          </Link>
          <p className="text-caption text-ink-3">
            회원가입 없이 · 게스트 체험 가능 · 데이터 자동 삭제
          </p>
        </div>
      </div>

      <button onClick={() => document.getElementById("pain")?.scrollIntoView({ behavior: "smooth" })} className="absolute bottom-8 animate-bounce text-ink-3 transition-colors hover:text-primary" aria-label="아래로 스크롤">
        <ChevronDown className="size-6" />
      </button>
    </motion.section>
  );
}

/* ── Pain Points ── */
function PainSection() {
  const pains = [
    { icon: Target, title: "트레이드오프 마비", desc: "학군 좋은 곳은 직장에서 멀고,\n직장 가까운 곳은 학교가 아쉬움", severity: "5.0" },
    { icon: Clock, title: "정보 과부하", desc: "학군카페·네이버 지도·부동산앱·통근앱\n수동 조합에 평균 2~3시간", severity: "5.0" },
    { icon: CalendarClock, title: "미래 시뮬레이션 불가", desc: "아이 입학 시점·전세 만료 등\n미래 변수 반영 도구 전무", severity: "5.0" },
  ];
  return (
    <motion.section {...fadeUp} id="pain" className="bg-surface px-s-5 py-s-10">
      <div className="mx-auto max-w-xl md:max-w-3xl space-y-s-6">
        <div className="space-y-s-2 text-center">
          <p className="text-caption-xs font-bold tracking-widest text-danger">PAIN POINT</p>
          <h2 className="text-h2 md:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            3040 부부가 겪는
            <br />3가지 구조적 문제
          </h2>
          <p className="text-body-sm md:text-base text-ink-3">심각도 조사 결과, 모두 <strong className="text-danger">최고 등급 5.0</strong></p>
        </div>
        <div className="space-y-s-3">
          {pains.map((p, i) => (
            <article key={p.title} className="flex gap-s-4 rounded-2xl border border-card-border bg-bg p-s-5 shadow-card">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-danger-soft">
                <p.icon className="size-5 text-danger" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-s-2">
                  <h3 className="text-title font-bold text-ink">{p.title}</h3>
                  <span className="rounded-chip bg-danger/10 px-2 py-0.5 text-caption-xs font-bold text-danger tabular">{p.severity}</span>
                </div>
                <p className="mt-s-1 whitespace-pre-line text-body-sm md:text-base leading-relaxed text-ink-3">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary-soft/50 p-s-5 text-center">
          <p className="text-body-sm font-bold text-primary">💡 의사결정 단위가 &lsquo;부부&rsquo;이므로</p>
          <p className="mt-s-1 text-body-sm text-ink-2">한 사람의 납득만으로는 이사가 진행되지 않습니다.<br />배우자 설득용 데이터가 핵심 전환 레버입니다.</p>
        </div>
      </div>
    </motion.section>
  );
}

/* ── I/O Diagram ── */
function InputOutputSection() {
  return (
    <motion.section {...fadeUp} id="how" className="px-s-5 py-s-10">
      <div className="mx-auto max-w-xl md:max-w-3xl space-y-s-7 text-center">
        <div className="space-y-s-2">
          <p className="text-caption-xs font-bold tracking-widest text-primary">HOW IT WORKS</p>
          <h2 className="text-h2 md:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">복잡한 건 AI가,<br />결과만 확인하세요</h2>
        </div>
        <div className="space-y-s-4">
          <div className="rounded-2xl border border-card-border bg-surface p-s-5 shadow-card">
            <p className="mb-s-3 text-caption font-bold text-ink-3">INPUT — 30초면 끝</p>
            <div className="flex items-center justify-center gap-s-3 flex-wrap">
              {[
                { icon: MapPin, label: "내 직장", color: "bg-primary-soft text-primary" },
                { icon: MapPin, label: "배우자 직장", color: "bg-[hsl(262_83%_95%)] text-secondary" },
                { icon: GraduationCap, label: "아이 학군", color: "bg-warning-soft text-warning" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-s-1">
                  <span className={cn("flex size-10 items-center justify-center rounded-xl", item.color.split(" ")[0])}>
                    <item.icon className={cn("size-5", item.color.split(" ")[1])} />
                  </span>
                  <span className="text-caption font-medium text-ink-2">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-s-1">
            <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-marker">
              <Zap className="size-5 text-white" />
            </div>
            <span className="text-caption-xs font-bold text-primary">AI 동선 교차 분석 · 6초</span>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary-soft/50 p-s-5 shadow-card">
            <p className="mb-s-3 text-caption font-bold text-primary">OUTPUT</p>
            <div className="grid grid-cols-4 gap-s-2">
              {[
                { icon: Home, label: "최적 동네\n6~8곳" },
                { icon: Shield, label: "안전등급\nA~D" },
                { icon: TrendingUp, label: "시세·매물\n연결" },
                { icon: GraduationCap, label: "학군·학원\n통합" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-s-1">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-surface shadow-card"><Icon className="size-4 text-primary" /></span>
                  <span className="whitespace-pre-line text-center text-caption-xs font-medium leading-snug text-ink-2">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ── Before/After ── */
function BeforeAfterSection() {
  return (
    <motion.section {...fadeUp} className="bg-surface px-s-5 py-s-10">
      <div className="mx-auto max-w-xl md:max-w-3xl space-y-s-6">
        <div className="space-y-s-2 text-center">
          <p className="text-caption-xs font-bold tracking-widest text-primary">BEFORE & AFTER</p>
          <h2 className="text-h2 md:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">이사 리서치,<br />이렇게 달라져요</h2>
        </div>
        <div className="grid grid-cols-2 gap-s-3">
          <div className="rounded-2xl border border-danger/20 bg-danger-soft p-s-4 space-y-s-3">
            <span className="inline-block rounded-chip bg-danger/10 px-s-3 py-1 text-caption-xs font-bold text-danger">BEFORE</span>
            <div className="space-y-s-2">
              {["주말 6시간 발품", "앱 4~5개 번갈아", "학군카페 2주 탐색", "배우자 설득 근거 없음"].map((t) => (
                <div key={t} className="flex items-center gap-s-2 text-body-sm md:text-base text-ink-2">
                  <Clock className="size-4 shrink-0 text-danger" /><span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-success/20 bg-success-soft p-s-4 space-y-s-3">
            <span className="inline-block rounded-chip bg-success/10 px-s-3 py-1 text-caption-xs font-bold text-success">AFTER</span>
            <div className="space-y-s-2">
              {[
                { t: "6초 AI 진단", bold: "6초" },
                { t: "한 화면에 모두", bold: "한 화면" },
                { t: "학군+통근 통합", bold: "통합" },
                { t: "공유 링크로 합의", bold: "합의" },
              ].map(({ t, bold }) => (
                <div key={t} className="flex items-center gap-s-2 text-body-sm md:text-base text-ink-2">
                  <CheckCircle2 className="size-4 shrink-0 text-success" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-s-4 rounded-2xl bg-primary-soft/60 p-s-5">
          <div className="text-center">
            <p className="text-display-2 font-extrabold text-primary tabular">98%</p>
            <p className="text-caption text-ink-3">시간 절약</p>
          </div>
          <div aria-hidden className="h-10 w-px bg-line" />
          <p className="text-body-sm md:text-base leading-relaxed text-ink-2">
            주말 <strong className="text-ink">6시간 발품</strong> →{" "}
            <strong className="text-primary">6초 AI 진단</strong>
            <br />이사 리서치를 극적으로 단축
          </p>
        </div>
      </div>
    </motion.section>
  );
}

/* ── 5대 핵심 기능 (Value Prop) ── */
function ValueProposition() {
  const features = [
    { icon: MapPin, title: "F1. 두 동선 교차 진단", desc: "남편 직장 + 아내 직장 교집합에서 최적 동네를 자동 산출. 서비스의 핵심 정체성.", tag: "AOS 4.00 — 1위", accent: "primary" as const },
    { icon: Share2, title: "F2. 배우자 공유 링크", desc: "비회원도 열람 가능한 결과 공유. 부부 합의 돌파의 핵심 전환 레버.", tag: "바이럴 루프", accent: "secondary" as const },
    { icon: CalendarClock, title: "F3. 데드라인 모드", desc: "전세 만료 D-Day 역산 타임라인 + 네이버 부동산 매물 아웃링크.", tag: "AOS 3.80", accent: "warning" as const },
    { icon: Shield, title: "F4. 싱글 모드", desc: "학군 숨김, 야간 치안·편의시설 강조. 1인 가구 맞춤 분석.", tag: "1인가구", accent: "success" as const },
    { icon: Save, title: "F5. 간이 저장", desc: "입력값 자동 저장 + 불러오기. 2년 주기 발령 교사도 재사용 가능.", tag: "재방문", accent: "primary" as const },
  ];
  const accentMap = {
    primary: { bg: "bg-primary-soft", text: "text-primary" },
    success: { bg: "bg-success-soft", text: "text-success" },
    secondary: { bg: "bg-[hsl(262_83%_95%)]", text: "text-secondary" },
    warning: { bg: "bg-warning-soft", text: "text-warning" },
  };
  return (
    <motion.section {...fadeUp} className="px-s-5 py-s-10">
      <div className="mx-auto max-w-xl md:max-w-3xl space-y-s-6">
        <div className="space-y-s-2 text-center">
          <p className="text-caption-xs font-bold tracking-widest text-primary">SOLUTION — 5대 핵심 기능</p>
          <h2 className="text-h2 md:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">왜 동네궁합인가요?</h2>
          <p className="text-body-sm md:text-base text-ink-3">기능이 아닌, 당신이 얻을 <strong className="text-ink">가치</strong>를 말해요</p>
        </div>
        <div className="space-y-s-3">
          {features.map((f) => (
            <article key={f.title} className="group flex gap-s-4 rounded-2xl border border-card-border bg-surface p-s-5 shadow-card transition-shadow duration-220 hover:shadow-card-hover">
              <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", accentMap[f.accent].bg)}>
                <f.icon className={cn("size-5", accentMap[f.accent].text)} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-s-2">
                  <h3 className="text-title font-bold text-ink">{f.title}</h3>
                  <span className={cn("rounded-chip px-2 py-0.5 text-caption-xs font-bold", accentMap[f.accent].bg, accentMap[f.accent].text)}>{f.tag}</span>
                </div>
                <p className="mt-s-1 text-body-sm md:text-base leading-relaxed text-ink-3">{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ── Persona Testimonials ── */
function PersonaSection() {
  const personas = [
    { name: "김지영", age: 36, type: "워킹맘", quote: "남편 판교, 저 여의도. 매주 주말 6시간씩 발품 팔았는데, 여기선 6초에 답이 나왔어요. 공유 링크로 남편 설득 성공!", feature: "F1 교차 진단 + F2 공유", stars: 5 },
    { name: "정우진", age: 38, type: "긴급이사", quote: "전세 만료 D-2개월, 마감 역산 타임라인이 정말 생명이었습니다. 매물 링크도 바로 연결돼서 시간 절약 엄청났어요.", feature: "F3 데드라인 모드", stars: 5 },
    { name: "박상민", age: 41, type: "맹모 아빠", quote: "대치 학군 vs 광역버스 통근, 둘 다 포기 못하는데 교집합 동네를 찾아줘서 부부싸움이 줄었습니다.", feature: "F1 + 학군 레이어", stars: 5 },
  ];
  return (
    <motion.section {...fadeUp} className="bg-surface px-s-5 py-s-10">
      <div className="mx-auto max-w-xl md:max-w-3xl space-y-s-6">
        <div className="space-y-s-2 text-center">
          <p className="text-caption-xs font-bold tracking-widest text-primary">REAL STORIES</p>
          <h2 className="text-h2 md:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">3040 부부의 실제 이야기</h2>
        </div>
        <div className="space-y-s-3">
          {personas.map((p) => (
            <article key={p.name} className="rounded-2xl border border-card-border bg-bg p-s-5 shadow-card">
              <div className="mb-s-2 flex gap-0.5">
                {Array.from({ length: p.stars }).map((_, i) => (
                  <Star key={`s-${p.name}-${i}`} className="size-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-body-sm md:text-base leading-relaxed text-ink-2">&ldquo;{p.quote}&rdquo;</p>
              <div className="mt-s-3 flex items-center justify-between">
                <div className="flex items-center gap-s-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-caption font-bold text-primary">{p.name[0]}</span>
                  <div>
                    <p className="text-caption font-bold text-ink">{p.name} ({p.age})</p>
                    <p className="text-caption-xs text-ink-3">{p.type}</p>
                  </div>
                </div>
                <span className="rounded-chip bg-primary-soft px-2 py-0.5 text-caption-xs font-bold text-primary">{p.feature}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ── Market & Trust ── */
function MarketSection() {
  return (
    <motion.section {...fadeUp} className="px-s-5 py-s-10">
      <div className="mx-auto max-w-xl md:max-w-3xl space-y-s-6">
        <div className="space-y-s-2 text-center">
          <p className="text-caption-xs font-bold tracking-widest text-primary">MARKET INSIGHT</p>
          <h2 className="text-h2 md:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">왜 지금인가요?</h2>
        </div>
        <div className="grid grid-cols-2 gap-s-3">
          {[
            { value: "800만+", label: "연간 이사 가구", sub: "수도권 45%" },
            { value: "$470억", label: "글로벌 프롭테크", sub: "CAGR 16%" },
            { value: "0개", label: "직접 경쟁자", sub: "블루오션" },
            { value: "6초", label: "AI 분석 시간", sub: "실시간 결과" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-s-1 rounded-2xl border border-card-border bg-surface p-s-4 shadow-card">
              <span className="text-h3 font-extrabold text-ink tabular">{s.value}</span>
              <span className="text-caption font-medium text-ink-2">{s.label}</span>
              <span className="text-caption-xs text-ink-3">{s.sub}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary-soft/50 p-s-5 text-center">
          <p className="text-body-sm md:text-base font-bold text-ink">🔵 두 동선 동시 계산 도구는 시장에 전무</p>
          <p className="mt-s-1 text-body-sm md:text-base text-ink-3">프롭테크 × 하이퍼로컬 × 라이프스타일의 교차점<br />매물 중개와 경쟁하지 않는 비적대적 가치사슬</p>
        </div>
        <div className="flex items-start gap-s-2 rounded-xl bg-info-soft p-s-4">
          <Shield className="mt-0.5 size-4 shrink-0 text-info" />
          <p className="text-body-sm md:text-base text-ink-2">
            <strong className="text-ink">카카오 모빌리티 · 국가공간정보포털</strong> 공공 데이터 기반
            <br /><span className="text-caption text-ink-3">입력 데이터는 분석 후 자동 삭제됩니다</span>
          </p>
        </div>
      </div>
    </motion.section>
  );
}

/* ── Final CTA ── */
function FinalCTA() {
  return (
    <motion.section {...fadeUp} className="px-s-5 py-s-10">
      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-s-7 text-center shadow-elevated">
        <p className="text-caption-xs font-bold tracking-widest text-white/60">Closed Beta 2026.08 예정</p>
        <h2 className="mt-s-2 text-h2 font-extrabold leading-snug text-white">
          우리 가족에게 딱 맞는 동네,
          <br />10분이면 찾을 수 있어요.
        </h2>
        <p className="mt-s-2 text-body-sm text-white/70">
          직장 주소 두 개 + 학군 → AI가 교집합 최적 동네 추천
        </p>
        <div className="mt-s-5 flex flex-col items-center gap-s-3">
          <Link href="/login" className="w-full max-w-xs">
            <Button fullWidth size="lg" className="border-2 border-white/20 bg-white text-primary shadow-floating hover:bg-white/90" trailing={<ArrowRight />}>
              지금 무료로 진단 시작하기
            </Button>
          </Link>
          <p className="text-caption text-white/50">게스트 체험 가능 · 가입 없이 바로 시작</p>
        </div>
      </div>
    </motion.section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-s-5 py-s-6">
      <div className="mx-auto max-w-xl space-y-s-3 text-center">
        <Logo size="sm" className="mx-auto" />
        <p className="text-caption text-ink-3">© 2026 동네궁합진단기. 모든 권리 보유.</p>
        <p className="text-caption-xs text-ink-3/60">카카오 모빌리티 · 국가공간정보포털 데이터 기반 서비스</p>
      </div>
    </footer>
  );
}

/* ── Main ── */
export function LandingClient() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-bg">
      <nav className="fixed inset-x-0 top-0 z-nav flex items-center justify-between border-b border-line/50 bg-bg/80 px-s-5 py-s-3 backdrop-blur-lg">
        <Logo size="sm" />
        <Link href="/login"><Button size="sm">시작하기</Button></Link>
      </nav>
      <HeroSection />
      <PainSection />
      <InputOutputSection />
      <BeforeAfterSection />
      <ValueProposition />
      <PersonaSection />
      <MarketSection />
      <FinalCTA />
      <Footer />
    </div>
    </MotionConfig>
  );
}
