<template>
    <div class="spinner-out">
        <div class="spinner"></div>
    </div>
</template>

<style scoped lang="scss">

/* 
.spinner:after 是伪元素，常用于为 spinner 添加额外的视觉效果，比如内部圆圈、阴影或动画层。 
在本例中，.spinner:after 并没有在 HTML 或 CSS 其他地方被具体使用（没有内容、没有额外样式），
所以它目前没有实际作用。可以只保留 .spinner 的样式即可。
*/
.spinner,
.spinner:after {
    border-radius: 50%;
    width: 3em;
    height: 3em;
}

.spinner-out {
    background-color: white;
    padding: 30px 0;
}

.spinner {
    font-size: 10px;
    margin: 0 auto;
    // 设置上右下边框，因为设置了border-radius，所以实际上设置了3/4的圆
    border-top: 0.2em solid #00c48d33;
    border-right: 0.2em solid #00c48d33;
    border-bottom: 0.2em solid #00c48d33;
    // 设置1/4圆，合起来就是一个带有边框的1/4圆
    border-left: 0.2em solid $color-primary;
    // z轴旋转
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

    // 动画效果
    -webkit-animation: loading 1.1s infinite linear;
    animation: loading 1.1s infinite linear;
}

@-webkit-keyframes loading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes loading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>