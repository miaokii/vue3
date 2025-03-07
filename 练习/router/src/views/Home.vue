<template>
    <div class="home-body">
        <nav class="home-nav">
            <img class="nav-logo" :src="utils.getImage('logo.png')" alt="">
            <ul class="nav-list">
                <li v-for="(item, idx) in navlist" :key="idx" @click="push(idx)"
                    :class="[idx == state.idx ? 'nav-list-selected' : '']">{{ item.title }}</li>
            </ul>
        </nav>
        <div class="home-header-main">
            <header class="home-header">
                <div class="home-title">首页</div>
                <ul class="home-user">
                    <li>导航</li>
                    <li>手册</li>
                    <li>消息</li>
                    <li>设置</li>
                    <li @click="exitLogin">退出</li>
                    <li>
                        <img :src="utils.getImage('image.png')" alt="">
                    </li>
                </ul>
            </header>
            <main class="home-main">
                <RouterView />
            </main>
        </div>

    </div>
</template>

<script setup lang="ts" name="Home">
import { removeLocal, setLocal } from '@/common/ts/utils';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const state = reactive({
    idx: 0
})

const router = useRouter()
const navlist = [
    { title: '用户', name: 'user' },
    { title: '工作台', name: 'work' },
    { title: '地图', name: 'map' },
    { title: '小蜜蜂', name: 'bee'}
]

function push(idx: number) {
    let name = navlist[idx].name || ''
    router.push({ name })
    state.idx = idx
}

function exitLogin() {
    removeLocal('token')
    router.push({name: 'login'})
}

</script>

<style scoped lang='less'>
.home-body {
    height: 100%;
    display: flex;

    .home-nav {
        width: var(--nav-width);
        height: 100%;
        background: var(--color-main);
        display: flex;
        flex-direction: column;
        align-items: center;

        .nav-logo {
            padding: 15px 0;
            width: 50%;
        }

        .nav-list {
            width: 100%;
            color: white;

            li {
                padding: 15px;
                cursor: pointer;
            }
        }

        .nav-list-selected {
            background: var(--color-main-heavy);
        }
    }

    .home-header-main {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;

        .home-header {
            background: white;
            width: 100%;
            height: var(--header-height);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 1rem;

            .home-title {
                font-size: 1.1rem;
                font-weight: bold;
            }

            .home-user {
                display: flex;
                align-items: center;

                li {
                    padding: 0 1rem;
                    cursor: pointer;
                }
            }

            .home-user img {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 25px;
            }
        }

        .home-main {
            background: #F6F7F9;
            flex: 1;
        }
    }
}
</style>