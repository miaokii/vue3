<template>
    <div class="person">
        <!-- v-model双向绑定 -->
        姓：<input type="text" v-model="firstName"> <br>
        名：<input type="text" v-model="lastName"> <br>
        <!-- 未使用计算属性 -->
        全名：<span> {{ firstName }} - {{ lastName }} </span> <br>
        <!-- 使用计算属性 -->
        计算属性全名：<span> {{ fullName }}</span> <br>
        <button @click = 'changeFullName'>更改全名为李-四</button>
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
import { ref, computed } from 'vue'

let firstName = ref('张')
let lastName = ref('三')

// 计算属性有缓存，依赖属性值没有变化时，只计算一次
// 只读的计算属性 
// let fullName = computed(()=>{
//     return firstName.value + '-' + lastName.value
// })

let fullName = computed({
    set(newValue){
        // const [s1, s2] = newValue.split('-')
        // firstName.value = s1
        // lastName.value = s2
        // 解构赋值语法
        [firstName.value, lastName.value] = newValue.split('-')
    },
    get() {
        return firstName.value + '-' + lastName.value
    }
})

function changeFullName() {
    fullName.value = '李-四'
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