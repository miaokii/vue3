<template>
  <div class="custome_select">
    <van-field
      :modelValue="showText"
      v-bind="$attrs"
      :right-icon="readonly ? '' : 'arrow-down'"
      readonly
      @click="showPicker = true"
      class="rxk_input"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import { defineComponent, ref, computed, unref } from "vue";
import { useRuleFormItem } from "./useFormitem";
import { useGraphContext } from "@/components/customerCom/createContxt";

export default defineComponent({
  props: {
    value: { type: String, default: "" },
    readonly: { type: Boolean, default: false },
  },
  setup(props, { attrs }) {
    const { setFiledVisible } = useGraphContext();

    const [state] = useRuleFormItem(props);
    const columns = attrs?.dataList.map((i) => ({
      text: i.label,
      value: i.value,
    }));
    const fieldValue = ref("");
    const showPicker = ref(false);
    const onConfirm = ({ selectedOptions }) => {
      showPicker.value = false;
      state.value = selectedOptions[0].value;
      fieldValue.value = selectedOptions[0].text;
      setFiledVisible(attrs, state.value);
    };
    const showText = computed(() => {
      return props.readonly
        ? columns.find(({ value }) => +value === unref(state))?.text || "-"
        : unref(fieldValue);
    });
    return { state, columns, onConfirm, fieldValue, showPicker, showText };
  },
});
</script>
<style scoped lang="scss">
.rxk_input {
  ::v-deep(.van-cell__title) {
    font-size: 14px;
    color: #666666;
  }
  :deep(.van-field__body) {
    border-radius: 3px;
    border: 0.5px solid #d2d2d2;
    padding: 5px 10px;

    textarea {
      word-break: break-all;
    }
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
