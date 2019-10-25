const path = require('path');
const merge = require("webpack-merge");
const webpackBaseConfig = require('./webpack.base');

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    // Fuck，此处解决构建之后，出现 Entrypoint undefined = index.html 问题，不影响构建结果，但是看着难受
    stats: { children: false },
    // none: 不生成source-map（生产环境）
    // source-map: 映射到原始源代码，source-map 作为单独的文件保存。
    // inline-source-map：映射到原始源代码，source map 转换为 DataUrl 后添加到 bundle 中，会导致文件大小剧增
    // eval：映射到转换后的代码，而不是源代码，行数映射不正确。
    // eval-source-map：映射到原始源代码，只映射到行。（开发环境）
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        hot: true
    }
});