import { sveltekit } from '@sveltejs/kit/vite';
import { svelteSVG } from 'rollup-plugin-svelte-svg';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		svelteSVG({
			// vite-specific
			// https://vitejs.dev/guide/api-plugin.html#plugin-ordering
			// enforce: 'pre' | 'post'
			enforce: 'pre'
		}),
		sveltekit()
	]
});
