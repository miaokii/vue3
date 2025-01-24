<template>
    <van-nav-bar :class="white ? 'white' : 'black'" @click-left="onClickLeft" :border="border" fixed
        safe-area-inset-top :title="title" left-arrow>
    </van-nav-bar>
</template>

<script setup lang="ts" name="navBar">

const props = withDefaults(defineProps<{
    title: string,
    border?: boolean,
    white?: boolean
}>(), {
    border: false,
    white: false
})

function onClickLeft() {
    history.back()
}

</script>

<style scoped lang="less">
/deep/ .van-icon-arrow-left {
    font-size: 20px;
    color: inherit;
}

/deep/ .van-nav-bar__title {
    color: inherit;
}

.black {
    color: black;
}

.white {
    color: white;
}
</style>