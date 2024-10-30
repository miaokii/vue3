<template>
    <div class="child">
        <h3>子组件</h3>
        <h4>玩具：{{ toy }}</h4>
        <button @click="emitter.emit('send-toy', toy)">发送玩具</button>
    </div>
</template>

<script lang="ts" setup name="Child">
import emitter from '@/utils/emitter';
import { ref } from 'vue';

let toy = ref('旋风冲锋')

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