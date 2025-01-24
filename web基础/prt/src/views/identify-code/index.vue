<template>
  <!-- 人脸识别结果页面 -->
  <div class="identify-code">
    <template v-if="loading">加载中，请稍后...</template>
    <template v-else>
      <div class="img-box" v-if="identifyCodeResult.message">
        <img
          :src="
            identifyCodeResult.status === 'SUCCESS'
              ? require('@/assets/success-1.jpg')
              : require('@/assets/faile.jpg')
          "
          class="img-icon"
          @click="toPage"
        />
      </div>
      <div class="result-text">
        {{ identifyCodeResult.message || "" }}
      </div>
      <button class="close-btn" @click="handleClosePage" v-if="!isActiveApp">
        关闭
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getIdentifyCodeResultApi } from "@/apis/index";
export default defineComponent({
  name: "InfoRegister",
  setup() {
    const route = useRoute();
    const router = useRouter();

    let identifyCodeResult: any = ref({
      message: "",
      status: "",
    });
    const loading = ref(true);
    console.log("window--", window);

    const onBridgeReady = () => {
      //隐藏右上角按钮
      WeixinJSBridge.call("hideOptionMenu");
      WeixinJSBridge.call("hideToolbar");
    };
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
      }
    } else {
      onBridgeReady();
    }
    watch(
      () => router.currentRoute.value,
      () => {
        var url = location.href; //取得整个地址栏
        var num = url.indexOf("?");
        var param = url.substr(num + 1); //获取整个参数串
        param = decodeURIComponent(param.replace(/%20/g, "+"))
          .split("&")[0]
          .split("uniqueId=")[1];
        console.log("新参数", route?.query, route, param);
        if (param) {
          try {
            getIdentifyCodeResultApi({ uniqueId: param })
              .then((res) => {
                console.log("结果", res);
                identifyCodeResult.value = res;
              })
              .finally(() => {
                loading.value = false;
              });
          } catch (error) {
            console.log("接口请求异常", error);
          }
        } else {
          loading.value = false;
        }
      },
      { immediate: true }
    );
    //关闭页面
    const closePage = () => {
      console.log(navigator.userAgent);
      if (
        navigator.userAgent.indexOf("Firefox") != -1 ||
        navigator.userAgent.indexOf("Chrome") != -1
      ) {
        window.location.href = "about:blank";
        window.close();
        console.log("浏览器关闭");
      } else {
        console.log("非谷歌和火狐浏览器关闭");
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    };
    const handleClosePage = () => {
      try {
        closePage();
        if (WeixinJSBridge) {
          // 微信内部浏览器关闭
          WeixinJSBridge?.call("closeWindow");
        }
      } catch (error) {
        console.log("信息", error);
      }
    };
    const isActiveApp = computed(() => {
      const agreeMent = navigator.userAgent.toLowerCase();
      return agreeMent === "android" || agreeMent === "ios";
    });
    return {
      identifyCodeResult,
      loading,
      handleClosePage,
      isActiveApp,
    };
  },
});
</script>

<style scoped lang="scss">
.identify-code {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  .img-box {
    .img-icon {
      width: 64px;
      height: 64px;
    }
  }
  .result-text {
    color: #333333;
    font-size: 18px;
    margin-top: 20px;
  }
  .close-btn {
    color: #666;
    font-size: 13px;
    padding: 6px 16px;
    border-radius: 3px;
    border: 1px solid #d2d2d2;
    background: #fff;
    margin-top: 20px;
    letter-spacing: 0.65px;
  }
}
</style>
