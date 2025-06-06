<template>
    <div class="home-page">
        <section class="welcome">
            <span>{{ t('home.welcome_home') }}</span>
            <button class="button-fill-main" @click="navigateTo('services')">{{ t('home.find_more') }}</button>
        </section>

        <section class="center-body introduce">
            <div class="head">
                <span class="title">{{ t('home.introduce_himi_title') }}</span>
                <span class="content">{{ t('home.introduce_himi_content') }}</span>
            </div>

            <div class="list">
                <div class="item" v-for="(json, idx) in introduce_jsons" :key="idx">
                    <img :src='getImage(json.image)' alt="">
                    <span class="title">{{ json.title }}</span>
                    <span class="content">{{ json.content }}</span>
                </div>
            </div>
        </section>

        <ServicesView isHomePage />

        <section class="about">
            <div class="content">
                <h2>{{ t('home.about_us') }}</h2>
                <div class="desc">{{ t('home.about_us_content') }}</div>
                <button class="button-border-white" @click="navigateTo('aboutus')">{{ t('home.read_more')
                }}</button>
            </div>
        </section>

        <HIMIMap class="map-body center-body" />
    </div>
</template>

<script setup lang="ts" name="Home">
const introduce_jsons = computed(() => {
    return [
        { image: 'home/in1.svg', title: t('home.introduce_international_title'), content: t('home.introduce_international_content') },
        { image: 'home/in2.svg', title: t('home.introduce_area_title'), content: t('home.introduce_area_content') },
        { image: 'home/in3.svg', title: t('home.introduce_commitment_title'), content: t('home.introduce_commitment_content') },
        { image: 'home/in4.svg', title: t('home.introduce_industry_title'), content: t('home.introduce_industry_content') },
    ]
})
</script>

<style scoped lang="scss">
.home-page {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.welcome {
    color: white;
    background-image: url("images/home/welcome.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: calc(100vh - $height-navbar);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
    font-family: inherit;

    span {
        font-size: 2.5rem;
        font-family: futura-pt-weight;
        text-align: center;
        margin: 0 auto;
    }

    .button-fill-main {
        font-family: inherit;
        font-weight: bold;
        font-size: 1.1rem;
        padding: 1em 3em;
        letter-spacing: 2px;
    }
}

.introduce {
    display: flex;
    flex-direction: column;
    gap: 1em;

    .head {
        display: flex;
        align-items: center;

        .title {
            font-size: 2rem;
            width: 50%;
            font-family: futura-pt-weight;
            text-align: center;
        }

        .content {
            flex: 1;
            text-align: justify;
        }
    }

    .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1em;

            img {
                width: 45%;
                aspect-ratio: 1;
                max-width: 120px;
                min-width: 50px;
            }

            title {
                font-weight: bold;
                letter-spacing: 0;
            }
        }
    }
}

.about {
    min-height: 70vh;
    width: 100%;
    background-image: url('/images/home/about.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0;
    color: var(--color-background);

    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0 5em;

    .content {
        direction: rtl;
        width: 50%;
        color: white;

        border-left: 1px solid white;

        .desc {
            padding: 1em 0;
            padding-left: 3em;
            font-size: 1.1em;
            line-height: 1.9;
        }

        .button-border-white {
            padding: 1rem 3rem;
            font-size: 1.1em;

            &:hover {
                background-color: white;
                opacity: 1;
                color: $color-main;
            }
        }
    }
}

.map-body {
    aspect-ratio: 2.2;
    min-height: 50vh;
}

@media (max-width: 900px) {
    .introduce {
        .head {
            flex-direction: column;
            gap: 1em;

            .title {
                width: 100%;
            }
        }

        .list {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .about {
        padding: 0 2em;

        .content {
            text-align: center;
            direction: ltr;
            width: 100%;
            border-left: none;

            .desc {
                padding: 2em 0;
            }
        }
    }
}

@media (max-width:650px) {
    .welcome {
        span {
            text-align: center;
            text-shadow: 0 0 20px $color-main;
        }
    }

    .introduce {
        .list {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    .map-body {
        padding: 1rem;
    }
}
</style>