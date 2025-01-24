import { isObject } from "@/utils/is";
import md5 from "js-md5";
import { globalSettings } from "@/configs";
import { useDebounceFn } from "@vueuse/core";

/**
 * @descrition: 简单深拷贝
 * @param {any} source
 * @param {any} target
 * @return {*}
 */
export function deepMerge<T = any>(source: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    source[key] = isObject(source[key])
      ? deepMerge(source[key], target[key])
      : target[key];
  }
  return source;
}

/**
 * 创建请求头sign
 * @param data(Object) 请求参数
 * @param isJson
 * @returns String
 */
export const createRequestSign = function (
  data: Recordable,
  isJson: boolean,
  timestamps: number
) {
  const keyList = Object.keys(data).sort();
  let urlParams = "";
  const sortKey = keyList.filter((key) => {
    if (data[key] != null && data[key] !== "") return key;
  });
  if (isJson) {
    urlParams = JSON.stringify(data) + `&timestamps=${timestamps}`;
  } else {
    for (const key of sortKey) {
      urlParams +=
        sortKey[sortKey.length - 1] !== key
          ? `${key}=${data[key]}&`
          : `${key}=${data[key]}`;
    }
  }
  return md5(`${urlParams}&signKey=${globalSettings.environment.signKey}`);
};
function getQueryParams(url: string) {
  const paramArr = url.slice(url.indexOf("?") + 1).split("&");
  const params = {} as any;
  paramArr.map((param: any) => {
    const [key, val] = param.split("=");
    params[key] = decodeURIComponent(val);
  });
  return params;
}
export const getQueryParamsCopy = (url: string) => {
  // 从URL中提取查询字符串
  const queryString = url.split("?")[1];

  // 如果没有查询字符串，直接返回空对象
  if (!queryString) return {};

  // 将查询字符串分割成键值对数组
  const paramsArray = queryString.split("&");
  // 使用reduce函数将键值对数组转换为对象
  const paramsObject = paramsArray.reduce((accumulator: any, currentValue) => {
    // 分割键和值
    const [key, value] = currentValue.split("=");
    // 解码URIComponent，以处理特殊字符
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);
    // 添加到累加器对象中
    accumulator[decodedKey] = decodedValue;
    return accumulator;
  }, {});

  return paramsObject;
};

//获取当前日期函数
function getNowFormatDate() {
  const date = new Date();
  const year = date.getFullYear(); //获取完整的年份(4位)
  let month: any = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  let strDate: any = date.getDate(); // 获取当前日(1-31)
  if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

  return `${year}年${month}月${strDate}日`;
}
export { useDebounceFn, getQueryParams, getNowFormatDate };
export const base64ToBlob = (code: string) => {
  const parts = code.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new window.Blob([uInt8Array], { type: contentType });
};
