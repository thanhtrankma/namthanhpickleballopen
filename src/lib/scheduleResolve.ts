/** Helpers to sync lịch thi đấu with vòng bảng & knock-out nhập trên lịch */

export interface SchedTeam {
  id: string;
  name: string;
}

export interface SchedGroupMatch {
  id: string;
  team1Idx: number;
  team2Idx: number;
  score1: string;
  score2: string;
}

export interface SchedGroup {
  id: string;
  letter: string;
  teams: SchedTeam[];
  matches: SchedGroupMatch[];
}

export type SchedTournament = SchedGroup[];

/** Chuẩn hoá category từ JSON: "Đôi Nam" | "BK1 Đôi Nam" | "CK Đôi Nam Nữ" | … */
export function normalizeBracketCategory(category: string): "Đôi Nam" | "Đôi Nam Nữ" {
  const c = category.trim();
  if (c.includes("Đôi Nam Nữ")) return "Đôi Nam Nữ";
  if (c.includes("Đôi Nam")) return "Đôi Nam";
  return "Đôi Nam";
}

export interface StandingRow {
  team: SchedTeam;
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

export function calcStandings(group: SchedGroup): StandingRow[] {
  const rows: StandingRow[] = group.teams.map((team, idx) => ({
    team,
    teamIdx: idx,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    pts: 0,
  }));

  for (const m of group.matches) {
    if (m.score1 === "" || m.score2 === "") continue;
    const s1 = parseInt(m.score1, 10);
    const s2 = parseInt(m.score2, 10);
    if (isNaN(s1) || isNaN(s2)) continue;

    const r1 = rows[m.team1Idx];
    const r2 = rows[m.team2Idx];
    r1.played++;
    r2.played++;
    r1.gf += s1;
    r1.ga += s2;
    r2.gf += s2;
    r2.ga += s1;

    if (s1 > s2) {
      r1.won++;
      r1.pts += 3;
      r2.lost++;
    } else if (s2 > s1) {
      r2.won++;
      r2.pts += 3;
      r1.lost++;
    } else {
      r1.drawn++;
      r1.pts++;
      r2.drawn++;
      r2.pts++;
    }
  }

  rows.forEach((r) => {
    r.gd = r.gf - r.ga;
  });

  const headToHeadDiff = (a: StandingRow, b: StandingRow): number => {
    const match = group.matches.find(
      (m) =>
        (m.team1Idx === a.teamIdx && m.team2Idx === b.teamIdx) ||
        (m.team1Idx === b.teamIdx && m.team2Idx === a.teamIdx)
    );
    if (!match || match.score1 === "" || match.score2 === "") return 0;
    const s1 = parseInt(match.score1, 10);
    const s2 = parseInt(match.score2, 10);
    if (isNaN(s1) || isNaN(s2)) return 0;
    const aIsTeam1 = match.team1Idx === a.teamIdx;
    const aScore = aIsTeam1 ? s1 : s2;
    const bScore = aIsTeam1 ? s2 : s1;
    return bScore - aScore; // negative => a thắng đối đầu
  };

  rows.sort(
    (a, b) =>
      b.pts - a.pts ||
      b.gd - a.gd ||
      headToHeadDiff(a, b) ||
      b.gf - a.gf ||
      a.teamIdx - b.teamIdx
  );
  return rows;
}

export function findGroup(data: SchedTournament, letter: string): SchedGroup | undefined {
  return data.find((g) => g.letter === letter);
}

export function findRRMatch(
  group: SchedGroup,
  teamId1: string,
  teamId2: string
): SchedGroupMatch | undefined {
  const i1 = group.teams.findIndex((t) => t.id === teamId1);
  const i2 = group.teams.findIndex((t) => t.id === teamId2);
  if (i1 < 0 || i2 < 0) return undefined;
  return group.matches.find(
    (m) =>
      (m.team1Idx === i1 && m.team2Idx === i2) ||
      (m.team1Idx === i2 && m.team2Idx === i1)
  );
}

export function parseRRMatchString(
  match: string,
  category: "Đôi Nam" | "Đôi Nam Nữ"
): { letter: string; id1: string; id2: string } | null {
  const max = category === "Đôi Nam" ? "F" : "D";
  const re = new RegExp(`^([A-${max}])(\\d+)\\s+vs\\s+\\1(\\d+)$`, "i");
  const m = match.trim().match(re);
  if (!m) return null;
  const letter = m[1].toUpperCase();
  return { letter, id1: `${letter}${m[2]}`, id2: `${letter}${m[3]}` };
}

export function teamAtRank(group: SchedGroup, rankIndex: number): SchedTeam | undefined {
  return calcStandings(group)[rankIndex]?.team;
}

export interface ThirdPlaceRow {
  team: SchedTeam;
  groupLetter: string;
  pts: number;
  gd: number;
  gf: number;
  headToHeadSummary: string;
}

/** Một đội hạng 3 mỗi bảng, sắp xếp theo thành tích (Ba 1 = tốt nhất) */
export function sortedThirdPlacesDetailed(data: SchedTournament): ThirdPlaceRow[] {
  const headToHeadSummaryFor = (
    group: SchedGroup,
    standings: StandingRow[],
    target: StandingRow
  ): string => {
    const ties = standings.filter(
      (x) => x.teamIdx !== target.teamIdx && x.pts === target.pts && x.gd === target.gd
    );
    if (ties.length === 0) return "—";

    const details: string[] = [];
    for (const opp of ties) {
      const m = group.matches.find(
        (match) =>
          (match.team1Idx === target.teamIdx && match.team2Idx === opp.teamIdx) ||
          (match.team1Idx === opp.teamIdx && match.team2Idx === target.teamIdx)
      );
      if (!m || m.score1 === "" || m.score2 === "") continue;
      const s1 = parseInt(m.score1, 10);
      const s2 = parseInt(m.score2, 10);
      if (isNaN(s1) || isNaN(s2)) continue;
      const targetIsTeam1 = m.team1Idx === target.teamIdx;
      const tScore = targetIsTeam1 ? s1 : s2;
      const oScore = targetIsTeam1 ? s2 : s1;
      const result = tScore > oScore ? "thắng" : tScore < oScore ? "thua" : "hòa";
      details.push(`${result} ${opp.team.id} (${tScore}-${oScore})`);
    }

    return details.length > 0 ? details.join("; ") : "—";
  };

  const thirds: ThirdPlaceRow[] = [];
  for (const g of data) {
    const s = calcStandings(g);
    const row = s[2];
    if (row) {
      thirds.push({
        team: row.team,
        groupLetter: g.letter,
        pts: row.pts,
        gd: row.gd,
        gf: row.gf,
        headToHeadSummary: headToHeadSummaryFor(g, s, row),
      });
    }
  }
  const thirdHeadToHeadDiff = (a: ThirdPlaceRow, b: ThirdPlaceRow): number => {
    // Hạng 3 mỗi bảng chỉ có 1 đội, nên thông thường không có đối đầu trực tiếp giữa a/b.
    // Giữ comparator này để bám đúng thứ tự ưu tiên: điểm -> hiệu số -> đối đầu.
    if (a.groupLetter !== b.groupLetter) return 0;
    return 0;
  };

  thirds.sort(
    (a, b) =>
      b.pts - a.pts ||
      b.gd - a.gd ||
      thirdHeadToHeadDiff(a, b) ||
      b.gf - a.gf
  );
  return thirds;
}

export function sortedThirdPlaces(data: SchedTournament): SchedTeam[] {
  return sortedThirdPlacesDetailed(data).map((x) => x.team);
}

export function resolveStandingToken(
  token: string,
  data: SchedTournament
): SchedTeam | undefined {
  const t = token.trim();
  const nhat = t.match(/^Nhất\s+([A-F])$/i);
  if (nhat) {
    const g = findGroup(data, nhat[1].toUpperCase());
    return g ? teamAtRank(g, 0) : undefined;
  }
  const nhi = t.match(/^Nhì\s+([A-F])$/i);
  if (nhi) {
    const g = findGroup(data, nhi[1].toUpperCase());
    return g ? teamAtRank(g, 1) : undefined;
  }
  const ba = t.match(/^Ba\s+(\d+)$/i);
  if (ba) {
    const idx = parseInt(ba[1], 10) - 1;
    const thirds = sortedThirdPlaces(data);
    return thirds[idx];
  }
  return undefined;
}

export function winnerFromScores(
  left: SchedTeam,
  right: SchedTeam,
  s1: string,
  s2: string
): SchedTeam | undefined {
  const a = parseInt(s1, 10);
  const b = parseInt(s2, 10);
  if (isNaN(a) || isNaN(b)) return undefined;
  if (a > b) return left;
  if (b > a) return right;
  return undefined;
}

export interface ScheduleRowInput {
  stt: number;
  match: string;
  category: string;
  players?: string;
}

export type KoScores = Record<number, { s1: string; s2: string }>;

/** Thắng TK1 → 61 (NN), Thắng Tr65 → 65, Thắng BK1 → 73 (bán kết NN) */
export function resolveThangTokenToStt(
  token: string,
  category: "Đôi Nam" | "Đôi Nam Nữ"
): number | undefined {
  const t = token.trim();
  let m = t.match(/^Thắng\s+TK(\d+)$/i);
  if (m) {
    const k = parseInt(m[1], 10);
    if (category === "Đôi Nam Nữ") return 60 + k;
    return 64 + k;
  }
  m = t.match(/^Thắng\s+Tr(\d+)$/i);
  if (m) return parseInt(m[1], 10);
  m = t.match(/^Thắng\s+BK(\d+)$/i);
  if (m) {
    const k = parseInt(m[1], 10);
    if (category === "Đôi Nam Nữ" && (k === 1 || k === 2)) return 72 + k;
  }
  return undefined;
}

function splitVs(s: string): [string, string] | null {
  const parts = s.split(/\s+vs\s+/i);
  if (parts.length !== 2) return null;
  return [parts[0].trim(), parts[1].trim()];
}

export function createWinnerLookup(
  rows: ScheduleRowInput[],
  maleData: SchedTournament,
  mixedData: SchedTournament,
  koScores: KoScores
) {
  const rowByStt = new Map(rows.map((r) => [r.stt, r]));
  const cache = new Map<number, SchedTeam | undefined>();

  function dataFor(categoryRaw: string): SchedTournament {
    return normalizeBracketCategory(categoryRaw) === "Đôi Nam" ? maleData : mixedData;
  }

  function winner(stt: number): SchedTeam | undefined {
    if (cache.has(stt)) return cache.get(stt);
    const row = rowByStt.get(stt);
    if (!row) {
      cache.set(stt, undefined);
      return undefined;
    }
    const bracket = normalizeBracketCategory(row.category);
    const data = dataFor(row.category);

    const rr = parseRRMatchString(row.match, bracket);
    if (rr) {
      const g = findGroup(data, rr.letter);
      if (!g) {
        cache.set(stt, undefined);
        return undefined;
      }
      const gm = findRRMatch(g, rr.id1, rr.id2);
      if (!gm || gm.score1 === "" || gm.score2 === "") {
        cache.set(stt, undefined);
        return undefined;
      }
      const a = parseInt(gm.score1, 10);
      const b = parseInt(gm.score2, 10);
      const wteam =
        a > b ? g.teams[gm.team1Idx] : b > a ? g.teams[gm.team2Idx] : undefined;
      cache.set(stt, wteam);
      return wteam;
    }

    const matchLine =
      row.match.trim() === "Chung Kết" && row.players ? row.players : row.match;
    const pair = splitVs(matchLine);
    if (pair) {
      const [leftTok, rightTok] = pair;

      let leftTeam = resolveStandingToken(leftTok, data);
      let rightTeam = resolveStandingToken(rightTok, data);
      if (!leftTeam) {
        const stL = resolveThangTokenToStt(leftTok, bracket);
        if (stL !== undefined) leftTeam = winner(stL);
      }
      if (!rightTeam) {
        const stR = resolveThangTokenToStt(rightTok, bracket);
        if (stR !== undefined) rightTeam = winner(stR);
      }

      if (leftTeam && rightTeam) {
        const ks = koScores[stt];
        if (ks && ks.s1 !== "" && ks.s2 !== "") {
          const w = winnerFromScores(leftTeam, rightTeam, ks.s1, ks.s2);
          cache.set(stt, w);
          return w;
        }
      }
      cache.set(stt, undefined);
      return undefined;
    }

    cache.set(stt, undefined);
    return undefined;
  }

  return { winner, rowByStt };
}

export function getRRScoreDisplay(
  row: ScheduleRowInput,
  maleData: SchedTournament,
  mixedData: SchedTournament
): string | null {
  const cat = normalizeBracketCategory(row.category);
  const rr = parseRRMatchString(row.match, cat);
  if (!rr) return null;
  const data = cat === "Đôi Nam" ? maleData : mixedData;
  const g = findGroup(data, rr.letter);
  if (!g) return null;
  const gm = findRRMatch(g, rr.id1, rr.id2);
  if (!gm || gm.score1 === "" || gm.score2 === "") return null;
  return `${gm.score1} – ${gm.score2}`;
}

export function needsKoScoreInput(row: ScheduleRowInput): boolean {
  const cat = normalizeBracketCategory(row.category);
  if (parseRRMatchString(row.match, cat)) return false;
  if (row.match.trim() === "Chung Kết") return true;
  return splitVs(row.match) !== null || (!!row.players && splitVs(row.players) !== null);
}

/** Hiển thị tên hai bên + tỉ số vòng tròn (nếu có) */
export function getDisplaySides(
  row: ScheduleRowInput,
  maleData: SchedTournament,
  mixedData: SchedTournament,
  winner: (stt: number) => SchedTeam | undefined
): { left: string; right: string; rrScore: string | null } {
  const cat = normalizeBracketCategory(row.category);
  const data = cat === "Đôi Nam" ? maleData : mixedData;
  const rr = parseRRMatchString(row.match, cat);
  if (rr) {
    const g = findGroup(data, rr.letter);
    if (!g) return { left: rr.id1, right: rr.id2, rrScore: null };
    const t1 = g.teams.find((t) => t.id === rr.id1);
    const t2 = g.teams.find((t) => t.id === rr.id2);
    const gm = findRRMatch(g, rr.id1, rr.id2);
    const rrScore =
      gm && gm.score1 !== "" && gm.score2 !== ""
        ? `${gm.score1} – ${gm.score2}`
        : null;
    return {
      left: t1?.name ?? rr.id1,
      right: t2?.name ?? rr.id2,
      rrScore,
    };
  }
  const matchLine =
    row.match.trim() === "Chung Kết" && row.players ? row.players : row.match;
  const pair = splitVs(matchLine);
  if (!pair) return { left: row.match, right: "—", rrScore: null };
  const [a, b] = pair;
  let leftN = resolveStandingToken(a, data)?.name;
  let rightN = resolveStandingToken(b, data)?.name;
  if (!leftN) {
    const st = resolveThangTokenToStt(a, cat);
    if (st !== undefined) leftN = winner(st)?.name;
  }
  if (!rightN) {
    const st = resolveThangTokenToStt(b, cat);
    if (st !== undefined) rightN = winner(st)?.name;
  }
  return {
    left: leftN ?? a,
    right: rightN ?? b,
    rrScore: null,
  };
}
