<template>
    <div class="father">
        <h3>父组件</h3>

        <h4>用户名：{{ userName }}</h4>
        <h4>密码：{{ passWord }}</h4>
        <!-- v-model用在html标签上 -->
        <!-- <input type="text" v-model="userName"> -->
        <!-- 等价于 -->
        <!-- <input type="text" :value="userName" @input="userName=(<HTMLInputElement>$event.target).value"> -->

        <!-- v-model用在组件标签上 -->
        <CusInput v-model="userName"></CusInput>
        <!-- 等价于 -->
        <!-- <CusInput :modelValue="userName" @update:modelValue="userName = $event"></CusInput> -->

        <br>
        <Input v-model:mingzi="userName" v-model:mima="passWord"></Input>
    </div>
</template>

<script lang="ts" setup name="Father">
import { ref } from 'vue';
import CusInput from './CusInput.vue';
import Input from './Input.vue';

let userName = ref('章三')
let passWord = ref('')
</script>

<style scoped>
.father {
    background-color: lightgray;
    padding: 20px;
    border-radius: 10px;
}
</style>