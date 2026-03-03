import PageLayout from "@/components/PageLayout";
import AdBanner from "@/components/AdBanner";
import {
  Trophy, Users, Calendar, MapPin, Star,
  Plane, TrendingUp, Gift, Building2, Globe,
} from "lucide-react";

function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 text-center border flex flex-col items-center gap-2 hover:scale-[1.02] transition-transform duration-200"
      style={{ background: `${color}0a`, borderColor: `${color}25` }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="font-black text-2xl text-slate-800">{value}</div>
      <div className="text-slate-500 text-xs font-medium">{label}</div>
    </div>
  );
}

function PrizeRow({
  rank, prize, extra, color, bg,
}: {
  rank: string; prize: string; extra: string; color: string; bg: string;
}) {
  return (
    <tr style={{ background: bg }}>
      <td className="px-4 py-3">
        <span className="font-black text-sm" style={{ color }}>{rank}</span>
      </td>
      <td className="px-4 py-3 text-sm font-black text-slate-800">{prize}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{extra}</td>
    </tr>
  );
}

const SPONSORS = [
  { name: "Nam Thanh Travel", role: "Nhà tài trợ chính", tier: "gold", icon: "✈️" },
  { name: "VietJet Air",       role: "Đối tác bay",        tier: "silver", icon: "🛫" },
  { name: "Mường Thanh Hotels", role: "Đối tác lưu trú",   tier: "silver", icon: "🏨" },
  { name: "VinGroup",          role: "Đối tác địa điểm",   tier: "bronze", icon: "🏟️" },
  { name: "Grab",              role: "Đối tác di chuyển",  tier: "bronze", icon: "🚗" },
  { name: "VPBank",            role: "Đối tác ngân hàng",  tier: "bronze", icon: "🏦" },
];

const TIMELINE = [
  { phase: "Giai đoạn 1", period: "01–30/04/2025", desc: "Mở đăng ký đội tham dự", done: false },
  { phase: "Giai đoạn 2", period: "01–15/05/2025", desc: "Xét duyệt hồ sơ & Xác nhận", done: false },
  { phase: "Giai đoạn 3", period: "01/06/2025",    desc: "Khai mạc & Bốc thăm chia nhánh", done: false },
  { phase: "Giai đoạn 4", period: "07–22/06/2025", desc: "Vòng bảng (Vòng 32 → Tứ kết)", done: false },
  { phase: "Giai đoạn 5", period: "28/06/2025",    desc: "Bán kết", done: false },
  { phase: "Giai đoạn 6", period: "05/07/2025",    desc: "🏆 Chung kết & Lễ trao giải", done: false },
];

