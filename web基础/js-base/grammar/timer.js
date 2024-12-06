// 指定的时间后执行一段代码
// 不能确保准确的时间执行，只能保证最短等待指定时间执行，主线程的堆栈为空之前，传递的代码无法执行

// 指定2s后打印hello world
let myGreeting = setTimeout(function() {
    console.log('hello world');
}, 2000);

let hello = function(name) {
    console.log('hello ' + name);
}

// 设置2s后执行hello函数，参数为kai
let myHello = setTimeout(hello, 2000, 'Kai');
// 清除延迟执行
clearTimeout(myHello);


// 重复执行一段代码
function printTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    console.log(time);
}
// 每1s打印当前时间
let clock = setInterval(printTime, 1000);
// 5s后停止打印时间
setTimeout(clearInterval, 5000, clock);