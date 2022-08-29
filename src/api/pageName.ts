import { UrlObject } from "url";

type name = {
  href: string | UrlObject;
  en: string;
  ja: string;
  child?: Boolean;
};

const pageName: {
  [key in string]: name;
} = {
  about: {
    href: "/about",
    en: "About",
    ja: "dgdgdgdgとは",
  },
  brand: {
    href: "/about/brand",
    en: "Brand resource",
    ja: "ブランドリソース",
    child: true,
  },
  tool: {
    href: "/about/tool",
    en: "Tool",
    ja: "ツール一覧",
    child: true,
  },
  works: {
    href: "/works",
    en: "Works",
    ja: "dgdgdgdgの作品",
  },
  service: {
    href: "/service",
    en: "Service",
    ja: "dgdgdgdgのプラン",
  },
  contact: {
    href: "/contact",
    en: "Contact",
    ja: "dgdgdgdgに問い合わせる",
  },
};

export default pageName;
