/**
 * TrueType / OpenType フォントのバイナリから、書体ページで使う情報を読み取る。
 * name（名前）/ fvar（可変軸・名前付きインスタンス）/ cmap（収録文字）/ GSUB（合字など）テーブルのみ対応。
 */

export interface FontAxis {
  tag: string;
  name: string;
  min: number;
  default: number;
  max: number;
}

export interface FontInstance {
  name: string;
  coordinates: Record<string, number>;
}

export interface FontInfo {
  familyName: string;
  version: string;
  axes: FontAxis[];
  instances: FontInstance[];
  /** 収録文字のコードポイント（昇順・制御文字と空白を除く） */
  codepoints: number[];
  /** 合字など、feature で現れる字形 */
  featureGlyphs: FeatureGlyph[];
}

type Tables = Map<string, { offset: number; length: number }>;

function readTables(view: DataView): Tables {
  const numTables = view.getUint16(4);
  const tables: Tables = new Map();
  for (let i = 0; i < numTables; i++) {
    const rec = 12 + i * 16;
    const tag = String.fromCharCode(
      view.getUint8(rec),
      view.getUint8(rec + 1),
      view.getUint8(rec + 2),
      view.getUint8(rec + 3),
    );
    tables.set(tag, { offset: view.getUint32(rec + 8), length: view.getUint32(rec + 12) });
  }
  return tables;
}

/** name テーブルから nameID → 文字列 の対応表を作る（Windows/Unicode の英語を優先） */
function readNames(view: DataView, tables: Tables): Map<number, string> {
  const names = new Map<number, string>();
  const table = tables.get('name');
  if (!table) return names;

  const base = table.offset;
  const count = view.getUint16(base + 2);
  const stringOffset = base + view.getUint16(base + 4);

  for (let i = 0; i < count; i++) {
    const rec = base + 6 + i * 12;
    const platformId = view.getUint16(rec);
    const languageId = view.getUint16(rec + 4);
    const nameId = view.getUint16(rec + 6);
    const length = view.getUint16(rec + 8);
    const offset = stringOffset + view.getUint16(rec + 10);

    // Windows (3) の英語 (0x409) か Unicode (0) の UTF-16BE だけを読む
    const isWindowsEnglish = platformId === 3 && languageId === 0x409;
    if (!isWindowsEnglish && platformId !== 0) continue;
    if (names.has(nameId) && !isWindowsEnglish) continue;

    let value = '';
    for (let j = 0; j < length; j += 2) {
      value += String.fromCharCode(view.getUint16(offset + j));
    }
    names.set(nameId, value);
  }
  return names;
}

function readFixed(view: DataView, offset: number): number {
  return Math.round((view.getInt32(offset) / 65536) * 1000) / 1000;
}

function readFvar(view: DataView, tables: Tables, names: Map<number, string>) {
  const axes: FontAxis[] = [];
  const instances: FontInstance[] = [];
  const table = tables.get('fvar');
  if (!table) return { axes, instances };

  const base = table.offset;
  const axesOffset = base + view.getUint16(base + 4);
  const axisCount = view.getUint16(base + 8);
  const axisSize = view.getUint16(base + 10);
  const instanceCount = view.getUint16(base + 12);
  const instanceSize = view.getUint16(base + 14);

  for (let i = 0; i < axisCount; i++) {
    const rec = axesOffset + i * axisSize;
    const tag = String.fromCharCode(
      view.getUint8(rec),
      view.getUint8(rec + 1),
      view.getUint8(rec + 2),
      view.getUint8(rec + 3),
    );
    axes.push({
      tag,
      min: readFixed(view, rec + 4),
      default: readFixed(view, rec + 8),
      max: readFixed(view, rec + 12),
      name: names.get(view.getUint16(rec + 18)) ?? tag,
    });
  }

  const instancesOffset = axesOffset + axisCount * axisSize;
  for (let i = 0; i < instanceCount; i++) {
    const rec = instancesOffset + i * instanceSize;
    const coordinates: Record<string, number> = {};
    axes.forEach((axis, j) => {
      coordinates[axis.tag] = readFixed(view, rec + 4 + j * 4);
    });
    instances.push({ name: names.get(view.getUint16(rec)) ?? `Instance ${i + 1}`, coordinates });
  }

  return { axes, instances };
}

