<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :style="`font-size: ${size}px; color:${color}`"
  >
    <use :xlink:href="iconClassName" />
  </svg>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    iconName: string;
    className?: string;
    color?: string;
    size?: number | string;
  }>(),
  {
    iconName: "",
    className: "",
    color: "",
    size: 16,
  }
);
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#icon-${props.iconName}`;
});
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon";
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  position: relative;
  fill: currentColor;
  vertical-align: -0.2em;
}
</style>
