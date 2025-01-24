<template>
  <div class="detail">
    <van-nav-bar :title="(route.meta.title as string)" v-if="!params.native">
      <template #left>
        <div>
          <img
            style="width: 22px; height: auto; display: block"
            :src="backArrow"
            alt=""
            @click="back"
          />
        </div>
      </template>
    </van-nav-bar>
    <div class="top">
      本次查询结果，由中国⼈⺠银⾏征信网，获取个人基本信息、违约信息、授信信息、负债信息及贷记卡账户信息等。
    </div>
    <div class="container">
      <div inset class="form_container">
        <Field
          v-model:value="model.name"
          label="姓名"
          maxlength="20"
          readonly
          not-spaces
        />
        <Field
          v-model:value="model.idCard"
          label="身份证号码"
          maxlength="20"
          readonly
          not-spaces
        />
        <Field
          v-model:value="model.phone"
          label="手机号"
          maxlength="20"
          readonly
          not-spaces
        />
        <div class="auth">
          <span class="label">授权协议</span>
          <div class="right">
            <span
              v-for="item in contractList"
              @click.stop="viewContract(item)"
              :key="item.contractName"
              >《{{ item.contractName }}》</span
            >
          </div>
        </div>
      </div>
      <div class="pdf">
        <div class="title">
          <div class="text" style="margin-left: 0">报告信息</div>

          <span class="state">
            <svg-icon :icon-name="status[model.reportStatus].iconName" />
            <span
              class="text"
              :style="{ color: status[model.reportStatus].color }"
            >
              {{ status[model.reportStatus].text }}
            </span>
          </span>
        </div>
        <template v-if="model.reportStatus === 'GENERATED' && model.reportUrl">
          <!-- <div class="error">
              信用报告有效期为30天，30天后将过期，链接将不能访问。
            </div> -->
          <div class="pdf_wrap">
            <iframe
              style="border: none; width: 100%; height: 100%"
              :src="model.reportUrl"
            />
          </div>
        </template>
        <van-empty
          v-else-if="model.reportStatus === 'GENERATED' && !model.reportUrl"
          description="报告已失效"
        />
        <div
          v-if="
            model.reportStatus === 'PROCESSING' ||
            model.reportStatus === 'NOT_GENERATED'
          "
          class="error_box"
        >
          <img
            :src="Refresh"
            @click="refresh"
            :class="{ active: flag }"
            v-if="model.reportStatus === 'PROCESSING'"
          />

          未查询到数据
        </div>
      </div>
    </div>
    <!-- 协议预览 -->
    <van-popup
      v-model:show="showAgree"
      round
      position="bottom"
      :style="{ height: '75%', padding: '16px' }"
      @close="pdfUrl = ''"
    >
      <div class="agreement-dialog">
        <div class="agreement-container">
          <van-loading
            v-if="agreementLoading"
            class="agreement-loading"
            color="#1989fa"
          />

          <PDF :src="pdfUrl" v-if="pdfUrl" />
        </div>
      </div>
    </van-popup>
    <van-sticky
      position="bottom"
      :offset-bottom="40"
      class="sticky"
      v-if="model.reportStatus === 'GENERATED' && model.reportUrl"
    >
      <van-icon
        name="expand-o"
        style="color: #5687ff; font-size: 40px"
        class="icon"
        @click="open"
      />
    </van-sticky>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Field from "@/components/rxkForm/components/filed.vue";
import backArrow from "@/assets/backArrow.png";
import Refresh from "@/assets/refresh.png";
import PDF from "pdf-vue3";

const params = JSON.parse(localStorage.getItem("urlParams") || "{}");
import { getDetail, getCreditReportFinishFile } from "@/apis";

const pdfUrl = ref("");
const showAgree = ref(false);
const agreementLoading = ref(false);
const viewContract = (item: any) => {
  pdfUrl.value = item.contractUrlBaseStr;
  showAgree.value = true;
};

const route = useRoute();
const router = useRouter();
const model = reactive<any>({ reportStatus: "PROCESSING" });

