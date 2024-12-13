<template>
    <div class="footer-body">
        <div class="footer-policies">
            <RouterLink to="/contactus">{{ $t('footer.contactus') }}</RouterLink>
            <RouterLink to="/aboutus">{{ $t('footer.aboutus') }}</RouterLink>
            <RouterLink to="/disclaimer">{{ $t('footer.teamspolicies') }}</RouterLink>
        </div>

        <div class="footer-phone">
            <Phone class="contact-phone" v-for="(phone, idx) in himiConfig.contact_number" :key="idx" :phone="phone" />
        </div>

        <div class="footer-address">
            <span>{{ $t('footer.address') }}</span>
        </div>
        <button class="border-button border-white-button" @click="pushJoinUS">{{ $t('footer.enquireNow') }}</button>
        <div class="footer-copyright">{{ $t('footer.copyright') }} @ {{ $t('footer.copyrightContent') }}</div>
    </div>
</template>

<script setup lang="ts" name="footer">
import { useRouter } from 'vue-router';
import Phone from './Phone.vue';
import himiConfig from '@/utils/pubConfig';

let router = useRouter()

function pushJoinUS() {
    router.push('/joinus')
}

</script>

<style scoped>
.footer-body {
    background-color: var(--color-main);
    padding: 1rem 1rem 2rem 1rem;
    color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.footer-policies a {
    color: inherit;
    font-size: 1rem;
    font-weight: bold;
    padding-right: 10px;
}

.footer-policies a:last-child {
    padding-right: 0;
}

.footer-body div {
    padding: 0.5rem 0;
}

.contact-phone {
    color: inherit;
    font-size: 1.3rem;
    padding-right: 2rem;
}

.footer-phone .contact-phone:last-child {
    padding-right: 0;
}

.footer-address {
    text-align: center;
    font-size: 1.5rem;
}

.enquire-now {
    border: 2px solid white;
    color: inherit;
}

.footer-copyright {
    letter-spacing: 1px;
}

@media (max-width: 650px) {
    .enquire-now {
        border: 2px solid white;
        color: inherit;
    }

    .footer-body div {
        padding: 0.2rem;
    }

    .footer-address {
        text-align: center;
        font-size: 1rem;
        line-height: 1;
    }
    
    .footer-copyright {
        letter-spacing: 1px;
        line-height: 1;
    }
}
</style>