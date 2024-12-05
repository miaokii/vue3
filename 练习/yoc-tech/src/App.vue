<template>
  <header class="yoc-nav-container">
    <YocNav class="yoc-nav" />
  </header>
  <main class="router-container">
    <RouterView />
  </main>
  <YocFooter />
  <YocCopyright />
</template>

<script setup lang="ts" name="app">
import YocCopyright from './components/YocCopyright.vue';
import YocFooter from './components/YocFooter.vue';
import YocNav from './components/YocNav.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
.yoc-nav-container {
  width: 100%;
  height: var(--navigation-height);
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  box-shadow: 0 10px 20px lightgray;
  background: var(--vt-c-white);
}

.yoc-nav {
  width: 90%;
}

.router-container {
  padding-top: var(--navigation-height);
}
</style>