/** cmap の format 4 / 12 サブテーブルから、コードポイント → グリフ ID の対応表を作る */
function readCmap(view: DataView, tables: Tables): Map<number, number> {
  const cmap = new Map<number, number>();
  const table = tables.get('cmap');
  if (!table) return cmap;

  const base = table.offset;
  const numSubtables = view.getUint16(base + 2);

  for (let i = 0; i < numSubtables; i++) {
    const rec = base + 4 + i * 8;
    const sub = base + view.getUint32(rec + 4);
    const format = view.getUint16(sub);

    if (format === 4) {
      const segCount = view.getUint16(sub + 6) / 2;
      const endCodes = sub + 14;
      const startCodes = endCodes + segCount * 2 + 2;
      const idDeltas = startCodes + segCount * 2;
      const idRangeOffsets = idDeltas + segCount * 2;
      for (let s = 0; s < segCount; s++) {
        const end = view.getUint16(endCodes + s * 2);
        const start = view.getUint16(startCodes + s * 2);
        const idDelta = view.getUint16(idDeltas + s * 2);
        const rangeOffsetAt = idRangeOffsets + s * 2;
        const idRangeOffset = view.getUint16(rangeOffsetAt);
        if (start === 0xffff) continue;
        for (let c = start; c <= end; c++) {
          let glyph = 0;
          if (idRangeOffset === 0) {
            glyph = (c + idDelta) & 0xffff;
          } else {
            glyph = view.getUint16(rangeOffsetAt + idRangeOffset + (c - start) * 2);
            if (glyph !== 0) glyph = (glyph + idDelta) & 0xffff;
          }
          if (glyph !== 0 && !cmap.has(c)) cmap.set(c, glyph);
        }
      }
    } else if (format === 12) {
      const numGroups = view.getUint32(sub + 12);
      for (let g = 0; g < numGroups; g++) {
        const group = sub + 16 + g * 12;
        const start = view.getUint32(group);
        const end = view.getUint32(group + 4);
        const startGlyph = view.getUint32(group + 8);
        for (let c = start; c <= end; c++) {
          if (!cmap.has(c)) cmap.set(c, startGlyph + (c - start));
        }
      }
    }
  }
  return cmap;
}

/** Coverage テーブルが含むグリフ ID を、並び順（Coverage Index 順）で返す */
function readCoverage(view: DataView, offset: number): number[] {
  const format = view.getUint16(offset);
  const glyphs: number[] = [];
  if (format === 1) {
    const count = view.getUint16(offset + 2);
    for (let i = 0; i < count; i++) glyphs.push(view.getUint16(offset + 4 + i * 2));
  } else if (format === 2) {
    const count = view.getUint16(offset + 2);
    for (let i = 0; i < count; i++) {
      const rec = offset + 4 + i * 6;
      const start = view.getUint16(rec);
      const end = view.getUint16(rec + 2);
      for (let g = start; g <= end; g++) glyphs.push(g);
    }
  }
  return glyphs;
}

interface GsubLookup {
  type: number;
  /** 各サブテーブルの位置（Extension は中身の位置に置き換え済み） */
  subtables: number[];
}

function readGsubLookups(view: DataView, base: number): GsubLookup[] {
  const lookupList = base + view.getUint16(base + 8);
  const count = view.getUint16(lookupList);
  const lookups: GsubLookup[] = [];

  for (let i = 0; i < count; i++) {
    const lookup = lookupList + view.getUint16(lookupList + 2 + i * 2);
    let type = view.getUint16(lookup);
    const subCount = view.getUint16(lookup + 4);
    const subtables: number[] = [];
    for (let j = 0; j < subCount; j++) {
      let sub = lookup + view.getUint16(lookup + 6 + j * 2);
      // Extension（type 7）は実際のサブテーブルを指しているだけなので展開する
      if (type === 7) {
        type = view.getUint16(sub + 2);
        sub = sub + view.getUint32(sub + 4);
      }
      subtables.push(sub);
    }
    lookups.push({ type, subtables });
  }
  return lookups;
}

/** 単純置換（type 1）の 置換前 → 置換後 */
function readSingleSubst(view: DataView, lookup: GsubLookup): Map<number, number> {
  const map = new Map<number, number>();
  for (const sub of lookup.subtables) {
    const format = view.getUint16(sub);
    const coverage = readCoverage(view, sub + view.getUint16(sub + 2));
    coverage.forEach((glyph, index) => {
      if (format === 1) {
        map.set(glyph, (glyph + view.getInt16(sub + 4)) & 0xffff);
      } else if (format === 2) {
        map.set(glyph, view.getUint16(sub + 6 + index * 2));
      }
    });
  }
  return map;
}

export interface FeatureGlyph {
  /** feature をかける文字列 */
  text: string;
  /** 形が変わる条件になる前後の文字（一覧では薄く表示する） */
  before: string;
  after: string;
  /** OpenType の feature タグ（liga / dlig / calt など） */
  feature: string;
}

/**
 * GSUB から、文字を打つだけでは一覧に出てこない字形を集める。
 * - 合字（type 4）: 構成する文字列
 * - 単純置換（type 1）: 置き換わる元の文字
 * - 文脈置換（type 6 format 3）: 置き換わる文字と、その前後の文字の例
 */
