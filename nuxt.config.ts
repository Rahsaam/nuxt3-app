// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    imports: {
        dirs: ['api', 'utils']
    },
    app: {
        head: {
            htmlAttrs: {
                dir: 'rtl',
                lang: 'fa'
            }
        }
    },
    runtimeConfig: {
        public: {
            apiUrl: 'http://localhost:8000/api'
        }
    },
    css: ['~/assets/css/style.css'],

    build: {
        transpile: ['vue-toastification']
    },
    devtools: { enabled: true }
});
