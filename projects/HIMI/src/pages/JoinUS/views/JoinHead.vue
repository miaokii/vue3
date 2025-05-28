<template>
    <div class="body-m join-head-body">
        <h2>{{ $t('join.join_us') }}</h2>
        <div class="join-body">
            <img :src="getAssetsImages(`joinus/needyou.png`)" alt="">
            <div>{{ $t('join.join_content') }}</div>
        </div>
    </div>
</template>

<script setup lang="ts" name="joinHead">
import getAssetsImages from '@/utils/pubUse';

</script>

<style scoped>

.join-head-body {
    text-align: center;
}

.join-body {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
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
        margin-bottom: 1rem;
    }

    .join-body div {
        width: 100%;
        margin-left: 0;
        text-align: center;
    }
}
</style>