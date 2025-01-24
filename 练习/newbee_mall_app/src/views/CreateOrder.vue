<template>
    <div class="create-order">
        <simple-header name="生成订单" @callback="deleteLocal" />
        <!-- 地址栏 -->
        <div class="address-wrap" @click="chooseAddress">
            <span class="name">{{ state.address.userName }} {{ state.address.userPhone }}</span>
            <div class="address">
                {{ state.address.provinceName }} {{ state.address.cityName }} {{ state.address.regionName }} {{
                    state.address.detailAddress }}
            </div>
            <van-icon name="arrow" class="icon20 arrow" />
        </div>
        <!-- 商品列表 -->
        <div class="goods-list">
            <div class="goods-item" v-for="item in state.cartList" :key="item.cartItemId">
                <img :src="prefix(item.goodsCoverImg)" alt="">
                <div class="goods-desc">
                    <div class="goods-title">
                        <span>{{ item.goodsName }}</span>
                        <span>x{{ item.goodsCount }}</span>
                    </div>
                    <div class="goods-price">
                        ¥{{ item.sellingPrice }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算栏 -->
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>¥{{ total }}</span>
            </div>
            <van-button @click="handleCreateOrder" class="pay-btn" type="primary" block>生成订单</van-button>
        </div>

        <!-- 支付方式 -->
         <van-popup v-model:show="state.showPay" position="bottom" round destroy-on-close safe-area-inset-bottom closeable> 
            <div class="choose-pay">
                <van-button class="alipay" block @click="handlePay(1)" color="#1989fa">支付宝支付</van-button>
                <van-button block @click="handlePay(2)" color="#4fc08d">微信支付</van-button>
            </div>
         </van-popup>
        
    </div>
</template>

<script setup lang="ts" name="createOrder">
import { prefix } from '@/common/ts/utils';
import SimpleHeader from '@/components/NavBar.vue';
import type { CartGoods } from '@/interfaces/Home';
import type { UserAddress } from '@/interfaces/User';
import { getByCartItemIds } from '@/service/cart';
import { createOrder, payOrder } from '@/service/order';
import { addressDetail, getDefaultAddress } from '@/service/user';
import { closeToast, showLoadingToast, showSuccessToast } from 'vant';
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const state = reactive({
    // 选中的购物车商品列表
    cartList: [] as CartGoods[],
    // 地址信息
    address: {} as UserAddress,
    // 支付
    showPay: false,
    // 订单号
    orderNo: '',
    // 购物车商品ids
    cartItemIds: [] as string[]
})

const total = computed(() => {
    let sum = 0
    state.cartList.forEach(item => {
        sum += item.sellingPrice * item.goodsCount
    })
    return sum
})

onMounted(() => {
    init()
})

async function init() {
    showLoadingToast({ message: '加载中', forbidClick: true })

    const { addressId, cartItemIds } = route.query
    console.log(addressId, cartItemIds);

    let ids = JSON.parse(cartItemIds as string) as [string]

    const { data: cartList } = await getByCartItemIds(ids.join(','))
    const { data: address } = addressId ? await addressDetail(addressId as string) : await getDefaultAddress()
    if (!address) {
        return router.push({ path: '/address' })
    }

    state.address = address
    state.cartList = cartList

    closeToast()
}

function chooseAddress() {
    const { cartItemIds } = route.query
    router.push({ path: '/address', query: { cartItemIds, from: 'create-order' } })
}

function deleteLocal() {

}

async function handleCreateOrder() {
    const param = {
        addressId: state.address.addressId,
        cartItemIds: state.cartList.map(item => item.cartItemId)
    }
    const {data: orderNo} = await createOrder(param)
    state.orderNo = orderNo
    state.showPay = true
}

// 支付方式 2微信， 1支付宝
async function handlePay(type: number) {
    state.showPay = false
    await payOrder({orderNo: state.orderNo, payType: type})
    showSuccessToast('支付成功')
    setTimeout(() => {
        router.push('/order')
    }, 2000);
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.create-order {
    background: #fff;
    position: relative;

    .address-wrap {
        padding: 20px;
        background: #f9f9f9;
        font-size: 15px;
        color: #222333;
        position: fixed;
        left: 0;
        width: 100%;
        top: 50px;

        .address {
            margin-top: 15px;
        }

        .arrow {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }

        &::before {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 2px;
            background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
            background-size: 80px;
            content: '';
        }
    }

    .goods-list {
        padding: 115px 15px 125px 15px;

        .goods-item {
            display: flex;
            align-items: center;
            padding: 10px 0;

            img {
                width: 30%;
            }

            .goods-desc {
                width: 70%;
                font-size: 13px;
                font-weight: 300;
                color: #222333;
                display: flex;
                flex-direction: column;

                .goods-title {
                    display: flex;
                    justify-content: space-between;

                    span:last-child {
                        margin-left: 10px;
                    }
                }

                .goods-price {
                    color: @primary;
                    margin-top: 10px;
                }
            }
        }
    }


    .pay-wrap {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 20px;
        padding-bottom: 20px;
        border-top: 1px solid #e9e9e9;
        background: white;

        >div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 15px 0;
            font-size: 15px;

            span:last-child {
                color: red;
                font-size: 18px;
            }
        }
    }

    .choose-pay {
        margin: 50px 20px;

        .alipay {
            margin-bottom: 20px;
        }
    }
}
</style>