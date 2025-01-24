import { unref, ref } from "vue";
import { cloneDeep, merge, isNaN } from "lodash-es";
import { isString, isNullOrUndefOrEmpty } from "@/utils/is";
import {
  fieldTypeConfig,
  operateListEnum,
  moduleType,
} from "@/enums/preObjectManage";
import { dealFormConfig } from "@/utils/preObjectManage";
import { includeKey, uploadType } from "@/components/rxkForm/components/index";
import { getPositions } from "@/apis/index";
import EventEmitter from "@/utils/event";
const visibleEmitter = new EventEmitter();
export default ({ formData }: any) => {
  const position = ref();
  // 字段的显隐
  const visibleBox = ref<Recordable[]>([]);
  // 初始化表单
  async function initForm(params: any, fn?: Fn) {
    const data = await getPositions(params);
    const cloneData = cloneDeep([...unref(data.positions)]);
    cloneData.sort((a: any, b: any) => {
      const layoutA = a.layout
        ? isString(a.layout)
          ? JSON.parse(a.layout)
          : a.layout
        : {};
      const positionA = layoutA.position;
      const layoutB = b.layout
        ? isString(b.layout)
          ? JSON.parse(b.layout)
          : b.layout
        : {};
      const positionB = layoutB.position;
      return positionA?.x - positionB?.x;
    });
    const newArr = cloneData.map((container: Recordable) => {
      if (container.code === "BLANK") {
        container.modules = container.modules.map((module: Recordable) => {
          // 排序
          module.componentList.sort((a: any, b: any) => {
            const layoutX = a.layout
              ? isString(a.layout)
                ? JSON.parse(a.layout)
                : a.layout
              : {};
            const positionX = layoutX.position;
            const layoutY = b.layout
              ? isString(b.layout)
                ? JSON.parse(b.layout)
                : b.layout
              : {};
            const positionY = layoutY.position;
            // 首先按照 x 从小到大排序
            if (positionX?.x !== positionY?.x) {
              return positionX?.x - positionY?.x;
            }
            // 如果 x 相同，则按照 y 从小到大排序
            return positionX?.y - positionY?.y;
          });
          module.componentList = module.componentList
            .map((field: Recordable) => {
              const {
                code,
                fieldCode,
                defaultMark,
                defaultValue,
                name,
                visibleRuleList,
              } = field.columnInfo;
              // 取出下拉单选和单选按钮的显隐规则
              if (
                code === fieldTypeConfig.radio ||
                code === fieldTypeConfig.select
              ) {
                // 如果设置的显隐规则，就需要注册监听事件
                if (visibleRuleList && visibleRuleList.length) {
                  visibleRuleList.forEach((item: Recordable) => {
                    if (item.actionCode === "COLUMN") {
                      visibleBox.value.push({
                        ...item,
                        show: false,
                      });
                    }
                  });
                }
              }
              if (code === fieldTypeConfig.percentage) {
                field.columnInfo.minValue = !isNullOrUndefOrEmpty(
                  field.columnInfo.minValue
                )
                  ? field.columnInfo.minValue
                  : 1;
                field.columnInfo.maxValue = !isNullOrUndefOrEmpty(
                  field.columnInfo.maxValue
                )
                  ? field.columnInfo.maxValue
                  : 100;
              }
              field.layout = JSON.parse(field.layout);
              if (defaultMark === 0) {
                formData[fieldCode] =
                  formData[fieldCode] ||
                  defaultValue ||
                  (uploadType.includes(code) ? [] : "");
              } else {
                formData[fieldCode] = formData[fieldCode] || "";
              }
              const strategyFn =
                dealFormConfig[code] ||
                dealFormConfig[fieldTypeConfig.singleLineText]; // 默认值为单行文本
              const renderConfig = merge(
                strategyFn({
                  ...field,
                  ...field.columnInfo,
                }),
                { name: fieldCode }
              );
              // 处理该字段在新增布局中是否置灰
              renderConfig.disabled = !addEditDisabled(field) || false;
              renderConfig.required = getFieldRequire(field) || false;
              merge(renderConfig, field);
              // 给每个字段绑定一个显隐的事件
              renderConfig.visibleEmitter = visibleEmitter;
              let rules: any = [];
              rules = rules.concat(getSpecialRules(field.columnInfo));
              console.log(rules, "rulesfirst", name);

              if (renderConfig.required) {
                rules.push({ required: true, message: `${name}不能为空！` });
              }
              renderConfig.rules = rules;
              return {
                ...field,
                ...field.columnInfo,
                renderConfig,
              };
            })
            .filter((field: Recordable) => {
              const { code } = field.columnInfo;
              return includeKey.includes(code);
            });
          return {
            ...module,
          };
        });
      }

      return {
        ...container,
      };
    });
    // 新增布局该字段是否置灰
    function addEditDisabled(field: Recordable) {
      const current = field.columnInfo.columnOperateList.find(
        (operate: Recordable) => {
          return (
            operate.value && operate.code === operateListEnum.ADD_PAGE_EDIT
          );
        }
      );
      return !!current;
    }
    // 是否必填
    function getFieldRequire(field: Recordable) {
      // 必填
      const current = field.columnInfo.columnOperateList.find(
        (operate: Recordable) => {
          return operate.value && operate.code === operateListEnum.MUST;
        }
      );
      return !!current;
    }
    // 处理显隐规则字段显示问题和公式计算
    function dealVisible() {
      // 跟进显隐规则隐藏对应的字段
      position.value.forEach((container: Recordable) => {
        if (container.code === "BLANK") {
          container.modules.forEach((module: Recordable) => {
            module.componentList.forEach((field: Recordable) => {
              // 当前字段如果在隐藏box中，并且show为false，就隐藏
              const current = visibleBox.value.find((visible) => {
                const actionSerial = visible.actionSerial.split(",");
                if (
                  actionSerial.indexOf(field.fieldSerial) !== -1 &&
                  !visible.show
                ) {
                  return true;
                }
              });
              field.renderConfig.visibleEmitter.on(
                `addVisible_${field.fieldSerial}`,
                (show: boolean) => {
                  field.show = show;
                }
              );
              field.show = !current;
            });
          });
        }
      });
    }
    position.value = newArr;
    dealVisible();
    fn?.();
  }
  function getSpecialRules(item: Recordable): Recordable[] {
    const ruleList = [];
    /** 长度校验 */
    // 输入最大长度
    if (!isNaN(+item.maxLength) && +item.maxLength > 0) {
      ruleList.push({
        validator: (value: any) => {
          return new Promise((resolve) => {
            if (!value) {
              resolve(true);
            } else if (value.length > +item.maxLength) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        },
        message: `${item.name}最多输入${item.maxLength}位`,
      });
    }
    // 输入最小长度
    if (!isNaN(+item.minLength) && +item.minLength > 0) {
      ruleList.push({
        validator: (value: any) => {
          return new Promise((resolve) => {
            if (!value) {
              resolve(true);
            } else if (value.length < +item.minLength) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        },
        message: `${item.name}最少输入${item.minLength}位`,
      });
    }
    /** 数值校验 */
    // 数字 输入最大值
    if (!isNaN(+item.maxValue) && +item.maxValue > 0) {
      ruleList.push({
        validator: (value: any) => {
          const tempValue = String(value || "").replace(/,/g, ""); // 兼容金额
          return new Promise((resolve) => {
            if (!value) {
              resolve(true);
            } else if (+tempValue > +item.maxValue) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        },
        message: `${item.name}最大值为${item.maxValue}`,
      });
    }
    // 数字 输入最小值
    if (!isNaN(+item.minValue) && +item.minValue > 0) {
      ruleList.push({
        validator: (value: any) => {
          const tempValue = String(value || "").replace(/,/g, ""); // 兼容金额
          return new Promise((resolve) => {
            if (!value) {
              resolve(true);
            } else if (+tempValue < +item.minValue) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        },
        message: `${item.name}最小值为${item.minValue}`,
      });
    }
    console.log(ruleList, "里面的");

    return ruleList;
  }
  // 获取字段
  function getAllId() {
    const positions = cloneDeep(position.value);
    const columns: string[] = [];
    const columnSerials: string[] = [];
    positions.forEach((container: Recordable) => {
      if (container.code === "BLANK") {
        container.modules.forEach((module: Recordable) => {
          module.componentList.forEach((field: Recordable) => {
            const { id, fieldSerial } = field.columnInfo;
            if (module.moduleType === moduleType.subField) {
              id && columns.push(id);
              columnSerials.push(fieldSerial);
            }
          });
        });
      }
      if (container.code === "TABLE") {
        container.children.forEach((child: Recordable) => {
          child.modules.forEach((module: Recordable) => {
            module.componentList.forEach((field: Recordable) => {
              const { id, fieldSerial } = field.columnInfo;
              if (module.moduleType === moduleType.subField) {
                id && columns.push(id);
                columnSerials.push(fieldSerial);
              }
            });
          });
        });
      }
    });
    return {
      columns,
      columnSerials,
    };
  }
  // 显隐规则
  function setFiledVisible(field: Recordable, value: any) {
    const { fieldSerial } = field.columnInfo;
    const newArr = unref(visibleBox).filter(
      (item) => item.controlSerial === fieldSerial
    );
    console.log(newArr, "newArr888");
    // 接收到该字段和值，然后处理字段的显示隐藏
    const cur = unref(newArr).find((item) => item.value === value);
    if (!cur) {
      // 如果当前值不在显隐规则中，则将该字段配置了显隐规则的全隐藏
      unref(newArr).forEach((item) => {
        dealVisibleData(field, item, false);
      });
    } else {
      // 选择值
      if (value) {
        unref(newArr).forEach((item) => {
          if (item.value === value) {
            dealVisibleData(field, item, true);
          } else {
            dealVisibleData(field, item, false);
          }
        });
      } else {
        // 清空值
        unref(visibleBox).forEach((item) => {
          dealVisibleData(field, item, false);
        });
      }
    }
    return true;
  }
  function dealVisibleData(field: Recordable, item: Recordable, bool: boolean) {
    const actionSerial = item.actionSerial.split(",");
    actionSerial.forEach((serial: Recordable) => {
      field.visibleEmitter.emit(`addVisible_${serial}`, bool);
    });
  }
  return {
    position,
    visibleBox,
    initForm,
    getAllId,
    setFiledVisible,
  };
};
