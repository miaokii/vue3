<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <!-- 通过 pattern 进行正则校验 -->
      <Field
        v-model:value="model.realName"
        label-align="top"
        label="成员真实姓名"
        required
        disabled
      />
      <Field
        v-model:value="model.phone"
        label-align="top"
        label="手机号码"
        required
        disabled
      />
      <van-field
        @click="show = true"
        label="身份证号"
        class="rxk_input idCard"
        label-align="top"
        v-model="model.idcard"
        name="idcard"
        readonly
        required
        :rules="[
          { validator: validatorMessage, message: '请输入正确的身份证号' },
        ]"
      >
      </van-field>
      <van-field
        name="radio"
        label="性别"
        class="rxk_input"
        label-align="top"
        required
        :rules="[{ required: true, message: '请选择' }]"
      >
        <template #input>
          <van-radio-group
            v-model="model.sex"
            direction="horizontal"
            shape="dot"
          >
            <van-radio name="1">男</van-radio>
            <van-radio name="0">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <Field
        v-model:value="model.age"
        label-align="top"
        label="年龄"
        type="number"
        required
      />
      <UpLoade
        v-model:value="model.logoPersonPath"
        label-align="top"
        label="成员与公司logo合照"
        required
        :rules="[{ required: true, message: '请上传' }]"
      />
      <UpLoade
        v-model:value="model.laborContract"
        label-align="top"
        label="劳动合同"
        :rules="[{ required: true, message: '请上传' }]"
        required
      />
      <UpLoade
        v-model:value="model.workCardPath"
        label-align="top"
        label="本人工牌"
      />
      <UpLoade
        v-model:value="model.nameCardPath"
        label-align="top"
        label="本人名片"
      />
      <UpLoade
        v-model:value="model.idcardFrontPath"
        label-align="top"
        label="身份证正面照"
        required
        :rules="[{ required: true, message: '请上传' }]"
      />
      <UpLoade
        v-model:value="model.idcardReversePath"
        label-align="top"
        label="身份证反面照"
        required
        :rules="[{ required: true, message: '请上传' }]"
      />
      <UpLoade
        v-model:value="model.idcardHandPath"
        label-align="top"
        label="手持身份证照"
      />
    </van-cell-group>
    <div style="margin: 16px" class="btns">
      <van-button round block class="reset" @click="reset"> 重置 </van-button>
      <van-button round block type="primary" native-type="submit">
        确定
      </van-button>
    </div>
  </van-form>
  <van-number-keyboard
    maxlength="18"
    :show="show"
    extra-key="X"
    close-button-text="完成"
    @blur="show = false"
    v-model="model.idcard"
  />
</template>

<script setup>
import { ref, markRaw, toRaw } from "vue";
import { useRoute } from "vue-router";
import Field from "./components/filed.vue";
import UpLoade from "./components/filedUpload.vue";
import { decryptResponse } from "@/utils/libs/aes";
import { getQueryParams } from "@/utils/tools";
import { isArray } from "@/utils/is";
import { personalAuthH5 } from "@/apis/index";
const route = useRoute();
var num = route.fullPath.indexOf("?");
var param = route.fullPath.substr(num + 1); //获取整个参数串
const queryData = decryptResponse(param, true);
const urlParams = getQueryParams(queryData);

const model = ref({
  realName: urlParams.realName,
  phone: urlParams.phone,
  idcard: "",
  sex: "",
  age: "",
  logoPersonPath: [],
  laborContract: [],
  workCardPath: [],
  nameCardPath: [],
  idcardFrontPath: [],
  idcardReversePath: [],
  idcardHandPath: [],
});
const _model = toRaw({ ...model.value });
const show = ref(false);
const validatorMessage = (v) => {
  const reg = new RegExp(
    "^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$"
  );
  return reg.test(v);
};

const reset = () => {
  model.value = { ..._model };
};
const onSubmit = async (value) => {
  try {
    const params = markRaw(model.value);
    const data = Object.entries(params).reduce((preV, [key, val]) => {
      preV[key] = isArray(val) ? val[0]?.ossKey : val;
      return preV;
    }, {});
    const res = await personalAuthH5({
      ...data,
      belongUserId: urlParams.belongUserId,
      timestamp: urlParams.timestamp,
    });
    window.location.href = res?.authUrl;
  } catch (e) {
    console.log(e);
  }
};
</script>
<style scoped>
.van-cell-group--inset {
  overflow: inherit;
}
</style>
<style scoped lang="scss">
.rxk_input {
  ::v-deep(.van-cell__title) {
    font-size: 14px;
    color: #666666;
  }
  ::v-deep(.van-radio__label) {
    color: #666666;

    font-size: 14px;
  }
}
.idCard {
  ::v-deep(.van-field__body) {
    border-radius: 3px;
    border: 0.5px solid #d2d2d2;
    padding: 5px 10px;
  }
}
.van-cell {
  padding: 0;

  overflow: inherit;
  &::after {
    display: none;
  }
  margin-bottom: 16px;
}

.btns {
  display: flex;
  .reset {
    border: 1px solid #c1c5ce;
    color: #666666;
    margin-right: 12px;
    font-size: 14px;
  }
}
</style>
