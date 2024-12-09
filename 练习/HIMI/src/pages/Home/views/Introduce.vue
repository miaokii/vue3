<template>
    <div class="body-m introduce-body">
        <div class="introduce-head">
            <span class="introduce-title">{{ $t('home.introduce_himi_title') }}</span>
            <span class="introduce-content">{{ $t('home.introduce_himi_content') }}</span>
        </div>

        <div class="introduce-list">
            <div class="introduce-item" v-for="(json, idx) in introduce_jsons" :key="idx">
                <!-- TODO: 更改图片路径 -->
                <img src='../../../assets/images/home/image00002.png' alt="">
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
        { image: 'image00001.png', title: t('home.introduce_international_title'), content: t('home.introduce_international_content') },
        { image: 'image00002.png', title: t('home.introduce_area_title'), content: t('home.introduce_area_content') },
        { image: 'image00003.png', title: t('home.introduce_commitment_title'), content: t('home.introduce_commitment_content') },
        { image: 'image00004.png', title: t('home.introduce_industry_title'), content: t('home.introduce_industry_content') },
    ]
})

</script>

<style scoped>
.introduce-body {
    margin-top: 40px;
    margin-bottom: 40px;
}

.introduce-head {
    display: flex;
    align-items: center;
}

.introduce-title {
    font-size: 2.5rem;
    font-family: futura-pt-weight;
    width: 50%;
    text-align: center;
    display: inline-block;
}

.introduce-content {
    width: 50%;
}

.introduce-list {
    display: flex;
    margin-top: 2rem;
    justify-content: space-between;
}

.introduce-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    padding: 0 20px;
}

.introduce-item img {
    width: 50px;
}

.introduce-item-title {
    font-weight: bold;
    letter-spacing: 0;
    margin: 1.5em 0;
}
</style>