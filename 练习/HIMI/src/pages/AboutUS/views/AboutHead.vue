<template>
    <div class="about-head-body">
        <div class="head-back"></div>
        <h2>{{ $t('about.who') }}</h2>
        <div class="body-m who-body">
            <div>{{ $t('about.who_content_1') }}</div>
            <div>{{ $t('about.who_content_2') }}</div>
            <div>{{ $t('about.who_content_3') }}</div>
        </div>
    </div>
</template>

<script setup lang="ts" name="aboutHead">

</script>

<style scoped>

.about-head-body {
    text-align: center;
}

.head-back {
    background-image: url('@/assets/images/aboutus/aboutus.png');
    background-size:cover;
    background-repeat: no-repeat;
    background-position: 0 -200px;
    height: 26vw;
}

.who-body div {
    margin-bottom: 2em;
    
}

</style>