"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Trophy, RotateCcw, Edit3, Check, Plane,
  Phone, Globe, Facebook, Star, ChevronUp,
} from "lucide-react";
import AdBanner from "@/components/AdBanner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Team {
  id: string;
  name: string;
}

interface GroupMatch {
  id: string;
  team1Idx: number;
  team2Idx: number;
  score1: string;
  score2: string;
}

interface Group {
  id: string;
  letter: string;
  teams: Team[];
  matches: GroupMatch[];
}

type TournamentData = Group[];

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "tournament_group_v1";
const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
// All C(4,2) = 6 pairs for round-robin
const RR_PAIRS: [number, number][] = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];

// ─── Initial data ─────────────────────────────────────────────────────────────

function generateInitialData(): TournamentData {
  let n = 1;
  return GROUP_LETTERS.map((letter, g) => ({
    id: `g${g}`,
    letter,
    teams: Array.from({ length: 4 }, (_, t) => ({
      id: `t${n + t}`,
      name: `Đội ${n + t}`,
    })),
    matches: RR_PAIRS.map(([i, j], m) => ({
      id: `g${g}-m${m}`,
      team1Idx: i,
      team2Idx: j,
      score1: "",
      score2: "",
    })),
  })).map((g) => { n += 4; return g; })
    // n increment happens after spread — fix with explicit counter below
    .reduce<{ list: TournamentData; n: number }>(
      (acc, _g, idx) => {
        const start = idx * 4 + 1;
        const g: Group = {
          id: `g${idx}`,
          letter: GROUP_LETTERS[idx],
          teams: Array.from({ length: 4 }, (_, t) => ({
            id: `t${start + t}`,
            name: `Đội ${start + t}`,
          })),
          matches: RR_PAIRS.map(([i, j], m) => ({
            id: `g${idx}-m${m}`,
            team1Idx: i,
            team2Idx: j,
            score1: "",
            score2: "",
          })),
        };
        acc.list.push(g);
        return acc;
      },
      { list: [], n: 1 }
    ).list
}

// ─── Standings calculation ────────────────────────────────────────────────────

interface Standing {
  team: Team;
  teamIdx: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
}

function calcStandings(group: Group): Standing[] {
  const rows: Standing[] = group.teams.map((team, idx) => ({
    team, teamIdx: idx,
    played: 0, won: 0, drawn: 0, lost: 0,
    gf: 0, ga: 0, gd: 0, pts: 0,
  }));

  for (const m of group.matches) {
    if (m.score1 === "" || m.score2 === "") continue;
    const s1 = parseInt(m.score1);
    const s2 = parseInt(m.score2);
    if (isNaN(s1) || isNaN(s2)) continue;

    const r1 = rows[m.team1Idx];
    const r2 = rows[m.team2Idx];
    r1.played++; r2.played++;
    r1.gf += s1; r1.ga += s2;
    r2.gf += s2; r2.ga += s1;

    if (s1 > s2)      { r1.won++; r1.pts += 3; r2.lost++; }
    else if (s2 > s1) { r2.won++; r2.pts += 3; r1.lost++; }
    else              { r1.drawn++; r1.pts++;   r2.drawn++; r2.pts++; }
  }

  rows.forEach((r) => (r.gd = r.gf - r.ga));
  rows.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.teamIdx - b.teamIdx);
  return rows;
}

function groupCompleted(group: Group): boolean {
  return group.matches.every((m) => m.score1 !== "" && m.score2 !== "");
}

// ─── World Map Background ────────────────────────────────────────────────────

