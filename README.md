1. npm i webpack webpack-cli webpack-dev-server
2. npm i vue vue-router
    npm i vue-loader vue-template-compiler VueLoaderPlugin
3. npm i HtmlWebpackPlugin
4. npm i css-loader style-loader
5. npm install -D sass-loader node-sass
6. npm install -D postcss-loader postcss-preset-env
    postcss-preset-env:postcss插件=》增加前缀
        browserslist：设置要兼容的浏览器
7. npm install file-loader url-loader -D
    url-loader 可以设置文件的尺寸限制，低于设定尺寸的文件会转成 base64 编码的 URI。
    超出限制的文件会调用 file-loader 进行处理。
    同时我们可以通过 name 属性来指定文件导出时的目录和名称。
8. npm i @babel/core @babel/preset-env babel-loader -D
    npm i @babel/polyfill
    @babel/core: Babel 的核心功能包
    @babel/preset-env 能根据当前的运行环境，自动确定需要的 plugins 和 polyfills。主要负责将代码转成 ES5 语法规则。
    babel-polyfill。Babel 编译时只编译语法，并不会编译 API 和实例方法，如：async/await、Promise 等，babel-polyfill 会把这些没有的 API 全部挂载到全局对象，也就是所谓的“垫片”。
    babel-loader 是 Webpack 用来转译 JS 代码的加载器。
    新建.babelrc:是babel官方配置文件
    引入@babel/preset-env
    指定需要兼容的浏览器
    通过 useBuiltIns 指定为 usage，@babel/preset-env 可以按需引入对应的 polyfill，减小文件大小。有一个需要注意的点，corejs 与 package.json 中依赖的 core-js 的版本需要一致，否则可能会构建失败。
9. npm install webpack-dev-server -D
10. npm i serve -g: 全局安装serve，执行 npm run dist
11. npm i webpack-merge -D: 合并webpack配置
12. npm install -D eslint eslint-loader eslint-plugin-vue babel-eslint eslint-friendly-formatter
13. npm install stylelint stylelint-webpack-plugin stylelint-config-standard -D
14. npm install -D webpack-spritesmith
15（暂不可用）. npm install terser-webpack-plugin -D:压缩JS，ulify-es不再维护，使用terserPlugin代替
    这里有问题，已经压缩，为什么还需要独立下载，是因为webpack生产模式已经开启压缩？
    暂时先去掉该压缩插件："terser-webpack-plugin": "^2.2.1",
    const TerserPlugin = require("terser-webpack-plugin");
    plugins: [new TerserPlugin()]
16. npm i extract-text-webpack-plugin@next -D: 抽离css为单独文件，利用浏览器缓存
    直接下载报错，老版本不支持4.0，需要next版本支持4.0
    OptimizeCSSPlugin也是没有用到，但是css文件被压缩
17. npm i vconsole: 定制webpack插件
18. npm install hard-source-webpack-plugin -D: 缓存webpack内部中间编译过程

