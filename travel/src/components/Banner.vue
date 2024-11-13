<template>
    <div class="banner">
        <div class="banner-images">
            <!-- 轮播图 -->
            <div class="banner-slide">
                <img v-for="(img, index) in bannerList" :key="img.id" :src="getAssetsImages(img.url)" alt=""
                    :class="['banner-image', currentImageIndex == index ? '' : 'banner-image-hide']">
            </div>

            <!-- 指示器 -->
            <div class="banner-indicator">
                <div :class="['banner-indicator-dot', currentImageIndex == index - 1 ? 'banner-indicator-dot-selected' : '']"
                    v-for="index in bannerList.length" :key="index" @click="changeBanner(index - 1)"></div>
            </div>

            <!-- 左右切换 -->
            <div class="banner-arrow">
                <SvgIcon icon-name="icon-arrow-left-bold" @click="changeArrow(true)" />
                <SvgIcon icon-name="icon-arrow-right-bold" @click="changeArrow(false)" />
            </div>

            <!-- 公告 -->
            <div class="banner-notice">
                <div class="banner-notice-icon">
                    <SvgIcon icon-name="icon-notification" />
                    <div>最新公告</div>
                </div>
                <div class="banner-notice-content">
                    <span>
                        恭喜180****3233抽奖获得巴厘岛五日游🎉🎉🎉🎉
                    </span>
                </div>
            </div>
        </div>

        <swiper class="banner-swiper" direction="horizontal" :slides-per-view="1" :space-between="0" :autoplay="{
            delay: 2000,
            disableOnInteraction: false
        }" navigation:loop="true">
            <swiper-slide v-for="index in 9" :key="index">
                <img class="swiper-image" :src="getAssetsImages(`cat${index}.jpg`)" alt="">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup lang="ts" name="banner">
import getAssetsImages from '@/utils/pubUse';
import { nanoid } from 'nanoid';
import { onMounted, reactive, ref } from 'vue';
import SvgIcon from './SvgIcon.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';

let bannerList = reactive([
    { id: nanoid(), url: 'img1.jpg' },
    { id: nanoid(), url: 'img2.jpg' },
    { id: nanoid(), url: 'img3.jpg' },
    { id: nanoid(), url: 'img4.jpg' }
])

let currentImageIndex = ref(0)
let autoTimer: number

function autoPlay() {
    clearInterval(autoTimer)
    autoTimer = setInterval(() => {
        currentImageIndex.value += 1
        if (currentImageIndex.value == bannerList.length) {
            currentImageIndex.value = 0
        }
    }, 4000);
}

function changeBanner(index: number) {
    currentImageIndex.value = index
    autoPlay()
}

function changeArrow(left: boolean) {
    currentImageIndex.value += left ? -1 : 1
    if (currentImageIndex.value == bannerList.length) {
        currentImageIndex.value = 0
    }
    if (-1 == currentImageIndex.value) {
        currentImageIndex.value = bannerList.length - 1
    }
    autoPlay()
}

onMounted(() => {
    // autoPlay()
})

</script>

<style scoped>
.banner {
    position: relative;
    width: 80%;
    overflow: hidden;
    margin: auto;

    display: flex;
    /* 垂直方式 */
    flex-direction: column;
    /* 对齐方式 */
    justify-content: center;

    gap: 20px;
}

.banner-images {
    position: relative;
}

.banner-slide {
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;
}

.banner-image {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    transition: 2s;
    opacity: 1;
}

.banner-image-hide {
    opacity: 0;
}

/* 指示器 */
.banner-indicator {
    position: absolute;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);
    display: flex;
}

.banner-indicator-dot {
    background-color: white;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin: 0 5px;
    cursor: pointer;

    box-shadow: 0 0 10px grey;
}

/* 指示器选中 */
.banner-indicator-dot-selected {
    background-color: var(--bgcolor);
}

.banner-arrow {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    /* 垂直居中 */
    align-items: center;
    /* 两段对齐 */
    justify-content: space-between;
}

.banner-arrow .icon {
    width: 2em;
    height: 2em;
    cursor: pointer;
}

/* 鼠标移入时，添加背景 */
.banner-arrow .icon:hover {
    background-color: black;
    opacity: 70%;
}

.banner-notice {
    position: absolute;
    bottom: 30px;
    background-color: white;
    padding: 10px 20px;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: start;

    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;

    font-size: 14px;
    box-shadow: 0 0 10px gray;
}

.banner-notice-icon {
    display: flex;
    align-items: center;
    justify-content: start;
    color: var(--bgcolor);
    margin-right: 20px;
}

.banner-notice-icon svg {
    margin-right: 10px;
}

.banner-notice-content {
    /* 溢出时隐藏 */
    overflow: hidden;
}

.banner-notice-content span {
    display: block;
    white-space: nowrap;
    cursor: pointer;
    /* 动画名称，动画事件，动画效果（匀速），动画循环 */
    animation: banner-notice-content-scroll 5s linear infinite;
}

.banner-notice-content span:hover {
    animation-play-state: paused;
}

@keyframes banner-notice-content-scroll {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>