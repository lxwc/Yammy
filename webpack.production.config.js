var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: 'bundle.min.js'
    },
    module: {
        rules: [{
                test: /\.(vue)$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader' //在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'less-loader'])
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.pdf$/,
                loader: 'file-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'jquery': 'jquery'
        },
        extensions: ['.js', '.vue']
    },
    plugins: [
        new ExtractTextPlugin("base.min.css")
    ],
    devServer: {
        historyApiFallback: true,
        host: '192.168.1.64',
        noInfo: true
    },
    performance: {
        hints: false
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new HtmlWebpackPlugin({
            title: 'My App',
            template: './index.template.html',
            inject: 'body',
            hash: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './src/assets/pdf'),
            to: path.resolve(__dirname, './dist/src/assets/pdf')
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './src/assets/images/nopic.svg'),
            to: path.resolve(__dirname, './dist/src/assets/images/nopic.svg')
        }]),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
    ])
}