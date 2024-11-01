<template>
    <div class="father">
        <h2>父组件</h2>
        <h3>房产：{{ house }}</h3>
        <button @click="changeToy">更改孩子1的玩具</button>
        <button @click="changeComputer">更改孩子2的电脑</button>
        <button @click="changeBook($refs)">给孩子们多买2本书</button>
        <!-- 设置组件标签 -->
        <Child1 ref="child1" />
        <Child2 ref="child2" />
    </div>
</template>

<script setup lang="ts" name="Father">
import { ref } from 'vue';
import Child1 from './Child1.vue';
import Child2 from './Child2.vue';

let house = ref(4)

let child1 = ref()
let child2 = ref()

function changeToy() {
    child1.value.toy = '乐高积木'
}

function changeComputer() {
    child2.value.computer = ' MacBookPro 15'
}

function changeBook(refs: any) {    
    for (const key in refs) {
        refs[key].book += 2    
    }
}

defineExpose({ house })

</script>

<style scoped>
.father {
    background-color: lightgray;
    padding: 20px;
    border-radius: 10px;
}

button {
    margin-right: 20px;
}
</style>