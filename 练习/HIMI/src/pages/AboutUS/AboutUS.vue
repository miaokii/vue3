<template>
    <ImageHead :path="getAssetsImages(`aboutus/aboutus.png`)" />
    <AboutWho />
    <AboutSpecial />
</template>

<script setup lang="ts" name="about">
import ImageHead from '@/components/ImageHead.vue';
import AboutWho from './views/AboutWho.vue';
import AboutSpecial from './views/AboutSpecial.vue';
import getAssetsImages from '@/utils/pubUse';

</script>

<style scoped></style>