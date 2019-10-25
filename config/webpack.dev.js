const path = require('path');
const merge = require("webpack-merge");
const webpackBaseConfig = require('./webpack.base');
const SpritesmithPlugin = require("webpack-spritesmith");
const { templateFunction } = require('./util');

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    // Fuck，此处解决构建之后，出现 Entrypoint undefined = index.html 问题，不影响构建结果，但是看着难受
    stats: { children: false },
    /*
    // none: 不生成source-map（生产环境）
    // source-map: 映射到原始源代码，source-map 作为单独的文件保存。
    // inline-source-map：映射到原始源代码，source map 转换为 DataUrl 后添加到 bundle 中，会导致文件大小剧增
    // eval：映射到转换后的代码，而不是源代码，行数映射不正确。
    // eval-source-map：映射到原始源代码，只映射到行。（开发环境）
    */
    devtool: 'eval-source-map',
    // resolve: 告诉 Webpack 解析模块时应该搜索的目录,绝对路径和相对路径都能使用，但是它们之间有一点差异
    // ~ 是 Webpack 中约定俗成的一个符号，表示从 resolve.modules 中指定的路径。
    // 假如在 app.vue 中 import img from '~sprite.png', 那么最终经过上面讲述的查找过程后，实际的路径是 ./src/assets/generated/sprite.png。因此 ~ 与 resolve.modules 的配置有直接的关系。
    resolve: {
        modules: ["../node_modules", "../src/assets/generated"]
    },
    plugins: [
        // 合并精灵图
        /**
         * 如何在雪碧图中使用 rem？
         * 由于很多图片被拼在一张雪碧图中，那么如何避免元素的背景图片出现相邻图片的边缘？（提示：通过 webpack-spritesmith 的某个配置）
         */
        new SpritesmithPlugin({
            // src 用来指定哪些图片需要合并成雪碧图
            src: {
                cwd: path.resolve(__dirname, "../src/assets/sprites"),
                glob: "*.png"
            },
            customTemplates: {
                function_based_template: templateFunction
            },
            // target 用来指定文件的输出
            target: {
                image: path.resolve(__dirname, "../src/assets/generated/sprite.png"),
                css: [
                    [
                        // 2倍图
                        path.resolve(__dirname, "../src/assets/generated/sprite2.scss"),
                        {
                            format: "function_based_template"
                        }
                    ],
                    // 1倍图
                    path.resolve(__dirname, "../src/assets/generated/sprite.scss")
                ]
            },
            // apiOptions 中的 cssImageRef 是一个雪碧图的路径，CSS 文件中将使用该路径用作背景图
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        hot: true
    }
});