<template>
    <div class="about-body">
        <img src="https://yoc.tech/images/b9.png" alt="">
        <YocIntroduce title="公司简介" content="优卡集团通过自研SaaS平台“融享客”为我们的客户提供一站式解决方案，激活客户群，实现业务流程数字化，提高整体运营效率。"
            image="https://yoc.tech/images/b21.png" />
        <!-- <div class="about-grow">
            <div class="about-title-body">
                <div class="about-title">发展历程</div>
                <div class="about-divider"></div>
            </div>
        </div> -->

        <div class="about-honor">
            <div class="about-title-body">
                <div class="about-title">公司荣誉</div>
                <div class="about-divider"></div>
            </div>
            <div class="about-honor-content">高新技术企业 | 四川省优秀软件产品 | 四川省最具核心竞争力软件企业 | 成都市守合同重信用企业 | 四川省创客中国优胜奖</div>

            <swiper :slides-per-view="3" :space-between="30" :pagination="{
                clickable: true

            }" :modules="[Pagination, Navigation, Autoplay, A11y]" class="about-swiper" :loop="true" :navigation="true"
                :autoplay="{
                    pauseOnMouseEnter: true,
                    delay: 2000
                }">
                <swiper-slide v-for="(imgurl, idx) in honorImages" :key="idx">
                    <img class="swiper-image" :src="imgurl" alt="">
                </swiper-slide>
            </swiper>
        </div>

        <div class="about-envirment">
            <div class="about-title-body">
                <div class="about-title">办公环境</div>
                <div class="about-divider"></div>
            </div>
            <img src="https://yoc.tech/images/b8.png" alt="">
        </div>
    </div>
</template>

<script setup lang="ts" name="about">
import YocIntroduce from '@/components/YocIntroduce.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

let honorImages = [
    "https://yoc.tech/images/swiper/z4.png",
    "https://yoc.tech/images/swiper/i22.png",
    "https://yoc.tech/images/swiper/i444.png",
    "https://yoc.tech/images/swiper/z61.png",
    "https://yoc.tech/images/swiper/z10.png",
]

</script>

<style scoped>
.about-body>img {
    width: 100%;
}

.about-title {
    padding-top: 2rem;
    padding-bottom: 10px;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
}

.about-divider {
    height: 4px;
    width: 80px;
    margin: 0 auto;
    background: linear-gradient(90deg, #2770F5, #62CEFA);
    margin-bottom: 50px;
}

.about-envirment img {
    padding: 0 5em;
    padding-bottom: 5em;
    width: 100%;
}

.about-honor {
    padding: 0 3rem;
}

.about-honor-content {
    text-align: center;
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 2em;
    vertical-align: top;
}

.swiper {
    margin: 0 5em;
}

.swiper-slide {
    overflow: hidden;
    display: flex;
    justify-content: center
}

.swiper-slide img {
    height: 30vw;
}

@media (max-width: 800px) {
    .swiper {
        margin: 0;
    }

    .about-divider {
        background: linear-gradient(90deg, #2770F5, #62CEFA);
        margin-bottom: 1rem;
    }

    .about-envirment img {
        padding: 0 3em;
        padding-bottom: 2em;
    }
}
</style>