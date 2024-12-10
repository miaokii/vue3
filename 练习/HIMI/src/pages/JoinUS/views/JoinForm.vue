<template>
    <div class="body-m join-form-body">
        <div class="join-left-body">
            <div>{{ $t('join.join_need') }}</div>
            <h3>{{ $t('join.internship') }}</h3>
            <div>{{ $t('join.internship_content') }}</div>
            <h3>{{ $t('join.parttime') }}</h3>
            <div>{{ $t('join.parttime_content') }}</div>
            <div>{{ $t('join.send_mail') }} <span class="join-email" @click="sendEmail"> {{himiConfig.email}} </span></div>
        </div>
        <div class="join-right-body">
            <h3>{{ $t('join.join_today') }}</h3>
            <form action="#">
                <div>
                    <label for="name">{{ $t('join.name') }}</label>
                    <input type="text" name='name' id="name" maxlength="10">
                </div>
                <div>
                    <label for="email">{{ $t('join.email') }}</label>
                    <input type="email" name='email' id="email">
                </div>
                <div>
                    <label for="subject">{{ $t('join.subject') }}</label>
                    <input type="text" name='subject' id="subject">
                </div>
                <div>
                    <label for="message">{{ $t('join.message') }}</label>
                    <textarea name="message" id="message"></textarea>
                </div>
                <input type="submit" class="border-button" :value="$t('join.submit')">
            </form>
        </div>
    </div>
</template>

<script setup lang="ts" name="joinForm">
import himiConfig from '@/utils/pubConfig';

function sendEmail() {

}

</script>

<style scoped>

.join-form-body {
    display: flex;
    text-align: start;
    margin-top: 0;

    margin-bottom: 4rem;
}

.join-left-body {
    width: 70%;
}

h3 {
    font-weight: bold;
    letter-spacing: 0;
    margin: 1rem 0;
}

.join-left-body div {
    margin: 1rem 0;
}

.join-left-body div:first-child {
    margin-top: 0;
}

.join-email {
    font-weight: bold;
    cursor: pointer;
}

.join-email:hover {
    color: var(--color-main-hover);
}

.join-right-body {
    width: 50%;
    margin-left: 2rem;
}

.join-right-body h3 {
    margin: 0;
}

form label {
    display: block;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0;
}

form div {
    margin-top: 1rem;
}

form input {
    border: 1px solid var(--color-border);
    height: 2.6rem;
    width: 100%;
    padding: 0 1rem;
    font-size: 1.2rem;
    color: inherit;
}

form input:focus {
    border: 1px solid var(--color-border);
}

form textarea {
    font-size: 1.2rem;
    width: 100%;
    height: 80px;
    border: 1px solid var(--color-border);
    padding: 0.5rem 1rem;
}

.border-button {
    border: 2px solid var(--color-main);
    padding: 1rem 3rem;
    width: auto;
    height: auto;
}
</style>