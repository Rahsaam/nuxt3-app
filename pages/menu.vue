<template>
    <section class="food_section layout_padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-lg-3">
                    <div>
                        <label class="form-label">جستجو</label>
                        <div class="input-group mb-3">
                            <input type="text" v-model="search" @input="checkSearchBox" class="form-control" placeholder="نام محصول ..."
                                aria-label="Recipient's username" aria-describedby="basic-addon2">
                            <button @click="search !== '' && handleFilter({search: search})" href="#" class="input-group-text" id="basic-addon2">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="filter-list">
                        <div class="form-label">
                            دسته بندی
                        </div>
                        <ul> 
                            <li v-for="category in categories.data" 
                            @click="handleFilter({category: category.id})" 
                            :key="category.id" 
                            class="my-2 cursor-pointer"
                            :class="{'filter-list-active': route.query.hasOwnProperty('category') && route.query.category == category.id}">{{ category.name }}</li>
                        </ul>
                    </div>
                    <hr>
                    <div>
                        <label class="form-label">مرتب سازی</label>
                        <div class="form-check my-2">
                            <input 
                            @click="handleFilter({sortBy: 'max'})" 
                            class="form-check-input" 
                            type="radio" 
                            name="flexRadioDefault" 
                            id="flexRadioDefault1" 
                            :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'max'">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault1">
                                بیشترین قیمت
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input 
                            @click="handleFilter({sortBy: 'min'})" 
                            class="form-check-input" 
                            type="radio" 
                            name="flexRadioDefault" 
                            id="flexRadioDefault2"
                            :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'min'">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault2">
                                کمترین قیمت
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input 
                            @click="handleFilter({sortBy: 'bestseller'})" 
                            class="form-check-input" 
                            type="radio" 
                            name="flexRadioDefault" 
                            id="flexRadioDefault3"
                            :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'bestseller'">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault3">
                                پرفروش ترین
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input 
                            @click="handleFilter({sortBy: 'sale'})" 
                            class="form-check-input" 
                            type="radio" 
                            name="flexRadioDefault" 
                            id="flexRadioDefault4"
                            :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'sale'">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault4">
                                با تخفیف
                            </label>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 col-lg-9">
                    <div v-if="pending" class="d-flex justify-content-center align-items-center">
                        <div class="spinner-border"></div>
                    </div>
                    
                    <template v-else>
                    <div v-if="data.data.products.length === 0"
                    class="d-flex justify-content-center align-items-center h-100">
                        <h5>محصولی یافت نشد!</h5>
                    </div>
                    <div v-else>
                        <div class="row gx-3">
                        <div v-for="product in data.data.products" :key="product.id" class="col-sm-6 col-lg-4">
                            <ProductCard :product="product"/>
                        </div>
                    </div>
                    <nav class="d-flex justify-content-center mt-5">
                        <ul class="pagination">
                            <li v-for="(number, index) in data.data.meta.links.slice(1, -1)" :key="index" :class="{active: number.active}" class="page-item">
                                <button @click="handleFilter({page: number.label})" class="page-link" href="#">{{ number.label }}</button>
                            </li>
                        </ul>
                    </nav>
                    </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const search = ref('');
const query = ref({});


const runTimeConfig = useRuntimeConfig();
const {apiUrl} = runTimeConfig.public;
const {data: categories} = await useFetch(`${apiUrl}/categories`);


query.value = route.query;
const {data, refresh, pending} = await useFetch(() => `${apiUrl}/menu`, {
    query: query
});

watch(() => route.query, (newVal) => {
    if(Object.keys(newVal).length == 0) {
        query.value = {},
        refresh();
    }
}, {
    deep: true,
    immediate: true,
});

const handleFilter = (param) => {
    query.value = {...route.query, ...param};

    if(!param.hasOwnProperty('page')) {
        delete query.value.page;
    }

    router.push({
        path: './menu',
        query: query.value
    });
};

const checkSearchBox = (element) => {
    if(element.target.value == 0) {
        if(query.value.hasOwnProperty('search')) {
            delete query.value.search;
        }
        router.push({
            path: './menu',
            query: query.value
        });
    }
};
</script>

<style lang="scss" scoped>

</style>