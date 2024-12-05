<template>
    <div>
        <div class="home-image">
            <div class="mouse-outer">
                <div class="mouse-inner"></div>
            </div>
        </div>
        <div class="introduce">
            <div class="introduce-body">
                <div class="introduce-title">公司简介</div>
                <div class="introduce-divider"></div>
                <div class="introduce-content">优卡集团通过自研SaaS平台“融享客”为我们的客户提供一站式解决方案，激活客户群，实现业务流程数字化，提高整体运营效率。</div>

            </div>
            <img src="https://yoc.tech/images/b21.png" alt="">
        </div>
    </div>
</template>

<script setup lang="ts" name="home">

</script>

<style scoped>
.home-image {
    width: 100%;
    height: calc(100vh - var(--navigation-height));
    background: url("https://yoc.tech/images/bg58.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.mouse-outer {
    width: 30px;
    height: 45px;
    border-radius: 15px;
    border: 3px solid var(--vt-c-white);
    position: absolute;
    bottom: 8rem;
    left: calc((100% - 30px - 6px) / 2)
}

.mouse-inner {
    width: 6px;
    height: 10px;
    border-radius: 3px;
    border: 2px solid var(--vt-c-white);
    position: absolute;
    top: 10px;
    left: 9px;
    /* name duration delay  timing-function iteration-count direction fill-mode play-state */
    /* 动画名 动画时长 延迟时间  动画效果函数 重复次数 动画方向 往复运动 不暂停*/
    animation: mounse-scroll 0.5s linear infinite alternate;
}

.introduce {
    padding: 5rem 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.introduce-body {
    width: 35%;
}

.introduce-title {
    font-size: 40px;
}

.introduce-divider {
    margin: 2rem 0;
    height: 5px;
    width: 140px;
    background: linear-gradient(90deg, #2770F5, #62CEFA);
}

.introduce-content {
    font-size: 20px;
    color: var(--vt-c-text-light-2)
}

@keyframes mounse-scroll {
    form {
        transform: none
    }

    to {
        transform: translateY(-5px);
    }
}
</style>