export default function QuyMoPage() {
  return (
    <PageLayout
      title="Quy mô & Giải thưởng"
      subtitle="Toàn cảnh giải đấu Nam Thanh Travel Open 2025"
    >
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users}    value="32"      label="Đội tham dự"          color="#1a56db" />
        <StatCard icon={Trophy}   value="5"       label="Vòng đấu"              color="#f59e0b" />
        <StatCard icon={Calendar} value="35 ngày" label="Thời gian thi đấu"    color="#8b5cf6" />
        <StatCard icon={Gift}     value="55tr đ"  label="Tổng giải thưởng"     color="#ef4444" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Prize table */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{ background: "linear-gradient(90deg,#fffbeb,#fff7ed)", borderBottom: "2px solid #fde68a" }}
          >
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="font-black text-slate-800">Cơ cấu giải thưởng</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Hạng</th>
                <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Tiền thưởng</th>
                <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Phần thưởng thêm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <PrizeRow rank="🥇 Vô địch"    prize="30.000.000đ" extra="Cúp vàng + 4 vé tour du lịch + Bộ quần áo Nam Thanh"      color="#d97706" bg="#fffbeb" />
              <PrizeRow rank="🥈 Á quân"     prize="15.000.000đ" extra="Cúp bạc + 2 vé tour du lịch + Bộ quần áo Nam Thanh"       color="#64748b" bg="#f8fafc" />
              <PrizeRow rank="🥉 Hạng 3–4"   prize="8.000.000đ"  extra="Cúp đồng + Voucher du lịch 2.000.000đ"                   color="#92400e" bg="#fff7ed" />
              <PrizeRow rank="🏅 Top 5–8"    prize="2.000.000đ"  extra="Huy chương tham dự + Voucher 500.000đ"                    color="#1a56db" bg="#eff6ff" />
              <PrizeRow rank="🌟 Cầu thủ XS" prize="1.000.000đ"  extra="Danh hiệu cá nhân + Voucher du lịch"                     color="#7c3aed" bg="#faf5ff" />
            </tbody>
          </table>
        </div>

        {/* Sidebar ad */}
        <div>
          <AdBanner variant="sidebar" />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div
          className="px-5 py-4 flex items-center gap-3"
          style={{ background: "linear-gradient(90deg,#eff6ff,#f0f9ff)", borderBottom: "2px solid #bfdbfe" }}
        >
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="font-black text-slate-800">Lịch trình tổ chức</h2>
        </div>
        <div className="p-5">
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-slate-100" />

            <div className="space-y-5">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div
                    className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-black text-xs z-10 relative"
                    style={{
                      background: i === 5
                        ? "linear-gradient(135deg,#f59e0b,#ef4444)"
                        : "linear-gradient(135deg,#1a56db,#0ea5e9)",
                      color: "#fff",
                      boxShadow: i === 5 ? "0 0 0 3px rgba(245,158,11,0.2)" : "0 0 0 3px rgba(26,86,219,0.1)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm text-slate-800">{item.phase}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: i === 5 ? "#fef3c7" : "#eff6ff",
                          color: i === 5 ? "#d97706" : "#1e40af",
                        }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <div className="text-slate-600 text-sm mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Venue & sponsors */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Venue */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{ background: "linear-gradient(90deg,#f0fdf4,#ecfdf5)", borderBottom: "2px solid #86efac" }}
          >
            <MapPin className="w-5 h-5 text-green-600" />
            <h2 className="font-black text-slate-800">Địa điểm thi đấu</h2>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: "Sân chính", value: "Sân vận động Quốc gia Mỹ Đình, Hà Nội", icon: Building2 },
              { label: "Sân phụ", value: "Trung tâm TDTT Quận Cầu Giấy", icon: MapPin },
              { label: "Sức chứa", value: "Tối đa 40.000 khán giả/ngày thi đấu", icon: Users },
              { label: "Khu vực", value: "Miền Bắc, Miền Trung & Miền Nam", icon: Globe },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">{item.label}</div>
                  <div className="text-sm text-slate-700 font-semibold">{item.value}</div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="mt-2 rounded-xl overflow-hidden flex items-center justify-center"
              style={{ height: 120, background: "linear-gradient(135deg,#dbeafe,#cffafe)", border: "1px solid #bfdbfe" }}
            >
              <div className="text-center text-blue-600">
                <MapPin className="w-8 h-8 mx-auto mb-1 opacity-40" />
                <div className="text-xs font-semibold opacity-60">Bản đồ địa điểm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{ background: "linear-gradient(90deg,#faf5ff,#f5f3ff)", borderBottom: "2px solid #c4b5fd" }}
          >
            <Star className="w-5 h-5 text-purple-600" />
            <h2 className="font-black text-slate-800">Nhà tài trợ & Đối tác</h2>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            {SPONSORS.map((s) => (
              <div
                key={s.name}
                className="rounded-xl p-3 flex items-center gap-2.5 hover:scale-[1.02] transition-transform duration-150"
                style={{
                  background: s.tier === "gold"
                    ? "linear-gradient(135deg,#fffbeb,#fef3c7)"
                    : s.tier === "silver"
                    ? "#f8fafc"
                    : "#fafafa",
                  border: s.tier === "gold"
                    ? "1.5px solid #fde68a"
                    : "1px solid #e2e8f0",
                }}
              >
                <span className="text-xl">{s.icon}</span>
                <div>
                  <div className="text-xs font-black text-slate-700 leading-tight">{s.name}</div>
                  <div className="text-[10px] text-slate-400">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scale highlight */}
      <div
        className="rounded-2xl p-6 mb-2"
        style={{
          background: "linear-gradient(135deg,#0c2340,#1e3a6e)",
          border: "1px solid rgba(14,165,233,0.2)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="text-sky-300 text-xs font-bold tracking-widest uppercase mb-2">
              ✈ Tổng quan giải đấu
            </div>
            <h3 className="text-white font-black text-xl mb-2">
              Giải đấu thể thao lớn nhất<br />do Nam Thanh Travel tổ chức
            </h3>
            <p className="text-sky-200/70 text-sm leading-relaxed">
              Quy tụ 32 đội mạnh nhất từ khắp cả nước, tổng giải thưởng lên tới 55 triệu đồng
              cùng hàng chục suất vé du lịch hấp dẫn. Đây không chỉ là giải đấu thể thao —
              mà còn là nơi kết nối đam mê, tình bạn và tinh thần fair-play.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {[
              { v: "32",   l: "đội", icon: "⚽" },
              { v: "31",   l: "trận đấu", icon: "🏟️" },
              { v: "55tr", l: "giải thưởng", icon: "💰" },
              { v: "6+",   l: "nhà tài trợ", icon: "🤝" },
            ].map((item) => (
              <div
                key={item.l}
                className="rounded-xl px-4 py-3 text-center"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <div className="text-xl mb-0.5">{item.icon}</div>
                <div className="text-white font-black text-lg leading-tight">{item.v}</div>
                <div className="text-sky-300/70 text-[10px]">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
          <a
            href="/the-le"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "rgba(14,165,233,0.25)", border: "1px solid rgba(14,165,233,0.4)" }}
          >
            <TrendingUp className="w-4 h-4" /> Xem thể lệ
          </a>
          <a
            href="/lien-he"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)" }}
          >
            <Plane className="w-4 h-4" /> Đăng ký tham dự
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
