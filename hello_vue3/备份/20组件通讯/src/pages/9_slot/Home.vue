<template>
    <div class="home">
        <h1>插槽</h1>
        <div class="content">
            <!-- 作用域插槽 -->
            <Game>
                <template v-slot="params">
                    <!-- 解构 -->
                <!-- <template v-slot="{games}"> -->
                    <ol>
                        <li v-for="game in params.games" :key="game.id">{{ game.name }}</li>
                    </ol>
                </template>
            </Game>
            
            <!-- 具名插槽 -->
            <NameCategory>
                <template #s2>
                    <img :src="imageUrl" alt=""></img>
                </template>
                <template v-slot:s1>
                    <h2>热门城市</h2>
                </template>
            </NameCategory>

            <!-- 默认插槽 -->
            <Category title="热门影视">
                <video :src="videoUrl" controls></video>
            </Category>
        </div>
    </div>
</template>

<script setup lang="ts" name="Home">
import { reactive } from 'vue';
import Category from './Category.vue';
import NameCategory from './NameCategory.vue';
import Game from './Game.vue';

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

img,
video {
    width: 100%;
}

h2 {
    background-color: orange;
    height: 50px;
    text-align: center;
    align-content: center;
    font-size: 25px;
    font-weight: 500;
    margin-top: 0;
}
</style>
