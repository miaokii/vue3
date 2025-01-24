// 邀约码登记接口参数
export interface InviteCodeRegisterParams {
  code: string | number;
  tenantId: string;
}
// 邀约码登记接口返回
export interface InviteCodeRegisterResponse {
  msg: string;
}

// 无邀约码获取验证码
export interface SmsCodeParams {
  userId: number | string; // 机构ID
  phone: string;
}

// 手动创建邀约接口参数
export interface HandleInviteParams {
  userId: number | string;
  personalBusiness: string;
  name: string;
  phone: string;
  code: string;
  contactName?: string;
}

// 手动创建邀约接口返回
export interface HandleInviteResponse {
  msg: string;
}
// 人脸识别结果接口返回参数定义
export interface IdentifyCodeResultResponse {
  data: {
    message: string;
    status: string | number;
  };
}
