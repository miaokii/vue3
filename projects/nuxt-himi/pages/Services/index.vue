<template>
    <div class="services-page">
        <page-head :path="getImage(`services/back.png`)" />
        <services-view :is-home-page="false"/>
    </div>
</template>

<script setup lang="ts" name="name">

</script>

<style scoped>
.services-page {
    display: flex;
    flex-direction: column;
    gap: 4em;
}

</style>