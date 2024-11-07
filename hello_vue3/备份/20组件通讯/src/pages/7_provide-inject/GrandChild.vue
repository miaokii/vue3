<template>
    <div class="grandChild">
        <h4>孙组件</h4>
        <h5>存款：{{ money }}</h5>
        <h5>有一辆{{ car.brand }}汽车，价格{{ car.price }}元</h5>
        <button @click="changeMoney(10)">存款减少10</button>
    </div>
</template>

<script setup lang="ts" name="GrandChild">
import { inject } from 'vue';

let {money, changeMoney} = inject('moneyContext', {money:0, changeMoney:(x:number)=>{}})
let car = inject('car', {brand:'', price:0})

</script>

<style scoped>
.grandChild {

    padding: 20px;
    background-color: lightpink;
    border-radius: 20px;
    box-shadow: 0 0 10px black;
}
</style>