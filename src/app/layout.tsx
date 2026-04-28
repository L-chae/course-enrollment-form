import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lume",
  description: "수강신청",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-base text-text-main">
        
        <header 
          className="sticky top-0 z-50 w-full bg-bg-card/80 backdrop-blur-md border-b border-border-subtle"
          style={{ height: "var(--h-gnb)" }}
        >
          <div className="content-container h-full flex items-center justify-between">
            <span className="font-black text-xl tracking-tighter text-brand-primary">
              Lume
            </span>
            <nav className="flex items-center gap-5 text-sm font-bold text-text-sub">
              <a href="#" className="hover:text-text-main">강의목록</a>
              <a href="#" className="hover:text-text-main">내 강의실</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 content-container py-10">
          {children}
        </main>

        <footer className="border-t border-border-subtle py-10 bg-bg-card">
          <div className="content-container">
            <p className="text-xs text-text-mute font-medium">
              © 2026 Lume. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}