<template>
    <a :href="url">{{ mail.to }}</a>
</template>

<script setup lang="ts" name="mail">
import { computed } from 'vue';

let mail = withDefaults(defineProps<{
    to: string,
    from?: string,
    subject?: string,
    body?: string
}>(), {
    from: '',
    subject: '',
    body: ''
})


let url = computed(() => {
    return `mailto:${mail.to}?subject=${mail.subject}&body=${mail.body}`
})
</script>

<style scoped lang="scss">

a {
    color: inherit;
    &:hover {
        color: $color-main-hover;
    }   
}
</style>