import PageLayout from "@/components/PageLayout";
import {
  Phone, Mail, MapPin, Globe, Clock,
  Facebook, Youtube, Instagram, Plane,
} from "lucide-react";

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  color: string;
}) {
  const inner = (
    <div
      className="flex items-start gap-4 p-4 rounded-xl border transition-all duration-150 hover:scale-[1.01]"
      style={{ background: `${color}0a`, borderColor: `${color}25` }}
    >
      <div
        className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
        style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs text-slate-400 font-medium mb-0.5">{label}</div>
        <div className="text-sm font-bold text-slate-800">{value}</div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block no-underline">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}

export default function LienHePage() {
  return (
    <PageLayout
      title="Liên hệ"
      subtitle="Nam Thanh Travel · Hỗ trợ & thông tin liên lạc"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div
            className="px-5 py-4"
            style={{
              background: "linear-gradient(90deg, #7c2d12 0%, #c2410c 55%, #9a3412 100%)",
              borderBottom: "2px solid rgba(251,191,36,0.35)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Plane className="w-4 h-4 text-amber-300" />
              <span className="font-black text-white text-sm">Nam Thanh Travel</span>
            </div>
            <p className="text-amber-100/90 text-xs">Lữ hành quốc tế · Hà Nội</p>
          </div>
          <div className="p-4 space-y-3">
            <ContactCard
              icon={Phone}
              label="Hotline"
              value="Mrs. Thắm: 096 897 1918"
              href="tel:0968971918"
              color="#ef4444"
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value="namthanhtravel@gmail.com"
              href="mailto:namthanhtravel@gmail.com"
              color="#1a56db"
            />
            <ContactCard
              icon={MapPin}
              label="Địa chỉ"
              value="51 Đào Duy Từ, Hoàn Kiếm, Hà Nội"
              color="#10b981"
            />
            <ContactCard
              icon={Globe}
              label="Website"
              value="namthanhtravel.com.vn"
              href="https://namthanhtravel.com.vn"
              color="#8b5cf6"
            />
            <ContactCard
              icon={Clock}
              label="Giờ làm việc"
              value="Thứ 2 – Thứ 7: 8:00 – 18:00"
              color="#f59e0b"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Mạng xã hội
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { icon: Facebook, label: "Facebook", href: "https://facebook.com", color: "#1877f2", bg: "#eff6ff" },
              { icon: Youtube, label: "YouTube", href: "https://youtube.com", color: "#ef4444", bg: "#fef2f2" },
              { icon: Instagram, label: "Instagram", href: "https://instagram.com", color: "#e1306c", bg: "#fdf2f8" },
            ].map(({ icon: Icon, label, href, color, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all hover:scale-105"
                style={{ background: bg, borderColor: `${color}25` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
                <span className="text-[10px] font-bold" style={{ color }}>
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div
          className="w-full rounded-2xl overflow-hidden flex items-center justify-center relative"
          style={{
            height: 200,
            background: "linear-gradient(135deg,#ffedd5 0%,#fed7aa 60%,#ffedd5 100%)",
            border: "1px solid #fdba74",
          }}
        >
          <div className="text-center z-10 relative px-4">
            <MapPin className="w-10 h-10 mx-auto mb-2 text-orange-500 opacity-80" />
            <div className="font-bold text-orange-900 text-sm">51 Đào Duy Từ, Hoàn Kiếm, Hà Nội</div>
            <div className="text-orange-700/80 text-xs mt-1">Văn phòng Nam Thanh Travel</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
