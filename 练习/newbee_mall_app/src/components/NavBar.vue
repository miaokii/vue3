<template>
    <div class="nav-bar van-hairline--top">
        <ul class="nav-list">
            <RouterLink class="nav-list-item active" to="home">
                <i><van-icon name="wap-home-o"/></i>
                <span>首页</span>
            </RouterLink>
            <RouterLink class="nav-list-item" to="home">
                <i><van-icon name="apps-o" /></i>
                <span>分类</span>
            </RouterLink>
            <RouterLink class="nav-list-item" to="home">
                <i><van-icon name="shopping-cart-o" :badge="!cart.count ? '' : cart.count"></van-icon></i>
                <span>购物车</span>
            </RouterLink>
            <RouterLink class="nav-list-item" to="home">
                <i><van-icon name="user-circle-o" /></i>
                <span>我的</span>
            </RouterLink>
        </ul>
    </div>
</template>

<script setup lang="ts" name="navbar">
import { getLocal } from '@/common/ts/utils';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const route = useRoute()
const cart = useCartStore()

onMounted(() => {
    const token = getLocal('token');
    const path = route.path;

    if (token && !['/home', '/category'].includes(path)) {
        cart.updateCart()
    }
});

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 5px 0;
    z-index: 1000;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    background-color: white;
    
    .nav-list {
        width: 100%;
        .fj();
        flex-direction: row;
        padding: 0;
        .nav-list-item {
            display: flex;
            flex-direction: column;
            flex: 1;
            text-align: center;
            color: #666;
            &.router-link-active {
                color: @primary;
            }
            i {
                text-align: center;
                font-size: 22px;
            }
            span {
                font-size: 12px;
            }
            .van-icon-shopping-cart-o {
                margin: 0 auto;
                margin-bottom: 2px;
            }
        }
    }
}

</style>