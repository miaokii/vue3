<template>
    <div class="mobile-header center-body">
        <img class="menu-icon" :src="getImage(`nav/menu.png`)" alt="nav-menu" @click="switchAsideMenu(true)" />
        <div class="logo" @click="navigateTo('/home')"></div>
        <div></div>
    </div>

    <!-- 侧面划入的导航页面 -->

    <Transition name="slide">
        <div class="slide-menu" v-show="showAsideMenu">
            <div class="menu-body">
                <!-- 导航item -->
                <span v-for="(item, idx) in menuList" :key="idx" :class="{ 'menu-active': activePath == item.path }"
                    @click="navigateTo(item.path); switchAsideMenu(false)">{{ item.title }}</span>
                <!-- 切换语言 -->
                <select class="langs" v-model="locale" @change="setLocale(locale)">
                    <option v-for="locale in locales" :key="locale.code" :value="locale.code">
                        {{ locale.name }}
                    </option>
                </select>
            </div>
            <img class="menu-close" :src="getImage(`nav/close.png`)" @click="switchAsideMenu(false)">
        </div>
    </Transition>

</template>

<script setup lang="ts" name="MobildHeader">

// 是否展示侧面菜单
const showAsideMenu = ref(false)
const route = useRoute()
const { locales, locale, setLocale } = useI18n()

const activePath = computed(() => {
    return route.path
})

const menuList = computed(() => [
    { title: t('nav.home'), path: '/home' },
    { title: t('nav.aboutus'), path: '/aboutus' },
    { title: t('nav.services'), path: '/services' },
    { title: t('nav.joinus'), path: '/joinus' },
    { title: t('nav.contactus'), path: '/contactus' },
])

function switchAsideMenu(show: boolean) {
    showAsideMenu.value = show
    if (show) {
        document.body.className = 'no-scroll'
    } else {
        document.body.className = ''
    }
}

</script>

<style scoped lang="scss">
.mobile-header {
    height: $height-navbar-mobile;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .menu-icon {
        width: 30px;
        cursor: pointer;
    }

    .logo {
        background-image: url('/images/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0;
        height: 70%;
        width: 150px;
        cursor: pointer;
    }
}

.slide-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: rgba(0, 0, 0, 0.7);
    background-color: $color-main;
    z-index: 1000;
    // transform: translateX(-100%);
    // transition: transform 0.3s ease-in-out;

    .menu-close {
        position: absolute;
        top: 60px;
        right: 15px;
        width: 40px;
        cursor: pointer;
    }

    .menu-body {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 70px);
        height: 100%;
        background-color: white;
        padding: 60px 1em;
        box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);

        span {
            display: block;
            padding: 10px;
            cursor: pointer;

            &.menu-active {
                background-color: $color-background;
            }
        }

        .langs {
            padding: 10px;
            border: none;
            width: 100%;
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

    // &.slide-open {
    //     transform: translateX(0);
    // }
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>
