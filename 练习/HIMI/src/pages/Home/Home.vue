<template>
    <Welcome />
    <Introduce />
    <ServiceList :in-home="true"/>
    <HomeAbout/>
</template>

<script setup lang="ts" name="home">
import Welcome from './views/Welcome.vue'
import Introduce from './views/Introduce.vue'
import ServiceList from '../Services/views/ServiceList.vue';
import HomeAbout from './views/HomeAbout.vue'

</script>

<style scoped>
</style>