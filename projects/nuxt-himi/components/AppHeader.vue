<template>
    <div class="center-body app-header">

        <nuxt-link to="/home" class="app-logo"></nuxt-link>
        <ul class="app-menu">
            <li v-for="(item, idx) in menuList" :key="idx">
                <nuxt-link :to="item.path" class="app-menu-item" :class="{ 'active': $route.path === item.path }">{{
                    item.title }}</nuxt-link>
            </li>
            <select class="nav-list-langs" v-model="locale" @change="setLocale(locale)">
                <option v-for="locale in locales" :key="locale.code" :value="locale.code">
                    {{ locale.name }}
                </option>
            </select>
        </ul>
    </div>
</template>

<script setup lang="ts" name="AppHeader">
const { locales, locale, setLocale } = useI18n()

const menuList = computed(() => [
    { title: $t('nav.home'), path: '/home' },
    { title: $t('nav.aboutus'), path: '/aboutus' },
    { title: $t('nav.services'), path: '/services' },
    { title: $t('nav.joinus'), path: '/joinus' },
    { title: $t('nav.contactus'), path: '/contactus' },
])

</script>

<style scoped lang="scss">
.app-header {
    height: $height-navbar;
    background-color: white;
    padding: 0;
    max-width: 100%;
    padding: 0 calc((100% - 1024px) / 2);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .app-logo {
        background-image: url('~/assets/images/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0;
        height: 70%;
        width: 180px;
        cursor: pointer;
    }

    .app-menu {
        display: flex;
        flex-direction: row;
        gap: 2em;
    }
}
</style>