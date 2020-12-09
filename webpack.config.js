const path = require('path');

var backgroundConfig = {
    context: path.resolve(__dirname, 'src/background'),
    devtool: 'inline-source-map',
    entry: './background.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'background.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};

var contentConfig = {
    context: path.resolve(__dirname, 'src/content'),
    devtool: 'inline-source-map',
    entry: './content.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'content.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};

var menuConfig = {
    context: path.resolve(__dirname, 'src/menu'),
    devtool: 'inline-source-map',
    entry: './menu.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'menu.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};


module.exports = [backgroundConfig, contentConfig, menuConfig]