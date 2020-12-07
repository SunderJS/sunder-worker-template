/**
 * NOTE: This sunder template does not use webpack, but there is no way to opt out using the "sites" feature for static files..
 * So we use this nonsense webpack config to load our bundle..
 * */

const path = require('path');

module.exports = {
    context: __dirname,
    target: "webworker",
    entry: path.resolve(__dirname, 'dist') + '/bundle.js',
    mode: "production",
    module: {
        rules: [
            {
                test: /.*.js/,
                use: 'file-loader',
            },
        ],
    },
}