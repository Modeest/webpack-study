<template>
    <div class="box">
        <h3>Hello {{title}}</h3>
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

        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Hello Promise');
                resolve();
            }, 2000);
        })
    }
}
</script>

<style lang="scss">
$color: greenyellow;
h3 {
    color: $color;
    transform: translateX(100px);
}
</style>