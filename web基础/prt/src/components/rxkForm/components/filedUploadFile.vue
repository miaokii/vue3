<template>
  <van-field name="uploader" label="文件上传" v-bind="$attrs" class="rxk_input">
    <template #input>
      <van-uploader
        v-if="!$attrs.readonly"
        :modelValue="state"
        :max-count="limit"
        accept="*"
        result-type="file"
        :after-read="afterRead"
        :before-read="beforeRead"
        :disabled="$attrs.readonly"
        @delete="deleteImg"
      >
        <div class="custome_wrap">
          <div class="btn"><van-icon name="plus" /></div>
          <!-- <div class="tips">点击上传，建议2M以内，支持jpg、png格式</div> -->
        </div>
      </van-uploader>
      <div v-else>
        <div class="file">
          <p
            v-for="item in showFiles"
            :key="item.url"
            @click="handleClick(item.url)"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </template>
  </van-field>
</template>
<script>
import { defineComponent, computed, unref, watch } from "vue";
import { useRuleFormItem } from "./useFormitem";
import { useUploadType } from "./useUpload";
import { globalSettings } from "@/configs";
import { decryptResponse } from "@/utils/libs/aes";
import { uploadApi } from "@/apis";
import { isNullOrUndefOrEmpty } from "@/utils/is";
import { showToast } from "vant";
export default defineComponent({
  props: {
    value: { type: [Array, String] },
    type: {
      type: String,
      default: "upload",
    },
    maxSize: {
      type: Number,
      default: 30,
    },
  },
  setup(props, { attrs }) {
    console.log(props, "propspropspropsprops", attrs);
    let [state] = useRuleFormItem(props);
    const { setting } = attrs.columnInfo;
    const accept = !isNullOrUndefOrEmpty(setting)
      ? JSON.parse(setting)
      : { web: {} };
    const { getStringAccept } = useUploadType({
      acceptRef: accept?.web?.enclosure.split(",") || "",
    });
    const handleClick = (url) => {
      window.open(url);
    };
    const beforeRead = (file, detail) => {
      const size = props.maxSize * 1024 * 1024;
      if (file.size > size) {
        showToast({
          type: "fail",
          message: `上传文件不能大于${props.maxSize}M`,
        });
        return false;
      }
      const lastIndex = file.name.lastIndexOf(".");
      if (accept?.web?.enclosure.split(",")) {
        if (
          !accept?.web?.enclosure
            .split(",")
            ?.includes(file.name.slice(lastIndex))
        ) {
          showToast({
            type: "fail",
            message: `只能选择${getStringAccept.value}格式`,
          });
          return false;
        }
      }
      return true;
    };
    const afterRead = async (file) => {
      file.status = "uploading";
      try {
        const data = await uploadApi(file.file);
        if (data.status === 200) {
          const decryptData = decryptResponse(data.data);
          const [img] = decryptData.data;
          state.value.unshift({
            url: globalSettings.environment.imgBaseUrl + img.path,
            ossKey: img.path,
            name: img.name,
          });
          file.status = "done";
        } else {
          file.status = "failed";
        }
      } catch (e) {
        file.status = "failed";
      }
    };
    const limit = computed(() => {
      const columnOperateList = attrs.columnInfo.columnOperateList || [];
      const current = columnOperateList.find(
        (item) => item.code === "COLUMN:FILE_ONE"
      );
      return current && current.value ? 1 : 10;
    });
    const deleteImg = (url, { index }) => {
      state.value.splice(index, 1);
    };
    const showFiles = computed(() => {
      const files = JSON.parse(
        !isNullOrUndefOrEmpty(unref(state)) ? unref(state) : "[]"
      );
      return files.map((i) => ({
        name: i.name,
        url: globalSettings.environment.imgBaseUrl + i.path,
      }));
    });

    return {
      state,
      handleClick,
      getStringAccept,
      afterRead,
      limit,
      deleteImg,
      showFiles,
      beforeRead,
    };
  },
});
</script>
<style scoped lang="scss">
.rxk_input {
  ::v-deep(.van-cell__title) {
    font-size: 14px;
    color: #666666;
  }
  :deep(.van-uploader__file) {
    position: relative;
    width: 110px;
    height: 66px;
    border-radius: 4px;
    border: 1px dashed #d2d2d2;
    background: #f6f7fa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    overflow: inherit;
  }
  ::v-deep(.van-image) {
    position: relative;
    width: 110px;
    height: 66px;
    border-radius: 4px;
    border: 1px dashed #d2d2d2;
    background: #f6f7fa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    overflow: inherit;
    &::after {
      // content: "点击上传，建议2M以内，支持jpg、png格式";
      width: 200px;
      position: absolute;
      color: #bbbbbb;
      font-size: 12px;
      line-height: 16px;
      right: -216px;
    }
    img {
      object-fit: contain !important;
    }
  }
}

.van-cell {
  padding: 0;
  margin-bottom: 16px;
  &::after {
    display: none;
  }
}
.file {
  text-decoration: underline;
  color: #2e8fe4;
}
.custome_wrap {
  display: flex;
  .btn {
    width: 110px;
    height: 66px;
    border-radius: 4px;
    border: 1px dashed #d2d2d2;
    background: #f6f7fa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    .van-icon {
      color: #bbbbbb;
      font-size: 24px;
    }
    span {
      font-size: 24px;
      color: #d2d2d2;
    }
  }
  .tips {
    color: #bbbbbb;
    font-size: 12px;
    font-style: normal;
    line-height: 16px;
    margin-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.readonly {
  pointer-events: auto !important;
}
</style>
