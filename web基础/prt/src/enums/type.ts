export type businessTabType = ValueLabelObj<number>;

const showFiled = [
  "Input_001", //单行
  "Input_002", //多行
  "Input_003", //手机号
  "Input_011", //金额
  "Input_007", //身份证
  "Input_008", //统一社会信用代码
  "Input_012", //数字
  "Input_013", //百分比
  "Date_001", //日期
  "Date_003", //时间
  "Select_009", //地址
  "Select_003", //下拉单选
  "Select_001", //单选按钮
  "Select_002", //复选框按钮
  "Upload_001", //图片
  "Upload_002", //附件
] as const;
export type ComponentType = (typeof showFiled)[number];
