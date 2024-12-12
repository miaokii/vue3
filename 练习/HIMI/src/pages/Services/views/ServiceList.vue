<template>
    <h2>{{ $t('services.our_services') }}</h2>
    <div class="body-m services-body">
        <div class="services-item" v-for="(service_type, idx) in service_types" :key="idx">
            <!-- TODO: 设置图片路径 -->
            <!-- <img src="../../../assets/images/services/serverse01.jpg" alt=""> -->
            <img :src="getAssetsImages(`services/${service_map[service_type].image}`)" alt="">
            <span class="services-item-title">{{ service_map[service_type].title }}</span>
            <span :class="['services-item-content', inHome ? '' : 'service-item-content-left-border']">{{ service_map[service_type].content
                }}</span>
            <button class="border-button" @click="pushServiceDetail(service_type)">{{ $t('services.read_more') }}</button>
        </div>
    </div>
</template>

<script setup lang="ts" name="services">
import { service_map, service_types } from '@/types/service';
import getAssetsImages from '@/utils/pubUse';
import { useRouter } from 'vue-router';

defineProps<{
    inHome?: boolean
}>()

let router = useRouter()

function pushServiceDetail(type: string) {
    router.push(`/service_detail/${type}`)
}

</script>

<style scoped>
.services-body {
    margin-bottom: 2rem;
    display: grid;
    gap: 2.8rem;
    grid-template-columns: repeat(3, 1fr);
}

.services-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.services-item-title {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
}

.services-item-content {
    margin: 1rem 0;
    text-align: start;
}

.service-item-content-left-border {
    padding-left: 1.2rem;
    border-left: 1px solid var(--color-main-hover)
}

.services-item img {
    width: 100%;
    aspect-ratio: calc(16 / 9);
    object-fit: cover;
}

.border-button {
    margin: 0 auto;
    /* padding: 0 20px; */
}

@media (max-width: 900px) {
    .services-body {
    gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
}
}

@media (max-width: 650px) {

    .services-body {
        grid-template-columns: repeat(1, 1fr);
    }

    .services-item {
        align-items: center;
    }

    .services-item-content {
        text-align: inherit;
        margin: 1rem 0;
    }

    .service-item-content-left-border {
        padding-left: 0;
        border-left: none;
    }
}
</style>