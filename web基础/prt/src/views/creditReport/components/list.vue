<template>
  <div class="list">
    <van-search
      v-if="params.native"
      v-model="search"
      placeholder="搜索客户名称"
      @search="onSearch"
    />
    <div class="top">
      <div @click="handleSort" class="left-icon">
        <span>查询时间</span>
        <img src="@/assets/sort.png" alt="" :class="sort ? 'active' : ''" />
      </div>
      <div class="divider" />
      <div class="scroll_handller">
        <div
          :class="['item', item.val === state ? 'active' : '']"
          v-for="item in tabs"
          :key="item.val"
          @click="handleClick(item.val, $event)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="wrap"
        :style="{ height: params.native ? '100%' : 'calc(100% - 46px)' }"
        v-model:loading="loading"
        @load="onLoad"
        :finished="finished"
        v-if="list.length"
      >
        <div
          class="wrap_item"
          v-for="item in list"
          :key="item.id"
          @click="to(item)"
        >
          <div class="mask">
            <div
              class="error"
              v-if="
                ['NOT_GENERATED', 'FAILED'].includes(item.reportStatus) &&
                item.authorizationStatus === 'AUTHORIZED'
              "
              @click.stop="refresh(item)"
            >
              <img src="@/assets/refresh.png" alt="" />
              <span>重新生成报告</span>
            </div>
          </div>
          <div class="main">
            <div class="left">
              <div class="name" v-if="params.native">
                {{ item.customerName }}
              </div>
              <div
                class="state"
                :class="{ scuess: item.reportStatus === 'PROCESSING' }"
              >
                {{ statusText[item.reportStatus] }}
              </div>
            </div>
            <div class="right">
              <div class="name2" v-if="params.native">
                {{ item.createByName || "-" }}
              </div>
              <div class="date">{{ item.requestTime || "-" }}</div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="empty" v-else>
        <img :src="NotFound" alt="" />
        <p>暂无数据</p>
      </div>
    </van-pull-refresh>
    <div class="native_footer" v-if="params.native">
      <div class="count">
        <span class="label"
          >报告总数：<span class="all">{{ count.totalTimes }}</span></span
        >
        <span class="label"
          >剩余查询次数：<span class="rest">{{ count.remainTimes }}</span></span
        >
      </div>
      <div class="btns" v-if="hasShare || hasQuery">
        <van-button
          round
          plain
          type="primary"
          :icon="Share"
          @click="shareClick"
          v-if="hasShare"
          >分享</van-button
        >
        <van-button
          v-if="hasQuery"
          round
          type="primary"
          style="flex: 1"
          @click="toForm"
          >查询信用报告</van-button
        >
      </div>
    </div>
    <van-popup
      v-model:show="share"
      round
      closeable
      position="bottom"
      :style="{ height: '35%', padding: '16px' }"
    >
      <div class="share-dialog">
        <div class="share-title">分享</div>
        <div class="share-container">
          <div class="share-expire">
            <span class="label">分享有效期：</span>
            <div
              :class="['item', item.value === shareActive ? 'active' : '']"
              v-for="item in expireList"
              :key="item.value"
              @click="shareLink(item.value)"
            >
              {{ item.label }}
            </div>
          </div>
          <p class="shareUrl">
            <span class="label">链接地址：</span>
            {{ shareUrl }}
          </p>
          <div class="qr_code" style="display: none">
            <div ref="qrRef" id="qrcode" />
          </div>
          <div class="share-btn">
            <van-button
              round
              type="primary"
              :icon="Link"
              style="flex: 1"
              @click="handleCopy"
              >复制链接</van-button
            >

            <van-button
              round
              type="primary"
              :icon="Qr"
              style="flex: 1"
              @click="download"
              >下载二维码</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { ref, unref, onMounted, defineEmits, computed } from "vue";
