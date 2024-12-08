<template>
    <div class="login-body">
        <div class="login-top">

            <h1>{{ $t('米聊') }}</h1>
            <div class="login-label">{{ $t('登录.登录提示') }}</div>

            <form action="">
                <input type="email" :placeholder="i18n.global.t('登录.邮箱')">
                <input type="password" :placeholder="$t('登录.密码')">
                <input type="submit" class="login-confirm" :value="$t('登录.登入')">
            </form>
        </div>

        <div class="login-bottom">

            <div>
                <button>{{ $t('登录.注册') }}</button>
                <button>{{ $t('登录.忘记密码') }}</button>
            </div>
            
            <div>
                <!-- <svg class="svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-earth"></use>
                </svg> -->
                <select class="login-select-langs" v-model="$i18n.locale">
                    <option v-for="local in $i18n.availableLocales" :key="'local-${local}'" :value="local">
                        {{ local }}
                    </option>
                </select>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts" name="login">
import i18n from '@/i18n';


function changeLocal() {
    i18n.global.locale.value = 'English'
}

</script>

<style scoped>
.login-body {
    border-radius: 10px;
    box-shadow: 0 0 10px lightgray;
    width: 450px;
    background-color: var(--color-background);
    text-align: center;

    overflow: hidden;
}

.login-top {
    padding: 2rem 1.5rem 0 1.5rem;
}

h1 {
    font-size: 1.7rem;
}

.login-label {
    margin-top: 5px;
    font-size: 14px;
    color: var(--vt-c-text-light-2);
}

form {
    margin: 10px 0;
}

form input {
    margin-bottom: 15px;
    padding: 0 10px;
    width: 100%;
    background-color: #e8f0fe;
    border: none;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    color: var(--color-text);
}

form input:focus {
    outline: none;
}

.login-confirm {
    background: #0665d0;
    color: white;
    font-size: 1rem;
}

.login-bottom {
    background-color: var(--color-background-mute);
    height: 60px;
    padding: 0 20px;
    display: flex;
    font-size: 15px;
    justify-content: space-between;
    align-items: center;
}

.login-bottom button {
    border: none;
    color: inherit;
    font-size: inherit;
    vertical-align: middle;
}

.login-select-langs {
    border: none;
    background-color: transparent;
    color: inherit;
    font-size: inherit;
}

.login-select-langs:focus {
    outline: none;
}

.svg-icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
    vertical-align: bottom;
    margin-right: 4px;
}
</style>