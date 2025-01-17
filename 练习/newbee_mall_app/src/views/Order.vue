<template>
    <div class="class">
        <simple-header name="我的订单" />
        <van-tabs class="order-tabs" v-model="state.currentTab" @change="onChangeTab" title-active-color="#1baeae"
            animated swipeable>
            <van-tab title="全部" name=""></van-tab>
            <van-tab title="待付款" name="0"></van-tab>
            <van-tab title="待确认" name="1"></van-tab>
            <van-tab title="待发货" name="2"></van-tab>
            <van-tab title="已完成" name="3"></van-tab>
            <van-tab title="交易完成" name="4"></van-tab>
        </van-tabs>

        <!-- 订单列表 -->
        <div class="content">
            <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" class="order-list-refresh">
                <van-list v-model="state.loading" :finished="state.finished" finished-text="没有更多数据了" @load="onLoad"
                    @offset="10">
                    <div class="order-item-box" v-for="item in state.list" :key="item.orderId" @click="goto(item.orderNo)">
                        <div class="order-item-header">
                            <span>订单时间：{{ item.createTime }}</span>
                            <span>{{ item.orderStatusString }}</span>
                        </div>
                        <van-card v-for="order in item.newBeeMallOrderItemVOS" :key="order.goodsId" 
                            :num="order.goodsCount" :price="order.sellingPrice" desc="全场包邮" :title="order.goodsName"
                            :thumb="prefix(order.goodsCoverImg)"/>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script setup lang="ts" name="name">
import { prefix } from '@/common/ts/utils';
import SimpleHeader from '@/components/SimpleHeader.vue';
import type { OrderItem } from '@/interfaces/Order';
import { order } from '@/service/order';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const state = reactive({
    currentTab: '',
    loading: false,
    finished: true,
    refreshing: false,
    list: [] as OrderItem[],
    page: 0,
    totalPage: 0
})

async function loadData() {
    let param = {
        pageNumber: state.page + 1,
        status: state.currentTab
    }

    const { data: {list, totalPage, currPage, totalCount} } = await order(param)
    state.list = state.list.concat(list)
    state.totalPage = totalPage
    state.page = currPage
    state.finished = currPage >= totalPage || state.list.length >= totalCount
}

const onChangeTab = (obj: string) => {
    state.currentTab = obj    
    onRefresh()
}

function onRefresh() {
    state.page = 0
    state.refreshing = true
    state.loading = true
    state.finished = false
    onLoad()
}

async function onLoad() {
    if (state.refreshing) {
        state.list = []
        state.refreshing = false
    }
    loadData()
}

function goto(orderNo: string) {
    router.push({path: '/order-detail', query: { orderNo }})
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.order-tabs {
    margin: 0 10px;
}

.order-item-box {
    padding: 0 15px;

    .order-item-header {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        font-size: 12px;
    }

    .van-card {
        border-radius: 2px;
    }
}

</style>