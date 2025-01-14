<template>
    <div class="cart-box">
        <simple-header name="购物车" noback="true"/>
        <div class="cart-body">
            <van-checkbox-group>

            </van-checkbox-group>
        </div>
        <van-submit-bar>

        </van-submit-bar>
        <nav-bar/>
    </div>
</template>

<script setup lang="ts" name="cart">
import NavBar from '@/components/NavBar.vue';
import SimpleHeader from '@/components/SimpleHeader.vue';
import type { CartObj } from '@/interfaces/Home';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const state = reactive({
    checked: false,
    list: [] as CartObj[],
    all: false,
    result: [],
    checkAll: true
})

</script>

<style scoped>

</style>