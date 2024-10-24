<template>
    <div>欢迎学习Vue</div>
</template>

<script setup lang="ts" name="About">

import { onMounted, onUnmounted } from 'vue';

onMounted(()=>{
    console.log('挂载');
})

onUnmounted(()=>{
    console.log('卸载');
})

</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: grey;
    font-size: 40px;
}
</style>