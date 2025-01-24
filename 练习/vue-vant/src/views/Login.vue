<template>
    <van-action-sheet :show="showLogin" @close="close">
        <div class="login-box">
            <div class="login-back"></div>
            <div class="login-content">
                <img :src="getAssetsImages('/home/login_logo_text.png')" alt="" class="login-logo-text">
                <div class="login-body">
                    <div>
                        <div class="input-group">
                            <van-field placeholder="请输入手机号" type="tel" maxlength="11" :formatter="phoneFomatter"
                                v-model="state.phone"></van-field>
                            <div class="divider"></div>
                            <van-field placeholder="请输入验证码" type="number" maxlength="6" v-model="state.code" center>
                                <template #button>
                                    <span class="input-get-code" :class="codeBtnEnable ? '':'input-get-code-disable'" @click="sendCode" size="mini">{{ codeBtnText }}</span>
                                </template>
                            </van-field>
                        </div>

                        <van-button class="login-button" text="立即登录" round type="primary" block :disabled="!loginBtnEnable"
                            @click="handleLogin"></van-button>
                    </div>

                    <van-checkbox class="login-check" v-model="state.checked" icon-size="17px">
                        <span>我已阅读并同意</span>
                        <span class="protocol" @click="pushProtocol(true, $event)">《用户注册服务协议》</span>
                        <span class="protocol" @click="pushProtocol(false, $event)">《隐私政策》</span>
                    </van-checkbox>
                </div>
            </div>
        </div>
    </van-action-sheet>
</template>

<script setup lang="ts" name="login">
import { getAssetsImages } from '@/common/ts/utils';
import { login, sendSMSCode } from '@/services/mine';
import { useUserStore } from '@/stores/useUser';
import { URLEnum } from '@/uils/APIEnum';
import { closeToast, showFailToast, showLoadingToast } from 'vant';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const { show, close, loginBlock } = defineProps<{ show: boolean, close: () => void, loginBlock?: () => void }>()
const router = useRouter()

const showLogin = computed(() => {
    return show
})
const loginBtnEnable = computed(() => {
    return state.phone.length == 11 && state.code.length == 6
})
const codeBtnEnable = computed(() => {
    return state.second == 60 && state.phone.length == 11
})
const codeBtnText = computed(() => {
    return state.second == 60 ? '获取验证码' : `${state.second}s`
})

const state = reactive({
    phone: '18084825752',
    code: '111111',
    checked: false,
    second: 60
})

const user = useUserStore()

function pushProtocol(user: boolean, event: Event) {
    let url: URLEnum = user ? URLEnum.userPrivacyPolicy : URLEnum.registerProtocol
    let title = user ? '用户注册服务协议' : '隐私政策'
    router.push({ path: '/protocol', query: { url, title } })
}

// 电话号码格式化
const phoneFomatter = (value: string) => {
    if (value.startsWith('1')) {
        return value
    }
    return ''
}

async function sendCode() {
    showLoadingToast('')
    await sendSMSCode(state.phone)
    closeToast()
    startCountdown()
}

function startCountdown() {
    const intervalId = setInterval(() => {
        state.second -= 1
        if (state.second == 0) {
            clearInterval(intervalId)
            state.second = 60
        }
    }, 1000);
}

async function handleLogin() {
    if (!state.checked) {
        return showFailToast('请阅读并同意相关协议')
    }
    user.loginUser(state.phone, state.code).then(()=>{
        if (user.isLogin) {
            close()
            if (loginBlock) {
                loginBlock()
            }
        }
    })
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.login-box {

    .login-back {
        background-image: url('/images/home/home_head.png');
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 0;
        aspect-ratio: calc(75/61);
        position: fixed;
        z-index: 0;
    }

    .login-content {
        z-index: 1;
        position: relative;

        .login-logo-text {
            width: 60%;
            padding: 20px;
            padding-top: 70px;
        }
    }

    .login-body {

        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background: white;
        height: 50vh;
        .flex();
        flex-direction: column;

        .input-group {
            padding: 35px 20px;

            .divider {
                height: 20px;
                padding-left: 20px;
            }

            .van-field {
                background: #f5f6f9;
                height: 50px;
                border-radius: 25px;
                font-size: 17px;
                padding: 0 25px;
                line-height: 50px;
            }

            .input-get-code {
                color: @primary;
                font-size: 14px;
                background: #f5f6f9;
                width: 80px;
                display: inline-block;
                text-align: center;
                padding-left: 25px;
            }

            .input-get-code-disable {
                pointer-events: none;
                color: #8094c5;
            }
        }

        .login-button {
            width: calc(100% - 40px);
            margin: 0 auto;
        }
    }

    .login-check {
        margin-bottom: 15px;
        font-size: 13px;

        .protocol {
            color: @primary;
        }
    }
}
</style>