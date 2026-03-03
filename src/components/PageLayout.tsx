import { Plane, Phone, Globe, Facebook } from "lucide-react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Page hero banner */}
      <div
        className="relative w-full py-10 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0c2340 0%, #1e3a6e 50%, #0e4d7a 100%)",
          minHeight: 160,
        }}
      >
        {/* Decorative planes */}
        <Plane className="absolute left-8 top-6 opacity-5 rotate-12" style={{ width: 80, height: 80 }} />
        <Plane className="absolute right-12 bottom-4 opacity-5 -rotate-12" style={{ width: 60, height: 60 }} />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-12 bg-sky-400/40" />
            <span className="text-[10px] font-bold text-sky-400 tracking-[0.2em] uppercase">
              Nam Thanh Travel Open
            </span>
            <div className="h-px w-12 bg-sky-400/40" />
          </div>
          <h1
            className="text-2xl md:text-3xl font-black text-white"
            style={{ textShadow: "0 2px 12px rgba(14,165,233,0.3)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sky-200/80 text-sm font-medium">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1 bg-gradient-to-b from-slate-50 to-white py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>

      {/* Footer */}
      <footer
        className="w-full"
        style={{
          background: "linear-gradient(135deg, #0c2340 0%, #0e3d6b 100%)",
          borderTop: "2px solid rgba(14,165,233,0.2)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-blue-300/80">
            <Plane className="w-4 h-4 text-orange-400" />
            <span>
              Thiết kế bởi{" "}
              <span className="font-bold text-sky-300">Nam Thanh Travel</span>
              {" "}— Đơn vị lữ hành hàng đầu Việt Nam
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center hover:bg-blue-600/40 transition-all">
              <Facebook className="w-4 h-4 text-blue-300" />
            </a>
            <a href="https://namthanhtravel.com.vn" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center hover:bg-cyan-500/30 transition-all">
              <Globe className="w-4 h-4 text-cyan-300" />
            </a>
            <a href="tel:1900xxxx"
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center hover:bg-orange-500/30 transition-all">
              <Phone className="w-4 h-4 text-orange-300" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
