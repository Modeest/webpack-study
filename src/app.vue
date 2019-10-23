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
    })
}
</script>