function readFeatureGlyphs(view: DataView, tables: Tables, cmap: Map<number, number>): FeatureGlyph[] {
  const table = tables.get('GSUB');
  if (!table) return [];

  const base = table.offset;
  const lookups = readGsubLookups(view, base);
  const toChar = new Map<number, string>();
  for (const [codepoint, glyph] of cmap) {
    if (!toChar.has(glyph)) toChar.set(glyph, String.fromCodePoint(codepoint));
  }
  const firstChar = (glyphs: number[]) => glyphs.map((g) => toChar.get(g)).find((c) => c !== undefined);

  const results: FeatureGlyph[] = [];
  const seen = new Set<string>();
  const add = (glyph: FeatureGlyph) => {
    const key = `${glyph.feature}|${glyph.before}|${glyph.text}|${glyph.after}`;
    if (seen.has(key)) return;
    seen.add(key);
    results.push(glyph);
  };

  const featureList = base + view.getUint16(base + 6);
  const featureCount = view.getUint16(featureList);

  for (let i = 0; i < featureCount; i++) {
    const rec = featureList + 2 + i * 6;
    const feature = String.fromCharCode(
      view.getUint8(rec),
      view.getUint8(rec + 1),
      view.getUint8(rec + 2),
      view.getUint8(rec + 3),
    );
    const featureTable = featureList + view.getUint16(rec + 4);
    const lookupCount = view.getUint16(featureTable + 2);

    for (let j = 0; j < lookupCount; j++) {
      const lookup = lookups[view.getUint16(featureTable + 4 + j * 2)];
      if (!lookup) continue;

      if (lookup.type === 4) {
        for (const sub of lookup.subtables) {
          const coverage = readCoverage(view, sub + view.getUint16(sub + 2));
          const setCount = view.getUint16(sub + 4);
          for (let k = 0; k < setCount; k++) {
            const set = sub + view.getUint16(sub + 6 + k * 2);
            const ligCount = view.getUint16(set);
            for (let l = 0; l < ligCount; l++) {
              const lig = set + view.getUint16(set + 2 + l * 2);
              const componentCount = view.getUint16(lig + 2);
              const components = [coverage[k]];
              for (let m = 1; m < componentCount; m++) components.push(view.getUint16(lig + 2 + m * 2));
              const chars = components.map((g) => toChar.get(g));
              if (chars.every((c) => c !== undefined)) add({ text: chars.join(''), before: '', after: '', feature });
            }
          }
        }
      } else if (lookup.type === 1) {
        for (const glyph of readSingleSubst(view, lookup).keys()) {
          const char = toChar.get(glyph);
          if (char) add({ text: char, before: '', after: '', feature });
        }
      } else if (lookup.type === 6) {
        for (const sub of lookup.subtables) {
          if (view.getUint16(sub) !== 3) continue;
          let at = sub + 2;
          const readCoverages = () => {
            const count = view.getUint16(at);
            const list = [];
            for (let n = 0; n < count; n++) list.push(readCoverage(view, sub + view.getUint16(at + 2 + n * 2)));
            at += 2 + count * 2;
            return list;
          };
          // backtrack は近い順に並んでいるので、表示用に逆順にする
          const backtrack = readCoverages().reverse();
          const input = readCoverages();
          const lookahead = readCoverages();
          const before = backtrack.map(firstChar);
          const after = lookahead.map(firstChar);
          if ([...before, ...after].some((c) => c === undefined)) continue;

          const recordCount = view.getUint16(at);
          for (let r = 0; r < recordCount; r++) {
            const sequenceIndex = view.getUint16(at + 2 + r * 4);
            const target = lookups[view.getUint16(at + 4 + r * 4)];
            if (!target || target.type !== 1 || input.length !== 1 || sequenceIndex !== 0) continue;
            const substituted = readSingleSubst(view, target);
            const glyph = input[0].find((g) => substituted.has(g) && toChar.has(g));
            if (glyph !== undefined) {
              add({ text: toChar.get(glyph)!, before: before.join(''), after: after.join(''), feature });
            }
          }
        }
      }
    }
  }
  return results;
}

export function parseFontInfo(buffer: ArrayBuffer): FontInfo {
  const view = new DataView(buffer);
  const tables = readTables(view);
  const names = readNames(view, tables);
  const { axes, instances } = readFvar(view, tables, names);
  const cmap = readCmap(view, tables);

  return {
    // 16（Typographic Family）を優先し、なければ 1 を使う
    familyName: names.get(16) ?? names.get(1) ?? '',
    version: (names.get(5) ?? '').replace(/^Version\s*/i, '').split(';')[0],
    axes,
    instances,
    // 制御文字・空白類は字形一覧に出さない
    codepoints: [...cmap.keys()].filter((c) => c > 0x20 && !(c >= 0x7f && c <= 0xa0)).sort((a, b) => a - b),
    featureGlyphs: readFeatureGlyphs(view, tables, cmap),
  };
}
