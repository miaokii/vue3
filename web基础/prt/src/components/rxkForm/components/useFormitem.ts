import type { UnwrapRef, Ref, WritableComputedRef, DeepReadonly } from "vue";
import { isEmpty } from "@/utils/is";
import {
  reactive,
  readonly,
  computed,
  getCurrentInstance,
  watchEffect,
  unref,
  nextTick,
  toRaw,
} from "vue";
export function useRuleFormItem<T extends Recordable>(
  props: T,
  key: keyof T = "value",
  changeEvent = "update:value",
  emitData?: Ref<any[]>
) {
  const instance = getCurrentInstance();
  const emit = instance?.emit;

  const innerState = reactive({
    value: props[key],
  });

  const defaultState = readonly(innerState);

  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T];
  };

  watchEffect(() => {
    innerState.value = props[key];
  });

  const state: any = computed({
    get() {
      return innerState.value;
    },
    set(value) {
      innerState.value = value as T[keyof T];
      nextTick(() => {
        emit?.(changeEvent, value, ...(toRaw(unref(emitData)) || []));
      });
    },
  });

  return [state, setState, defaultState];
}
