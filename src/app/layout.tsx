import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Nam Thanh Travel Open · Giải đấu 32 Đội",
  description: "Trang quản lý sơ đồ thi đấu single-elimination 32 đội — Nam Thanh Travel Open",
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
