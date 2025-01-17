<template>
  <div id="app">
    <!-- 结构component -->
    <router-view v-slot="{ Component }">
      <keep-alive  :include="cachedComponents">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed, KeepAlive, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

let router = useRouter();
let state = reactive({
  transitionName: 'slide-left'
});

const route = useRoute()
const cachedComponents = computed(() => {
  return router.options.routes.filter(item => item.meta?.keepAlive).map(route => route.name).join(',')
})

router.beforeEach((to, from) => {
  if (to.meta.index > from.meta.index) {
    // 向左滑动
    state.transitionName = 'slide-left';
  } else if (to.meta.index < from.meta.index) {
    // 由次级到住级
    state.transitionName = 'slide-right';
  } else {
    // 无过渡效果
    state.transitionName = '';
  }
});

</script>

<style scoped lang="less">
html,
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

#app {
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  // 变换后背面的元素是否可见
  backface-visibility: hidden;
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}

.van-badge--fixed {
  z-index: 1000;
}
</style>