<template>
    <div class="father">
        <h2>父组件</h2>
        <h5>存款：{{ money }}</h5>
        <h5>有一辆{{ car.brand }}汽车，价格{{ car.price }}元</h5>
        <Child/>
    </div>
</template>

<script setup lang="ts" name="Father">
import { provide, reactive, ref } from 'vue';
import Child from './Child.vue';

let money = ref(100)
let car = reactive({
    brand: '奔驰',
    price: 20
})

function changeMoney(value: number) {
    money.value -= value
}

provide('moneyContext', {money, changeMoney})
provide('car', car)

</script>

<style scoped>

.father {
    background-color: lightgray;
    padding: 20px;
    border-radius: 10px;
}
</style>