<template>
    <div class="join-head-body">
        <div class="join-back"></div>
        <h2>{{ $t('join.join_us') }}</h2>
        <div class="body-m join-body">
            <img :src="getAssetsImages(`joinus/needyou.png`)" alt="">
            <div>{{ $t('join.join_content') }}</div>
        </div>
    </div>
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
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 2rem;
    margin-bottom: 3rem;
}

.join-body img {
    width: 45%;
}

.join-body div {
    width: 45%;
    margin-left: 5rem;
    text-align: start;
}

@media (max-width: 650px) {
    .join-body {
        flex-direction: column;
        align-items: center;
    }


    .join-body img {
        width: 50%;
    }

    .join-body div {
        width: 100%;
        margin-left: 0;
        text-align: center;
    }
}
</style>