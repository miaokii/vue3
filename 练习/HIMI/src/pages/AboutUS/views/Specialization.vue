<template>
    <div class="body-m specialization-body">
        <h2>{{ $t('about.specialization') }}</h2>
        <div class="specialization-list">
            <div class="specialization-item" v-for="(json, idx) in bizinitiatives" :key="idx">
                <img :src="getAssetsImages(`aboutus/${json.image}`)" alt="">
                <div class="specialization-title">{{ json.title }}</div>
                <div class="specialization-content">{{ json.content }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="specialization">
import { t } from '@/i18n';
import getAssetsImages from '@/utils/pubUse';
import { computed } from 'vue';


let bizinitiatives = computed(() => {
    return [
        { image: 's1.png', title: t('about.services'), content: t('about.services_content') },
        { image: 's2.png', title: t('about.license_apply'), content: t('about.license_apply_content') },
        { image: 's3.png', title: t('about.hr'), content: t('about.hr_content') },
        { image: 's4.png', title: t('about.tradingdd'), content: t('about.tradingdd_content') },
        { image: 's5.png', title: t('about.logistics'), content: t('about.logistics_content') },
        { image: 's6.png', title: t('about.incubator'), content: t('about.incubator_content') }
    ]
})

</script>

<style scoped>
.specialization-body {
    margin-bottom: 6rem;
}

h2 {
    margin-top: 3rem;
}

.specialization-list {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(6, 1fr);
}

.specialization-item {
    text-align: center;
}

.specialization-title {
    margin: 1rem 0;
    font-weight: bold;
    letter-spacing: 0;
    font-size: 0.9rem;
}

.specialization-content {
    font-size: 0.9rem;
    text-align: start;
}

.specialization-item img {
    width: 60%;
    max-width: 100px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 3px 5px 10px black;
    border: 10px solid white;
    margin-bottom: 1rem;
}

@media (max-width: 650px) {

    .specialization-body {
        margin-bottom: 3rem;
    }

    .specialization-list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .specialization-title {
        margin: 0.5rem 0;
    }

    .specialization-content {
        text-align: center;
    }

    .specialization-item img {
        width: 20%;
        min-width: 70px;
        border: 5px solid white;
        margin-bottom: 0;
    }

}
</style>