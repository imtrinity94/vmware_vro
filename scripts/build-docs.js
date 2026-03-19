const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../dist');
const DATA_FILE = path.join(OUTPUT_DIR, 'actions.json');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function parseJSDoc(content) {
    const docMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    if (!docMatch) return { description: 'No documentation provided.', params: [], returns: 'void' };

    const doc = docMatch[1];
    const lines = doc.split('\n');
    let description = '';
    const params = [];
    let returns = 'void';

    lines.forEach(line => {
        const cleanLine = line.replace(/^\s*\*\s?/, '').trim();
        if (cleanLine.startsWith('@param')) {
            const m = cleanLine.match(/@param\s+\{([^}]+)\}\s+([^\s-]+)(?:\s+-\s+)?(.*)/);
            if (m) params.push({ type: m[1], name: m[2], description: m[3] });
        } else if (cleanLine.startsWith('@returns')) {
            const m = cleanLine.match(/@returns\s+\{([^}]+)\}/);
            if (m) returns = m[1];
        } else if (!cleanLine.startsWith('@')) {
            if (cleanLine) description += (description ? ' ' : '') + cleanLine;
        }
    });

    return {
        description: description || 'No description.',
        params: params,
        returns: returns
    };
}

function getFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(filePath));
        } else if (file.endsWith('.js')) {
            results.push(filePath);
        }
    });
    return results;
}

const actions = [];
const folders = ['Actions', 'Library', 'JS Modules'];
const rootDir = path.join(__dirname, '..');

folders.forEach(folder => {
    const fullFolderPath = path.join(rootDir, folder);
    if (fs.existsSync(fullFolderPath)) {
        const files = getFiles(fullFolderPath);
        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const relativePath = path.relative(rootDir, file).replace(/\\/g, '/');
            const fileName = path.basename(file);
            const metadata = parseJSDoc(content);
            
            // Return to subfolders for Library, but keep Actions/JS Modules simplified
            let folderLabel = relativePath.split('/')[0];
            if (folderLabel === 'Library') {
                folderLabel = path.dirname(relativePath).replace(/\\/g, '/');
            }

            actions.push({
                id: relativePath.replace(/\//g, '_').replace(/\.js$/, ''),
                name: fileName.replace(/\.js$/, ''),
                folder: folderLabel,
                path: relativePath,
                code: content,
                ...metadata
            });
        });
    }
});

fs.writeFileSync(DATA_FILE, JSON.stringify(actions, null, 2));

// Copy brand logo to dist
const logoSource = path.join(__dirname, 'image.png');
const logoDest = path.join(OUTPUT_DIR, 'logo.png');
if (fs.existsSync(logoSource)) {
    fs.copyFileSync(logoSource, logoDest);
    console.log('Logo copied to dist.');
}

console.log(`Generated documentation metadata for ${actions.length} actions.`);
