<!-- html结构 -->
<template>
    <div class="container-fluid wraper">
        <h1 class="title">
            Vue3 组件间通讯
        </h1>
        <hr>
        <div class="row">
            <div class="col-xs-3 col-md-3 col-lg-3 col-xl-3">
                <RouterLink active-class="active" class="list-group-item" to="/props">1. props</RouterLink>
                <RouterLink active-class="active" class="list-group-item" to="/event">2. 自定义事件</RouterLink>
                <RouterLink active-class="active" class="list-group-item" to="/mitt">3. mitt</RouterLink>
                <RouterLink active-class="active" class="list-group-item" to="/vmodel">4. v-model</RouterLink>
                <RouterLink active-class="active" class="list-group-item" to="/attrs">5. $attrs</RouterLink>
                <RouterLink active-class="active" class="list-group-item" to="/refsParent">6. $refs-$parent</RouterLink>
                <RouterLink active-class="active" class="list-group-item" to="/provideInject">7. provide-inject</RouterLink>
                <RouterLink active-class="active" class="list-group-item" to="/pinia">8. pinia</RouterLink>
                <RouterLink active-class="active" class="list-group-item" to="/slot">9. slot</RouterLink>
            </div>

            <div class="col-xs-9 col-md-9 col-lg-9 col-xl-9">
                <div class="panel-body">
                    <RouterView />
                </div>
            </div>
        </div>


    </div>
</template>

<!-- 脚本 ts或js -->
<script lang="ts" setup name="App">
</script>

<!-- 样式 -->
<style scoped>
.wraper .title {
    padding: 20px;
    text-align: center;
    min-width: 610px;
}

.wraper .small {
    font-size: 15px;
}

.wraper .list-group-item {
    min-width: 230px;
}
</style>