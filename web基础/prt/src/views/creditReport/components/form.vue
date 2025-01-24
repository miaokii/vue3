<template>
  <div
    class="form"
    :style="{ height: params.native ? '100%' : 'calc(100% - 46px)' }"
  >
    <div class="top" v-if="!params.native">
      {{ tenantName }}将在获得您的明确授权后，通过平台 “融享客”
      查询您的征信报告。查询结果中的个人基本信息、违约信息、授信信息、负债信息及贷记卡账户信息等，均来源自中国人民银行征信系统
    </div>
    <div class="top" v-else>
      将请求由中国人民银行征信网，获取个人基本信息、信贷交易信息、违约信息、授信信息、负债信息及贷记卡账户信息等，被查询人完成征信授权协议的签署后将可查询其征信报告数据。
    </div>
    <van-form ref="form" input-align="right" class="form_container">
      <van-cell-group inset>
        <Field
          v-model:value="model.name"
          label="姓名"
          required
          maxlength="20"
          placeholder="请输入姓名"
          not-spaces
          :disabled="!!creditId"
          :rules="[
            {
              required: true,
              message: '请输入姓名',
            },
          ]"
        />
        <Field
          v-model:value="model.phone"
          type="tel"
          label="手机号"
          required
          maxlength="11"
          placeholder="请输入手机号"
          :disabled="!!creditId"
          :rules="[
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
              message: '手机号格式不正确',
            },
          ]"
        />
        <IdCard
          v-model:value="model.idCard"
          :required="true"
          :disabled="!!creditId"
          placeholder="请输入身份证号"
        />
        <Field
          value="只能上传jpg/png文件，且不超过20MB"
          label="上传身份证"
          class="field_value"
          required
          disabled
        />
        <div class="flex_box">
          <UpLoade
            v-model:value="model.idCardFront"
            required
            :maxSize="20"
            label-width="120px"
            :rules="[
              {
                required: true,
                message: '请上传身份证人像面',
              },
            ]"
            label=""
          >
            <template #style>
              <img src="@/assets/idcard_2.png" alt="" class="placeholder" />
            </template>
            <template #tip>
              <div class="tip_label">点击上传身份证人像面</div>
            </template>
          </UpLoade>
          <UpLoade
            v-model:value="model.idCardReverse"
            required
            label-width="120px"
            :maxSize="20"
            :rules="[
              {
                required: true,
                message: '请上传身份证国徽面',
              },
            ]"
            label=""
          >
            <template #style>
              <img src="@/assets/idcard_1.png" alt="" class="placeholder" />
            </template>
            <template #tip>
              <div class="tip_label">点击上传身份证国徽面</div>
            </template>
          </UpLoade>
        </div>
        <div class="native_box" v-if="params.native">
          <div class="native_box_top">
            我将承诺征求被查询者同意及授权，并将发送<span
              v-for="item in contractList"
              @click.stop="viewContract(item)"
              :key="item.contractMappingTemplateId"
              >《{{ item.contractTemplateName }}》</span
            >
          </div>
          <div
            class="native_box_bottom"
            :style="{
              backgroundColor: icons[model.authorizationStatus].bColor,
            }"
          >
            <span :style="{ color: icons[model.authorizationStatus].color }">
              <svg-icon
                :icon-name="icons[model.authorizationStatus].iconName"
                :class="{
                  'animate-spin': model.authorizationStatus === 'AUTHORIZING',
                }"
              />
              <span class="text">
                {{ icons[model.authorizationStatus].text }}
              </span>
            </span>
            <van-button
              type="primary"
              @click="sendAuth(1)"
              :loading="loading.send"
              v-if="model.authorizationStatus === 'NOAUTH'"
            >
              发送授权协议
            </van-button>
          </div>
        </div>
        <div class="tips" v-if="params.native">
          报告说明：<br />
          1.本平台呈现的征信报告，由中国人民银行征信中心出具，基于报告生成时点个人征信系统的记录信息生成。除查询记录外，其余信息源自相关机构。在此郑重提示，本平台对报告内容的真实性与准确性不承担保证责任，请结合自身实际情况进行审慎评估。<br />
          2.报告的信贷交易信息，“业务类型”为“其他”的汇总信息不包含“资产处置”和“垫款”业务。<br />
          3.本⼈声明是信息主体对信⽤报告中的信息所附注的简要说明，信息主体对本⼈声明的真实性负责。<br />
          4.本报告内容涉及个⼈隐私，查询者应依法使⽤、妥善保管。因使⽤不当造成个⼈信息泄露的，平台将不承担相关责任。<br />
          5.除“有相关还款责任的企业借款”中的⾦额展示对应币种⾦额外，本报告中所有⾦额均为折合⼈⺠币⾦额。<br />
          6.本报告整合了数据提供机构以信息主体不同证件报送的信息
        </div>
      </van-cell-group>
    </van-form>
    <div style="margin-top: auto" class="btns">
      <r-checkbox
        shape="square"
        style="display: inline-flex"
        disabled
        :modelValue="true"
        v-if="!params.native"
        >勾选表明已阅读并同意
        <span
          class="highlight"
          v-for="item in contractList"
          @click.stop="viewContract(item)"
          :key="item.contractMappingTemplateId"
          >《{{ item.contractTemplateName }}》</span
        >
      </r-checkbox>
      <r-checkbox
        v-else
        class="check"
        shape="square"
        style="display: inline-flex"
        v-model="model.queryAfterAuthorized"
        >同意授权后，自动查询报告</r-checkbox
      >
      <van-button
        block
        type="primary"
        class="submit"
        round
        @click="sendAuth(2)"
        :loading="loading.submit"
        :disabled="
          params.native ? model.authorizationStatus !== 'AUTHORIZED' : false
        "
      >
        提交信息
      </van-button>
    </div>
    <!-- 授权协议 -->
    <van-popup
      v-model:show="showCredit"
      round
      position="bottom"
      :style="{ height: '85%', padding: '16px' }"
    >
      <div class="agreement-dialog">
        <h2>个人征信查询授权书</h2>
        <div class="top">
          {{
            tenantName
          }}将通过本平台“融享客”查询您的征信报告，若同意并授权查询，请完成以下协议签署。
        </div>
        <div class="agreement-container">
          <van-loading
            v-if="agreementLoading"
            class="agreement-loading"
            color="#1989fa"
          />
          <van-tabs shrink>
            <van-tab
              :title="item.contractName"
              v-for="item in authContractList"
              :key="item.contractName"
            >
              <PDF :src="item.contractUrlBaseStr" />
            </van-tab>
          </van-tabs>
        </div>
        <van-button type="primary" block @click="agreementHandler"
          >同意并签署授权协议</van-button
        >
      </div>
    </van-popup>
    <!-- 协议预览 -->
    <van-popup
      v-model:show="showAgree"
      round
      position="bottom"
      :style="{ height: '75%', padding: '16px' }"
      @close="popClose"
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
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Field from "@/components/rxkForm/components/filed.vue";
import UpLoade from "@/components/rxkForm/components/filedUpload.vue";
import IdCard from "@/components/rxkForm/components/filedIdcard.vue";
import RCheckbox from "@/components/CheckBox/index.vue";
import {
  sendAuthorization,
  getCreditReportFillFileList,
  getCreditReportFillFile,
  getCreditReportFinishFile,
  getDetail,
  queryAuthorization,
} from "@/apis";
import { getQueryParams } from "@/utils/tools";
import PDF from "pdf-vue3";
import { showToast } from "vant";
document.title = "个人信用报告查询";
const creditId = localStorage.getItem("creditId") || "";
const router = useRouter();
const params = getQueryParams(window.location.href);
const form = ref();
const agreementLoading = ref(true);
const showCredit = ref(false);
const tenantName = localStorage.getItem("tenantName");
const contractList = ref<any[]>([]);
const authContractList = ref<any[]>([]);
const showAgree = ref(false);
const pdfUrl = ref("");
const signUrl = ref("");
const icons: Recordable = {
  UNAUTHORIZED: {
    text: "授权中,请稍后",
    iconName: "shouquanzhong",
    color: "#5687FF",
    bColor: "##EEF3FF",
  },
  AUTHORIZING: {
    text: "授权中,请稍后",
    iconName: "shouquanzhong",
    color: "#5687FF",
    bColor: "##EEF3FF",
  },
  AUTHORIZED: {
    text: "已授权",
    iconName: "sishouquan",
    color: "#5DC144",
    bColor: "##F0F9EB",
  },
  NOAUTH: {
    text: "未授权",
    iconName: "weishouquan",
    color: "#FCAC33",
    bColor: "#FCF6EC",
  },
};
const loading = reactive({
  send: false,
  submit: false,
});
const model = reactive<any>({
  name: "",
  phone: "",
  idCard: "",
  idCardReverse: [],
  idCardFront: [],
  queryAfterAuthorized: false,
  authorizationStatus: "NOAUTH",
  id: "",
});

