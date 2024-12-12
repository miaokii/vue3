<template>
    <Welcome />
    <Introduce />
    <ServiceList :in-home="true" />
    <HomeAbout />
    <HIMIMap class="map-body body-m" />
</template>

<script setup lang="ts" name="home">
import Welcome from './views/Welcome.vue'
import Introduce from './views/Introduce.vue'
import ServiceList from '../Services/views/ServiceList.vue';
import HomeAbout from './views/HomeAbout.vue'
import HIMIMap from '@/components/HIMIMap.vue';

</script>

<style scoped>
.map-body {
    padding: 1rem 7vw 0.5em 7vw;
    aspect-ratio: 2.2;
    min-height: 35vh;
}

@media (max-width: 650px) {
    .map-body {
        padding: 1rem;
    }
}
</style>