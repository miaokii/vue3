<template>
    <div class="login-body">
        <div class="left-form">

            <div class="remit-title">Remit</div>
            <div class="form-container">
                <div>
                    <div class="form-welcome">Welcome!</div>
                    <div class="form-welcome-msg">Sign in by entering the information below</div>
                </div>
                <div class="input-form">
                    <div class="input-field">
                        <div class="field-label">Email Adress</div>
                        <input type="text" placeholder="账户名" v-model="state.account" required>
                    </div>
                    <div class="input-field">
                        <div class="field-label">Password</div>
                        <input type="password" placeholder="密码" v-model="state.password" required>
                    </div>
                    <div class="rember-box">
                        <label for="">
                            <input type="radio">
                            Remember Me
                        </label>
                        <div>Forget Password</div>
                    </div>
                    <button :class="['button-continue', loginDisable ? 'button-disable' : '']" @click="loginAction"
                        :disabled="loginDisable">Continue</button>
                </div>
                <div class="create-account">Don't have an account? Create one here</div>
            </div>
        </div>
        <img class="right-image" :src="utils.getImage('image.png')" alt="">
    </div>
</template>

<script setup lang="ts" name="login">
import { setLocal } from '@/common/ts/utils';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const state = reactive({
    account: '',
    password: '',
})

const loginDisable = computed(() => {
    return state.account.length < 5 || state.password.length < 5
})

function loginAction() {
    setLocal('token', state.account)
    window.location.href = '/'
}

</script>

<style scoped lang="less">
.login-body {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
}

.left-form {
    width: 50%;
    height: 100%;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .remit-title {
        color: #ec536a;
        font-weight: 800;
        font-size: 2rem;
        padding: 2rem 0;
        position: absolute;
        width: 100%;
        top: 0;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
    }

    .form-welcome {
        font-weight: 600;
        font-size: 1.2rem;
    }

    .form-welcome-msg {
        color: gray;
        padding-bottom: 2rem;
    }

    .input-form {
        width: 100%;

        .input-field {
            border: lightgray 1px solid;
            border-radius: 3px;
            text-align: left;
            padding: 3px 10px;
            margin: 15px 0;

            .field-label {
                color: gray;
                font-size: 0.7rem;
            }

            input {
                width: 100%;
            }
        }
    }

    .rember-box {
        display: flex;
        justify-content: space-between;
        color: gray;
        font-size: 0.8rem;
    }

    .button-continue {
        width: 100%;
        background: #366DED;
        border: none;
        color: white;
        padding: 10px 0;
        border-radius: 3px;
        margin-top: 20px;
    }

    .button-disable {
        background: #68a2ed;
    }

    .create-account {
        color: gray;
        padding-top: 2rem;
        font-size: 0.8rem;
    }
}

.right-image {
    width: 50%;
    height: 100%;
    object-fit: cover;
}
</style>