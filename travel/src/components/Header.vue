<template>
    <div class="header">
        <div class="bg"></div>
        <div class="header-container">
            <div>
                <a href="#" class="logo">
                    <img src="https://yoc.tech/images/logo-n.png" alt="">
                </a>
            </div>

            <div class="header-item">
                <ul>
                    <li><a href="#">首页</a></li>
                    <li><a href="#">品牌</a></li>
                    <li><a href="#">排行</a></li>
                    <li><a href="#">问答</a></li>
                    <li><a href="#">专题</a></li>
                    <li><a href="#">咨询</a></li>
                    <li><a href="#">百科</a></li>
                </ul>
            </div>

            <div class="header-search">
                <input type="text" placeholder="综合搜索">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts" name="header">

</script>


<style scoped>
.w_1200 {
    width: 1200px;
    margin: 0 auto;
}

/* 头部 */
.header {
    /* 固定定位 */
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    /* height: 60px; */
    z-index: 1000;
}

/* 背影颜色 */
.header .bg {
    position: absolute;
    /* left: 0;
    right: 0;
    bottom: 0;
    top: 0; */
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 10;
    filter: opacity(50);
    z-index: 1;
    background-color: hsla(0, 33%, 98%, 0.8);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.header .header-container {
    margin-left: 50px;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 2;
}

/* logo */
.header .logo img {
    width: 80%;
}

.header-item {
    margin-left: 0;
    flex: 1;
}

.header-item ul {
    display: flex;
    height: 60px;
    align-items: center;
    list-style: none;
}

.header-item ul li {
    padding: 0 11px;
    position: relative;
}

.header-item ul li a {
    color: black;
    text-decoration: none
}


.header-item ul li a:hover {
    font-weight: 700;
}

.header-item ul li a:hover::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 2px;
    background-color: var(--bgcolor);
    transform: translateX(50%);
}

/* 搜索 */
.header-search {
    margin-right: 20px;
    background-color: white;
    border: 2px solid var(--bgcolor);
    padding: 5px 10px;
    border-radius: 8px;
    height: 25px;
    width: 220px;
    display: flex;
    /* 垂直居中 */
    align-items: center;
    /* 两段对齐 */
    justify-content: space-between;
    /* 平滑动画 */
    transition: .5s;
}

/* input不显示边框 */
.header-search input {
    border: 0;
}

/* input获取焦点时，不显示边框 */
.header-search input:focus {
    outline: none;
}

/* 尾类选择器，当子元素获取焦点时，更改父元素 */
.header-search:focus-within {
    width: 400px;
}

.header-search:focus-within .icon {
    color: var(--bgcolor);
    font-weight: 700;
}
</style>