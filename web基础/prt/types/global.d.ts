/*
 * @Description: 一些全局的类型声明
 * @Author: somours
 * @Date: 2022-03-21 16:42:45
 * @LastEditors: somours
 * @LastEditTime: 2022-03-24 15:39:12
 */

declare type Nullable<T> = T | null;

declare type TimeoutHandler = ReturnType<typeof setTimeout>;

declare type IntervalHandler = ReturnType<typeof setInterval>;

declare type Recordable<T = any> = Record<string, T>;

declare interface PlainObjectOf<V = any> {
  [_: string]: V;
}

declare type CommonFunction = (...args: any[]) => void;

declare type Fn<T = any> = (...args: any[]) => T;

declare type PromiseFn<R = any> = (...arg: any[]) => Promise<R>;

declare interface ValueLabelObj<V = string | number> {
  value: T;
  label: string;
  [_: string]: any;
}

declare interface VueEnv {
  VUE_APP_ENV: "dev" | "test" | "pressure" | "prod" | "development";
  NODE_ENV: string;
}

declare module "crypto-js";
declare let WeixinJSBridge: any; // 解决 WeixinJSBridge 在TS编译会报错
interface Window {
  AMap: any;
}
