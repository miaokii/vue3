
<!-- html结构 -->
<template>
    <Person></Person>
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

</style>