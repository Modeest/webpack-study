const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const path = require("path");
const {
    configureBabelLoader,
    configureURLLoader,
    configureCSSLoader
} = require("./util");

// 本地开发服务器的配置
const devServer = {
    proxy: {
        "/api": "http://localhost:8081"
    },
    contentBase: path.resolve(__dirname, "../dist"),
    hot: true,
    compress: true,
    overlay: true,
    open: true,
    port: 3000
};
module.exports = merge(baseConf, {
    // 将mode设置为development，启用webpack内置的优化
    mode: "development",
    // 启用缓存:开启 cache 的情况下，Webpack 会缓存模块和生产的 chunk，下次构建的时候如果内容没有发生变化可以直接复用缓存的内容，改善编译性能。
    cache: true,
    devtool: "eval-source-map",
    devServer,
    module: {
        rules: [
            configureCSSLoader(),
            { loader: "thread-loader" },
            configureBabelLoader(),
            ...configureURLLoader()
        ]
    }
});