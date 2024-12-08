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

        <div class="enquire-now">{{ $t('footer.enquireNow') }}</div>
        <div>{{ $t('footer.copyright') }}</div>
    </div>
</template>

<script setup lang="ts" name="footer">

</script>

<style scoped>

.footer-body {
    background-color: var(--color-main);
    padding: 0 1rem;
    color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-policies a {
    color: inherit;
    font-size: 10px;
    font-weight: bold;
    padding-right: 10px;
}

.footer-policies a:last-child {
    padding-right: 0;
}

.footer-body div {
    padding: 15px 0;
}

.enquire-now {
    border: 1px solid white;
    border-radius: 20px;
    height: 40px;
    line-height: 40px;
}

</style>