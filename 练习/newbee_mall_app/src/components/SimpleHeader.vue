<template>
    <header class="simple-header van-hairline--bottom">
        <van-icon v-if="!isBack" class="icon20" name="arrow-left" @click="goBack"/>
        <span v-else></span>
        <div class="simple-header-name">{{ name }}</div>
        <van-icon class="icon20" name="ellipsis" />
    </header>
    <div class="block"></div>
</template>

<script setup lang="ts" name="sipmle_header">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
    name?: string,
    back?: string,
    noback?: string
}>();

const isBack = ref(props.noback || false)
const router = useRouter()
const emit = defineEmits(['callback'])
const goBack = () => {
    if (!props.back) {
        router.go(-1)
    } else {
        router.push(props.back)
    }
    emit('callback')
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    padding: 0 10px;
    .fj();
    align-items: center;
    .wh(100%, 50px);
    line-height: 44px;
    .boxSizing();
    color: #252525;
    background: #fff;

    .simple-header-name {
        font-size: 15px;
    }
}

.block {
    height: 44px;
}
</style>