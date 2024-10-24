<template>
    <ul>
        <!-- query传参 -->
        <!-- <li>编号：{{ query.id }}</li>
        <li>标题：{{ query.title }}</li>
        <li>内容：{{ query.content }}</li> -->

        <!-- param传参 -->
        <li>编号：{{ route.params.id }}</li>
        <li>标题：{{ route.params.title }}</li>
        <li>内容：{{ route.params.content }}</li>

    </ul>
</template>

<script lang="ts" setup name="NewDetail">

import { toRef, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router'

let route = useRoute()

let {query} = toRefs(route)

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