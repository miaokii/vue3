<template>
    <div class="child">
        <h3>子组件</h3>
        <GrandChild/>
    </div>
</template>

<script setup lang="ts" name="Child">
import GrandChild from './GrandChild.vue';

</script>

<style scoped>
.child {
    padding: 20px;
    background-color: beige;
    border-radius: 20px;
    box-shadow: 0 0 10px black;
}
</style>