<template>
    <div class="body-m contact-map-body">
        <div class="contact-map"></div>
        <div class="contact-content">
            <h2>{{ $t('contact.des') }}</h2>
            <div class="contact-list">
                <div class="contact-address">
                    <div class="contact-list-title">{{ $t('contact.address') }}</div>
                    <div class="contact-list-content"> {{ $t('footer.address') }} </div>
                </div>
                <div class="contact-email">
                    <div class="contact-list-title">{{ $t('contact.email') }}</div>
                    <div class="contact-list-content">{{ himiConfig.email }} </div>
                </div>
                <div class="contact-number">
                    <div class="contact-list-title">{{ $t('contact.contact_number') }}</div>
                    <div class="contact-list-content">
                        <span class="contact-phone" v-for="(phone, idx) in himiConfig.contact_number" :key="idx" @click="call(phone)">{{ phone }}</span>
                    </div>
                </div>
                <div class="business-hour">
                    <div class="contact-list-title">{{ $t('contact.business_hours') }}</div>
                    <div class="contact-list-content">9.00AM to 6.30PM. Monday to Friday, excluding Public Holiday</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="contactMap">
import himiConfig from '@/utils/pubConfig';

function call(phone: string) {

}

</script>

<style scoped>
.contact-map-body {
    margin: 4rem auto; 
    display: flex;
}

.contact-map {
    width: 100vw;
    height: 70vh;
    background-color: var(--color-border);
}

.contact-content {
    margin-left: 2rem;
    text-align: start;
}

.contact-content h2 {
    line-height: 1.2;
    text-align: start;
    font-weight: 100;
    font-family: futura-pt-weight;
    font-size: 1.9rem;
    margin: 0;
    margin-bottom: 3rem;
}

.contact-list-title {
    font-family: futura-pt-weight;
    font-size: 1.2rem;
    margin-top: 1.5rem;
}

.contact-phone {
    margin-right: 2rem;
    cursor: pointer;
}

.contact-phone:hover {
    color: var(--color-main-hover);
}

.business-hour {
    margin-top: 2rem;
}

@media (max-width: 650px) {
    .contact-map-body {
        flex-direction: column;
    }

    .contact-content h2 {
        margin-top: 2rem;
    }
}

</style>