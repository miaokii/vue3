<template>
    <div :class="['work-item', isRight ? 'work-item-background' : '']">
        <img :src=workItem.image alt="" :class="['work-item-img', isRight ? 'leftImgHide' : 'leftImgShow']">
        <div class="work-item-body">
            <div class="work-item-title">{{ workItem?.title }}</div>
            <ul class="work-item-content">
                <li v-for="(item, idx) in workItem?.content" :key="idx">{{ item }}</li>
            </ul>
        </div>
        <img :src=workItem?.image alt="" :class="['work-item-img', isRight ? 'rightImgShow' : 'rightImgHide']">
    </div>
</template>

<script setup lang="ts" name="work-item">
import type { WorkItem } from '@/types/WorkItem';
import { computed, onMounted } from 'vue';

let props = defineProps<{
    workItem: WorkItem,
    index: number
}>()

let isRight = computed(() => {
    return props.index % 2 == 0
})

</script>

<style scoped>
.work-item {
    padding: 5rem 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.work-item-background {
    background-color: var(--color-background-soft);
}

.work-item-body {
    width: 40%;
}

.rightImgShow, .leftImgShow {
    display: inline;
}

.rightImgHide, .leftImgHide {
    display: none;
}

.work-item-img {
    width: 55%;
    transition: 0.25s ease;
}

.work-item-title {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 1em;
}

.work-item-content {
    padding-left: 0;
    font-size: 16px;
    color: var(--vt-c-text-light-2);
    list-style-position: inside;
}

.work-item-content li {
    margin: 5px 0;
}

.work-item img:hover {
    transform: scale(1.04);
}

@media (max-width: 800px) {
    .work-item {
        padding: 2rem 3rem;
        flex-direction: column;
    }

    .work-item-body {
        width: 100%;
    }

    .work-item-img {
        margin-top: 2rem;
        width: 100%;
    }

    .work-item-title {
        font-size: 2rem;
        margin-bottom: 0.6em;
    }

    .rightImgHide {
        display: inline;
    }

    .leftImgShow {
        display: none;
    }
}
</style>