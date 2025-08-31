const fs = require('fs');
const path = require('path');

const excludedExtensions = ['.ts', '.js'];

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;

    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    for (const item of fs.readdirSync(src)) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        const stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else if (!excludedExtensions.some(ext => srcPath.endsWith(ext))) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyRecursive(srcDir, distDir);

console.log('Assets copied.');