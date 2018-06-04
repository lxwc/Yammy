var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
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
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.pdf$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue']
    },
    devServer: {
        inline: true,
        //host: '192.168.1.254',
        port: 69,
        historyApiFallback: true,
        noInfo: true,
        // host: '192.168.1.137',
        // port: '8023',
        proxy: {
            '/Pmt/Api/APP/': {
                target: 'http://47.104.84.80:8081',
                //target: 'http://192.168.1.111:7866',
                // target: '192.168.1.111:7866',
                changeOrigin: true,
                secure: false
            }
        }
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([

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
        })
    ])
}