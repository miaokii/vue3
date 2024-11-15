let p1 = document.querySelector('.p1');
let p2 = document.querySelector('.p2');
let startGameBtn = document.querySelector('.start');
let loading = document.querySelector('.loading');
let result = document.querySelector('.gameresult');

let startTime;
let rotateCount = 0;
let raf;

result.style.display = 'none';

startGameBtn.addEventListener('click', startGame);

function startGame() {
    rotateLoading();
    startGameBtn.style.display = 'none';
    setTimeout(endLoading, 4000);
}

// 参数意思为第一次requestAnimationFrame函数执行以来的时间
function rotateLoading(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }

    rotateCount = (timestamp - startTime) / 5;
    if (rotateCount > 359) {
        rotateCount %= 360;
    }

    loading.style.transform = `rotate(${rotateCount}deg)`;
    raf = requestAnimationFrame(rotateLoading);
}

function endLoading() {
    cancelAnimationFrame(raf);

    result.style.display = 'block';
    result.textContent = '游戏开始';

    document.addEventListener('keydown', keyHandler);

    // startTime = 0;
    // rotateCount = 0;
}

function keyHandler(e) {
    let isOver = false;
    if (e.key === 'a') {
        result.textContent = 'player 1 won！'
        isOver = true;
    } else if (e.key === 'l') {
        result.textContent = 'player 2 won！'
        isOver = true;
    }

    if (isOver) {
        document.removeEventListener('keydown', keyHandler);
        setTimeout(reset, 2000);
    }
}

function reset() {
    startGameBtn.style.display = 'block';
    result.textContent = '';
    result.style.display = 'none';
    startGameBtn.addEventListener('click', startGame);
}