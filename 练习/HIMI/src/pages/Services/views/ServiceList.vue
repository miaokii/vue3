<template>
    <h2>{{ $t('services.our_services') }}</h2>
    <div class="body-m services-body">
        <div class="services-item" v-for="(json, idx) in services_jsons" :key="idx">
            <!-- TODO: 设置图片路径 -->
            <!-- <img src="../../../assets/images/services/serverse01.jpg" alt=""> -->
            <img :src="getAssetsImages(`services/${json.image}`)" alt="">
            <span class="services-item-title">{{ json.title }}</span>
            <span class="services-item-content">{{ json.content }}</span>
            <button class="border-button">{{ $t('services.read_more') }}</button>
        </div>
    </div>
</template>

<script setup lang="ts" name="services">
import { t } from '@/i18n';
import getAssetsImages from '@/utils/pubUse';
import { computed } from 'vue';


let services_jsons = computed(() => {
    return [
        { image: 'serverse01.jpg', title: t('services.incorporation'), content: t('services.incorporation_content')},
        { image: 'serverse01.jpg', title: t('services.secretarial'), content: t('services.secretarial_content')},
        { image: 'serverse01.jpg', title: t('services.taxation'), content: t('services.taxation_content')},
        { image: 'serverse01.jpg', title: t('services.advisory'), content: t('services.advisory_content')},
        { image: 'serverse01.jpg', title: t('services.agency'), content: t('services.agency_content')},
        { image: 'serverse01.jpg', title: t('services.incubator'), content: t('services.incubator_content')},
    ]
})

</script>

<style scoped>

.services-body {
    margin-bottom: 2rem;
    display: grid;
    gap: 2.8em;
    grid-template-columns: repeat(3, 1fr);
}

.services-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.services-item-title {
    margin-top: 1em;
    font-weight: bold;
    font-size: 1.2em;
    width: 100%;
    text-align: left;
}

.services-item-content {
    margin: 2em 0;
    padding-left: 1.2em;
    border-left: 1px solid var(--color-main-hover)
}

.services-item img {
    width: 100%;
}

.border-button {
    margin: 0;
    /* padding: 0 20px; */
}
</style>