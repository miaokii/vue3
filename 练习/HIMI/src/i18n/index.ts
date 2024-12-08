
import { createI18n } from "vue-i18n"
import enUS from "./locales/en-US"
import zhCN from "./locales/zh-CN"
import { compile, computed } from "vue"

const messages = {
    '简体中文':zhCN,
    'ENGLISH':enUS
}

const i18n = createI18n({
    // 默认语言
    locale: '简体中文',
    // 组合式api
    legacy: false,
    // 语言包
    messages: messages,
    // 全局 
    globalInjection: true
})

// 导出全局t方法
export const t = i18n.global.t

export function useLocal() {
    return computed({
        get() {
            return i18n.global.locale.value
        },
        set(value) {
            i18n.global.locale.value = value
        }
    })
}

export default i18n
