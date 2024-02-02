<template>
    <div>
    <div  class="sub_page">
    <div class="hero_area">
        <header class="header_section">
            <div class="container">
                <nav class="navbar navbar-expand-lg custom_nav-container">
                    <NuxtLink to="/" class="navbar-brand">
                        <span>
                            Tasty Guy
                        </span>
                    </NuxtLink>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item" :class="{active: route.path === '/'}">
                                <NuxtLink class="nav-link" :to="{name: 'index'}">صفحه اصلی</NuxtLink>
                            </li>
                            <li class="nav-item" :class="{active: route.path === '/menu'}">
                                <NuxtLink class="nav-link" :to="{name: 'menu'}">منو</NuxtLink>
                            </li>
                            <li class="nav-item" :class="{active: route.path === '/about-us'}">
                                <NuxtLink class="nav-link" :to="{name: 'about-us'}">درباره ما</NuxtLink>
                            </li>
                            <li class="nav-item" :class="{active: route.path === '/contact'}">
                                <NuxtLink class="nav-link" :to="{name: 'contact'}">تماس با ما</NuxtLink>
                            </li>
                        </ul>
                        <div class="user_option">
                            <NuxtLink :to="{name: 'cart'}" class="cart_link position-relative" href="cart.html">
                                <i class="bi bi-cart-fill text-white fs-5"></i>
                                <span v-if="countItems" class="position-absolute top-0 translate-middle badge rounded-pill">
                                    {{ countItems }}
                                </span>
                            </NuxtLink>
                            <NuxtLink v-if="authUser" :to="{name: 'profile'}" class="btn-auth">
                                پروفایل
                            </NuxtLink>
                            <NuxtLink v-else :to="{name: 'auth-login'}" class="btn-auth">
                                ورود
                            </NuxtLink>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    </div>
</div>
<div>
    <slot />
</div>
</div>
</template>

<script setup>
const {authUser} = useAuth();
const route = useRoute();
import {useStateCart} from '../../store/counter';
const cart = useStateCart();
const countItems = computed(() => {
    return cart.count; 
});
</script>

<style lang="scss" scoped>

</style>