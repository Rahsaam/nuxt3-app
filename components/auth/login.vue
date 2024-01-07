<template>
    <section class="auth_section book_section">
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 offset-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div  v-if="errors.length > 0" class="alert alert-danger">
                                <ul>
                                   <li v-for="(error, index) in errors" :key="index">{{ error }}</li> 
                                </ul>
                            </div>
                            <div class="form_container">
                                <form @submit.prevent="handleSubmit">
                                    <div class="mb-3">
                                        <label for="cellphone" class="form-label">شماره موبایل</label>
                                        <input type="text" v-model="cellphone" class="form-control" id="cellphone">
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-auth">
                                        ورود
                                        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import { useToast } from 'vue-toastification';
const {authUser} = useAuth();
const emit = defineEmits(['showCheckOtp']);
const toast = useToast();
const cellphone = ref('');
const loading = ref(false);
const errors = ref([]);

const handleSubmit = async () => {
    if (cellphone.value === '') {
        toast.error('شماره موبایل الزامی است');
        return;
    }
    const pattern = /^(\+98|0)?9\d{9}$/;
    if(!pattern.test(cellphone.value)) {
        toast.error('شماره موبایل معتبر نیست');
        return;
    }

    try {
        loading.value = true;
        const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {cellphone: cellphone.value}
        });
        toast.success('کد ورود برای شما ارسال شد');
        emit('showCheckOtp');
    } catch (error) {
        errors.value = Object.values(error.data.data.message).flat();
    } finally {
        loading.value = false;
    }
    
};
</script>

<style lang="scss" scoped>

</style>