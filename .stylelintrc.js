// module.exports = {
//     rules: {
//         "color-no-invalid-hex": true,
//         "color-hex-case": "lower",
//         "unit-whitelist": ["em", "rem", "%", "s", "px"]
//     }
// };
module.exports = {
    extends: "stylelint-config-standard",
    rules: {
        "indentation": 4,
        "color-no-invalid-hex": true,
        "color-hex-case": "lower",
        "unit-whitelist": ["em", "rem", "%", "s", "px"],
        "at-rule-no-unknown": [
            true,
            { ignoreAtRules: ["mixin", "extend", "content", "include"] }
        ]
    }
};