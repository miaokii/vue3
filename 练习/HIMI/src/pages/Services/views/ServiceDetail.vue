<template>
    <div class="body-m service-detail-body">
        <h1>{{ serviceJson.title }}</h1>
        <img :src="getAssetsImages(`services/${serviceJson.detailImage}`)" :alt="serviceJson.title">
        <article>
            <section>
                <h3>{{ serviceJson.title }}</h3>
                <p>{{ serviceJson.description }}</p>
            </section>
            <section>
                <h3>{{ serviceJson.stepTitle }}</h3>
                <ul>
                    <li v-for="(item, idx) in serviceJson.steps.split(';')" :key="idx">{{ item }}</li>
                </ul>
            </section>
        </article>
    </div>
</template>

<script setup lang="ts" name="name">
import { service_map, ServiceType } from '@/types/service';
import getAssetsImages from '@/utils/pubUse';
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

let route = useRoute()
let serviceJson = computed(() => {
    let service_type: ServiceType = route.params.service_type
    return service_map.value[service_type]
})

</script>

<style scoped>
.service-detail-body {
    text-align: center;
    padding: 0 3rem;
    margin-bottom: 6rem;
}

h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    margin: 3rem 0;
}

h3 {
    margin: 1rem 0;
    text-align: start;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0;
}

img {
    /* width: 80%; */
    height: 35vh;
}

article {
    text-align: start;
    font-size: 1.1rem;
}

section {
    margin: 2rem 0;
}

ul {
    list-style-position: inside;
}

li {
    margin: 10px 0;
}

@media (max-width: 650px) {
    .service-detail-body {
        text-align: center;
        padding: 0 2rem;
        margin-bottom: 4rem;
    }

    h1 {
        font-size: 2rem;
        margin: 2rem 0;
    }

    img {
        width: 100%;
        height: auto;
    }

    article {
        text-align: start;
        font-size: 1rem;
    }
}
</style>