import { UrlObject } from "url";

type name = {
  href: string | UrlObject;
  en: string;
  ja: string;
};

const pageName: name[] = [
  {
    href: "/about",
    en: "About",
    ja: "dgdgdgdgとは",
  },
  {
    href: "/works",
    en: "Works",
    ja: "作品紹介",
  },
  {
    href: "/equipments",
    en: "Equipments",
    ja: "使用機材",
  },
  {
    href: "/design-resource",
    en: "Design Resource",
    ja: "デザインリソース",
  },
];

export default pageName;
