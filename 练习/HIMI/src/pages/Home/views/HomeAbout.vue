<template>
    <div class="home-about-body">
        <div class="home-about-content">
            <h2>{{ $t('home.about_us') }}</h2>
            <div class="about-us-content">{{ $t('home.about_us_content') }}</div>
            <button class="border-button">{{ $t('home.read_more') }}</button>
        </div>
    </div>
</template>

<script setup lang="ts" name="homeAbout">

</script>

<style scoped>
.home-about-body {
    height: 56vw;
    background-image: url('@/assets/images/home/about.png');
    background-size: cover;
    background-repeat: no-repeat;
    color: var(--color-background);

    display: flex;
    justify-content: end;
    align-items: center
}

.home-about-content {
    margin-right: 5vw;
    direction: rtl;
    width: 45vw;
}

h2 {
    font-size: 2.2em;
    font-weight: bold;
    margin-bottom: 0;
    text-align: right;
}

.about-us-content {
    margin: 1em 0;
    font-size: 1.2em;
    padding-left: 1.5em;
    border-left: 1px solid currentColor;
}

.border-button {
    color: inherit;
    border: 2px solid currentColor;
}

@media (max-width: 650px) {
    .home-about-body {
        height: auto;
        color: var(--color-background);
        display: block;
    }

    .home-about-content {
        width: 100%;
        padding: 3rem 20px;
    }

    h2 {
        font-size: 2rem;
        margin-top: 0;
    }

    .about-us-content {
        margin: 1em 0;
        font-size: 1em;
        padding-left: 20px;
        border-left: none;
    }
}
</style>