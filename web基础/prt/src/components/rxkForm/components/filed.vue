<template>
  <van-field
    v-model="state"
    v-bind="$attrs"
    class="rxk_input"
    :formatter="formatter"
  >
    <template v-for="item in Object.keys($slots)" #[item]>
      <slot :name="item" :data="state" />
    </template>
    <template #button>
      <div v-if="$attrs.unit" class="unit">{{ $attrs.unit }}</div>
    </template>
  </van-field>
</template>
<script>
import { defineComponent } from "vue";
import { useRuleFormItem } from "./useFormitem";
export default defineComponent({
  props: {
    value: { type: String, default: "" },
    notSpaces: { type: Boolean, default: false }, // 禁止输入空格
  },
  setup(props, { attrs }) {
    const [state] = useRuleFormItem(props);
    const formatter = (v) => {
      if (attrs.precisions) {
        const str = v.toString();
        const [start, decimalVal] = str.split(".");
        return decimalVal
          ? [start, decimalVal?.slice(0, attrs.precisions)].join(".")
          : v;
      }
      if (props.notSpaces) {
        return v.replace(/\s*/g, "");
      }
      return v;
    };
    return { state, formatter };
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
    border: 0.5px solid #d2d2d2;
    padding: 5px 10px;

    textarea {
      word-break: break-all;
    }
  }
}
.unit {
  font-size: 14px;
  color: #666666;
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
