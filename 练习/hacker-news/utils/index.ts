
export function isAbsolute(url: string) {
    // https://开头
    return /^https?:\/\//.test(url)
}

export function timeAgo(time: number | Date) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        // 双按位取反，结果等同于去掉小数部分（向零取整）
        return pluralize(~~(between/60), ' minute')
    }
    else if (between < 86400) {
        return pluralize(~~(between/3600), ' hour')
    }
    else {
        return pluralize(~~(between/86400), ' day')
    }
}

function pluralize(time: number, label: string) {
    if (time === 1) {
        return time + label
    }
    return `${time+label}s`
}

export function host(url: string) {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace('?id=', '/')
    const parts = host.split('.').slice(-3)
    if (parts[0] === 'www') {
        parts.shift()
    }
    return parts.join('.')
}

