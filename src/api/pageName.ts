type name = {
  en: string;
  ja: string;
  parent?: string;
};

const pageName: {
  [key in string]: name;
} = {
  about: {
    en: "About",
    ja: "dgdgdgdgとは",
  },
  brand: {
    en: "Brand resource",
    ja: "ブランドリソース",
    parent: "about",
  },
  tool: {
    en: "Tool",
    ja: "ツール一覧",
    parent: "about",
  },
  works: {
    en: "Works",
    ja: "dgdgdgdgの作品",
  },
  service: {
    en: "Service",
    ja: "dgdgdgdgのプラン",
  },
  contact: {
    en: "Contact",
    ja: "dgdgdgdgに問い合わせる",
  },
};

export default pageName;
