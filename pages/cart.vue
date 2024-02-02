<template>
    <ClientOnly>
        <section v-if="countCount > 0" class="single_page_section layout_padding">
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="row gy-5">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-middle">
                                    <thead>
                                        <tr>
                                            <th>محصول</th>
                                            <th>نام</th>
                                            <th>قیمت</th>
                                            <th>تعداد</th>
                                            <th>قیمت کل</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="order in cart.$state.cart" :key="order.id">
                                            <th>
                                                <img src="/images/preloader.png" v-img="order.primary_image" width="100" alt="">
                                            </th>
                                            <td class="fw-bold">{{ order.name }}</td>
                                            <td>
                                                <div v-if="order.is_sale" class="mb-3">
                                                    <del>{{ priceFormat(order.price) }}</del>
                                                    {{ priceFormat(order.sale_price) }}
                                                    تومان
                                                    <div class="text-danger fs-6">
                                                        {{ salePercent(order.price, order.sale_price) }}% تخفیف
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    {{ priceFormat(order.price) }} تومان
                                                </div>
                                            </td>
                                            <td>
                                                <div class="input-counter">
                                                    <span @click="increment(order.id)" class="plus-btn">
                                                        +
                                                    </span>
                                                    <div class="input-number">{{ order.qty }}</div>
                                                    <span @click="decrement(order.id)" class="minus-btn">
                                                        -
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span v-if="order.is_sale">
                                                    {{ priceFormat(order.sale_price * order.qty) }}
                                                </span>
                                                <span v-else>
                                                    {{ priceFormat(order.price * order.qty) }}
                                                </span>
                                                <span class="ms-1">تومان</span>
                                            </td>
                                            <td>
                                                <button class="border-0 bg-transparent" @click="removeOrder(order.id)">
                                                    <i class="bi bi-x text-danger fw-bold fs-4 cursor-pointer"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button @click="removeAll" class="btn btn-primary mb-4">پاک کردن سبد خرید</button>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <CartCoupon :coupon="coupon"/>
                        <CartAddress @set-address-id="(id) => addressId = id"/>
                    </div>
                    <div class="row justify-content-center mt-5">
                        <div class="col-12 col-md-6">
                            <CartTotalCart :coupon="coupon"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        <div class="cart-empty" v-else>
            <div class="text-center">
                <div>
                    <i class="bi bi-basket-fill" style="font-size: 80px"></i>
                </div>
                <h4>سبد خرید شما خالی است</h4>
                <NuxtLink :to="{name: 'menu'}" class="btn btn-outline-dark mt-3">
                    مشاهده محصولات
                </NuxtLink>
            </div>
        </div>

        <template #fallback>
            <div class="cart-loadnig">
                <div class="spinner-border spinner-border-sm ms-2 cart-spiner"></div>
            </div>
        </template>
    </ClientOnly> 
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
});
import { useToast } from 'vue-toastification';
const toast = useToast();
import {useStateCart} from '../../store/counter';
const cart = useStateCart();
const addressId = ref(null);

const coupon = reactive({
    code: '',
    percent: 0
});

const countCount = computed(() => {
    return cart.count; 
});

function increment (id) {
    const findId = cart.$state.cart.find(item => item.id === id);
    return findId.qty >= findId.quantity ? findId.quantity : findId.qty += 1;
}

function decrement (id) {
    const findId = cart.$state.cart.find(item => item.id === id);
    return findId.qty <= 1 ? 1 : findId.qty -= 1;
}

function removeOrder (id) {
    // cart.$state.cart = cart.$state.cart.filter(item => item.id !== id);
    cart.remove(id);
    toast.warning('محصول مورد نظر از سبد خرید پاک شد');
}

function removeAll () {
    cart.$state.cart = [];
}
</script>

<style scoped>

</style>