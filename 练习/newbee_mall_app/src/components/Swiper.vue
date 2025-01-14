<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1baeae" v-if="list.length > 0" lazy-render>
        <van-swipe-item class="my-swipe-item" v-for="(item, index) in list" :key="index">
            <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)">
        </van-swipe-item>
    </van-swipe>
</template>

<script setup lang="ts" name="swiper">
import type { HomeCarousel } from '@/interfaces/Home';

defineProps<{ list: HomeCarousel[] }>();

function goTo(url: string) {
    window.open(url)
}

</script>

<style scoped lang="less">
.my-swipe {
    img {
        height: 100%;
        width: 100%;
    }
}
</style>