<template>
    <div class="tabbar-box">
        <van-tabbar safe-area-inset-bottom route>
            <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/mine" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup lang="ts" name="tabBar">
import { reactive } from 'vue';

const state = reactive({
    active: 0
})

</script>

<style scoped lang="less">

.tabbar-box {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    // [水平偏移] [垂直偏移] [模糊半径] [扩展半径] [颜色];
    box-shadow: 0 10px 10px 10px lightgray;
    z-index: 1000;
}

</style>