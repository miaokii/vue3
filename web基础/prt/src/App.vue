<template>
  <router-view />
</template>
<script>
import { useVersion } from "@/hooks/useVersion";
import { getQueryParamsCopy } from "@/utils/tools";
const params = getQueryParamsCopy(window.location.href);
localStorage.setItem("urlParams", JSON.stringify(params));
export default {
  setup() {
    console.log(window.location, "window.location");
    if (process.env.NODE_ENV !== "development") {
      useVersion({});
    }
  },
};
</script>
