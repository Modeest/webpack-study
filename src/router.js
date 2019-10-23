import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/Index.vue";
import About from "./pages/About.vue";
Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: "/",
            component: Index
        },
        {
            path: "/about",
            component: About
        }
    ]
});