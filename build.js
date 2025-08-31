import { build } from 'esbuild';

build({
    outbase: 'src',
    entryPoints: ['./**/index.ts'],
    outdir: 'dist',
    entryNames: '[dir]/[name]',
    bundle: true,
    platform: 'browser',
    sourcemap: false,
    minify: true,
}).catch(() => process.exit(1));