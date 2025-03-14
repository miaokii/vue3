<template>
    <div :class="['app-nav-body', {'navbar-blur':state.isScrolled}]">
        <div class="nav-content">
            <img class="nav-logo" :src="utils.getImage('logo.png')" alt="" @click="toHome">
            <div class="nav-items">
                <el-link v-for="(item, idx) in navlist" :key="idx" @click="taped(item)" :underline="false"> {{
                    item.title }}
                </el-link>
                <el-link :underline="false">
                    <img :src="utils.getImage('image.png')" alt="">
                </el-link>
            </div>
        </div>
        <div class="progress-bar" :style="{width: state.progress + '%'}"></div>
    </div>
</template>

<script setup lang="ts" name="AppNav">
import { removeLocal } from '@/common/ts/utils'
import { onMounted, onUnmounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const state = reactive({
    routeName: '',
    progress: 0,
    isScrolled: false
})

const updateScrollProgress = () => {
    
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    // state.progress = (window.scrollY/scrollHeight) * 100
    state.progress = (scrollTop/scrollHeight) * 100
    state.isScrolled = scrollTop >= 100
}

onMounted(()=>{
    window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(()=>{
    window.removeEventListener('scroll', updateScrollProgress)
})

interface NavItem {
    title: string
    routeName?: string
    tapFunc?: () => void
}

const exit = () => {
    removeLocal('token')
    window.location.href = '/'
}

function toHome() {
    router.push({ name: 'home' })
}

const navlist: NavItem[] = [
    { title: '工作台', routeName: 'work' },
    { title: '用户', routeName: 'user' },
    { title: '地图', routeName: 'map' },
    { title: '小蜜蜂', routeName: 'bee' },
    { title: '关于', routeName: 'about' },
    { title: '退出', tapFunc: exit }
]

function taped(item: NavItem) {
    if (item.routeName) {
        router.push({ name: item.routeName })
    } else if (item.tapFunc) {
        item.tapFunc()
    }
}

</script>

<style scoped lang="scss">
.app-nav-body {
    height: 100px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background: white;
    z-index: 1000;
    transition: 0.2s ease;

    .progress-bar {
        height: 4px;
        width: 20%;
        position: absolute;
        bottom: 0;
        border-radius: 2px;
        // 进度颜色
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 1%, var(--color-primary) 100%);
        // 平滑过度
        transition: 0.2s linear;
    }
}

.navbar-blur {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
}

.nav-content {
    max-width: 1280px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .nav-logo {
        height: 60%;
    }

    .nav-items {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .el-link {
            cursor: pointer;
            padding: 0 0.5rem;

            img {
                height: 60px;
                aspect-ratio: 1;
                object-fit: cover;
                border-radius: 50%;
            }
        }
    }

    ul li:last-child {
        padding-right: 0;
    }
}
</style>