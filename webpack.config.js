const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
module.exports = (env, {mode}) => {
    const isProduction = mode === "production"
    return {
    entry: './src/index.js',
    output: {
        filename: isProduction ? '[name].[contenthash].js' : "main.js",
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'public/index.html'}),
        new MiniCSSExtractPlugin({filename: 'assets/[name].css'})
    ],
    module: {
        rules: [
            {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              options: { presets: [[ '@babel/preset-react', { runtime: 'automatic' }]]}
            },
            { 
              test: /\.scss$/, 
              use: [ { loader: MiniCSSExtractPlugin.loader }, 'css-loader', 'sass-loader' ]
            },
            {
              test: /\.(png|gif|jpg|jpeg)$/,
              use: [{'loader': 'file-loader', options: { name: 'assets/[hash].[ext]'}}]
            }
        ]
    }, 
    devServer: {
        open: true,
        port: 3000,
        historyApiFallback: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    devtool: "source-map"
}}