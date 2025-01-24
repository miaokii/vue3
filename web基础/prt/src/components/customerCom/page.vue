<template>
  <van-skeleton title :row="20" :loading="loading">
    <van-form class="customer_form" @submit="onSubmit">
      <van-cell-group inset>
        <template v-for="(schema, index) in position" :key="index">
          <div class="item">
            <div class="title">
              {{ schema.modules[0].title }}
            </div>
            <template
              v-for="(child, indexs) in schema.modules[0].componentList"
              :key="indexs"
            >
              <Com
                v-if="child.show"
                :schema="child.columnInfo"
                v-model:value="formData[child.columnInfo.fieldCode]"
                v-bind="child.renderConfig"
              />
            </template>
          </div>
        </template>
      </van-cell-group>
      <van-button
        block
        type="primary"
        native-type="submit"
        class="custome_btn"
        :disabled="disabled"
        :loading="btnLoading"
      >
        提交
      </van-button>
    </van-form>
  </van-skeleton>
</template>
<script setup lang="ts">
import { defineProps, reactive, onMounted, ref, watch } from "vue";
import Com from "./index.vue";
import { useRoute } from "vue-router";
import { isNullOrUndefOrEmpty, isArray } from "@/utils/is";
import {
  fieldTypeEnum,
  fieldTypeConfig,
  moduleType,
} from "@/enums/preObjectManage";
import { websiteTitleEnum } from "@/enums/common";
import { crudApi } from "@/apis/index";
import usePage from "./init";
import { showSuccessToast } from "vant";
import { createGraphContext } from "./createContxt";
const disabled = ref(false);
const btnLoading = ref(false);
const formData = reactive<Record<string, any>>({});
const route = useRoute();
const routeData = reactive<Record<string, any>>({});
const loading = ref(true);

const [tableCode, title, ...rest] =
  (route.params.key as string).split("/") || [];
document.title = decodeURI(websiteTitleEnum.ADD);
const params = {
  tableCode,
  key: rest.join("/"),
  type: "0",
};
Object.assign(routeData, params);
const { position, initForm, setFiledVisible, visibleBox } = usePage({
  formData,
});

createGraphContext({ setFiledVisible });

onMounted(() => {
  try {
    initForm(params);
  } finally {
    loading.value = false;
  }
});
const onSubmit = () => {
  btnLoading.value = true;

  const postData: Recordable = {
    dataId: 0,
    groups: [],
    subLists: [],
    tableCode: routeData.tableCode,
    key: routeData.key,
    type: routeData.type,
  };
  try {
    position.value.forEach((container: any) => {
      if (container.code === "BLANK") {
        container.modules.forEach((module: Recordable, mIndex: number) => {
          if (module.moduleType === moduleType.subField) {
            postData.groups.push({
              moduleId: module.id,
              columns: [],
            });
            module.componentList.forEach((field: Recordable) => {
              const {
                fieldCode,
                code,
                fieldSerial,
                fieldType,
                columnQuoteInfo,
              } = field;
              let val = !isNullOrUndefOrEmpty(formData[fieldCode])
                ? isArray(formData[fieldCode])
                  ? formData[fieldCode].join(",")
                  : formData[fieldCode]
                : "";
              // 如果有流水号，特殊处理
              if (code === fieldTypeConfig.serial) {
                val = formData[fieldCode] || "AUTOINCREMENT";
              }
              if (code === fieldTypeConfig.picture) {
                const imgs = formData[fieldCode];
                val = imgs.map((i: any) => i.ossKey).join(",");
              }
              if (code === fieldTypeConfig.enclosure) {
                const files = formData[fieldCode];
                val = JSON.stringify(
                  files.map((i: any) => ({ name: i.name, path: i.ossKey }))
                );
              }
              if (field?.renderConfig?.valCallback) {
                val = field.renderConfig.valCallback(val, field);
              }
              if (val) {
                const cuIndex = postData.groups.findIndex(
                  (cur: Recordable) => cur.moduleId === module.id
                );
                const saveData: Recordable = {
                  columnId: field.id,
                  value: val,
                  columnSerial: fieldSerial,
                };
                // 引用映射字段
                if (
                  fieldType === fieldTypeEnum.SYS_QUOTE ||
                  fieldType === fieldTypeEnum.CUSTOM_QUOTE ||
                  fieldType === fieldTypeEnum.SYS_MAPPING ||
                  fieldType === fieldTypeEnum.CUSTOM_MAPPING ||
                  fieldType === fieldTypeEnum.SON_ORIGINAL_FIELD ||
                  fieldType === fieldTypeEnum.SON_CUSTOM_FIELD ||
                  fieldType === fieldTypeEnum.SON_SYS_QUOTE ||
                  fieldType === fieldTypeEnum.SON_CUSTOM_QUOTE ||
                  fieldType === fieldTypeEnum.SON_SYS_MAPPING ||
                  fieldType === fieldTypeEnum.SON_CUSTOM_MAPPING
                ) {
                  saveData.quoteTableCode = columnQuoteInfo.quoteTableCode;
                  saveData.quoteColumnSerial =
                    columnQuoteInfo.quoteColumnSerial;
                  saveData.quoteDataId = field.renderConfig.id || 0;
                }
                postData.groups[cuIndex].columns.push({ ...saveData });
              }
            });
            postData.groups = postData.groups.filter(
              (item) => item.columns.length
            );
          }
        });
      }
    });
  } catch (e) {
    console.log(e, "error");
  }

  crudApi(postData)
    .then((res) => {
      showSuccessToast("操作成功");
    })
    .then(() => {
      btnLoading.value = false;
      disabled.value = true;
    })
    .finally(() => {
      btnLoading.value = false;
    });
};
</script>
<style scoped lang="scss">
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
