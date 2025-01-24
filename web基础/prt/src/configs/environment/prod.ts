// 打包环境
import { Environments } from "./type";
export const devEnv: Environments = {
  baseUrl: "https://dev-gw.rongxk.com", // 接口请求域名
  uploadApi: "https://dev-gw.rongxk.com/crm/file/upload", // 图片上传地址
  videoUploadApi:
    "https://dev-gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi: "https://dev-gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  websocketPath: "https://dev-wss.youxinsign.com", // websoket地址
  imgBaseUrl: "https://dev-file.rongxk.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "de9b8f465f36876c10e3411e75c53062", // 高德地图的key(公司)
  signKey:
    "NmFhYjEzYWFlOTFlN2Q2ZmJiZDAzOGYzODY4ZDdiNzg3OWZkYzYzOTg2M2RjM2RhOGNkYmE1YTRhNzMxYjIwMA==", // 签名的key
  aes: "enc-", // 加密解密前缀
  secretKey: "GQDTXGf7EZuCqwNG", // 解密用的key
  offset: "8GUUxywnlW0v9hk6",
  isNeedAes: false, // 是否需要加密
  sip_url: "@121.40.141.201", // sip:1008@172.18.13.25
  sip_socket_url: "wss://test-yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://dev-agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};

// 测试环境
export const testEnv: Environments = {
  baseUrl: "https://test-gw.rongxk.com", // 接口请求域名

  uploadApi: "https://test-gw.rongxk.com/crm/file/upload", // 图片上传地址
  videoUploadApi:
    "https://test-gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi: "https://test-gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  websocketPath: "https://test-wss.youxinsign.com", // websoket地址
  imgBaseUrl: "https://test-file.rongxk.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "de9b8f465f36876c10e3411e75c53062", // 高德地图的key(公司)
  signKey:
    "NmFhYjEzYWFlOTFlN2Q2ZmJiZDAzOGYzODY4ZDdiNzg3OWZkYzYzOTg2M2RjM2RhOGNkYmE1YTRhNzMxYjIwMA==", // 签名的key
  aes: "enc-", // 加密解密前缀
  secretKey: "GQDTXGf7EZuCqwNG", // 解密用的key
  offset: "8GUUxywnlW0v9hk6",
  isNeedAes: false, // 是否需要加密
  sip_url: "@121.40.141.201", // sip:1008@172.18.13.25
  sip_socket_url: "wss://test-yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://test-agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};

// 线上环境
export const prodEnv: Environments = {
  baseUrl: "https://gw.rongxk.cn", // 接口请求域名
  uploadApi: "https://gw.rongxk.cn/crm/file/upload", // 图片上传地址
  videoUploadApi: "https://gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi: "https://gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  websocketPath: "https://wss.youxinsign.com", // websoket地址
  imgBaseUrl: "https://file.rongxk.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "de9b8f465f36876c10e3411e75c53062", // 高德地图的key(公司)
  signKey:
    "x8eIC5sON7xKRbJeNttFibW5kGulL68Nz0ZXY4XurRBo4AQZB11Z0jIjFcLsIuitLQc29QeKyooorL32wZu5LZm8", // 签名的key
  aes: "enc-", // 加密解密前缀
  secretKey: "8AEK6247qxYBdBtb", // 解密用的key
  offset: "QONgVjIhDzDJbN5R",
  isNeedAes: false, // 是否需要加密
  sip_url: "@47.98.185.236", // sip:1008@172.18.13.25
  sip_socket_url: "wss://yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};

// 压力测试环境
export const pressureEnv: Environments = {
  baseUrl: "https://pressure-gw.youxinsign.com", // 接口请求域名
  uploadApi: "https://pressure-gw.youxinsign.com/rxk-saas/web/img/upload", // 图片上传地址
  videoUploadApi:
    "https://pressure-gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi:
    "https://pressure-gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  websocketPath: "https://pressure-wss.youxinsign.com", // websoket地址
  imgBaseUrl: "https://pressure-upload.youxinsign.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "de9b8f465f36876c10e3411e75c53062", // 高德地图的key(公司)
  signKey:
    "x8eIC5sON7xKRbJeNttFibW5kGulL68Nz0ZXY4XurRBo4AQZB11Z0jIjFcLsIuitLQc29QeKyooorL32wZu5LZm8", // 签名的key
  aes: "enc-", // 加密解密前缀
  secretKey: "8AEK6247qxYBdBtb", // 解密用的key
  offset: "QONgVjIhDzDJbN5R",
  isNeedAes: false, // 是否需要加密
  sip_url: "@47.98.185.236", // sip:1008@172.18.13.25
  sip_socket_url: "wss://yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://pressure-agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};
