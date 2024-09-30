<!-- html结构 -->
<template>
    <Person v-if="isShow"/>
    <button @click="changeShow"> {{ showPerson }}</button>
</template>

<!-- 脚本 ts或js -->
<script lang="ts" setup name="App">
import Person from './components/Person.vue';
import {ref, computed} from 'vue'
let isShow = ref(true)

function changeShow() {
    if (isShow.value) {
        isShow.value = false
    } else {
        isShow.value = true
    }
}

let showPerson = computed(()=>{
    return isShow.value ? "隐藏Person" : "展示Person"
})

</script>

<!-- 样式 -->
<style></style>