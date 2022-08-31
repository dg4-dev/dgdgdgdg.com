import Heading1 from "./heading1";
import Heading2 from "./heading2";
import Heading3 from "./heading3";

type heading2 = {
  en: string;
  ja: string;
  className?: string;
};

type heading3 = {
  en: string;
  ja?: string;
  className?: string;
};

export const H1 = () => <Heading1 />;
export const H2 = ({ en, ja, className }: heading2) => <Heading2 en={en} ja={ja} className={className} />;
export const H3 = ({ en, ja, className }: heading3) => <Heading3 en={en} ja={ja} className={className} />;
