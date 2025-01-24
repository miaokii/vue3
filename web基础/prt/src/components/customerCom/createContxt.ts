import { createContext, useContext } from "@/hooks/useContext";
interface GraphContext {
  setFiledVisible: (filed: Recordable, value: any) => boolean;
}

const key = Symbol();
export function createGraphContext(context: any) {
  return createContext(context, key);
}

export function useGraphContext(): GraphContext {
  return useContext(key);
}
