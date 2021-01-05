const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const electronConfiguration = {
    mode: 'development',
    entry: './src/main.ts',
    target: 'electron-main',
    resolve: {
        alias: {
            ['@']: path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            include: /src/,
            use: 'ts-loader'
        }]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }
}

const reactConfiguration = {
    mode: 'development',
    entry: './src/renderer.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    resolve: {
        alias: {
            ['@']: path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                use: 'ts-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                include: /src/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'renderer.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}

module.exports = [electronConfiguration, reactConfiguration]