<template>
    <div class="join-head-body">
        <div class="join-back"></div>
        <h2>{{ $t('join.join_us') }}</h2>
        <div class="body-m join-body">
            <img :src="getAssetsImages(`joinus/needyou.png`)" alt="">
            <div>{{ $t('join.join_content') }}</div>
        </div>
    </div>
    <div class="divider"></div>
</template>

<script setup lang="ts" name="joinHead">
import getAssetsImages from '@/utils/pubUse';

</script>

<style scoped>
.join-back {
    height: 26vw;
    background-image: url('@/assets/images/joinus/back.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.join-head-body {
    text-align: center;
}

.join-body {
    margin: 0 7rem;
    display: flex;
    align-items: flex-start;
}

.join-body img {
    width: 45%;
}

.join-body div {
    width: 45%;
    margin-left: 5rem;
    text-align: start;
}

.divider {
    margin: 2rem 7rem;
    height: 1px;
    background-color: var(--color-border);
}
</style>