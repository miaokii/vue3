<template>

    <ul class="setting-list-box">
        <li class="setting-list-item" v-for="(item, idx) in list" :key="idx" @click="settingClick(item)">
            <div class="list-item-left">
                <img v-if="item.icon" :src="getAssetsImages(`mine/${item.icon}`)" alt="">
                <span>{{ item.title }}</span>
            </div>
            <van-icon name="arrow" />
        </li>
    </ul>

</template>

<script setup lang="ts" name="settingList">
import { getAssetsImages } from '@/common/ts/utils';
import type { SettingItem } from '@/types/User';
import { useRouter } from 'vue-router';

defineProps<{
    list: Array<SettingItem>
}>()

const router = useRouter()

function settingClick(item: SettingItem) {
    if (item.action) {
        item.action()
    } else if (item.path) {
        router.push(item.path)
    } else if (item.url) {
        router.push({path:'/protocol', query:{url: item.url, title: item.title}})
    }
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.setting-list-box {
    .setting-list-item {
        .flex();
        height: 45px;
        background: white;
        padding: 5px 15px;

        .list-item-left {
            .flex();

            img {
                width: 20px;
                padding-right: 10px;
            }
        }

        .van-icon {
            color: #999999;
        }
    }
}
</style>