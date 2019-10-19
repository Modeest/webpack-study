<template>
    <div id="app">
        <h2>Hello Vue</h2>
        <img src="./assets/images/baidu.png" alt />
        <img src="./assets/images/news.png" alt />
        <!-- <img src="./assets/images/abc.jpg" alt /> -->
        <span class="iconfont iconadd"></span>

        <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconfavorfill" />
        </svg>
    </div>
</template>

<script>
import './assets/fonts/iconfont.js';

export default {
    name: "App"
};
</script>

<style lang="scss">
@import './assets/fonts/iconfont.css';
$color: red;

h2 {
    color: $color;
    transform: translateX(100px);
}
</style>