const contractList = ref<any[]>([]);
const flag = ref(false);
const status: Recordable = {
  GENERATED: {
    text: "生成成功",
    iconName: "sishouquan",
    color: "#999999",
  },
  NOT_GENERATED: {
    text: "未生成",
    iconName: "weishouquan",
    color: "#999999",
  },
  PROCESSING: {
    text: "生成中",
    iconName: "shouquanzhong",
    color: "#5687FF",
  },
};
const back = () => {
  router.replace({
    name: "creditReportMain",
    query: {
      active: 1,
    },
  });
};
const open = () => {
  location.href = model.reportUrl;
};
const handleGetDetail = async () => {
  const { id } = route.params;
  await getDetail({
    id,
  }).then(async (res) => {
    Object.assign(model, {
      id: res.id,
      authorizationStatus: res.authorizationStatus,
      name: res.customerName,
      phone: res.customerPhone,
      idCard: res.customerIdNumber,
      reportUrl: res.reportUrl,
      reportStatus: res.reportStatus,
    });
    const contractData = await getCreditReportFinishFile({
      signFlowId: res.contractId,
    });
    contractList.value = contractData.contractList;
  });
};
const refresh = async () => {
  flag.value = true;
  await handleGetDetail();
  flag.value = false;
};
onMounted(() => {
  handleGetDetail();
});
</script>
<style lang="scss" scoped>
.sticky {
  text-align: right;
  .icon {
    transform: translateX(-16px);
  }
}
.detail {
  height: 100%;
  overflow: hidden;
  background: #f4f4f5;
  .top {
    display: flex;
    padding: 9px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    background: #eef3ff;
    color: #5687ff;
    font-size: 12px;
    line-height: 20px;
  }
  .container {
    height: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    row-gap: 12px;
    padding-bottom: 20px;
    background: #fff;
  }
  .form_container {
    padding: 0 16px;

    .auth {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        font-size: 14px;
        color: #666666;
      }
      .right {
        width: 80%;
        overflow-x: scroll;
        display: flex;
      }
      span {
        color: #5687ff;
        font-size: 14px;
        flex-shrink: 0;
      }
    }
    :deep(.van-field__body) {
      border: none !important;
      padding: 0 !important;
    }
    :deep(.van-field__body) {
      border: none !important;
      padding: 0 !important;
      .van-field__control {
        text-align: right !important;
      }
    }
    :deep(.rxk_input) {
      line-height: 40px;
      height: 40px;
      margin-bottom: 0;
    }
    :deep(.van-field__error-message) {
      text-align: right;
    }
    :deep(.van-image) {
      width: 156px;
      height: 94px;
    }
    :deep(.van-cell) {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .pdf {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 16px;
    .not_found {
      align-items: center;
      color: #999999;
      text-align: center;
      font-size: 14px;
    }
    .error_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999999;
      text-align: center;
      font-size: 14px;
      padding: 86px 0 44px 0;
      img {
        width: 30px;
        height: 30px;
        margin-bottom: 12px;
        transition: all 2s linear;
        &.active {
          transform: rotate(360deg);
        }
      }
    }
    .pdf_wrap {
      height: 100%;
    }
    .title {
      height: 46px;
      line-height: 46px;
      padding: 0 16px 0 12px;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        width: 4px;
        height: 16px;
        display: block;
        background: #457ff8;
        transform: translateX(-12px);
      }
      .text {
        color: #333333;
        font-size: 14px;
        font-weight: 500;
        margin-left: 8px;
      }
      .state {
        color: #999999;
        font-size: 14px;
        margin-left: auto;
      }
    }
    .error {
      display: flex;
      padding: 10px 12px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      background: #fde5e5;
      color: #f44d4d;
      font-size: 12px;
      line-height: 20px;
    }
  }
  .agreement-dialog {
    display: flex;
    height: 100%;
    flex-direction: column;
    .top {
      display: flex;
      padding: 9px 12px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      background: #eef3ff;
      color: #5687ff;
      font-size: 12px;
      line-height: 20px;
      margin-top: 16px;
    }
    h2 {
      color: #333333;
      font-weight: 500;
      font-size: 16px;
    }
    .agreement-container {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      border-radius: 8px;
      background: #f4f4f5;
      position: relative;
      .agreement-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      :deep(.van-tabs) {
        height: 100%;
        display: flex;
        flex-direction: column;
        .van-tabs__content {
          height: 100%;
          min-height: 0;
        }
        .van-tab__panel {
          height: 100%;
        }
        .van-tab__text {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
