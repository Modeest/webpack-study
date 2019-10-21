const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");

// 自定义样式生成模板来自己生成支持 2 倍图的样式表
const templateFunction = function (data) {
    var shared = ".ico { background-image: url(I); background-size:Wpx Hpx;}"
        .replace("I", data.spritesheet.image)
        .replace("W", data.spritesheet.width / 2)
        .replace("H", data.spritesheet.height / 2);

    var perSprite = data.sprites
        .map(sprite => {
            return ".ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }"
                .replace("N", sprite.name)
                .replace("W", sprite.width / 2)
                .replace("H", sprite.height / 2)
                .replace("X", sprite.offset_x / 2)
                .replace("Y", sprite.offset_y / 2);
        })
        .join("\n");

    return shared + "\n" + perSprite;
};

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        modules: ["node_modules", "assets/generated"]
    },
    stats: { children: false },  // Fuck，此处解决构建之后，出现 Entrypoint undefined = index.html 问题，不影响构建结果，但是看着难受
    devServer: {
        port: 3000,
        hot: true
    },
    devtool: 'source-map',
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
                enforce: "pre",
                options: {
                    formatter: require("eslint-friendly-formatter")
                },
                loader: "eslint-loader",
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
        }),
        new StyleLintPlugin({
            files: ["src/**/*.{vue,css,scss,sass}"]
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, "../src/assets/sprites"),
                glob: "*.png"
            },
            customTemplates: {
                function_based_template: templateFunction
            },
            target: {
                image: path.resolve(__dirname, "../src/assets/generated/sprite.png"),
                css: [
                    // 利用 function_based_template 生成2倍图
                    [
                        path.resolve(__dirname, "../src/assets/generated/sprite2.scss"),
                        {
                            format: "function_based_template"
                        }
                    ],
                    // 生成 1倍图
                    path.resolve(__dirname, "../src/assets/generated/sprite.scss")
                ]
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        })
    ]
}
