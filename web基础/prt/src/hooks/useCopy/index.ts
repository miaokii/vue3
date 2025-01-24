import { ref, watch, unref } from "vue";

import { isUndef } from "@/utils/is";
interface Options {
  target?: HTMLElement;
}
export function useCopy(initial?: string) {
  const clipboard = ref(initial || "");
  const isSuccess = ref(false);
  const copiedRef = ref(false);

  watch(
    clipboard,
    (str?: string) => {
      console.log(str, "str11111", unref(str));

      if (!isUndef(unref(str))) {
        copiedRef.value = true;
        isSuccess.value = copyTextToClipboard(unref(str!));
      }
    },
    { immediate: !!initial, flush: "sync" }
  );

  return { clipboard, isSuccess, copiedRef };
}

export function copyTextToClipboard(
  input: string,
  { target = document.body }: Options = {}
) {
  const element = document.createElement("textarea");
  const previouslyFocusedElement = document.activeElement;
  element.value = input;
  element.setAttribute("readonly", "");
  (element.style as any).contain = "strict";
  element.style.position = "absolute";
  element.style.left = "-9999px";
  element.style.fontSize = "12pt";
  const selection = document.getSelection();
  let originalRange;
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }
  target.append(element);
  element.select();
  element.selectionStart = 0;
  element.selectionEnd = input.length;

  let isSuccess = false;
  try {
    document.execCommand("copy");
    isSuccess = true;
  } catch (e: any) {
    throw new Error(e);
  }
  element.remove();
  if (originalRange && selection) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }
  if (previouslyFocusedElement) {
    (previouslyFocusedElement as HTMLElement).focus();
  }
  return isSuccess;
}
