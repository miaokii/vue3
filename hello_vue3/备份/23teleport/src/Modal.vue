<template>
    <button @click="isShow = true">展示弹窗</button>
    <teleport to="body">
        <div class="modal" v-show="isShow">
            <h2>弹窗标题</h2>
            <p>弹窗内容</p>
            <button @click="isShow = false">关闭弹窗</button>
        </div>
    </teleport>
</template>

<script setup lang="ts" name="Modal">
import { ref, Teleport } from 'vue';

let isShow = ref(false)
</script>

<style scoped>
.modal {
    background-color: lightblue;
    align-content: center;
    padding: 20px;
    padding-top: 0;
    border-radius: 10px;
    box-shadow: 0 0 10px;
    text-align: center;
    width: 200px;

    /* 展示在顶层 */
    position: fixed;
    /* 左边 */
    left: 50%;
    /* 左 */
    margin-left: -100px;
    /* 顶 */
    top: 20px;
}
</style>