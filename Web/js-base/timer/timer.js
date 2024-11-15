// 计时器

let timerLabel = document.querySelector('.timerLabel');
let startBtn = document.querySelector('.startTimer');
let stopBtn = document.querySelector('.stopTimer');
let resetBtn = document.querySelector('.resetTimer');
let timesConainer = document.querySelector('.times');

// 计数器
let timerCount = 0;
let timerFunc;

let ms = 0;
let s = 0;
let min = 0;

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    if (startBtn.textContent === '开始') {
        // 0.1s刷新一次
        timerFunc = setInterval(timerAction, 100);
        startBtn.textContent = '计次';
        stopBtn.disabled = false;
    } else {
        wouldTimer();
    }
}

function stopTimer() {
    startBtn.textContent = '开始';
    stopBtn.disabled = true;
    clearInterval(timerFunc);
}

function resetTimer() {
    timerCount = ms = s = min = 0;
    timerLabel.textContent = '00:00:0';

    let ls = document.querySelectorAll('.wouldLabel');
    ls.forEach(ele => {
        ele.parentElement.removeChild(ele);
    });
    stopTimer();
}

// 计次
function wouldTimer() {
    let p = document.createElement('p');
    p.textContent = timerLabel.textContent;
    p.className = 'wouldLabel';
    timesConainer.appendChild(p);
}

function timerAction() {
    timerCount += 1;

    // 毫秒位
    ms = timerCount % 10;
    if (ms == 0) {
        // 秒位
        s = (timerCount / 10) % 60;
        if (s == 0) {
            // 分位
            min = timerCount / 60 / 10;
        }
    }

    let timestr = print(min) + ':' + print(s) + ':' + ms;
    timerLabel.textContent = timestr;
}

function print(num) {
    return num < 10 ? '0' + num : num;
}