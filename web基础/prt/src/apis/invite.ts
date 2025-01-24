import request from "@/utils/axios/index";
import { contentTypeEnum } from "@/enums/common";
const jsonHeaderConfig = {
  headers: {
    "Content-Type": contentTypeEnum.JSON,
  },
};

// 邀约码登记
export const inviteCodeRegisterCodeApi = (data?: any) =>
  request.post(
    `/crm/track/appoint/visit/register?code=${data.code}&tenantId=${data.tenantId}`,
    null
  );

// 发送验证码
export const sendMsg = (data?: any) =>
  request.post(
    `/crm/track/appoint/visit/sendMsg?mobile=${data.mobile}&tenantId=${data.tenantId}`,
    null
  );

// 查询机构名称
export const getTenantName = (data?: any) =>
  request.get(`/admin/tenant/detail?tenantId=${data.tenantId}`, undefined);

// 登记
export const registerInfo = (data?: any) =>
  request.post(
    "/crm/track/appoint/visit/manual/register",
    data,
    jsonHeaderConfig
  );
