<template>
  <div class="creadit_main">
    <van-tabs
      v-model:active="active"
      class="creadit_tabs"
      v-if="!params.native"
      @change="tabChange"
    >
      <van-tab title="信用报告查询"> </van-tab>
      <van-tab title="信用报告查询历史"> </van-tab>
    </van-tabs>
    <TransitionGroup>
      <Form v-if="!active" />
      <List v-if="active" @toogle="active = 0" />
    </TransitionGroup>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Form from "./components/form.vue";
import List from "./components/list.vue";
import { getQueryParams } from "@/utils/tools";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const params = getQueryParams(window.location.href);
const active = ref(Number(params.active) || 0);
const tabChange = () => {
  localStorage.removeItem("creditId");
};
(window as any).togglePage = function () {
  if (route.name === "creditReportDetail") {
    router.back();
    return;
  }
  if (!active.value) {
    active.value = 1;
  } else {
    try {
      (window as any).android["backToApp"]();
    } catch (e) {
      (window as any).webkit.messageHandlers["backToApp"].postMessage("");
    }
  }
};
</script>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
}
.creadit_main {
  height: 100%;

  overflow: hidden;
  :deep(.van-tabs) {
    border-bottom: 1px solid #dcdfe6;
  }
  :deep(.van-tabs__wrap) {
    .van-tab {
      color: #666;
      font-size: 16px;
    }
    .van-tab--active {
      span {
        color: #457ff8 !important;
      }
    }
    .van-tabs__line {
      height: 2px;
      background-color: #457ff8;
    }
  }
}
</style>
