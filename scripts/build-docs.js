const fs = require('fs');
const path = require('path');

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

const actionFiles = getFiles(path.join(__dirname, '../Actions')).map(f => ({ path: f, root: 'Actions' }));
const libraryFiles = getFiles(path.join(__dirname, '../Library')).map(f => ({ path: f, root: 'Library' }));
const allFiles = [...actionFiles, ...libraryFiles];

const actionsData = allFiles.map(fileMeta => {
    const filePath = fileMeta.path;
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
    const fileName = path.basename(filePath);
    const metadata = parseJSDoc(content);

    // Grouping by "Library/.../..." or "Actions/.../..."
    const folder = path.dirname(relativePath);

    return {
        id: relativePath.replace(/\//g, '_').replace(/\.js$/, ''),
        name: fileName.replace(/\.js$/, ''),
        folder: folder === '.' ? fileMeta.root : folder,
        path: relativePath,
        code: content,
        ...metadata
    };
});

fs.writeFileSync(DATA_FILE, JSON.stringify(actionsData, null, 2));
console.log(`Generated documentation metadata for ${actionsData.length} actions.`);
