<template>
    <div class="setting-body">
        <simple-header name="账号管理" />
        <div class="input-item">
            <van-field v-model="state.nickName" label="昵称"></van-field>
            <van-field v-model="state.introduceSign" label="个性签名"></van-field>
            <van-field v-model="state.password" type="password" label="修改密码"></van-field>
        </div>

        <van-button class="save-btn" block @click="save" type="primary">保存</van-button>
        <van-button class="save-btn" block @click="hadnleLogout" type="primary">退出登录</van-button>
    </div>
</template>

<script setup lang="ts" name="setting">
import { setLocal } from '@/common/ts/utils';
import SimpleHeader from '@/components/SimpleHeader.vue';
import { editUserInfo, getUserInfo, logout } from '@/service/user';
import { Md5 } from 'ts-md5';
import { showConfirmDialog, showSuccessToast } from 'vant';
import { onMounted, reactive } from 'vue';

const state = reactive({
    nickName: '',
    introduceSign: '',
    password: ''
})

onMounted(async () => {
    const { data: userInfo } = await getUserInfo()
    state.nickName = userInfo.nickName
    state.introduceSign = userInfo.introduceSign
})

async function save() {
    const param = {
        introduceSign: state.introduceSign,
        nickName: state.nickName,
        passwordMd5: ''
    }
    if (state.password) {
        param.passwordMd5 = Md5.hashStr(state.password)
    }

    await editUserInfo(param)
    showSuccessToast('保存成功')
}

async function hadnleLogout() {

    showConfirmDialog({
        title: '提示',
        message: '确认退出登录吗',
        width: '80%'
    }).then(() => {
        logout().then(({resultCode})=>{
            if (resultCode == 200) {
            setLocal('token', '')
            window.location.href = '/home'
        }
        })
    }).catch(() => { })
}

</script>

<style scoped lang="less">
.setting-body {
    .save-btn {
        width: 80%;
        margin: 20px auto;
    }

    .save-btn:first-child {
        margin-top: 50px;
    }
}
</style>