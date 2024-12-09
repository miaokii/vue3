<template>

  <Navigation />
  <RouterView />
  <Footer></Footer>

</template>

<script setup lang="ts" name="app">

import Navigation from "@/components/Navigation.vue"
import Footer from "@/components/Footer.vue"

</script>

<style scoped></style>