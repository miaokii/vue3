<template>
  <van-field v-bind="$attrs" class="rxk_input">
    <template #input>
      <van-checkbox-group v-model="state" direction="horizontal" icon-size="16">
        <van-checkbox
          :name="item.value"
          v-for="item in columns"
          :key="item.value"
          shape="square"
          >{{ item.text }}</van-checkbox
        >
      </van-checkbox-group>
    </template>
  </van-field>
</template>
<script>
import { defineComponent } from "vue";
import { useRuleFormItem } from "./useFormitem";
export default defineComponent({
  props: {
    value: { type: Array, default: () => [] },
  },
  setup(props, { attrs }) {
    const [state] = useRuleFormItem(props);
    console.log(props, "propspropspropspropspropsprops");
    const columns = attrs?.dataList.map((i) => ({
      text: i.label,
      value: i.value,
    }));
    return { state, columns };
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
