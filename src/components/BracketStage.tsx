"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Trophy, RotateCcw, Edit3, Check, Plane,
  Phone, Globe, Facebook, MapPin,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Team {
  id: string;
  name: string;
}

interface Match {
  id: string;
  round: number;
  matchIndex: number;
  team1: Team | null;
  team2: Team | null;
  score1: string;
  score2: string;
  winnerId: string | null;
}

type BracketData = Match[];

// ─── Constants ────────────────────────────────────────────────────────────────

const ROUND_NAMES = ["Vòng 32", "Vòng 16", "Tứ Kết", "Bán Kết", "Chung Kết"];
const MATCH_COUNTS = [16, 8, 4, 2, 1];
const TOTAL_ROUNDS = 5;
const STORAGE_KEY = "tournament_bracket_v1";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateDefaultTeams(): Team[] {
  return Array.from({ length: 32 }, (_, i) => ({
    id: `team-${i + 1}`,
    name: `Đội ${i + 1}`,
  }));
}

function buildInitialBracket(teams: Team[]): BracketData {
  const matches: Match[] = [];
  for (let i = 0; i < 16; i++) {
    matches.push({
      id: `r0-m${i}`,
      round: 0,
      matchIndex: i,
      team1: teams[i * 2] ?? null,
      team2: teams[i * 2 + 1] ?? null,
      score1: "",
      score2: "",
      winnerId: null,
    });
  }
  for (let r = 1; r < TOTAL_ROUNDS; r++) {
    for (let m = 0; m < MATCH_COUNTS[r]; m++) {
      matches.push({
        id: `r${r}-m${m}`,
        round: r,
        matchIndex: m,
        team1: null,
        team2: null,
        score1: "",
        score2: "",
        winnerId: null,
      });
    }
  }
  return matches;
}

function getMatch(data: BracketData, round: number, matchIndex: number): Match | undefined {
  return data.find((m) => m.round === round && m.matchIndex === matchIndex);
}

function propagateWinner(data: BracketData, round: number, matchIndex: number, winner: Team): BracketData {
  if (round >= TOTAL_ROUNDS - 1) return data;
  const nextRound = round + 1;
  const nextMatchIndex = Math.floor(matchIndex / 2);
  const slot = matchIndex % 2 === 0 ? "team1" : "team2";
  return data.map((m) => {
    if (m.round === nextRound && m.matchIndex === nextMatchIndex) {
      return { ...m, [slot]: winner, winnerId: null, score1: "", score2: "" };
    }
    return m;
  });
}

function clearDescendants(data: BracketData, round: number, matchIndex: number): BracketData {
  let result = data;
  let curRound = round;
  let curIndex = matchIndex;
  while (curRound < TOTAL_ROUNDS - 1) {
    const nextRound = curRound + 1;
    const nextMatchIndex = Math.floor(curIndex / 2);
    const slot = curIndex % 2 === 0 ? "team1" : "team2";
    result = result.map((m) => {
      if (m.round === nextRound && m.matchIndex === nextMatchIndex) {
        return { ...m, [slot]: null, winnerId: null, score1: "", score2: "" };
      }
      return m;
    });
    curRound = nextRound;
    curIndex = nextMatchIndex;
  }
  return result;
}

// ─── World Map SVG Background Pattern ─────────────────────────────────────────

