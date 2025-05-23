<script setup lang="ts">
defineProps<{
    loading: boolean
}>()
</script>

<template>
    <div class="center-body load-wrapper">
        <!-- 正在加载时显示加载圈 -->
        <div v-if="loading">
            <load-spinner />
        </div>
        <!-- 加载结束，模板显示加载结果 -->
        <slot v-else />
    </div>
</template>

<style scoped lang="scss">
.load-wrapper {
    background-color: white; 
    border-top: 2.5px solid $color-background;
}

</style>