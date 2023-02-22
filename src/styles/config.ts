export const dg4Color: {
  [key: string]: string;
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

type breakPointDevice = {
  tab: string;
  sp: string;
  // mini: string;
};

export const containerWidth: containerDevice = {
  pc: "800px",
  tab: "calc(100% - (20px * 2))",
  sp: "calc(100% - (12px * 2))",
};

export const breakPoint: breakPointDevice = {
  tab: "@media (max-width: 1024px)",
  sp: "@media (max-width: 640px)",
  // mini: "@media (max-width: 320px)",
};
