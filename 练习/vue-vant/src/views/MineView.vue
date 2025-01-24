<template>
    <TabBar />
    <div class="mine-box">
        <div class="mine-user" @click="clickUserName">
            <img class="user-image" :src="getAssetsImages('mine/icon_me_avatar.png')" alt="">
            <span class="user-name">{{ userName }}</span>
        </div>

        <div class="mine-loan-card">
            <div class="card-box">
                <div class="card-max">最高可借（元）</div>
                <div class="card-amount">{{ formatMoney(loan.loanHome.maxLoanMoney) }}</div>
                <div class="card-rate">年利率{{ loan.loanHome.minYearRate }}%起 ｜ 最长{{ loan.loanHome.maxLoanTerm }}年
                    ｜ 银行放款</div>
            </div>
            <van-button round text="去申请"></van-button>
        </div>

        <ul class="mine-list">
            <SettingList :list="settingList" />
        </ul>
    </div>
    <Login :show="state.showLogin" :close="closeLogin" v-if="!user.isLogin" />
</template>

<script setup lang="ts" name="mine">
import { formatMoney, getAssetsImages } from '@/common/ts/utils';
import SettingList from '@/components/SettingList.vue';
import TabBar from '@/components/TabBar.vue';
import { useUserStore } from '@/stores/useUser';
import type { User, SettingItem } from '@/types/User';
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Login from './Login.vue';
import { useLoanStore } from '@/stores/useLoan';

const router = useRouter()
const state = reactive({
    showLogin: false
})
const user = useUserStore()
const loan = useLoanStore()

const userName = computed(() => {
    return user.user?.userPhone || '登录/注册'
})
const settingList = computed(() => {
    let list = Array<SettingItem>()
    if (user.isLogin) {
        list = list.concat({
            icon: 'icon_me_order.png',
            title: '订单管理',
            action: orderManager
        })
    }
    list = list.concat({
        icon: 'icon_me_setting.png',
        title: '设置',
        action: setting
    })
    return list
})

onMounted(() => {
    user.readUser()
})

const setting = () => {
    router.push('/setting')
}

const orderManager = () => {

}

function clickUserName() {
    if (user.isLogin) return
    state.showLogin = true
}

function closeLogin() {
    state.showLogin = false
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.mine-box {
    margin-top: 20px;
    .mine-user {
        padding: 20px 15px;
        .flex(left);

        .user-image {
            width: 60px;
            height: 60px;
        }

        .user-name {
            font-size: 27px;
            font-weight: 500;
            margin-left: 15px;
        }
    }

    .mine-loan-card {
        background: @primary;
        margin: 15px;
        padding: 15px;
        .borderRadius(15px);
        .flex();
        color: white;

        .card-max {
            font-weight: 500;
            font-size: 14px;
        }

        .card-amount {
            padding: 5px 0;
            font-size: 28px;
            font-weight: 500;
        }

        .card-rate {
            font-size: 11px;
        }

        .van-button {
            color: @primary;
            font-size: 16px;
            font-weight: 500;
            height: 35px;
        }
    }

    .mine-list {
        margin: 15px;
        .borderRadius(15px);
        overflow: hidden;
    }
}
</style>