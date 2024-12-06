import { createI18n } from "vue-i18n";

import enUS from "./locales/en-US.ts";
import zhCN from "./locales/zh-CN.ts";
import { computed } from "vue";

const messages = {
    'en-US': enUS,
    'zh-CH': zhCN
}

const i18n = createI18n({
    // 默认语言
    locale: 'zh-CN',
    // 组合式api
    legacy: false,
    // 语言包
    messages: messages,
    // 全局注入 $t
    globalInjection: true
})

// 全局导出t方法，简化和方便使用
export const t = i18n.global.t

export function useLocal() {
    return computed({
        get() {
            return i18n.global.locale.value
        },
        set(locale) {
            i18n.global.locale.value = locale
        }
    })
}

export default i18n
