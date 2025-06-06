<template>
    <div class="pc-header">
        <div class="center-body">
            <nuxt-link to="/home" class="app-logo"></nuxt-link>
            <div class="app-menu">
                <nuxt-link v-for="(item, idx) in menuList" :key="idx" :to="item.path"
                    :class="['app-menu-item', { 'item-active': $route.path.startsWith(item.path) }]">
                    {{ item.title }}
                </nuxt-link>
                <select class="langs" v-model="locale" @change="setLocale(locale)">
                    <option v-for="locale in locales" :key="locale.code" :value="locale.code">
                        {{ locale.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="PCHeader">
const { locales, locale, setLocale } = useI18n()

const menuList = computed(() => [
    { title: t('nav.home'), path: '/home' },
    { title: t('nav.aboutus'), path: '/aboutus' },
    { title: t('nav.services'), path: '/services' },
    { title: t('nav.joinus'), path: '/joinus' },
    { title: t('nav.contactus'), path: '/contactus' },
])

</script>

<style scoped lang="scss">
.pc-header {
    height: $height-navbar;
    background-color: white;

    .center-body {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .app-logo {
            background-image: url('/images/logo.png');
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
            gap: 1em;
            color: $color-main;
            font-size: 1.1em;
            font-weight: bold;

            .app-menu-item {
                &:hover {
                    color: $color-main-hover;
                }
            }

            .item-active {
                color: $color-main-hover;
            }

            .langs {
                border: none;
                background-color: transparent;
                color: inherit;
                font-weight: inherit;
                font-size: inherit;
                appearance: none;
                font-family: inherit;

                &:hover,
                &:focus {
                    outline: none;
                }
            }
        }
    }
}

@media (max-width: 860px) {
    .pc-header {
        .center-body {
            .app-logo {
                width: 150px;
            }
            .app-menu {
                gap: 0.5em;
                font-size: 1em;
            }
        }
    }
}
</style>