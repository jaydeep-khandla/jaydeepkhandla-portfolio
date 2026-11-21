const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0b0d0c", "bg-alt": "#0e1110", surface: "#111513", border: "#232a27", strong: "#2a312e", divider: "#1c211f",
        ink: "#e6e9e7", muted: "#9aa39e", secondary: "#8b948f", subtle: "#6c7571", accent: "#8cc84b", "accent-hover-border": "#4f7d3a", "accent-tint": "#1a2a14",
      },
      borderRadius: {card:"14px", chip:"6px", button:"10px", terminal:"16px", pill:"99px"},
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        fira: ["Fira Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config;
