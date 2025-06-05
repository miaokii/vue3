<template>
    <MoblieHeader v-if="isMobileNav" />
    <PCHeader v-else />
</template>

<script setup lang="ts" name="name">

const isMobileNav = ref(false)

const updateScreenSize = () => {
    isMobileNav.value = window.innerWidth < 750
}

onMounted(() => {
    updateScreenSize() // 首次加载时设置
    window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize)
})

</script>

<style scoped></style>