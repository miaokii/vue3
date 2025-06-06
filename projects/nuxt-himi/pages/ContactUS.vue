<template>
    <div class="contact-page">
        <PageHead :path="getImage(`contact/back.png`)" />

        <section class="center-body contact-body">
            <div class="contact-map">
                <HIMIMap />
            </div>
            <div class="contact-content">
                <h2>{{ $t('contact.des') }}</h2>
                <div class="contact-list">
                    <div>
                        <div class="title">{{ t('contact.address') }}</div>
                        <div class="content"> {{ t('footer.address') }} </div>
                    </div>
                    <div>
                        <div class="title">{{ t('contact.email') }}</div>
                        <Mail class="content" :to="himiConfig.email" />
                    </div>
                    <div>
                        <div class="title">{{ t('contact.contact_number') }}</div>
                        <div class="content">
                            <Phone class="contact-phone" v-for="(phone, idx) in himiConfig.contact_number" :key="idx"
                                :phone="phone" />
                        </div>
                    </div>
                    <div>
                        <div class="title">{{ t('contact.business_hours') }}</div>
                        <div class="content"> {{ t('contact.business_hours_content') }}</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts" name="name">

import { himiConfig } from '~/data/himi-config';

</script>

<style scoped lang="scss">
.contact-body {
    margin-top: 4rem;
    margin-bottom: 4rem;
    display: flex;

    .contact-map {
        width: 50%;
        background-color: $color-background;
    }

    .contact-content {
        width: 50%;
        margin-left: 2rem;
        text-align: start;

        h2 {
            line-height: 1.2;
            text-align: start;
            font-weight: bold;
            font-family: futura-pt-weight;
            font-size: 1.9rem;
            margin: 0;
            margin-bottom: 2rem;
            text-align: inherit;
        }

        .contact-list {
            display: flex;
            flex-direction: column;
            gap: 1em;

            .title {
                font-family: futura-pt-weight;
                font-size: 1.2rem;
                font-weight: bold;
                margin-top: 1.5rem;
            }

            .contact-phone {
                cursor: pointer;
                margin-right: 2em;
                &:hover {
                    color: $color-main-hover;
                }
            }
        }
    }
}

@media (max-width: 800px) {
    .contact-map-body {
        flex-direction: column;
    }

    .contact-map {
        width: 100%;
        aspect-ratio: 1.6;
    }

    .contact-content {
        width: 100%;
        margin-left: 0;
        text-align: center;
    }

    .contact-content h2 {
        margin-top: 2rem;
    }
}
</style>
45多少