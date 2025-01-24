import {
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
  // defineComponent,
} from "vue";

export interface CreateContextOptions {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
}

export function createContext(
  context: any,
  key = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = false, native = false } = options;

  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);

  return {
    state,
  };
}

export function useContext<T>(key: any, native?: boolean): T;
export function useContext<T>(
  key: any,
  defaultValue?: any,
  native?: boolean
): T;

export function useContext(key = Symbol(), defaultValue?: any) {
  return inject(key, defaultValue || {});
}
