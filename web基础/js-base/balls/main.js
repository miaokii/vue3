// 
let remainp = document.querySelector('.remain');

// 设置画布
const canvas = document.querySelector('canvas');
// 坐标系
const ctx = canvas.getContext('2d');
// 窗口宽度，设置画布的宽度
const width = canvas.width = window.innerWidth;
// 窗口高度，设置画布的高度
const height = canvas.height = window.innerHeight;

let ballcount = 10;
let leavecount = ballcount;

remainp.textContent = '还剩 ' + leavecount + ' 个球';

// 生成随机数的函数
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// 随机颜色生成
function randomColor() {
    return 'rgb(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255) + ')';
}

// 圆圈
function Shape(x, y, velx, vely, exists) {
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.exists = exists;
}

// 小球类
// x,y开始位置坐标
// velx，vely水平和竖直的速度
// color，size颜色和大小
function Ball(x, y, velx, vely, exists, color, size) {
    Shape.call(this, x, y, velx, vely, exists);
    this.color = color;
    this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// 吃掉小球的圈
function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 15;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

// 绘制圈
EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.stroke();
}

// 边界不在运动
EvilCircle.prototype.setControls = function() {
    // 点击按键事件
    window.onkeydown = e => {
        switch (e.key) {
            case 'a':
            case 'A':
            case 'ArrowLeft':
                if (this.x - this.velx > 0)
                    this.x -= this.velx;
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                if (this.x + this.velx < width)
                    this.x += this.velx
                break;
            case 'w':
            case 'W':
            case 'ArrowUp':
                if (this.y - this.vely > 0)
                    this.y -= this.vely;
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                if (this.y + this.vely < height)
                    this.y += this.vely;
                break;
            default:
                break;
        }
    }
}

// 绘制小球方法
Ball.prototype.draw = function() {
    // 开始绘制图形
    ctx.beginPath();
    // 填充颜色
    ctx.fillStyle = this.color;
    // 绘制圆弧
    // x,y,圆角半径,开始角度，结束角度
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // 填充
    ctx.fill();
}

// 更新小球位置
Ball.prototype.update = function() {
        // 碰到边界，改变方向
        if (this.x + this.size >= width || this.x - this.size <= 0) {
            this.velx *= -1;
        }

        if (this.y + this.size >= height || this.y - this.size <= 0) {
            this.vely *= -1;
        }

        this.x += this.velx;
        this.y += this.vely;
    }
    // 圈
let circle = new EvilCircle(50, 50, true);

// 循环
function loop() {
    // 画布颜色
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    // 绘制画布，透明度0.25意思是显示四个小球的运动轨迹；
    ctx.fillRect(0, 0, width, height);

    balls.forEach(ball => {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    });

    circle.draw();
    circle.setControls();

    // 递归调用
    requestAnimationFrame(loop);
}

function crash(shape1, shape2) {
    const dx = shape1.x - shape2.x;
    const dy = shape1.y - shape2.y;
    // 小球间隔
    const d = Math.sqrt(dx * dx + dy * dy);
    // 小球间隔小于两个小球的半径和，发生碰撞
    return d < shape1.size + shape2.size;
}

// 小球之间的碰撞检测
Ball.prototype.collisionDetect = function() {
    balls.forEach(ball => {
        if (this !== ball) {
            // 小球间隔小于两个小球的半径和，发生碰撞
            if (ball.exists && crash(this, ball)) {
                ball.color = this.color = randomColor();
            }
            // 和圆圈碰撞，隐藏，记分
            if (ball.exists && crash(circle, ball)) {
                ball.exists = false;
                leavecount -= 1;
                remainp.textContent = '还剩 ' + leavecount + ' 个球';
            }
        } else {
            // 和圆圈碰撞，隐藏，记分
            if (this.exists && crash(circle, this)) {
                this.exists = false;
                leavecount -= 1;
                remainp.textContent = '还剩 ' + leavecount + ' 个球';
            }
        }
    });
}

// 小球集合
let balls = [];

while (balls.length < ballcount) {
    // 大小介于10-20之间
    let size = random(10, 20);
    // 创建一个球
    // x,y确保球在屏幕中
    let ball = new Ball(random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        randomColor(),
        size
    );
    balls.push(ball);
}

// 开始循环
loop();