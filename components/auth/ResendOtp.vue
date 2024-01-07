<template>
    <ClientOnly>
        <div class="d-flex align-items-center">
            <button @click="resendOtp" v-if="showResendOtp" :disabled="loading" class="btn btn-dark">
                ارسال دوباره
                <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
            </button>
            <div v-else class="mt-3 me-3" style="direction: ltr;">
                <vue-countdown :time="6 * 1000" v-slot="{ minutes, seconds }" @end="onCountdownEnd" :transform="transformSlotProps">
                    {{ minutes }}: {{ seconds }}
                </vue-countdown>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
import VueCountdown from '@chenfengyuan/vue-countdown';
import {useToast} from 'vue-toastification';
const emit = defineEmits(['resendOtpError']);
const toast = useToast();
const showResendOtp = ref(false);
const loading = ref(false);

function transformSlotProps (props) {
    const formattedProps = {};

    Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
    });

    return formattedProps;
}

function onCountdownEnd () {
    showResendOtp.value = true;
}

async function resendOtp () {
    try {
        loading.value = true;
        await $fetch('/api/auth/resendOtp', {
            method: 'POST',
        });
        toast.success('کد ورود دوباره برای شما ارسال شد');
        showResendOtp.value = false;
    } catch (error) {
        emit('resendOtpError', Object.values(error.data.data.message).flat());
    } finally {
        loading.value = false;
    }
}
</script>

<style lang="scss" scoped>

</style>