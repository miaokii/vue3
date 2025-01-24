<template>
  <div class="infomation">
    <div class="name">{{ relName }}</div>
    <div class="container">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <Field
            v-model:value="model.name"
            label-align="top"
            label="姓名"
            maxlength="20"
            not-spaces
          />
          <Field
            v-model:value="model.phone"
            label-align="top"
            type="tel"
            label="手机号"
            required
            maxlength="11"
            :rules="[
              {
                pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
                message: '手机号格式不正确',
              },
            ]"
          />
          <Field
            v-model:value="model.code"
            label-align="top"
            type="digit"
            label="验证码"
            required
            maxlength="4"
            :rules="[
              {
                required: true,
                message: '请输入验证码',
              },
            ]"
          >
            <template #button>
              <span class="send_btn" @click="getSms">{{ smsText }}</span>
            </template>
          </Field>

          <Field
            v-model:value="model.address"
            disabled
            label-align="top"
            label="位置"
            required
            :rules="[
              {
                required: true,
                message: '请获取定位',
              },
            ]"
            @click="_getLoca"
          >
            <template #button>
              <van-icon name="location-o" color="#5687ff" />
            </template>
          </Field>
          <UpLoade
            v-model:value="model.files"
            label-align="top"
            required
            :maxSize="20"
            :extarConfig="{ capture: 'camera' }"
            :rules="[
              {
                required: true,
                message: '请上传图片',
              },
            ]"
            label="现场照片"
          />
        </van-cell-group>
        <div style="margin: 16px" class="btns">
          <van-button
            block
            type="primary"
            native-type="submit"
            :loading="loading"
          >
            提交信息
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reactive, computed, unref, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import Field from "@/components/rxkForm/components/filed.vue";
import UpLoade from "@/components/rxkForm/components/filedUpload.vue";
import { useCountdown } from "@/hooks/use-countdown";
import useLocations from "@/hooks/useLocations";
import { getSmsCode, orderSave, getUser } from "@/apis/index";
import { showFailToast, showSuccessToast } from "vant";
export default {
  components: {
    Field,
    UpLoade,
  },
  setup() {
    const loading = ref(false);
    const route = useRoute();
    const { key } = route.params;

    const relName = ref("");
    const { start, isStart, currentCount } = useCountdown(60);
    const { getLocal } = useLocations();
    const model = reactive({
      name: "",
      phone: "",
      address: "",
      code: "",
      files: [],
    });
    const _getLoca = async () => {
      try {
        const data = await getLocal();
        if (data.info === "OK") {
          const {
            regeocode: {
              addressComponent: {
                city = "",
                province = "",
                district = "",
                township = "",
              },
            },
          } = data;
          model.address = `${province}-${city}-${district}-${township}`;
        }
      } catch (e) {
        console.log(e);
        showFailToast({
          message: "获取位置失败",
        });
      }
    };
    const getSms = async () => {
      if (!model.phone) {
        showFailToast({
          message: "请输入手机号",
        });
        return;
      }
      if (unref(isStart)) return;
      try {
        await getSmsCode({
          key,
          phone: model.phone,
        });
        start();
      } catch (e) {
        console.log(e);
      }
    };
    const onSubmit = () => {
      loading.value = true;
      orderSave({
        key,
        ...model,
        files: JSON.stringify(
          model.files.map((i) => ({ name: i.name, url: i.ossKey }))
        ),
      })
        .then(() => {
          showSuccessToast({
            message: "谢谢参与",
          });
          loading.value = false;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    onBeforeMount(() => {
      getUser({
        key,
      }).then((res) => {
        relName.value = res.realName;
      });
    });
    return {
      model,
      onSubmit,
      getSms,
      start,
      _getLoca,
      smsText: computed(() =>
        unref(isStart) ? `${unref(currentCount)}秒重新获取` : `发送验证码`
      ),
      relName,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.infomation {
  background-color: #f5f7fa;
  padding: 0 16px;
  height: 100%;
  .name {
    padding: 11px 0;
    text-align: center;
    background-color: #f5f7fa;
    color: #aaaaaa;

    font-size: 14px;
  }
  .container {
    padding: 24px 16px;
    border-radius: 16px;
    background: #fff;
  }
  .send_btn {
    color: #5687ff;

    font-size: 14px;
  }
}
</style>
