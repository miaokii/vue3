<template>
    <div class="news">
        <!-- 导航区 -->
        <ul>
            <li v-for="news in newList" :key="news.id">
                <!-- query传参一 -->
                <!-- <RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">{{ news.title }}</RouterLink> -->

                <!-- query传参二 -->
                <!-- <RouterLink :to="{
                    // path: '/news/detail',
                    name: 'xiang',
                    query: {
                        id: news.id,
                        title: news.title,
                        content: news.content
                    }
                }"> {{ news.title }}</RouterLink> -->

                <!-- param传参一 -->
                <!-- <RouterLink :to="`/news/detail/${news.id}/${news.title}/${news.content}`">{{ news.title }}</RouterLink> -->
                <!-- param传参二 -->
                <RouterLink :to="{
                    name: 'xiang',
                    // 不能用path参数，应该用name
                    // path: '/news/detail',
                    params: {
                        id: news.id,
                        title: news.title,
                        content: news.content
                    }
                }">{{ news.title }}</RouterLink>

            </li>
        </ul>

        <!-- 展示区 -->
        <div class="news-content">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts" name="News">

import { reactive } from 'vue';

const newList = reactive([
    { id: 'asdfnpwpekrk01', title: '一个好消息', content: '马上就要到周末了哦' },
    { id: 'asdfnpwpekrk02', title: '小米SU7发布', content: '最美轿跑，年轻人的dreamCar' },
    { id: 'asdfnpwpekrk03', title: '华为发布鸿蒙Next', content: '第一款国产移动操作系统' },
    { id: 'asdfnpwpekrk04', title: '双11活动', content: '购物不用看阳历，天天都是双十一' },
])

</script>

<style scoped>
.news {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 100%;
}

.news ul {
    margin-top: 30px;
    /* list-style: none; */
    padding-left: 10px;
}

.news li::marker {
    color: blue;
}

.news li>a {
    font-size: 18px;
    line-height: 40px;
    text-decoration: none;
    color: blue;
    text-shadow: 0 0 1px red;
}

.news-content {
    margin: 20px;
    margin-right: 0px;
    border-radius: 10px;
    width: 80%;
    border: 1px solid;
}
</style>