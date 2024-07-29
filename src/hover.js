const vscode = require("vscode");
const fs= require("fs");

const path = vscode.window.activeTextEditor.document.uri.path.split('src')[0] + vscode.workspace.getConfiguration().get('i18n-txt-preview.path')
let fileContent = fs.readFileSync(path, 'utf-8')

module.exports = vscode.languages.registerHoverProvider(["javascript", "vue", "html"], {
    provideHover(document, position, token) {
        const word = document.getText(document.getWordRangeAtPosition(position));
        const i18nReg = new RegExp(`\\$\\.i18n\\.prop\\(['"][^'"]*?${word}.*?['"]\\)`, 'g')
        const dataReg = new RegExp(`data-i18n-(?:text|placeholder|html|title)="[^"]*${word}[^"]*"`, 'g')
        const lineText = document.lineAt(position).text ?? ''
        const list = [...lineText.match(i18nReg) ?? [], ...lineText.match(dataReg) ?? []]
        if(list && list.length > 0) {
            let cnWord = ''
            let realKey = list[0].match(/['"].*['"]/g)[0].split(',')[0].slice(1, -1).trim()
            const findWord = () => {
                return fileContent.split('\n').every((v) => {
                    if(!v.startsWith('#') && v != '') {
                        const [key, value] = v.split('=')
                        if(key.trim() === realKey) {
                            cnWord = value.trim()
                            return false
                        }
                    }
                    return true
                })
            }
            if(findWord()) {
                fileContent = fs.readFileSync(path, 'utf-8')
                findWord()
            }

            return new vscode.Hover(`${realKey}=${cnWord}`)
        }
    },
});