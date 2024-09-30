<template>
    <div class="news">
        <ul>
            <li><a href="">新闻1</a></li>
            <li><a href="">新闻2</a></li>
            <li><a href="">新闻3</a></li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="News">

</script>

<style>
.news {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 100%;
}

.news ul {
    margin-top: 30px;
    list-style: none;
    padding-left: 10px;
}

.news li>a {
    font-size: 18px;
    line-height: 40px;
    text-decoration: none;
    color: cadetblue;
    text-shadow: 0 0 1px red;
}

</style>