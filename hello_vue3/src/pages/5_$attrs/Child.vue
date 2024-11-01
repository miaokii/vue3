<template>
    <div class="child">
        <h3>子组件</h3>
        <h4>【a：{{a}}】</h4>
        <GrandChild v-bind="$attrs"/>
    </div>
</template>

<script setup lang="ts" name="Child">
import GrandChild from './GrandChild.vue';
defineProps(['a'])

</script>

<style scoped>
.child {
    padding: 20px;
    background-color: beige;
    border-radius: 20px;
    box-shadow: 0 0 10px black;
}
</style>