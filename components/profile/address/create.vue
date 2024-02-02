<template>
    
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        ایجاد آدرس جدید
    </button>
    <div class="collapse mt-3" id="collapseExample">
        <div  v-if="errors.length > 0" class="alert alert-danger">
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li> 
            </ul>
        </div>
        <FormKit type="form" @submit="create" id="createAddress" #default="{value}" :incomplete-message="false" :actions="false">
            <div class="card card-body">
                <div class="row g-4">
                    <div class="col col-md-6">
                        <FormKit type="text" name="title" id="title" 
                            label="عنوان"
                            label-class="form-label"
                            input-class="form-control"
                            validation="required"
                            :validation-messages="{required: 'فیلد عنوان الزامی است'}"
                            messages-class="form-text text-danger"/>
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
                            messages-class="form-text text-danger"/>
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
                            messages-class="form-text text-danger"/>
                    </div>
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
                            v-model="selectedProvince">
                            <option v-for="province in props.provinces" :key="province.id" 
                            :value="province.id">{{ province.name }}</option>
                        </FormKit>
                        <!-- {{ value }} -->
                    </div>
                    <div class="col col-md-6">
                        <FormKit 
                            name="city_id"
                            id="city_id"
                            type="select"
                            ref="cityEl"
                            label="شهر"
                            label-class="form-label"
                            input-class="form-select"
                            :validation="[['required']]"
                            :validation-messages="{required: 'فیلد شهر ها الزامی است'}"
                            messages-class="form-text text-danger">
                            <option v-for="city in props.cities.filter(city => city.province_id == value.province_id)" :key="city.id" 
                            :value="city.id">{{ city.name }}</option>
                        </FormKit>

                    </div>
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
                            messages-class="form-text text-danger"/>
                    </div>
                </div>
                <div>
                    <FormKit type="submit" input-class="btn btn-primary mt-4">
                        ایجاد
                        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                    </FormKit>
                </div>
            </div>
        </FormKit>
    </div>
</template>

<script setup>
import {useToast} from 'vue-toastification';
import {reset} from '@formkit/core';
const props = defineProps(['provinces', 'cities']);
const toast = useToast();
const cityEl = ref('');
const selectedProvince = ref('');
const filterCity = ref('');
const loading = ref(false);
const errors = ref([]);


async function create(formData) {
    try {
        loading.value = true,
        errors.value = [],
        await $fetch('/api/profile/addresses/create', {
            method: 'POST',
            body: formData
        });
        console.log(formData);
        toast.success('ایجاد آدرس با موفقیت انجام شد');
        reset('createAddress');
    } catch (error) {
        errors.value = Object.values(error.data.data.message.address).flat();
    } finally {
        loading.value = false;
    }
}


watch(selectedProvince, (newValue) => {
    // console.log("Selected Province changed. New value:", typeof newValue);
    filterCity.value = newValue
        ? props.cities.find(item => item.province_id === Number(newValue))
        : '';
    console.log(cityEl.value.node.input(filterCity.value.id));
    // console.log('filter city', filterCity.value.name);
});

</script>

<style lang="scss" scoped>

</style>