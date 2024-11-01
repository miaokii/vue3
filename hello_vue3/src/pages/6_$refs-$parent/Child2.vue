
<template>
    <div class="child">
        <h3>子组件2</h3>
        <h4>电脑：{{ computer }}</h4>
        <h4>书籍：{{ book }}</h4>
        <!-- <button @click="minusHouse">继承一套房产</button> -->
    </div>
</template>

<script setup lang="ts" name="Child2">
import { ref } from 'vue';

let computer = ref('联想')
let book = ref(6)

defineExpose({computer, book})

</script>

<style scoped>
.child {
    margin-top: 20px;
    padding: 20px;
    background-color: lightsalmon;
    border-radius: 20px;
    box-shadow: 0 0 10px black;
}
</style>