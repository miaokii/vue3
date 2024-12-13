<template>
    <div class="welcome-body">
        <span>{{ $t('home.welcome_home') }}</span>
        <button class="border-button" @click="pushServices">{{ $t('home.find_more') }}</button>
    </div>
</template>

<script setup lang="ts" name="welcome">
import { useRouter } from 'vue-router';

let router = useRouter()
function pushServices() {
    router.push('/services')
}

</script>

<style scoped>
/* 首页背景 */
.welcome-body {
    background-image: url("@/assets/images/home/welcome.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0;
    height: 75vh;
    width: 100%;
    color: var(--color-background);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.welcome-body span {
    font-size: 2rem;
    font-family: futura-pt-weight;
    margin: 0 1rem;
    margin-bottom: 1rem;
    text-align: center;
}

.border-button {
    border: none;
    background-color: var(--color-main);
    color: inherit;
    height: 60px;
    border-radius: 30px;
}

.border-button:hover {
    opacity: 0.9;
}

@media (max-width: 650px) {
    .welcome-body span {
        margin: 0 2rem;
        text-shadow: 0 0 20px var(--color-main);
    }
}
</style>