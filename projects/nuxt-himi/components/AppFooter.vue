<script lang="ts" setup name="AppFooter">
import { himiConfig } from '~/data/himi-config';
</script>

<template>
    <div class="app-footer">
        <div class="center-body">
            <div class="links">
                <nuxt-link to="/contactus">{{ t('footer.contactus') }}</nuxt-link>
                <nuxt-link to="/aboutus">{{ t('footer.aboutus') }}</nuxt-link>
                <nuxt-link to="/disclaimer">{{ t('footer.teamspolicies') }}</nuxt-link>
            </div>

            <div class="phones">
                <AppPhone class="contact-phone" v-for="(phone, idx) in himiConfig.contact_number" :key="idx"
                    :phone="phone" />
            </div>
            <div class="address">{{ t('footer.address') }}</div>
            <nuxt-link class="button-border-white" to="/joinus">{{ t('footer.enquireNow') }}</nuxt-link>
            <div class="copyright">{{ t('footer.copyright') }} @ {{ t('footer.copyrightContent') }}</div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.app-footer {
    margin-top: 2em;
    background-color: $color-main;
    color: white;
    text-align: center;
    padding: 2em 0;

    .center-body {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;

        .links {
            display: flex;
            gap: 2em;
            font-size: 1.1em;
        }

        .phones {
            font-size: 1.2em;
            display: flex;
            gap: 3em;
        }

        .address {
            font-size: 1.5em;
        }

        .button-border-white {
            padding: 1em 3em;
            font-size: 1.1em;
            letter-spacing: 2px;
        }

        .copyright {
            letter-spacing: 1.5px;   
        }
    }
}
</style>