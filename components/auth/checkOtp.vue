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
                                    <div class="mb-3">
                                        <label for="otp" class="form-label">کد ورود:</label>
                                        <input type="text" v-model="otp" class="form-control" id="otp">
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <button @click="checkOtp" :disabled="loading" type="submit" class="btn btn-primary btn-auth">
                                            تایید
                                            <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                                        </button>
                                        <AuthResendOtp @resend-otp-error="(err) => errors = err" />
                                    </div>
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
const router = useRouter();
const toast = useToast();
const otp = ref('');
const loading = ref(false);
const errors = ref([]);

const checkOtp = async () => {
    if (otp.value === '') {
        toast.error('کد ورود الزامی است');
        return;
    }
    const pattern = /^[0-9]{6}$/;
    if(!pattern.test(otp.value)) {
        toast.error('کد ورود معتبر نیست');
        return;
    }

    try {
        loading.value = true;
        const data = await $fetch('/api/auth/checkOtp', {
            method: 'POST',
            body: {otp: otp.value}
        });
        toast.success('شما با موفقیت وارد شدید');
        authUser.value = data;
        router.push({
            path: '/profile'
        });
    } catch (error) {
        errors.value = Object.values(error.data.data.message).flat();
    } finally {
        loading.value = false;
    }

};
</script>

<style lang="scss" scoped>

</style>