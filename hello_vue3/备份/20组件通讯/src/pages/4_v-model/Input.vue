<template>
    <input type="text" :value="mingzi" @input="emit('update:mingzi', (<HTMLInputElement>$event.target).value)">
    <br>
    <input type="text" :value="mima" @input="emit('update:mima', (<HTMLInputElement>$event.target).value)">
</template>

<script setup lang="ts" name="Input">

defineProps(['mingzi', 'mima'])
let emit = defineEmits(['update:mingzi', 'update:mima'])

</script>

<style scoped>
input {
    border: 2px solid black;
    background-image: linear-gradient(45deg, red, yellow, orange);
    border-radius: 10px;
    height: 35px;
    margin-top: 10px;
    color: white;
    font-size: 30px;
}
</style>