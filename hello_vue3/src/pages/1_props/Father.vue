<template>
    <div class="father">
        <h3>父组件</h3>
        <h4>汽车：{{ car }}</h4>
        <h4 v-if="toy">子组件传出的玩具：{{ toy }}</h4>
        <Child :car="car" :sendToy="getToy" :backToy="backToy"></Child>
    </div>
</template>

<script lang="ts" setup name="Father">
import { ref } from 'vue';
import Child from './Child.vue';

let car = ref('小米SU7 Ultra')
let toy = ref('')

function getToy(value: string) {
    toy.value = value
}

function backToy() {
    toy.value = ''
}

</script>

<style scoped>
.father {
    background-color: lightgray;
    padding: 20px;
    border-radius: 10px;
}
</style>