<template>
    <div class="user-body">
        <img :src="utils.getImage('image.png')" alt="">
        <div class="user-name">{{ getLocal('token') }}</div>
        <div class="user-welcome">Hello, Welcome To My Page!</div>
    </div>
</template>

<script setup lang="ts" name="User">
import { getLocal } from '@/common/ts/utils';

</script>

<style scoped lang="less">
.user-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 200px;
        border: 4px solid white;
        // <offset-x> <offset-y> <blur-radius> <spread-radius> <color> <inset>;
        box-shadow: 5px 5px 10px gray;
    }

    .user-name {
        padding-top: 2rem;
        font-weight: bold;
        font-size: 2rem;
    }

    .user-welcome {
        color: gray;
    }
}
</style>