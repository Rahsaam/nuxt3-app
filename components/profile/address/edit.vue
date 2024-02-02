<template>
    <div  v-if="errors.length > 0" class="alert alert-danger">
        <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li> 
        </ul>
    </div>
    <FormKit type="form" @submit="edit" #default="{value}" :incomplete-message="false" :actions="false">
        <div class="card card-body">
            <div class="row g-4">
                <div class="col col-md-6">
                    {{ value }}
                    <FormKit 
                        type="text" 
                        name="title" 
                        id="title" 
                        label="عنوان"
                        label-class="form-label"
                        input-class="form-control"
                        validation="required"
                        :validation-messages="{required: 'فیلد عنوان الزامی است'}"
                        messages-class="form-text text-danger"
                        :value="props.address.title"/>
                </div>
                <div class="col col-md-6">
                    <FormKit 
                        name="cellphone"
                        id="cellphone"
                        type="tel"
                        label="شماره تماس"
                        label-class="form-label"
                        input-class="form-control"
                        :validation="[['required'],['matches', /^(\+98|0)?9\d{9}$/]]"
                        :validation-messages="{required: 'فیلد شماره تماس الزامی است', 'matches': 'فرمت شماره اشتباه است'}"
                        messages-class="form-text text-danger"
                        :value="props.address.cellphone"/>
                </div>
                <div class="col col-md-6">
                    <FormKit 
                        name="postal_code"
                        id="postal_code"
                        type="text"
                        label="کد پستی"
                        label-class="form-label"
                        input-class="form-control"
                        :validation="[['required'],['matches', /^\d{5}[-]?\d{5}$/]]"
                        :validation-messages="{required: 'فیلد کد پستی الزامی است', 'matches': 'فرمت شماره اشتباه است'}"
                        messages-class="form-text text-danger"
                        :value="props.address.postal_code"/>
                </div>
                <!-- <ClientOnly fallback-tag="span" fallback="در حال بارگذاری..."> -->
                    <div class="col col-md-6">
                        <FormKit 
                            name="province_id"
                            id="province_id"
                            type="select"
                            label="استان"
                            label-class="form-label"
                            input-class="form-select"
                            :validation="[['required']]"
                            :validation-messages="{required: 'فیلد استان ها الزامی است'}"
                            messages-class="form-text text-danger"
                            v-model="selectedProvince"
                            :value="props.address.province_id">
                            <option v-for="province in props.provinces" :key="province.id" 
                            :value="province.id">{{ province.name }}</option>
                        </FormKit>
                    </div>
                    <div class="col col-md-6">
                        <FormKit 
                            name="city_id"
                            id="city_id"
                            type="select"
                            v-model="cityEl"
                            label="شهر"
                            label-class="form-label"
                            input-class="form-select"
                            :validation="[['required']]"
                            :validation-messages="{required: 'فیلد شهر ها الزامی است'}"
                            messages-class="form-text text-danger"
                            :value="props.address.city_id">
                            <option v-for="city in filterCityByProvince" :key="city.id" 
                            :value="city.id">{{ city.name }}</option>
                        </FormKit>
                    </div>
                <!-- </ClientOnly> -->
                <div class="col col-md-12">
                    <FormKit 
                        type="textarea" 
                        name="address" 
                        id="address" 
                        label="آدرس"
                        label-class="form-label"
                        input-class="form-control"
                        rows="5"
                        validation="required"
                        :validation-messages="{required: 'فیلد آدرس الزامی است'}"
                        messages-class="form-text text-danger"
                        :value="props.address.address"/>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-4">
                <FormKit type="submit" input-class="btn btn-primary">
                        ویرایش
                    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                </FormKit>
                <ProfileAddressDelete :address_id="props.address.id"/>
            </div>
        </div>
    </FormKit>
</template>

<script setup>
import {useToast} from 'vue-toastification';
import {reset} from '@formkit/core';
const props = defineProps(['address', 'provinces', 'cities']);
const loading = ref(false);
const selectedProvince = ref('');
const filterCityByProvince = ref('');
const filterCity = ref('');
const errors = ref([]);
const cityEl = ref('');
const toast = useToast();

async function edit(formData) {
    try {
        loading.value = true,
        errors.value = [],
        await $fetch('/api/profile/addresses/edit', {
            method: 'POST',
            body: {...formData, address_id: props.address.id}
        });
        toast.success('ویرایش آدرس با موفقیت انجام شد');

    } catch (error) {
        errors.value = Object.values(error.data.data.message).flat();
    } finally {
        loading.value = false;
    }
}


watch(selectedProvince, (newValue) => {

    filterCityByProvince.value = props.cities.filter(item => item.province_id === Number(newValue));

    filterCity.value = newValue
        ? props.cities.find(item => item.province_id === Number(newValue))
        : '';
    cityEl.value = filterCity.value.id;
});
</script>

<style lang="scss" scoped>

</style>