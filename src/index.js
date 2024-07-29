const hover = require('./hover.js')
const translate = require('./translate.js')
function activate(context) {
    context.subscriptions.push(hover)
    context.subscriptions.push(translate)
}

module.exports = {
    activate,
}
