const merge = require("webpack-merge");
const webpackBaseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = merge(webpackBaseConfig, {
    // module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    devtool: 'none',
    plugins: [
        // 每次进行预编译前先将旧的dll文件清空。
        new CleanWebpackPlugin(),
        // 分析包文件大小
        // new BundleAnalyzerPlugin()
    ]
});
/*
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const config = merge(webpackBaseConfig, {
    // module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    devtool: 'none',
    plugins: [
        // 每次进行预编译前先将旧的dll文件清空。
        new CleanWebpackPlugin()
    ]
});
module.exports = smp.wrap(config);
*/

