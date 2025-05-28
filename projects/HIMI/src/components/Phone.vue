<template>
    <a :href="url">{{ phone }}</a>
</template>

<script setup lang="ts" name="name">
import { computed } from 'vue';

let props = defineProps<{
    phone: string
}>()

let url = computed(()=>{
    return `tel:${props.phone}`
})
</script>

<style scoped>

</style>