<script setup lang="ts">

const route = useRoute()
// ID
const id = computed(() => +route.params.id | 0)

const [resultItem, resultComments] = await Promise.all([fetchItem(id.value), fetchComments(id.value)])
// 解构
const { data: item } = toRefs(resultItem)
const { data: comments, loading: commentsLoading } = toRefs(resultComments)

useHead({
    title: item.value?.title
})

</script>

<template>
    <div class="center-body item-view">
        <!-- 没有title的情况 -->
        <div v-if="!item?.url && !item?.title" class="item-view-header">
            <h1>Page Not Found</h1>
        </div>
        <template v-else>
            <!-- 头部 -->
            <div class="item-view-header">
                <template v-if="item.url && isAbsolute(item.url)">
                    <a :href="item.url" target="_blank" rel="noopener">
                        <h1 v-text="item.title" />
                    </a>
                    <span class="host">({{ host(item.url) }})</span>
                </template>
                <template v-else>
                    <h1 v-text="item.title" />
                    <div v-if="item.content" class="content" v-html="item.content" />
                </template>

                <p class="meta">
                    {{ item.points }} points | by
                    <nuxt-link :to="`/user/` + item.user">{{ item.user }}</nuxt-link>
                    {{ timeAgo(+item.time) }} ago
                </p>
            </div>

            <!-- 间距 -->
            <div style="background-color: white; margin-top: 1em;"></div>
            <!-- 评论内容 -->
            <load-spinner v-if="commentsLoading" />
            <div v-else class="item-view-comments">
                <div class="comments-header">
                    {{ comments ? comments.length + ' comments' : 'No comments yet.' }}
                </div>
                <ul class="comment-children">
                    <post-comment v-for="child in comments" :key="child.id" :comment="child"/>
                </ul>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.item-view {
    &-header {
        background-color: white;
        padding: 2em;
        box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.1);

        h1 {
            font-size: 1.5em;
        }

        .content {
            margin-top: 1em;
            display: flex;
            flex-direction: column;
            gap: 1em;
            padding-bottom: 1em;
        }

        .host,
        .meta,
        .meta a {
            color: #595959;
        }

        .meta a {
            text-decoration: underline;
            &:hover {
                color: $color-primary;
                cursor: pointer;
            }
        }
    }

    &-comments {
        background-color: #fff;
        padding: 1em 2em;

        .comments-header {
            font-size: 1.1em;
        }
    }
}
</style>