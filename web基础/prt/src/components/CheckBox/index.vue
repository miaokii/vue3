<template>
  <van-checkbox
    v-model="model"
    v-bind="$attrs"
    :class="{ gray: $attrs.disabled }"
  >
    <template #icon="props">
      <svg-icon
        :icon-name="props.checked ? checkIcon : unCheckIcon"
        :size="iconSize"
        class="customer-icon"
      />
    </template>
    <slot />
  </van-checkbox>
</template>
<script lang="ts">
// export default {
//   inheritAttrs: false
// }
</script>

<script setup lang="ts">
import { computed, defineProps, withDefaults, defineEmits } from "vue";
import SvgIcon from "../SvgIcon/index.vue";
const props = withDefaults(
  defineProps<{
    iconSize?: number | string;
    checkIcon?: string;
    unCheckIcon?: string;
    modelValue?: boolean;
  }>(),
  {
    iconSize: 16,
    checkIcon: "fuxuan",
    unCheckIcon: "fuxuan-weixuanzhai",
    modelValue: false,
  }
);
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<style lang="scss" scoped>
:deep(.van-checkbox__icon) {
  display: inline-flex;
  align-items: center;
}
:deep(.van-checkbox__label) {
  font-size: 14px;
}
.gray {
  filter: grayscale(1);
}
.customer-icon {
  color: var(--primary-color);
}
</style>
