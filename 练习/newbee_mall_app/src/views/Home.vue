<template>
    <div>
        <!-- 导航栏 -->
        <header class="home-header wrap" :class="{ 'active': state.headerScroll }">
            <!-- 菜单按钮 -->
            <RouterLink tag="i" to="./category"><van-icon class="icon20" name="wap-nav" /></RouterLink>
            <!-- 搜索框 -->
            <div class="header-search">
                <span class="app-name">新蜂商城</span>
                <RouterLink tag="span" class="search-title" to="./product-list?form=home">山河无恙，人间皆安</RouterLink>
            </div>
            <!-- 登录按钮 -->
            <RouterLink class="login" tag="span" to="./login" v-if="!state.isLogin">登录</RouterLink>
            <!-- 用户信息按钮 -->
            <RouterLink class="login" tag="span" to="./user" v-else>
                <van-icon class="icon20" name="manager-o"></van-icon>
            </RouterLink>
        </header>

        <!-- 轮播图 -->
        <swiper :list="state.swipeList" />

        <!-- 分类 -->
        <div class="category-list">
            <div v-for="item in state.categoryList" :key="item.categoryId" @click="tips">
                <img :src="item.imgUrl" alt="">
                <span>{{ item.name }}</span>
            </div>
        </div>

        <!-- 新品上线 -->
        <div class="good">
            <header class="good-header">新品上线</header>
            <!-- 骨架 -->
            <van-skeleton title :row="3" :loading="state.loading">
                <div class="good-box">
                    <div class="good-item" v-for="item in state.newGoodses" :key="item.goodsId"
                        @click="goToDetail(item)">
                        <img :src="prefix(item.goodsCoverImg)" alt="">
                        <div class="good-desc">
                            <div class="title">{{ item.goodsName }}</div>
                            <div class="price">{{ item.sellingPrice }}</div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
        </div>

        <!-- 热门商品 -->
        <div class="good">
            <header class="good-header">热门商品</header>
            <!-- 骨架 -->
            <van-skeleton title :row="3" :loading="state.loading">
                <div class="good-box">
                    <div class="good-item" v-for="item in state.hots" :key="item.goodsId" @click="goToDetail(item)">
                        <img :src="prefix(item.goodsCoverImg)" alt="">
                        <div class="good-desc">
                            <div class="title">{{ item.goodsName }}</div>
                            <div class="price">{{ item.sellingPrice }}</div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
        </div>

        <!-- 推荐商品 -->
        <div class="good" :style="{ marginBottom: '100px' }">
            <header class="good-header">推荐商品</header>
            <!-- 骨架 -->
            <van-skeleton title :row="3" :loading="state.loading">
                <div class="good-box">
                    <div class="good-item" v-for="item in state.recommends" :key="item.goodsId"
                        @click="goToDetail(item)">
                        <img :src="prefix(item.goodsCoverImg)" alt="">
                        <div class="good-desc">
                            <div class="title">{{ item.goodsName }}</div>
                            <div class="price">{{ item.sellingPrice }}</div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
        </div>
        <nav-bar />
    </div>
</template>

<script setup lang="ts" name="home">
import { closeToast, showDialog, showLoadingToast, showToast, Swipe } from 'vant';
import { onMounted, reactive, nextTick, onActivated } from 'vue';
import { getHome } from '@/service/home';
import navBar from '@/components/Tabbar.vue';
import swiper from '@/components/Swiper.vue';
import type { Goods, HomeCarousel } from '@/interfaces/Home';
import { prefix } from '@/common/ts/utils';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

defineOptions({
    name: 'home'
})

const router = useRouter()
const cart = useCartStore()
const state = reactive({
    isLogin: false,
    // 轮播图
    swipeList: [] as HomeCarousel[],
    // 滑动透明判断
    headerScroll: false,
    // 热销
    hots: [] as Goods[],
    // 新品
    newGoodses: [] as Goods[],
    // 推荐
    recommends: [] as Goods[],
    // 分类
    categoryList: [
        {
            name: '新蜂超市',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
            categoryId: 100001
        }, {
            name: '新蜂服饰',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
            categoryId: 100003
        }, {
            name: '全球购',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
            categoryId: 100002
        }, {
            name: '新蜂生鲜',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
            categoryId: 100004
        }, {
            name: '新蜂到家',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
            categoryId: 100005
        }, {
            name: '充值缴费',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
            categoryId: 100006
        }, {
            name: '9.9元拼',
            imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
            categoryId: 100007
        }, {
            name: '领劵',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
            categoryId: 100008
        }, {
            name: '省钱',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
            categoryId: 100009
        }, {
            name: '全部',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
            categoryId: 100010
        }
    ],
    // 加载中
    loading: true
})

// 判断token是否存在
onMounted(async () => {

});

onActivated(() => {
    requestHome()
})

nextTick(() => {
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 100 ? state.headerScroll = true : state.headerScroll = false
    })
})

async function requestHome() {

    const token = localStorage.getItem('token');
    if (token) {
        state.isLogin = true
        cart.updateCart()
    }

    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
    });

    const { data } = await getHome()

    state.swipeList = data.carousels
    state.hots = data.hotGoodses
    state.newGoodses = data.newGoodses
    state.recommends = data.recommendGoodses
    state.loading = false

    closeToast()
}

function tips() {
    showToast('功能暂未开放，敬请期待')
}

function goToDetail(good: Goods) {
    router.push({ path: `/product/${good.goodsId}` })
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.home-header {
    // 固定定位
    position: fixed;
    left: 0;
    top: 0;
    // 宽高
    .wh(100%, 50px);
    // flex布局
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    padding: 0 15px;
    // 从border开始计算
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;
    color: @primary;
    background: rgba(255, 255, 255, 0.7);

    // 嵌套类
    .nbmenu2 {
        color: @primary;
    }

    // home-header.active的样式
    &.active {
        background: @primary;

        .nbmenu2,
        .login,
        .van-icon {
            color: #fff;
        }
    }

    // 搜索栏
    .header-search {
        display: flex;
        width: 70%;
        line-height: 20px;
        margin: 10px 0;
        padding: 5px 0;
        color: #232323;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 20px;

        .app-name {
            padding: 0 10px;
            color: @primary;
            font-weight: bold;
            border-right: 1px solid #666;
        }

        .search-title {
            color: #666;
            padding-left: 10px;
            font-size: 12px;
        }
    }
}

.category-list {
    display: flex;
    // 不允许缩小
    flex-shrink: 0;
    // 宽度不足时，换行
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 10px;

    div {
        display: flex;
        flex-direction: column;
        width: 20%;
        text-align: center;

        img {
            .wh(36px, 36px);
            margin: 13px auto 8px auto;
        }

        span {
            font-size: 12px;
        }
    }
}

.good {
    .good-header {
        background: @divider;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: @primary;
        font-size: 16px;
        font-weight: 500;
    }

    .good-box {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .good-item {
            box-sizing: border-box;
            width: 50%;
            border-bottom: 1px solid @divider;
            padding: 10px;

            img {
                display: block;
                margin: 0 auto;
                width: 120px;
            }

            .good-desc {
                text-align: center;
                font-size: 14px;
                padding: 10px 0;

                .title {
                    color: #333;
                }

                .price {
                    color: @primary;
                }
            }

            &:nth-child(2n + 1) {
                border-right: 1px solid @divider;
            }
        }
    }
}
</style>