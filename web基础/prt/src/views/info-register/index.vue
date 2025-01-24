<template>
  <div class="register-page">
    <div class="content">
      <div class="form-item">
        <span class="name">请输入邀约人电话</span>
        <input
          type="tel"
          class="form-input"
          v-model.trim="form.empMobile"
          maxlength="11"
          placeholder="请输入"
          @blur="inputBlur('empMobile')"
        />
        <div class="error-box">
          <span>{{ errInfo.empMobile }}</span>
        </div>
      </div>
      <div class="form-item">
        <span class="name">请输入您的姓名</span>
        <input
          type="text"
          class="form-input"
          v-model="form.cusName"
          maxlength="10"
          placeholder="请输入"
          @blur="inputBlur('cusName')"
          @input="form.cusName = form.cusName.replace(/\s*/g, '')"
        />
        <div class="error-box">
          <span>{{ errInfo.cusName }}</span>
        </div>
      </div>
      <div class="form-item">
        <span class="name">请输入您的手机号码</span>
        <input
          type="tel"
          class="form-input"
          v-model.trim="form.customerMobile"
          maxlength="11"
          placeholder="请输入"
          @blur="inputBlur('customerMobile')"
        />
        <div class="error-box">
          <span>{{ errInfo.customerMobile }}</span>
        </div>
      </div>
      <div class="form-item">
        <span class="name">请输入验证码</span>
        <div class="code-box">
          <input
            type="tel"
            class="form-input"
            v-model.trim="form.msgCode"
            maxlength="4"
            placeholder="请输入"
            @blur="inputBlur('msgCode')"
          />
          <span
            :class="['code-text', disabledBtn || isStart ? 'disabled' : '']"
            @click="sendCode"
            >{{ codeText }}</span
          >
        </div>
        <div class="error-box">
          <span>{{ errInfo.msgCode }}</span>
        </div>
      </div>
      <div class="btn-box">
        <button class="register-btn" @click="register">登记</button>
      </div>
      <div class="protocol-box form-item">
        <div class="check-box">
          <van-checkbox
            v-model="isSelectProtocol"
            shape="square"
            icon-size="14px"
          >
          </van-checkbox>
          <span>已阅读并同意</span>
          <span class="agreen" @click="handleAgreen"
            >《个人信息使用授权条款》</span
          >
        </div>
        <div class="error-box" v-show="errInfo.protocol && !isSelectProtocol">
          <span>{{ errInfo.protocol }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { businessTabList } from "@/enums";
import { useCountdown } from "@/hooks/use-countdown";
import { isNullOrUndefOrEmpty } from "@/utils/is";
import { phoneReg, nameReg } from "@/enums/reg";
import { sendMsg, registerInfo } from "@/apis/invite";
import { useRoute, useRouter } from "vue-router";
// import { globalSettings } from "@/configs";
import { useDebounceFn } from "@/utils/tools";

const defaultTime = 60;
interface ErrorInfo {
  empMobile: string;
  cusName: string;
  customerMobile: string;
  msgCode: string;
  protocol: string;
}

export default defineComponent({
  name: "InfoRegister",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userId = (route.query.a as string) || "";
    const businessTab = businessTabList;

    // 验证码
    const { currentCount, start, isStart } = useCountdown(defaultTime);
    // 验证码处展示文字
    const codeText = computed<string>(() => {
      return isStart.value ? `${currentCount.value}s` : "发送验证码";
    });
    const disabledBtn = computed<boolean>(() => {
      return !!validatePhone();
    });
    // 点击发送验证码
    const sendCode = useDebounceFn(() => {
      if (isStart.value || disabledBtn.value) {
        return;
      }
      // 接口请求成功后执行successFn
      const successFn = () => {
        start();
      };
      sendMsg({ mobile: form.customerMobile, tenantId: userId }).then(() => {
        successFn();
      });
    });
    const form = reactive({
      cusName: "",
      customerMobile: "",
      empMobile: "",
      msgCode: "",
    });
    // 验证邀约人电话
    const validateEmpMobile = (): string => {
      const phone = form.empMobile;
      let msg = "";
      if (isNullOrUndefOrEmpty(phone) || !phoneReg.test(phone)) {
        msg = "请输入正确的手机号";
      }
      return msg;
    };
    // 验证名字
    const validateContactName = (): string => {
      const name = form.cusName;
      let msg = "";
      if (isNullOrUndefOrEmpty(name)) msg = "请输入您的姓名";
      if (nameReg.test(name)) msg = "请输入正确的姓名";
      return msg;
    };
    // 验证手机号
    const validatePhone = () => {
      const phone = form.customerMobile;
      let msg = "";
      if (isNullOrUndefOrEmpty(phone) || !phoneReg.test(phone)) {
        msg = "请输入正确的手机号";
      }
      return msg;
    };
    // 验证验证码
    const validateCode = () => {
      const code = form.msgCode;
      let msg = "";
      if (isNullOrUndefOrEmpty(code)) {
        msg = "请输入验证码";
      }
      return msg;
    };
    const errInfo = reactive<ErrorInfo>({
      empMobile: "",
      cusName: "",
      customerMobile: "",
      msgCode: "",
      protocol: "",
    });
    const inputBlur = (key: string) => {
      switch (key) {
        case "empMobile":
          blurempMobile();
          break;
        case "customerMobile":
          blurPhone();
          break;
        case "msgCode":
          blurCode();
          break;
        case "cusName":
          blurContactName();
          break;
      }
    };
    // 邀约人电话失焦
    const blurempMobile = () => {
      errInfo.empMobile = validateEmpMobile();
    };
    // 联系人失焦
    const blurContactName = () => {
      errInfo.cusName = validateContactName();
    };
    // 手机失焦
    const blurPhone = () => {
      errInfo.customerMobile = validatePhone();
    };
    // code 失焦
    const blurCode = () => {
      errInfo.msgCode = validateCode();
    };
    // 同意协议
    const isSelectProtocol = ref<boolean>(false);

    function handleAgreen() {
      router.push({
        path: "/agreement",
        query: {
          a: userId,
        },
      });
    }
    // 注册
    const register = useDebounceFn(() => {
      if (!isSelectProtocol.value) {
        errInfo.protocol = "您未同意《个人信息使用授权协议》";
        return;
      }

      errInfo.empMobile = validateEmpMobile();
      errInfo.cusName = validateContactName();
      errInfo.customerMobile = validatePhone();
      errInfo.msgCode = validateCode();
      if (
        errInfo.empMobile ||
        errInfo.cusName ||
        errInfo.customerMobile ||
        errInfo.msgCode
      ) {
        return;
      }
      console.log(form);

      // 调用接口
      registerInfo({ ...form, tenantId: userId }).then((res) => {
        console.log(res);
        router.push("/registerSuccess");
      });
    });

    return {
      businessTab,
      codeText,
      sendCode,
      disabledBtn,
      isStart,
      errInfo,
      form,
      inputBlur,
      isSelectProtocol,
      register,
      handleAgreen,
    };
  },
});
</script>