// 1 发送 2提交
const sendAuth = async (type = 1) => {
  try {
    console.log("[model  ] >", model);
    await form.value.validate();
    if (type === 1) {
      loading.send = true;
    } else {
      loading.submit = true;
    }

    const { id, authorizationStatus, ...rest } = model;

    if (params.native && authorizationStatus === "AUTHORIZED") {
      queryAuthorization({
        id,
        ...rest,
        idCardFront: rest.idCardFront[0]?.url,
        idCardReverse: rest.idCardReverse[0]?.url,
        resubmit: !!creditId,
      }).then(() => {
        router.push({
          name: "creditReportDetail",
          params: {
            id,
          },
        });
      });
      return;
    }
    let redirectUrl = window.location.href;
    if (!params.active) {
      redirectUrl = `${window.location.href}?active=1`;
    }
    sendAuthorization({
      ...rest,
      idCardFront: rest.idCardFront[0]?.url,
      idCardReverse: rest.idCardReverse[0]?.url,
      version: "SEMINAL",
      redirectUrl,
      ignoreMessage: params.native ? false : true,
    })
      .then(async (res) => {
        model.authorizationStatus = "AUTHORIZING";
        localStorage.setItem("creditId", res.id);
        if (params.native) {
          showToast("短信发送成功");
          handleGetDetail();
          return;
        }
        const data = await getCreditReportFinishFile({
          signFlowId: res.contractId,
        });
        authContractList.value = data.contractList;
        signUrl.value = data.signUrl;
        showCredit.value = true;
      })
      .finally(() => {
        if (type === 1) {
          loading.send = false;
        } else {
          loading.submit = false;
        }
      });
  } finally {
    console.log(1);
  }
};
let timer: ReturnType<typeof setTimeout> | undefined;
const handleGetDetail = async () => {
  const id = localStorage.getItem("creditId");
  // 查询状态
  if (id && id.length) {
    const tick = () => {
      timer = setTimeout(handleGetDetail, 5000);
    };
    const res = await getDetail({
      id,
    });
    Object.assign(model, {
      id: res.id,
      authorizationStatus: res.authorizationStatus,
      name: res.customerName,
      phone: res.customerPhone,
      idCard: res.customerIdNumber,
      idCardReverse: [
        {
          url: res.idCardReverse,
        },
      ],
      idCardFront: [
        {
          url: res.idCardFront,
        },
      ],
    });
    tick();
    if (res.authorizationStatus === "AUTHORIZED") {
      localStorage.removeItem("creditId");
      clearTimeout(timer);
    }
  }
};
onMounted(() => {
  handleGetDetail();
});
onBeforeUnmount(() => {
  localStorage.removeItem("creditId");
  clearTimeout(timer);
});
getCreditReportFillFileList(null).then((res) => {
  contractList.value = res;
});
const viewContract = (item: any) => {
  showAgree.value = true;
  agreementLoading.value = true;
  getCreditReportFillFile({
    contractMappingTemplateId: item.contractMappingTemplateId,
  }).then((res) => {
    pdfUrl.value = res.contractUrlBaseStr;
    agreementLoading.value = false;
  });
};
// 同意协议
const agreementHandler = () => {
  window.location.href = signUrl.value;
  showCredit.value = false;
};
const popClose = () => {
  pdfUrl.value = "";
};
</script>
<style lang="scss" scoped>
.form {
  height: 100%;
  display: flex;
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
  }
  .check {
    :deep(.van-checkbox__label) {
      font-size: 14px;
      color: #666;
    }
  }
  &_container {
    flex: 1;
    overflow-y: auto;
    :deep(.van-field__body) {
      display: block;
      border: none !important;
      padding: 0 !important;
    }
    .flex_box {
      display: flex;

      justify-content: space-between;
      margin-bottom: 16px;

      .tip_label {
        color: #999999;
        font-size: 13px;
        text-align: center;
        width: 100%;
        margin-top: 4px;
      }

      .van-cell {
        margin-bottom: 0;
      }
      :deep(.rxk_upload) {
        justify-content: start;
        max-width: 156px;
        .van-image {
          width: 156px;
          height: 94px;
        }
        .van-uploader__preview-delete {
          border-radius: 0 4px 0 4px;
        }
      }
    }
    .field_value {
      :deep(.van-field__body) {
        input {
          color: #5687ff !important;
          -webkit-text-fill-color: #5687ff !important;
          font-size: 12px;
        }
      }
    }
    .native_box {
      padding: 16px;
      border-radius: 8px;
      background: #fcf6ec;
      margin-bottom: 16px;
      &_top {
        color: #666666;
        padding-bottom: 16px;
        font-size: 12px;
        border-bottom: 1px dashed #f2d09d;
        span {
          color: #5687ff;
        }
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      &_bottom {
        padding-top: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        :deep(.van-button) {
          height: 32px;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .text {
          margin-left: 8px;
        }
        div {
          display: flex;
          padding: 5px 16px;
          justify-content: center;
          align-items: center;
          gap: 4px;
          border-radius: 4px;
          background: #5687ff;
          color: #fff;
        }
      }
    }
    .tips {
      font-size: 12px;
      color: #999999;
      padding-bottom: 40px;
    }

    :deep(.rxk_input) {
      // line-height: 54px;
      height: 54px;
      margin-bottom: 0;
      align-items: center;
    }
    :deep(.van-field__error-message) {
      text-align: right;
    }
    :deep(.van-uploader__preview) {
      margin: 0;
    }

    :deep(.van-cell) {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .placeholder {
    width: 156px;
    height: 94px;
  }
  .btns {
    padding: 10px 16px 20px;
    border-top: 1px solid #f4f4f5;
    :deep(.van-checkbox__label) {
      color: #666;
    }
    .highlight {
      color: #5687ff;
    }
    .submit {
      background-color: #457ff8;
      border: none;
      margin-top: 10px;
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
