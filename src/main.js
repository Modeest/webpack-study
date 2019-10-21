import Vue from "vue";
import App from "./app.vue";
import router from "./router";

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});

// test code: test suporting Promise in browser.
let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("done");
    }, 1000);
});
p.then(res => {
    console.log(res);
});

// test code: add youself HMR
console.log('module.hot:', module.hot);
if (module.hot) {
    module.hot.accept("./print.js", function () {
        console.log("接收更新后的模块");
        print();
    });
}