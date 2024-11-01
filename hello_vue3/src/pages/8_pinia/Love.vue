<template>
    <div class="loveTalk">
        <button @click="addTalk">添加一句情话</button>
        <button @click="deleteTalk">删除一句情话</button>
        <ul>
            <li v-for="item in loveStore.loveList" :key="item.id">{{ item.content }}</li>
        </ul>
    </div>
</template>

<script setup name='Love' lang="ts">
import { useLoveStore } from './store/love';

let loveStore = useLoveStore()

// 订阅store数据改变
loveStore.$subscribe((mutate, state) => {
    // console.log('loveStore内数据改变', mutate, state);
    localStorage.setItem('talkList', JSON.stringify(state.loveList))
})

function addTalk() {
    loveStore.getALoveTalk()
}

function deleteTalk() {
    loveStore.deleteALoveTalk()
}

</script>

<style scoped>
.loveTalk {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
}

button {
    margin-right: 20px;
    margin-bottom: 20px;
}
</style>