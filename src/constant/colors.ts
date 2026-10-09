type COLORS = {
  LINEAR: {
    red: string;
    blue: string;
    green: string;
    yellow: string;
    light_blue: string;
    peach: string;
  };
  PLAIN: {
    gray: string;
    blue: string;
    yellow: string;
    gold: string;
    disabled: string;
    btnRed: string;
    btnBlue: string;
    btnYellow: string;
    btnGreen: string;
    accordionGreen: string;
    accordionYellow: string;
    accordionRed: string;
    accordionOrange: string;
    accordionBlue: string;
    accordionPurple: string;
  };
  BORDER_COLOR: {
    yellow: string;
    green: string;
    red: string;
    orange: string;
    blue: string;
    purple: string;
  };
};

export const UI_COLORS: COLORS = {
  LINEAR: {
    red: "linear-gradient(180deg, #FF2020 0%, #C80000 100%)",
    blue: "linear-gradient(180deg, #00C0FA 0%, #015EEA 100%)",
    light_blue: "linear-gradient(180deg, #1DD5E6 0%, #46AEF7 100%)",
    green: "linear-gradient(180deg, #00CB60 0%, #009135 100%)",
    yellow: "linear-gradient(180deg, #FFEA00 0%, #FFC600 100%)",
    peach: "linear-gradient(180deg, #FFFBD6 0%, #FFFCDF 100%)",
  },
  PLAIN: {
    gray: "#999999",
    blue: "#3b82f6",
    yellow: "#facc15",
    gold: "#7F631A",
    disabled: "#D9D9D9",
    btnBlue: "#2196F3",
    btnRed: "#CA4349",
    btnYellow: "FFC600",
    btnGreen: "#0E9F68",
    accordionGreen: "#F1FEF2",
    accordionYellow: "#FFF7DB",
    accordionRed: "#FFD9DA",
    accordionOrange: "#FEE0BA",
    accordionBlue: "#4CD3FE4D",
    accordionPurple: "#F0F0FF",
  },
  BORDER_COLOR: {
    yellow: "#FFDC61",
    green: "#00A24A",
    red: "#E83F3F",
    orange: "#FE8F00",
    blue: "#58B5FF",
    purple: "#7777FF",
  },
};
