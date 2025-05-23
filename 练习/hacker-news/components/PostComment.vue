<script setup lang="ts">
import type { Item } from '~/types';

defineProps<{
    comment: Item
}>()

const open = ref(true)

function pluralize(n: number) {
    return n + (n === 1 ? ' replay' : ' replies')
}

</script>

<template>

    <li v-if="comment && comment.user" class="comment">
        <div class="by">
            <nuxt-link :to="`/user/` + comment.user">{{ comment.user }}</nuxt-link>
            {{ timeAgo(comment.time) }} ago
        </div>

        <div class="text" v-html="comment.content" />
        <div class="toggle" v-if="comment.comments && comment.comments.length" :class="{ open }">
            <a @click="open = !open">{{ open ? '[-]' : '[+]' + pluralize(comment.comments.length) + ' collapsed' }}</a>
        </div>
        <ul v-show="open" class="comment-children">
            <post-comment v-for="child in comment.comments" :comment="child" :key="child.id" />
        </ul>
    </li>

</template>

<style lang="scss" scoped>
// 子评论缩进
.comment-children {
    .comment-children {
        margin-left: 1.5em;
    }
}

.comment {
    margin-top: 1rem;
    border-top: 1px solid $color-background;
    // padding: 1em 0;
    font-size: 0.9rem;

    .by,
    .text,
    .toggle {
        margin: 1em 0;
        a {
            text-decoration: underline;
            &:hover {
                color: $color-primary;
                cursor: pointer;
            }
        }
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 1em;
        overflow-wrap: break-word;

        & pre {
            white-space: pre-wrap;
        }
    }

    .toggle {
        background-color: #fffbf2;
        padding: 0.3em 0.5em;
        border-radius: 4px;

        & a {
            color: #222;
            cursor: pointer;
        }

        &.open {
            padding: 0;
            background-color: transparent;
            margin-bottom: -1.6em;
        }
    }
}
</style>