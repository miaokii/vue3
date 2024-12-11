<template>
    <div class="child">
        
        <h2>{{ song.name }}</h2>
        <h3>{{ song.artistsname }}</h3>
        <img class="songImg" :src="song.picurl" alt="">
        <br>
        <audio :src="song.url" controls></audio>

        <h3>{{ song.nickname }}</h3>
        <p>{{ song.content }}</p>

    </div>
</template>

<script setup lang="ts" name="Child">
import axios from 'axios';
import {type SongComment} from './types';

let {data:{data}} = await axios.get('https://api.uomg.com/api/comments.163?format=json')
let song: SongComment = data
console.log(song);


</script>

<style scoped>

.child {
    background-color: skyblue;
    padding: 20px;
}

.songImg {
    width: 50%;
}

</style>