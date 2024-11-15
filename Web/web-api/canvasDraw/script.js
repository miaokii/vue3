// 选择颜色
let pickColor = document.querySelector('.chooseColor');
// 画笔大小
let sizeLabel = document.querySelector('.rangeValue');
// 画笔大小滑动
let rangeView = document.querySelector('.rangeBar');
// 清除按钮
let clearBtn = document.querySelector('.clearCanvas');


let canvas = document.querySelector('canvas');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');
// 黑色背景
ctx.fillStyle = 'white';
// 画布布局
ctx.fillRect(0, 0, width, height);

let curX, curY;
let pressed = false;

document.onmousemove = function(e) {
    curX = (window.Event) ? e.pageX : e.clientY + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    curY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
}

document.onmousedown = function() {
    pressed = true;
}

document.onmouseup = function() {
    pressed = false;
}

rangeView.oninput = function() {
    sizeLabel.textContent = rangeView.value;
}

clearBtn.onclick = function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
}

// 角度转换弧度
function degToRad(degress) {
    return degress * Math.PI / 180;
}

function draw() {
    if (pressed) {
        ctx.fillStyle = pickColor.value;
        ctx.lineWidth = Number(sizeLabel.textContent);
        ctx.beginPath();
        ctx.arc(curX, curY - 61, Number(sizeLabel.textContent), degToRad(0), degToRad(360), false);
        ctx.fill();
    }
    requestAnimationFrame(draw);
}

draw();