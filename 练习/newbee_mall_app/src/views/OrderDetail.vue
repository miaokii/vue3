<template>
    <div class="class">
        <simple-header name="订单详情" />
        <!-- 订单状态 -->
        <div class="order-status">
            <div>
                <label for="">订单状态：</label>
                <span>{{ state.order.orderStatusString }}</span>
            </div>
            <div>
                <label for="">订单编号：</label>
                <span>{{ state.order.orderNo }}</span>
            </div>
            <div>
                <label for="">下单时间：</label>
                <span>{{ state.order.createTime }}</span>
            </div>

            <div class="order-handle-wrap">
                <van-button type='primary' color="#1ea09e" block v-if="showPay"
                    @click="state.showPay = true">去支付</van-button>
                <van-button type='primary' color="#1ea09e" block v-if="confirmOrder"
                    @click="handleConfirmOrder">确认收货</van-button>
                <van-button v-if="showCancel" plain block style="border: 1px solid lightgray;"
                    @click="cancelOrder">取消订单</van-button>
            </div>
        </div>

        <div class="divide"></div>
        <div class="order-price-wrap">
            <div>
                <label for="">商品金额：</label>
                <span>{{ state.order.totalPrice }}</span>
            </div>
            <div>
                <label for="">配送方式：</label>
                <span> 普通快递 </span>
            </div>
        </div>
        <div class="divide"></div>
        <div class="order-goods" style="padding-top: 10px;">
            <van-card v-for="goods in state.order.newBeeMallOrderItemVOS" :key="goods.goodsId"
                style="background: white;" :num="goods.goodsCount" :price="goods.sellingPrice" :title="goods.goodsName"
                :thumb="prefix(goods.goodsCoverImg)" desc="全场包邮"></van-card>
        </div>

        <van-popup v-model:show="state.showPay" position="bottom" round destroy-on-close safe-area-inset-bottom
            closeable>
            <div class="choose-pay">
                <van-button class="alipay" block @click="handlePay(1)" color="#1989fa">支付宝支付</van-button>
                <van-button block @click="handlePay(2)" color="#4fc08d">微信支付</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script setup lang="ts" name="OrderDetail">
import { prefix } from '@/common/ts/utils';
import SimpleHeader from '@/components/NavBar.vue';
import type { OrderItem } from '@/interfaces/Order';
import { order, orderCancel, orderConfirm, orderDetail, payOrder } from '@/service/order';
import { closeToast, showConfirmDialog, showLoadingToast, showSuccessToast } from 'vant';
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const state = reactive({
    order: {} as OrderItem,
    orderNo: route.query.orderNo as string,
    showPay: false
})

const showPay = computed(() => {
    return state.order.orderStatus == 0 && state.order.orderNo
})

const showCancel = computed(() => {
    return !(state.order.orderStatus < 0 || state.order.orderStatus == 4) && state.order.orderNo
})

const confirmOrder = computed(() => {
    return state.order.orderStatus == 3 && state.order.orderNo
})

onMounted(() => {
    requestOrderDetail()
})

async function requestOrderDetail() {
    showLoadingToast({message:'加载中', forbidClick: true})
    const { data: order } = await orderDetail(state.orderNo)
    closeToast()
    state.order = order
}

function cancelOrder() {
    showConfirmDialog({
        title: '提示',
        message: '确认取消订单',
        width: '80%'
    }).then(()=>{
        orderCancel(state.orderNo).then((res)=>{
            if (res.resultCode == 200) {
                showSuccessToast('删除成功')
                requestOrderDetail()
            }
        })
    }).catch(()=>{})
}

function handleConfirmOrder() {
    showConfirmDialog({
        title: '提示',
        message: '是否确定订单'
    }).then(()=>{
        orderConfirm(state.orderNo).then((res)=>{
            if (res.resultCode == 200) {
                showSuccessToast('确认成功')
                requestOrderDetail()
            }
        })
    }).catch(()=>{})
}

// 支付方式 2微信， 1支付宝
async function handlePay(type: number) {
    state.showPay = false
    await payOrder({ orderNo: state.orderNo, payType: type })
    showSuccessToast('支付成功')
    requestOrderDetail()
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.order-status,
.order-price-wrap {
    padding: 20px;
    font-size: 15px;

    div {
        margin: 10px 0;
    }

    label {
        color: #777;
    }

    span {
        color: #333;
    }

    .van-button {
        margin: 10px 0;
    }
}

.divide {
    height: 20px;
    background: #f5f6f9;
}
</style>