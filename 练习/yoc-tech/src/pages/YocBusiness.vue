<template>
    <div class="work-body">
        <img src="https://yoc.tech/images/b9.png" alt="">
        <YocIntroduce title="融享客-自研SaaS平台"
            content="融享客一站式解决方案由精准营销、CRM（客户关系管理）、AI外呼、BPM（业务流程管理）、BI（商业智能化）多个功能模块组成，旨在为我们的客户解决其业务中的痛点，帮助其拓展和激活客户群，实现业务流程数字化，提高整体运营效率。"
            image="https://yoc.tech/images/k1.png" />
        <div class="introduce-body">
        </div>
        <YocWorkItem v-for="(item, idx) in workItems" :key="idx" :work-item='item' :index=idx />
    </div>
</template>

<script setup lang="ts" name="business">
import YocIntroduce from '@/components/YocIntroduce.vue';
import YocWorkItem from '@/components/YocWorkItem.vue';
import workjson from '@/types/work.json'
import { type WorkItem } from '@/types/WorkItem';
import { reactive } from 'vue';

let workItems: WorkItem[] = reactive(workjson)

</script>

<style scoped>

.work-body>img {
    width: 100%;
}

.introduce {
    padding-top: 2em;
}


</style>