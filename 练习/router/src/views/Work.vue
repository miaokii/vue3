<template>
    <div class="work-body">
        <img :src="utils.getImage('image.png')" alt="">
    </div>
</template>

<script setup lang="ts" name="name">
import { getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance() as any;

console.log(proxy.utils.appConfig);

onMounted(() => {
    console.log(proxy.utils.getImage('image.png'));
})

</script>

<style scoped>

.work-body img {
    object-fit: cover;
    width: calc(100vw - var(--nav-width));
    height: calc(100vh - var(--header-height));
}

</style>