<template>
    <SingleProductDetail :product="product.data"/>
    <!-- end food section -->
    <hr>
    <section class="food_section my-5">
        <div class="container">
            <div class="row gx-3">
                <div v-for="product in randomProduct.data" :key="product.id" class="col-sm-6 col-lg-3">
                    <ProductCard :product="product"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const { apiUrl } = runtimeConfig.public;
const route = useRoute();

const {data: product} = useFetch(`${apiUrl}/products/${route.params.slug}`);

const {data: randomProduct} = await useFetch(`${apiUrl}/random-products?count=4`);
</script>

<style lang="scss" scoped>

</style>