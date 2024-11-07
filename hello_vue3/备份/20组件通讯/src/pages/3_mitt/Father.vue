<template>
    <div class="father">
        <h3>父组件</h3>
        <h4 v-if="toy">子组件传出的玩具：{{ toy }}</h4>
        <Child></Child>
    </div>
</template>

<script lang="ts" setup name="Father">
import { onUnmounted, ref } from 'vue';
import Child from './Child.vue';
import emitter from '@/utils/emitter';

let toy = ref('')

emitter.on('send-toy', (value: string) => {
    toy.value = value
})

onUnmounted(()=>{
    console.log('移除send-toy');
    emitter.off('send-toy')
})

</script>

<style scoped>
.father {
    background-color: lightgray;
    padding: 20px;
    border-radius: 10px;
}
</style>