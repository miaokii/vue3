<template>
    <div>
        <h2>msg:{{ msg }}</h2>
        <input type="text" v-model="msg">
    </div>
</template>

<script setup lang="ts" name="App">
import useMsgRef from './useMsgRef';

let {msg} = useMsgRef('你好', 2000)

</script>

<style scoped>

</style>