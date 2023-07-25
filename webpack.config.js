const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
    mode: 'production',
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
          compress: true,
          port: 9000,
        open: true, // This will automatically open the browser after server has been started
      },
};