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
    en: "Develop and Design",
    ja: "開発とデザイン",
    order: 40,
  },
  {
    en: "Audio",
    ja: "音響処理",
    order: 50,
  },
  {
    en: "Music Performance",
    ja: "演奏する",
    order: 60,
  },
] as const;

export type categoryNamesProps = (typeof categoryNames)[number];
