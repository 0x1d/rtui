module.exports = {
    entry: './src/website/scripts/main.js',
    output: {
        filename: './dist/website/scripts.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.json']
    }
};