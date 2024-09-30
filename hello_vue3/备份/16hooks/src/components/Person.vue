<template>
    <div class="person">
        <h2>当前sum：{{ sum }}， 放大10倍：{{ bigSum }}</h2>
        <br>
        <button @click="addSum">sum+1</button>
        <br>
        <img v-for="(url, index) in urls" :src="url" :key="index">
        <br>
        <button @click="addAImage">增加一张图片</button>
    </div>
</template>

<!-- 语法糖实现setup -->
<script setup lang="ts" name='Person'>

import useDog from '@/hooks/useDog';
import useSum from '@/hooks/useSum';

const {urls, addAImage} = useDog()
const {sum, bigSum, addSum} = useSum()

</script>

<style scoped>
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 10px;
}

button {
    padding-left: 0;
    margin-left: 0;
    margin-top: 10px;
    margin-bottom: 10px;
}

img {
    height: 150px;
    margin-right: 10px;
}
</style>