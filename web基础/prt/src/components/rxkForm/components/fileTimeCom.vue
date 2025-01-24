<template>
  <van-field
    @click="showPopup"
    v-bind="$attrs"
    class="rxk_input"
    readonly
    :right-icon="readonly ? '' : 'arrow-down'"
    :modelValue="showArea"
  />
  <van-popup v-model:show="show" position="bottom" :style="{ height: '50%' }">
    <van-time-picker
      v-model="state"
      :columns-type="$attrs.columnsType"
      title="选择时间"
      @cancel="show = false"
      @confirm="confirm"
    />
  </van-popup>
</template>
<script>
import { defineComponent, ref, computed, unref } from "vue";
import { useRuleFormItem } from "./useFormitem";
import { areaList } from "@vant/area-data";
import { isArray } from "@/utils/is";

export default defineComponent({
  props: {
    value: { type: [String, Array] },
    readonly: { type: Boolean, default: false },
  },
  setup(props, { attrs }) {
    console.log(attrs, "attrsattrsattrs");
    const show = ref(false);
    const selected = ref([]);
    const [state] = useRuleFormItem(props);
    const showPopup = () => {
      show.value = true;
    };
    const confirm = ({ selectedValues }) => {
      state.value = selectedValues;
      show.value = false;
    };
    const showArea = computed(() => {
      return isArray(unref(state))
        ? unref(state).join("-")
        : unref(state) || "-";
    });
    return {
      state,
      areaList,
      show,
      showPopup,
      confirm,
      showArea,
      selected,
    };
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
