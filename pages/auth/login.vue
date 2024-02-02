<template>
    <AuthCheckOtp v-if="showCheckOtp" />
    <AuthLogin v-else @show-check-otp="() => showCheckOtp = true"/>
</template>

<script setup>
definePageMeta({
    middleware: 'user'
});
const showCheckOtp = ref(false);
</script>

<style lang="scss" scoped>

</style>