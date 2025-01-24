import { fieldTypeConfig } from "@/enums/preObjectManage";

const formObj = {};
export function createFormStrategy(formObj: Recordable) {
  [
    fieldTypeConfig.singleLineText, // 单行文本
    fieldTypeConfig.multilineText, // 多行文本
    fieldTypeConfig.creditCode, // 社会信用代码
    fieldTypeConfig.money, // 金额
    fieldTypeConfig.number, // 金额
    fieldTypeConfig.percentage,
  ].forEach((key) => {
    formObj[key] = (field: Recordable) => {
      const obj: any = {
        maxlength: 50,
        placeholder: field.prompt || "请输入",
        type: "text",
        unit: field.unit,
      };
      switch (field.code) {
        case fieldTypeConfig.multilineText:
          obj.type = "textarea";
          obj.showWordLimit = true;
          break;
        case fieldTypeConfig.creditCode:
          obj.maxlength = 18;
          break;
        case fieldTypeConfig.number:
        case fieldTypeConfig.money:
          obj.type = "number";
          obj.maxlength = field.maxLength || 20;
          obj.precisions = field.precisions;
          break;

        case fieldTypeConfig.percentage:
          obj.type = "number";
          obj.precisions = field.precisions;
          break;
      }
      return obj;
    };
  });
  // 手机号
  [fieldTypeConfig.phone].forEach((key) => {
    formObj[key] = (field: Recordable) => {
      return {
        placeholder: field.prompt || "请输入",
        type: "tel",
        maxlength: 11,
      };
    };
  });
  // 下拉单选
  [fieldTypeConfig.select].forEach((key) => {
    formObj[key] = (field: Recordable) => ({
      placeholder: field.prompt || "请选择",
      dataList: field.columnDataList || [],
    });
  });
  // 编号
  [fieldTypeConfig.serial].forEach((key) => {
    formObj[key] = () => ({
      placeholder: "自动生成无需填写",
      disabled: true,
    });
  });
  // 单选按钮
  [fieldTypeConfig.radio].forEach((key) => {
    formObj[key] = (field: Recordable) => ({
      placeholder: field.name || "请选择",
      dataList: field.columnDataList || [],
    });
  });
  // 多选按钮
  [fieldTypeConfig.checkbox].forEach((key) => {
    formObj[key] = (field: Recordable) => ({
      placeholder: field.name || "请选择",
      dataList: field.columnDataList || [],
    });
  });
  // 日期
  [fieldTypeConfig.date1].forEach((key) => {
    formObj[key] = (field: Recordable) => {
      let format = "YYYY-MM-DD HH:mm:ss";
      let type = ["year", "month", "day"];
      // if (field.precisions === 1) {
      //   format = "YYYY-MM-DD HH:mm:ss";
      //   type = "datetime";
      // }
      if (field.precisions === 2) {
        format = "YYYY-MM-DD";
      }
      if (field.precisions === 3) {
        format = "YYYY-MM";
        type = ["year", "month"];
      }
      if (field.precisions === 4) {
        format = "YYYY";
        type = ["year"];
      }
      return {
        placeholder: field.name || "请选择",
        format,
        columnsType: type,
      };
    };
  });
  // 时间
  [fieldTypeConfig.date3].forEach((key) => {
    formObj[key] = (field: Recordable) => {
      let format = "HH:mm:ss";
      let columnsType = ["hour", "minute", "second"];
      if (field.precisions === 1) {
        format = "HH:mm:ss";
        columnsType = ["hour", "minute", "second"];
      }
      if (field.precisions === 2) {
        format = "YYYY-MM-DD HH:mm";
        columnsType = ["hour", "minute"];
      }
      // if (field.precisions === 3) {
      //   format = 'YYYY-MM-DD YYYY-MM'
      // }
      return {
        placeholder: field.name || "请选择",
        format,
        columnsType,
      };
    };
  });
  // 上传图片
  [fieldTypeConfig.picture].forEach((key) => {
    formObj[key] = (field: Recordable) => ({
      placeholder: field.name || "请选择",
    });
  });
  // 上传附件
  [fieldTypeConfig.enclosure].forEach((key) => {
    formObj[key] = (field: Recordable) => ({
      placeholder: field.name || "请选择",
    });
  });
  // 地址
  [fieldTypeConfig.address].forEach((key) => {
    formObj[key] = (field: Recordable) => {
      return {
        placeholder: field.prompt || "请选择",
        precisions: field.precisions,
      };
    };
  });
  return formObj;
}
export const dealFormConfig = createFormStrategy(formObj);
