<template>
    <section class="page-head" :style="`background-image: url(${path});`"></section>
</template>

<script setup lang="ts" name="imageHead">
defineProps<{
    path: string
}>()

</script>

<style scoped>
.page-head {
    height: 31vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
}
</style>