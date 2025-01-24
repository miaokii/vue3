<template>
  <div class="infomation">
    <Customer v-if="enable" />
    <div v-else class="enable_page">
      <img :src="Enable" alt="" />
      <p>抱歉，您访问的页面失效</p>
    </div>
  </div>
</template>

<script>
import Customer from "@/components/customerCom/page.vue";
import { ref } from "vue";
import { checkUrl } from "@/apis/index";
import { useRoute } from "vue-router";
import Enable from "@/assets/enable.png";
export default {
  components: {
    Customer,
  },
  setup() {
    const route = useRoute();
    const enable = ref(true);
    const [tableCode, title, ...rest] = route.params.key.split("/") || [];
    checkUrl({ key: rest.join("/") }).then(
      () => {
        enable.value = true;
      },
      (err) => {
        if (err.code === 600 && err.subCode === 11001) {
          enable.value = false;
        }
      }
    );
    return { Enable, enable };
  },
};
</script>

<style lang="scss" scoped>
.infomation {
  padding: 24px;
  .enable_page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 96px;
    }
    p {
      color: #333333;
      margin-top: 16px;
      font-size: 14px;
    }
  }
}
</style>
