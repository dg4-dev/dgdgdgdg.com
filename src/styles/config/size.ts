type Client = {
  pc?: string;
  tab?: string;
  sp?: string;
};

const size: {
  bp: Client;
  cWidth: Client;
} = {
  bp: {
    tab: "max-width: 1024px",
    sp: "max-width: 640px",
  },
  cWidth: {
    pc: "800px",
    tab: "calc(100% - (20px * 2))",
    sp: "calc(100% - (12px * 2))",
  },
};

export default size;
