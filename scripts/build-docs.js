const fs = require('fs');
const path = require('path');

const ACTIONS_DIR = path.join(__dirname, '../Actions');
const OUTPUT_DIR = path.join(__dirname, '../dist');
const DATA_FILE = path.join(OUTPUT_DIR, 'actions.json');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

function parseJSDoc(content) {
    const docMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    if (!docMatch) return { description: 'No documentation provided.', params: [], returns: 'void' };

    const doc = docMatch[1];
    const descriptionMatch = doc.split('@')[0].replace(/\*+/g, '').trim();
    
    const params = [];
    const paramRegex = /@param\s+\{([^}]+)\}\s+([^\s-]+)(?:\s+-\s+)?(.*)/g;
    let m;
    while ((m = paramRegex.exec(doc)) !== null) {
        params.push({ type: m[1], name: m[2], description: m[3].trim() });
    }

    const returnsMatch = doc.match(/@returns\s+\{([^}]+)\}/);
    const returns = returnsMatch ? returnsMatch[1] : 'void';

    return {
        description: descriptionMatch || 'No description.',
        params: params,
        returns: returns
    };
}

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
}

const allFiles = getFiles(ACTIONS_DIR);
const actionsData = allFiles.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(ACTIONS_DIR, filePath).replace(/\\/g, '/');
    const fileName = path.basename(filePath);
    const folder = path.dirname(relativePath);
    const metadata = parseJSDoc(content);

    return {
        id: relativePath.replace(/\//g, '_').replace(/\.js$/, ''),
        name: fileName.replace(/\.js$/, ''),
        folder: folder === '.' ? 'Root' : folder,
        path: relativePath,
        code: content,
        ...metadata
    };
});

fs.writeFileSync(DATA_FILE, JSON.stringify(actionsData, null, 2));
console.log(`Generated documentation metadata for ${actionsData.length} actions.`);
