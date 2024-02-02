<template>
    <div class="vh-70">
        <div  v-if="errors.length > 0" class="alert alert-danger">
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li> 
            </ul>
        </div>
        <FormKit type="form" @submit="edit" :incomplete-message="false" :actions="false">
            <div class="row g-4">
                <div class="col col-md-6">
                    <FormKit type="text" name="name" id="name" 
                    label="نام و نام خانوادگی"
                    label-class="form-label"
                    input-class="form-control"
                    validation="required"
                    :validation-messages="{required: 'فیلد نام و نام خانوادگی الزامی است'}"
                    messages-class="form-text text-danger"
                    :value="user.name"/>
                </div>
                <div class="col col-md-6">
                    <FormKit type="email" name="email" id="email" 
                    label="ایمیل"
                    label-class="form-label"
                    input-class="form-control"
                    validation="required|email"
                    :validation-messages="{required: 'فیلد ایمیل الزامی است', email: 'فرمت نامعتبر است'}"
                    messages-class="form-text text-danger"
                    :value="user.email"/>
                </div>   
                    <div class="col col-md-6">
                        <FormKit
                        input-class="form-control"
                        label-class="form-label"
                        type="tel"
                        label="شماره تلفن"
                        placeholder="شماره تلفن را 0 وارد کنید"
                        :validation="[[required],[matches, /^(\+98|0)?9\d{9}$/]]"
                        :validation-messages="{'matches': 'فرمت شماره تلفن نامعتبر است', required: 'شماره تلفن الزامی است'}"
                        messages-class="form-text text-danger"
                        :value="user.cellphone"
                        disabled />
                    </div>
                <FormKit type="submit" input-class="btn btn-primary mt-4">
                    ویرایش
                    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                </FormKit>
            
                </div>
            </FormKit>

        <!-- <button type="submit" class="btn btn-primary mt-4">ویرایش</button> -->
    </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
const toast = useToast();
const loading = ref(false);
const errors = ref([]);



const {data: user} = await useFetch('/api/profile/info', {
    headers: useRequestHeaders(['cookie'])
});
async function edit (formData) {
    
    try {
        loading.value = true,
        errors.value = [],
        await $fetch('/api/profile/info/edit', {
            method: 'POST',
            body: formData
        });
        toast.success('اطلاعات شما با موفقیت ویرایش شد');
        console.log(formData);
    } catch (error) {
        errors.value = Object.values(error.data.data.message).flat();
    } finally {
        loading.value = false;
    }
};
</script>

<style lang="scss" scoped>

</style>