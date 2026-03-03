"use client";

import { Plane, Star, ArrowRight, MapPin } from "lucide-react";

interface AdBannerProps {
  variant?: "horizontal" | "sidebar" | "strip";
}

const ADS = [
  {
    tag: "HOT DEAL",
    tagColor: "#ef4444",
    title: "Tour Hạ Long 3N2Đ",
    sub: "Khởi hành hàng tuần từ Hà Nội",
    price: "2.990.000đ",
    note: "/người — giảm 20%",
    bg: "linear-gradient(135deg,#0c2340 0%,#0f3460 60%,#164e63 100%)",
    accent: "#0ea5e9",
    img: "🚢",
    location: "Vịnh Hạ Long",
  },
  {
    tag: "BESTSELLER",
    tagColor: "#f59e0b",
    title: "Đà Nẵng – Hội An 4N3Đ",
    sub: "Bay thẳng, khách sạn 4 sao",
    price: "5.490.000đ",
    note: "/người — combo tiết kiệm",
    bg: "linear-gradient(135deg,#0f2a50 0%,#1e3a6e 60%,#0e4d7a 100%)",
    accent: "#f59e0b",
    img: "🏖️",
    location: "Đà Nẵng",
  },
  {
    tag: "MỚI",
    tagColor: "#8b5cf6",
    title: "Phú Quốc 5N4Đ All-Inclusive",
    sub: "Resort 5 sao, ăn uống & vui chơi",
    price: "8.900.000đ",
    note: "/người — bao gồm vé bay",
    bg: "linear-gradient(135deg,#0c2340 0%,#1e1b4b 60%,#0f2a50 100%)",
    accent: "#a78bfa",
    img: "🏝️",
    location: "Phú Quốc",
  },
];

export default function AdBanner({ variant = "horizontal" }: AdBannerProps) {
  const ad = ADS[Math.floor(Math.random() * ADS.length)];

  if (variant === "strip") {
    return (
      <div
        className="w-full px-6 py-3 flex items-center justify-between gap-4 overflow-hidden relative"
        style={{
          background: "linear-gradient(90deg,#0c2340,#0f3460,#0c2340)",
          borderTop: "1px solid rgba(14,165,233,0.2)",
          borderBottom: "1px solid rgba(14,165,233,0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{ad.img}</span>
          <div>
            <span
              className="text-[10px] font-black px-2 py-0.5 rounded mr-2"
              style={{ background: ad.tagColor, color: "#fff" }}
            >
              {ad.tag}
            </span>
            <span className="text-white font-bold text-sm">{ad.title}</span>
            <span className="text-sky-300 text-xs ml-2">— {ad.sub}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-amber-400 font-black text-lg leading-tight">{ad.price}</div>
            <div className="text-sky-300/70 text-[10px]">{ad.note}</div>
          </div>
          <a
            href="/lien-he"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all"
            style={{ background: "linear-gradient(90deg,#0ea5e9,#0891b2)" }}
          >
            Đặt ngay <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        {/* Decorative plane */}
        <Plane
          className="absolute right-32 top-1/2 -translate-y-1/2 opacity-5"
          style={{ width: 80, height: 80 }}
        />
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div
        className="rounded-xl overflow-hidden w-64 shrink-0"
        style={{
          background: ad.bg,
          border: `1px solid ${ad.accent}33`,
          boxShadow: `0 4px 24px ${ad.accent}22`,
        }}
      >
        {/* Top label */}
        <div
          className="px-3 py-1.5 flex items-center justify-between"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <span
            className="text-[10px] font-black px-2 py-0.5 rounded"
            style={{ background: ad.tagColor, color: "#fff" }}
          >
            {ad.tag}
          </span>
          <span className="text-[10px] text-sky-300/60 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" />{ad.location}
          </span>
        </div>

        <div className="p-4 text-center">
          <div className="text-5xl mb-3">{ad.img}</div>
          <div className="font-black text-white text-base leading-tight mb-1">{ad.title}</div>
          <div className="text-sky-300/80 text-xs mb-4">{ad.sub}</div>

          <div className="flex items-center justify-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <div className="text-2xl font-black mb-0.5" style={{ color: ad.accent }}>
            {ad.price}
          </div>
          <div className="text-sky-300/60 text-[10px] mb-4">{ad.note}</div>

          <a
            href="/lien-he"
            className="block w-full py-2 rounded-lg text-sm font-bold text-white text-center transition-all hover:opacity-90"
            style={{ background: `linear-gradient(90deg,${ad.accent},${ad.tagColor})` }}
          >
            Tư vấn miễn phí ✈
          </a>
        </div>

        <div
          className="px-3 py-2 text-center text-[10px] font-medium"
          style={{ background: "rgba(0,0,0,0.2)", color: `${ad.accent}99` }}
        >
          Quảng cáo • Nam Thanh Travel
        </div>
      </div>
    );
  }

  // Horizontal (default)
  return (
    <div
      className="w-full rounded-xl overflow-hidden relative"
      style={{
        background: ad.bg,
        border: `1px solid ${ad.accent}33`,
        boxShadow: `0 4px 24px rgba(12,35,64,0.15)`,
      }}
    >
      <div className="px-6 py-5 flex items-center justify-between gap-6">
        <div className="text-4xl shrink-0">{ad.img}</div>

        <div className="flex-1 min-w-0">
          <span
            className="text-[10px] font-black px-2 py-0.5 rounded mb-1.5 inline-block"
            style={{ background: ad.tagColor, color: "#fff" }}
          >
            {ad.tag}
          </span>
          <div className="font-black text-white text-lg leading-tight">{ad.title}</div>
          <div className="text-sky-300/80 text-xs mt-0.5">{ad.sub}</div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-2xl font-black" style={{ color: ad.accent }}>{ad.price}</div>
          <div className="text-sky-300/60 text-[10px] mb-3">{ad.note}</div>
          <a
            href="/lien-he"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(90deg,${ad.accent},${ad.tagColor})` }}
          >
            Đặt tour ngay <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <Plane
          className="absolute right-0 bottom-0 opacity-[0.04]"
          style={{ width: 120, height: 120 }}
        />
      </div>
      <div
        className="px-6 py-1.5 text-[10px] font-medium text-right"
        style={{ background: "rgba(0,0,0,0.15)", color: `${ad.accent}80` }}
      >
        Quảng cáo • Nam Thanh Travel
      </div>
    </div>
  );
}
