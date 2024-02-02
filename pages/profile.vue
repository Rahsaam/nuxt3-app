<template>
    <NuxtLayout name="profile">
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
    middleware: 'auth',
});
</script>

<style lang="scss" scoped>

</style>