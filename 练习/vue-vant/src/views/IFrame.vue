<template>
    <div class="iframe">
        <NavBar :title="title as string" />
        <iframe class="protocol-box" :src="protocolUrl" frameborder="0"></iframe>
    </div>
</template>

<script setup lang="ts" name="IFrame">
import { appConfig } from '@/common/ts/config';
import NavBar from '@/components/NavBar.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const {url, title} = useRoute().query

const protocolUrl = computed(()=>{
    return `${appConfig.protocolUrl}/${url}`
})

</script>

<style scoped>

.protocol-box {
    width: 100%;
    height: 100vh;
}

</style>