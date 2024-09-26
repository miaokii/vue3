<!-- html结构 -->
<template>
    <Person ref="man"></Person>
    <button @click="showPersonProperty">显示Person实例的属性</button>
</template>

<!-- 脚本 ts或js -->
<script lang="ts" setup name="App">
import Person from './components/Person.vue'

import {ref} from 'vue'

let man = ref()

function showPersonProperty() {
    console.log(man.value);
}

</script>

<!-- 样式 -->
<style></style>