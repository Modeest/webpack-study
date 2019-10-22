const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ModernBuildPlugin = require("./modernBuildPlugin");
const baseConf = require("./webpack.config.base");

const {
    configureBabelLoader,
    configureURLLoader,
    configureCSSLoader
} = require("./util");

// env，表示构建的环境是什么，取值范围是 test、prod。默认值是 test。
// buildMode，表示是生成普通构建包、现代构建包还是旧浏览器构建包，取值范围是 common、modern 和 legacy。默认是在 common。
// browserslist，为 babel-loader 指定浏览器范围，用以划分现代浏览器和旧浏览器 。默认值是 null，值是一个字符串数组。
module.exports = function (
    options = {
        env: "test",
        buildMode: "common",
        browserslist: ""
    }
) {
    let { env, buildMode, browserslist } = options;
    let filename = "js/[name].js";
    env = env === "prod" ? env : "test";
    if (buildMode !== "legacy" && buildMode !== "modern") {
        buildMode = "common";
    }
    if (!Array.isArray(browserslist)) {
        browserslist = null;
    }
    let plugins = [
        new TerserPlugin(),
        new OptimizeCSSPlugin(),
        // 避免不必要的 hash 变化
        new webpack.HashedModuleIdsPlugin()
    ];
    let modern = buildMode === "common" ? false : true;
    let postfix = buildMode === "common" ? "" : `-${buildMode}`;
    let rules = [
        configureCSSLoader(env),
        configureBabelLoader(modern, browserslist),
        ...configureURLLoader(env)
    ];
    // 根据不同的构建环境，添加不同的ExtractTextPlugin
    if (env === "prod") {
        filename = `js/[name]${postfix}.[chunkhash:8].js`;
        plugins.push(new ExtractTextPlugin("css/[name].[hash:8].css"));
    } else {
        filename = `js/[name]${postfix}.js`;
        plugins.push(new ExtractTextPlugin("css/[name].css"));
    }

    // 构建模式是modern时
    if (buildMode === "modern") {
        plugins.push(
            new ModernBuildPlugin({ modern: true }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["**/*", "!js", "!js/*"]
            })
        );
    }

    // 构建模式是legacy时
    if (buildMode === "legacy") {
        plugins.push(
            new ModernBuildPlugin({ modern: false }),
            new CleanWebpackPlugin()
        );
    }

    // 构建模式是普通构建
    if (buildMode === "common") {
        plugins.push(new CleanWebpackPlugin());
    }

    // 生产环境特定配置
    const prodConf = {
        output: {
            filename
        },
        module: { rules },
        plugins,
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
    };

    return merge(baseConf, prodConf);
};