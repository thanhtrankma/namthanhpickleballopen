import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import {
  Users, Clock, Trophy, Shield, CheckCircle,
  AlertCircle, Star, Plane, Award, Heart,
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
        <h2 className="font-black text-slate-800 text-base leading-snug">{title}</h2>
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mt-4 mb-2 first:mt-0">
      {children}
    </h3>
  );
}

function RuleLine({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-700 text-sm leading-relaxed pl-0">{children}</p>;
}

export default function TheLePage() {
  return (
    <PageLayout
      title="Thể lệ Giải đấu"
      subtitle="NAM THANH & PARTNERS PICKLEBALL CUP 2026 · Quy định & Điều lệ"
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* Đôi Nam Nữ */}
        <SectionCard
          icon={Heart}
          title="Thể lệ giải đấu — Đôi Nam Nữ"
          color="#ec4899"
        >
          <p className="text-slate-600 text-sm font-semibold mb-3">
            Giải đấu: <span className="text-slate-800">NAM THANH & PARTNERS PICKLEBALL CUP 2026</span>
          </p>
          <SubHeading>Số lượng tham dự</SubHeading>
          <RuleLine>20 cặp thi đấu.</RuleLine>
          <SubHeading>Vòng bảng</SubHeading>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm">
            <li>20 đội chia thành 4 bảng (mỗi bảng 5 đội).</li>
            <li>Thi đấu vòng tròn tính điểm.</li>
            <li>
              Cách tính điểm: <strong>Thắng: 1 điểm</strong> — <strong>Thua: 0 điểm</strong>.
            </li>
            <li>Mỗi trận thi đấu chạm 11 điểm.</li>
            <li>Nếu 2 đội bằng điểm: xét hiệu số, thành tích đối đầu trực tiếp, bốc thăm.</li>
          </ul>
          <SubHeading>Vé vào vòng Tứ kết</SubHeading>
          <RuleLine>
            2 đội <strong>Nhất</strong> &amp; <strong>Nhì</strong> mỗi bảng vào vòng Tứ kết.
          </RuleLine>
          <SubHeading>Vòng knock-out</SubHeading>
          <RuleLine>
            Vòng Tứ kết, Bán kết, Chung kết thi đấu <strong>loại trực tiếp</strong>.
          </RuleLine>
          <SubHeading>Trận Bán kết</SubHeading>
          <RuleLine>Thi đấu 11 điểm, cách 2, tối đa 13 điểm kết thúc.</RuleLine>
          <SubHeading>Trận Chung kết</SubHeading>
          <RuleLine>Thi đấu 15 điểm, tối đa 17 điểm kết thúc.</RuleLine>
        </SectionCard>

        {/* Đôi Nam */}
        <SectionCard icon={Users} title="Thể lệ giải đấu — Đôi Nam" color="#2563eb">
          <p className="text-slate-600 text-sm font-semibold mb-3">
            Giải đấu: <span className="text-slate-800">NAM THANH & PARTNERS PICKLEBALL CUP 2026</span>
          </p>
          <SubHeading>Số lượng tham dự</SubHeading>
          <RuleLine>24 cặp thi đấu.</RuleLine>
          <SubHeading>Vòng bảng</SubHeading>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm">
            <li>24 đội chia thành 6 bảng (mỗi bảng 4 đội).</li>
            <li>Thi đấu vòng tròn tính điểm.</li>
            <li>
              Cách tính điểm: <strong>Thắng: 1 điểm</strong> — <strong>Thua: 0 điểm</strong>.
            </li>
            <li>Mỗi trận thi đấu chạm 11 điểm.</li>
            <li>Nếu 2 đội bằng điểm: xét hiệu số, thành tích đối đầu trực tiếp, bốc thăm.</li>
          </ul>
          <SubHeading>Vé vào vòng knock-out</SubHeading>
          <RuleLine>
            2 đội <strong>Nhất</strong> &amp; <strong>Nhì</strong> mỗi bảng +{" "}
            <strong>4 đội hạng 3</strong> có thành tích tốt nhất.
          </RuleLine>
          <SubHeading>Vòng knock-out</SubHeading>
          <RuleLine>
            Từ vòng 1/8 thi đấu loại trực tiếp đến Chung kết.
          </RuleLine>
          <SubHeading>Trận Bán kết</SubHeading>
          <RuleLine>Thi đấu 11 điểm, cách 2, tối đa 13 điểm kết thúc.</RuleLine>
          <SubHeading>Trận Chung kết</SubHeading>
          <RuleLine>Thi đấu 15 điểm, tối đa 17 điểm kết thúc.</RuleLine>
        </SectionCard>

        {/* Eligibility */}
        {/* <SectionCard icon={Users} title="Điều kiện tham gia" color="#0ea5e9">
          <ul className="space-y-0">
            <Check2 text="Đội có từ 5 đến 11 thành viên chính thức. Được đăng ký tối đa 3 dự bị." />
            <Check2 text="Thành viên đủ 18 tuổi trở lên. Xuất trình CMND/CCCD khi đăng ký." />
            <Check2 text="Đội đến từ các tỉnh thành trên cả nước đều được chào đón tham gia." />
            <Check2 text="Phí đăng ký: 500.000đ/đội (đã bao gồm bộ quần áo thi đấu)." />
            <Check2 text="Nộp danh sách đội trước ngày 15/05/2025. Sau thời hạn sẽ không được xét duyệt." />
            <Warn text="Thành viên của một đội không được đăng ký thi đấu cho đội khác trong cùng giải." />
            <Warn text="Ban tổ chức có quyền từ chối đội không đáp ứng đủ điều kiện tham dự." />
          </ul>
        </SectionCard> */}

        {/* Schedule */}
        {/* <SectionCard icon={Clock} title="Lịch thi đấu & Thời gian" color="#8b5cf6">
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
        </SectionCard> */}

        {/* Rules */}
        <SectionCard icon={Shield} title="Quy định trong thi đấu" color="#ef4444">
          <ul className="space-y-0">
            <Rule index={1} text="Các đội phải có mặt tại sân thi đấu trước 30 phút. Trễ quá 5 phút kể từ giờ thi đấu sẽ bị xử thua." />
            <Rule index={2} text="Trang phục thi đấu đồng màu, in số áo rõ ràng. Không mặc áo có hình ảnh, thông điệp phản cảm." />
            <Rule index={3} text="Tuyệt đối không có hành vi bạo lực, xúc phạm đối thủ, trọng tài hoặc ban tổ chức." />
            <Rule index={4} text="Quyết định của Trọng tài và Ban Tổ chức là quyết định cuối cùng và không thể kháng cáo." />
            <Rule index={5} text="Cầu thủ nhận 2 thẻ vàng trong một trận hoặc 1 thẻ đỏ sẽ bị đình chỉ trận tiếp theo." />
          </ul>
        </SectionCard>

        {/* Awards — full width */}
        <div className="md:col-span-2">
          <SectionCard icon={Award} title="Cơ cấu giải thưởng" color="#f59e0b">
            <div className="space-y-4">
              <h3 className="text-center font-black text-slate-800 text-sm md:text-base leading-snug">
                🏆 Cơ cấu giải thưởng NAM THANH &amp; PARTNERS PICKLEBALL CUP 2026
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed text-center max-w-3xl mx-auto">
                Nội dung đáng mong chờ nhất đây rồi! Cùng Nam Thanh Travel điểm danh những phần thưởng cực khủng đang chờ các tay vợt chinh phục tại giải đấu năm nay 🔥
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-2">
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: "#fffbeb", borderColor: "rgba(245,158,11,0.35)" }}
                >
                  <div className="text-2xl mb-2 text-center">🥇</div>
                  <p className="font-black text-amber-800 text-sm text-center mb-2">2 GIẢI NHẤT</p>
                  <p className="text-slate-700 text-sm leading-relaxed text-center">
                    Mỗi giải <strong>4.000.000 VNĐ</strong> + 2 vé nội địa FOC + Quà tặng đặc biệt từ các hãng hàng không + Cúp lưu niệm
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: "#f8fafc", borderColor: "rgba(148,163,184,0.35)" }}
                >
                  <div className="text-2xl mb-2 text-center">🥈</div>
                  <p className="font-black text-slate-700 text-sm text-center mb-2">2 GIẢI NHÌ</p>
                  <p className="text-slate-700 text-sm leading-relaxed text-center">
                    Mỗi giải <strong>2.000.000 VNĐ</strong> + 2 vé nội địa FOC + Quà tặng đặc biệt từ các hãng hàng không + Cúp lưu niệm
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 border md:col-span-1"
                  style={{ background: "#fff7ed", borderColor: "rgba(234,88,12,0.3)" }}
                >
                  <div className="text-2xl mb-2 text-center">🥉</div>
                  <p className="font-black text-amber-900 text-sm text-center mb-2">4 GIẢI BA</p>
                  <p className="text-slate-700 text-sm leading-relaxed text-center">
                    Mỗi giải <strong>1.000.000 VNĐ</strong> + Quà tặng đặc biệt từ nhà tài trợ + Cúp lưu niệm
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm text-center leading-relaxed">
                Cùng rất nhiều phần quà hấp dẫn khác từ Ban Tổ Chức và các nhà tài trợ đang chờ đón!
              </p>
            </div>

            {/* <div
              className="mt-4 p-3 rounded-xl flex items-start gap-2"
              style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
            >
              <Star className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-blue-800 text-xs leading-relaxed">
                <strong>Thưởng thêm từ Nam Thanh Travel:</strong> Đội vô địch nhận thêm combo du lịch trọn gói
                2 người tới Đà Nẵng hoặc Phú Quốc — được lựa chọn theo ý thích.
                Các cầu thủ xuất sắc của giải nhận voucher du lịch trị giá 500.000đ mỗi người.
              </p>
            </div> */}
          </SectionCard>
        </div>
      </div>

      <div
        className="mt-8 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg,#0c2340,#1e3a6e)",
          border: "1px solid rgba(14,165,233,0.2)",
        }}
      >
        <div className="text-center md:text-left">
          <div className="text-white font-black text-lg">Sẵn sàng tham chiến?</div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/lien-he"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)" }}
          >
            <Plane className="w-4 h-4" />
            Liên hệ ngay
          </Link>
          <Link
            href="/giai-dau"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-sky-200 transition-all"
            style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}
          >
            <Trophy className="w-4 h-4" />
            Vào giải đấu
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
