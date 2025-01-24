
/**
 * @description: 请求方式枚举
 */
export const enum RequstMethod {
    GET = 'GET',
    POST = 'POST',
    POSTJSON = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

/**
 * @description: API地址枚举
 */
export const enum URLEnum {

    /// 隐私政策
    userPrivacyPolicy = "carLoanPrivacyPolicy.html",
    /// 注册协议
    registerProtocol = "registerServiceProtocol.html",
    /// 用户资料
    newUserInfo = "personalInfoCollectAndUseList.html",
    /// 第三方信息共享
    thirdAppSDK = "thirdAndSDKInfoList.html",
    /// 申请产品协议
    infoCollectAndShareAuth = "infoCollectAndShareAuth.html",

    /// 埋点
    pointPick = "web/yoc/burialPoint/pick",

    /// 发送验证吗
    sendSmsCode = "web/yoc/sendCode",
    /// 登录
    smsLogin = "web/yoc/login",
    /// 一键登录
    authLogin = "web/yoc/onClickLogin",
    /// 登出
    logout = "web/yoc/logout",
    /// 注销
    unregister = "web/yoc/writeOff",

    /// 首页产品详情
    carHomeDetail = "web/yoc/carProductInfo/selectProductHomePage",
    /// 产品详情
    carDetail = "web/yoc/carProductInfo/selectProduct",
    /// 最后一次留资数据
    lastCarInfo = "carCustomerUserInto/getLastIntoInfoData",
    /// 获取车辆识别代号
    getCarVIN = "carCustomerUserInto/getVin",
    /// 申请进件
    applyCar = "carCustomerUserInto/applyInto",

    /// 签署进件授权协议
    signAuthProtocolField = "carCustomerUserInto/sendAuthProtocolContractSign",

    /// 进件列表最新状态
    carIntoState = "carCustomerUserInto/refreshIntoStatus",
    /// 进件列表查询
    carIntoList = "carCustomerUserInto/getIntoPage",
}
