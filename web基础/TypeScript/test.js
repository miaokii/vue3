// 原始字符串
let str = 'Hello World'

// 访问str.length时，JS做了以下工作
let size = function() {
    // 1. 自动装箱：创建一个临时的String对象包装原始字符串
    let tempStringObj = new String(str)
    // 2. 访问String对象的length属性
    let lengthValue = tempStringObj.length
    // 3. 销毁临时对象，返回长度值
    // JS自动销毁对象，无感知
    return lengthValue
}

console.log(size);


export function add(a, b) {
    return a + b
}

export function mul(a, b) {
    return a * b
}