import PageLayout from "@/components/PageLayout";
import AdBanner from "@/components/AdBanner";
import {
  Users, Clock, Trophy, Shield, CheckCircle,
  AlertCircle, Star, Plane, Award,
} from "lucide-react";

function SectionCard({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ background: `${color}10`, borderBottom: `2px solid ${color}30` }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20`, border: `1.5px solid ${color}40` }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="font-black text-slate-800 text-base">{title}</h2>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function Rule({ index, text }: { index: number; text: string }) {
  return (
    <li className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
      <span
        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white mt-0.5"
        style={{ background: "linear-gradient(135deg,#1a56db,#0ea5e9)" }}
      >
        {index}
      </span>
      <span className="text-slate-700 text-sm leading-relaxed">{text}</span>
    </li>
  );
}

function Check2({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 py-1.5">
      <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
      <span className="text-slate-700 text-sm">{text}</span>
    </li>
  );
}

function Warn({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 py-1.5">
      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
      <span className="text-slate-700 text-sm">{text}</span>
    </li>
  );
}

export default function TheLePage() {
  return (
    <PageLayout
      title="Thể lệ Giải đấu"
      subtitle="Nam Thanh Travel Open 2025 · Quy định & Điều lệ chính thức"
    >
      {/* Ad banner strip */}
      <div className="mb-8">
        <AdBanner variant="horizontal" />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Format */}
        <SectionCard icon={Trophy} title="Hình thức thi đấu" color="#1a56db">
          <ul className="space-y-0">
            <Rule index={1} text="Giải đấu theo hình thức Single Elimination (Loại trực tiếp) — thua là dừng cuộc chơi." />
            <Rule index={2} text="32 đội tham gia, thi đấu qua 5 vòng: Vòng 32 → Vòng 16 → Tứ kết → Bán kết → Chung kết." />
            <Rule index={3} text="Kết quả mỗi trận được ban tổ chức xác nhận và cập nhật trực tiếp trên bảng đấu online." />
            <Rule index={4} text="Mỗi trận đấu thi đấu một lượt duy nhất (Best of 1). Vòng Bán kết và Chung kết thi đấu Best of 3." />
          </ul>
        </SectionCard>

        {/* Eligibility */}
        <SectionCard icon={Users} title="Điều kiện tham gia" color="#0ea5e9">
          <ul className="space-y-0">
            <ul className="space-y-0">
              <Check2 text="Đội có từ 5 đến 11 thành viên chính thức. Được đăng ký tối đa 3 dự bị." />
              <Check2 text="Thành viên đủ 18 tuổi trở lên. Xuất trình CMND/CCCD khi đăng ký." />
              <Check2 text="Đội đến từ các tỉnh thành trên cả nước đều được chào đón tham gia." />
              <Check2 text="Phí đăng ký: 500.000đ/đội (đã bao gồm bộ quần áo thi đấu)." />
              <Check2 text="Nộp danh sách đội trước ngày 15/05/2025. Sau thời hạn sẽ không được xét duyệt." />
              <Warn text="Thành viên của một đội không được đăng ký thi đấu cho đội khác trong cùng giải." />
              <Warn text="Ban tổ chức có quyền từ chối đội không đáp ứng đủ điều kiện tham dự." />
            </ul>
          </ul>
        </SectionCard>

        {/* Schedule */}
        <SectionCard icon={Clock} title="Lịch thi đấu & Thời gian" color="#8b5cf6">
          <div className="space-y-3">
            {[
              { date: "01/06/2025", event: "Khai mạc & Bốc thăm", badge: "bg-purple-100 text-purple-700" },
              { date: "07–08/06/2025", event: "Vòng 32 (16 trận)", badge: "bg-blue-100 text-blue-700" },
              { date: "14–15/06/2025", event: "Vòng 16 (8 trận)", badge: "bg-sky-100 text-sky-700" },
              { date: "21/06/2025", event: "Tứ kết (4 trận)", badge: "bg-teal-100 text-teal-700" },
              { date: "28/06/2025", event: "Bán kết (2 trận)", badge: "bg-orange-100 text-orange-700" },
              { date: "05/07/2025", event: "🏆 Chung kết & Trao giải", badge: "bg-amber-100 text-amber-700" },
            ].map((item) => (
              <div key={item.date} className="flex items-center justify-between gap-3 py-2 border-b border-slate-50 last:border-0">
                <span className="text-slate-500 text-xs font-mono">{item.date}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.badge}`}>
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Rules */}
        <SectionCard icon={Shield} title="Quy định trong thi đấu" color="#ef4444">
          <ul className="space-y-0">
            <Rule index={1} text="Các đội phải có mặt tại sân thi đấu trước 30 phút. Trễ quá 15 phút kể từ giờ thi đấu sẽ bị xử thua." />
            <Rule index={2} text="Trang phục thi đấu đồng màu, in số áo rõ ràng. Không mặc áo có hình ảnh, thông điệp phản cảm." />
            <Rule index={3} text="Tuyệt đối không có hành vi bạo lực, xúc phạm đối thủ, trọng tài hoặc ban tổ chức." />
            <Rule index={4} text="Quyết định của Trọng tài và Ban Tổ chức là quyết định cuối cùng và không thể kháng cáo." />
            <Rule index={5} text="Cầu thủ nhận 2 thẻ vàng trong một trận hoặc 1 thẻ đỏ sẽ bị đình chỉ trận tiếp theo." />
          </ul>
        </SectionCard>

        {/* Awards */}
        <div className="md:col-span-2">
          <SectionCard icon={Award} title="Cơ cấu giải thưởng" color="#f59e0b">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-1">
              {[
                { place: "🥇 Vô địch", prize: "30.000.000đ", extra: "Cúp vàng + 4 vé tour", color: "#f59e0b", bg: "#fffbeb" },
                { place: "🥈 Á quân", prize: "15.000.000đ", extra: "Cúp bạc + 2 vé tour", color: "#94a3b8", bg: "#f8fafc" },
                { place: "🥉 Hạng 3", prize: "8.000.000đ", extra: "Cúp đồng + voucher", color: "#92400e", bg: "#fff7ed" },
                { place: "🏅 Top 8", prize: "2.000.000đ", extra: "Huy chương + quà lưu niệm", color: "#1a56db", bg: "#eff6ff" },
              ].map((item) => (
                <div
                  key={item.place}
                  className="rounded-xl p-4 text-center"
                  style={{ background: item.bg, border: `1.5px solid ${item.color}30` }}
                >
                  <div className="text-2xl mb-2">{item.place.split(" ")[0]}</div>
                  <div className="font-black text-base" style={{ color: item.color }}>{item.prize}</div>
                  <div className="text-slate-500 text-xs mt-1">{item.extra}</div>
                </div>
              ))}
            </div>

            <div
              className="mt-4 p-3 rounded-xl flex items-start gap-2"
              style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
            >
              <Star className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-blue-800 text-xs leading-relaxed">
                <strong>Thưởng thêm từ Nam Thanh Travel:</strong> Đội vô địch nhận thêm combo du lịch trọn gói
                2 người tới Đà Nẵng hoặc Phú Quốc — được lựa chọn theo ý thích.
                Các cầu thủ xuất sắc của giải nhận voucher du lịch trị giá 500.000đ mỗi người.
              </p>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Cta bottom */}
      <div
        className="mt-8 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg,#0c2340,#1e3a6e)",
          border: "1px solid rgba(14,165,233,0.2)",
        }}
      >
        <div className="text-center md:text-left">
          <div className="text-white font-black text-lg">Sẵn sàng tham chiến?</div>
          <div className="text-sky-300/80 text-sm mt-1">Đăng ký đội tham dự trước ngày 15/05/2025</div>
        </div>
        <div className="flex gap-3">
          <a
            href="/lien-he"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)" }}
          >
            <Plane className="w-4 h-4" />
            Đăng ký ngay
          </a>
          <a
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-sky-200 transition-all"
            style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}
          >
            <Trophy className="w-4 h-4" />
            Xem bracket
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
