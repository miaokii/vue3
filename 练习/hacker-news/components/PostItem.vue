<script lang="ts" setup>
import type { Item } from '~/types';
defineProps<{
    item: Item
}>()
</script>

<template>
    <li class="news-item">
        <span class="score" title="Score">{{ item.points }}</span>
        <span class="title">
            <!-- <template v-if="isAbsolute(item.url ?? '')">
                <a :href="item.url" target="_blank" rel="noopener"> {{ item.title }}</a>
                <span class="host"> ({{ host(item.url ?? '') }})</span>
            </template>
            <template v-else> -->
                <nuxt-link :to="'/item/' + item.id"> {{ item.title }} </nuxt-link>
            <!-- </template> -->
        </span>
        <br>
        <span class="meta">
            <span v-if="item.type !== 'job'" class="by">by
                <nuxt-link :to="'/user/' + item.user">{{ item.user }}</nuxt-link>
            </span>
            <span class="time">
                {{ timeAgo(item.time) }} ago
            </span>
            |
            <span v-if="item.type !== 'job'" class="comments-link">
                <nuxt-link :to="'/item/' + item.id">{{ item.comments_count }} comments</nuxt-link>
            </span>
        </span>
    </li>
</template>

<style scoped lang="scss">
.news-item {
    padding: 20px 30px 20px 80px;
    border-bottom: 1px solid $color-background;
    line-height: 20px;
    position: relative;
    .score {
        color: #2e495e;
        font-size: 1.1rem;
        font-weight: 700;
        position: absolute;
        left: 0;
        width: 80px;
        text-align: center;
        // 垂直居中
        top: 50%;
        margin-top: -10px;
    }

    .meta, .host {
        color: #595959;
        font-size: 0.85rem;

        & span {
            margin: 0 0.2em;
        }

        & a {
            color: inherit;
            text-decoration: underline;

            &:hover {
                color: $color-primary;
            }
        }
    }
}
</style>