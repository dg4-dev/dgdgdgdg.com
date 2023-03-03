import { categoryNamesProps } from "@/pages/api/equipments/categoryNames";

export type itemDataProps = {
  address: {
    section: categoryNamesProps["en"];
    order: number;
  };
  name: string;
  maker: string;
  about: string;
  imgName: string;
  gen?: number | "Latest version";
  variety?: string;
  owning?: number;
};

export const itemData: itemDataProps[] = [
  {
    address: {
      section: "?",
      order: 10,
    },
    name: "RC-704",
    maker: "National",
    about: "Clock with radio",
    imgName: "national-rc704.png",
    gen: 1972,
  },
  {
    address: {
      section: "?",
      order: 20,
    },
    name: "10J-U50",
    maker: "TOSHIBA",
    about: "CRT TV",
    imgName: "toshiba-10ju50.png",
    gen: 1986,
  },
  {
    address: {
      section: "?",
      order: 30,
    },
    name: "AQUOS LC-13C1",
    maker: "SHARP",
    about: "Analog LCD TV",
    imgName: "sharp-aquoslc13c1.png",
    gen: 2001,
  },
  {
    address: {
      section: "?",
      order: 40,
    },
    name: 'STRiDA EVO 16"',
    maker: "STRiDA",
    about: "Folding bicycle",
    imgName: "strida-stridaevo16.png",
    gen: 2019,
  },
  {
    address: {
      section: "Viewing Content",
      order: 10,
    },
    name: 'MacBook Pro 16"',
    maker: "Apple",
    about: "Laptop",
    imgName: "apple-macbookpro16-spacegray.png",
    gen: 2019,
    variety: "Space Gray",
  },
  {
    address: {
      section: "Viewing Content",
      order: 20,
    },
    name: 'iMac 20"',
    maker: "Apple",
    about: "Desktop PC (Chrome OS Flex installed)",
    imgName: "apple-imac20.png",
    gen: 2007,
  },
  {
    address: {
      section: "Viewing Content",
      order: 30,
    },
    name: 'iPad Pro 12.9"',
    maker: "Apple",
    about: "Tablet",
    imgName: "apple-ipadpro129-spacegray.png",
    gen: 2020,
    variety: "Space Gray",
  },
  {
    address: {
      section: "Viewing Content",
      order: 40,
    },
    name: "iPad mini",
    maker: "Apple",
    about: "Tablet",
    imgName: "apple-ipadmini-spacegray.png",
    gen: 2021,
    variety: "Space Gray",
  },
  {
    address: {
      section: "Viewing Content",
      order: 50,
    },
    name: "iPhone 14 Pro",
    maker: "Apple",
    about: "Smart phone",
    imgName: "apple-iphone14pro-spaceblack.png",
    gen: 2022,
    variety: "Space Black",
  },
  {
    address: {
      section: "Viewing Content",
      order: 60,
    },
    name: "Phone (1)",
    maker: "Nothing",
    about: "Smart phone",
    imgName: "nothing-phone1-black.png",
    gen: 2022,
    variety: "black",
  },
  {
    address: {
      section: "Viewing Content",
      order: 70,
    },
    name: "iPhone SE",
    maker: "Apple",
    about: "Smart phone",
    imgName: "apple-iphonese-midnight.png",
    gen: 2020,
    variety: "Midnight",
  },
  {
    address: {
      section: "Taking Shots",
      order: 10,
    },
    name: "X-T4",
    maker: "FUJIFILM",
    about: "Mirrorless single-lens camera",
    imgName: "fujifilm-xt4-black.png",
    gen: 2020,
    variety: "black",
  },
  {
    address: {
      section: "Taking Shots",
      order: 20,
    },
    name: "X-S10",
    maker: "FUJIFILM",
    about: "Mirrorless single-lens camera",
    imgName: "fujifilm-xs10.png",
    gen: 2020,
  },
  {
    address: {
      section: "Taking Shots",
      order: 30,
    },
    name: "XF 35mm F1.4 R",
    maker: "FUJIFILM",
    about: "Lens for single-lens camera",
    imgName: "fujifilm-xf35mmf14r.png",
    gen: 2012,
  },
  {
    address: {
      section: "Taking Shots",
      order: 40,
    },
    name: "XF 18-55mm F2.8-4 R OIS",
    maker: "FUJIFILM",
    about: "Lens for single-lens camera",
    imgName: "fujifilm-xf1855mmf284rois.png",
    gen: 2012,
  },
  {
    address: {
      section: "Taking Shots",
      order: 50,
    },
    name: "Wtulens L",
    maker: "GIZMON",
    about: "Lens for single-lens camera",
    imgName: "gizmon-wtulensl.png",
    gen: 2018,
  },
  {
    address: {
      section: "Taking Shots",
      order: 60,
    },
    name: "Action 2",
    maker: "DJI",
    about: "Action camera",
    imgName: "dji-action2-dualscreencombo.png",
    gen: 2021,
    variety: "Dual-Screen Combo",
  },
  {
    address: {
      section: "Taking Shots",
      order: 70,
    },
    name: "X-700",
    maker: "MINOLTA",
    about: "Film camera",
    imgName: "minolta-x700.png",
    gen: 1981,
  },
  {
    address: {
      section: "Taking Shots",
      order: 80,
    },
    name: "X-7",
    maker: "MINOLTA",
    about: "Film camera",
    imgName: "minolta-x7.png",
    gen: 1980,
  },
  {
    address: {
      section: "Taking Shots",
      order: 90,
    },
    name: "MD ROKKOR 50mm F1.7",
    maker: "MINOLTA",
    about: "Lens for single-lens camera",
    imgName: "minolta-mdrokkor50mmf17.png",
    gen: 1979,
  },
  {
    address: {
      section: "Taking Shots",
      order: 100,
    },
    name: "MD ZOOM 35-70mm F3.5",
    maker: "MINOLTA",
    about: "Lens for single-lens camera",
    imgName: "minolta-mdzoom3570mmf35.png",
    gen: 1981,
  },
  {
    address: {
      section: "Taking Shots",
      order: 110,
    },
    name: "MD ZOOM 75-150mm F4",
    maker: "MINOLTA",
    about: "Lens for single-lens camera",
    imgName: "minolta-mdzoom75150mmf4.png",
    gen: 1981,
  },
  {
    address: {
      section: "Taking Shots",
      order: 120,
    },
    name: "LAND 330",
    maker: "Polaroid",
    about: "Instant film camera",
    imgName: "polaroid-land330.png",
    gen: 1960,
  },
  {
    address: {
      section: "Taking Shots",
      order: 130,
    },
    name: "RSC 2",
    maker: "DJI",
    about: "Camera stabilizer for single-lens camera",
    imgName: "dji-rsc2.png",
    gen: 2020,
  },
  {
    address: {
      section: "Taking Shots",
      order: 140,
    },
    name: "OM4",
    maker: "DJI",
    about: "Camera stabilizer for smart phone",
    imgName: "dji-om4.png",
    gen: 2020,
  },
  // {
  //   address: {
  //     section: "Taking Shots",
  //     order: 150,
  //   },
  //   name: "AD-01 3751",
  //   maker: "SmallRig",
  //   about: "Tripod",
  //   imgName: "smallrig-ad013751.png",
  //   gen: 2022,
  // },
  {
    address: {
      section: "Taking Shots",
      order: 160,
    },
    name: "UT-3AR",
    maker: "Velbon",
    about: "Tripod",
    imgName: "velbon-ut3ar.png",
    gen: 2019,
  },
  {
    address: {
      section: "Taking Shots",
      order: 170,
    },
    name: "MT-03 + LH-25",
    maker: "Leofoto",
    about: "Tripod",
    imgName: "leofoto-mt03lh25.png",
    gen: 2019,
  },
  {
    address: {
      section: "Taking Shots",
      order: 180,
    },
    name: "MT-16",
    maker: "Ulanzi",
    about: "Tripod",
    imgName: "ulanzi-mt16.png",
    gen: 2020,
  },
  {
    address: {
      section: "Taking Shots",
      order: 190,
    },
    name: "G1S",
    maker: "Pixel",
    about: "Full-color video light",
    imgName: "pixel-g1s.png",
    gen: 2020,
  },
  {
    address: {
      section: "Taking Shots",
      order: 200,
    },
    name: "SpyderCHECKR SCK100",
    maker: "Datacolor",
    about: "Color reference tool",
    imgName: "datacolor-spydercheckrsck100.png",
    gen: 2017,
  },
  {
    address: {
      section: "Taking Shots",
      order: 210,
    },
    name: "SR3374",
    maker: "SmallRig",
    about: "Teleprompter for tablet",
    imgName: "smallrig-sr3374.png",
    gen: 2021,
  },
  {
    address: {
      section: "Develop and Design",
      order: 10,
    },
    name: "Illustrator",
    maker: "Adobe",
    about: "Vector graphics editor and design program",
    imgName: "adobe-illustrator.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 20,
    },
    name: "XD",
    maker: "Adobe",
    about: "Vector-based user experience design tool for web apps and mobile apps",
    imgName: "adobe-xd.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 30,
    },
    name: "Premiere Pro",
    maker: "Adobe",
    about: "Timeline-based video editing software application",
    imgName: "adobe-premierepro.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 40,
    },
    name: "After Effects",
    maker: "Adobe",
    about: "Digital visual effects, motion graphics, and compositing application",
    imgName: "adobe-aftereffects.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 50,
    },
    name: "Photoshop",
    maker: "Adobe",
    about: "Raster graphics editor",
    imgName: "adobe-photoshop.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 60,
    },
    name: "Lightroom",
    maker: "Adobe",
    about: "Creative image organization and image manipulation software",
    imgName: "adobe-lightroom.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 70,
    },
    name: "Visual Studio Code",
    maker: "Microsoft",
    about: "Source code editor",
    imgName: "microsoft-visualstudiocode.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 80,
    },
    name: "Figma",
    maker: "Figma",
    about: "Vector graphics editor and prototyping tool",
    imgName: "figma-figma.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 90,
    },
    name: "STUDIO",
    maker: "STUDIO",
    about: "Cloud-based no code website creation tool",
    imgName: "studio-studio.png",
    gen: "Latest version",
  },
  {
    address: {
      section: "Develop and Design",
      order: 100,
    },
    name: "PO-80",
    maker: "teenage engineering",
    about: "Compact and portable record cutter",
    imgName: "teenageengineering-po80.png",
    gen: 2022,
  },
  {
    address: {
      section: "Audio",
      order: 10,
    },
    name: "DRUMSET SESSION I",
    maker: "AKG",
    about: "Drum microphone set",
    imgName: "akg-drumsetsessioni.png",
    gen: 2016,
  },
  {
    address: {
      section: "Audio",
      order: 20,
    },
    name: "ATR2100x-USB",
    maker: "audio-technica",
    about: "USB Microphone",
    imgName: "audiotechnica-atr2100xusb.png",
    gen: 2020,
  },
  {
    address: {
      section: "Audio",
      order: 30,
    },
    name: "QX1002USB",
    maker: "behringer",
    about: "Analog mixer with audio interface",
    imgName: "behringer-qx1002usb.png",
    gen: 2012,
  },
  // {
  //   address: {
  //     section: "Audio",
  //     order: 40,
  //   },
  //   name: "MOON WALKMAN",
  //   maker: "黒猫堂",
  //   about: "Tokyo Incidents original design portable cassette player",
  //   imgName: "kuroneko-moonwalkman.png",
  //   gen: 2021,
  // },
  {
    address: {
      section: "Audio",
      order: 50,
    },
    name: "ATH-M40x",
    maker: "audio-technica",
    about: "Headphone",
    imgName: "audiotechnica-athm40x.png",
    gen: 2014,
  },
  {
    address: {
      section: "Audio",
      order: 60,
    },
    name: "M-1",
    maker: "teenage engineering",
    about: "Headphone",
    imgName: "teenageengineering-m1.png",
    gen: 2019,
  },
  {
    address: {
      section: "Audio",
      order: 70,
    },
    name: "ear (1)",
    maker: "Nothing",
    about: "True wireless earphone",
    imgName: "nothing-ear1-white.png",
    gen: 2021,
    variety: "white",
  },
  {
    address: {
      section: "Audio",
      order: 80,
    },
    name: "ear (1)",
    maker: "Nothing",
    about: "True wireless earphone",
    imgName: "nothing-ear1-black.png",
    gen: 2021,
    variety: "black",
  },
  // {
  //   address: {
  //     section: "Audio",
  //     order: 90,
  //   },
  //   name: "Beats Studio Buds",
  //   maker: "Beats",
  //   about: "True wireless earphone",
  //   imgName: "beats-beatsstudiobuds-black.png",
  //   gen: 2021,
  //   variety: "black",
  // },
  {
    address: {
      section: "Audio",
      order: 100,
    },
    name: "Powerbeats Pro",
    maker: "Beats",
    about: "True wireless earphone",
    imgName: "beats-powerbeatspro-black.png",
    gen: 2020,
    variety: "black",
  },
  {
    address: {
      section: "Audio",
      order: 110,
    },
    name: "Beats Flex",
    maker: "Beats",
    about: "Left and right integrated earphones",
    imgName: "beats-beatsflex-black.png",
    gen: 2020,
    variety: "black",
  },
  {
    address: {
      section: "Music Performance",
      order: 10,
    },
    name: "SW108",
    maker: "ARCO",
    about: "Cajon",
    imgName: "arco-sw108.png",
  },
  {
    address: {
      section: "Music Performance",
      order: 20,
    },
    name: "5000CJ",
    maker: "DW",
    about: "Cajon pedal",
    imgName: "dw-5000cj.png",
  },
  {
    address: {
      section: "Music Performance",
      order: 30,
    },
    name: "MUS1455M",
    maker: "Pearl",
    about: "Snare drum",
    imgName: "pearl-mus1455m.png",
  },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 40,
  //   },
  //   name: "SD1410",
  //   maker: "Foldrum",
  //   about: "Floor snare drum",
  //   imgName: "foldrum-sd1410.png",
  //   variety: "Custom",
  // },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 50,
  //   },
  //   name: "P-932",
  //   maker: "Pearl",
  //   about: "Longboard double bass drum pedal",
  //   imgName: "pearl-p932.png",
  // },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 60,
  //   },
  //   name: "CC16MC-B",
  //   maker: "MEINL",
  //   about: '16" clash cymbal',
  //   imgName: "meinl-cc16mc-b.png",
  // },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 70,
  //   },
  //   name: "CC12S-B",
  //   maker: "MEINL",
  //   about: '12" splash cymbal',
  //   imgName: "meinl-cc12s-b.png",
  //   owning: 2,
  // },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 80,
  //   },
  //   name: "PST-7 Crash",
  //   maker: "Paiste",
  //   about: '16" clash cymbal',
  //   imgName: "paiste-pst7crash.png",
  // },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 90,
  //   },
  //   name: "PST-7 Splash",
  //   maker: "Paiste",
  //   about: '10" splash cymbal',
  //   imgName: "paiste-pst7splash.png",
  // },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 100,
  //   },
  //   name: "PTM-10GH",
  //   maker: "Pearl",
  //   about: "Quickmount tambourine with brass jingles",
  //   imgName: "pearl-ptm10gh.png",
  // },
  {
    address: {
      section: "Music Performance",
      order: 110,
    },
    name: "SH50",
    maker: "MEINL",
    about: "Shaker in the shape of a cajon",
    imgName: "meinl-sh50-balticbirch.png",
    variety: "Baltic Birch",
  },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 120,
  //   },
  //   name: "taktile 25",
  //   maker: "KORG",
  //   about: "USB/MIDI controller for everything from mixer control to editing software synthesizers.",
  //   imgName: "korg-taktile25.png",
  //   gen: 2014,
  // },
  {
    address: {
      section: "Music Performance",
      order: 130,
    },
    name: "VL-1",
    maker: "Casio",
    about: "Calculator, monophonic synthesizer, and sequencer all in one",
    imgName: "casio-vl1.png",
    gen: 1981,
  },
  // {
  //   address: {
  //     section: "Music Performance",
  //     order: 140,
  //   },
  //   name: "Stylophone S1",
  //   maker: "Dubreq",
  //   about: "Miniature analog stylus-operated keyboard",
  //   imgName: "dubreq-stylophones1.png",
  //   gen: 2007,
  // },
];
