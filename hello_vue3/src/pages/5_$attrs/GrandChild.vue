<template>
    <div class="grandChild">
        <h4>孙组件</h4>
        <h5>【b：{{b}}】【c：{{c}}】</h5>
        <button @click="changeA(4)">a+4</button>
    </div>
</template>

<script setup lang="ts" name="GrandChild">

defineProps(['b', 'c', 'changeA'])

</script>

<style scoped>
.grandChild {

    padding: 20px;
    background-color: lightpink;
    border-radius: 20px;
    box-shadow: 0 0 10px black;
}
</style>