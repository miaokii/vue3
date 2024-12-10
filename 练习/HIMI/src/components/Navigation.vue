<template>
    <div class="nav-menu-body" v-if="showNavMenus">
        <img class="nav-menu-item" :src="getAssetsImages(`nav/view-list.png`)" alt="nav-menu"
            @click="showAsideMenu = true">
        <span class="nav-logo"><span class="nav-himi">HIMI</span> CONSULTING</span>
        <div></div>
    </div>
    <div class="nav-body" v-if="!showNavMenus">
        <span class="nav-logo"><span class="nav-himi">HIMI</span> CONSULTING</span>
        <div class="nav-list">
            <!-- 导航item -->
            <span :class="activePath===item.path ? 'nav-list-active':''" v-for="(item, idx) in nav_list" :key="idx" @click="changeTab(item.path)">{{ item.title }}</span>
            <!-- 切换语言 -->
            <select class="nav-list-langs" v-model="$i18n.locale">
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
            <span :class="activePath===item.path ? 'nav-list-active':''" v-for="(item, idx) in nav_list" :key="idx" @click="changeTab(item.path)">{{ item.title }}</span>
            <!-- 切换语言 -->
            <select class="nav-list-langs" v-model="$i18n.locale" @change="showAsideMenu=false">
                <option v-for="local in $i18n.availableLocales" :key="'local-${local}'" :value="local">
                    {{ local }}
                </option>
            </select>
        </div>
        <img class="nav-slide-menu-close" :src="getAssetsImages(`nav/close.png`)" alt="nav-slide-close"
            @click="showAsideMenu = false">
    </div>
</template>

<script setup lang="ts" name="navigation">
import { t } from '@/i18n';
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

let activePath = computed(()=>{
    return route.path
})
// const activeTab = computed(()=>route.path.replace('/', '').toUpperCase())


// 监听屏幕变化
onMounted(() => {
    window.addEventListener('resize', checkScreenSize)
})

// 清理监听事件
onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})

function checkScreenSize() {
    console.log('平米宽度：', window.innerWidth);

    // 查询屏幕宽度
    showNavMenus.value = window.innerWidth <= 650
}

function changeTab(path: string) {
    if (activePath != path) {
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
    width: 40px;
}

/* 测划入的导航页面 */
.nav-slide-menu {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-main);
    display: flex;
    align-items: start;
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
    padding: 5px 0;
    font-weight: bold;
}

.nav-slide-menu-close {
    width: 30px;
    margin: 0 calc((15% - 30px) / 2);
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

@keyframes nav-slide-show {
    form {
        transform: translateX(-100%);
    }
    to {
        transform: none;   
    }
}

@keyframes nav-slide-hide {
    form {
        transform: none;
    }
    to {
        transform: translateX(-100%);   
    }
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
    font-size: 2rem;
    letter-spacing: 2px;
    line-height: 1;
}

.nav-himi {
    color: var(--color-main-hover);
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
        font-size: 1.5rem;
    }

    .nav-list span {
        margin-right: 0.5rem;
    }
}
</style>