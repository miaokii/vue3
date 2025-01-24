/**
 * 版本管理 当新版本发布时 做提示刷新
 */
import { ref } from "vue";
import { showNotify, showConfirmDialog } from "vant";
import request from "@/utils/axios";

interface VersionOption {
  intervalTime?: number;
}
export function useVersion(option: VersionOption) {
  const version = ref(localStorage.getItem("version") || "");
  const interval = ref<any>(null);
  const intervalTime = option.intervalTime || 60 * 1000;

  function initVersion() {
    // 这里取请求版本号
    getVersion().then((res: any) => {
      if (version.value !== res?.versionTime) {
        if (version.value) {
          showNotify({ type: "success", message: "已为您更新至最新版本！" });
        }
      }
      version.value = res?.versionTime || "";
      localStorage.setItem("version", version.value);
    });
  }
  initVersion();
  function intervalVersion() {
    interval.value = setInterval(() => {
      computedVersion();
    }, intervalTime);
  }
  intervalVersion();

  // 请求版本号
  async function getVersion() {
    try {
      const path = window.location.protocol + "//" + window.location.host;
      const { data } = await request.get(
        path + "/version.json",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
          baseURL: "",
        },
        {
          isReturnNativeResponse: true,
        }
      );
      if (data?.versionTime) return data;
      return null;
    } catch (e) {
      console.log(e);
    }
  }

  // 对比版本号
  function computedVersion() {
    getVersion().then((res: any) => {
      if (version.value !== res?.versionTime) {
        clearInterval(interval.value);
        handleUpdateVersion(res?.refresh);
      }
    });
  }

  // 版本更新
  function handleUpdateVersion(refreshType: string) {
    console.log(refreshType);
    switch (refreshType) {
      case "no":
        break;
      case "operation":
        operationVersion();
        break;
      case "forced":
        refresh();
    }
  }

  // 手动刷新
  function operationVersion() {
    let countdown = 60;
    const interval = ref<any>();
    interval.value = setInterval(() => {
      countdown--;
      const el = document.getElementById("changeDataContent");
      if (el) {
        el.innerHTML = `系统将在${countdown}秒后自动刷新页面，如有操作请及时保存`;
      }
      if (countdown === 0) {
        refreshNow();
      }
    }, 1000);
    showConfirmDialog({
      title: "系统更新",
      message: () => (
        <div id="changeDataContent">{`系统将在${countdown}秒后自动刷新页面，如有操作请及时保存`}</div>
      ),
      confirmButtonText: "立即刷新",
      cancelButtonText: "稍后刷新",
    })
      .then(() => {
        refreshNow();
      })
      .catch(() => {
        //
      });
    function refreshNow() {
      clearInterval(interval.value);
      refresh();
    }
  }

  function refresh() {
    location.reload();
  }

  // 切换菜单，检查更新 强制刷新
  function hardRefreshVersion() {
    getVersion().then((res) => {
      if (res?.versionTime && version.value !== res.versionTime) {
        clearInterval(interval.value);
        refresh();
      }
    });
  }
}
