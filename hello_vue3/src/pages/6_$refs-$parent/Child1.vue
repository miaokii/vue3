<template>
    <div class="child">
        <h3>子组件1</h3>
        <h4>玩具：{{ toy }}</h4>
        <h4>书籍：{{ book }}</h4>
        <button @click="minusHouse($parent)">继承一套房产</button>
    </div>
</template>

<script setup lang="ts" name="Child1">
import { ref } from 'vue';

let toy = ref('变形金刚')
let book = ref(3)

function minusHouse(parent: any) {
    parent.house -= 1
}

defineExpose({toy, book})

</script>

<style scoped>
.child {
    margin-top: 20px;
    padding: 20px;
    background-color: lightpink;
    border-radius: 20px;
    box-shadow: 0 0 10px black;
}
</style>