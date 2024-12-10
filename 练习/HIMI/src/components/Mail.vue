<template>
    <a :href="url">{{ mail.from }}</a>
</template>

<script setup lang="ts" name="mail">
import { computed } from 'vue';

let mail = defineProps<{
    from:string,
    to?: string,
    subject?:string,
    body?:string
}>()

let url = computed(()=>{
    return `mailto:${mail.to}?subject=${mail.subject}&body=${mail.body}`
})

function sendMail() {
    // <a href="mailto:sample@fly63.com?subject=test&cc=sample@hotmail.com&subject=主题&body=内容">send mail</a>
}
</script>

<style scoped>

</style>