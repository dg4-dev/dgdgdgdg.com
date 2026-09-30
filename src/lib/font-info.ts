/**
 * TrueType / OpenType フォントのバイナリから、書体ページで使う情報を読み取る。
 * name（名前）/ fvar（可変軸・名前付きインスタンス）/ cmap（収録文字）テーブルのみ対応。
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
  styleName: string;
  version: string;
  designer: string;
  designerUrl: string;
  licenseUrl: string;
  axes: FontAxis[];
  instances: FontInstance[];
  /** 収録文字のコードポイント（昇順・制御文字と空白を除く） */
  codepoints: number[];
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

/** cmap の format 4 / 12 サブテーブルから収録コードポイントを集める */
function readCodepoints(view: DataView, tables: Tables): number[] {
  const table = tables.get('cmap');
  if (!table) return [];

  const base = table.offset;
  const numSubtables = view.getUint16(base + 2);
  const codepoints = new Set<number>();

  for (let i = 0; i < numSubtables; i++) {
    const rec = base + 4 + i * 8;
    const sub = base + view.getUint32(rec + 4);
    const format = view.getUint16(sub);

    if (format === 4) {
      const segCount = view.getUint16(sub + 6) / 2;
      const endCodes = sub + 14;
      const startCodes = endCodes + segCount * 2 + 2;
      for (let s = 0; s < segCount; s++) {
        const end = view.getUint16(endCodes + s * 2);
        const start = view.getUint16(startCodes + s * 2);
        if (start === 0xffff) continue;
        for (let c = start; c <= end; c++) codepoints.add(c);
      }
    } else if (format === 12) {
      const numGroups = view.getUint32(sub + 12);
      for (let g = 0; g < numGroups; g++) {
        const group = sub + 16 + g * 12;
        const start = view.getUint32(group);
        const end = view.getUint32(group + 4);
        for (let c = start; c <= end; c++) codepoints.add(c);
      }
    }
  }

  // 制御文字・空白類は字形一覧に出さない
  return [...codepoints].filter((c) => c > 0x20 && !(c >= 0x7f && c <= 0xa0)).sort((a, b) => a - b);
}

export function parseFontInfo(buffer: ArrayBuffer): FontInfo {
  const view = new DataView(buffer);
  const tables = readTables(view);
  const names = readNames(view, tables);
  const { axes, instances } = readFvar(view, tables, names);

  return {
    // 16/17（Typographic Family/Subfamily）を優先し、なければ 1/2 を使う
    familyName: names.get(16) ?? names.get(1) ?? '',
    styleName: names.get(17) ?? names.get(2) ?? '',
    version: (names.get(5) ?? '').replace(/^Version\s*/i, '').split(';')[0],
    designer: names.get(9) ?? '',
    designerUrl: names.get(12) ?? '',
    licenseUrl: names.get(14) ?? '',
    axes,
    instances,
    codepoints: readCodepoints(view, tables),
  };
}
