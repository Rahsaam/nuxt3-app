<template>
    <div class="card">
        <div class="card-body p-4">
            <h5 class="card-title fw-bold">مجموع سبد خرید</h5>
            <ul class="list-group mt-4">
                <li class="list-group-item d-flex justify-content-between">
                    <div>مجموع قیمت :</div>
                    <div>
                        {{ priceFormat(cart.totalPrice) }} تومان
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <div>تخفیف :
                        <span class="text-danger ms-1">{{ coupon.percent }}%</span> 
                    </div>
                    <div class="text-danger">
                        {{ priceFormat((totalCart * coupon.percent) / 100)}} تومان
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <div>قیمت پرداختی :</div>
                    <div>
                        {{ priceFormat(totalCart - (totalCart * coupon.percent) / 100)}} تومان
                    </div>
                </li>
            </ul>
            <button class="user_option btn-auth mt-4">پرداخت</button>
        </div>
    </div>
</template>

<script setup>
defineProps(['coupon']);
import { useStateCart } from '~/store/counter';
const cart = useStateCart();
const totalCart = computed(() => cart.totalPrice);
console.log(totalCart);
</script>

<style lang="scss" scoped>

</style>