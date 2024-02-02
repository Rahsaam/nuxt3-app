<template>
    <div class="col-12 col-md-6">
        <div class="input-group mb-3">
            <input v-model="code" type="text" class="form-control" placeholder="کد تخفیف">
            <button @click="checkCoupon" :disabled="loading" class="input-group-text" id="basic-addon2">اعمال کد
                تخفیف
                <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
const props = defineProps(['coupon']);
const toast = useToast();
const code = ref('');
const loading = ref(false);
const errors = ref([]);
async function checkCoupon () {
    // if(coupon.value === '' || coupon.value === null) {
    //     toast.error('فیلد اعمال کد تخفیف الزامی است');
    // }
    try {
        loading.value = true;
        errors.value = [];
        const data = await $fetch('/api/coupon/check-coupon', {
            method: 'POST',
            body: {code: code.value}
        });
        toast.success(`کد تخفیف ${data.percentage} درصدی شما با موفقیت اعمال شد`);

        props.coupon.code = code.value;
        props.coupon.percent = data.percentage;
    } catch (error) {
        toast.error(Object.values(error.data.data.message).flat().toString());
    } finally {
        loading.value = false;
    }
}
</script>

<style lang="scss" scoped>

</style>