import { useRouter } from "vue-router";
import { useToggle } from "@vant/use";
import {
  creditListGet,
  mallCREDITREPORTGet,
  shareUrlGet,
  creditListAppGet,
} from "@/apis";
import NotFound from "@/assets/notFound.png";
import Share from "@/assets/share.png";
import Link from "@/assets/link.png";
import Qr from "@/assets/qr.png";

import { showToast } from "vant";
import QRCode from "qrcodejs2-fix";
import { saveAs } from "file-saver";
import { useClipboard } from "@vueuse/core";

const params = JSON.parse(localStorage.getItem("urlParams") || "{}");
const emit = defineEmits(["toogle"]);
const router = useRouter();
const search = ref("");
const state = ref("");
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const share = ref(false);
const shareUrl = ref("");
const shareActive = ref("1");
const { copy, text } = useClipboard({ source: shareUrl, legacy: true });
const qrRef = ref();
const count = ref({
  totalTimes: 0,
  remainTimes: 0,
});
const [sort, toggle] = useToggle(true);
const hasShare = computed(() => {
  return params.share === "true";
});
const hasQuery = computed(() => {
  return params.query === "true";
});

const statusText: any = {
  FAILED: "生成失败",
  GENERATED: "生成成功",
  PROCESSING: "生成中",
  NOT_GENERATED: "未生成",
};
const list = ref<Recordable[]>([]);
const expireList = [
  {
    label: "1天",
    value: "1",
  },
  {
    label: "7天",
    value: "7",
  },
  {
    label: "永久",
    value: "-1",
  },
];
const tabs = [
  {
    label: "全部",
    val: "",
  },
  {
    label: "未生成",
    val: "NOT_GENERATED",
  },
  {
    label: "生成中",
    val: "PROCESSING",
  },
  {
    label: "已生成",
    val: "GENERATED",
  },
  {
    label: "生成失败",
    val: "FAILED",
  },
];

function handleClick(val: string, event: Event) {
  (event.target as HTMLDivElement)?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
  state.value = val;

  onLoad();
}
function handleSort() {
  toggle();

  onLoad();
}
function to(item: Recordable) {
  router.push({
    name: "creditReportDetail",
    params: {
      id: item.id,
    },
  });
}
const refresh = (item: Recordable) => {
  localStorage.setItem("creditId", item.id);
  emit("toogle");
};
const onLoad = () => {
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }
  let fetchApi = creditListGet;
  if (params.native) {
    fetchApi = creditListAppGet;
  }
  fetchApi(
    {
      status: state.value,
      descQueryTime: sort.value,
      customerName: unref(search),
    },
    {
      menuId: params.menuId,
      authToken: params.authToken,
    }
  ).then((res) => {
    list.value = res || [];
    loading.value = false;
    finished.value = true;
  });
};
const onRefresh = () => {
  finished.value = false;
  loading.value = true;
  onLoad();
};
const onSearch = () => {
  loading.value = true;
  onLoad();
};

