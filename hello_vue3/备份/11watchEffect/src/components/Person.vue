<template>
    <h1>Watch监视</h1>
    <div class="person">
        <h2>当水温不低于60度时或者水位不低于60cm时，上报服务器</h2>

        <h2>水温：{{ temp }}摄氏度</h2>
        <h2>水位：{{ height }}摄氏度</h2>

        <button @click="changeTemp">水温+10度</button>
        <button @click="changeHeight">水位升高10cm</button>
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
import { ref, watch, watchEffect } from 'vue'

let temp = ref(10)
let height = ref(0)

function changeTemp() {
    temp.value += 10
}

function changeHeight() {
    height.value += 10
}

watch([temp, height], (value)=>{
    // 解构数据
    let [newTemp, newHeight] = value
    if (newTemp >= 60 || newHeight >= 60) {
        console.log('上报数据');
    }
})

watchEffect(() => {
    if (temp.value >= 60 || height.value >= 60) {
        console.log('上报数据');
    }
})

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