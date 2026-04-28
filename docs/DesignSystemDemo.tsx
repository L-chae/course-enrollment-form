"use client";

/**
 * DesignSystemPage — Design System v3 쇼케이스
 *
 * - 다크모드: <html>.dark 클래스 토글
 * - 모든 색상 토큰: globals.css @theme
 * - 간격 토큰: --space-* (CSS 변수 직접 참조 또는 style prop)
 *   → --spacing-* 사용 금지: Tailwind v4 spacing scale 전체를 오염시킴
 */

import React, { useState, useEffect } from "react";

const COURSE = {
  category: "Development",
  title: "Next.js 15 & Tailwind v4 전문 리팩토링",
  lessons: 12,
  price: "185,000원",
  rating: 4.9,
  reviews: 238,
};

const ORDER = {
  course: "Next.js 15 리팩토링",
  type: "단체 수강 (5인)",
  total: "925,000원",
  remaining: 3,
};

/* ── spacing 헬퍼 (반복 style prop 간소화) ── */
const sp = {
  xs:  "var(--space-xs)",
  sm:  "var(--space-sm)",
  md:  "var(--space-md)",
  lg:  "var(--space-lg)",
  xl:  "var(--space-xl)",
  "2xl": "var(--space-2xl)",
} as const;

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex items-center gap-2
                 bg-bg-sunken hover:bg-border-subtle
                 border border-border-subtle rounded-sm
                 text-xs font-bold text-text-sub
                 transition-all duration-200 select-none"
      style={{ padding: `${sp.xs} ${sp.md}` }}
    >
      <span className="text-sm leading-none">{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? "DARK" : "LIGHT"}</span>
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-text-mute uppercase tracking-widest"
       style={{ marginBottom: sp.sm }}>
      {children}
    </p>
  );
}

