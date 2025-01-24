<template>
  <div class="login">
    <div class="login-header"></div>
    <div class="login-content">
      <van-form
        @submit="onSubmit"
        @failed="onFailed"
        show-error
        :show-error-message="false"
        validate-trigger="onSubmit"
      >
        <van-cell-group inset>
          <van-field
            v-model="userInfo.phone"
            size="large"
            name="phone"
            type="digit"
            :disabled="!!validParams.phone"
            autocomplete="off"
            maxlength="11"
            placeholder="请输入手机号"
            :rules="[
              {
                required: true,
                pattern: phoneReg,
                message: '请输入正确的手机号',
              },
            ]"
          >
            <template #left-icon>
              <svg-icon icon-name="shoujixiao" />
            </template>
          </van-field>
          <van-field
            v-model="userInfo.verifyCode"
            size="large"
            name="verifyCode"
            type="digit"
            autocomplete="off"
            placeholder="请输入验证码"
            maxlength="4"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
            :rules="[{ required: true, message: '请输入验证码' }]"
          >
            <template #left-icon>
              <svg-icon icon-name="yanzhengma" />
            </template>
            <template #button>
              <van-button
                size="small"
                round
                type="primary"
                class="code-btn"
                @click="startCountdown"
              >
                {{ buttonText }}
              </van-button>
            </template>
          </van-field>
          <div class="van-hairline--bottom"></div>
        </van-cell-group>
        <div class="control">
          <van-button
            round
            block
            type="primary"
            :disabled="!isDisabled"
            native-type="submit"
            :loading="loading"
          >
            下一步
          </van-button>
        </div>
      </van-form>
      <div class="agreement">
        <r-checkbox
          v-model="userInfo.agreement"
          shape="square"
          style="display: inline-flex"
          >勾选表明已阅读并同意</r-checkbox
        >
        <span>
          <a class="text-btn" @click="showAgreeHandler">《用户服务协议》</a>及<a
            class="text-btn"
            @click="showPrivacyHandler"
            >《用户隐私政策》</a
          >
        </span>
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="showPrivacy"
    round
    position="bottom"
    :style="{ height: '75%', padding: '16px' }"
  >
    <div class="agreement-dialog">
      <h2>阅读协议</h2>
      <div class="agreement-container">
        <van-loading v-if="agreementLoading" class="agreement-loading" />

        <PDF :src="userData.privacyProtocolUrl" />
      </div>
      <van-button type="primary" block @click="handleSigleAgreement"
        >同意协议</van-button
      >
    </div>
  </van-popup>
  <van-popup
    v-model:show="showAgree"
    round
    position="bottom"
    :style="{ height: '75%', padding: '16px' }"
  >
    <div class="agreement-dialog">
      <h2>阅读协议</h2>
      <div class="agreement-container">
        <van-loading v-if="agreementLoading" class="agreement-loading" />

        <PDF
          :src="userData.serviceProtocolUrl"
          @onComplete="agreementLoading = false"
        />
      </div>
      <van-button type="primary" block @click="handleSigleAgreement"
        >同意协议</van-button
      >
    </div>
  </van-popup>
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
          tenantText
        }}将通过本平台“融享客”查询您的征信报告，若同意并授权查询，请完成以下《征信授权协议》。
      </div>
      <div class="agreement-container">
        <van-loading v-if="agreementLoading" class="agreement-loading" />
        <van-tabs shrink>
          <van-tab
            :title="item.contractName"
            v-for="item in contractList"
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
</template>
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { getQueryParamsCopy } from "@/utils/tools";

import PDF from "pdf-vue3";
import RCheckbox from "@/components/CheckBox/index.vue";
import {
  captcha,
  creaditLogin,
  getCreditReportFinishFile,
  valid,
} from "@/apis";
import { setToken } from "@/utils/cache/auth";
const { token = "" } = getQueryParamsCopy(window.location.href);
const userData = {
  serviceProtocolUrl:
    "https://file.rongxk.com/upload/common/56d662d4903e4580844f400256d24b5d.pdf",
  privacyProtocolUrl:
    "https://file.rongxk.com/upload/common/ac2dd48ba08f4d2fb5345d411f40051d.pdf",
};
const userInfo = ref({
  phone: "",
  verifyCode: "",
  agreement: false,
});

const timeLimit = 60; // 倒计时时间
const countdown = ref(timeLimit);
const loading = ref(false);
const agreementLoading = ref(true);
const tenantText = ref("");
const contractList = ref<any[]>([]);
const signUrl = ref("");
const showPrivacy = ref(false);
const showAgree = ref(false);
const showCredit = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;
const router = useRouter();
const validParams = reactive({
  tenant: "",
  phone: "",
  id: "",
});
const phoneReg =
  /^1(3[0-9]|4[579]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-9])\d{8}$/;