function WorldMapPattern() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 0, opacity: 0.045 }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Simplified world continent silhouettes */}
      {/* North America */}
      <path d="M 80 80 Q 120 60 180 75 L 220 90 Q 260 85 280 110 L 295 140 Q 290 175 270 190 L 240 200 Q 200 210 175 195 L 155 180 Q 120 170 100 150 Q 70 130 75 105 Z" fill="#0f2a50"/>
      {/* South America */}
      <path d="M 195 230 Q 230 215 255 225 L 270 245 Q 280 280 275 320 L 260 355 Q 240 375 215 370 L 195 350 Q 175 320 180 285 Q 182 255 195 230 Z" fill="#0f2a50"/>
      {/* Europe */}
      <path d="M 460 60 Q 510 50 545 65 L 565 85 Q 580 100 570 120 L 545 135 Q 520 145 495 138 L 470 125 Q 450 105 455 80 Z" fill="#0f2a50"/>
      {/* Africa */}
      <path d="M 470 165 Q 510 150 545 162 L 560 185 Q 575 220 572 265 L 558 300 Q 540 325 515 328 L 490 320 Q 465 300 460 265 Q 455 225 462 190 Z" fill="#0f2a50"/>
      {/* Asia */}
      <path d="M 580 50 Q 650 35 730 50 L 800 65 Q 860 75 890 100 L 905 130 Q 910 160 890 180 L 850 195 Q 800 205 750 198 L 690 188 Q 640 175 605 155 L 575 130 Q 558 100 568 72 Z" fill="#0f2a50"/>
      {/* Australia */}
      <path d="M 830 300 Q 880 285 930 295 L 960 315 Q 975 340 968 370 L 945 390 Q 915 400 880 393 L 850 378 Q 825 358 825 330 Z" fill="#0f2a50"/>
      {/* Flight path dots */}
      {[
        [230, 145, 520, 100], [520, 100, 720, 130], [720, 130, 900, 350],
        [230, 230, 490, 240], [490, 240, 720, 130],
      ].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <path
            d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 40} ${x2} ${y2}`}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="1"
            strokeDasharray="6 5"
            opacity="0.6"
          />
          <circle cx={x1} cy={y1} r="3" fill="#f97316" opacity="0.7" />
          <circle cx={x2} cy={y2} r="3" fill="#f97316" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

// ─── TeamSlot ──────────────────────────────────────────────────────────────────

interface TeamSlotProps {
  team: Team | null;
  score: string;
  isWinner: boolean;
  isLoser: boolean;
  onSelectWinner: () => void;
  onScoreChange: (val: string) => void;
  onNameChange: (name: string) => void;
  round: number;
}

function TeamSlot({
  team, score, isWinner, isLoser,
  onSelectWinner, onScoreChange, onNameChange, round,
}: TeamSlotProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(team?.name ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed) onNameChange(trimmed);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") {
      setDraft(team?.name ?? "");
      setEditing(false);
    }
  };

  const isEmpty = !team;

  return (
    <div
      className={[
        "flex items-center gap-1.5 px-2 py-1 h-9 transition-all duration-200 group relative",
        isEmpty
          ? "border border-dashed border-blue-200/60 bg-blue-50/30"
          : isWinner
          ? "bg-linear-to-r from-cyan-500/20 to-blue-500/15 border border-cyan-400/60 shadow-sm"
          : isLoser
          ? "bg-white/30 border border-blue-100/50 opacity-45"
          : "bg-white/70 border border-blue-200/60 hover:border-cyan-400/60 hover:bg-white/90",
      ].join(" ")}
    >
      {/* Win circle button */}
      {!isEmpty && (
        <button
          onClick={onSelectWinner}
          title={isWinner ? "Bỏ chọn" : "Chọn thắng"}
          className={[
            "shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-150 flex items-center justify-center",
            isWinner
              ? "bg-cyan-500 border-cyan-400 shadow-sm shadow-cyan-300"
              : "border-blue-300 hover:border-cyan-500 hover:bg-cyan-50",
          ].join(" ")}
        >
          {isWinner && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />}
        </button>
      )}

      {/* Team name */}
      <div className="flex-1 min-w-0 flex items-center gap-1">
        {isEmpty ? (
          <span className="text-xs text-blue-300/70 italic truncate">Chờ kết quả</span>
        ) : editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            className="w-full bg-white text-blue-900 text-xs px-1.5 py-0.5 rounded-md outline-none border-2 border-cyan-400 focus:border-blue-500 font-medium"
          />
        ) : (
          <span
            className={[
              "text-xs truncate cursor-pointer select-none font-semibold",
              isWinner ? "text-cyan-700" : "text-blue-900",
            ].join(" ")}
            onDoubleClick={() => {
              if (round === 0) { setDraft(team?.name ?? ""); setEditing(true); }
            }}
            title={round === 0 ? "Double-click để đổi tên" : team?.name}
          >
            {team?.name}
          </span>
        )}
        {/* Winner plane icon */}
        {isWinner && <Plane className="w-3 h-3 text-orange-500 shrink-0" />}
      </div>

      {/* Edit icon (round 0 only) */}
      {!isEmpty && round === 0 && !editing && (
        <button
          onClick={() => { setDraft(team?.name ?? ""); setEditing(true); }}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit3 className="w-3 h-3 text-blue-400 hover:text-cyan-600" />
        </button>
      )}

      {/* Score input */}
      {!isEmpty && (
        <input
          type="text"
          value={score}
          onChange={(e) => onScoreChange(e.target.value)}
          placeholder="-"
          maxLength={3}
          className={[
            "shrink-0 w-7 text-center text-xs rounded-md px-1 py-0.5 outline-none border-2 font-bold",
            isWinner
              ? "bg-cyan-50 border-cyan-300 text-cyan-700 focus:border-cyan-500"
              : "bg-blue-50 border-blue-200 text-blue-800 focus:border-cyan-400",
          ].join(" ")}
        />
      )}
    </div>
  );
}

// ─── Match Card ───────────────────────────────────────────────────────────────

interface MatchCardProps {
  match: Match;
  onWinnerSelect: (matchId: string, teamId: string) => void;
  onScoreChange: (matchId: string, slot: "score1" | "score2", value: string) => void;
  onNameChange: (teamId: string, name: string) => void;
}

function MatchCard({ match, onWinnerSelect, onScoreChange, onNameChange }: MatchCardProps) {
  const winner1 = match.winnerId === match.team1?.id;
  const winner2 = match.winnerId === match.team2?.id;

  const handleSelectWinner = (teamId: string | undefined) => {
    if (!teamId) return;
    onWinnerSelect(match.id, match.winnerId === teamId ? "" : teamId);
  };

  return (
    <div
      className="flex flex-col w-48 rounded-xl overflow-hidden shadow-md
        bg-white/80 backdrop-blur-sm border border-blue-200/70
        hover:shadow-xl hover:scale-[1.02] hover:border-cyan-400/60
        transition-all duration-200"
    >
      {/* Match number strip */}
      <div className="h-0.5 bg-linear-to-r from-blue-500 via-cyan-400 to-orange-400" />

      <div className="flex flex-col gap-px p-1">
        <TeamSlot
          team={match.team1}
          score={match.score1}
          isWinner={winner1}
          isLoser={!!match.winnerId && !winner1}
          onSelectWinner={() => handleSelectWinner(match.team1?.id)}
          onScoreChange={(v) => onScoreChange(match.id, "score1", v)}
          onNameChange={(name) => match.team1 && onNameChange(match.team1.id, name)}
          round={match.round}
        />
        <div className="h-px bg-blue-100/80 mx-2" />
        <TeamSlot
          team={match.team2}
          score={match.score2}
          isWinner={winner2}
          isLoser={!!match.winnerId && !winner2}
          onSelectWinner={() => handleSelectWinner(match.team2?.id)}
          onScoreChange={(v) => onScoreChange(match.id, "score2", v)}
          onNameChange={(name) => match.team2 && onNameChange(match.team2.id, name)}
          round={match.round}
        />
      </div>
    </div>
  );
}

// ─── SVG Connectors (Cubic Bezier) ────────────────────────────────────────────

interface ConnectorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  bracketData: BracketData;
}

function Connectors({ containerRef }: ConnectorProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const computePaths = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;
    const newPaths: string[] = [];

    for (let r = 0; r < TOTAL_ROUNDS - 1; r++) {
      for (let m = 0; m < MATCH_COUNTS[r]; m++) {
        const fromEl = container.querySelector(`[data-match="r${r}-m${m}"]`) as HTMLElement;
        const toM = Math.floor(m / 2);
        const toEl = container.querySelector(`[data-match="r${r + 1}-m${toM}"]`) as HTMLElement;
        if (!fromEl || !toEl) continue;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const fromX = fromRect.right - rect.left + scrollLeft;
        const fromY = fromRect.top + fromRect.height / 2 - rect.top + scrollTop;
        const toX = toRect.left - rect.left + scrollLeft;
        const toY = toRect.top + toRect.height / 2 - rect.top + scrollTop;

        // Cubic Bezier — smooth flight-path curve
        const cp1x = fromX + (toX - fromX) * 0.45;
        const cp2x = fromX + (toX - fromX) * 0.55;

        newPaths.push(`M ${fromX} ${fromY} C ${cp1x} ${fromY} ${cp2x} ${toY} ${toX} ${toY}`);
      }
    }

    setPaths(newPaths);
    setDims({ w: container.scrollWidth, h: container.scrollHeight });
  }, [containerRef]);

  useEffect(() => {
    const timer = setTimeout(computePaths, 50);
    return () => clearTimeout(timer);
  }, [computePaths]);

  useEffect(() => {
    window.addEventListener("resize", computePaths);
    return () => window.removeEventListener("resize", computePaths);
  }, [computePaths]);

  if (!dims.w || !dims.h) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={dims.w}
      height={dims.h}
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="url(#connectorGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BracketStage() {
  const [bracketData, setBracketData] = useState<BracketData>([]);
  const [hydrated, setHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setBracketData(saved ? (JSON.parse(saved) as BracketData) : buildInitialBracket(generateDefaultTeams()));
    } catch {
      setBracketData(buildInitialBracket(generateDefaultTeams()));
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bracketData));
  }, [bracketData, hydrated]);

  const handleWinnerSelect = useCallback((matchId: string, teamId: string) => {
    setBracketData((prev) => {
      const match = prev.find((m) => m.id === matchId);
      if (!match) return prev;

      if (!teamId || match.winnerId === teamId) {
        const cleared = clearDescendants(prev, match.round, match.matchIndex);
        return cleared.map((m) => m.id === matchId ? { ...m, winnerId: null } : m);
      }

      let updated = clearDescendants(prev, match.round, match.matchIndex);
      updated = updated.map((m) => m.id === matchId ? { ...m, winnerId: teamId } : m);
      const winner = teamId === match.team1?.id ? match.team1 : match.team2;
      if (winner) updated = propagateWinner(updated, match.round, match.matchIndex, winner);
      return updated;
    });
  }, []);

  const handleScoreChange = useCallback((matchId: string, slot: "score1" | "score2", value: string) => {
    setBracketData((prev) => prev.map((m) => m.id === matchId ? { ...m, [slot]: value } : m));
  }, []);

  const handleNameChange = useCallback((teamId: string, name: string) => {
    setBracketData((prev) =>
      prev.map((m) => {
        let updated = { ...m };
        if (m.team1?.id === teamId) updated = { ...updated, team1: { ...m.team1, name } };
        if (m.team2?.id === teamId) updated = { ...updated, team2: { ...m.team2, name } };
        return updated;
      })
    );
  }, []);

  const handleReset = () => {
    if (!confirm("Reset toàn bộ giải đấu? Dữ liệu sẽ bị xóa.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setBracketData(buildInitialBracket(generateDefaultTeams()));
  };

  const finalMatch = bracketData.find((m) => m.round === 4 && m.matchIndex === 0);
  const champion = finalMatch?.winnerId
    ? (finalMatch.team1?.id === finalMatch.winnerId ? finalMatch.team1 : finalMatch.team2)
    : null;

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(145deg,#dbeafe,#e0f2fe,#cffafe)" }}>
        <div className="flex flex-col items-center gap-3">
          <Plane className="w-8 h-8 text-cyan-500 animate-bounce" />
          <span className="text-blue-600 font-semibold text-sm">Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <WorldMapPattern />

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <header
        className="relative z-10 w-full"
        style={{
          background: "linear-gradient(135deg, #0f2a50 0%, #1e3a6e 50%, #0e4d7a 100%)",
          boxShadow: "0 4px 32px rgba(15,42,80,0.35)",
        }}
      >
        {/* Top bar: logo + contact */}
        <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between border-b border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Nam Thanh Travel"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <Plane className="w-6 h-6 text-orange-400 hidden" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight tracking-wide">
                NAM THANH TRAVEL
              </div>
              <div className="text-cyan-300 text-xs font-medium">Lữ hành quốc tế</div>
            </div>
          </div>

          {/* Contact info */}
          <div className="hidden md:flex items-center gap-5 text-xs text-blue-200">
            <a href="tel:1900xxxx" className="flex items-center gap-1.5 hover:text-orange-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-semibold">Hotline: 1900 xxxx</span>
            </a>
            <a href="https://namthanhtravel.com.vn" className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>namthanhtravel.com.vn</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Hà Nội, Việt Nam</span>
            </span>
          </div>
        </div>

        {/* Main banner */}
        <div className="px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1
              className="text-2xl md:text-3xl font-black text-white leading-tight tracking-wide"
              style={{
                textShadow: "0 2px 12px rgba(56,189,248,0.4), 0 4px 24px rgba(15,42,80,0.6)",
                letterSpacing: "0.04em",
              }}
            >
              GIẢI ĐẤU
              <span
                className="block md:inline text-transparent bg-clip-text ml-0 md:ml-3"
                style={{ backgroundImage: "linear-gradient(90deg, #38bdf8, #f97316)" }}
              >
                NAM THANH TRAVEL OPEN
              </span>
            </h1>
            <p className="mt-1.5 text-cyan-200/90 text-sm font-medium tracking-widest">
              ✈ Chinh Phục Đỉnh Cao – Kết Nối Đam Mê ✈
            </p>
            <div className="mt-2 flex items-center gap-3 justify-center md:justify-start">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-xs text-blue-200 font-medium">
                32 Đội
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-xs text-blue-200 font-medium">
                Single Elimination
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-xs text-orange-300 font-medium">
                Live 2025
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Champion badge */}
            {champion && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl border animate-pulse"
                style={{
                  background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(249,115,22,0.15))",
                  borderColor: "rgba(251,191,36,0.5)",
                }}
              >
                <Trophy className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-xs text-amber-300/80 font-medium">🏆 Vô Địch</div>
                  <div className="text-sm font-black text-amber-300 leading-tight">{champion.name}</div>
                </div>
              </div>
            )}

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold
                bg-white/10 border border-white/20 text-blue-200
                hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300
                transition-all duration-200 backdrop-blur-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* ── LEGEND BAR ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 px-6 py-2 flex flex-wrap items-center gap-4 text-xs"
        style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(147,197,253,0.4)" }}>
        <span className="flex items-center gap-1.5 text-blue-600 font-medium">
          <span className="w-3 h-3 rounded-full border-2 border-blue-400 inline-block" />
          Click để chọn người thắng
        </span>
        <span className="flex items-center gap-1.5 text-blue-600 font-medium">
          <Edit3 className="w-3 h-3 text-cyan-600" />
          Hover đội để đổi tên (Vòng 1)
        </span>
        <span className="flex items-center gap-1.5 text-cyan-700 font-medium">
          <Plane className="w-3 h-3 text-orange-500" />
          Đội thắng tiến vào vòng tiếp
        </span>
      </div>

      {/* ── BRACKET AREA ────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 overflow-x-auto pb-8 pt-4"
        style={{ background: "transparent" }}>
        <div ref={containerRef} className="relative inline-flex gap-0 px-6 min-w-max">
          <Connectors containerRef={containerRef} bracketData={bracketData} />

          {Array.from({ length: TOTAL_ROUNDS }, (_, r) => {
            const matchCount = MATCH_COUNTS[r];
            const matches = Array.from({ length: matchCount }, (_, m) =>
              getMatch(bracketData, r, m)
            ).filter(Boolean) as Match[];

            const slotHeight = 80 * Math.pow(2, r);
            const totalHeight = slotHeight * matchCount;

            return (
              <div key={r} className="flex flex-col relative" style={{ zIndex: 1 }}>
                {/* Round label */}
                <div className="text-center mb-3 px-4">
                  <span
                    className="text-xs font-bold uppercase tracking-widest whitespace-nowrap px-3 py-1 rounded-full"
                    style={{
                      background: r === 4
                        ? "linear-gradient(135deg, #f97316, #fbbf24)"
                        : "linear-gradient(135deg, rgba(29,78,216,0.12), rgba(8,145,178,0.12))",
                      color: r === 4 ? "#fff" : "#1d4ed8",
                      border: r === 4 ? "none" : "1px solid rgba(29,78,216,0.2)",
                      boxShadow: r === 4 ? "0 2px 12px rgba(249,115,22,0.4)" : "none",
                    }}
                  >
                    {ROUND_NAMES[r]}
                  </span>
                </div>

                <div
                  className="flex flex-col justify-around"
                  style={{ height: totalHeight > 0 ? `${totalHeight}px` : "auto" }}
                >
                  {matches.map((match) => (
                    <div
                      key={match.id}
                      data-match={match.id}
                      className="flex items-center"
                      style={{ height: `${slotHeight}px` }}
                    >
                      <div className="px-3 relative z-10">
                        <MatchCard
                          match={match}
                          onWinnerSelect={handleWinnerSelect}
                          onScoreChange={handleScoreChange}
                          onNameChange={handleNameChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Champion pedestal */}
          {champion && (
            <div className="flex flex-col items-center justify-center pl-4 relative z-10">
              <div className="text-center mb-3">
                <span
                  className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                  style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", boxShadow: "0 2px 12px rgba(249,115,22,0.5)" }}
                >
                  🏆 VÔ ĐỊCH
                </span>
              </div>
              <div
                className="flex flex-col items-center gap-3 px-5 py-5 rounded-2xl"
                style={{
                  background: "linear-gradient(145deg, rgba(251,191,36,0.15), rgba(249,115,22,0.10))",
                  border: "2px solid rgba(251,191,36,0.5)",
                  boxShadow: "0 8px 32px rgba(249,115,22,0.2), 0 0 0 4px rgba(251,191,36,0.08)",
                }}
              >
                <Trophy className="w-10 h-10 text-amber-400" style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.6))" }} />
                <span
                  className="text-sm font-black text-amber-700 text-center max-w-36"
                  style={{ wordBreak: "break-word" }}
                >
                  {champion.name}
                </span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer
        className="relative z-10 w-full mt-auto"
        style={{
          background: "linear-gradient(135deg, #0f2a50 0%, #0e3d6b 100%)",
          borderTop: "2px solid rgba(56,189,248,0.2)",
        }}
      >
        <div className="max-w-full mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-blue-300/80">
            <Plane className="w-4 h-4 text-orange-400" />
            <span>
              Thiết kế bởi{" "}
              <span className="font-bold text-cyan-300">Nam Thanh Travel</span>
              {" "}— Đơn vị lữ hành hàng đầu Việt Nam
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center
                hover:bg-blue-600/40 hover:border-blue-400/50 transition-all duration-150"
              title="Facebook"
            >
              <Facebook className="w-4 h-4 text-blue-300" />
            </a>
            <a
              href="https://namthanhtravel.com.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center
                hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-150"
              title="Website"
            >
              <Globe className="w-4 h-4 text-cyan-300" />
            </a>
            <a
              href="tel:1900xxxx"
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center
                hover:bg-orange-500/30 hover:border-orange-400/50 transition-all duration-150"
              title="Hotline"
            >
              <Phone className="w-4 h-4 text-orange-300" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
