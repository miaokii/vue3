<template>
    <div class="page-view">
        <pagination :page="page" :max-page="maxPage" :feed="feed" />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'feed'
})

const route = useRoute()
const router = useRouter()
const page = computed(() => +route.params.page || 1)
const feed = computed(() => route.params.feed as keyof typeof feedsInfo)
const isValidFeed = computed(() => !!feedsInfo[feed.value])

const pageNo = computed(() => page.value || 1)
const displayedPage = ref(pageNo.value)

/// 最大页码
const maxPage = computed(() => {
    return +(feedsInfo[feed.value].pages || 0)
})

function pageChanged(to: number) {
    if (!isValidFeed.value) { return }

    if (to <= 0 || to >= maxPage.value) {
        router.replace(`/${feed.value}/1`)
        return
    }

    // fetchFeed(feed.value,page.value,
    // ).catch(() => {})
}

</script>

<style lang="scss" scoped></style>