import { type Config } from "tailwindcss";

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
			}
    },
  },
  plugins: [],
} satisfies Config;