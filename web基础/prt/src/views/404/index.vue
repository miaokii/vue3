<template>
  <div class="page">
    <img :src="NotFound" alt="页面失效~" />
    <p>页面失效</p>
  </div>
</template>
<script setup>
import NotFound from "@/assets/notFound.png";
</script>
<style scoped lang="scss">
.page {
  height: 100vh;
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 210px;
  img {
    width: 196px;
    margin-bottom: 16px;
  }
  p {
    color: #999999;
    font-size: 16px;
  }
}
</style>
