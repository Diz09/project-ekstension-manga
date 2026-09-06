import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ['babel-plugin-react-compiler'],
			},
		}),
	],

	publicDir: false,

	build:  {
		outDir: 'public/extension',
		emptyOutDir: true,

		rollupOptions: {
			input: 'resources/js/views/ekstention/popup.tsx',

			output: {
				entryFileNames: 'popup.js',
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.endsWith('.css')) {
						return 'assets/extension.css';
					}
					return 'assets/[name]-[hash][extname]';
				},
			},
		},
	},
});
	
