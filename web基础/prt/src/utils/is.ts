const toString = Object.prototype.toString;
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @author：张胜
 * @desc: 判断是否是一个Object
 * */
export function isObj(val: unknown): val is Record<any, any> {
  // null也是对象类型，判断对象类型的时候排除掉null
  return val !== null && is(val, "Object");
}

/**
 * @author：张胜
 * @desc: 判断是否是一个数组
 * */
export function isArray(val: any): val is any[] {
  return val && Array.isArray(val);
}
/**
 * @author：张胜
 * @desc: 判断是否是空数组
 * */
export function isEmptyArray(val: any): boolean {
  return isArray(val) && val.length === 0;
}

/**
 * @author：张胜
 * @desc: 判断是否是一个函数
 * */
export function isFunction(val: unknown) {
  return typeof val === "function";
}
/**
 * @Description: 是否是普通对象
 * @Param {*}
 * @Return {*}
 */
export function isObject(val: any) {
  return val !== null && is(val, "Object");
}
/**
 * @author：张胜
 * @desc: 判断是否是一个字符串
 * */
export function isString(val: unknown): val is string {
  return is(val, "String");
}

/**
 * @author：张胜
 * @desc: 判断是否是一个布尔值
 * */
export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

/**
 * @author：张胜
 * @desc: 判断是否是一个数字
 * */
export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

/**
 * @author：张胜
 * @desc: 判断是否是一个Map
 * */
export function isMap(val: unknown): val is Map<any, any> {
  return is(val, "Map");
}

/**
 * @author：张胜
 * @desc: 判断是否是null
 * */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * @author：张胜
 * @desc: 判断是否是undefined
 * */
export function isUndef(val: unknown): val is undefined {
  return val === undefined;
}

/**
 * @author：张胜
 * @desc: 判断是否是null或者undefined
 * */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isNull(val) || isUndef(val);
}

/**
 * @author：张胜
 * @desc: 判断是否是null或者undefined或者''
 * */
export function isNullOrUndefOrEmpty(val: unknown) {
  return isNullOrUnDef(val) || val === "" || isEmpty(val);
}
export function isFormData(val: unknown) {
  return val !== null && is(val, "FormData");
}
/**
 * @author：张胜
 * @desc: 判断数组，字符串，Map，Set，object是否为空
 * */
export function isEmpty<T = any>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }
  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }
  if (isObj(val)) {
    return Object.keys(val).length === 0;
  }
  return false;
}
/**
 * @author：祁昌玲
 * @desc: 判断空对象，参数传对象
 * */
export function isEmptyObject(obj: Record<string, any>): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty!(key)) {
      return false;
    }
  }
  return true;
}
/**
 * @author：祁昌玲
 * @desc: 判断是否是Json
 * */
export function isJSON(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch (e) {
    return false;
  }
}

export function isBlob(val: any) {
  return is(val, "Blob");
}
