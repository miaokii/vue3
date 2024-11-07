<template>
    <!-- :value：将接收的value传递给input的value属性 -->
    <!-- @input：将input元素绑定给原生input事件，触发此事件是，会执行update:modelValue事件 -->
    <input type="text" :value="modelValue" @input="emit('update:modelValue', (<HTMLInputElement>$event.target).value)">
</template>

<script setup lang="ts" name="CusInput">
defineProps(['modelValue'])
let emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
input {
    border-radius: 2px;
}
</style>