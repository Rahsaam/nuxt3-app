<template>
    <div class="box">
        <div>
            <div class="img-box">
                <img :src="product.primary_image" alt="">
            </div>
            <div class="detail-box">
                <h5>
                    {{ product.name }}
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
                    <a href="">
                        <i class="bi bi-cart-fill text-white fs-5"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps([
    'product'
]);
</script>

<style lang="scss" scoped>

</style>
