/**
 * @author：张胜
 * @desc：字段类型
 * */
export const fieldTypeConfig = {
  singleLineText: "Input_001", //  单行文本
  multilineText: "Input_002", // 多行文本
  phone: "Input_003", // 手机号
  email: "Input_004", // 邮箱
  postalCode: "Input_005", // 邮政编码
  description: "Input_006", // 描述文字
  idCard: "Input_007", // 身份证号
  creditCode: "Input_008", // 统一社会信用代码
  serial: "Input_009", // 流水号
  landline: "Input_010", // 座机号
  money: "Input_011", // 金额
  number: "Input_012", // 数字
  percentage: "Input_013", // 百分比

  radio: "Select_001", // 单选按钮
  checkbox: "Select_002", // 复选框组
  select: "Select_003", // 下拉框单选
  multipleChoice: "Select_004", // 下拉框多选
  person: "Select_005", // 人员单选
  personMultiple: "Select_006", // 人员多选
  department: "Select_007", // 部门单选
  multipleDepartment: "Select_008", // 部门多选
  address: "Select_009", // 地址
  cascader: "Select_010", // 多级联动

  picture: "Upload_001", // 上传图片
  enclosure: "Upload_002", // 上传附件

  date1: "Date_001", // 日期
  date2: "Date_002", // 日期区间
  date3: "Date_003", // 时间

  subList: "Advanced_001", // 子表单
  subField: "Advanced_002", // 分栏
  subTable: "Advanced_003", // table标签页
  associationQuery: "Advanced_004", // 关联查询
  associationForm: "Advanced_005", // 关联表单
  button: "Advanced_006", // 按钮
  partingLine: "Advanced_007", // 分割线
  sign: "Advanced_008",
  // 自定义一个字段，用于处理引用映射类型的字段，单独渲染组件
  quote: "quote", // 引用
  mapping: "mapping", // 映射
  tags: "BUSINESS_001", // 客户标签
  associatedData: "associatedData", // 关联已有数据，自定义的
} as const;

/**
 * @author：张胜
 * */
export enum tableColumnTypeConfig {
  subField = 0,
  subList = 10,
  subTable = 20,
}

// 布局 @todo
export enum layoutEnum {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
}

// 校验
export enum ValidateEnum {
  writeFlag = 1, // 必填
  repeatFlag = 2, // 不允许重复值
  lengthFlag = 3, // 限制字数
  rangeFlag = 4, // 限定字符范围 @todo
}
// 字段权限
export enum fieldPermEnum {
  coverFlag = 1, // 脱敏
  columnFlag = 2, // 列表显示
  importFlag = 3, // 可导入
  exportFlag = 4, // 可导出
}
// 可编辑
export enum editFieldEnum {
  detailEditFlag = 1,
  listEditFlag = 2,
}

// 单位
export enum unitEnum {
  yuan = 1,
}

export enum moduleType {
  subField = 10, // 分栏
  subList = 20, // 子表单
  subForm = 30, // 关联表单
}

export enum defineType {
  pre = 10, // 预定义
  custom = 20, // 自定义
}

export enum operateListEnum {
  MUST = "COLUMN:MUST", // 必填
  PHONE_EMPTY = "COLUMN:PHONE_EMPTY", // 空号验证
  PHONE_CODE = "COLUMN:PHONE_CODE", // 验证码
  LENGTH = "COLUMN:LENGTH", // 限制字数
  REPEAT = "COLUMN:REPEAT", // 不允许重复
  DETAIL_EDIT = "COLUMN:DETAIL_PAGE_EDIT", // 详情页编辑
  LIST_EDIT = "COLUMN:LIST_PAGE_EDIT", // 列表页编辑
  ADD_PAGE_EDIT = "COLUMN:ADD_PAGE_EDIT", // 新增页编辑
  EDIT_PAGE_EDIT = "COLUMN:EDIT_PAGE_EDIT", // 编辑页编辑
  IMPORT = "COLUMN:IMPORT", // 导入
  EXPORT = "COLUMN:EXPORT", // 导出
  SHOW = "COLUMN:COLUMN", // 列表显示
  COVER = "COLUMN:COVER", // 支持脱敏
  GLOBAL_COVER = "COLUMN:GLOBAL_COVER", // 数据脱敏
  RANGE = "COLUMN:RANGE", // 限定数值范围
  PICTURE_ONE = "COLUMN:PICTURE_ONE", // 仅允许上传一张图片
  FILE_ONE = "COLUMN:FILE_ONE", // 仅允许上传一张附件
  ENABLE = "COLUMN:ENABLE",
  GLOBAL_ENABLE = "COLUMN:GLOBAL_ENABLE",
  CREATE_POSITION = "COLUMN:CREATE_POSITION",
  DETAIL_POSITION = "COLUMN:DETAIL_POSITION",
  COLUMN_SHOW = "COLUMN:SHOW",
}

