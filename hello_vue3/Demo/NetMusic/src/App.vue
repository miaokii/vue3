<template>
    <div class="father">
        <h2>App组件</h2>
        <Suspense>
            <template v-slot:default>
                <Child/>
            </template>
            <template v-slot:fallback>
                <h3>加载中...</h3>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts" name="App">
import Child from './Child.vue';
</script>

<style scoped>

.father {
    background-color: #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px;
    width: 50%;
}

img {
    width: 300;
}

</style>