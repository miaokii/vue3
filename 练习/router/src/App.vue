<template>
    <header v-if="logined">
        <app-nav></app-nav>
    </header>
    <main>
        <RouterView></RouterView>
    </main>
    <footer>
        <AppFooter/>
    </footer>
</template>

<script setup lang="ts" name="name">
import { computed } from 'vue';
import AppNav from './components/AppNav.vue';
import { getLocal } from './common/ts/utils';
import AppFooter from './components/AppFooter.vue';

// 是否登录
const logined = computed(() => {
    return (getLocal('token') || '').length > 0
})

</script>

<style scoped>
main {
    max-width: 1280px;
    min-height: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    padding-top: 100px;
}
</style>