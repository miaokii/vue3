<template>
    <ul>
        <!-- query传参 -->
        <!-- <li>编号：{{ query.id }}</li>
        <li>标题：{{ query.title }}</li>
        <li>内容：{{ query.content }}</li> -->

        <!-- param传参 -->
        <li>编号：{{ id }}</li>
        <li>标题：{{ title }}</li>
        <li>内容：{{ content }}</li>

    </ul>
</template>

<script lang="ts" setup name="NewDetail">

// defineProps(['id', 'title', 'content'])
defineProps<{id: string, title: string, content?: string}>()

</script>

<style scoped>
ul {
    list-style: none;
    padding-left: 20px;
}

ul>li {
    line-height: 30px;
}
</style>