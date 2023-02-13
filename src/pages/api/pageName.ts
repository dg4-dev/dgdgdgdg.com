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
    href: "/workflow-and-pricing",
    en: "Workflow and Pricing",
    ja: "制作手順と料金",
  },
];

export default pageName;
