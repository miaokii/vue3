<template>
   <div class="person">
        <h2>当前值：{{ sum }}</h2>
        <button @click="changeSum">sum+1</button>
    </div>
</template>

<!-- 语法糖实现setup -->
<script setup lang="ts" name='Person'>
import { ref } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

let sum = ref(0)

function changeSum() {
    sum.value += 1
}

console.log('创建Person');

onBeforeMount(()=>{
    console.log('挂载前');
})

onMounted(()=>{
    console.log('挂载完毕');
})

onBeforeUpdate(()=>{
    console.log('更新前');
})

onUpdated(()=>{
    console.log('更新完毕');
})

onBeforeUnmount(()=>{
    console.log('卸载前');
})

onUnmounted(()=>{
    console.log('卸载完毕');
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