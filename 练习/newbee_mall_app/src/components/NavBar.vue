<template>
    <div class="nav-bar">
        <van-tabbar route active-color="#1baeae">
            <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
            <van-tabbar-item replace to="/cart" icon="shopping-cart-o" :badge="cart.count ? cart.count : ''">购物车</van-tabbar-item>
            <van-tabbar-item replace to="/user" icon="user-circle-o">我的</van-tabbar-item>
        </van-tabbar>
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
    z-index: 1000;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    background-color: white;
}
</style>