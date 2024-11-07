<template>
    <div class="father">
        <h3>父组件</h3>
        <h4 v-if="toy">子组件传出的玩具：{{ toy }}</h4>

        <!-- 给子组件绑定sendToy事件，当这个事件触发时，执行getToy函数 -->
        <Child @send-toy="getToy"></Child>
    </div>
</template>

<script lang="ts" setup name="Father">
import { ref } from 'vue';
import Child from './Child.vue';

let toy = ref('')

function getToy(value: string) {
    toy.value = value
}

</script>

<style scoped>
.father {
    background-color: lightgray;
    padding: 20px;
    border-radius: 10px;
}
</style>