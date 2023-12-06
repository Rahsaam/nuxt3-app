<template>
     <section class="book_section layout_padding">
        <div class="container">
            <div class="heading_container">
                <h2>
                    تماس با ما
                </h2>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
                        <ul class="mb-0">
                            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="form_container">
                        <form @submit.prevent="send">
                            <div>
                                <input type="text" v-model="formData.name" class="form-control" placeholder="نام و نام خانوادگی" />
                            </div>
                            <div>
                                <input type="email" v-model="formData.email" class="form-control" placeholder="ایمیل" />
                            </div>
                            <div>
                                <input type="text" v-model="formData.subject" class="form-control" placeholder="موضوع پیام" />
                            </div>
                            <div>
                                <textarea rows="10" v-model="formData.text" style="height: 100px" class="form-control"
                                    placeholder="متن پیام"></textarea>
                            </div>
                            <div class="btn_box">
                                <button>
                                    ارسال پیام
                                    <span v-if="loading" class="spinner-border spinner-border-sm ms-2"></span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="map_container ">
                        <div id="map" style="height: 345px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useToast } from 'vue-toastification';
const toast = useToast();
const { $leaflet } = useNuxtApp();

const {public: {apiUrl}} = useRuntimeConfig();
const formData = reactive({
    name: '',
    email: '',
    subject: '',
    text: '',
});
let errors = ref([]);
const loading = ref(false);
async function send () {
    if(formData.name === '' || formData.email === '' || formData.subject === '' || formData.text === '') {
        toast.error('لطفا فرم را با دقت پر کنید.');
        return;
    }
    try {
        loading.value = true;
        errors.value = [];
        const data = await $fetch(`${apiUrl}/contact-us`, {
            method: 'POST',
            body: formData
        });
        toast.success('فرم با موفقیت ثبت شد.');
    } catch(err) {
        errors.value = Object.values(err.data.message).flat();
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    var map = $leaflet.map('map').setView([35.700105, 51.400394], 14);
    let tiles = $leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    let marker = $leaflet.marker([35.700105, 51.400394], {
        icon: $leaflet.icon({
            popupAnchor: [12, 6],
            iconUrl: 'images/map/marker-icon.png',
            shadowUrl: 'images/map/marker-shadow.png'
        })
    }).addTo(map)
        .bindPopup('<b>Hello world!</b><br />I am a popup').openPopup();
});
</script>

<style lang="scss" scoped>

</style>