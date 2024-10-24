<!-- html结构 -->
<template>
    <Header></Header>
    <div class="navigate">
        <!-- 通过字符串跳转 -->
        <RouterLink to="/home" active-class="active"> 首页 </RouterLink>
        <!-- 通过对象名字跳转 -->
        <RouterLink :to="{name: 'xinwen'}" active-class="active"> 新闻 </RouterLink>
        <!-- 通过对象路径跳转 -->
        <RouterLink :to="{path: '/about'}" active-class="activ">关于</RouterLink>
    </div>

    <div class="main-content">
        <!-- 路由组件放置的地方 -->
        <RouterView></RouterView>
    </div>
</template>

<!-- 脚本 ts或js -->
<script lang="ts" setup name="App">

import { RouterView, RouterLink } from 'vue-router';
import Header from '@/components/Header.vue'

</script>

<!-- 样式 -->
<style scoped>

.navigate {
    /* 设置为flexh inline-flex，元素变为flex容器，会改变子元素的布局行为*/
    /* Main Axis：flex-direction 设置主轴 */
    /* Cross Axis：主轴垂直轴 */
    display: flex;
    /* 控制主轴元素的对其方式 
    flex-start：主轴开始对齐
    flex-end：主轴结束对齐
    center：居中
    space-between：两端对齐
    space-around：均匀分布
    */
    justify-content: space-around;
    margin: 0 100px;
}

.navigate a {
    display: block;
    text-align: center;
    width: 90px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    letter-spacing: 5px;
}

.navigate a.active {
    background-color: rgb(98, 250, 199);
    color: #ffc268;
    font-weight: 900;
    text-shadow: 0 0 1px black;
}

.main-content {
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
    width: 90%;
    height: 400px;
    border: 1px solid;
}
</style>