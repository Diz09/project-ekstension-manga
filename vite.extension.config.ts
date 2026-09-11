import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { copyFileSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';

function extensionFiles(): Plugin {
	return {
		name: 'extension-files',

		generateBundle() {
			const manifest = readFileSync(
				'manifest.json',
				'utf-8',
			);

			this.emitFile({
				type: 'asset',
				fileName: 'manifest.json',
				source: manifest,
			});

			this.emitFile({
				type: 'asset',
				fileName: 'popup.html',
				source: `<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manga Portal</title>
    <link rel="stylesheet" href="./assets/extension.css">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="./popup.js"></script>
</body>
</html>
`,
			});
		},
	};
}


export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ['babel-plugin-react-compiler'],
			},
		}),
		
		extensionFiles(),
	],

	publicDir: false,

	build: {
		outDir: 'public/extension',
		emptyOutDir: true,

		rollupOptions: {
			input: 'resources/js/pages/ekstention/popup.tsx',

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

