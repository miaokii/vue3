<template>
    <div class="user-box">
        <simple-header name="我的" />
        <van-skeleton title :avatar="true" :row="3" :loading="state.loading">
            <div class="user-info">
                <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" alt="">
                <div class="user-desc">
                    <span>昵称：{{ state.user.nickName }}</span>
                    <span>登录名：{{ state.user.loginName }}</span>
                    <span class="name">个性签名：{{ state.user.introduceSign }}</span>
                </div>
            </div>
        </van-skeleton>

        <ul class="user-list">
            <li class="van-hairline--bottom" @click="">
                <span>我的订单</span>
                <van-icon name="arrow" />
            </li>
            <li class="van-hairline--bottom" @click="">
                <span>账号管理</span>
                <van-icon name="arrow" />
            </li>
            <li class="van-hairline--bottom" @click="">
                <span>地址管理</span>
                <van-icon name="arrow" />
            </li>
            <li class="van-hairline--bottom" @click="">
                <span>关于我们</span>
                <van-icon name="arrow" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="user">
import SimpleHeader from '@/components/SimpleHeader.vue';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { type UserInfo } from '@/interfaces/User';
import { getUserInfo } from '@/service/user';
const router = useRouter()

const state = reactive({
    loading: true,
    user: {} as UserInfo,
})

onMounted(async () => {
    const data = await getUserInfo()
    state.user = data
    state.loading = false
})

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.user-box {
    padding: 15px;
    .user-info {
        background: linear-gradient(90deg, @primary, #51c7c7);
        box-shadow: 0 2px 5px #269090;
        border-radius: 10px;
        padding: 15px;
        margin-top: 5px;

        display: flex;
        align-items: center;

        img {
            .wh(60px, 60px);
            border-radius: 50%;
        }

        .user-desc {
            display: flex;
            flex-direction: column;
            margin-left: 15px;
            color: white;

            span {
                font-size: 14px;
                padding: 2px 0;
            }
        }
    }

    .user-list {
        margin-top: 20px;
        li {
            height: 45px;
            line-height: 45px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            align-items: center;
            
            .van-icon {
                color: lightgray;
            }
        }
    }
}
</style>