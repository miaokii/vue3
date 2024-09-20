
<!-- html结构 -->
<template>
    <div class="app">
        <h1>你好啊</h1>
        <Person></Person>
    </div>
</template>

<!-- 脚本 ts或js -->
<script lang="ts">
    import Person from './components/Person.vue'
    export default {
        // 组件名
        name: 'App',
        components: {Person} // 注册组件
    }
</script>

<!-- 样式 -->
<style>
.app {
    background-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}
</style>