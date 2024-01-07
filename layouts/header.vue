<template>
    <div>
    <div  class="sub_page">
    <div class="hero_area">
        <!-- header section strats -->
        <header class="header_section">
            <div class="container">
                <nav class="navbar navbar-expand-lg custom_nav-container">
                    <a class="navbar-brand" href="index.html">
                        <span>
                            Tasty Guy
                        </span>
                    </a>

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
                            <a class="cart_link position-relative" href="cart.html">
                                <i class="bi bi-cart-fill text-white fs-5"></i>
                                <span class="position-absolute top-0 translate-middle badge rounded-pill">
                                    3
                                </span>
                            </a>
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
        <!-- end header section -->
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
</script>

<style lang="scss" scoped>

</style>