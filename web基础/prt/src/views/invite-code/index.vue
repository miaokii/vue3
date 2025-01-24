<template>
  <div class="invite-code-page">
    <span class="name">请输入邀请码</span>
    <span class="name-tip">如果您有邀约码，请直接在下方输入</span>
    <CodeInput v-model:value="form.code"></CodeInput>
    <div class="error-box">
      <span v-if="errMsg">{{ errMsg }}</span>
    </div>
    <div class="other-info phone">
      忘记邀约码，<span class="info" @click="checkPhone">验证手机号</span>
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

export default defineComponent({
  name: "InviteCode",
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
      return form.code.length < 6;
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
    // 跳转去验证手机号
    const checkPhone = () => {
      router.push({
        path: "/invitePhone",
        query: {
          a: userId,
        },
      });
    };
    // 邀请码登记
    const register = useDebounceFn(() => {
      errMsg.value = "";
      inviteCodeRegisterCodeApi({
        code: form.code,
        tenantId: userId,
      }).then(() => {
        router.push("/registerSuccess");
      });
    });

    return {
      errMsg,
      form,
      goRegister,
      checkPhone,
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
