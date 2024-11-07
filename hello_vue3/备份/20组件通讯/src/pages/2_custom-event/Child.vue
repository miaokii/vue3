<template>
    <div class="child">
        <h3>子组件</h3>
        <h4>玩具：{{ toy }}</h4>
        <button @click="emit('send-toy', toy)">传出玩具</button>
    </div>
</template>

<script lang="ts" setup name="Child">
import { ref } from 'vue';

let toy = ref('变形金刚')

// 申明事件
let emit = defineEmits(['send-toy'])

</script>

<style scoped>
.child {
    margin-top: 20px;
    background-color: skyblue;
    padding: 10px;
    box-shadow: 0 0 10px black;
    border-radius: 10px;
}

button {
    margin-right: 10px;
}
</style>