export const categoryNames = [
  {
    en: "?",
    ja: "?",
    order: 10,
  },
  {
    en: "Viewing Content",
    ja: "端末機器",
    order: 20,
  },
  {
    en: "Taking Shots",
    ja: "撮影する",
    order: 30,
  },
  {
    en: "Audio",
    ja: "音響処理",
    order: 40,
  },
  {
    en: "Music Performance",
    ja: "演奏する",
    order: 50,
  },
] as const;

export type categoryNamesProps = (typeof categoryNames)[number];
