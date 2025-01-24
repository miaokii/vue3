<template>
  <van-field v-bind="$attrs" class="rxk_input">
    <template #input>
      <van-radio-group
        v-model="state"
        direction="horizontal"
        icon-size="16"
        @change="radioChange"
      >
        <van-radio
          :name="item.value"
          v-for="item in columns"
          :key="item.value"
          >{{ item.text }}</van-radio
        >
      </van-radio-group>
    </template>
  </van-field>
</template>
<script>
import { defineComponent } from "vue";
import { useRuleFormItem } from "./useFormitem";
import { useGraphContext } from "@/components/customerCom/createContxt";

export default defineComponent({
  props: {
    value: { type: String, default: "" },
  },
  setup(props, { attrs }) {
    const { setFiledVisible } = useGraphContext();

    const [state] = useRuleFormItem(props);
    const columns = attrs?.dataList.map((i) => ({
      text: i.label,
      value: i.value,
    }));
    const radioChange = (v) => {
      setFiledVisible?.(attrs, v);
    };
    return { state, columns, radioChange };
  },
});
</script>
<style scoped lang="scss">
.rxk_input {
  :deep(.van-cell__title) {
    font-size: 14px;
    color: #666666;
  }
  :deep(.van-field__body) {
    border-radius: 3px;
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