const buttonText = computed(() => {
  if (countdown.value <= 0 || countdown.value === timeLimit) {
    return "发送验证码";
  } else {
    return `${countdown.value}s后重新发送`;
  }
});
const showPrivacyHandler = () => {
  agreementLoading.value = true;
  showPrivacy.value = true;
};
const showAgreeHandler = () => {
  agreementLoading.value = true;
  showAgree.value = true;
};
// 开始倒计时
const startCountdown = () => {
  const { phone } = userInfo.value;
  if (!phoneReg.test(phone)) return showToast("请输入正确的手机号");
  if (!userInfo.value.agreement) {
    return showToast("请先阅读并同意用户服务协议");
  }
  if (countdown.value < timeLimit) return;
  if (countdown.value <= 0) {
    countdown.value = timeLimit;
  }

  const tick = () => {
    countdown.value--;
    if (countdown.value > 0) {
      timeoutId = setTimeout(tick, 1000);
    } else {
      // 清理计时器
      timeoutId && clearTimeout(timeoutId);
      countdown.value = timeLimit;
    }
  };

  tick();
  captcha(
    {
      phone: userInfo.value.phone,
      tenant: validParams.tenant,
      id: validParams.id,
    },
    token
  ).then(() => {
    showToast("验证码已发送");
  });
};
const isDisabled = computed(() => {
  return (
    userInfo.value.phone &&
    userInfo.value.verifyCode &&
    userInfo.value.agreement
  );
});
// 同意协议
const agreementHandler = () => {
  window.location.href = signUrl.value;
  showCredit.value = false;
};
const handleSigleAgreement = () => {
  userInfo.value.agreement = true;
  showAgree.value = false;
  showPrivacy.value = false;
};
//
const onFailed = ({ errors }: any) => {
  showToast(errors[0]?.message);
};

const onSubmit = async () => {
  const { agreement, ...data } = userInfo.value;
  try {
    loading.value = true;
    const {
      token: loginToken,
      contractId,
      tenantName,
    } = await creaditLogin(
      {
        ...data,
        tenant: validParams.tenant,
        id: validParams.id,
      },
      token
    );
    setToken(loginToken);
    tenantText.value = tenantName;
    localStorage.setItem("tenantName", tenantName);
    if (validParams.id && validParams.id.length) {
      const data = await getCreditReportFinishFile({
        signFlowId: contractId,
      });
      contractList.value = data.contractList;
      signUrl.value = data.signUrl;
      showCredit.value = true;
      return;
    }
    router.replace({
      name: "creditReportMain",
    });
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  try {
    const data = await valid(token);
    Object.assign(validParams, data);
    userInfo.value.phone = data.phone;
  } catch (e) {
    router.replace({
      path: "/404",
    });
  }
});
</script>
<style lang="scss" scoped>
// 自动适配 2x、3x 背景图
@mixin bg-image($url) {
  background-image: url($url + "@2x.png");
}
.login {
  height: 100%;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  &-header {
    position: relative;
    height: 150px;
    @include bg-image("@/assets/credit");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #5a94fc;
    overflow: hidden;
    h1 {
      color: #ffffff;
      font-size: 30px;
      font-weight: 600;
      margin: 96px 0 0 22px;
      letter-spacing: 0.42px;
    }
    .login-logo {
      position: absolute;
      left: 22px;
      top: 16px;
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
  }
  &-content {
    position: relative;
    flex: 1;
    background: #fff;
    margin-top: -16px;
    border-radius: 19px 19px 0 0;
    .van-cell-group {
      margin: 32px 10px;
    }
    :deep(input) {
      font-size: 16px;
    }
    :deep(.van-field__left-icon) {
      display: flex;
      align-items: center;
      margin-right: var(--van-padding-sm);
    }
    .code-btn {
      width: 100px;
      padding: 0 2px;
    }
  }

  .control {
    padding: 0 20px;
    .van-button {
      background-color: #457ff8;
      border: none;
    }
  }
}
.agreement {
  margin-top: 20px;
  padding: 0 20px;
  line-height: 16px;
  .van-checkbox {
    align-items: flex-start;
    :deep(.van-checkbox__label) {
      color: #666666;
    }
  }
  span {
    vertical-align: 0.25em;
    font-size: 14px;
  }
  .text-btn {
    color: var(--van-primary-color);
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
    }
  }
}
</style>
