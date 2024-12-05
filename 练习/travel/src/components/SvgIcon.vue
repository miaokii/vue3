<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#${iconName}`"></use>
    </svg>
</template>

<script setup lang="ts" name="SvgIcon">
defineProps(['iconName'])
</script>

<style scoped></style>