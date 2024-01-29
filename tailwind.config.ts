import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      primary: "#FFB053",
      text: "#FAFAFA",
      "text-secondary": "#7E8599",
      image: "#181933",
    },
    text: {
      vrl: "writing-mode-vrl",
    },
    extend: {
      backgroundImage: {
        hero: "url('/background.png')",
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
} satisfies Config;
