<template>
    <NavBar title="有信车抵贷" />

    <div class="handle-body">
        <div class="check-box" @click="readProtocol">
            <van-icon name="checked" style="color: #366DED;" v-if="state.checked" />
            <van-icon name="circle" v-else />
            <span style="margin-left: 5px;">我已阅读并同意</span>
            <span style="color: #366DED">《授权协议》</span>
        </div>

        <van-button round text="立即申请" type="primary" @click="onSubmit" block></van-button>
    </div>
    <div class="apply-box margin-nav-height">
        <img :src="getAssetsImages('home/home_apply_head.png')" alt="" class="apply-back">
        <van-form @submit="onSubmit">

            <van-field v-model="state.name" label="姓名" placeholder="请输入姓名" input-align="right" maxlength="10"
                id="realName"></van-field>

            <van-field v-model="state.phone" label="手机号码" placeholder="请输入手机号" input-align="right" maxlength="11"
                id="phone" inputmode="tel"></van-field>

            <van-field v-model="state.idCard" label="身份证号" placeholder="请输入身份证号" input-align="right" id="idCard"
                clickable @touchstart.stop="state.idCardKeyboardShow = true"></van-field>

            <van-field v-model="state.city" id="city" label="所在城市" placeholder="请选择城市" input-align="right" is-link
                clickable @click="getLocationCity">
            
                <!-- <template #input>
                    <van-button :text="state.city" ></van-button>
                </template> -->
            </van-field>

            <van-field v-model="state.carNum" id="carNo" label="车牌号码" placeholder="请输入车牌号码" input-align="right"
                maxlength="8" is-link></van-field>

            <van-field v-model="state.VIN" id="vin" label="车架号" placeholder="请输入车架号" input-align="right"
                maxlength="18"></van-field>

            <van-field id="carMortgageStatus" v-model="carPledgeState" label="车辆状态" input-align="right">
                <template #input>

                    <van-button :class="state.carPledge ? 'car-button-selected' : 'car-button-unselected'" size="small"
                        @click="state.carPledge = true">抵押中</van-button>
                    <van-button :class="state.carPledge ? 'car-button-unselected' : 'car-button-selected'"
                        class="car-pledge-last" size="small" @click="state.carPledge = false">未抵押</van-button>
                </template>
            </van-field>

        </van-form>
    </div>
    <van-number-keyboard v-model="state.idCard" :show="state.idCardKeyboardShow" :maxlength="18" extra-key="X"
        close-button-text="完成" @blur="state.idCardKeyboardShow = false" />
</template>

<script setup lang="ts" name="loanApply">
import { getAssetsImages } from '@/common/ts/utils';
import NavBar from '@/components/NavBar.vue';
import { useUserStore } from '@/stores/useUser';
import { computed, onMounted, reactive, type Reactive } from 'vue';

const user = useUserStore()

const state = reactive({
    name: '',
    phone: user.user?.userPhone || '',
    idCard: '',
    city: '',
    carNum: '',
    VIN: '',
    carPledge: false,
    checked: false,
    idCardKeyboardShow: false
})

const carPledgeState = computed(()=>{
    return state.carPledge ? '1' : '0'
})

onMounted(() => {
    getLocationCity()
})

function onSubmit() {

}

function readProtocol() {

}

function getLocationCity() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
        }, (error) => {
            console.log(error);
        })
    }
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.apply-box {
    .apply-back {
        width: 100%;
    }

    .car-pledge-last {
        margin-left: 15px;
    }

    .car-button-unselected {
        background: @bc;
        color: #666;
    }

    .car-button-selected {
        background: @primary;
        color: white;
    }
}

/deep/ .van-cell__right-icon {
    line-height: var(--van-cell-line-height);
}

.handle-body {
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    width: 100%;
    padding: 20px;
    padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
    .flex();
    flex-direction: column;
    .boxSizing();

    .check-box {
        color: #666;
        font-size: 18px;
        .flex();

        span {
            color: #666;
            font-size: 13px;
        }
    }

    .van-button {
        margin-top: 20px;
    }
}
</style>