<template>

    <div class="count">
        <h2>当前求和为 {{ num }}</h2> 
        <!-- .number将输入尽可能转换成数字 -->
        <select v-model.number="option">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>

        <button @click="plusNum">加</button>
        <button @click="subtractNum">减</button>
    </div>
</template>

<script lang="ts" name='Count' setup>
import { reactive, ref } from 'vue';

// 求和数
let num = ref(1)
// 选项
let option = ref(1)

function plusNum() {
    num.value += option.value
}

function subtractNum() {
    num.value -= option.value
}

</script>

<style scoped>
button, select {
    height: 30px;
    margin-right: 20px;
}

.count {
    background-color: aquamarine;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
}
</style>