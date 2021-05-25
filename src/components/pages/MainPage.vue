<template>
    <div id="mainPage">
        <Post />
    </div>
</template>

<script>
import Post from './Post';

export default {
    components: {
        Post,
    },
};
</script>

<style scoped>
.layout-group {
    max-width: 95%;
}
</style>
