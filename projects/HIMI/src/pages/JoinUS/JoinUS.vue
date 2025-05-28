<template>
    <ImageHead :path="getAssetsImages(`joinus/back.png`)" />
    <JoinHead/>
    <JoinForm/>
</template>

<script setup lang="ts" name="joinus">
import ImageHead from '@/components/ImageHead.vue';
import JoinForm from './views/JoinForm.vue';
import JoinHead from './views/JoinHead.vue';
import getAssetsImages from '@/utils/pubUse';

</script>

<style scoped>

</style>