const merge = require("webpack-merge");
const webpackBaseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    devtool: 'none',
    plugins: [
        // 每次进行预编译前先将旧的dll文件清空。
        new CleanWebpackPlugin()
    ]
});