import request from "@/utils/axios/index";
import { globalSettings } from "@/configs";
import { IdentifyCodeResultResponse } from "@/apis/types";
import { contentTypeEnum } from "@/enums/common";
import { getToken } from "@/utils/cache/auth";
const jsonHeaderConfig = {
  headers: {
    "Content-Type": contentTypeEnum.JSON,
  },
};

// 查询人脸识别结果
export const getIdentifyCodeResultApi = (data: { uniqueId: string }) =>
  request.post<IdentifyCodeResultResponse>(
    `/financial/callback/sign/eqb/personal`,
    data
  );
// 获取验证码
export const getSmsCode = (data: any) =>
  request.post(`/crm/api/track/order/code`, data);
// 获取验证码
export const orderSave = (data: any) =>
  request.post(`/crm/api/track/order/save`, data);
// 查询用户信息
export const getUser = (data: any) =>
  request.post(`/crm/api/track/order/user`, data);
export const uploadApi = (data: any) =>
  request.upload(
    { url: globalSettings.environment.uploadApi },
    { file: data, name: "file" }
  );
// 获取布局
export const getPositions = (data: any) =>
  request.post(`/crm/api/track/inquiry/position`, data);
// 详情
export const getDetailData = (data: any) =>
  request.post(`/crm/api/track/inquiry/detail`, data);
// 新增
export const crudApi = (data: any) =>
  request.post(`/crm/api/track/inquiry/add`, data);
// 检测链接生效
export const checkUrl = (data: any) =>
  request.post(`/crm/api/track/inquiry/check`, data);
// 处理
export const doInquiry = (data?: any) =>
  request.post(`/crm/api/track/inquiry/doInquiry`, data);
// 获取pdf链接
export const getPdfUrl = (data: any) =>
  request.post(`/erp/retailContractManage/getFinishContractPdfById`, data);
export const getSignStatus = (data: any) =>
  request.post(`/crm/contract/sign/get_by_id`, data);
// 发送验证码
export const captcha = (data: any, token: any) =>
  request.post(`/financial/credit/report/authentication/captcha`, data, {
    headers: {
      UV_TOKEN: token,

      "Content-Type": contentTypeEnum.JSON,
    },
  });
// 征信登录
export const creaditLogin = (data: any, token: any) =>
  request.post(`/financial/credit/report/authentication/authenticate`, data, {
    headers: {
      UV_TOKEN: token,
      "Content-Type": contentTypeEnum.JSON,
    },
  });
// 征信授權
export const sendAuthorization = (data: any) =>
  request.post(
    `/financial/credit/report/send_authorization_agreement_for_token`,
    data
  );
// 查询征信
export const queryAuthorization = (data: any) =>
  request.post(`/financial/credit/report/query_for_token`, data);
// 列表
export const creditListGet = (data: any, { menuid, authToken }: any) =>
  request.post(`/financial/credit/report/record/list_for_token`, data, {
    headers: {
      "Content-Type": contentTypeEnum.JSON,
    },
  });
// App列表
export const creditListAppGet = (data: any, { menuId, authToken }: any) =>
  request.post(`/financial/credit/report/record/list`, data, {
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": contentTypeEnum.JSON,
      menuid: menuId,
    },
  });

export const getCreditReportFinishFile = (data: any) =>
  request.post(`/erp/contractCommon/getCreditReportFinishFile`, data);

export const getCreditReportFillFile = (data: any) =>
  request.post(`/erp/contractCommon/getCreditReportFillFile`, data);

export const getCreditReportFillFileList = (data: any) =>
  request.post(`/erp/contractCommon/getCreditReportFillFileList`, data);
// 详情
export const getDetail = (data: any) =>
  request.post(`/financial/credit/report/record/detail_for_token`, data);
export const valid = (token: any) =>
  request.get(`/financial/credit/report/authentication/valid`, {
    headers: {
      UV_TOKEN: token,
      "Content-Type": contentTypeEnum.JSON,
    },
  });
export const mallCREDITREPORTGet = () =>
  request.get("/financial/mall/itemUsage/tenant/h5/CREDIT_REPORT", undefined);
export const shareUrlGet = (data: any) =>
  request.post("/financial/credit/report/record/get_share_url_for_token", data);
