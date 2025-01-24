<template>
  <div class="agreen">
    <h5>《个人信息使用授权协议》</h5>
    <p>
      《个人信息使用授权协议》(以下简称“本协议”)是由【成都优卡数信信息科技有限公司】
      (以下简称“我们”)与用户(以下简称“您”)为实现预约上门服务而就个人信息使用授权所订立
      的有效合约。为了您的合法权益，请您在使用本服务前务必仔细阅读本协议的全部内容(特别
      是以粗体/下划线标注的内容)。如果您不同意本协议的任意内容，或者无法准确理解本协议
      任何条款的含义，请不要进行授权及后续操作。
    </p>
    <p>
      一、为了向您提供本平台内的服务，我们会对您个人信息实施收集、存储、使用、共享
      等收集及/或使用行为。如您通过网络/APP页面点击“同意”、“勾选”或“注册”或“申请”或“接
      受”本协议(以网页/APP显示为准)，即视为您已阅读理解本协议的全部内容并同意我们出于为
      您提供服务之目的，以为您提供【账号注册、授信审核、贷款】等服务为目的处理您的个人
      信息。贷款、授信审核能否成功通过以您的实际情况及您与第三方的约定为准，本授权协议
      不作为您办理业务成功的保证或担保。
    </p>
    <p>
      二、您同意本协议以数据电文形式订立，协议订立并生效后对双方均具有法律约束效力，
      双方应当共同遵守。
    </p>
    <p>
      三、本协议中涉及您授权处理的个人信息及目的如下：<br />
      1.为实现预约上门功能，将收集并使用您的如下身份信息：姓名<br />
      2.为实现预约上门功能，将收集并使用您的如下通讯联络信息：手机号<br />
      3.为实现技术服务目的，将收集并使用您的如下设备信息、位置信息：无
    </p>
    <p>
      四、你同意并授权我们免费收集、存储、使用及共享给如下第三方。<br />
      1、服务提供方：【{{ name }}】 <br />
      2、技术服务提供方：【无】
    </p>
    <p>
      五、我们承诺，我们将在本授权范围内合法使用您的个人信息，且我们在将上述信息共
      享给第三方前，会严格要求第三方对您的个人信息履行保密义务并仅限于授权范围内使用您
      的个人信息。您理解，鉴于技术发展限制，我们无法确保您的个人信息绝对不被泄露，但我
      们会采取当下符合安全标准的技术手段确保您的个人信息不被泄露或违法使用。如果您不同
      意本协议所约定对您个人信息的收集与使用，请勿点击授权。
    </p>
    <p>
      六、本授权仅为满足您预约上门办理相关服务之目的使用。若您在本协议之外向第三方
      授权处理您的个人信息，那么属于您向第三方做出的行为，与我们无关联，我们亦不为您向
      本协议之外第三方授权的行为承担任何法律责任。
    </p>
    <p>
      七、您同意，凡因本协议引起的任何与之有关的争议、纠纷，首先通过友好协商的方式
      解决，如协商不能达成一致的，任何一方均可向本平台所在地有管辖权的人民法院提起诉讼。
    </p>
    <p>八、如您需要撤回本协议授权，请您联系：028-61154165。</p>
    <div class="foot">
      {{ mode ? "成都优卡数信信息科技有限公司" : "重庆甲乙互动科技有限公司" }}
      <br />
      {{ getNowFormatDate() }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { getNowFormatDate } from "@/utils/tools";
import { getTenantName } from "@/apis/invite";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "agreement",
  setup() {
    const route = useRoute();
    console.log(process.env, "123213213");

    const name = ref("");
    const tenantId = (route.query.a as string) || "";
    getTenantName({ tenantId }).then((res) => {
      name.value = res?.name;
    });
    return {
      name,
      getNowFormatDate,
      mode: process.env.VUE_APP_BUILD === "rxk",
    };
  },
});
</script>

<style scoped>
.agreen {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  color: #333;
  line-height: 1.4;
}
h5 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}
p {
  margin-top: 10px;
  text-indent: 2em;
}
.foot {
  margin-top: 20px;
  text-align: right;
}
</style>
