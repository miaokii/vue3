<template>
    <div class="body-m contact-map-body">
        <div class="contact-map">
            <HIMIMap />
        </div>
        <div class="contact-content">
            <h2>{{ $t('contact.des') }}</h2>
            <div class="contact-list">
                <div class="contact-address">
                    <div class="contact-list-title">{{ $t('contact.address') }}</div>
                    <div class="contact-list-content"> {{ $t('footer.address') }} </div>
                </div>
                <div class="contact-email">
                    <div class="contact-list-title">{{ $t('contact.email') }}</div>
                    <Mail class="contact-list-content" :to="himiConfig.email" />
                </div>
                <div class="contact-number">
                    <div class="contact-list-title">{{ $t('contact.contact_number') }}</div>
                    <div class="contact-list-content">
                        <Phone class="contact-phone" v-for="(phone, idx) in himiConfig.contact_number" :key="idx"
                            :phone="phone" />
                    </div>
                </div>
                <div class="business-hour">
                    <div class="contact-list-title">{{ $t('contact.business_hours') }}</div>
                    <div class="contact-list-content"> {{ $t('contact.business_hours_content') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="contactMap">
import HIMIMap from '@/components/HIMIMap.vue';
import Mail from '@/components/Mail.vue';
import Phone from '@/components/Phone.vue';
import himiConfig from '@/utils/pubConfig';

function call(phone: string) {

}

</script>

<style scoped>
.contact-map-body {
    margin-top: 4rem;
    margin-bottom: 4rem;
    display: flex;
}

.contact-map {
    width: 50%;
    background-color: var(--color-border);
}

.contact-content {
    width: 50%;
    margin-left: 2rem;
    text-align: start;
}

.contact-content h2 {
    line-height: 1.2;
    text-align: start;
    font-weight: bold;
    font-family: futura-pt-weight;
    font-size: 1.9rem;
    margin: 0;
    margin-bottom: 2rem;
    text-align: inherit;
}

.contact-list-title {
    font-family: futura-pt-weight;
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 1.5rem;
}

.contact-phone {
    cursor: pointer;
}

.contact-list-content .contact-phone:first-child {
    margin-right: 2rem;
}

.contact-phone:hover {
    color: var(--color-main-hover);
}

.business-hour {
    margin-top: 2rem;
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