/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			primary: '#FFB053',
			text: '#FAFAFA'
		},
		text: {
			vrl: 'writing-mode-vrl'
		},
		extend: {
			fontFamily: {
				roboto: ['Roboto']
			}
		}
	},
	plugins: []
};