export enum defaultMarkEnum {
  mark1 = 0,
  mark2 = 1,
  mark3 = 2,
}

// 字段类型
export enum fieldTypeEnum {
  ORIGINAL = 0, // 原表已有字段
  SYS_QUOTE = 10, // 系统关联字段
  CUSTOM_QUOTE = 11, // 自定义关联字段
  SYS_MAPPING = 20, // 系统映射字段
  CUSTOM_MAPPING = 21, // 自定义映射字段
  SON_ORIGINAL_FIELD = 50, // 子表原有字段
  SON_CUSTOM_FIELD = 51, // 子表自定义字段
  SON_SYS_QUOTE = 60, // 子表系统关联字段
  SON_CUSTOM_QUOTE = 61, // 子表自定义关联字段
  SON_SYS_MAPPING = 70, // 子表系统映射字段
  SON_CUSTOM_MAPPING = 71, // 子表自定义映射字段
  TABLE_ORIGIN = 100, // 自定义表单字段
  CUSTOM_EXTEND = 1000, // 自定义扩展字段
}

// 关联条件
export enum conditionEnum {
  gt = "gt", // 大于
  lt = "lt", // 小于
  gte = "gte", // 大于等于
  lte = "lte", // 小于等于
  ne = "ne", // 不等于
  equal = "equal", // 等于
  unequal = "unequal", // 不等于
  contain = "contain", // 包含
  exclusive = "exclusive", // 不包含
  interval = "interval", // 区间
  range_equal = "range_equal", // 区间等于
  between = "between", // 介于
  match = "match", // 匹配
  mismatch = "mismatch", // 不匹配
  isnull = "isnull", // 为空
  notnull = "notnull", // 不为空
  in = "in", // 包含
  notin = "notin", // 不包含
}

// 关联条件
export enum conditionLabelEnum {
  gt = "大于", // 大于
  lt = "小于", // 小于
  gte = "大于等于", // 大于等于
  lte = "小于等于", // 小于等于
  ne = "不等于", // 不等于  !=
  equal = "等于", // 等于
  unequal = "不等于", // 不等于 JAVA unequal 暂时不用
  contain = "包含", // 包含 同效果 去重
  exclusive = "不包含", // 不包含 同效果 去重
  interval = "区间", // 区间
  range_equal = "区间等于", // 区间等于 与区间同效果 暂时不用
  between = "介于", // 介于
  match = "匹配", // 匹配
  mismatch = "不匹配", // 不匹配
  isnull = "为空", // 为空
  notnull = "不为空", // 不为空
  in = "包含", // 包含  不去重
  notin = "不包含", // 不包含 不去重
}

export enum defineTypeEnum {
  SYSTEM_PRE_OBJECT = 10, // 系统预定义对象
  SYSTEM_CUSTOM_OBJECT = 20, // 系统自定义对象
  TENANT_CUSTOM_OBJECT = 21, // 租户自定义对象
  ORDINARY_OBJECT = 30, // 普通对象
}

// 按钮类型
export enum ButtonTypeEnum {
  ADD = 10, // 新增布局
  DETAIL = 20, // 详情布局
  LIST = 30, // 列表数据
  LISTALL = 31, // 列表全局
  LISTPL = 32, // 列表批量
}

/**
 * 人员部门组件类型
 * @param person SELECT_005-人员单选
 * @param personMultiple SELECT_006-人员多选
 * @param department SELECT_007-部门单选
 * @param multipleDepartment SELECT_008-部门多选
 */
export enum ComponentType {
  person = "SELECT_005", // 人员单选
  personMultiple = "SELECT_006", // 人员多选
  department = "SELECT_007", // 部门单选
  multipleDepartment = "SELECT_008", // 部门多选
}

/**
 * 人员部门组件使用场景
 * @param another 0-其他人员部门组件场景
 * @param customerTranser 1-客户管理移交
 * @param highSeaDistribute 2-公海列表分配
 * @param paas 3-paas表单
 * @param recyclingRulesConfig 4 回收规则
 *
 * @param assistants 6: 协助人里面用
 */
export enum ComponentUseSceneType {
  another = 0,
  customerTranser = 1,
  highSeaDistribute = 2,
  paas = 3,
  recyclingRulesConfig = 4,
  assistants = 6,
}
