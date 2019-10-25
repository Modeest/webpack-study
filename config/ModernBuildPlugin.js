const fs = require("fs-extra");
const path = require("path");

const safariFix = `!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();`;

/**
 * ModernBuildPlugin 是我们自定义的 Webpack 插件。
 * 大家知道 HtmlWebpackPlugin 可以自动将构建出来的 js 文件插入到 html 中。
 * 由于我们需要执行两次编译，两次编译是独立进行的，
 * 单纯依靠 HtmlWebpackPlugin 无法将两个独立构建的 js 一并插入到 html 中。
 * 所以我们自定义了 ModernBuildPlugin 来解决这个问题。
 */
class ModernBuildPlugin {
    constructor({ modern }) {
        this.isModernBuild = modern;
    }
    apply (compiler) {
        if (!this.isModernBuild) {
            this.applyLegacy(compiler);
        } else {
            this.applyModern(compiler);
        }
    }
    applyLegacy (compiler) {
        const ID = `legacy-bundle`;
        compiler.hooks.compilation.tap(ID, compilation => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
                ID,
                async (data, cb) => {
                    const htmlName = path.basename(data.plugin.options.filename);

                    const htmlPath = path.dirname(data.plugin.options.filename);
                    const tempFilename = path.join(
                        htmlPath,
                        `legacy-assets-${htmlName}.json`
                    );
                    await fs.mkdirp(path.dirname(tempFilename));
                    await fs.writeFile(tempFilename, JSON.stringify(data.body));
                    cb();
                }
            );
        });
    }

    applyModern (compiler) {
        const ID = `modern-bundle`;
        compiler.hooks.compilation.tap(ID, compilation => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
                ID,
                async (data, cb) => {
                    // use <script type="module"> for modern assets
                    data.body.forEach(tag => {
                        if (tag.tagName === "script" && tag.attributes) {
                            tag.attributes.type = "module";
                        }
                    });
                    // inject Safari 10 nomodule fix
                    data.body.push({
                        tagName: "script",
                        closeTag: true,
                        innerHTML: safariFix
                    });

                    // inject links for legacy assets as <script nomodule>
                    const htmlName = path.basename(data.plugin.options.filename);
                    const htmlPath = path.dirname(data.plugin.options.filename);
                    const tempFilename = path.join(
                        htmlPath,
                        `legacy-assets-${htmlName}.json`
                    );
                    const legacyAssets = JSON.parse(
                        await fs.readFile(tempFilename, "utf-8")
                    ).filter(a => a.tagName === "script" && a.attributes);
                    legacyAssets.forEach(a => {
                        a.attributes.nomodule = "";
                    });
                    data.body.push(...legacyAssets);
                    await fs.remove(tempFilename);
                    cb();
                }
            );

            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(ID, data => {
                data.html = data.html.replace(/\snomodule="">/g, " nomodule>");
            });
        });
    }
}

ModernBuildPlugin.safariFix = safariFix;
module.exports = ModernBuildPlugin;