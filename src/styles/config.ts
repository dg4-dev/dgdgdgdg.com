export const dg4Color: {
  [key in string]: string;
} = {
  cyan: "#00d4d4",
  black: "#444444",
  blue: "#0044dd",
  orange: "#d44d00",
};

type device = {
  sp?: string;
  tab?: string;
  pc?: string;
};

export const cWidth: device = {
  pc: "800px",
  tab: "calc(100% - (20px * 2))",
  sp: "calc(100% - (12px * 2))",
};

export const bp: device = {
  tab: "@media (max-width: 1024px)",
  sp: "@media (max-width: 640px)",
};