<style scoped lang="scss">
.register-page {
  height: 100vh;
  padding: 16px;
  background: #f5f7fa;
  .content {
    background: #fff;
    border-radius: 16px;
    padding: 24px 16px;
  }
  .other-info {
    color: #666;
    font-size: 14px;
    text-align: center;
    .info {
      color: #3490ff;
    }
  }
  .btn-box {
    width: 100%;
    margin-bottom: 20px;
  }
  .register-btn {
    width: 100%;
    height: 44px;
    border-radius: 8px;
    background: #5687ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
  }
  .protocol-box {
    font-size: 12px;
    .check-box {
      display: flex;
      align-items: center;
    }
    .van-checkbox {
      margin-right: 5px;
    }
    .agreen {
      color: #3490ff;
    }
  }
}
.form-item {
  .name {
    display: block;
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
  }
  .form-input {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
    padding-left: 12px;
    border: 1px solid #e7e7e7;
    font-size: 14px;
    &::placeholder {
      color: #bbbbbb;
    }
  }
  .code-box {
    position: relative;
    .code-text {
      font-size: 13px;
      width: 104px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #5687ff;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      &.disabled {
        color: #b8d6fa;
      }
    }
  }
  .error-box {
    color: #e05d58;
    font-size: 12px;
    height: 24px;
    padding-top: 8px;
  }
}
</style>
