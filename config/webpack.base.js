const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DebugPlugin = require("./DebugPlugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    // resolve: 告诉 Webpack 解析模块时应该搜索的目录,绝对路径和相对路径都能使用，但是它们之间有一点差异
    // ~ 是 Webpack 中约定俗成的一个符号，表示从 resolve.modules 中指定的路径。
    // 假如在 app.vue 中 import img from '~sprite.png', 那么最终经过上面讲述的查找过程后，实际的路径是 ./src/assets/generated/sprite.png。因此 ~ 与 resolve.modules 的配置有直接的关系。
    resolve: {
        modules: ["../node_modules", "../src/assets/generated"]
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
            /*
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
            */
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8092,
                            name: "/img/[hash:7].[ext]"
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
                            name: "/media/[hash:7].[ext]"
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
                            name: "/font/[hash:7].[ext]"
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
        }),
        new ExtractTextPlugin("css/[name].[hash:8].css"),
        // 通过enable，控制vconsole是否开启
        new DebugPlugin({ enable: true })
    ],
    // 分离公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: "single"
    }
}