/**
 * @Description: 发布订阅类
 */

export default class EventEmitter {
  public events: Recordable;
  public cache: Recordable;
  constructor() {
    this.events = {}; // key为订阅的事件名称, value为要执行的函数数组
    this.cache = {}; // 先发布后订阅操作的缓存值, 只会操作一次, {'demoKey': {args: 'demoArgs'}
  }

  /**
   * @Description: 订阅操作,
   * @Param {string} key: '订阅事件的名称'
   * @Param {function} fn: '订阅事件的操作,'
   * @Return {*}
   */
  on(key: string, fn: Fn) {
    console.log(key, "key1232");
    if (!Reflect.has(this.events, key)) {
      this.events[key] = [];
    }
    this.events[key].push(fn);
    if (Reflect.has(this.cache, key)) {
      const args = this.cache[key].args;
      fn && fn(args);
      try {
        console.log("惠子");
        delete this.cache[key];
      } catch (e) {
        console.log(e);
      }
    }
  }

  /**
   * @Description: 订阅操作,
   * @Param {string} key: '触发订阅事件的名称'
   * @Param {*} ...rest: 具体操作的参数'
   * @Return {*}
   */
  emit() {
    // 第一个值为key,后面为参数
    // eslint-disable-next-line prefer-rest-params
    const key = Array.prototype.shift.call(arguments);
    console.log(key, "keyopop");
    // eslint-disable-next-line no-prototype-builtins
    if (!this.events.hasOwnProperty(key)) {
      // 未订阅, 先发布,则存进缓存里
      // eslint-disable-next-line prefer-rest-params
      this.cache[key] = { args: arguments };
    }
    const fns = this.events[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    fns.forEach((fn: any) => {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
    });
  }

  /**
   * @Description: 移除某个监听的时间
   * @Param {string} key: '事件名称'
   * @Return {function} fn: 不传,则清楚所有
   */
  remove(key: string, fn: Fn) {
    const fns = this.events[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      // 不存在函数,则清除所有
      fns && (fns.length = 0);
    } else {
      // 存在则清除当前的
      this.events = fns.filter((existedFn: any) => existedFn !== fn);
    }
  }

  /**
   * @Description:只触发一次的订阅
   * @Param {*}
   * @Return {*}
   */
  once(key: string, fn: Fn) {
    const onceFn = () => {
      fn && fn();
      this.remove(key, onceFn);
    };
    this.on(key, onceFn);
  }
}

export const MyGlobalEvent = new EventEmitter();
