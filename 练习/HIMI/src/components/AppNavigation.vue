<template>
    <!-- 小屏导航栏 -->
    <div class="nav-menu-body" v-if="showNavMenus">
        <img class="nav-menu-item" :src="getAssetsImages(`nav/menu.png`)" alt="nav-menu"
            @click="showAsideMenu = true" />
        <div class="nav-logo" @click="pushHome"></div>
        <div></div>
    </div>
    <!-- 宽屏导航  -->
    <div class="nav-body" v-if="!showNavMenus">
        <div class="nav-logo" @click="pushHome"></div>
        <div class="nav-list">
            <!-- 导航item -->
            <span :class="activePath === item.path ? 'nav-list-active' : ''" v-for="(item, idx) in nav_list" :key="idx"
                @click="changeTab(item.path)">{{ item.title }}</span>
            <!-- 切换语言 -->
            <select class="nav-list-langs" v-model="nowlocal">
                <option v-for="local in $i18n.availableLocales" :key="'local-${local}'" :value="local">
                    {{ local }}
                </option>
            </select>
        </div>
    </div>

    <!-- 侧面划入的导航页面 -->
    <div :class="['nav-slide-menu', showAsideMenu ? 'nav-slide-open' : 'nav-slide-close']" v-if="showNavMenus">
        <div class="nav-slide-menu-body">
            <!-- 导航item -->
            <span :class="activePath === item.path ? 'nav-list-active' : ''" v-for="(item, idx) in nav_list" :key="idx"
                @click="changeTab(item.path)">{{ item.title }}</span>
            <!-- 切换语言 -->
            <select class="nav-list-langs" v-model="nowlocal" @change="showAsideMenu = false">
                <option v-for="local in $i18n.availableLocales" :key="'local-${local}'" :value="local">
                    {{ local }}
                </option>
            </select>
            <div class="black-area" @click="showAsideMenu = false">

            </div>
        </div>
        <div class="nav-slide-close-body" @click="showAsideMenu = false">
            <img class="nav-slide-menu-close" :src="getAssetsImages(`nav/close.png`)" alt="nav-slide-close">
        </div>
    </div>
</template>

<script setup lang="ts" name="navigation">
import { nowlocal, t } from '@/i18n';
import getAssetsImages from '@/utils/pubUse';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

let router = useRouter()
let route = useRoute()

let nav_list = computed(() => {
    return [
        { path: '/home', title: t('nav.home') },
        { path: '/aboutus', title: t('nav.aboutus') },
        { path: '/services', title: t('nav.services') },
        { path: '/joinus', title: t('nav.joinus') },
        { path: '/contactus', title: t('nav.contactus') },
    ]
})

let showNavMenus = ref(false)
let showAsideMenu = ref(false)

let activePath = computed(() => {
    return route.path
})

function pushHome() {
    router.push('/')
}


// 监听屏幕变化
onMounted(() => {
    window.addEventListener('resize', checkScreenSize)
})

// 清理监听事件
onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})

function checkScreenSize() {
    // 查询屏幕宽度
    showNavMenus.value = window.innerWidth <= 650
}

function changeTab(path: string) {
    if (activePath.value != path) {
        router.push(path)
    }

    if (showAsideMenu) {
        showAsideMenu.value = false
    }
}

checkScreenSize();

</script>

<style scoped>
/* 小屏幕的导航栏 */
.nav-menu-body {
    height: 70px;
    margin: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-menu-item {
    width: 35px;
    cursor: pointer;
}

/* 测划入的导航页面 */
.nav-slide-menu {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-main);
    display: flex;
}

.nav-slide-menu-body {
    width: 85%;
    height: 100%;
    background-color: var(--color-background);
    padding: 2.5rem;

    display: flex;
    flex-direction: column;
}

.nav-slide-menu-body span,
.nav-slide-menu-body select {
    padding: 1rem 0;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
}

.black-area {
    /* 填充剩余的宽度 */
    flex: 1;
}

.nav-slide-close-body {
    width: 15%;
    height: 100%;
    text-align: center;
}

.nav-slide-menu-close {
    width: 40px;
    /* margin: 0 calc((15% - 30px) / 2); */
    margin-top: 20px;
}

.nav-slide-open {
    transition: 0.25s ease;
    opacity: 1;
    visibility: visible;
}

.nav-slide-close {
    transition: 0.25s ease;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
}

/* 正常状态的导航栏 */
.nav-body {
    height: 70px;
    padding: 0 5rem;
    background-color: var(--color-background);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-logo {
    background-image: url('@/assets/images/logo.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0;
    height: 70%;
    width: 180px;
    cursor: pointer;
}

.nav-list {
    margin-left: 1rem;
    font-weight: bold;
    font-family: inherit;
    font-size: 1rem;
    text-align: end;
}

.nav-list span {
    margin-right: inherit;
    font-weight: inherit;
    margin-right: 1rem;
    cursor: pointer;
}

.nav-list span:hover {
    color: var(--color-main-hover);
}

.nav-list-active {
    color: var(--color-main-hover);
}

.nav-list-langs {
    border: none;
    background-color: transparent;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    appearance: none;
}

.nav-list-langs:hover,
.nav-list-langs:focus {
    outline: none;
}


@media (max-width: 1200px) {
    .nav-body {
        padding: 0 2rem;
    }
}

@media (max-width: 1100px) {
    .nav-body {
        padding: 0 1rem;
    }

    .nav-list span {
        margin-right: 0.8rem;
    }
}

@media (max-width: 1000px) {
    .nav-logo {
        height: 60%;
    }

    .nav-list span {
        margin-right: 0.5rem;
    }
}
</style>