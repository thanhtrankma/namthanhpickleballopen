import { NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwmgYSSzqNtd-8wkmh4tf2xASGFZihHzpiPoZbseW49kXDacU3CeVhaRkrUbl11lLOzAg/exec";

type UpstreamRow = {
  stt: number;
  time: string;
  court: string | number;
  category: string;
  match: string;
  players?: string;
  score_team1?: string | number;
  score_team2?: string | number;
  status?: string;
};

function toScoreString(v: string | number | null | undefined): string {
  if (v === null || v === undefined) return "";
  const s = String(v).trim();
  return /^\d+$/.test(s) ? s : "";
}

function normalizeTime(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(d);
}

export async function GET() {
  try {
    const res = await fetch(APPS_SCRIPT_URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: `Upstream HTTP ${res.status}` }, { status: 502 });
    }

    const payload = (await res.json()) as UpstreamRow[];
    if (!Array.isArray(payload)) {
      return NextResponse.json({ error: "Dữ liệu upstream không đúng định dạng" }, { status: 502 });
    }

    const rows = payload
      .map((r) => ({
        stt: r.stt,
        time: normalizeTime(r.time),
        court: r.court ?? "",
        category: String(r.category ?? ""),
        match: String(r.match ?? ""),
        players: r.players ?? "",
        score_team1: toScoreString(r.score_team1),
        score_team2: toScoreString(r.score_team2),
        status: r.status ?? "",
      }))
      .sort((a, b) => a.stt - b.stt);

    return NextResponse.json({ rows });
  } catch (err) {
    console.error("live-schedule GET error:", err);
    return NextResponse.json({ error: "Không thể lấy dữ liệu lịch thi đấu" }, { status: 503 });
  }
}
