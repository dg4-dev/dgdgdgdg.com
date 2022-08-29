import { UrlObject } from "url";

type name = {
  href: string | UrlObject;
  en: string;
  ja: string;
  child?: Boolean;
};

const pageName: name[] = [
  {
    href: "/about",
    en: "About",
    ja: "dgdgdgdgとは",
  },
  {
    href: "/about/brand",
    en: "Brand resource",
    ja: "ブランドリソース",
    child: true,
  },
  {
    href: "/about/tool",
    en: "Tool",
    ja: "ツール一覧",
    child: true,
  },
  {
    href: "/works",
    en: "Works",
    ja: "dgdgdgdgの作品",
  },
  {
    href: "/service",
    en: "Service",
    ja: "dgdgdgdgのプラン",
  },
  {
    href: "/contact",
    en: "Contact",
    ja: "dgdgdgdgに問い合わせる",
  },
];

export default pageName;
