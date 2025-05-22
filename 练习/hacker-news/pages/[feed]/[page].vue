<template>
    <!-- 分页 -->
    <div class="page-view">
        <pagination :page="page" :max-page="maxPage" :feed="feed" />
        <div :key="displayedPage" class="news-list">
            <div v-if="loading" class="loading"></div>
            <ul>
                <div v-for="item in items" :key="item.id">{{ item.title }}</div>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    // 中间件
    middleware: 'feed'
})

/// 当前页面路由
const route = useRoute()
/// 路由
const router = useRouter()
// 从路由中获取当前页面页码
// 计算属性 page：用于获取当前路由参数中的页码（page），并将其转换为数字类型。
// +route.params.page 的意思是将 route.params.page 转换为数字类型（+ 是一元加号运算符，等价于 Number(route.params.page)）。
const page = computed(() => +route.params.page || 1)
// 从路由中获取当前页面类型
const feed = computed(() => route.params.feed as keyof typeof feedsInfo)
// !! 的意思是将一个值强制转换为布尔类型（Boolean）。
// 第一个 ! 会把值转为布尔值并取反，第二个 ! 再取反，得到原本的布尔值。
// 例如：!!0 为 false，!!'abc' 为 true，!!null 为 false。
// 这里用于判断 feedsInfo[feed.value] 是否存在（即 feed 是否有效）。
const isValidFeed = computed(() => !!feedsInfo[feed.value])

/// 当前页面页码
const pageNo = computed(() => +page.value || 1)
/// 展示的页码
const displayedPage = ref(pageNo.value)

/// 状态管理
const state = useStore()
/// 从状态管理里获取item列表
const items = computed(() => getFeed(state.value, { page: pageNo.value, feed: feed.value }) || [])
/// 是否正在加载
const loading = computed(() => items.value.length === 0)

/// 最大页码
const maxPage = computed(() => {
    return +(feedsInfo[feed.value].pages || 0)
})

/**
 * 处理页码变更
 * @param to 目标页码
 */
function pageChanged(to: number) {
    // 如果 feed 类型无效，则直接返回
    if (!isValidFeed.value) { return }

    // 如果目标页码小于等于0，或者大于等于最大页码，则重定向到第一页
    if (to <= 0 || to >= maxPage.value) {
        router.replace(`/${feed.value}/1`)
        return
    }

    // 拉取新页的数据
    fetchFeed({
        feed: feed.value,
        page: page.value + 1
    })
    .catch(()=>{}) // 忽略错误

    // 更新当前展示的页码
    displayedPage.value = to
}

// onMounted 钩子会在组件挂载到页面后执行一次。
// 当页面首次加载时，调用 pageChanged(page.value)，
// 以确保根据当前的页码参数加载对应的数据。
onMounted(()=>{
    pageChanged(page.value)
})

// 监听 page 变量的变化，每当 page 发生变化时，调用 pageChanged 方法处理页码变更
watch(page, to => pageChanged(to))

</script>

<style lang="scss" scoped></style>