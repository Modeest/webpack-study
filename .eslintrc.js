module.exports = {
    // 代码运行的环境
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ["eslint:recommended", "plugin:vue/essential"],
    // 我们没有在 parser 中指定 babel-eslint，而是在 parserOptions.parser 指定的
    // 这是由于在 eslint-plugin-vue 中使用了自定义的解析器 vue-eslint-parser。
    // 如果直接在 parser 中指定 babel-eslint 会覆盖 vue-eslint-parser 导致 eslint-plugin-vue 无法正常工作
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    // 使用eslint-plugin-vue插件，简写为vue
    plugins: ["vue"],
    rules: {}
};