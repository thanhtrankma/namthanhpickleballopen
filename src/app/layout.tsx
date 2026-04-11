import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "NAM THANH & PARTNERS PICKLEBALL CUP 2026 · Nam Thanh Travel",
  description:
    "Giải pickleball Đôi Nam & Đôi Nam Nữ — 18/04/2026, Sân Pickleball Bồ Đề, Hà Nội. Đơn vị tổ chức Nam Thanh Travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
