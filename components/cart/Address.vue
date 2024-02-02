<template>
    <div class="col-12 col-md-6 d-flex justify-content-end align-items-baseline">
        <template v-if="addresses.length > 0">
            <div>
                انتخاب آدرس
            </div>
            <select @click="(el) => emit('setAddressId', el.target.value)" style="width: 200px;" class="form-select ms-3" aria-label="Default select example">
                <option v-for="address in addresses" :key="address.id" :value="address.id">{{ address.title }}</option>
            </select>
        </template>
        <NuxtLink v-else :to="{name: 'profile-addresses'}" class="btn btn-primary">
            ایجاد آدرس
        </NuxtLink>
    </div>
</template>

<script setup>
const emit = defineEmits(['setAddressId']);
const {data: addresses} = await useFetch('/api/coupon/address');
console.log(addresses.value);
</script>

<style lang="scss" scoped>

</style>