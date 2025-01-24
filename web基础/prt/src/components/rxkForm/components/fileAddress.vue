<template>
  <van-field
    @click="showPopup"
    v-bind="$attrs"
    class="rxk_input"
    :right-icon="readonly ? '' : 'arrow-down'"
    readonly
    :modelValue="showArea"
  />
  <van-field
    type="textarea"
    v-if="$attrs.precisions === 1 && !readonly"
    class="textarea"
    :modelValue="areaValue"
    @update:model-value="areaChange"
  />

  <van-popup v-model:show="show" position="bottom" :style="{ height: '50%' }">
    <van-area
      title="标题"
      :area-list="areaList"
      @cancel="show = false"
      @confirm="confirm"
    />
  </van-popup>
</template>
<script>
import { defineComponent, ref, computed, unref } from "vue";
import { useRuleFormItem } from "./useFormitem";
import { areaList } from "@vant/area-data";
export default defineComponent({
  props: {
    value: { type: String },
    readonly: { type: Boolean, default: false },
  },
  setup(props, { attrs }) {
    console.log(props, "propspropsprops", attrs);
    const show = ref(false);
    const selected = ref([]);
    const [state] = useRuleFormItem(props);
    const showPopup = () => {
      if (props.readonly) return;
      show.value = true;
    };
    const areaChange = (v) => {
      const citys = JSON.parse(unref(state) || "{}");
      citys.detail = v;
      state.value = JSON.stringify(citys);
    };
    const confirm = ({ selectedValues, selectedOptions }) => {
      const citys = JSON.parse(unref(state) || "{}");
      const [province, city, area] = selectedOptions;
      selected.value = selectedOptions;
      state.value = JSON.stringify({
        province: province.value,
        pName: province.text,
        city: city.value,
        cName: city.text,
        area: area.value,
        aName: area.text,
        detail: citys.detail || "",
      });
      show.value = false;
    };
    const showArea = computed(() => {
      if (props.readonly) {
        const {
          pName = "",
          cName = "",
          aName = "",
          detail = "",
        } = JSON.parse(state.value || "{}");
        return `${pName} ${cName} ${aName} ${detail}`;
      }
      return unref(selected)
        .map((i) => i.text)
        .join("-");
    });
    const areaValue = computed(() => {
      if (props.readonly) {
        const { detail } = JSON.parse(state.value || "{}");

        return detail || "";
      }
      const citys = JSON.parse(unref(state) || "{}");
      return citys.detail;
    });
    return {
      state,
      areaList,
      show,
      showPopup,
      confirm,
      showArea,
      selected,
      areaChange,
      areaValue,
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
    overflow: scroll;
    textarea {
      word-break: break-all;
    }
  }
}
.textarea {
  border: 0.5px solid #dcdfe6;
  border-radius: 8px;
}
.van-cell {
  padding: 0;

  overflow: inherit;
  &::after {
    display: none;
  }
  margin-bottom: 16px;
}
.readonly {
  pointer-events: auto !important;
}
</style>