export default function DesignSystemPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-bg-base transition-colors duration-500">

      {/* ════════ GNB ════════ */}
      <nav
        className="sticky top-0 z-50 bg-bg-card/90 backdrop-blur-sm
                   border-b border-border-subtle shadow-soft"
        style={{ height: "var(--h-gnb)" }}
      >
        <div className="content-container h-full flex items-center justify-between">
          <a href="#" className="flex items-center" style={{ gap: sp.sm }}>
            <span className="w-7 h-7 rounded-sm bg-brand-primary flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12 L7 2 L12 12" stroke="white" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 8.5 H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-base font-black text-text-main tracking-tight">
              Global<span className="text-brand-primary">Campus</span>
            </span>
          </a>

          <div className="flex items-center" style={{ gap: sp.md }}>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <nav className="hidden md:flex items-center text-sm font-semibold text-text-sub"
                 style={{ gap: sp.md }}>
              <a href="#" className="text-brand-primary font-bold">수강신청</a>
              <a href="#" className="hover:text-text-main transition-colors duration-150">내 강의실</a>
              <a href="#" className="hover:text-text-main transition-colors duration-150">커뮤니티</a>
            </nav>
          </div>
        </div>
      </nav>

      {/* ════════ MAIN ════════ */}
      <main className="content-container" style={{ paddingTop: sp.xl, paddingBottom: sp["2xl"] }}>

        {/* 페이지 헤더 */}
        <header style={{ marginBottom: sp["2xl"] }}>
          <div className="flex items-center" style={{ gap: sp.sm, marginBottom: sp.md }}>
            <span className="badge-brand">Design System</span>
            <span className="text-xs text-text-mute font-mono">v3.0</span>
          </div>
          <h1 className="text-h1" style={{ marginBottom: sp.sm }}>컴포넌트 쇼케이스</h1>
          <p className="text-lg text-text-sub leading-relaxed" style={{ maxWidth: "520px" }}>
            Tailwind v4 CSS 변수 기반 토큰 시스템.
            하드코딩 색상 없이 라이트·다크 모드를 완전 지원합니다.
          </p>
        </header>

        {/* 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start"
             style={{ gap: sp.xl }}>

          {/* ── 좌측 (2/3) ── */}
          <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: sp.xl }}>

            {/* ① Typography */}
            <section className="card" style={{ padding: sp.lg }}>
              <div className="border-b border-border-subtle" style={{ paddingBottom: sp.md, marginBottom: sp.lg }}>
                <SectionLabel>01 — Typography</SectionLabel>
                <h2 className="text-h2">타이포그래피 스케일</h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: sp.lg }}>
                {[
                  {
                    meta: ".text-h1 · 36px · extrabold · tracking-tighter",
                    node: <p className="text-h1">전체 강좌 탐색</p>,
                  },
                  {
                    meta: ".text-h2 · 24px · extrabold · tracking-tight",
                    node: <p className="text-h2">카테고리 · 개발</p>,
                  },
                  {
                    meta: ".text-h3 · brand color",
                    node: <p className="text-h3 text-brand-primary">실전 Next.js 15 리팩토링 가이드</p>,
                  },
                  {
                    meta: "body · 16px · text-sub · line-height 1.6",
                    node: (
                      <p className="text-base text-text-sub leading-relaxed" style={{ maxWidth: "480px" }}>
                        본문은 가독성을 위해 1.6 행간을 유지합니다. 다크 모드에서는
                        텍스트 밝기를 낮춰 장시간 사용 시 눈의 피로를 최소화합니다.
                      </p>
                    ),
                  },
                  {
                    meta: "text-mute · caption · meta",
                    node: <p className="text-sm text-text-mute">최종 업데이트 · 2025년 3월 14일 · 수강생 4,291명</p>,
                  },
                ].map(({ meta, node }) => (
                  <div key={meta}>
                    <span className="text-xs text-text-mute font-mono block"
                          style={{ marginBottom: sp.xs }}>{meta}</span>
                    {node}
                  </div>
                ))}
              </div>
            </section>

            {/* ② Buttons & Inputs */}
            <div className="grid sm:grid-cols-2" style={{ gap: sp.lg }}>

              <div className="card" style={{ padding: sp.lg }}>
                <SectionLabel>02 — Buttons</SectionLabel>
                <h2 className="text-h3" style={{ marginBottom: sp.md }}>액션 버튼</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: sp.sm }}>
                  <button className="w-full font-bold rounded-sm text-white
                                     bg-brand-primary hover:bg-brand-dark shadow-brand
                                     hover:shadow-none transition-all duration-200 active:scale-[0.98]"
                          style={{ padding: `${sp.sm} ${sp.lg}` }}>
                    수강 신청하기
                  </button>
                  <button className="w-full font-bold rounded-sm text-text-main
                                     bg-bg-card hover:bg-bg-sunken
                                     border border-border-strong
                                     transition-all duration-200 active:scale-[0.98]"
                          style={{ padding: `${sp.sm} ${sp.lg}` }}>
                    찜하기
                  </button>
                  <button className="w-full font-bold rounded-sm text-brand-primary
                                     bg-transparent hover:bg-bg-sunken
                                     border border-brand-primary/30 hover:border-brand-primary/60
                                     transition-all duration-200 active:scale-[0.98]"
                          style={{ padding: `${sp.sm} ${sp.lg}` }}>
                    미리보기
                  </button>
                </div>
              </div>

              <div className="card" style={{ padding: sp.lg }}>
                <SectionLabel>03 — Inputs</SectionLabel>
                <h2 className="text-h3" style={{ marginBottom: sp.md }}>입력 필드</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: sp.md }}>
                  <div>
                    <label className="text-sm font-bold text-text-sub block"
                           style={{ marginBottom: sp.xs }}>이메일 주소</label>
                    <input type="email" placeholder="example@global.com" className="input-standard" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-text-sub block"
                           style={{ marginBottom: sp.xs }}>수강 인원</label>
                    <input type="number" placeholder="1 ~ 50명" className="input-standard" />
                  </div>
                </div>
              </div>
            </div>

            {/* ③ Color Tokens */}
            <section className="card" style={{ padding: sp.lg }}>
              <SectionLabel>04 — Color Tokens</SectionLabel>
              <h2 className="text-h3" style={{ marginBottom: sp.lg }}>컬러 팔레트</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: sp.sm }}>
                {[
                  { label: "brand-primary", bg: "var(--color-brand-primary)" },
                  { label: "brand-dark",    bg: "var(--color-brand-dark)" },
                  { label: "bg-base",       bg: "var(--color-bg-base)",    border: true },
                  { label: "bg-card",       bg: "var(--color-bg-card)",    border: true },
                  { label: "bg-sunken",     bg: "var(--color-bg-sunken)" },
                  { label: "bg-inverse",    bg: "var(--color-bg-inverse)" },
                  { label: "border-subtle", bg: "var(--color-border-subtle)" },
                  { label: "border-strong", bg: "var(--color-border-strong)" },
                ].map(({ label, bg, border }) => (
                  <div key={label}>
                    <div style={{
                      height: "40px",
                      borderRadius: "var(--radius-sm)",
                      background: bg,
                      border: border ? "1px solid var(--color-border-subtle)" : undefined,
                      marginBottom: sp.xs,
                    }} />
                    <p className="text-xs text-text-mute font-mono leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ④ Course Cards */}
            <section>
              <SectionLabel>05 — Course Card</SectionLabel>
              <h2 className="text-h3" style={{ marginBottom: sp.md }}>강좌 카드</h2>

              <div className="grid sm:grid-cols-2" style={{ gap: sp.lg }}>
                {/* 실제 카드 */}
                <article className="card-interactive group overflow-hidden">
                  <div className="aspect-video bg-bg-sunken relative overflow-hidden rounded-t-md">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-brand-primary/10
                                      flex items-center justify-center">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                          <rect x="4" y="4" width="28" height="28" rx="4"
                                stroke="var(--color-brand-primary)" strokeWidth="2" strokeDasharray="4 2"/>
                          <path d="M12 18 L16 22 L24 14"
                                stroke="var(--color-brand-primary)" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    {/* v4 그라디언트 문법 */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute badge-brand" style={{ top: sp.sm, left: sp.sm }}>심화</span>
                  </div>

                  <div style={{ padding: sp.lg }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: sp.sm }}>
                      <span className="text-xs font-black text-brand-primary uppercase tracking-widest">
                        {COURSE.category}
                      </span>
                      <div className="flex items-center text-xs text-text-mute font-medium"
                           style={{ gap: sp.xs }}>
                        <span className="text-yellow-500">★</span>
                        <span>{COURSE.rating}</span>
                        <span>({COURSE.reviews})</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-extrabold leading-snug
                                   group-hover:text-brand-primary transition-colors duration-200"
                        style={{ marginBottom: sp.sm }}>
                      {COURSE.title}
                    </h4>

                    <div className="border-t border-border-subtle flex justify-between items-center"
                         style={{ paddingTop: sp.sm }}>
                      <span className="text-sm text-text-mute">총 {COURSE.lessons}강</span>
                      <span className="text-xl font-black text-text-main">{COURSE.price}</span>
                    </div>
                  </div>
                </article>

                {/* 스켈레톤 */}
                <div className="card overflow-hidden animate-pulse">
                  <div className="aspect-video bg-bg-sunken rounded-t-md" />
                  <div style={{ padding: sp.lg, display: "flex", flexDirection: "column", gap: sp.sm }}>
                    <div className="h-3 w-20 bg-bg-sunken rounded-sm" />
                    <div className="h-5 w-full bg-bg-sunken rounded-sm" />
                    <div className="h-5 w-4/5 bg-bg-sunken rounded-sm" />
                    <div className="border-t border-border-subtle flex justify-between"
                         style={{ paddingTop: sp.sm }}>
                      <div className="h-4 w-12 bg-bg-sunken rounded-sm" />
                      <div className="h-6 w-20 bg-bg-sunken rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* ── 사이드바 ── */}
        {/* ── 사이드바 (화이트 배경 버전) ── */}
<aside>
  <div
    className="card bg-bg-card rounded-md shadow-elevated"
    style={{
      padding: sp.lg,
      position: "sticky",
      top: "var(--top-sticky)",
      display: "flex",
      flexDirection: "column",
      gap: sp.lg,
    }}
  >
    <div>
      {/* 제목: 기본 텍스트 컬러(text-text-main)와 기본 경계선 사용 */}
      <h3 className="text-xl font-black tracking-tight text-text-main border-b border-border-subtle"
          style={{ paddingBottom: sp.md, marginBottom: sp.md }}>
        수강 신청 요약
      </h3>
      
      <dl style={{ display: "flex", flexDirection: "column", gap: sp.sm }}>
        <div className="flex justify-between items-start text-sm" style={{ gap: sp.sm }}>
          {/* 라벨: 보조 텍스트 컬러(text-text-sub) 적용 */}
          <dt className="shrink-0 font-medium text-text-sub">선택 강좌</dt>
          <dd className="font-bold text-right leading-snug text-text-main">{ORDER.course}</dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="font-medium text-text-sub">수강 구분</dt>
          <dd className="font-bold text-text-main">{ORDER.type}</dd>
        </div>
      </dl>
    </div>

    {/* 중간 구분선: 기본 경계선(border-border-subtle) 사용 */}
    <div className="border-t border-border-subtle flex justify-between items-baseline"
         style={{ paddingTop: sp.lg }}>
      <span className="text-sm text-text-sub">총 결제 금액</span>
      <strong className="text-3xl font-black text-text-main">{ORDER.total}</strong>
    </div>

    <button
      className="w-full text-white font-black text-base rounded-sm
                 bg-brand-primary hover:bg-brand-dark shadow-brand
                 transition-all duration-200 active:scale-[0.98] cursor-pointer"
      style={{ padding: `${sp.md} ${sp.lg}` }}
    >
      결제 및 신청하기
    </button>

    {/* 하단 안내: 약한 텍스트 컬러(text-text-mute) 적용 */}
    <p className="text-xs text-center leading-relaxed text-text-mute">
      7일 환불 보장 · 수료증 발급 포함
    </p>
  </div>

  {/* 잔여 인원 배너 (외부) */}
  <div className="rounded-sm border border-brand-primary/15
                  bg-brand-primary/8 flex items-center justify-center"
       style={{ marginTop: sp.md, padding: `${sp.sm} ${sp.md}`, gap: sp.xs }}>
    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
    <p className="text-xs text-brand-primary font-bold">
      잔여 수강 인원 {ORDER.remaining}명
    </p>
  </div>
</aside>

        </div>
      </main>
    </div>
  );
}