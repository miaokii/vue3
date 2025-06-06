<template>
    <div class="joinus-page">
        <PageHead :path="getImage(`joinus/back.png`)" />

        <section class="center-body head">
            <h2>{{ $t('join.join_us') }}</h2>
            <div class="body">
                <img :src="getImage(`joinus/needyou.png`)" alt="">
                <div>{{ $t('join.join_content') }}</div>
            </div>
        </section>

        <section class="center-body form">
            <div class="left">
                <p>{{ $t('join.join_need') }}</p>
                <h3>{{ $t('join.internship') }}</h3>
                <p>{{ $t('join.internship_content') }}</p>
                <h3>{{ $t('join.parttime') }}</h3>
                <p>{{ $t('join.parttime_content') }}</p>
                <p>{{ $t('join.send_mail') }}
                    <Mail class="join-email" :to="himiConfig.email" />
                </p>
            </div>
            <div class="right">
                <h3>{{ $t('join.join_today') }}</h3>
                <form :action="`mailto:${himiConfig.email}`">
                    <div>
                        <label for="name">{{ $t('join.name') }}</label>
                        <input type="text" maxlength="10" required v-model="name">
                    </div>
                    <div>
                        <label for="phone">{{ $t('join.phone') }}</label>
                        <input type="tel" required v-model="phone">
                    </div>
                    <div>
                        <label for="subject">{{ $t('join.subject') }}</label>
                        <input type="text" name='subject' required>
                    </div>
                    <div>
                        <label for="message">{{ $t('join.message') }}</label>
                        <textarea required v-model="message"></textarea>
                        <textarea required v-model="mailBody" v-show="false" name="body"></textarea>
                    </div>
                    <button type="submit" class="button-border-main">{{ $t('join.submit') }}</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts" name="name">
import { himiConfig } from '~/data/himi-config';


let name = ref('')
let phone = ref('')
let message = ref('')

let mailBody = computed(() => {
    return `${t('join.name')}:${name.value}\n${t('join.phone')}:${phone.value}\n${message.value}`
})


</script>

<style scoped lang="scss">
.joinus-page {
    display: flex;
    flex-direction: column;
    gap: 4em;
    background-color: white;

    .head {
        .body {
            padding-top: 2em;
            display: flex;
            gap: 2em;

            img {
                width: 50%;
            }

            .join-body div {
                width: 45%;
                text-align: start;
            }
        }

        padding-bottom: 2em;
        border-bottom: 1px solid $color-background;
    }

    .form {
        display: flex;
        align-items: center;
        margin-top: 0;
        margin-bottom: 4rem;
        gap: 2em;

        h3 {
            font-weight: bold;
            letter-spacing: 0;
            margin: 1rem 0;
        }

        .left {
            width: 55%;

            p {
                margin: 1rem 0;

                &:first-child {
                    margin-top: 0;
                }
            }

            .join-email {
                font-weight: bold;
                color: inherit;
                cursor: pointer;

                &:hover {
                    color: $color-main-hover;
                }
            }
        }

        .right {
            width: 45%;

            form {
                display: flex;
                flex-direction: column;
                gap: 1em;

                label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: bold;
                    letter-spacing: 0;
                    padding-bottom: 5px;
                }

                input {
                    border: 1px solid $color-background;
                    border-radius: 2px;
                    height: 2.6rem;
                    width: 100%;
                    font-size: 1.2rem;
                    color: inherit;
                    padding: 0 1em;

                    &:focus {
                        outline: none;
                        border: 1px solid $color-main;
                    }
                }

                textarea {
                    font-size: 1.2rem;
                    padding: 0 1em;
                    resize: vertical;
                    color: inherit;
                    width: 100%;
                    height: 80px;
                    border: 1px solid $color-background;
                    padding: 0.5rem 1rem;
                    border-radius: 2px;

                    &:focus {
                        outline: none;
                        border: 1px solid $color-main;
                    }
                }

                .button-border-main {
                    width: 100%;
                }
            }
        }
    }
}

@media (max-width: 650px) {

    .joinus-page {
        .head {
            .body {
                flex-direction: column;

                img {
                    width: 100%;
                }
            }
        }

        .form {
            flex-direction: column;

            .left {
                width: 100%;
            }

            .right {
                width: 100%;
            }
        }
    }
}


@media (max-width: 650px) {
    .join-form-body {
        flex-direction: column;
        text-align: center;
    }

    .left,
    .right {
        width: 100%;
        margin: 0;
    }

    h3 {
        text-align: center;
    }

    form label {
        text-align: start;
    }
}
</style>