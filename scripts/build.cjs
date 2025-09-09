const esbuild = require('esbuild');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');

esbuild
	.build({
		outbase: srcDir,
		entryPoints: [path.join(srcDir, '**/index.ts')],
		outdir: distDir,
		entryNames: '[dir]/[name]',
		bundle: true,
		platform: 'browser',
		sourcemap: false,
		minify: true
	})
	.catch(() => process.exit(1));
