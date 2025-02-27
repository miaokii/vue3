
/**
 * 设置本地存储
 * @param key 
 * @param value 
 */
export const setLocal = (key: string, value: string|null) => {
    if (value == null) {
        removeLocal(key)
    } else {
        localStorage.setItem(key, value)
    }
}

/**
 * 获取本地存储
 * @param key 
 * @returns 
 */
export const getLocal = (key: string) => {
    return localStorage.getItem(key)
}

/**
 * 删除本地存储
 * @param key 
 */
export const removeLocal = (key: string) => {
    localStorage.removeItem(key)
}

/**
 * 获取url中参数的值
 * @param name 
 * @returns 
 */
export function getQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/** 
 * 图片前缀
 */
// export const prefix = (url: string) => {
//     if (url && url.startsWith('http')) {
//         return url
//     } else {
//         url = `${APIClient.currentService().baseUrl}${url}`
//         return url
//     }
// }

/**
 * 图片路径
 * @param name 图片名
 * @returns 
 */
export function getAssetsImages(name: string) {
    let path = '/images'
    if (!name.startsWith('/')) {
        path += '/'
    }
    path += name
    return path
}

export function formatMoney(value: number, style: Intl.NumberFormatOptions['style'] = 'decimal', useGrouping: boolean = true): string {
    if (value == undefined) {
        return ''
    }

    return value.toLocaleString(/*指定地区*/'zh-CN', {
        // "decimal"（十进制数字）
        // "currency"（货币）
        // "percent"（百分比）
        style: style,
        // currency（适用于 style: 'currency'）：指定货币符号，例如 "USD"、"EUR" 等。
        // currency: 'RMB',
        
        // currencyDisplay：指定货币符号的显示方式，可能的值有：
        // "symbol"（默认显示符号，如 $）
        // "narrowSymbol"（显示更窄的符号）
        // "code"（显示货币代码，如 USD）
        // "name"（显示货币名称，如 US dollars）
        // currencyDisplay: "symbol",
        // 分隔符
        useGrouping: useGrouping,
        // 
        minimumIntegerDigits: 1,
        // 小数位数的显示
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        // 有效数字位数
        minimumSignificantDigits: 1,
        // maximumSignificantDigits: 1,
    });
}