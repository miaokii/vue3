<template>
    <section class="center-body service-view">
        <h2>{{ t('services.our_services') }}</h2>
        <div class="services">
            <div class="item" v-for="(item, idx) in service_map" :key="idx">
                <div class="desc">
                    <img :src="getImage(`services/${item.image}`)" alt="">
                    <span class="title">{{ item.title }}</span>
                    <span :class="['content', { 'content-left-border': !isHomePage }]">{{
                        item.content
                        }}</span>
                </div>
                <button class="button-border-main" @click="pushServiceDetail(item.type)">{{ t('services.read_more')
                }}</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts" name="services">
import { service_map } from '~/data/services-page-config';


defineProps<{
    isHomePage?: boolean
}>()

function pushServiceDetail(type: string) {
    navigateTo(`/services/${type}`);
}

</script>

<style scoped lang="scss">
.service-view {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.services {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);

    .item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1em;

        .desc {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1em;

            img {
                width: 100%;
                border-radius: 2px;
                aspect-ratio: calc(16 / 9);
                object-fit: cover;
            }
            
            .title {
                font-weight: bold;
                font-size: 1.2rem;
            }

            .content {
                text-align: start;
            }

            .content-left-border {
                padding-left: 1.2rem;
                border-left: 1px solid var(--color-main-hover)
            }

        }
    }
}

@media (max-width: 1000px) {
    .services {
        gap: 2rem;
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 650px) {

    .services {
        grid-template-columns: repeat(1, 1fr);

        .item {
            align-items: center;

            .content-left-border {
                padding-left: 0;
                border-left: none;
            }
        }
    }
}
</style>