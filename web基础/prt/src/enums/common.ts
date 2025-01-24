/**
 * @description:  contentType
 */
export const contentTypeEnum = {
  // json
  JSON: "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED: "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA: "multipart/form-data;charset=UTF-8",
};

/**
 * @Description: responseResultEnum
 * @Param {*}
 * @Return {*}
 */
export const responseResultEnum = {
  SUCCESS: 200, // 操作成功
  BUS_ERROR: 600, // 业务异常
  // SYS_ERROR: "300", // 系统异常
  // AUTH_ERROR: "4000", // 权限不足
  // NOT_LOGIN: "5000", // 用户登录过期
  // GATEWAY_ERROR: "6000", // 网关异常
  // RESOURCE_NOT_FOUND: "7000", // 资源不存在
  // BLACKLIST: "-1000", // 黑名单
};
export const responseSubEnum = {
  ENABLE: 11001, // 失效

  // SYS_ERROR: "300", // 系统异常
  // AUTH_ERROR: "4000", // 权限不足
  // NOT_LOGIN: "5000", // 用户登录过期
  // GATEWAY_ERROR: "6000", // 网关异常
  // RESOURCE_NOT_FOUND: "7000", // 资源不存在
  // BLACKLIST: "-1000", // 黑名单
};
export enum websiteTitleEnum {
  ADD = "新增询单",
  DETAIL = "询单详情",
}
