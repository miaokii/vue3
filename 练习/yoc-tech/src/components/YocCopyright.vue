<template>
    <div class="copy-right">
        <!-- <span>Copyright © 2017 - 2024 Yoc.tech All Rights Reserved. 成都优卡数信信息科技有限公司 版权所有</span> -->
        <span>成都优卡数信信息科技有限公司 版权所有</span>
        <span>协议</span>
        <div class="domain">
            <span class="domain-element">中国 · 成都 · 天府软件园C-6-3</span>
            <a class="domain-element domain-no" target="_blank" href="https://beian.mps.gov.cn"><img
                    src="@/assets/copyrights.png" alt="">
                <span>川公网安备51019002007057号</span></a>
            <a class="domain-element" target="_blank"
                href="https://beian.miit.gov.cn/#/Integrated/index"><span>蜀ICP备19019032号</span></a>
        </div>
    </div>
</template>

<script setup lang="ts" name="copyrights">

</script>

<style scoped>
.copy-right {
    background-color: #1B4D8D;
    padding: 1rem 5rem;
    font-size: 14px;
    color: var(--color-background);
    display: flex;
    justify-content: space-between;
}

.domain {
    display: flex;
    align-items: center;
}

.domain .domain a {
    font-size: inherit;
}

.domain .domain-element {
    margin-right: 20px;
}

.domain .domain-element:last-child {
    margin-right: 0;
}

.domain-no {
    display: flex;
    align-items: center;
}

.domain-no span {
    margin-left: 5px;
}

@media (max-width: 800px) {
    .copy-right {
        padding: 1rem 2rem;
        flex-direction: column;
        text-align: center;
    }

    .domain {
        flex-direction: column;
    }

    .domain-element {
        margin-top: 1rem;
    }
}
    
@media (prefers-color-scheme: dark) {
    .copy-right {
        color: var(--vt-c-white-soft);
    }
}

</style>