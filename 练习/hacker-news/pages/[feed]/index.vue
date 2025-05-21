<template>
    <div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'feed'
})

</script>