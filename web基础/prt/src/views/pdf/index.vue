<script lang="tsx">
import { defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import { getPdfUrl, getSignStatus } from "@/apis/index";
import { showNotify } from "vant";
import PDF from "pdf-vue3";
enum SIGNENUM {
  SIGNED = "SIGNED",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
}
export default defineComponent({
  setup() {
    const {
      params: { id = "" },
      query: { csr_id = "" },
    } = useRoute();
    const state = reactive({
      url: "",
      status: SIGNENUM.IN_PROGRESS,
    });

    const pollInterval = 1000; // 每1秒检查一次
    let pollCount = 0; // 初始化轮询计数器
    let pollingTimer: ReturnType<typeof setInterval> | null;
    const maxPollCount = 20;
    // 轮询函数
    const pollForRepaymentStatus = async () => {
      try {
        const data = (await getSignStatus({ id: csr_id })) || {
          contractStatus: SIGNENUM.IN_PROGRESS,
          contractId: "",
        };

        if (
          ++pollCount >= maxPollCount ||
          data.contractStatus !== SIGNENUM.IN_PROGRESS
        ) {
          if (data.contractStatus === SIGNENUM.SIGNED) {
            await getPdfUrlSync(data.contractId);
            showNotify({ type: "success", message: "合同签署完成" });
          }
          state.status = data.contractStatus;

          pollingTimer && clearTimeout(pollingTimer);
        } else {
          pollingTimer = setTimeout(pollForRepaymentStatus, pollInterval);
        }
      } catch (error) {
        pollingTimer && clearTimeout(pollingTimer);
      }
    };
    if (csr_id) {
      pollForRepaymentStatus();
    } else if (id) {
      getPdfUrlSync(id as string).then(() => (state.status = SIGNENUM.SIGNED));
    }

    // 获取合同pdf
    async function getPdfUrlSync(id: string) {
      const url = await getPdfUrl({ id });
      state.url = url;
      return url;
    }
    return () => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {state.status === SIGNENUM.IN_PROGRESS && (
              <div>
                <div class="loading-spinner"></div>
                <div class="loading-text">系统处理中，请耐心等待</div>
              </div>
            )}
            {state.status === SIGNENUM.FAILED && (
              <div style={{ textAlign: "center" }}>
                <img
                  src={require("@/assets/sign.png")}
                  style={{ width: "77px" }}
                />
                <p class="status-text">认证失败</p>
                <p class="status-subText">请联系业务办理人员重新发起签约</p>
              </div>
            )}
          </div>
          {state.status === SIGNENUM.SIGNED && (
            <PDF src={state.url} showProgress />
          )}
        </div>
      );
    };
  },
});
</script>
<style scoped>
.loading-spinner {
  width: 66px;
  height: 66px;
  border: 6px solid #f3f3f3; /* Light grey color */
  border-top: 6px solid #356eff; /* Blue color */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  text-align: center;
  font-size: 18px;
  margin-top: 30px;
  color: #333;
}
.status-text {
  color: #333333;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 25px;
  margin-bottom: 16px;
}
.status-subText {
  color: #666666;
  font-size: 14px;
  font-style: normal;
  line-height: normal;
}
</style>
