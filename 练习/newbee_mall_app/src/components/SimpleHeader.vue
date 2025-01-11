<template>
    <header class="simple-header van-hairline--bottom">
        <i v-if="!isBack" class="nbicon nbfanhui" @click="goBack"></i>
        <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <div class="simple-header-name">{{ name }}</div>
        <i class="nbicon nbmore"></i>
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
const goBack = () => {
    if (!props.back) {
        router.go(-1)
    } else {
        router.push(props.back)
    }
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