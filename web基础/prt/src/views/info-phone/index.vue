<template>
  <div class="invite-code-page">
    <span class="name">请输入您被邀约的手机号</span>
    <span class="name-tip"
      >如果您忘记邀约码，可输入您被邀约的手机号信息（接收邀约码的手机号）</span
    >
    <CodeInput v-model:value="form.code" :length="11"></CodeInput>

    <div class="error-box">
      <span v-if="errMsg">{{ errMsg }}</span>
    </div>
    <div class="other-info phone">
      忘记手机号，<span class="info" @click="checkCode">验证邀约码</span>
    </div>
    <button
      :class="['register-btn', btnDisabled ? 'disabled' : '']"
      :disabled="btnDisabled"
      @click="register"
    >
      登记
    </button>
    <div class="other-info">
      无邀约码，<span class="info" @click="goRegister">手动创建信息</span>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { inviteCodeRegisterCodeApi } from "@/apis/invite";
import CodeInput from "@/components/code-input/index.vue";
import { useDebounceFn } from "@/utils/tools";
import { phoneReg } from "@/enums/reg";

export default defineComponent({
  name: "InvitePhone",
  components: {
    CodeInput,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userId = (route.query.a as string) || "";
    console.log("route");
    const form = reactive({
      code: "",
    });
    const errMsg = ref<string>("");
    const btnDisabled = computed<boolean>(() => {
      return form.code.length < 11;
    });
    // 跳转去信息登记页面
    const goRegister = () => {
      router.push({
        path: "/infoRegister",
        query: {
          a: userId,
        },
      });
    };

    const checkCode = () => {
      router.push({
        path: "/inviteCode",
        query: {
          a: userId,
        },
      });
    };
    // 邀请码登记
    const register = useDebounceFn(() => {
      if (!checkPhone()) return;
      inviteCodeRegisterCodeApi({
        code: form.code,
        tenantId: userId,
      }).then(() => {
        router.push("/registerSuccess");
      });
    });

    const checkPhone = () => {
      const phone = form.code.trim();
      if (!phoneReg.test(phone)) {
        errMsg.value = "请输入正确的手机号";
        return false;
      } else {
        return true;
      }
    };

    return {
      errMsg,
      form,
      goRegister,
      checkCode,
      register,
      btnDisabled,
    };
  },
});
</script>

<style scoped lang="scss">
.invite-code-page {
  padding: 0 32px;
  background: url("~@/assets/invite-bg.png") no-repeat center;
  background-size: 100% 100%;
  .name {
    display: block;
    padding: 80px 0 8px 0;
    color: #000000;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
  }
  .name-tip {
    display: block;
    margin-bottom: 30px;
    font-size: 14px;
    color: #999999;
    text-align: center;
  }
  .input-com {
    width: 100%;
    height: 60px;
    background-color: #f6f8fc;
    border-radius: 4px;
    padding-left: 20px;
  }

  .error-box {
    color: #e05d58;
    font-size: 14px;
    padding: 12px 0 24px 0;
    margin-bottom: 20px;
  }
  .register-btn {
    width: 100%;
    height: 44px;
    border-radius: 37px;
    background: rgba(52, 144, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    margin-bottom: 16px;
    &.disabled {
      background: rgba(52, 144, 255, 0.2);
    }
  }
  .other-info {
    color: #666;
    font-size: 14px;
    text-align: center;
    .info {
      color: #3490ff;
    }
  }
  .phone {
    margin-bottom: 30px;
  }
}
</style>
