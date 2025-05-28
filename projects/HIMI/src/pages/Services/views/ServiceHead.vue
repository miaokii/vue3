<template>
    <ImageHead :path="getAssetsImages(`services/back.png`)" />
</template>

<script setup lang="ts" name="serviceHead">
import ImageHead from '@/components/ImageHead.vue';
import getAssetsImages from '@/utils/pubUse';
</script>

<style scoped></style>