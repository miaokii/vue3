<template>
    <div class="provicy-box">
        <NavBar title="用户协议" />

        <div class="provicy-list">
            <SettingList :list="settingList"/>
        </div>
    </div>
</template>

<script setup lang="ts" name="Provicy">
import NavBar from '@/components/NavBar.vue';
import SettingList from '@/components/SettingList.vue';
import type { SettingItem } from '@/types/User';
import { URLEnum } from '@/uils/APIEnum';
import { computed } from 'vue';


const settingList = computed(() => {
    let list: Array<SettingItem> = [
        {
            title: '用户协议',
            url: URLEnum.registerProtocol
        }, {
            title: '隐私政策',
            url: URLEnum.userPrivacyPolicy
        }, {
            title: '第三方服务、SDK采集个人信息清单',
            url: URLEnum.thirdAppSDK
        }, {
            title: '个人信息收集与使用清单',
            url: URLEnum.newUserInfo
        }
    ]

    return list
})

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.provicy-box {
    .provicy-list {
        margin: 15px;
        margin-top: calc(var(--van-nav-bar-height) + 15px);
        .borderRadius(15px);
        overflow: hidden;
    }
}
</style>