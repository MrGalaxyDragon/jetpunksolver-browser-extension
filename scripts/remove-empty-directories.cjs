const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../dist');

function removeEmptyDirs(dir) {
	if (!fs.existsSync(dir)) return;

	const files = fs.readdirSync(dir);

	for (const file of files) {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			removeEmptyDirs(fullPath);
		}
	}

	if (fs.readdirSync(dir).length === 0) {
		fs.rmdirSync(dir);
	}
}

removeEmptyDirs(targetDir);

console.log('Empty directories removed.');
