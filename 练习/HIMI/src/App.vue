<template>
  <!-- <div class="center-line"></div> -->
  <AppNavigation />
  <div class="router-body">
  <RouterView />
  </div>
  <AppFooter/>

</template>

<script setup lang="ts" name="app">

import AppNavigation from "@/components/AppNavigation.vue"
import AppFooter from "@/components/AppFooter.vue"

</script>

<style scoped>
.center-line {
  width: 2px;
  height: 100vh;
  background-color: var(--color-border);
  position: fixed;
  top: 0;
  left: calc((100vw - 2px) / 2);
  z-index: 999;
}

.router-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>