// 展示大图
const displayedImage = document.querySelector('.displayed-img');
// 略缩图
const thumbBar = document.querySelector('.thumb-bar');
// 切换模式
const btn = document.querySelector('button');
// 变暗图层
const overlay = document.querySelector('.overlay');

/* 添加图片循环 */
// 

for (let i = 1; i < 6; i++) {
    let imagePath = 'images/pic' + i + '.jpg';
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imagePath);
    thumbBar.appendChild(newImage);

    newImage.onclick = function(e) {
        displayedImage.setAttribute('src', e.target.src);
    }
}
let islight = true;
btn.onclick = function() {
    islight = !islight;
    btn.textContent = islight ? "变暗" : "变亮";
    overlay.style.backgroundColor = 'rgba(0, 0, 0,' + (islight ? 0 : 0.6) + ')';
}

/* 编写 变暗/变量 按钮功能 */