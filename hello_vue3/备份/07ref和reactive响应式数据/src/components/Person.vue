<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
        <br>
        <h2>汽车品牌：{{ car.name }}，价格{{ car.price }}万</h2>
        <button @click="changeCarPrice">修改汽车价格</button>
        <br>
        <h2>游戏列表</h2>
        <ul>
            <li v-for="game in games" :key="game.id">{{ game.name }}</li>
        </ul>
        <button @click="changeFirstGameName">修改第一个游戏的名称</button>
    </div>
</template>

<!-- 这个script标签用于配置组件名 -->
<script lang="ts">
export default {
    name: 'Person',
}
</script>

<!-- 语法糖实现setup -->
<script setup lang="ts">
// 引入响应式
import { reactive, ref } from 'vue'

// 数据，那个数据需要响应，就用ref包含
let name = ref('章三')
let age = ref(18)
let tel = '18099990000'

console.log(name);
console.log(age);
console.log(tel);

let car = reactive({'name': '奔驰', 'price': 100})
console.log(car);

let games = ref([
    {id:'game1',name:'王者荣耀'},
    {id:'game2',name:'英雄联盟'},
    {id:'game3',name:'黑神话《悟空》'}
])

// 非响应式，改变时模板中的元素值不变
function changeName() {
    // setup函数中this是未定义的，不可用
    // this.name = '藏三'
    name.value = '张三'
}

function changeAge() {
    age.value += 1
}

function showTel() {
    alert(tel)
}

function changeCarPrice() {
    car.price += 10
}

function changeFirstGameName() {
    games.value[0].name = '天天酷跑'
}    

</script>

<style scoped>
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 10px;
}

button {
    margin: 0 0 0 10px;
}
</style>