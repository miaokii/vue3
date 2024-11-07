<template>
    <div class="category">
        <h2>热门游戏</h2>
        <!-- 作用域插槽，子组件向父组件提供数据 -->
        <slot :games="games" :x="100" :y="10"/>
    </div>
</template>

<script setup lang="ts" name="Game">
import { reactive } from 'vue';
import { nanoid } from 'nanoid';

let games = reactive([
    { id: nanoid(), name: '英雄联盟' },
    { id: nanoid(), name: '守望先锋' },
    { id: nanoid(), name: '穿越火线' },
    { id: nanoid(), name: '无畏契约' },
    { id: nanoid(), name: '黑神话悟空' },
])

</script>

<style scoped>

.category {
    background-color: lightblue;
    border-radius: 10px;
    box-shadow: 0 0 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 25%;
    height: 400px;
}

h2 {
    background-color: orange;
    height: 50px;
    text-align: center;
    align-content: center;
    font-size: 25px;
    font-weight: 500;
    margin-top: 0;
}

</style>