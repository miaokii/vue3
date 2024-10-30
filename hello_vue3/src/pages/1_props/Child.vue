<template>
    <div class="child">
        <h3>子组件</h3>
        <h4>玩具：{{ toy }}</h4>
        <h4>父传入的车：{{ car }}</h4>

        <button @click="sendToy(toy)">将玩具传给父组件</button>
        <button @click="backToy()">取回玩具</button>
    </div>
</template>

<script lang="ts" setup name="Child">
import { ref } from 'vue';

/// 声明接收car和发送数据的方法
defineProps(['car', 'sendToy', 'backToy'])

let toy = ref('托宝战士')

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