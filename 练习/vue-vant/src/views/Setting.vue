<template>
    <div class="setting-box">
        <NavBar title="设置" />
        <div class="setting-list">
            <SettingList :list="settingList"/>
        </div>
    </div>
</template>

<script setup lang="ts" name="setting">
import NavBar from '@/components/NavBar.vue';
import SettingList from '@/components/SettingList.vue';
import { useUserStore } from '@/stores/useUser';
import type { SettingItem } from '@/types/User';
import { showConfirmDialog } from 'vant';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const user = useUserStore()
const settingList = computed(() => {
    let list = [
        {
            icon: 'icon_me_order.png',
            title: '用户协议',
            action: ()=>{
                router.push('/provicy')
            }
        }
    ] as Array<SettingItem>
    if (user.isLogin) {
        list = list.concat([
            {
                icon: 'icon_me_setting.png',
                title: '注销账户',
                action: unregister
            },
            {
                icon: 'icon_me_setting.png',
                title: '退出登录',
                action: logout
            }
        ])
    }
    return list
})

function logout() {
    showConfirmDialog({
        title: '提示',
        message: '确认退出登录吗',
        width: '80%',
    }).then(()=>{
        user.logoutUser().then(()=>{
            window.location.href = '/'
        })
    }).catch(()=>{})
}

function unregister() {
    router.push('/unregister')
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.setting-box {
    margin-top: calc(var(--van-nav-bar-height) + 15px);
    .setting-list {
        margin: 15px;
        .borderRadius(15px);
        overflow: hidden;
    }
}
</style>