<template>
    <div class="pager-body center-body">
        <nuxt-link v-if="page>1" :to="`/${feed}/${page-1}`">&lt; prev</nuxt-link>
        <span v-else class="pager-item-disable">&lt; prev</span>
        <span>{{ page }} / {{ maxPage }}</span>
        <nuxt-link v-if="hasMore" :to="`/${feed}/${page+1}`">more &gt;</nuxt-link>
        <span v-else class="pager-item-disable">more &gt;</span>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    feed: string,
    page: number,
    maxPage: number
}>()

const hasMore = computed(()=>{
    return props.page < props.maxPage
})

</script>

<style scoped lang="scss">

.pager-body {
    display: flex;
    justify-content: center;
    gap: 4rem;
    padding: 15px 30px;
    user-select: none;
    background: white;
    color: $color-text-main;

    & a {
        cursor: pointer;
    }

    .pager-item-disable {
        opacity: 0.7;
    }
}

</style>