const shareLink = async (value: any) => {
  shareActive.value = value;
  const res = await shareUrlGet({
    validDay: shareActive.value,
  });
  shareUrl.value = res;
};
shareLink("1");
const handleCopy = () => {
  copy(shareUrl.value);
  console.log(text, "texttext");
  showToast("复制成功");
};
const download = async () => {
  const res = await shareUrlGet({
    validDay: shareActive.value,
  });
  let codeView: any = document.getElementById("qrcode");
  //删除子元素
  while (codeView.firstChild) {
    codeView.removeChild(codeView.firstChild);
  }
  new QRCode(qrRef.value, {
    text: res,
    width: 180,
    height: 180,
  });
  const canvas: HTMLCanvasElement | null =
    document.querySelector(".qr_code canvas");

  if (canvas) {
    setTimeout(async () => {
      const blob = await canvas.toDataURL();
      saveAs(blob);
    }, 1000);
  }
};
const shareClick = () => {
  if (!count.value.remainTimes) {
    return showToast("信用报告查询次数不够，请登录电脑端完成商品购买");
  }
  share.value = true;
};
const toForm = () => {
  if (!count.value.remainTimes) {
    return showToast("信用报告查询次数不够，请登录电脑端完成商品购买");
  }
  emit("toogle");
};
onMounted(async () => {
  onLoad();
  if (params.native) {
    const data = await mallCREDITREPORTGet();
    count.value = {
      remainTimes: data.remainTimes || 0,
      totalTimes: data.totalTimes || 0,
    };
  }
});
</script>
<style lang="scss" scoped>
.list {
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #666;
    padding: 12px 0 10px 24px;
    .left-icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      img {
        width: 14px;
        margin-left: 4px;
        flex-shrink: 0;
        transition: transform 0.2s linear;
        &.active {
          transform: rotate(180deg);
        }
      }
    }
    .scroll_handller {
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;
    }
    .divider {
      width: 0.8px;
      height: 22px;
      background: #dcdfe6;
      margin: 0 10px;
      flex-shrink: 0;
    }

    span {
      flex-shrink: 0;
    }
    .item {
      flex-shrink: 0;
      background-color: transparent;
      padding: 5px 8px;
      border-radius: 5px;
      margin-left: 4px;

      &.active {
        background-color: #eef3ff;

        color: #457ff8;
      }
    }
  }
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 180px;
    img {
      width: 196px;
      margin-bottom: 20px;
    }
    p {
      font-size: 12px;
      color: #999999;
    }
  }
  .van-pull-refresh {
    height: 100%;
  }
  .wrap {
    margin-top: 16px;
    padding: 0 24px;
    flex: 1;
    padding-bottom: 24px;
    &_item {
      width: 151px;
      display: inline-block;
      &:nth-child(2n) {
        margin-left: 24px;
        margin-bottom: 24px;
      }
      .mask {
        width: 100%;
        border-radius: 4px;
        height: 90px;
        background: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("@/assets/mask-bg.png") no-repeat top/100%;
        .error {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
            &:hover {
              transform: rotate(180deg);
              transition: all 1s linear;
            }
          }
          span {
            color: #5687ff;
            margin-top: 4px;
            font-size: 14px;
          }
        }
      }
      .main {
        .left {
          margin: 4px 0;
        }
        .left,
        .right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            color: #333333;
            font-size: 14px;
            font-weight: 600;
          }
          .state {
            color: #aaaaaa;
            font-size: 12px;
            &.scuess {
              color: #5687ff;
            }
          }
          .date {
            font-size: 10px;
            color: #aaaaaa;
          }
          .name2 {
            font-size: 12px;
            color: #aaaaaa;
          }
        }
      }
    }
  }
  .native_footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #fff;
    .count {
      width: 100%;

      padding: 9px 24px;
      display: flex;
      justify-content: space-between;
      .label {
        font-size: 14px;
        color: #666666;
        .all {
          color: #333333;
          font-weight: 600;
        }
        .rest {
          color: #f44d4d;
          font-weight: 600;
        }
      }
    }
    .btns {
      padding: 10px 16px;
      width: 100%;
      border-top: 1px solid #dcdfe6;
      display: flex;
      column-gap: 16px;
    }
  }
  .share-dialog {
    height: 100%;
    .share-title {
      color: #333333;
      padding-bottom: 14px;
      font-size: 16px;

      font-weight: 700;
    }
    .share-container {
      padding: 30px 24px 0 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-top: 1px solid #ebeef5;
      margin: 0 -16px;
      .share-expire {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #666;
        .item {
          flex: 1;
          flex-shrink: 0;
          background-color: transparent;
          padding: 5px 8px;
          border-radius: 5px;
          text-align: center;

          &.active {
            background-color: #eef3ff;

            color: #457ff8;
          }
        }
      }
      .shareUrl {
        margin-top: 12px;
        font-size: 14px;
        color: #666;
        white-space: nowrap;
      }
      .share-btn {
        margin-top: 26px;
        display: flex;
        align-items: center;
        column-gap: 16px;
      }
    }
  }
}
.van-list {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