function WorldMapPattern() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 0, opacity: 0.04 }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M 80 80 Q 120 60 180 75 L 220 90 Q 260 85 280 110 L 295 140 Q 290 175 270 190 L 240 200 Q 200 210 175 195 L 155 180 Q 120 170 100 150 Q 70 130 75 105 Z" fill="#0f2a50"/>
      <path d="M 195 230 Q 230 215 255 225 L 270 245 Q 280 280 275 320 L 260 355 Q 240 375 215 370 L 195 350 Q 175 320 180 285 Q 182 255 195 230 Z" fill="#0f2a50"/>
      <path d="M 460 60 Q 510 50 545 65 L 565 85 Q 580 100 570 120 L 545 135 Q 520 145 495 138 L 470 125 Q 450 105 455 80 Z" fill="#0f2a50"/>
      <path d="M 470 165 Q 510 150 545 162 L 560 185 Q 575 220 572 265 L 558 300 Q 540 325 515 328 L 490 320 Q 465 300 460 265 Q 455 225 462 190 Z" fill="#0f2a50"/>
      <path d="M 580 50 Q 650 35 730 50 L 800 65 Q 860 75 890 100 L 905 130 Q 910 160 890 180 L 850 195 Q 800 205 750 198 L 690 188 Q 640 175 605 155 L 575 130 Q 558 100 568 72 Z" fill="#0f2a50"/>
      <path d="M 830 300 Q 880 285 930 295 L 960 315 Q 975 340 968 370 L 945 390 Q 915 400 880 393 L 850 378 Q 825 358 825 330 Z" fill="#0f2a50"/>
      {[[230,145,520,100],[520,100,720,130],[720,130,900,350]].map(([x1,y1,x2,y2],i) => (
        <g key={i}>
          <path d={`M ${x1} ${y1} Q ${(x1+x2)/2} ${Math.min(y1,y2)-40} ${x2} ${y2}`}
            fill="none" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="6 5" opacity="0.5"/>
          <circle cx={x1} cy={y1} r="3" fill="#f97316" opacity="0.6"/>
          <circle cx={x2} cy={y2} r="3" fill="#f97316" opacity="0.6"/>
        </g>
      ))}
    </svg>
  );
}

// ─── Editable Team Name ───────────────────────────────────────────────────────

function EditableName({
  name,
  onCommit,
  className = "",
}: {
  name: string;
  onCommit: (v: string) => void;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  const commit = () => {
    const v = draft.trim();
    if (v) onCommit(v);
    else setDraft(name);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={ref}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(name); setEditing(false); } }}
        className="bg-white border-2 border-teal-400 rounded px-1 py-0 text-xs font-semibold outline-none text-slate-800 w-full"
      />
    );
  }

  return (
    <span
      className={`group/name flex items-center gap-1 cursor-pointer ${className}`}
      onDoubleClick={() => { setDraft(name); setEditing(true); }}
      title="Double-click để đổi tên"
    >
      <span className="truncate">{name}</span>
      <Edit3 className="w-2.5 h-2.5 text-slate-300 opacity-0 group-hover/name:opacity-100 shrink-0 transition-opacity" />
    </span>
  );
}

// ─── Score Cell ───────────────────────────────────────────────────────────────

function ScoreCell({
  value,
  onChange,
  highlight,
}: {
  value: string;
  onChange: (v: string) => void;
  highlight: boolean;
}) {
  return (
    <div
      className="w-8 h-7 rounded flex items-center justify-center shrink-0"
      style={{
        background: highlight ? "#0e7490" : "#1e293b",
        border: highlight ? "1.5px solid #0ea5e9" : "1px solid #334155",
        boxShadow: highlight ? "0 0 6px rgba(14,165,233,0.3)" : "none",
      }}
    >
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
        placeholder="–"
        className="w-full h-full text-center text-xs font-black bg-transparent outline-none"
        style={{ color: highlight ? "#e0f2fe" : "#94a3b8" }}
      />
    </div>
  );
}

// ─── Match Row ────────────────────────────────────────────────────────────────

function MatchRow({
  match,
  group,
  onScoreChange,
}: {
  match: GroupMatch;
  group: Group;
  onScoreChange: (matchId: string, slot: "score1" | "score2", v: string) => void;
}) {
  const t1 = group.teams[match.team1Idx];
  const t2 = group.teams[match.team2Idx];
  const s1 = parseInt(match.score1);
  const s2 = parseInt(match.score2);
  const played = match.score1 !== "" && match.score2 !== "" && !isNaN(s1) && !isNaN(s2);
  const w1 = played && s1 > s2;
  const w2 = played && s2 > s1;

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
      style={{
        background: played ? "rgba(14,165,233,0.06)" : "rgba(255,255,255,0.03)",
        border: played ? "1px solid rgba(14,165,233,0.15)" : "1px solid transparent",
      }}
    >
      {/* Team 1 */}
      <span
        className="flex-1 text-right text-xs truncate"
        style={{
          fontWeight: w1 ? 700 : 500,
          color: w1 ? "#38bdf8" : "#94a3b8",
        }}
        title={t1.name}
      >
        {t1.name}
      </span>

      {/* Score */}
      <div className="flex items-center gap-1 shrink-0">
        <ScoreCell value={match.score1} onChange={(v) => onScoreChange(match.id, "score1", v)} highlight={w1} />
        <span className="text-slate-600 text-xs font-bold">–</span>
        <ScoreCell value={match.score2} onChange={(v) => onScoreChange(match.id, "score2", v)} highlight={w2} />
      </div>

      {/* Team 2 */}
      <span
        className="flex-1 text-left text-xs truncate"
        style={{
          fontWeight: w2 ? 700 : 500,
          color: w2 ? "#38bdf8" : "#94a3b8",
        }}
        title={t2.name}
      >
        {t2.name}
      </span>
    </div>
  );
}

