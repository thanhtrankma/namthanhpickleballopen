"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Trophy, BookOpen, BarChart3, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/",        label: "Sơ đồ Giải đấu", icon: Trophy },
  { href: "/quy-mo",  label: "Quy mô & Giải thưởng", icon: BarChart3 },
  { href: "/the-le",  label: "Thể lệ",          icon: BookOpen },
  { href: "/lien-he", label: "Liên hệ",          icon: Phone },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "linear-gradient(90deg, #0c2340 0%, #0f3460 60%, #0c2340 100%)",
        boxShadow: "0 2px 16px rgba(12,35,64,0.45)",
        borderBottom: "1px solid rgba(14,165,233,0.25)",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between gap-4">
        {/* Brand mark */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#f59e0b)" }}
          >
            <Plane className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-black text-xs tracking-widest text-white hidden sm:block"
            style={{ letterSpacing: "0.1em" }}
          >
            NAM THANH TRAVEL
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150"
                style={
                  active
                    ? {
                        background: "rgba(14,165,233,0.2)",
                        color: "#38bdf8",
                        border: "1px solid rgba(14,165,233,0.35)",
                      }
                    : {
                        color: "rgba(186,230,253,0.8)",
                        border: "1px solid transparent",
                      }
                }
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "#e0f2fe";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "rgba(186,230,253,0.8)";
                  }
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA button */}
        <a
          href="/lien-he"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold shrink-0 transition-all duration-150"
          style={{
            background: "linear-gradient(90deg,#f59e0b,#ef4444)",
            color: "#fff",
            boxShadow: "0 2px 8px rgba(245,158,11,0.35)",
          }}
        >
          <Trophy className="w-3.5 h-3.5" />
          Đăng ký thi đấu
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-sky-200 p-1"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-white/10 py-2 px-4 flex flex-col gap-1"
          style={{ background: "#0c2340" }}
        >
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold"
                style={{
                  background: active ? "rgba(14,165,233,0.15)" : "transparent",
                  color: active ? "#38bdf8" : "rgba(186,230,253,0.8)",
                }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
