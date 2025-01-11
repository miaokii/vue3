<template>
    <div class="product-detail">
        <simple-header name="商品详情" />
        <div class="detail-content">
            <div class="detail-swipe-wrap">

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

        <van-action-bar :safe-area-inset-bottom="true">
            <van-action-bar-icon icon="chat-o" text="客服"/>
            <van-action-bar-icon icon="cart-o" :badge="!cart.count ? '' : cart.count" @click="gotoCart" text="购物车" />
            <van-action-bar-button type="warning" text="加入购物车" @click="addToCart" />
            <van-action-bar-button type="danger" text="立即购买" @click="" />
        </van-action-bar>
    </div>
</template>

<script setup lang="ts" name="ProductDetail">
import SimpleHeader from '@/components/SimpleHeader.vue';
import { goodDetail } from '@/service/goods';
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type GoodsDetail } from '@/interfaces/Home';
import { prefix } from '@/common/ts/utils';
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
    detail: {} as GoodsDetail
})

onMounted(async () => {
    const { id } = route.params
    const data = await goodDetail(id as string)

    state.detail = data
})

function gotoCart() {

}

function addToCart() {

}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.product-detail {
    .detail-content {
        height: calc(100vh - 50px);
        overflow: hidden;
        overflow-y: auto;

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

            .product-content {
                padding: 0 20px;

                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>