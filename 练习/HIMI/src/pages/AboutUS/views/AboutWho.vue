<template>
    <div class="body-m about-who-body">
        <h2>{{ $t('about.who') }}</h2>
        <div class="who-body">
            <div>{{ $t('about.who_content_1') }}</div>
            <div>{{ $t('about.who_content_2') }}</div>
            <div>{{ $t('about.who_content_3') }}</div>
        </div>
    </div>
</template>

<script setup lang="ts" name="aboutHead">

</script>

<style scoped>
.about-who-body {
    text-align: center;
}

.who-body div {
    margin-bottom: 2rem;
}

@media (max-width: 650px) {

    .who-body div {
        margin-bottom: 1rem;
    }
}
</style>