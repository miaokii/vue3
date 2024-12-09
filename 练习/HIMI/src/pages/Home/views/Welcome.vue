<template>
    <div class="welcome-body">
        <span>{{ $t('home.welcome_home') }}</span>
        <button class="border-button welcome_find_more">{{ $t('home.find_more') }}</button>
    </div>
</template>

<script setup lang="ts" name="welcome">

</script>

<style scoped>


/* 首页背景 */
.welcome-body {
    background-image: url("@/assets/images/home/welcome.png");
    background-repeat: no-repeat;
    background-size: cover;
    height: 70vh;
    color: var(--color-background);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.welcome-body span {
    font-size: 2rem;
    font-family: futura-pt-weight;
    /* text-shadow: 0 0 10px lightgray; */
    margin-bottom: 1rem;
}

.welcome_find_more {
    border: none;
    background-color: var(--color-main);
    color: inherit;
    height: 60px;
    border-radius: 30px;
}
</style>