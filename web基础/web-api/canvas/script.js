let canvas = document.querySelector('.myCanvas');
let width = canvas.width = window.innerWidth / 2;
let height = canvas.height = window.innerHeight;

let translateCanvas = document.querySelector('.translateCanvas');
translateCanvas.width = window.innerWidth / 2;
translateCanvas.height = window.innerHeight;
let translateCtx = translateCanvas.getContext("2d");
translateCtx.fillStyle = 'black';
translateCtx.fillRect(1, 0, width, height);

let ctx = canvas.getContext("2d");
// 黑色背景
ctx.fillStyle = 'black';
// 画布布局
ctx.fillRect(0, 0, width, height);

// 画一个矩形
ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 150);

// 覆盖上面的矩形
ctx.fillStyle = 'green';
ctx.fillRect(60, 100, 150, 100);

// 透明颜色
ctx.fillStyle = 'rgba(255, 0, 255, 0.5)';
ctx.fillRect(80, 120, 150, 100);

// 边框
ctx.strokeStyle = 'white';
ctx.lineWidth = 5;
ctx.strokeRect(20, 20, 250, 240);

// 角度转换弧度
function degToRad(degress) {
    return degress * Math.PI / 180;
}

ctx.fillStyle = 'rgb(255, 0, 0)';
// 开始路径绘制
ctx.beginPath();
// 移动原点
ctx.moveTo(300, 300);
// 绘制直线
ctx.lineTo(450, 300);
let triHeight = 150 * Math.sin(degToRad(60));
// ctx.lineTo(375, 450);
ctx.lineTo(375, 300 + triHeight);
ctx.lineTo(300, 300);
ctx.fill();

// 画圆
ctx.fillStyle = 'yellow';
ctx.beginPath();
ctx.arc(370, 500, 70, degToRad(-45), degToRad(45), true);
ctx.lineTo(370, 500);
ctx.fill();

// 绘制文本
ctx.strokeStyle = 'green';
ctx.lineWidth = 2;
ctx.font = '48px arial';
ctx.strokeText('Canvas Text', 30, 350);

// 填充文本
ctx.strokeStyle = 'red';
ctx.font = '48px arial';
ctx.fillText('Canvas Text', 30, 450);

// 绘制图片
let image = new Image();
image.src = 'firefox.png';
image.onload = function() {
    ctx.drawImage(image, 30, 550, 200, 200);
}

// 在translateCtx绘制动画
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + (min);
}

let length = 240
let moveOffSet = 20;

// 移动画布的原点
translateCtx.translate(width / 2, height / 2);

for (let i = 0; i < length; i++) {
    moveOffSet = rand(20, 30);
    translateCtx.fillStyle = 'rgba(' + (255 - length) + ',0,' + (255 - length) + ',0.9';
    translateCtx.beginPath()
    translateCtx.moveTo(moveOffSet, moveOffSet);
    translateCtx.lineTo(moveOffSet + length, moveOffSet);

    let h = length / 2 * Math.tan(degToRad(60));
    translateCtx.lineTo(moveOffSet + length / 2, moveOffSet + h);
    translateCtx.lineTo(moveOffSet, moveOffSet);
    translateCtx.fill();

    length--;
    moveOffSet += 0.7;
    translateCtx.rotate(degToRad(5));
}