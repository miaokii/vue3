<template>
    <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
        <router-view v-slot="{ Component }">
            <!-- <transition name="slide" mode="out-in"> -->
                <component :is="Component" />
            <!-- </transition> -->
        </router-view>
    </van-config-provider>
</template>

<script setup lang="ts" name="app">
import { RouterView } from 'vue-router';
import { themeVars } from './common/ts/VantConfig';

</script>

<style lang="less">
@import './common/style/mixin.less';

// .slide-enter-active,
// .slide-leave-active {
//     transition: all 0.75s ease-out;
// }

// .slide-enter-to {
//     position: absolute;
//     left: 0;
// }

// .slide-enter-from {
//     position: absolute;
//     left: -100%;
// }

// .slide-leave-to {
//     position: absolute;
//     right: -100%;
// }

// .slide-leave-from {
//     position: absolute;
//     right: 0;
// }
</style>