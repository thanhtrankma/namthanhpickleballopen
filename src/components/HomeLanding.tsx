import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Calendar, Heart, MapPin, Trophy, Users, Zap } from "lucide-react";

const SPONSOR_LOGOS = [
  { src: "/VNA.png", alt: "Vietnam Airlines" },
  { src: "/VJ.png", alt: "Vietjet Air" },
  { src: "/SABRE.png", alt: "Sabre Vietnam" },
  { src: "/EMIRATES.png", alt: "Emirates" },
  { src: "/EVA.png", alt: "EVA Air" },
];

export default function HomeLanding() {
  return (
    <div className="relative min-h-[calc(100dvh-3rem)] overflow-hidden">
      {/* Background banner */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgb(255 114 67 / 55%) 0%, rgb(249 183 156 / 45%) 35%, rgb(237 86 44 / 82%) 100%)",
          }}
        />
      </div>

      {/* Decorative bolts */}
      <Zap
        className="absolute left-[4%] top-1/3 w-10 h-10 md:w-14 md:h-14 text-amber-300/90 drop-shadow-lg pointer-events-none hidden sm:block"
        strokeWidth={2.5}
        fill="currentColor"
        aria-hidden
      />
      <Zap
        className="absolute right-[4%] top-1/3 w-10 h-10 md:w-14 md:h-14 text-amber-300/90 drop-shadow-lg pointer-events-none hidden sm:block scale-x-[-1]"
        strokeWidth={2.5}
        fill="currentColor"
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-8 pb-28 md:pb-24 md:pt-6 flex flex-col items-center text-center text-shadow-lg">
        <div className="mb-6 flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Nam Thanh Travel"
            className="h-14 md:h-16 w-auto object-contain drop-shadow-lg"
          />
          {/* <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-amber-100/90 uppercase">
            Nam Thanh Travel
          </p> */}
        </div>

        <h1
          className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-wide px-2 leading-tight"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.35)" }}
        >
          NAM THANH &amp; PARTNERS
          <br />
          PICKLEBALL CUP
        </h1>

        <div className="mt-8 w-full text-left">
          <h2 className="text-center text-base font-black uppercase tracking-wider text-amber-200/95 mb-4" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.35)" }}>
            Thông tin giải đấu
          </h2>
          <p className="text-center text-xl text-white/95 font-semibold mb-6 tracking-wider" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.35)" }}>
            Tên giải:{" "}
            <span className="text-amber-200" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.35)" }}>NAM THANH &amp; PARTNERS PICKLEBALL CUP</span>
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={<Calendar className="w-5 h-5 text-amber-300" />}
              title="1. Thời gian thi đấu"
            >
              <p>
                <span className="text-white/70 text-[11px] uppercase tracking-wider">Giờ bắt đầu</span>
                <br />
                <span className="font-bold text-white">Từ 07:00</span>
              </p>
              <p className="mt-3">
                <span className="text-white/70 text-[11px] uppercase tracking-wider">Ngày</span>
                <br />
                <span className="font-bold text-white">Thứ 7, ngày 18/04/2026</span>
              </p>
            </InfoCard>

            <InfoCard
              icon={<Trophy className="w-5 h-5 text-amber-300" />}
              title="2. Nội dung thi đấu"
            >
              <ul className="space-y-2 font-semibold text-white">
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 shrink-0 text-amber-200/80" />
                  Đôi Nam
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-4 h-4 shrink-0 text-amber-200/80" />
                  Đôi Nam Nữ
                </li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<MapPin className="w-5 h-5 text-amber-300" />}
              title="3. Địa điểm thi đấu"
              className="md:col-span-1"
            >
              <p>
                <span className="text-white/70 text-[11px] uppercase tracking-wider">Tên sân</span>
                <br />
                <span className="font-bold text-white">Sân Pickleball Bồ Đề</span>
              </p>
              <p className="mt-3 text-sm text-white/95 leading-snug">
                <span className="text-white/70 text-[11px] uppercase tracking-wider block mb-1">
                  Địa chỉ (click để xem bản đồ)
                </span>
                <a
                  href="https://maps.app.goo.gl/8PP2ezQWcAVa7AUVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900/95 hover:text-amber-200 transition-colors"
                >
                  237 Phú Viên, Long Biên, Hà Nội
                </a>
              </p>
              <p className="mt-4 pt-3 border-t border-white/15 text-xs text-amber-100/95">
                Đơn vị tổ chức: <strong className="text-white">Nam Thanh Travel</strong>
              </p>
            </InfoCard>
          </div>

          <section
            className="mt-8 rounded-2xl border border-white/20 p-4 md:p-6 backdrop-blur-md"
            style={{
              background: "linear-gradient(145deg, rgba(234,88,12,0.3) 0%, rgba(124,45,18,0.42) 100%)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <h2 className="text-center text-base font-black uppercase tracking-wider text-amber-100/95 mb-4">
              Tri ân nhà tài trợ
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-white/95 text-center">
              🧡 Nam Thanh Travel xin trân trọng gửi lời cảm ơn sâu sắc tới các Nhà Tài Trợ: Vietnam Airlines, Vietjet Air,
              Sabre Vietnam, Emirates và EVA Air đã tin tưởng đồng hành và góp phần tạo nên
              thành công cho Nam Thanh &amp; Partners Pickleball Cup 2026.
            </p>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-white/95">
              Sự hỗ trợ quý báu từ Quý Đối tác không chỉ mang đến những giá trị thiết thực cho giải đấu mà còn
              góp phần lan tỏa tinh thần thể thao, kết nối cộng đồng và nâng tầm chất lượng sự kiện năm nay. 🤝
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5  justify-center">
              {SPONSOR_LOGOS.map((sponsor) => (
                <div
                  key={sponsor.src}
                  className="overflow-hidden rounded-xl border border-amber-200/40 bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.14)]"
                >
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    width={1024}
                    height={354}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Floating CTA */}
      <Link
        href="/giai-dau"
        className="fixed bottom-6 left-1/2 z-60 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0
          flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm md:text-base text-white uppercase tracking-wide
          shadow-[0_8px_32px_rgba(234,88,12,0.55),0_4px_12px_rgba(0,0,0,0.25)]
          transition-transform hover:scale-[1.03] active:scale-[0.98]
          border-2 border-amber-300/50"
        style={{
          background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 45%, #c2410c 100%)",
        }}
      >
        <Trophy className="w-5 h-5 shrink-0" />
        Vào giải đấu
      </Link>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
  className = "",
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/20 p-4 md:p-5 backdrop-blur-md ${className}`}
      style={{
        background: "linear-gradient(145deg, rgba(234,88,12,0.35) 0%, rgba(124,45,18,0.45) 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-xs font-black uppercase tracking-wider text-amber-100">{title}</h3>
      </div>
      <div className="text-sm text-white/95 space-y-1">{children}</div>
    </div>
  );
}
