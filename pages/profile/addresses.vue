<template v-if="data">
    <ProfileAddressCreate :provinces="data.provinces" :cities="data.cities"/>
    <hr />
    <template v-for="address in data.addresses" :key="address.id" >
        <ProfileAddressEdit :address="address" :provinces="data.provinces" :cities="data.cities"/>
    </template>
</template>

<script setup>
const {data} = await useFetch('/api/profile/addresses', {
    headers: useRequestHeaders(['cookie'])
});
console.log(data.value);
</script>

<style lang="scss" scoped>

</style>