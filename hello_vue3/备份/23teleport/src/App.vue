<template>
    <div class="father">
        <h2>App组件</h2>
        <img src="https://yoc.tech/images/logo-n.png" alt="">
        <br>
        <Modal/>
    </div>
</template>

<script setup lang="ts" name="App">

import Modal from './Modal.vue';
</script>

<style scoped>

.father {
    background-color: #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px;
    width: 20%;
    height: 500px;
}

img {
    width: 300;
}

</style>