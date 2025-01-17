<template>
    <div class="category-box">
        <div class="category-header wrap van-hairline--bottom">
            <van-icon name="arrow-left" class="icon20" @click="goHome" />
            <div class="search-header">
                <van-icon name="search" class="icon20" />
                <RouterLink to="./product-list?from=category">全场50元起</RouterLink>
            </div>
            <van-icon name="ellipsis" class="icon20" />
        </div>
        <div class="search-wrap" ref="searchWrap">
            <list-scroll :scroll-data="state.categoryData" class="nav-slide-wrapper">
                <ul class="nav-slide">
                    <li v-for="item in state.categoryData" :key="item.categoryId" v-text="item.categoryName"
                        :class="{ 'active': state.currentId == item.categoryId }" @click="selectMenu(item.categoryId)"></li>
                </ul>
            </list-scroll>
            <div class="search-content">
                <list-scroll :scroll-data="state.categoryData">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <template v-for="(category, idx) in state.categoryData">
                                <div class="swiper-slide" v-if="state.currentId == category.categoryId" :key="idx">
                                    <div class="category-list"
                                        v-for="(products, idx) in category.secondLevelCategoryVOS" :key="idx">
                                        <!-- 组标题 -->
                                        <p class="category-title">{{ products.categoryName }}</p>
                                        <!-- 组分类item -->
                                        <div class="category-item"
                                            v-for="(product, idx) in products.thirdLevelCategoryVOS" :key="idx"
                                            @click="selectedProduct(product)">
                                            <van-icon name="point-gift" class="icon20 product-img" />
                                            <p class="product-title" v-text="product.categoryName"></p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </list-scroll>
            </div>
        </div>
        <nav-bar />
    </div>
</template>

<script setup lang="ts" name="category">
import ListScroll from '@/components/ListScroll.vue';
import NavBar from '@/components/NavBar.vue';
import type { Category, GoodsCategory } from '@/interfaces/Category';
import { getCategory } from '@/service/goods';
import { closeToast, showLoadingToast } from 'vant';
import { onActivated, reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
defineOptions({
  name: 'category'
})
// 类别容器
const searchWrap = ref()
const state = reactive({
    categoryData: [] as GoodsCategory[],
    currentId: 0
})

const router = useRouter()
onActivated(async () => {
    // 获取类别的高度
    let screenHeight = document.documentElement.clientHeight
    searchWrap.value.style.height = screenHeight - 100 + 'px'
    showLoadingToast('加载中')
    const { data } = await getCategory()
    closeToast()
    state.categoryData = data
    if (data.length > 0) {
        state.currentId = data[0].categoryId
    }
})

function goHome() {
    router.push('/home')
}

function selectMenu(id: number) {
    state.currentId = id
}

function selectedProduct(product: Category) {
    router.push({path:'/product-list', query: {categoryId: product.categoryId}})
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.category-box {
    .category-header {
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
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
        }
    }

    .search-wrap {
        .fj();
        width: 100%;
        margin-top: 50px;
        background: #f8f8f8;

        .nav-slide-wrapper {
            width: 30%;
            height: 100%;
            overflow: hidden;

            .nav-slide {
                width: 100%;
                .boxSizing();
                background: #f8f8f8;

                li {
                    width: 100%;
                    height: 55px;
                    text-align: center;
                    line-height: 55px;
                    font-size: 14px;

                    &.active {
                        color: @primary;
                        background: #fff;
                    }
                }
            }
        }
    }

    .search-content {
        width: 70%;
        height: 100%;
        padding: 0 10px;
        background: #fff;
        overflow-y: scroll;
        touch-action: pan-y;

        * {
            touch-action: pan-y;
        }

        .boxSizing();

        .swiper-container {
            width: 100%;

            .swiper-slide {
                width: 100%;

                .category-list {
                    display: flex;
                    flex-wrap: wrap;
                    flex-shrink: 0;
                    width: 100%;

                    .category-title {
                        width: 100%;
                        font-size: 17px;
                        font-weight: 500;
                        padding: 20px 0;                        
                    }

                    .category-item {
                        width: 33%;
                        margin-bottom: 10px;
                        text-align: center;

                        .product-title {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>