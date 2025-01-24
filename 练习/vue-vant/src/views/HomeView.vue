<template>
    <TabBar />
    <div class="home-box">
        <div class="home-back"></div>
        <div class="home-body">
            <div class="home-logo-text">
                <img :src="getAssetsImages('/home/home_logo_text.png')" alt="">
                <span>有车即可申请</span>
            </div>

            <LoanView :wait-apply="loanCache" :loan-product="loan.loanHome" v-if="loanCache" :apply="loanApply" />
            <LoanCacheView v-else />

            <img class="home-banner" :src="getAssetsImages('home/home_banner.png')" alt="">
            <div class="home-condiction">
                <div class="condiction-title">申请条件</div>
                <div class="condiction-item" v-for="(item, idx) in appConfig.loanApplyCondiction" :key="idx">{{ item }}
                </div>
            </div>
        </div>
    </div>
    <Login :show="state.showLogin" :close="closeLogin" v-if="!user.isLogin" :login-block="loanApply" />

</template>

<script setup lang="ts" name="home">
import TabBar from '@/components/TabBar.vue';
import { getAssetsImages } from '@/common/ts/utils';
import { computed, onMounted, reactive } from 'vue';
import { type LoanProduct, type LoanCache, OrderState } from '@/types/LoanProduct';
import LoanView from './Home/LoanView.vue';
import LoanCacheView from './Home/LoanCacheView.vue';
import { appConfig } from '@/common/ts/config';
import { useLoanStore } from '@/stores/useLoan';
import router from '@/router';
import Login from './Login.vue';
import { useUserStore } from '@/stores/useUser';

const loan = useLoanStore()
const user = useUserStore()

const state = reactive({
    showLogin: false
})

// 申请过产品
const loanCache = computed(() => {
    return loan.cacheLoan?.orderState != OrderState.waitApply
})

onMounted(() => {
    requestCarLoan()
})

async function requestCarLoan() {
    loan.getLoan()
}

function loanApply() {
    if (user.isLogin) {
        router.push('/apply')
    } else {
        state.showLogin = true
    }
}

function closeLogin() {
    state.showLogin = false
}

</script>

<style scoped lang="less">
.home-back {
    background-image: url('/images/home/home_head.png');
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0;
    aspect-ratio: calc(75/61);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
}

.home-body {
    position: relative;
    z-index: 100;
    padding: 0 15px;
    padding-top: 20px;

    .home-logo-text {
        color: white;
        display: flex;
        align-items: end;

        img {
            width: 33%;
        }

        span {
            font-size: 13px;
            padding-left: 10px;
        }
    }

    .home-banner {
        width: 100%;
        margin-top: 15px;
    }

    .home-condiction {
        margin-top: 15px;
        padding: 15px;
        background: white;
        border-radius: 10px;
        color: #666666;

        .condiction-title {
            font-size: 16px;
            font-weight: 500;
            color: black;
            padding-bottom: 15px;
        }

        .condiction-item {
            font-size: 12px;
            padding-bottom: 5px;
        }

    }
}
</style>