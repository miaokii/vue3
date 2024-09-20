<template>
    <h1>Watch监视</h1>
    <div class="person">
        <h2>情况一：监视【ref】定义的【基本类型】数据</h2>
        <h3>当前num：{{ num }}</h3> <br>
        <button @click="changeNum">num+1</button>
    </div>
</template>

<!-- 这个script标签用于配置组件名 -->
<script lang="ts">
export default {
    name: 'Person',
}
</script>

<!-- 语法糖实现setup -->
<script setup lang="ts">
// 引入响应式
import { ref, watch } from 'vue'

let num = ref(0)

// 监听num，不是num.value
// watch返回值是一个函数
let stopWatch = watch(num, (newValue, oldValue)=>{
    console.log('num改变', newValue, newValue);
    // 停止监视
    if (newValue > 10) {
        stopWatch()
    }
})

function changeNum() {
    num.value += 1
}

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