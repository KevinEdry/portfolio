import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
			primary: '#FFB053',
			text: '#FAFAFA'
		},
		text: {
			vrl: 'writing-mode-vrl'
		},
    extend: {
      backgroundImage: {
				hero: "url('/background.png')"
			},
			fontFamily: {
				roboto: ['Roboto']
			},
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;