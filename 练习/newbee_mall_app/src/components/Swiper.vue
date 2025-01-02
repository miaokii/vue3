<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-if="list.length > 0">
        <van-swipe-item v-for="(item, index) in list" :key="index">
            <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)">
        </van-swipe-item>
    </van-swipe>

    <!-- <div v-for="(item, index) in list" :key="index">
        <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)">
    </div> -->
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
        width: 100%;
        height: 100%;
    }
}
</style>