const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    stats: { children: false },  // Fuck，此处解决构建之后，出现 Entrypoint undefined = index.html 问题，不影响构建结果，但是看着难受
    devServer: {
        port: 3000,
        contentBase: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8092,
                            name: "img/[hash:7].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8092,
                            name: "media/[hash:7].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8092,
                            name: "font/[hash:7].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 其他规则能应用到vue文件的script & template & style中
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            title: "Webpack Study"
        })
    ]
}
