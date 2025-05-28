<template>
    <div class="image-back" :style="`background-image: url(${path});`"></div>
</template>

<script setup lang="ts" name="imageHead">
defineProps<{
    path: string
}>()

</script>

<style scoped>
.image-back {
    height: 26vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0;
    width: 100%;
}
</style>