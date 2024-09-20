<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
    </div>
</template>


<script lang="ts">
export default {
    name: 'Person',
    // // 数据，选项式
    // data和setup可以同时存在，data中能读到setup中的数据，setup早于data
    // data() {
    //     return {
    //         name: 'lucy',
    //         age: 18,
    //         tel: '18800000000'
    //     }
    // },
    // // 方法 选项式
    // methods: {
    //     showTel() {
    //         alert(this.tel)
    //     },

    //     changeName() {
    //         this.name = '张小城'
    //     },

    //     changeAge() {
    //         this.age += 1
    //     }
    // },

    // setup中不能读取data的数据与方法
    setup() {
        
        // 数据
        let name = '章三'
        let age = 18
        let tel = '18099990000'

        // 非响应式，改变时模板中的元素值不变
        function changeName() {
            // setup函数中this是未定义的，不可用
            // this.name = '藏三'
            name = '张三'
            console.log(name)
        }

        function changeAge() {
            age += 1
            console.log(age)
        }

        function showTel() {
            alert(tel)
        }

        // 将方法、属性等返回，模板才能使用
        return { name, age, changeName, changeAge, showTel }

    }
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