const hover = require('./hover.js')
const translate = require('./translate.js')
const translateWord = require('./translateWord.js')
function activate(context) {
    context.subscriptions.push(hover)
    context.subscriptions.push(translate)
    context.subscriptions.push(translateWord)
}

module.exports = {
    activate,
}
