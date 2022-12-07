export const dg4Color: {
  [key in string]: string;
} = {
  cyan: "#00d4d4",
  black: "#444444",
  blue: "#0044dd",
  orange: "#d44d00",
};

type containerDevice = {
  pc: string;
  tab: string;
  sp: string;
};

type breakDevice = {
  tab: string;
  sp: string;
  // mini: string;
};

export const cWidth: containerDevice = {
  pc: "800px",
  tab: "calc(100% - (20px * 2))",
  sp: "calc(100% - (12px * 2))",
};

export const bp: breakDevice = {
  tab: "@media (max-width: 1024px)",
  sp: "@media (max-width: 640px)",
  // mini: "@media (max-width: 320px)",
};
