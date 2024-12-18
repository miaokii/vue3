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

// import { onMounted, onUnmounted } from "vue";

// // 不允许调试
// function preventContextMenu(event: Event) {
//   event.preventDefault()
// }

// // 监听屏幕变化
// onMounted(() => {
//     window.addEventListener('contextmenu', preventContextMenu)
// })

// // 清理监听事件
// onUnmounted(() => {
//     window.removeEventListener('contextmenu', preventContextMenu)
// })

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