<template>
    <div class="layout-entire">
        <h1 class="mt-6 mb-4 text-lg lg:text-3xl font-semibold md:w-2/3">Stories</h1>
        <router-view></router-view>
    </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
export default {};
</script>

<style>
.layout-entire {
    margin: 0 10%;
}
</style>
