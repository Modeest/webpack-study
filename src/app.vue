<template>
    <div class="box">
        <h3>Hello {{title}} v3</h3>
        <ul>
            <li class="icon-img1"></li>
            <li class="icon-img2"></li>
            <li class="icon-img3"></li>
            <li class="icon-img4"></li>
            <li class="ico ico-img1"></li>
            <li class="ico ico-img2"></li>
            <li class="ico ico-img3"></li>
            <li class="ico ico-img4"></li>
        </ul>
        <router-view />
    </div>
</template>

<script>
export default {
    data: () => ({
        title: 'Webpack'
    }),
    created () {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        const arr = [...arr1, ...arr2];
        console.log(arr);

        const res = [1, 2, 3, [1, 2, [3, [4]]]].flat(2);
        console.log('res:', res);

        new Promise((resolve) => {
            setTimeout(() => {
                console.log('Hello Promise');
                resolve();
            }, 2000);
        })
    }
}
</script>

<style lang="scss">
// 1倍图
@import '~sprite.scss';
// 2倍图
@import '~sprite2.scss';

$color: greenyellow;
/* stylelint-disable */
/* stylelint-disable unit-whitelist */
h3 {
    color: $color;
    background: #ffff99;
    transform: translateX(100px);
}

.icon-img1 {
    @include sprite($img1);
}
.icon-img2 {
    @include sprite($img2);
}
.icon-img3 {
    @include sprite($img3);
}
.icon-img4 {
    @include sprite($img4);
}
</style>