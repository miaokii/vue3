<template>
    <div class="product-list-wrap">
        <div class="product-list-head van-hairline--bottom">
            <div class="category-header wrap">
                <van-icon name="arrow-left" class="icon20" @click="goBack" />
                <div class="search-header">
                    <van-icon name="search" class="icon20" />
                    <input type="text" class="search-title" v-model="state.keyword" placeholder="全场50元起">
                </div>
                <span class="search-btn" @click="searchClick" v-if="state.keyword">搜索</span>
                <span v-else></span>
            </div>
            <van-tabs type="card" color="#1baeae" @click-tab="changeTab">
                <van-tab title="推荐" name=""></van-tab>
                <van-tab title="新品" name="new"></van-tab>
                <van-tab title="价格" name="price"></van-tab>
            </van-tabs>
        </div>

        <div class="content">
            <van-pull-refresh head-height="60" class="product-list-refresh" v-model="state.refreshing"
                @refresh="onRefresh">
                <van-list v-model:loading="state.loading" :finished="state.finished"
                    :finished-text="state.productList.length ? '没有更多了' : '搜索想要的商品'" @load="onLoad" :offset="10">
                    <template v-if="state.productList.length">
                        <div class="product-item" v-for="item in state.productList" :key="item.goodsId"
                            @click="productDetail(item)">
                            <img :src="prefix(item.goodsCoverImg)" alt="">
                            <div class="product-info">
                                <p class="name">{{ item.goodsName }}</p>
                                <p class="sub-title">{{ item.goodsIntro }}</p>
                                <span class="price">¥{{ item.sellingPrice }}</span>
                            </div>
                        </div>
                    </template>
                    <img v-else src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="搜索" class="empty">
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script setup lang="ts" name="productList">
import { prefix } from '@/common/ts/utils';
import type { Goods } from '@/interfaces/Home';
import { search } from '@/service/goods';
import { isSwitchStatement } from 'typescript';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const state = reactive({
    // 搜索关键词
    keyword: '',
    // 显示搜索按钮
    searchBtn: false,
    // 
    selectActive: false,
    // 正在下啦刷新
    refreshing: false,
    // 正在加载
    loading: false,
    // 没有更多数据
    finished: false,
    // 产品列表
    productList: [] as Goods[],
    // 总共的页数
    totalPage: 0,
    // 当前页
    page: 0,
    // 排序参数
    orderBy: ''
})

const route = useRoute()
const router = useRouter()

const requestList = async () => {
    // 分类id
    const { categoryId } = route.query
    if (!categoryId && !state.keyword) {
        state.finished = true
        state.loading = false
        state.refreshing = false
        return
    }
    const param: object = {
        pageNumber: state.page + 1,
        goodsCategoryId: categoryId,
        keyword: state.keyword,
        orderBy: state.orderBy
    }
    const { data, data: { list } } = await search(param)

    // 品类下的商品
    state.productList = state.productList.concat(list)
    state.totalPage = data.totalPage
    state.page = data.currPage
    state.loading = false
    state.refreshing = false

    // 没有更多数据了
    if (state.page >= data.totalCount || state.productList.length == data.totalCount) {
        state.finished = true
    }
}

function goBack() {
    router.go(-1)
}

function searchClick() {
    onRefresh()
}

// 正在上拉加载更多
function onLoad() {
    if (state.refreshing) {
        state.page = 0
        state.productList = []
    }
    requestList()
}

// 切换tab
function changeTab(obj: { name: string }) {
    if (state.orderBy === obj.name) return
    state.orderBy = obj.name
    onRefresh()
}

// 刷新
function onRefresh() {
    state.refreshing = true
    state.finished = false
    state.loading = true
    onLoad()
}

// 商品详情
function productDetail(item: Goods) {
    router.push({ path: `/product/${item.goodsId}` })
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.product-list-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: #fff;
    padding-bottom: 10px;

    .category-header {
        background: #fff;
        .wh(100%, 50px);
        .fj();
        align-items: center;
        padding: 0 15px;
        line-height: 50px;
        font-size: 15px;
        z-index: 1000;

        &.active {
            background: @primary;
        }

        .search-header {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background-color: #f7f7f7;
            border-radius: 15px;
            color: gray;

            .icon20 {
                padding-right: 10px;
            }

            .search-title {
                height: 30px;
                font-size: 13px;
                background: inherit;
            }
        }
    }
}

.content {
    height: calc(~"(100vh - 90px)");
    overflow: hidden;
    overflow-y: scroll;
    margin-top: 90px;
}

.product-list-refresh {
    // height: 100%;

    .product-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;

        img {
            width: 30%;
            margin: 10px;
        }

        .product-info {
            display: flex;
            flex-direction: column;

            .name {
                font-size: 15px;
                font-weight: 500;
            }

            .sub-title {
                color: lightgray;
                font-size: 12px;
                line-height: 15px;
                padding: 10px 0;
            }

            .price {
                color: @primary;
            }
        }
    }

    .empty {
        display: block;
        width: 50%;
        height: 100%;
        margin: 50px auto 20px;
    }
}
</style>