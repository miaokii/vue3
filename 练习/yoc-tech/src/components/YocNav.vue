<template>
    <div class="head-nav">
        <a class="logo" href="https://www.yoc.tech"><img src="@/assets/logo.png" alt="logo"></a>

        <div class="head-nav-list">
            <!-- 通过字符串跳转 -->
            <RouterLink to="/home" active-class="head-nav-list-active">首页</RouterLink>
            <!-- 通过对象名字跳转 -->
            <RouterLink :to="{ name: '优卡业务' }" active-class="head-nav-list-active">优卡业务</RouterLink>
            <!-- 通过对象路径跳转 -->
            <RouterLink :to="{ path: '/about' }" active-class="head-nav-list-active">关于优卡</RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts" name="headnav">

</script>

<style scoped>
.head-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--vt-c-white);
}

.head-nav-list a {
    padding-right: 5rem;
    font-size: 17px;
}

.head-nav-list a:last-child {
    padding-right: 0;
}

.head-nav-list a:hover {
    color: var(--color-selected);
}

.head-nav-list-active {
    color: var(--color-selected);
    position: relative;
}

.head-nav-list-active::before {
    content: ' ';
    position: absolute;
    background: var(--color-selected);
    display: block;
    left: -10px;
    width: 4px;
    height: 1em;
    bottom: 1px;
}
</style>