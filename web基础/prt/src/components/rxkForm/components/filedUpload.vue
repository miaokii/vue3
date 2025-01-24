<template>
  <van-field
    name="uploader"
    label="文件上传"
    v-bind="$attrs"
    class="rxk_upload"
  >
    <template #input>
      <van-uploader
        v-if="!$attrs.readonly"
        :modelValue="state"
        :max-count="limit"
        :accept="getStringAccept"
        result-type="file"
        v-bind="$attrs.extarConfig"
        :before-read="beforeRead"
        :disabled="$attrs.readonly"
        :after-read="afterRead"
        @delete="deleteImg"
      >
        <template #default>
          <slot name="style">
            <div class="custome_wrap">
              <div class="btn"><van-icon name="plus" /></div>
              <!-- <div class="tips">点击上传，建议2M以内，支持jpg、png格式</div> -->
            </div>
          </slot>
        </template>
      </van-uploader>
      <div v-else>
        <div class="text">
          <img :src="i.url" alt="" v-for="i in showFiles" :key="i.name" />
        </div>
      </div>
    </template>
    <template #extra v-if="$slots.tip">
      <slot name="tip" />
    </template>
  </van-field>
</template>
<script>
import { defineComponent, toRefs, computed, unref } from "vue";
import { useRuleFormItem } from "./useFormitem";
import { useUploadType } from "./useUpload";
import { globalSettings } from "@/configs";
import { decryptResponse } from "@/utils/libs/aes";
import { uploadApi } from "@/apis";
import { showToast } from "vant";
import { isArray } from "@/utils/is";
import Compressor from "compressorjs";
export default defineComponent({
  props: {
    value: { type: [Array, String] },
    accept: {
      type: Array,
      default: () => ["jpg", "jpeg", "png"],
    },
    type: {
      type: String,
      default: "upload",
    },
    maxSize: {
      type: Number,
      default: 2,
    },
  },
  setup(props, { attrs }) {
    console.log(attrs, "attrsattrsattrs");
    const { accept } = toRefs(props);
    let [state] = useRuleFormItem(props);
    const { getStringAccept } = useUploadType({
      acceptRef: accept,
    });
    const beforeRead = (file, detail) => {
      const imgformat = /image\/(png|jpg|jpeg)$/;
      if (!imgformat.test(file.type)) {
        showToast("请上传 jpg/jpeg/png 格式图片");
        return false;
      }
      if (file.size > props.maxSize * 1024 * 1024) {
        showToast({
          type: "fail",
          message: `文件大小不能超过${props.maxSize}M`,
        });
        return false;
      }
      return true;
    };
    const afterRead = async (file) => {
      file.status = "uploading";
      if (file.file.size > 2 * 1024 * 1024) {
        new Compressor(file.file, {
          quality: 0.1,
          async success(result) {
            let files = new window.File([result], result.name);
            uploadImg(files);
          },
          error(err) {
            console.log(err.message, "1111111");
          },
        });
      } else {
        uploadImg(file.file);
      }
    };
    const uploadImg = async (file) => {
      try {
        const data = await uploadApi(file);
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
    const deleteImg = (url, { index }) => {
      state.value.splice(index, 1);
    };
    const limit = computed(() => {
      if (!attrs.columnInfo) return 1;
      const columnOperateList = attrs?.columnInfo?.columnOperateList || [];
      const current = columnOperateList.find(
        (item) => item.code === "COLUMN:PICTURE_ONE"
      );
      return current && current.value ? 1 : 10;
    });
    const showFiles = computed(() => {
      return isArray(unref(state))
        ? unref(state).map((i) => ({
            name: i,
            url: globalSettings.environment.imgBaseUrl + i,
          }))
        : unref(state)
            .split(",")
            .map((i) => ({
              name: i,
              url: globalSettings.environment.imgBaseUrl + i,
            }));
    });

    return {
      state,
      beforeRead,
      getStringAccept,
      afterRead,
      limit,
      deleteImg,
      showFiles,
    };
  },
});
</script>
<style scoped lang="scss">
.rxk_upload {
  ::v-deep(.van-cell__title) {
    font-size: 14px;
    color: #666666;
  }
  .text {
    img {
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
</style>
