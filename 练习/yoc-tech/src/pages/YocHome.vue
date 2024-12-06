<template>
    <div>
        <div class="home-image">
            <div class="mouse-outer">
                <div class="mouse-inner"></div>
            </div>
        </div>
        
        <YocIntroduce title="公司简介" content="优卡集团通过自研SaaS平台“融享客”为我们的客户提供一站式解决方案，激活客户群，实现业务流程数字化，提高整体运营效率。" image="https://yoc.tech/images/b21.png"/>

    </div>
</template>

<script setup lang="ts" name="home">
import YocIntroduce from '@/components/YocIntroduce.vue';

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
    border: 3px solid var(--color-background);
    position: absolute;
    bottom: 8rem;
    left: calc((100% - 30px - 6px) / 2)
}

.mouse-inner {
    width: 6px;
    height: 10px;
    border-radius: 3px;
    border: 2px solid var(--color-background);
    position: absolute;
    top: 10px;
    left: 9px;
    /* name duration delay  timing-function iteration-count direction fill-mode play-state */
    /* 动画名 动画时长 延迟时间  动画效果函数 重复次数 动画方向 往复运动 不暂停*/
    animation: mounse-scroll 0.5s linear infinite alternate;
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