// ─── Standings Table ──────────────────────────────────────────────────────────

function StandingsTable({
  group,
  onNameChange,
}: {
  group: Group;
  onNameChange: (groupId: string, teamIdx: number, name: string) => void;
}) {
  const rows = calcStandings(group);
  const completed = groupCompleted(group);
  const allPlayed6 = group.matches.filter((m) => m.score1 !== "" && m.score2 !== "").length;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-700/50">
      {/* Header */}
      <div
        className="grid text-[10px] font-black uppercase tracking-wider px-2 py-1.5"
        style={{
          gridTemplateColumns: "1.2rem 1fr 2rem 2rem 2rem 2rem 2rem",
          background: "#0f172a",
          color: "#475569",
        }}
      >
        <span>#</span>
        <span>Đội</span>
        <span className="text-center">Đ</span>
        <span className="text-center">T</span>
        <span className="text-center">H</span>
        <span className="text-center">B</span>
        <span className="text-center font-black" style={{ color: "#38bdf8" }}>Đ</span>
      </div>

      {/* Rows */}
      {rows.map((row, rank) => {
        const isTop2 = rank < 2;
        const qualified = completed && isTop2;
        return (
          <div
            key={row.team.id}
            className="grid items-center px-2 py-1.5 text-xs border-t border-slate-800"
            style={{
              gridTemplateColumns: "1.2rem 1fr 2rem 2rem 2rem 2rem 2rem",
              background: qualified
                ? "rgba(16,185,129,0.08)"
                : isTop2 && allPlayed6 > 0
                ? "rgba(14,165,233,0.05)"
                : "transparent",
            }}
          >
            {/* Rank */}
            <span className="text-slate-500 font-mono text-[10px]">{rank + 1}</span>

            {/* Name — editable */}
            <div className="flex items-center gap-1 min-w-0">
              {qualified && (
                <ChevronUp className="w-3 h-3 text-emerald-400 shrink-0" />
              )}
              <EditableName
                name={row.team.name}
                onCommit={(v) => onNameChange(group.id, row.teamIdx, v)}
                className={`text-xs font-semibold ${qualified ? "text-emerald-300" : isTop2 ? "text-sky-200" : "text-slate-400"}`}
              />
            </div>

            {/* Stats */}
            <span className="text-center text-slate-500">{row.played}</span>
            <span className="text-center text-emerald-400">{row.won}</span>
            <span className="text-center text-slate-500">{row.drawn}</span>
            <span className="text-center text-red-400">{row.lost}</span>
            <span
              className="text-center font-black"
              style={{ color: "#38bdf8" }}
            >
              {row.pts}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Group Card ───────────────────────────────────────────────────────────────

const GROUP_COLORS = [
  "#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899",
  "#f59e0b", "#10b981", "#ef4444", "#6366f1",
];

function GroupCard({
  group,
  onScoreChange,
  onNameChange,
}: {
  group: Group;
  onScoreChange: (groupId: string, matchId: string, slot: "score1" | "score2", v: string) => void;
  onNameChange: (groupId: string, teamIdx: number, name: string) => void;
}) {
  const [showMatches, setShowMatches] = useState(true);
  const gIdx = GROUP_LETTERS.indexOf(group.letter);
  const color = GROUP_COLORS[gIdx] ?? "#3b82f6";
  const played = group.matches.filter((m) => m.score1 !== "" && m.score2 !== "").length;
  const completed = played === 6;

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{
        background: "#0f172a",
        border: `1px solid ${color}35`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${color}15`,
      }}
    >
      {/* ── Card header ── */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{
          background: `linear-gradient(90deg, ${color}22 0%, transparent 100%)`,
          borderBottom: `1px solid ${color}30`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white shadow-lg"
            style={{ background: `linear-gradient(135deg,${color},${color}99)`, boxShadow: `0 2px 8px ${color}40` }}
          >
            {group.letter}
          </div>
          <div>
            <div className="font-black text-white text-sm">Bảng {group.letter}</div>
            <div className="text-[10px]" style={{ color: `${color}99` }}>
              {played}/6 trận · {completed ? "✓ Hoàn tất" : `còn ${6 - played}`}
            </div>
          </div>
        </div>

        {completed && (
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}
          >
            <Star className="w-3 h-3" />
            Xong
          </div>
        )}
      </div>

      {/* ── Standings ── */}
      <div className="px-3 pt-3 pb-2">
        <div className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500 mb-1.5 flex items-center gap-1.5">
          <Trophy className="w-3 h-3" style={{ color }} />
          Bảng xếp hạng
          <span className="text-[8px] text-slate-600">(Thắng=3 · Hòa=1)</span>
        </div>
        <StandingsTable group={group} onNameChange={onNameChange} />
      </div>

      {/* ── Matches toggle ── */}
      <button
        className="mx-3 mb-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
        style={{
          background: showMatches ? `${color}15` : "transparent",
          color: showMatches ? color : "#475569",
          border: `1px solid ${showMatches ? color + "30" : "#1e293b"}`,
        }}
        onClick={() => setShowMatches((v) => !v)}
      >
        <span>{showMatches ? "▾" : "▸"}</span>
        Lịch & Kết quả trận đấu
      </button>

      {/* ── Matches ── */}
      {showMatches && (
        <div className="px-3 pb-3 space-y-1">
          {group.matches.map((match, i) => (
            <div key={match.id} className="flex items-center gap-1.5">
              <span className="text-[9px] text-slate-600 font-mono w-5 shrink-0 text-right">{i + 1}.</span>
              <div className="flex-1">
                <MatchRow
                  match={match}
                  group={group}
                  onScoreChange={(mId, slot, v) => onScoreChange(group.id, mId, slot, v)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BracketStage() {
  const [data, setData] = useState<TournamentData>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setData(saved ? (JSON.parse(saved) as TournamentData) : generateInitialData());
    } catch {
      setData(generateInitialData());
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  const handleScoreChange = useCallback(
    (groupId: string, matchId: string, slot: "score1" | "score2", v: string) => {
      setData((prev) =>
        prev.map((g) =>
          g.id !== groupId
            ? g
            : {
                ...g,
                matches: g.matches.map((m) =>
                  m.id !== matchId ? m : { ...m, [slot]: v }
                ),
              }
        )
      );
    },
    []
  );

  const handleNameChange = useCallback(
    (groupId: string, teamIdx: number, name: string) => {
      setData((prev) =>
        prev.map((g) =>
          g.id !== groupId
            ? g
            : {
                ...g,
                teams: g.teams.map((t, i) => (i === teamIdx ? { ...t, name } : t)),
              }
        )
      );
    },
    []
  );

  const handleReset = () => {
    if (!confirm("Reset toàn bộ giải đấu? Dữ liệu sẽ bị xóa.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setData(generateInitialData());
  };

  // Summary stats
  const totalPlayed = data.reduce(
    (acc, g) => acc + g.matches.filter((m) => m.score1 !== "" && m.score2 !== "").length,
    0
  );
  const totalMatches = data.reduce((acc, g) => acc + g.matches.length, 0);
  const completedGroups = data.filter(groupCompleted).length;

  if (!hydrated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(145deg,#0c1929,#0f2a50)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <Plane className="w-8 h-8 text-cyan-500 animate-bounce" />
          <span className="text-sky-300 font-semibold text-sm" style={{ fontFamily: "'Montserrat',sans-serif" }}>
            Đang tải dữ liệu...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative" style={{ fontFamily: "'Montserrat',sans-serif" }}>
      <WorldMapPattern />

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <header
        className="relative z-10 w-full"
        style={{
          background: "linear-gradient(135deg,#0c2340 0%,#1e3a6e 50%,#0e4d7a 100%)",
          boxShadow: "0 4px 32px rgba(12,35,64,0.5)",
        }}
      >
        {/* Top bar */}
        <div className="px-6 py-2.5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png" alt="Nam Thanh Travel"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <Plane className="w-5 h-5 text-orange-400 hidden" />
            </div>
            <div>
              <div className="text-white font-black text-sm tracking-wide">NAM THANH TRAVEL</div>
              <div className="text-cyan-300 text-[10px] font-medium">Lữ hành quốc tế</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-blue-200">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-semibold">1900 xxxx</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              namthanhtravel.com.vn
            </span>
          </div>
        </div>

        {/* Banner */}
        <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1
              className="text-xl md:text-2xl font-black text-white leading-tight"
              style={{ textShadow: "0 2px 12px rgba(56,189,248,0.4)" }}
            >
              GIẢI ĐẤU
              <span
                className="ml-2 text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg,#38bdf8,#f97316)" }}
              >
                NAM THANH TRAVEL OPEN
              </span>
            </h1>
            <p className="text-cyan-200/80 text-xs font-medium tracking-widest mt-1">
              ✈ Chinh Phục Đỉnh Cao – Kết Nối Đam Mê ✈
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {[
                { label: "8 Bảng đấu", color: "#38bdf8" },
                { label: "32 Đội", color: "#a78bfa" },
                { label: "Vòng tròn tính điểm", color: "#f97316" },
                { label: `${totalPlayed}/${totalMatches} Trận`, color: "#10b981" },
                { label: `${completedGroups}/8 Bảng xong`, color: "#fbbf24" },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                  style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold
              bg-white/10 border border-white/20 text-blue-200
              hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300
              transition-all duration-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </header>

      {/* ── AD STRIP ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <AdBanner variant="strip" />
      </div>

      {/* ── LEGEND ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 px-6 py-2 flex flex-wrap items-center gap-5 text-[11px]"
        style={{ background: "rgba(15,23,42,0.9)", borderBottom: "1px solid rgba(148,163,184,0.1)" }}
      >
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50 inline-block" />
          Top 2 mỗi bảng đi tiếp
        </span>
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          <Edit3 className="w-3 h-3 text-sky-400" />
          Double-click tên đội để đổi
        </span>
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          <Check className="w-3 h-3 text-teal-400" />
          Thắng: 3đ · Hòa: 1đ · Thua: 0đ
        </span>
      </div>

      {/* ── GROUPS GRID ──────────────────────────────────────────────────────── */}
      <main
        className="relative z-10 flex-1 px-4 md:px-6 py-6"
        style={{ background: "linear-gradient(180deg,#0c1929 0%,#0a1628 100%)" }}
      >
        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">Tiến độ giải đấu</span>
            <span className="font-black" style={{ color: "#38bdf8" }}>
              {Math.round((totalPlayed / totalMatches) * 100)}%
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1e293b" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(totalPlayed / totalMatches) * 100}%`,
                background: "linear-gradient(90deg,#1a56db,#0ea5e9,#38bdf8)",
              }}
            />
          </div>
          <div className="mt-1.5 text-[10px] text-slate-500">
            {totalPlayed} / {totalMatches} trận đã có kết quả
          </div>
        </div>

        {/* 8 Group cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onScoreChange={handleScoreChange}
              onNameChange={handleNameChange}
            />
          ))}
        </div>

        {/* All-groups completed message */}
        {completedGroups === 8 && (
          <div
            className="mt-8 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center"
            style={{
              background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(14,165,233,0.1))",
              border: "1.5px solid rgba(16,185,129,0.35)",
            }}
          >
            <Trophy className="w-10 h-10 text-amber-400 shrink-0" style={{ filter: "drop-shadow(0 0 10px rgba(251,191,36,0.5))" }} />
            <div>
              <div className="font-black text-white text-xl mb-1">🎉 Vòng Bảng Hoàn Tất!</div>
              <div className="text-emerald-300 text-sm">
                16 đội đứng đầu bảng đã xác định — Sẵn sàng cho Vòng Loại Trực Tiếp!
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        className="relative z-10 w-full"
        style={{
          background: "linear-gradient(135deg,#0c2340 0%,#0e3d6b 100%)",
          borderTop: "2px solid rgba(56,189,248,0.2)",
        }}
      >
        <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-blue-300/80">
            <Plane className="w-4 h-4 text-orange-400" />
            <span>
              Thiết kế bởi{" "}
              <span className="font-bold text-cyan-300">Nam Thanh Travel</span>
              {" "}— Đơn vị lữ hành hàng đầu Việt Nam
            </span>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, color: "#3b82f6", hover: "hover:bg-blue-600/40" },
              { icon: Globe,    color: "#06b6d4", hover: "hover:bg-cyan-500/30" },
              { icon: Phone,    color: "#f97316", hover: "hover:bg-orange-500/30" },
            ].map(({ icon: Icon, color, hover }, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center ${hover} transition-all`}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
