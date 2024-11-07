<template>
    <div>
        <h2>{{ num }}</h2>
        <h2>{{ car }}</h2>
        <h2>{{ student }}</h2>
        <br>
        <button @click="changeNum">更改num</button>
        <button @click="changeCar">更改Car</button>
        <button @click="changeStudent">更改Student</button>
    </div>
</template>

<script setup lang="ts" name="App">
import { reactive, readonly, ref, shallowReactive, shallowReadonly, shallowRef, toRaw, markRaw } from 'vue';

let n = shallowRef(20)
let num = readonly(n)

let c = reactive({
    'brand': '宝马',
    'option': {
        'color': 'red',
        'power': 512
    }
})
let rawCar = toRaw(c)

let car = shallowReadonly(c)

let student = shallowReactive({
    'name': 'xiaofei',
    'age': 20,
    'score': {
        'math': 134,
        'english': 120,
        'chinese': 132
    }
})

let cities = markRaw([
    {id:'jlfndxa1', name:'北京'},
    {id:'jlfndxa2', name:'上海'},
    {id:'jlfndxa3', name:'成都'},
])

let reactiveCities = reactive(cities)
console.log(reactiveCities);


function changeNum() {
    num.value += 1
}

function changeCar() {
    car.brand = '奔驰'
    car.option.color = 'green'
}

function changeStudent() {
    // student.age += 1
    // student.score.math -= 1

    student.score = {
        'math': 120,
        'english': 110,
        'chinese': 112
    }
}

</script>

<style scoped>
button {
    margin: 0 20px;
}
</style>