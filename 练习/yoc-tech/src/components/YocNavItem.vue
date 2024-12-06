<template>
    <div></div>
    <RouterLink :to="{path}" active-class="head-nav-list-active">{{ title }}</RouterLink>
</template>

<script setup lang="ts" name="nav-item">
defineProps<{
    title: string,
    path: string
}>();
</script>

<style scoped>

.head-nav-list a {
    padding-right: 5rem;
    font-size: 17px;
}

.head-nav-list-active {
    color: var(--color-main);
}

.head-nav-list-active::before {
    content: ' ';
    border-left: 3px solid var(--color-main);
    font-size: 0.9em;
    line-height: 0.9em;
}

</style>