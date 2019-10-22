// util.js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 配置URLLoader
// 生成 url-loader 的配置。与原来直接不同的地方是，可以根据构建的环境决定是否给文件名添加 hash
const configureURLLoader = env => {
    let rules = [
        { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, type: "img" },
        { test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, type: "media" },
        { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, type: "font" }
    ];
    return rules.map(rule => {
        let { type, test } = rule;
        let name = `${type}/[name].[ext]`;
        if (env === "prod") {
            name = `${type}/[name].[hash:7].[ext]`;
        }
        return {
            test,
            loader: "url-loader",
            options: {
                limit: 8092,
                name
            }
        };
    });
};

// 配置css-loader。生产环境下需要安装ExtractTextPlugin
// configureCSSLoader。生成 css-loader 的配置。与原来不同的地方是，可以根据构建的环境决定是否将 css 从 js 中提取到单独的 css 文件中。如果需要提取出来 css 文件，需要单独安装 ExtractTextPlugin。
const configureCSSLoader = env => {
    if (env === "prod" || env === "test") {
        return {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
            })
        };
    }
    return {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
    };
};

// 配置babelloader
// configureBabelLoader。生成 babel-loader 的配置。与原来不同的地方是，会根据测试环境决定是否使用 babelrc 的配置，会根据构建的模式，配置不同的浏览器范围。
const configureBabelLoader = (modern, browserlist) => {
    let options = {
        cacheDirectory: true
    };

    if (modern) {
        options = Object.assign(options, {
            babelrc: false,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        corejs: "3.0.1",
                        useBuiltIns: "usage",
                        targets: {
                            browsers: browserlist
                        }
                    }
                ]
            ]
        });
    }
    let babelLoader = {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["thread-loader", { loader: "babel-loader", options }]
    };
    return babelLoader;
};

// 雪碧图模板函数
// templateFunction。雪碧图的自定义模板。仅仅是从 webpack.config.base.js 中抽离到 util.js 中，内容没有变化。
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
    configureURLLoader,
    configureCSSLoader,
    configureBabelLoader,
    templateFunction
};