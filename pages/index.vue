<template>
    <div>
        <Slider/>
        <Features/>
        <ProductTabs/>
        <AboutUs/>
        <ContactUs/>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'header',
    middleware: 'auth'
});
</script>

<style lang="scss" scoped>

</style>