export enum OrderState {
    all = -1,
    /// 待申请
    waitApply,
    /// 预审通过
    prePass,
    /// 预审中
    preApproveing,
    /// 预审拒绝
    preReject,
    /// 资方电核通过
    phonePass,
    /// 资方电核拒绝
    phoneReject,
    /// 资方授信成功
    creditSuccess,
    /// 资方授信拒绝
    creditReject,
    /// 资方放款成功
    creditLoanSuccess,
    /// 资方放款拒绝
    creditLoanReject
}

// 贷款产品
export type LoanProduct = {
    productName: string
    productProvider: string
    maxLoanMoney: number
    minLoanMoney: number
    minYearRate: number
    maxYearRate: number
    minLoanTerm: number
    maxLoanTerm: number
    status: number
    productLogUrl: string
    productProviderName?: string
    createTime?: string
    updateTime?: string
    delFlag? : boolean
}

// 默认的车贷产品
export const defaultLoanProduct: LoanProduct = {
    productName: '华瑞银行-车保贷',
    productProvider: '华瑞银行',
    maxLoanMoney: 1000000,
    minLoanMoney: 100000,
    minYearRate: 5,
    maxYearRate: 24,
    minLoanTerm: 1,
    maxLoanTerm: 5,
    status: 0,
    productLogUrl: "",
}

export interface LoanCache {
    /// 审批备注
    approvalRemark: string
    // 车辆抵押状态 0未抵押 1抵押中
    carMortgageStatus: number
    carNo: string
    city: string
    createBy: number
    createTime: string
    // 授信审批 1通过 3拒绝
    creditApprovalStatus: number
    delFlag: string
    /// 进件编号
    entryNo: string
    /// 规则命中错误
    failRuleMessage: string
    id: string
    idCard: string
    // 订单状态 0待申请 1预审通过 2预审中 3预审拒绝 4资方电核通过 5资方电核拒绝 6资方授信成功 7资方授信拒绝 8资方放款成功 9资方放款拒绝
    intoAfterStatus: number
    // 放款审批 1通过 3拒绝
    loanApprovalStatus: number
    /// 渠道订单号
    outOrderNo: string
    phone: string
    // 预审状态 0未签署 1预审通过 2预审中 3预审拒绝
    preApprovalStatus: number
    // 进件发起状态 0初始 1发起失败 2发起成功
    preExamineStatus: number
    /// 昵称
    realName: string
    /// 三方放款金额
    sfLoanAmount: number
    /// 三方利率
    sfProductRate: number
    /// 三方期数
    sfTerm: number
    /// 签署链接
    signUrl: string
    /// 阶段错误信息
    stepFail: string
    updateBy: number
    updateTime: string
    /// 用户id
    userId: number
    // 电核审批 1通过 3拒绝
    verifyApprovalStatus: number
    vin: string
    productName: string

    // 订单状态
    orderState: Readonly<OrderState>
}