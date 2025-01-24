<template>
    <div class="cart-box">
        <simple-header name="购物车" noback="true" />
        <div class="cart-body">
            <van-checkbox-group @click="groupChange" v-model="state.result" ref="checkboxGroup">
                <van-swipe-cell :right-width="50" v-for="(item, idx) in state.list" :key="idx">
                    <div class="good-item">
                        <van-checkbox :name="item.cartItemId" />
                        <div class="good-img"><img :src="prefix(item.goodsCoverImg)" alt=""></div>
                        <div class="good-desc">
                            <div class="good-title">
                                <span>{{ item.goodsName }}</span>
                                <span>x{{ item.goodsCount }}</span>
                            </div>
                            <div class="good-btn">
                                <div class="price">¥{{ item.sellingPrice }}</div>
                                <van-stepper integer disable-input :min="1" :max="5" :model-value="item.goodsCount"
                                    :name="item.cartItemId" async-change @change="onChange"></van-stepper>
                            </div>
                        </div>
                    </div>
                    <!-- 删除模板 -->
                    <template #right>
                        <van-button square icon="delete" type="danger" class="delete-button"
                            @click="deleteGood(item.cartItemId)"></van-button>
                    </template>
                </van-swipe-cell>
            </van-checkbox-group>
        </div>
        <van-submit-bar v-if="state.list.length > 0" class="submit-all van-hairline--top" :price="total * 100"
            button-text="结算" button-type="primary" @submit="onSubmit">
            <van-checkbox @click="allCheck" v-model:checked="state.checkAll">全选</van-checkbox>
        </van-submit-bar>

        <div class="empty" v-if="!state.list.length">
            <img src="https://s.yezgea02.com/1604028375097/empty-car.png" alt="空购物车" class="empty-cart">
            <div class="title">购物车空空如也</div>
            <van-button round color="#1baeae" type="primary" @click="gotoBuy" block>前往选购</van-button>
        </div>
        <nav-bar />
    </div>
</template>

<script setup lang="ts" name="cart">
import { prefix } from '@/common/ts/utils';
import NavBar from '@/components/Tabbar.vue';
import SimpleHeader from '@/components/NavBar.vue';
import type { CartGoods } from '@/interfaces/Home';
import { deleteCart, getCart, modifyCart } from '@/service/cart';
import { closeToast, showFailToast, showLoadingToast } from 'vant';
import { computed, onActivated, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart'
defineOptions({
  name: 'cart'
})
const router = useRouter()
const route = useRoute()
const cart = useCartStore()
const state = reactive({
    checked: false,
    // 购物车
    list: [] as CartGoods[],
    all: false,
    // 选中结算的商品id集合
    result: [] as string[],
    // 商品map
    goods: {} as Record<string, CartGoods>,
    checkAll: true
})

// 选中商品结算金额
const total = computed(() => {
    let sum = 0
    state.result.forEach(item => {
        let good = state.goods[item]
        sum += good.sellingPrice * good.goodsCount
    });
    return sum
})

// 去选购商品
function gotoBuy() {
    router.push('/home')
}

// 返回上一页面
function toBack() {
    router.go(-1)
}

onActivated(() => {
    requestCart()
})

async function requestCart() {
    showLoadingToast({ message: '加载中', forbidClick: true })
    const result = await getCart({ pageNumber: 1 })
    state.list = result.data
    state.result = result.data.map(item => item.cartItemId)
    result.data.forEach(item => { state.goods[item.cartItemId] = item })
    closeToast()
}

function groupChange() {
    state.checkAll = state.result.length == state.list.length
}

function allCheck() {
    if (state.checkAll) {
        state.result = []
    } else {
        state.result = state.list.map(item => item.cartItemId)
    }
    groupChange()
}

function onSubmit() {
    if (state.result.length == 0) {
        return showFailToast('请选择结算商品')
    }
    let cartItemIds = JSON.stringify(state.result)
    router.push({ path: '/create-order', query: { cartItemIds: cartItemIds } })
}

/// 更改购物车商品数量
const onChange = async (value: number, detail: { name: string }) => {
    if (value > 5) {
        return showFailToast('超出单品最大购买数量')
    }
    if (value < 1) {
        return showFailToast('商品数量不得小于1')
    }
    let cartGood = state.goods[detail.name]
    if (cartGood.goodsCount == value) return

    showLoadingToast({ message: '修改中', forbidClick: true })
    let result = await modifyCart({
        cartItemId: detail.name,
        goodsCount: value
    })
    cartGood.goodsCount = value
    closeToast()
}

/// 删除商品
async function deleteGood(id: string) {
    await deleteCart(id)
    cart.updateCart()
    requestCart()
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.cart-box {
    .cart-body {
        margin: 10px;
        margin-bottom: calc(var(--van-submit-bar-height) + var(--van-tabbar-height));

        .good-item {
            display: flex;
            padding: 5px;

            .good-img img {
                width: 100px;
                height: 100px;
                margin-left: 10px;
            }

            .good-desc {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                // 扩充剩余空间
                flex: 1;
                padding: 10px;
                height: 100px;

                .good-title {
                    display: flex;
                    justify-content: space-between;

                    &:first-child {
                        font-size: 14px;
                        line-height: 18px;
                    }
                }

                .good-btn {
                    display: flex;
                    justify-content: space-between;

                    .price {
                        color: red;
                        font-size: 16px;
                    }
                }
            }
        }

        .delete-button {
            width: 50px;
            height: 100%;
        }
    }

    .submit-all {
        position: fixed;
        left: 0;
        bottom: var(--van-tabbar-height);
    }

    .empty {
        width: 50%;
        margin: 0 auto;
        text-align: center;
        margin-top: 200px;

        .empty-cart {
            width: 150px;
            margin-bottom: 20px;
        }

        .title {
            font-size: 16px;
            margin-bottom: 20px;
        }
    }

    .van-checkbox__icon--checked .van-icon {
        background-color: @primary;
        border-color: @primary;
    }
}
</style>