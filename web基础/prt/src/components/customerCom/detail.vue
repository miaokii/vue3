<template>
  <van-skeleton title :row="20" :loading="loading">
    <van-form class="customer_form">
      <van-cell-group inset>
        <template v-for="(schema, index) in position" :key="index">
          <div class="item borderd">
            <div class="title">
              {{ schema.modules[0].title }}
            </div>
            <template
              v-for="(child, indexs) in schema.modules[0].componentList"
              :key="indexs"
            >
              <Com
                :schema="child.columnInfo"
                v-model:value="formData[child.columnInfo.fieldCode]"
                v-show="child.columnInfo.name !== '客户ID'"
                v-if="child.show"
                v-bind="child.renderConfig"
                labelAlign="left"
                :readonly="true"
                :required="false"
                class="readonly"
              />
            </template>
          </div>
        </template>
      </van-cell-group>
      <van-button
        block
        type="primary"
        class="custome_btn"
        @click="show = true"
        v-if="formData.processState === 10 && formData.permissionType !== 2"
      >
        处理询单
      </van-button>
    </van-form>
  </van-skeleton>
  <van-dialog
    v-model:show="show"
    :showConfirmButton="false"
    width="340px"
    className="order_dialog"
  >
    <div class="order_wrap">
      <div class="header">
        <span>询单处理</span>
      </div>
      <van-form @submit="orderSubmit">
        <div class="content">
          <Com
            v-for="schema in dialogSchema"
            :schema="schema"
            :key="schema.code"
            inputAlign="top"
            v-bind="schema"
            v-model:value="orderData[schema.fileCode]"
          />
        </div>
        <div class="footer">
          <van-button type="default" class="cancle_btn" @click="show = false">
            取消
          </van-button>
          <van-button type="primary" class="submit_btn" native-type="submit">
            确定
          </van-button>
        </div>
      </van-form>
    </div>
  </van-dialog>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref, toRaw, watch } from "vue";
import Com from "./index.vue";
import { useRoute } from "vue-router";
import { getPositions, getDetailData, doInquiry } from "@/apis/index";
import { websiteTitleEnum } from "@/enums/common";
import usePage from "./init";
import { showSuccessToast } from "vant";
const formData = reactive<Record<string, any>>({});
watch(
  formData,
  (v) => {
    console.log(v, "hsadkjsahdkjsahdkjsa");
  },
  {
    deep: true,
  }
);
const positions = ref();
const route = useRoute();
const [tableCode, websiteCode, ...rest] =
  (route.params.key as string).split("/") || [];
const routeData = reactive<Record<string, any>>({});
const loading = ref(true);
const show = ref(false);
const restParams = {};
const dialogSchema = [
  {
    code: "Select_001",
    name: "贷款资质",
    fileCode: "loanQualification",
    dataList: [
      {
        label: "有资质",
        value: "10",
      },
      {
        label: "无资质",
        value: "20",
      },
    ],
    required: true,
    rules: [{ required: true, message: "请选择" }],
  },
  {
    code: "Input_001",
    name: "报价年利率",
    fileCode: "quotedAnnualRate",
    required: true,
    type: "number",
    precisions: 2,
    rules: [{ required: true, message: "请输入" }],
  },
];
const orderData = reactive({});
const orderSubmit = () => {
  doInquiry({
    key: rest.join("/"),
    ...toRaw(orderData),
  }).then(() => {
    showSuccessToast("操作成功");
    _getDetailData();
    show.value = false;
  });
};
const _getDetailData = () => {
  getDetailData({
    key: rest.join("/"),
    tableCode,
    queryType: 1,
    type: 3,
    ...restParams,
  }).then((res) => {
    Object.assign(formData, res);
  });
};

document.title = decodeURI(websiteTitleEnum.DETAIL);
const params = {
  tableCode,
  key: rest.join("/"),
  type: "10",
};
Object.assign(routeData, params);
const { position, initForm, getAllId } = usePage({
  formData,
});
onMounted(() => {
  try {
    initForm(params, () => {
      Object.assign(restParams, getAllId());
      _getDetailData();
    });
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped lang="scss">
.order_dialog {
  .order_wrap {
    padding: 16px 0;
    .header {
      padding: 0 24px 16px;
      border-bottom: 1px solid #ebeef5;
      span {
        color: #333333;
        font-size: 14px;
      }
    }
    .content {
      padding: 24px 24px 32px;
    }
    .footer {
      padding: 0 24px;
      display: flex;
      .van-button {
        flex: 1;
        // padding: 9px 55px;
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
.custome_btn {
  background-color: #5687ff;
  border-radius: 8px;
  margin-top: 32px;
}
.customer_form {
  height: 100%;
  :deep(.van-cell-group--inset) {
    overflow: inherit;
    margin: 0;
  }
  .item {
    .title {
      position: relative;
      color: red;
      color: #333333;
      padding-left: 12px;
      font-size: 16px;
      margin-bottom: 13px;
      &::after {
        position: absolute;
        left: 0;
        content: " ";
        width: 4px;
        height: 16px;
        border-radius: 3px;
        background: #5687ff;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    :deep(.van-field__body) {
      border-color: #dcdfe6;
      border-radius: 8px;
      input {
        color: #333333;
        font-size: 14px;
      }
      .van-field__control:disabled {
        -webkit-text-fill-color: #333333;
        font-size: 14px;
      }
    }
    :deep(.van-cell) {
      margin-bottom: 16px;
    }
    &.borderd {
      :deep(.van-field__body) {
        border: none;
        border-radius: 0px;

        input {
          color: #333333;
          font-size: 14px;
        }
      }
      :deep(.van-cell) {
        margin-bottom: 16px;
        &::after {
          display: block;
        }
      }
    }
    :deep(.readonly) {
      pointer-events: none;
    }
  }
}
</style>
