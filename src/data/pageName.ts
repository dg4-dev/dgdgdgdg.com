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
    href: "/about/design-resource",
    en: "Design Resource",
    ja: "デザインリソース",
    child: true,
  },
  {
    href: "/about/equipments",
    en: "Equipments",
    ja: "使用機材",
    child: true,
  },
  {
    href: "/works",
    en: "Works",
    ja: "作品紹介",
  },
  {
    href: "/workflow",
    en: "Workflow",
    ja: "制作手順",
  },
];

export default pageName;
