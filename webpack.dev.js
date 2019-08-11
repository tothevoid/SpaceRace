const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ['./src/game.js'],
    module: {
        rules: [
            {
                test: /\.js?$/,
                // use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'dist')
    }
}