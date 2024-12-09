<template>
    <div class="footer-body">
        <div class="footer-policies">
            <RouterLink to="/contactus" active-class="nav-list-active">{{ $t('footer.contactus') }}</RouterLink>
            <RouterLink to="/aboutus" active-class="nav-list-active">{{ $t('footer.aboutus') }}</RouterLink>
            <RouterLink to="/aboutus" active-class="nav-list-active">{{ $t('footer.teamspolicies') }}</RouterLink>
        </div>

        <div class="footer-address">
            <span>{{ $t('footer.landlineNumber') }}</span>
            <span>{{ $t('footer.address') }}</span>
        </div>

        <button class="border-button enquire-now">{{ $t('footer.enquireNow') }}</button>
        <!-- <div class="footer-copyright">{{ $t('footer.copyright') }}</div> -->
        <div class="footer-copyright">{{ $t('footer.copyright') }} @ {{ $t('footer.copyrightContent') }}</div>
    </div>
</template>

<script setup lang="ts" name="footer">

</script>

<style scoped>
.footer-body {
    background-color: var(--color-main);
    padding: 0 1rem 2rem 1rem;
    color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-policies a {
    color: inherit;
    font-size: 12px;
    font-weight: bold;
    padding-right: 10px;
}

.footer-policies a:last-child {
    padding-right: 0;
}

.footer-body div {
    padding: 1rem 0;
}

.footer-address {
    font-size: 1.5rem;
}

.enquire-now {
    border: 2px solid white;
    color: inherit;
}

.footer-copyright {
    color: var(--color-background-soft);
    letter-spacing: 1px;
}
</style>