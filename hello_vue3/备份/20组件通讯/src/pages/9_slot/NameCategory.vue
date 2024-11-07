<template>
    <div class="category">
        <!-- 具名插槽 -->
        <slot name="s1"/>
        <slot name="s2"/>
    </div>
</template>

<script setup lang="ts" name="NameCategory">

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