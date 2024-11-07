<template>
    <div class="father">
        <h2>父组件</h2>
        <h3>【a: {{ a }} 】【 b: {{ b }}】</h3>
        <Child :a="a" :b="b" v-bind="{'c':100, 'd':90}" :changeA="changeA"/>
    </div>
</template>

<script setup lang="ts" name="Father">
import { ref } from 'vue';
import Child from './Child.vue';

let a = ref(2)
let b = ref(4)

function changeA(value: number) {
    a.value += value
}

</script>

<style scoped>

.father {
    background-color: lightgray;
    padding: 20px;
    border-radius: 10px;
}
</style>