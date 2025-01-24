<template>
  <van-field
    @click="show = true"
    label="身份证号"
    class="rxk_input idCard"
    v-bind="$attrs"
    v-model="state"
    name="idcard"
    readonly
    :required="$attrs.required"
    :rules="[
      {
        required: $attrs.required,
        message: '请输入身份证号',
      },
      {
        validator: validatorMessage,
        message: '请输入正确的身份证号',
      },
    ]"
  >
  </van-field>
  <van-number-keyboard
    maxlength="18"
    :show="show"
    extra-key="X"
    close-button-text="完成"
    @blur="show = false"
    v-model="state"
  />
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRuleFormItem } from "./useFormitem";
export default defineComponent({
  inheritAttrs: false,
  props: {
    value: { type: String },
  },
  setup(props, { attrs }) {
    console.log(attrs, "attrsattrsattrsattrs");
    const validatorMessage = (v) => {
      if (!attrs.required) return true;
      const reg = new RegExp(
        "^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$"
      );
      return reg.test(v);
    };
    const [state] = useRuleFormItem(props);
    const show = ref(false);
    return { state, show, validatorMessage };
  },
});
</script>
<style scoped lang="scss">
.rxk_input {
  ::v-deep(.van-cell__title) {
    font-size: 14px;
    color: #666666;
  }
  ::v-deep(.van-field__body) {
    border-radius: 3px;
    border: 0.5px solid #d2d2d2;
    padding: 5px 10px;
  }
}
.van-cell {
  padding: 0;

  overflow: inherit;
  &::after {
    display: none;
  }
  margin-bottom: 16px;
}
</style>
