// src/global.d.ts
import { utils } from './src/utils/pubUse'; // 导入你的全局方法

declare module 'vue' {

  interface ComponentCustomProperties {
    utils: typeof utils; // 声明全局属性
  }
}