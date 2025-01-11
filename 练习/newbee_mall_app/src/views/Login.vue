<template>
    <div class="login">
        <simple-header :name="type_login ? '登录' : '注册'" :back="'/home'" />
        <img src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" alt="" class="logo">
        <div class="login-body">
            <van-form @submit="onSubmit">
                <van-field v-model="state.username" name="username" label="用户名" placeholder="请输入用户名"
                    :rules="[{ required: true, message: '请输入用户名' }]" />
                <van-field v-model="state.password" name="password" label="密码" placeholder="请输入密码" type="password"
                    :rules="[{ required: true, message: '请输入密码' }]" />
                <van-field v-model="state.verify" label="验证码" placeholder="请输入验证码" center clearable
                    :rules="[{ required: true, message: '请输入验证码' }]">
                    <template #button>
                        <ImageVerify ref="verifyRef" />
                    </template>
                </van-field>
                <div style="margin: 16px;">
                    <div class="link-switch" @click="toggleLogin">{{ type_login ? '没有账号，去注册' : '已有账号，去登录' }}</div>
                    <van-button round block color="#1baeae" native-type="submit">{{ type_login ? '登录' : '注册'
                        }}</van-button>
                </div>

            </van-form>
        </div>
    </div>
</template>

<script setup lang="ts" name="login">
import SimpleHeader from '@/components/SimpleHeader.vue';
import { reactive, ref } from 'vue';
import { showSuccessToast, showFailToast } from 'vant'
import ImageVerify from '@/components/ImageVerify.vue';
import { Md5 } from 'ts-md5';
import { login, register } from '@/service/user';
import { setLocal } from '@/common/ts/utils';

const verifyRef = ref()
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
 
async function onSubmit() {
    state.imgCode = verifyRef.value.state.imgCode || ''
    if (state.verify.toLowerCase() != state.imgCode.toLocaleLowerCase()) {
        showFailToast('验证码错误')
        return
    }

    // 登录
    if (type_login.value) {
        // data就是token字符串
        const data = await login({
            'loginName': state.username,
            'passwordMd5': Md5.hashStr(state.password)
        })
        // 保存token
        setLocal('token', data)
        window.location.href = '/'
    } 
    // 注册
    else {
        const data = await register({
            'loginName': state.username,
            'password': state.password
        })
        showSuccessToast('注册成功')
        toggleLogin()
    }
}

function toggleLogin() {
    type_login.value = !type_login.value
    state.verify = ''
}

</script>

<style scoped lang="less">
@import '@/common/style/mixin.less';

.login {
    .logo {
        height: 120px;
        display: block;
        margin: 80px auto 20px;
    }

    .login-body {
        padding: 0 20px;
    }

    .link-switch {
        font-size: 14px;
        margin-bottom: 20px;
        color: @primary;
    }
}

</style>
