import { NextRequest, NextResponse } from "next/server";

const SUBJECTS: Record<string, string> = {
  "dang-ky": "📋 Đăng ký đội tham dự",
  "tai-tro":  "🤝 Trở thành nhà tài trợ",
  "the-le":   "📖 Hỏi về thể lệ",
  "tour":     "✈️ Tư vấn tour du lịch",
  "other":    "💬 Khác",
};

export async function POST(req: NextRequest) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json({ error: "Telegram chưa được cấu hình" }, { status: 500 });
  }

  let body: {
    name?: string;
    phone?: string;
    email?: string;
    subject?: string;
    categories?: string[];
    message?: string;
    time?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const {
    name = "–", phone = "–", email = "–",
    subject = "", categories = [], message = "–", time = "",
  } = body;
  const subjectLabel = SUBJECTS[subject] ?? subject ?? "–";

  const h = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const CATEGORY_LABELS: Record<string, string> = {
    "doi-nam":    "🏸 Đôi Nam",
    "doi-nam-nu": "👫 Đôi Nam Nữ",
  };

  const lines: string[] = [
    `🏆 <b>NAM THANH TRAVEL OPEN — Liên hệ mới!</b>`,
    ``,
    `👤 <b>Họ tên:</b> ${h(name)}`,
    `📱 <b>Điện thoại:</b> ${h(phone)}`,
    `📧 <b>Email:</b> ${h(email || "–")}`,
    `📌 <b>Chủ đề:</b> ${h(subjectLabel)}`,
  ];

  if (categories.length > 0) {
    const catLabel = categories.map((c) => CATEGORY_LABELS[c] ?? c).join("  +  ");
    lines.push(`🏸 <b>Nội dung thi đấu:</b> ${h(catLabel)}`);
  }

  lines.push(
    ``,
    `💬 <b>Nội dung:</b>`,
    `<pre>${h(subjectLabel)} ${h(message)}</pre>`,
    `🕐 <b>Thời gian:</b> ${h(time || new Date().toLocaleString("vi-VN"))}`,
    ``,
    `<i>— Gửi từ namthanhtravel.com.vn</i>`,
  );

  const text = lines.join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    const result = await res.json() as { ok: boolean; description?: string };

    if (!result.ok) {
      console.error("Telegram API error:", result.description);
      return NextResponse.json({ error: result.description }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram fetch error:", err);
    return NextResponse.json({ error: "Không thể kết nối Telegram" }, { status: 503 });
  }
}
