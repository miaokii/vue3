<script setup lang="ts">

const route = useRoute()
// ID
const id = computed(()=> +route.params.id | 0)

const [ resultItem, resultComments ] = await Promise.all([fetchItem(id.value), fetchComments(id.value)])
// 解构
const { data: item } = toRefs(resultItem)
const { data: comments, loading: commentsLoading} = toRefs(resultComments)

useHead({
    title: item.value?.title
})

</script>

<template>
    <div class="center-body item-view">
        
    </div>
</template>

<style scoped lang="scss">
</style>