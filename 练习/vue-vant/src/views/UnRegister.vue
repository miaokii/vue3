<template>
    <div class="unregister-box">
        <NavBar title="注销" />
        <div class="back"></div>
        <div class="handle-body">
            <img :src="getAssetsImages('mine/icon_me_unregister.png')" alt="">
            <div class="body-title">账号注销重要提示</div>
            <div class="msg-body" v-for="(item, idx) in msgs" :key="idx">
                <div class="msg-title">{{ item[0] }}</div>
                <div class="msg-item" v-for="txt in item[1]" :key="txt">{{ txt }}</div>
            </div>
        </div>

        <div class="unregister-body">
            <van-checkbox v-model="state.checked" icon-size="17px">
                <span>我确认已阅读并了解以上信息，且自愿放弃账号内全部数据、权益资产及服务</span>
            </van-checkbox>

            <van-button round text="确认注销" type="primary" block @click="unregisterHandle"></van-button>
        </div>

    </div>
</template>

<script setup lang="ts" name="unRegister">
import { getAssetsImages } from '@/common/ts/utils';
import NavBar from '@/components/NavBar.vue';
import { unregister } from '@/services/mine';
import { useUserStore } from '@/stores/useUser';
import { showFailToast } from 'vant';
import { reactive } from 'vue';

const state = reactive({
    checked: false
})

const user = useUserStore()

const msgs = [
    ['注销前请认真阅读以下内容。账号一旦注销，您将无法使用该账号，包括但不限于：', [
        "1、无法登录、使用好信车贷账号，并移除该账号下所有绑定的登录方式",
        "2、账号重置为默认头像、昵称重置为“用户已注销”",
        "3、移除该账号下的所有认证身份，且无法恢复",
        "4、该账号下的个人资料和历史信息等都无法找回",
        "5、账户中所有的资产及权益被清除",
        "6、无法继续交易，售后等流程"
    ]],
    ['注销申请条件', [
        "1、账号处于正常状态，账号没有被盗、被封等风险",
        "2、没有正在使用中的商业产品、业务等”",
        "3、没有正在进行的交易"
    ]]
]

async function unregisterHandle() {
    if (!state.checked) {
        return showFailToast('请阅读注销信息，并勾选确认注销')
    }
    // await unregister()
    user.logoutUser().then(()=>{
        window.location.href = '/'
    })
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;    
}

.unregister-box {
    margin-top: calc(var(--van-nav-bar-height) + 15px);
    padding: 25px;
}

.handle-body {
    .flex();
    flex-direction: column;
    margin-bottom: 140px;
    position: relative;

    img {
        width: 30%;
    }

    .body-title {
        font-size: 17px;
        margin: 20px 0;
    }

    .msg-body {
        margin-top: 20px;
        width: 100%;

        .msg-title {
            margin-bottom: 20px;
        }

        .msg-item {
            font-size: 13px;
            color: #666;
        }
    }
}

.unregister-body {
    font-size: 13px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;

    padding: 20px;

    span {
        color: #666;
    }

    .van-button {
        margin-top: 20px;
    }
}
</style>