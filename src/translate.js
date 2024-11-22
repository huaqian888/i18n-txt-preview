const vscode = require('vscode');
const fs = require('fs');
const process = require('child_process');

let path;
let fileContent;
module.exports = vscode.commands.registerCommand('i18n.translate', ({ path: dir }) => {
    if (!path) {
        path = vscode.window.activeTextEditor.document.uri.path.split('src')[0] + vscode.workspace.getConfiguration().get('i18n-txt-preview.translate');
    }
    if (!fileContent) {
        fileContent = fs.readFileSync(path, 'utf-8');
    }

    const filePath = dir.split('src/')[1];
    fileContent = fileContent.replace(new RegExp(`dir = '.*?'`, 'g'), `dir = 'src/${filePath}'`);
    fs.writeFileSync(path, fileContent, 'utf-8');
    process.exec(`node ${path}`);
});

