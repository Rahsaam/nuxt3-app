<template>
     <button @click="deleteAddress" class="btn btn-dark">
        حذف
        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
     </button>
</template>

<script setup>
import {useToast} from 'vue-toastification';
const props = defineProps(['addressId']);
const toast = useToast();
const errors = ref([]);
const loading = ref(false);
async function deleteAddress () {
    try {
        loading.value= true;
        errors.value = [];
        await $fetch('/api/profile/addresses/delete', {
            method: 'POST',
            body: {addressId: props.addressId},
        });
        toast.success('آدرس با موفقیت حذف شد');
    } catch (error) {
        errors.value = Object.values(error.data.data.message).flat();
    } finally {
        loading.value= false;
    }
}
</script>