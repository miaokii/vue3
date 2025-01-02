<template>
    <div class="login">
        <simple-header :name="type_login ? '登录' : '注册'" :back="'/home'" />
        <img src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" alt="" class="logo">
        <div class="login-body">
            <van-form @submit="onSubmit">
                <van-field v-model="state.username" label="用户名" placeholder="请输入用户名"
                    :rules="[{ required: true, message: '请输入用户名' }]" />
                <van-field v-model="state.password" label="密码" placeholder="请输入密码" type="password"
                    :rules="[{ required: true, message: '请输入密码' }]" />
                <van-field v-model="state.verify" label="验证码" placeholder="请输入验证码"
                    :rules="[{ required: true, message: '请输入验证码' }]" />

                <template #button>
                    
                </template>
            </van-form>
        </div>
    </div>
</template>

<script setup lang="ts" name="login">
import SimpleHeader from '@/components/SimpleHeader.vue';
import { reactive, ref } from 'vue';

const state = reactive({
    username: '',
    password: '',
    username1: '',
    password1: '',
    imgCode: '',
    verify: '',
})

// 是否是登录
const type_login = ref(true)

function onSubmit() {

}

</script>

<style scoped></style>