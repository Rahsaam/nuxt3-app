<template>
    <div class="box">
        <div>
            <div class="img-box">
                <!-- <img :src="product.primary_image" alt=""> -->
                <img src="/images/preloader.png" v-img="product.primary_image" alt="">
            </div>
            <div class="detail-box">
                <h5>
                    <NuxtLink :to="{name: 'products-slug', params: {slug: product.slug}}">{{ product.name }}</NuxtLink>
                </h5>
                <p>
                    {{ product.description }}
                </p>
                <div class="options">
                    <h6 v-if="product.is_sale">
                        <del>{{ priceFormat(product.price) }}</del>
                        {{ priceFormat(product.sale_price) }}
                        <span>تومان</span>
                    </h6>
                    <h6 v-else>
                        {{ priceFormat(product.price) }}
                        <span>تومان</span>
                    </h6>
                    <button @click="addToCart(product)">
                        <i class="bi bi-cart-fill text-white fs-5"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps([
    'product'
]);
import {useStateCart} from '../../store/counter';
const cart = useStateCart();

function addToCart (product) {
    cart.remove(product.id);
    cart.addToCart(product, 1);
}
</script>

<style lang="scss" scoped>

</style>
