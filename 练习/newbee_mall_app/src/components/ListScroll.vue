<template>
    <!-- 滚动的父级 -->
    <div ref="wrapper" class="scroll-wrapper">
        <slot></slot>
    </div>
</template>

<script setup lang="ts" name="list-scroll">
import type { GoodsCategory } from '@/interfaces/Category';
import BScroll, { createBScroll } from 'better-scroll';
import { nextTick, onMounted, onUpdated, ref, toRef } from 'vue';
// 事件
const emit = defineEmits(['click', 'beforeScroll', 'afterScroll', 'scroll', 'pullDown'])
// 属性
let props = withDefaults(defineProps<{
    // 列表数据
    scrollData: Array<GoodsCategory>,
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType?: number,
    // 点击列表是否派发click事件
    click?: boolean,
    // 是否横向滑动
    scrollX?: boolean,
    // 是否派发滚动事件
    listenScroll?: boolean,
    // 是否派发滚动到顶部的事件，用于上拉加载
    pullUp?: Function,
    // 是否派发滚动到底部的事件，用于上拉加载
    pullDown?: Function,
    // 是否派发列表滚动到开始的事件
    beforeScroll?: boolean,
    // 当数据更新后，刷新scroll的延迟
    refreshDelay?: number
}>(), {
    probeType: 1,
    click: true,
    scrollX: false,
    listenScroll: false,
    beforeScroll: false,
    pullUp: undefined,
    pullDown: undefined,
    refreshDelay: 20
})

onMounted(() => {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
        initScroll()
    }, 20);
})

onUpdated(() => {
    nextTick(()=>{
        bs.refresh()
    })
})

let bs: BScroll
const wrapper = ref()

function initScroll() {
    bs = createBScroll(wrapper.value, {
        probeType: props.probeType,
        click: props.click,
        scrollX: props.scrollX
    })
    if (props.beforeScroll) {
        bs.on('beforeScrollStart', () => {
            emit('beforeScroll')
        })
        bs.on('scrollEnd', () => {
            emit('afterScroll')
        })
    }

    if (props.listenScroll) {
        bs.on('scroll', (position: { x: number, y: number }) => {
            emit('scroll', position)
        })
    }

    if (props.pullUp != undefined) {
        bs.on('pullingUp', () => {
            try {
                (props.pullDown as Function)().then(() => {
                    bs.finishPullUp()
                })
            } catch (e) {
                // 传入非 Promise 函数
                bs.finishPullUp()
            }
        })
    }

    if (props.pullDown != undefined) {
        bs.on('pullingDown', () => {
            try {
                (props.pullDown as Function)().then(() => {
                    bs.finishPullDown()
                })
            } catch (e) {
                // 传入非 Promise 函数
                bs.finishPullDown()
            }
        })
    }
}

</script>

<style scoped>
.scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    touch-action: pan-y;
}
</style>