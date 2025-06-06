<template>
    <div class="about-page">
        <page-head :path="getImage(`aboutus/aboutus.png`)" />

        <section class="center-body about">
            <h2>{{ t('about.who') }}</h2>
            <div class="who">
                <div>{{ t('about.who_content_1') }}</div>
                <div>{{ t('about.who_content_2') }}</div>
                <div>{{ t('about.who_content_3') }}</div>
            </div>
        </section>

        <section class="center-body specialization">
            <h2>{{ t('about.specialization') }}</h2>
            <div class="list">
                <div class="item" v-for="(json, idx) in bizinitiatives" :key="idx">
                    <img :src="getImage(`aboutus/${json.image}`)" alt="">
                    <div class="title">{{ json.title }}</div>
                    <div class="content">{{ json.content }}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts" name="aboutUS">

let bizinitiatives = computed(() => {
    return [
        { image: 's1.png', title: t('about.services'), content: t('about.services_content') },
        { image: 's2.png', title: t('about.license_apply'), content: t('about.license_apply_content') },
        { image: 's4.png', title: t('about.tradingdd'), content: t('about.tradingdd_content') },
        { image: 's3.png', title: t('about.hr'), content: t('about.hr_content') },
        { image: 's5.png', title: t('about.logistics'), content: t('about.logistics_content') },
        { image: 's6.png', title: t('about.incubator'), content: t('about.incubator_content') }
    ]
})
</script>

<style scoped lang="scss">
.about-page {
    display: flex;
    flex-direction: column;
    gap: 4em;
}

.about {
    .who {
        padding-top: 2em;
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        align-items: center;
        text-align: center;
    }
}

.specialization {
    .list {
        padding-top: 2em;
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(6, 1fr);

        .item {
            display: flex;
            text-align: center;
            flex-direction: column;
            gap: 1em;
            align-items: center;

            .title {
                font-weight: bold;
                letter-spacing: 0;
            }

            .content {
                font-size: 0.9rem;
                text-align: center;
            }

            img {
                width: 60%;
                aspect-ratio: 1;
                max-width: 100px;
                object-fit: cover;
                border-radius: 50%;
                box-shadow: 3px 5px 10px black;
                border: 8px solid white;
                margin-bottom: 1rem;
            }
        }
    }
}


@media (max-width: 1000px) {
    .specialization {
        .list {
            grid-template-columns: repeat(3, 1fr);
        }
    }
}

@media (max-width: 800px) {
    .specialization {
        .list {
            grid-template-columns: repeat(1, 1fr);
        }
    }

}
</style>