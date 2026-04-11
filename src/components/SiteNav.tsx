"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, BookOpen, Phone, Menu, X, Home } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/giai-dau", label: "Giải đấu", icon: Trophy },
  { href: "/the-le", label: "Thể lệ", icon: BookOpen },
  { href: "/lien-he", label: "Liên hệ", icon: Phone },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "linear-gradient(90deg, #7c2d12 0%, #c2410c 45%, #9a3412 100%)",
        boxShadow: "0 2px 16px rgba(124,45,18,0.4)",
        borderBottom: "1px solid rgba(251,191,36,0.35)",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between gap-4">
        {/* Brand mark */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#fbbf24,#ea580c)" }}
          >
            <img src="/logo.png" alt="Nam Thanh Travel" className="w-full h-full object-contain" />
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
                        background: "rgba(251,191,36,0.22)",
                        color: "#fef3c7",
                        border: "1px solid rgba(251,191,36,0.45)",
                      }
                    : {
                        color: "rgba(255,237,213,0.92)",
                        border: "1px solid transparent",
                      }
                }
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#fffbeb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,237,213,0.92)";
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
          <Phone className="w-3.5 h-3.5" />
          Liên hệ
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-amber-100 p-1"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-white/10 py-2 px-4 flex flex-col gap-1"
          style={{ background: "#7c2d12" }}
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
                  background: active ? "rgba(251,191,36,0.2)" : "transparent",
                  color: active ? "#fef3c7" : "rgba(255,237,213,0.9)",
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
