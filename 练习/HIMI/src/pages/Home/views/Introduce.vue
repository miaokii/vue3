<template>
    <div class="body-m introduce-body">
        <div class="introduce-head">
            <span class="introduce-title">{{ $t('home.introduce_himi_title') }}</span>
            <span class="introduce-content">{{ $t('home.introduce_himi_content') }}</span>
        </div>

        <div class="introduce-list">
            <div class="introduce-item" v-for="(json, idx) in introduce_jsons" :key="idx">
                <!-- TODO: 更改图片路径 -->
                <img class="introduce-img" :src='getAssetsImages(json.image)' alt="">
                <span class="introduce-item-title">{{ json.title }}</span>
                <span class="introduce-item-content">{{ json.content }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="introduce">
import i18n, { t } from '@/i18n';
import getAssetsImages from '@/utils/pubUse';
import { computed, reactive } from 'vue';

let introduce_jsons = computed(() => {
    return [
        { image: 'home/in1.png', title: t('home.introduce_international_title'), content: t('home.introduce_international_content') },
        { image: 'home/in2.png', title: t('home.introduce_area_title'), content: t('home.introduce_area_content') },
        { image: 'home/in3.png', title: t('home.introduce_commitment_title'), content: t('home.introduce_commitment_content') },
        { image: 'home/in4.png', title: t('home.introduce_industry_title'), content: t('home.introduce_industry_content') },
    ]
})

</script>

<style scoped>
.introduce-body {
    margin-top: 40px;
    margin-bottom: 40px;
    text-align: start;
}

.introduce-head {
    display: flex;
    align-items: center;
}

.introduce-title {
    font-size: 2rem;
    font-family: futura-pt-weight;
    width: 50%;
    text-align: center;
    display: inline-block;
}

.introduce-content {
    padding-left: 1rem;
    width: 50%;
}

.introduce-list {
    display: grid;
    margin-top: 2rem;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

.introduce-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.introduce-item img {
    width: 45%;
    max-width: 120px;
    min-width: 50px;

    filter: hue-rotate(90deg);
}

.introduce-item-title {
    font-weight: bold;
    letter-spacing: 0;
    margin: 1.5rem 0;
}

@media (max-width: 900px) {
    .introduce-list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width:650px) {

    .introduce-head {
        flex-direction: column;
        align-items: center;
    }

    .introduce-title {
        font-size: 1.5rem;
        width: 100%;
        margin: 1rem 0;
    }

    .introduce-content {
        padding: 1rem 0;
        width: 100%;
        text-align: center;
    }

    .introduce-list {
        margin: 0;
        grid-template-columns: repeat(1, 1fr);
    }

    .introduce-item {
        flex-direction: column;
        width: 100%;
        padding: 0;
    }

    .introduce-item img {
        width: 20%;
    }

    .introduce-item-title {
        margin: 0.5rem 0;
    }

    .introduce-item-content {
        text-align: center;
    }
}
</style>