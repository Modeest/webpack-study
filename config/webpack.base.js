const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                // 确保eslint检查的是未经其他loader处理的源代码
                enforce: "pre",
                options: {
                    // 美化检查报告
                    formatter: require("eslint-friendly-formatter")
                },
                loader: "eslint-loader",
            },
            {
                test: /\.scss$/,
                // 从前往后写，从后向前依次调用
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
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            title: "Webpack Study"
        }),
        new StyleLintPlugin({
            // stylelint需要检查的文件
            files: ["src/**/*.{vue,css,scss,sass}"]
        })
    ]
}