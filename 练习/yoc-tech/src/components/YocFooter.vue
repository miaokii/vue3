<template>
    <div class="nav-footer">
        <div class="contact">
            <span>联系我们</span>
            <ul>
                <li>优卡官网：www.yoc.tech</li>
                <li>媒体：pr@yoc.tech</li>
                <li>公司总机：028-81253826</li>
                <li>办公地址：成都·天府软件园C-6-3</li>
            </ul>
        </div>
        <div class="hr-server">
            <span>人事服务</span>
            <ul>
                <li>如需咨询招聘相关事宜 请联系</li>
                <li>邮箱：pr@yoc.tech</li>
                <li>联系人：人力资源部</li>
            </ul>
        </div>
        <div class="invest">
            <span>投资者服务</span>
            <ul>
                <li>如需咨询投资相关事宜请联系</li>
                <li>邮箱：ir@yoc.tech</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="footer">

</script>

<style scoped>
.nav-footer {
    color: var(--color-background);
    background-color: var(--color-main);
    padding: 3rem 5rem;
    display: flex;
    justify-content: space-between;
    padding-right: 25%;
}

.nav-footer span {
    font-size: 2rem;
}

.nav-footer ul {
    list-style: none;
    padding: 0;
    margin-top: 1.5em;
}

.nav-footer li {
    color: var(--color-background-mute);
    padding: 3px 0;
}

@media (max-width:1200px) {
    .nav-footer {
        padding: 3rem 5rem;
    }
}

@media (max-width: 800px) {
    .nav-footer {
        padding: 2rem;
        padding-top: 0;
        flex-direction: column;
        align-items: center;
    }

    .nav-footer ul {
        margin-top: 1em;
    }

    .contact,
    .hr-server,
    .invest {
        width: 100%;
        margin-top: 2rem;
        text-align: center;
    }
}

@media (prefers-color-scheme: dark) {
    .nav-footer {
        color: var(--vt-c-white-soft);
    }

    .nav-footer li {
        color: var(--vt-c-white-mute);
    }
}
</style>