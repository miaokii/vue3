<template>
    <div class="person">
        <h2 ref="title2">标题2</h2>
        <button @click="showLog">展示h2</button>
    </div>
</template>

<!-- 这个script标签用于配置组件名 -->
<script lang="ts">

export default {
    name: 'Person'
}
</script>

<!-- 语法糖实现setup -->
<script setup lang="ts">
// 引入响应式，监视
import { ref, defineExpose } from 'vue'

let title2 = ref()
let a = ref(1)
let b = 2

function showLog() {
    console.log(title2.value);
}

defineExpose({a, b})
</script>

<style scoped>
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 10px;
}

button {
    margin: 0 0 0 10px;
}
</style>