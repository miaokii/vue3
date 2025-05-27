<!-- git@github.com:nuxt/hackernews.git -->
<template>
    <nuxt-layout>
        <!-- <nuxt-page :transition="{
        name: 'bounce',
        mode: 'out-in'
      }" /> -->

      <nuxt-page/>
    </nuxt-layout>
</template>

<script setup lang="ts">

useHead({
    title: 'Hacker News',
    meta: [
        { name: "description", content: 'Hacker News clone built with Nuxt 3'},
        { name: 'og:title', content: 'Hacker News' },
        { name: 'og:type', content: 'website' },
        { name: 'og:image', content: '/logo.png' },
        { name: 'og:url', content: 'https://hackernews.nuxtjs.org/' },
        { name: 'description', content: 'Hacker News clone built with Nuxt 3' },
    ]
})

useSeoMeta({
    title: 'Hacker News',
    description: 'Hacker News clone built with Nuxt 3',
    ogTitle: 'Hacker News',
    ogType: 'website',
    ogImage: '/logo.png',
    ogUrl: 'https://hackernews.nuxtjs.org/',
})

</script>

<style scoped>

/* 页面之间过渡，添加css */

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

/* 页面和布局之间过渡 */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}

</style>