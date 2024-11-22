const vscode = require("vscode");
const fs= require("fs");
const process = require("child_process");

let path
let fileContent
module.exports = vscode.commands.registerCommand('trans', () => {
    if (!path) {
        path = vscode.window.activeTextEditor.document.uri.path.split('src')[0] + vscode.workspace.getConfiguration().get('i18n-txt-preview.trans')
    }
    if (!fileContent) {
        fileContent = fs.readFileSync(path, 'utf-8');
    }
    vscode.window.showInputBox({
        ignoreFocusOut: true, // 当焦点移动到编辑器的另一部分或另一个窗口时, 保持输入框打开
        password: false, // 为 true 就表示是密码类型
        prompt: "请输入需要翻译的文字", // 文本输入提示
        value: "", // 默认值, 默认全部选中
        valueSelection: [0, 0],  // 指定选中的范围
    }).then(value => {
        if (!value || !value?.trim()) {
            vscode.window.showErrorMessage("你输入的文本无效");
            return;
        };
        fileContent = fileContent.replace(new RegExp(/transWord = \[.*?\]/, 'g'), `transWord = ['${value}']`)
        fs.writeFileSync(path, fileContent, 'utf-8')
        process.exec(`node ${path}`);
    })
});
