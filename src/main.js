import Vue from "vue";
import App from "./app.vue";
import router from "./router";
// import flexible from 'raw-loader!./js/flexible.js';
// console.log("TCL: flexible", typeof flexible);
// console.dir(flexible);

// const res = require('raw-loader!./js/flexible.js').default;
// console.log("TCL: res", res)

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});