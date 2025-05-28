<template>
    <div class="body-m service-detail-body">
        <h1>{{ serviceModel.title }}</h1>
        <img :src="getAssetsImages(`services/${serviceModel.detailImage}`)" :alt="serviceModel.title">
        <article>
            <section>
                <h3>{{ serviceModel.title }}</h3>
                <p>{{ serviceModel.description }}</p>
            </section>
            <section>
                <h3>{{ serviceModel.stepTitle }}</h3>
                <ul>
                    <li v-for="(item, idx) in serviceModel.steps.split(';')" :key="idx">{{ item }}</li>
                </ul>
            </section>
        </article>
    </div>
</template>

<script setup lang="ts" name="name">
import { service_map } from '@/types/service';
import getAssetsImages from '@/utils/pubUse';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';

let route = useRoute()
let serviceModel = computed(() => {
    let service_type = route.params.service_type as string
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