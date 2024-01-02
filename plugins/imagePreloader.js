export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('img', (el, url) => {
        // console.log(el, url.value);

        const img = new Image();
        img.src = url.value;
        // console.log(img.src );

        img.onload = function () {
            el.src = url.value;
        };
    });
});
