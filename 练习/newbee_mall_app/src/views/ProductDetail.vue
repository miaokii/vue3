<template>
    <div class="product-detail">
        <simple-header name="商品详情" />
        <div class="detail-content">
            <div class="detail-swipe-wrap">
                <van-swipe class="my-swipe" indicator-color="#1baeae">
                    <van-swipe-item class="my-swipe-item" v-for="(item, idx) in state.detail.goodsCarouselList"
                        :key="idx">
                        <img :src="item" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="product-info">
                <div class="product-title">{{ state.detail.goodsName }}</div>
                <div class="product-desc">免邮费 顺丰快递</div>
                <div class="product-price">
                    <span>¥{{ state.detail.sellingPrice }}</span>
                    <span>¥{{ state.detail.originalPrice }}</span>
                </div>
            </div>

            <div class="product-intro">
                <ul>
                    <li>概述</li>
                    <li>参数</li>
                    <li>安装服务</li>
                    <li>常见问题</li>
                </ul>
                <div class="product-content" v-html="state.detail.goodsDetailContent"></div>
            </div>
        </div>

        <van-action-bar>
            <van-action-bar-icon class="action-icon" icon="chat-o" text="客服" />
            <van-action-bar-icon class="action-icon" icon="cart-o" :badge="!cart.count ? '' : cart.count"
                @click="gotoCart" text="购物车" />
            <van-action-bar-button type="warning" @click="addToCart" text="加入购物车" />
            <van-action-bar-button type="danger" @click="buyNow" text="立即购买" />
        </van-action-bar>
    </div>
</template>

<script setup lang="ts" name="ProductDetail">
import SimpleHeader from '@/components/SimpleHeader.vue';
import { goodDetail } from '@/service/goods';
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type GoodsDetail } from '@/interfaces/Home';
import { useCartStore } from '@/stores/cart'
import { addCart } from '@/service/cart';
import { showSuccessToast } from 'vant';

const cart = useCartStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
    detail: {} as GoodsDetail
})

onMounted(async () => {
    const { id } = route.params
    const result = await goodDetail(id as string)
    state.detail = result.data
})

async function gotoCart() {
    router.push('/cart')
}

// 添加到购物车
async function addToCart() {
    // 添加购物车
    let result = await addCart({ goodsCount: 1, goodsId: state.detail.goodsId })
    // 更新购物车
    if (result.resultCode == 200) {
        showSuccessToast('添加成功')
    }
    cart.updateCart()
}

// 立即购买
async function buyNow() {
    await addCart({ goodsCount: 1, goodsId: state.detail.goodsId })
    cart.updateCart()
    router.push('/cart')
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.product-detail {
    .detail-content {
        height: calc(100vh - 50px);
        overflow: hidden;
        overflow-y: auto;

        .detail-swipe-wrap {
            img {
                width: 100%;
            }
        }

        .product-info {
            padding: 0 10px;

            .product-title {
                font-size: 18px;
                text-align: left;
                color: #333;
            }

            .product-desc {
                font-size: 14px;
                text-align: left;
                color: #999;
                padding: 5px 0;
            }

            .product-price {
                .fj();
                justify-content: start;
                align-items: center;

                span:nth-child(1) {
                    color: #f63515;
                    font-size: 22px;
                }

                span:nth-child(2) {
                    color: #999;
                    font-size: 16px;
                    margin-left: 10px;
                    text-decoration: line-through;
                }
            }
        }

        .product-intro {
            width: 100%;
            padding-bottom: 50px;

            ul {
                .fj();
                margin: 15px 0;

                li {
                    flex: 1;
                    text-align: center;
                    font-size: 15px;
                    border-right: 1px solid lightgray;
                    .boxSizing();
                    cursor: pointer;

                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
    }
}

.product-content {
    padding: 0 20px;

    /deep/ img {
        width: 100%;
    }
}

.action-icon {

    // 深度监听
    /deep/ .van-icon {
        font-size: 20px;
    }
}
</style>