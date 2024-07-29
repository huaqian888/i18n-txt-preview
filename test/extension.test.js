const vscode = require('vscode');

function activate(context) {
    // 1: 这里执行插件被激活时的操作
    console.log('我被激活了!! 桀桀桀桀...')
    // 1: 定义了一个命令(vscode.commands)
    // 2: lulu.helloWorld 可以把它当做id
    let disposable = vscode.commands.registerCommand('lulu.helloWorld', function () {
        // 3: 触发了一个弹出框
        vscode.window.showInformationMessage('第一个demo弹出信息!');
    });
  // 4: 把这个对象放入上下文中, 使其生效
    context.subscriptions.push(disposable)
}

// 5: 插件被销毁时调用的方法, 比如可以清除一些缓存, 释放一些内存
function deactivate() {}

// 6: 忙活一大堆当然要导出
module.exports = {
    activate,
    deactivate
}
