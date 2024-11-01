<template>
    <div class="home">
        <h1>插槽</h1>
        <div class="content">
            <Category title="热门游戏">
                <ul>
                    <li v-for="game in games" :key="game.id">{{ game.name }}</li>
                </ul>
            </Category>
            <Category title="热门城市">
                <img :src="imageUrl" alt=""></img>
            </Category>
            <Category title="热门影视">
                <video :src="videoUrl" controls></video>
            </Category>
        </div>
    </div>
</template>

<script setup lang="ts" name="Home">
import { reactive } from 'vue';
import Category from './Category.vue';
import { nanoid } from 'nanoid';

let games = reactive([
    { id: nanoid(), name: '英雄联盟' },
    { id: nanoid(), name: '守望先锋' },
    { id: nanoid(), name: '穿越火线' },
    { id: nanoid(), name: '无畏契约' },
    { id: nanoid(), name: '黑神话悟空' },
])

let imageUrl = 'https://saas.rongxk.com/png/login-bg-fb829a14.png'
let videoUrl = 'http://vjs.zencdn.net/v/oceans.mp4'

</script>

<style scoped>
.home {
    background-color: lightgray;
    padding: 20px;
    border-radius: 10px;
}

.content {
    display: flex;
    justify-content: space-evenly;
}

img, video {
    width: 100%;
}
</style>


