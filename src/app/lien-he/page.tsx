"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import AdBanner from "@/components/AdBanner";
import {
  Phone, Mail, MapPin, Globe, Clock, Send,
  CheckCircle, Facebook, Youtube, Instagram,
  Plane, Trophy,
} from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

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
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);
  const [submissions, setSubmissions] = useState<(FormState & { time: string })[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("contact_submissions") ?? "[]");
    } catch {
      return [];
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = { ...form, time: new Date().toLocaleString("vi-VN") };
    const updated = [entry, ...submissions].slice(0, 20);
    setSubmissions(updated);
    localStorage.setItem("contact_submissions", JSON.stringify(updated));
    setSent(true);
    setForm(INITIAL);
    setTimeout(() => setSent(false), 4000);
  };

  const fieldCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 font-medium outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-100 placeholder:text-slate-300";

  return (
    <PageLayout
      title="Liên hệ & Đăng ký"
      subtitle="Hotline: 1900 xxxx · namthanhtravel.com.vn"
    >
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Contact form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{ background: "linear-gradient(90deg,#eff6ff,#f0f9ff)", borderBottom: "2px solid #bfdbfe" }}
            >
              <Send className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="font-black text-slate-800">Gửi thông tin đăng ký / Liên hệ</h2>
                <p className="text-xs text-slate-400">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Success message */}
              {sent && (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "#f0fdf4", border: "1.5px solid #86efac" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-green-700 font-semibold text-sm">
                    Đã gửi thành công! Ban tổ chức sẽ liên hệ lại sớm.
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">
                    Họ và tên *
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className={fieldCls}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">
                    Số điện thoại *
                  </label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0912 345 678"
                    className={fieldCls}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={fieldCls}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  Chủ đề
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={fieldCls}
                >
                  <option value="">— Chọn chủ đề —</option>
                  <option value="dang-ky">Đăng ký đội tham dự giải đấu</option>
                  <option value="tai-tro">Trở thành nhà tài trợ</option>
                  <option value="the-le">Hỏi về thể lệ thi đấu</option>
                  <option value="tour">Tư vấn tour du lịch</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  Nội dung *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                  className={`${fieldCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: "linear-gradient(90deg,#1a56db,#0ea5e9)" }}
              >
                <Send className="w-4 h-4" />
                Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* Submissions preview (from localStorage) */}
          {submissions.length > 0 && (
            <div className="mt-5 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
              >
                <span className="font-bold text-slate-600 text-sm">
                  Tin nhắn đã gửi ({submissions.length})
                </span>
                <button
                  className="text-xs text-red-400 hover:text-red-600"
                  onClick={() => {
                    localStorage.removeItem("contact_submissions");
                    setSubmissions([]);
                  }}
                >
                  Xoá tất cả
                </button>
              </div>
              <div className="divide-y divide-slate-50 max-h-56 overflow-y-auto">
                {submissions.map((s, i) => (
                  <div key={i} className="px-5 py-3">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-sm text-slate-800">{s.name}</span>
                      <span className="text-[10px] text-slate-400">{s.time}</span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">{s.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: contact info + ad */}
        <div className="flex flex-col gap-5">
          {/* Contact details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div
              className="px-5 py-4"
              style={{ background: "linear-gradient(135deg,#0c2340,#1e3a6e)", borderBottom: "2px solid rgba(14,165,233,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Plane className="w-4 h-4 text-orange-400" />
                <span className="font-black text-white text-sm">Nam Thanh Travel</span>
              </div>
              <p className="text-sky-300/80 text-xs">Ban tổ chức · Giải đấu 2025</p>
            </div>
            <div className="p-4 space-y-3">
              <ContactCard icon={Phone}   label="Hotline"   value="1900 xxxx" href="tel:1900xxxx"   color="#ef4444" />
              <ContactCard icon={Mail}    label="Email"     value="info@namthanhtravel.com.vn" href="mailto:info@namthanhtravel.com.vn" color="#1a56db" />
              <ContactCard icon={MapPin}  label="Địa chỉ"  value="123 Phố Huế, Hai Bà Trưng, Hà Nội"   color="#10b981" />
              <ContactCard icon={Globe}   label="Website"   value="namthanhtravel.com.vn" href="https://namthanhtravel.com.vn" color="#8b5cf6" />
              <ContactCard icon={Clock}   label="Giờ làm việc" value="Thứ 2 – Thứ 7: 8:00 – 18:00" color="#f59e0b" />
            </div>
          </div>

          {/* Social links */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Mạng xã hội</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Facebook,  label: "Facebook",  href: "https://facebook.com",  color: "#1877f2", bg: "#eff6ff" },
                { icon: Youtube,   label: "YouTube",   href: "https://youtube.com",   color: "#ef4444", bg: "#fef2f2" },
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
                  <span className="text-[10px] font-bold" style={{ color }}>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Ad sidebar */}
          <AdBanner variant="sidebar" />
        </div>
      </div>

      {/* Map placeholder */}
      <div
        className="w-full rounded-2xl overflow-hidden mb-8 flex items-center justify-center relative"
        style={{
          height: 200,
          background: "linear-gradient(135deg,#dbeafe 0%,#cffafe 60%,#d1fae5 100%)",
          border: "1px solid #bfdbfe",
        }}
      >
        <div className="text-center z-10 relative">
          <MapPin className="w-10 h-10 mx-auto mb-2 text-blue-400 opacity-50" />
          <div className="font-bold text-blue-600 text-sm">123 Phố Huế, Hai Bà Trưng, Hà Nội</div>
          <div className="text-blue-400 text-xs mt-1">Google Maps · Chỉ đường</div>
        </div>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-blue-400"
              style={{
                width: 80 + i * 40,
                height: 80 + i * 40,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <AdBanner variant="strip" />

      {/* Partnerships CTA */}
      <div
        className="mt-6 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg,#0c2340,#1e3a6e)",
          border: "1px solid rgba(14,165,233,0.2)",
        }}
      >
        <div className="text-center md:text-left">
          <div className="font-black text-white text-lg">Muốn trở thành nhà tài trợ?</div>
          <div className="text-sky-300/80 text-sm mt-1">
            Gói tài trợ từ 10 triệu đồng — hiện diện thương hiệu trên toàn bộ sự kiện
          </div>
        </div>
        <a
          href="mailto:info@namthanhtravel.com.vn?subject=Hợp tác tài trợ"
          className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)" }}
        >
          <Trophy className="w-4 h-4" />
          Liên hệ hợp tác
        </a>
      </div>
    </PageLayout>
  );
}
