<template>
  <div class="register-success">
    <div class="img-box">
      <img :src="require('@/assets/success-icon.png')" alt="" />
    </div>
    <p class="success">登记成功</p>
    <p class="tip">稍后有客户经理为您服务！</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped lang="scss">
.register-success {
  text-align: center;
  .img-box {
    margin: 120px auto 32px;
    width: 60px;
    height: 60px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .success {
    font-size: 18px;
    margin-bottom: 12px;
  }
  .tip {
    color: #999999;
    font-size: 14px;
  }
}
</style>
