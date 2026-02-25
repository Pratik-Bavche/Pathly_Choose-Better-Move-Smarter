const fs = require('fs');
const path = require('path');

const COLORS_MAP = {
    '#00796b': '#1976d2',
    '#004d40': '#0d47a1',
    '#e0f2f1': '#e3f2fd',
    '#b2dfdb': '#bbdefb',
    '#4db6ac': '#42a5f5',
    '#f5fbfa': '#f8faff',

    // Case-insensitive fallback replacements
    '#00796B': '#1976d2',
    '#004D40': '#0d47a1',
    '#E0F2F1': '#e3f2fd',
    '#B2DFDB': '#bbdefb',
    '#4DB6AC': '#42a5f5',
    '#F5FBFA': '#f8faff',
};

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDirs = ['./app'];

targetDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        walkDir(dir, function (filePath) {
            if (filePath.endsWith('.js') || filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.jsx')) {
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;

                Object.keys(COLORS_MAP).forEach(oldColor => {
                    if (content.includes(oldColor)) {
                        content = content.split(oldColor).join(COLORS_MAP[oldColor]);
                        modified = true;
                    }
                });

                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`Updated theme colors in ${filePath}`);
                }
            }
        });
    }
});
